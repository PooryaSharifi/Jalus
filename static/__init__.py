import os, sys, re, os.path, asyncio, ujson as json, hmac, hashlib, numpy as np, glob, tempfile, subprocess
from base64 import (urlsafe_b64encode, urlsafe_b64decode)
from string import ascii_lowercase
from scipy.spatial import Voronoi, SphericalVoronoi
from sanic import response

template_titles = {'jalus': 'جالوس', 'go': 'جالوس رو', 'dual': 'جالوس بنای سبز دومنظوره', 'rebuild': 'جالوس بازسازی', 'host': 'جالوس صاحبخونه', 'fold': 'جالوس تاشو', 'dome': 'جالوس زوم'}
matcher = re.compile(r'/// #.* ///')
def replace_target(match, d): target = match.group(); return d.get(target, target)

async def load_template(name): return (await response.file(f"{os.path.dirname(os.path.dirname(os.path.abspath(__file__)))}/templates/{name}")).body.decode('utf-8')
async def _render_template(name, d): return re.sub( matcher, lambda match: replace_target(match, d), await load_template(name))
async def render_template(name, d): 
    template = await load_template(name)
    for k, v in d.items(): template = template.replace(f'/// #{k} ///', v)
    for match in re.findall(r'{[/][*] #macro .+ [*][/]}', template): template = template.replace(match, await load_template(match[3:-3].strip().split(' ')[-1] + '.jsx'))
    return template
async def util_debabel():
    for page in glob.glob(f'{os.path.dirname(os.path.dirname(__file__))}/templates/*.*'):
        if page[-4:] == 'html': file = await load_template(os.path.basename(page))
        else: file = (await render_template('base.html', {'title': template_titles[os.path.basename(page).lower().split('.')[0]], 'style': 'digikala'})).replace('/// block #content', await render_template(os.path.basename(page), {}))
        file = file.replace('<script src="/static/babel.min.js"></script>', '')
        jsx = re.findall(r'<script type="text/babel">(?:\n.*)*</script>', file)
        fd, jsx_tmp = tempfile.mkstemp(suffix='.jsx', prefix='tmp')
        _, js_tmp = tempfile.mkstemp(suffix='.js', prefix='tmp')
        try:
            with os.fdopen(fd, 'w', encoding='utf-8') as f: f.write(jsx[0].replace('<script type="text/babel">', '').replace('</script>', ''))
            # subprocess.Popen(f'npx babel {jsx_tmp} --presets=@babel/preset-env,@babel/preset-react -o {js_tmp}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            output = subprocess.check_output(f'npx babel {jsx_tmp} --presets=@babel/preset-env,@babel/preset-react -o {js_tmp}', shell=True).decode()
            with open(js_tmp, encoding='utf-8') as f: file = file.replace(jsx[0], f'<script>{f.read()}</script>')
            with open(page.replace(os.path.basename(page), f'serv/{os.path.basename(page).split('.')[0]}.html'), 'w', encoding='utf-8') as f: f.write(file)
        finally: os.remove(jsx_tmp); os.remove(js_tmp)

class OctetJWK:
    def __init__(self, key: bytes, kid=None, **options): self.key, self.kid, self.options = key, kid, {k: v for k, v in options.items() if k in {'use', 'key_ops', 'alg', 'x5u', 'x5c', 'x5t', 'x5t#s256'}}
    def get_kty(self): return 'oct'
    def get_kid(self): return self.kid
    def is_sign_key(self) -> bool: return True
    def _get_signer(self, options): return options['signer']
    def sign(self, message: bytes, **options) -> bytes: signer = self._get_signer(options); return signer(message, self.key)
    def verify(self, message: bytes, signature: bytes, **options) -> bool: signer = self._get_signer(options); return hmac.compare_digest(signature, signer(message, self.key))
    def to_dict(self, public_only=True):
        dct = { 'kty': 'oct', 'k': b64encode(self.key),}; dct.update(self.options)
        if self.kid: dct['kid'] = self.kid
        return dct
    @classmethod
    def from_dict(cls, dct):
        try: return cls(b64decode(dct['k']), **dct)
        except KeyError as why: raise MalformedJWKError('k is required') from why
class HMACAlgorithm():
    def __init__(self, hash_fun): self.hash_fun = hash_fun
    def _check_key(self, key):
        if not key or key.get_kty() != 'oct': raise Exception
        return key
    def _sign(self, message: bytes, key: bytes) -> bytes: return hmac.new(key, message, self.hash_fun).digest()
    def sign(self, message: bytes, key) -> bytes: key = self._check_key(key); return key.sign(message, signer=self._sign)
    def verify(self, message: bytes, key, signature: bytes) -> bool: key = self._check_key(key); return key.verify(message, signature, signer=self._sign)
hs256, secret = HMACAlgorithm(hashlib.sha256), OctetJWK(b'secret')
def b64encode(s: bytes) -> str: s_bin = urlsafe_b64encode(s); s_bin = s_bin.replace(b'=', b''); return s_bin.decode('ascii')
def b64decode(s: str) -> bytes: s_bin = s.encode('ascii'); s_bin += b'=' * (4 - len(s_bin) % 4); return urlsafe_b64decode(s_bin)
def encode(message: bytes, key=secret):
    header_b64 = b64encode(json.dumps({'alg': 'HS256'}, separators=(',', ':')).encode('ascii'))
    message_b64 = b64encode(message)
    signing_message = header_b64 + '.' + message_b64
    signature = hs256.sign(signing_message.encode('ascii'), key)
    signature_b64 = b64encode(signature)
    return signing_message + '.' + signature_b64
def decode_segments(message: str):
    try: signing_message, signature_b64 = message.rsplit('.', 1); header_b64, message_b64 = signing_message.split('.')
    except ValueError: raise Exception('malformed JWS payload')
    header = json.loads(b64decode(header_b64).decode('ascii'))
    message_bin = b64decode(message_b64)
    signature = b64decode(signature_b64)
    return header, message_bin, signature, signing_message
def decode(message: str, key=secret, do_verify=True, algorithms = {'HS256': hs256}):
    header, message_bin, signature, signing_message = decode_segments(message)
    alg_value = header['alg']
    if alg_value not in algorithms: raise Exception('Unsupported signing algorithm.')
    if do_verify and not hs256.verify(signing_message.encode('ascii'), key, signature): raise Exception('JWS passed could not be validated')
    return message_bin
# print(encode(b':{_-+\/}'))
# print(decode(encode(b':{_-+\/}')).decode())

def cart(lat, lng): lat, lng = np.deg2rad(lat), np.deg2rad(lng); return np.cos(lat) * np.cos(lng), np.cos(lat) * np.sin(lng), np.sin(lat)
def decart(x, y, z): return np.rad2deg(np.arcsin(z)), np.rad2deg(np.arcsin(y / (1 - z ** 2) ** .5))
with open('static/origins', encoding='utf-8') as origins:
    origins = origins.read().split('\n\n')
    origins = [orig.split('\n') for orig in origins if len(orig)]
    origins = [[ori for ori in orig if ori] for orig in origins]
    origins = [orig for orig in origins if re.match(r'[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?, [+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?', orig[-1])]
    for orig in origins: orig[-1] = [float(v.strip()) for v in orig[-1].split(',')]
    origins = [{'keywords': sum([ori.split('،') for ori in orig[:-1]], []), 'loc': orig[-1]} for orig in origins]
    for orig in origins: orig['keywords'] = [ori.strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا') for ori in orig['keywords']]
    polygons = SphericalVoronoi([cart(*orig['loc']) for orig in origins if len(orig) > 1])
    polygons.vertices = np.array([decart(*xyz) for xyz in polygons.vertices])
    for iorig, orig in enumerate(origins): orig['polygon'] = polygons.vertices[polygons.regions[iorig]]
    table = dict()
    for origin in origins:
        for iori, ori in enumerate(origin['keywords']):
            if ori not in table: table[ori] = []
            table[ori].append(dict(origin, order=iori))
    origins = {k: list(sorted(v, key=lambda x: x['order'])) for k, v in table.items()}
    wild_origins = {}
    for key, sub_origins in origins.items():
        if len(key) > 2:
            for wild_key in [key[:iwild] for iwild in range(2, len(key) - 1)]:
                if wild_key not in wild_origins: wild_origins[wild_key] = []
                wild_origins[wild_key].extend(sub_origins)
    for wild_key, sub_origins in wild_origins.items():
        ids, usub_origins = set(), []
        for origin in sub_origins:
            if id(origin) not in ids:
                usub_origins.append(origin)
                ids.add(id(origin))
        wild_origins[wild_key] = list(sorted(usub_origins, key=lambda x: x['order']))
    for k, sub_origins in origins.items(): wild_origins[k] = sub_origins

filters = [{
    "labels": ["جادار"],
    "rooms": {"$gt": 2}
}, {
    "labels": ["دربستی"],
    "rooms": {"$gt": 3}
}, {
    "labels": ["تخفیف"],
    "offer": {"$gte": 5}
}, {
    "labels": ['جنگلی'],
    "options": {"$contains": "جنگلی"}
}]
wild_filters = {}
for q in filters:
    labels = q['labels']
    for key in labels:
        if len(key) > 2:
            for wild_key in [key[:iwild] for iwild in range(2, len(key) + 1)]:
                for i_wild_key, wild_wild_key in enumerate([wild_key[jwild:] for jwild in range(0, len(wild_key) - 1)]):
                    if wild_wild_key not in wild_filters: wild_filters[wild_wild_key] = []
                    wild_filters[wild_wild_key].append([i_wild_key, q])
for wild_key in wild_filters: filters = list(sorted(wild_filters[wild_key], key=lambda qp: qp[0])); filters = [q[1] for q in filters]; wild_filters[wild_key] = filters

if __name__ == '__main__': asyncio.new_event_loop().run_until_complete(globals()[f'util_{sys.argv[1]}']())