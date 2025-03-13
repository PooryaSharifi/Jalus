import os, sys, re, os.path, asyncio, ujson as json, hmac, hashlib, numpy as np, glob, tempfile, subprocess
from base64 import (urlsafe_b64encode, urlsafe_b64decode)
from string import ascii_lowercase
from scipy.spatial import Voronoi, SphericalVoronoi
from sanic import response
from bson import ObjectId
from datetime import datetime
from werkzeug.http import parse_date
import mimetypes, os, re
from ast import literal_eval
from pymongo import ReturnDocument

async def load_template(name): return (await response.file(f"{os.path.dirname(os.path.dirname(os.path.abspath(__file__)))}/templates/{name}")).body.decode('utf-8')
async def template(name):
    index_template = await load_template('index.html')
    target_template = await load_template(f'{name}.js')
    for match in re.findall(r'[/][*][*] #elements .* #elements [*][*][/]', target_template, flags=re.DOTALL): payload = match.replace('/** #elements ', ''); payload = payload.replace(' #elements **/', ''); index_template = index_template.replace(f'/// #elements ///', payload); target_template = target_template.replace(match, '')
    for match in re.findall(r'[/][*][*] #\w+ .* #\w+ [*][*][/]', target_template): payload = match[5:-4]; hashtag = payload.rfind('#'); payload, block = payload[len(payload) - hashtag:hashtag], payload[hashtag + 1:]; index_template = index_template.replace(f'/// #{block} ///', payload); target_template = target_template.replace(match, '')
    index_template = index_template.replace(f'/// #content ///', target_template)
    for match in re.findall(r'{[/][*] #macro .+ [*][/]}', index_template): index_template = index_template.replace(match, await load_template(match[3:-3].strip().split(' ')[-1] + '.jsx'))
    return index_template
# template_titles = {'jalus': 'جالوس', 'go': 'جالوس رو', 'dual': 'جالوس بنای سبز دومنظوره', 'rebuild': 'جالوس بازسازی', 'host': 'جالوس صاحبخونه', 'fold': 'جالوس تاشو', 'dome': 'جالوس زوم', 'home': 'هوشمندسازی اسکان'}
# matcher = re.compile(r'/// #.* ///')
# def replace_target(match, d): target = match.group(); return d.get(target, target)
# async def _render_template(name, d): return re.sub( matcher, lambda match: replace_target(match, d), await load_template(name))
# async def render_template(name, d): 
#     template = await load_template(name)
#     for k, v in d.items(): template = template.replace(f'/// #{k} ///', v)
#     for match in re.findall(r'{[/][*] #macro .+ [*][/]}', template): template = template.replace(match, await load_template(match[3:-3].strip().split(' ')[-1] + '.jsx'))
#     return template
async def util_debabel():
    for page in glob.glob(f'{os.path.dirname(os.path.dirname(__file__))}/templates/*.*'):
        if 'Laziz.html' in page or '$$.html' in page: continue
        if page[-4:] == 'html': file = await load_template(os.path.basename(page))
        else: file = await template(os.path.basename(page).split('.')[0].capitalize())
        # else: file = (await render_template('base.html', {'title': template_titles[os.path.basename(page).lower().split('.')[0]], 'style': 'digikala'})).replace('/// block #content', await render_template(os.path.basename(page), {}))
        file = file.replace('<script src="/static/babel.min.js"></script>', '')
        jsx = re.findall(r'<script type="text/babel">(?:\n.*)*</script>', file)
        fd, jsx_tmp = tempfile.mkstemp(suffix='.jsx', prefix='tmp')
        _, js_tmp = tempfile.mkstemp(suffix='.js', prefix='tmp')
        try:
            with os.fdopen(fd, 'w', encoding='utf-8') as f: f.write(jsx[0].replace('<script type="text/babel">', '').replace('</script>', ''))
            # subprocess.Popen(f'npx babel {jsx_tmp} --presets=@babel/preset-env,@babel/preset-react -o {js_tmp}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            output = subprocess.check_output(f'npx babel {jsx_tmp} --presets=@babel/preset-env,@babel/preset-react -o {js_tmp}', shell=True).decode()
            with open(js_tmp, encoding='utf-8') as f: file = file.replace(jsx[0], f'<script>{f.read()}</script>')
            with open(page.replace(os.path.basename(page), f'serv/{os.path.basename(page).split(".")[0]}.html'), 'w', encoding='utf-8') as f: f.write(file)
        finally: os.remove(jsx_tmp); os.remove(js_tmp)
async def util_score():
    users = pymongo.MongoClient("mongodb://localhost:27017")['Jalus']['users']
    ds = list(users.find({'detailed': True, 'pan_date': {'$gt': datetime.datetime.fromisoformat('2025-02-11 22:00:37.856000')}}))
    dates = [d['pan_date'] for d in ds]
    scores = [d['score'] for d in ds]
    scores = list(sorted(scores))
    print(len(scores), scores[0], scores[-1], scores[-200])

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
        origin['polygon'] = origin['polygon'].tolist()
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

def send_file_partial(path):
    range_header = request.headers.get('Range', None)
    if not range_header: return send_file(path)
    size = os.path.getsize(path)
    byte1, byte2 = 0, None
    m = re.search('(\d+)-(\d*)', range_header)
    g = m.groups()
    if g[0]: byte1 = int(g[0])
    if g[1]: byte2 = int(g[1])
    length = size - byte1
    if byte2 is not None: length = byte2 - byte1
    data = None
    with open(path, 'rb') as f: f.seek(byte1); data = f.read(length)
    rv = Response(data, 206, mimetype=mimetypes.guess_type(path)[0], direct_passthrough=True)
    rv.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(byte1, byte1 + length - 1, size))
    return rv

def my_send_file_partial(stream):
    range_header = request.headers.get('Range', None)
    if not range_header: return send_file(stream, mimetype=stream.content_type[0])
    size = stream.length
    byte1, byte2 = 0, None
    m = re.search('(\d+)-(\d*)', range_header); g = m.groups()
    if g[0]: byte1 = int(g[0])
    if g[1]: byte2 = int(g[1])
    length = size - byte1
    if byte2 is not None: length = byte2 - byte1
    data = None; stream.seek(byte1); data = stream.read(length)
    rv = Response(data, 206, mimetype=stream.content_type[0], direct_passthrough=True)
    rv.headers.add('Content-Range', 'bytes {0}-{1}/{2}'.format(byte1, byte1 + length - 1, size))
    return rv

def request_json(request):
    evaluated = {}
    try:
        try: evaluated = demjson.decode(request.values['json'], encoding='utf8')  # may # may not json
        except: evaluated = literal_eval(request.values['json'])
        for key, value in request.values.items():
            if 'json.' in key:
                key = '.'.join(key.split('.')[1:])
                evaluated, key = dot_notation(evaluated, key)
                try: evaluated[key] = demjson.decode(value, encoding='utf8')
                except: evaluated[key] = value
    finally: return evaluated

def request_attributes(request, **kwargs):
    values = request.values
    _json = {}
    for key, _type in kwargs.items():
        if key not in values: raise AttributeError('{} not found.'.format(key))
        else:
            value = values[key]
            if _type is str: evaluated_value = value
            else:
                try: evaluated_value = demjson.decode(value, encoding='utf8')
                except: evaluated_value = literal_eval(value)
                if type(evaluated_value) is not _type: raise TypeError()
            _json[key] = evaluated_value
    return _json

def obj2str(tree):
    if isinstance(tree, dict):
        for k, node in tree.items(): tree[k] = obj2str(node)
        return tree
    elif isinstance(tree, list):
        _tree = []
        for node in tree: _tree.append(obj2str(node))
        return _tree
    elif isinstance(tree, ObjectId) or isinstance(tree, datetime): return str(tree)
    elif isinstance(tree, int) or isinstance(tree, float): return tree
    return tree

def str2obj(tree):
    if isinstance(tree, dict):
        for k, node in tree.items():
            tree[k] = str2obj(node)
        return tree
    elif isinstance(tree, list):
        _tree = []
        for node in tree:
            _tree.append(str2obj(node))
        return _tree
    try: return ObjectId(tree)
    except:
        if isinstance(tree, str):
            if tree.replace('.', '', 1).isdigit(): return float(tree)
        try:
            d = parse_date(tree)
            if d:
                return d
            return tree
        except: return tree

def free_from_(tree):
    if isinstance(tree, dict):
        new_tree = {}
        for k, node in tree.items():
            if '__' not in k: new_tree[k] = free_from_(node)
        return new_tree
    elif isinstance(tree, list):
        for idx, node in enumerate(tree): tree[idx] = free_from_(node)
    return tree

def dot_notation(_dict, key):
    keys = key.split('.')
    for key in keys[:-1]:
        if key not in _dict:
            _dict[key] = {}
        _dict = _dict[key]
    return _dict, keys[-1]

def _2num(s):
    if isinstance(s, str):
        regex = re.compile(r"[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?")
        nums = re.findall(regex, s)
        s = 0
        for n in nums: s = s * 1000 + int(n) if '.' not in n else float(n)
    return s

def configure(_set, func):
    def decorator(function):
        def wrapper(*args, **kwargs):
            return function(*args, **kwargs)
        return wrapper
    return lambda x: x

def crud(blueprint, collection, skeleton={}, template='', load=lambda x: (x, {}), ban=None):
    if not ban or 'insert' not in ban:
        # @blueprint.route('/+', methods=['POST', 'GET'])
        @blueprint.route('/<_id:(.*//|)/+>', methods=['POST', 'GET'])
        # @login_required
        async def create(r, _id=None):
            if _id and _id[-2:] == '/+': _id = _id[:-2]
            from copy import deepcopy
            document = deepcopy(skeleton)
            document.update(request_json(request))
            if _id: document['_id'] = ObjectId(_id)
            document['_date'] = datetime.now()
            result = await next(iter(blueprint.apps)).config['db'][collection].insert_one(document)
            return str(result.inserted_id)
    if not ban or 'delete' not in ban:
        @blueprint.route('/<_id>/*', methods=['GET', 'POST'])
        # @login_required
        async def delete(r, _id):
            await next(iter(blueprint.apps)).config['db'][collection].delete_one({
                '_id': ObjectId(_id)
            })
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    if not ban or 'delete_all' not in ban:
        @blueprint.route('/*', methods=['GET', 'POST'])
        # @login_required
        async def delete_all(r):
            await next(iter(blueprint.apps)).config['db'][collection].delete_many({})
            return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    if not ban or 'minimize' not in ban:
        @blueprint.route('/<_id>/-')
        async def minimize(r, _id):
            try:
                document = await next(iter(blueprint.apps)).config['db'][collection].find_one({'_id': ObjectId(_id)})
                obj2str(document)
                return response.json(document)
            except Exception as e: return str(e)
    if not ban or 'minimize_all' not in ban:
        @blueprint.route('/-')
        async def minimize_all(r):
            documents = await next(iter(blueprint.apps)).config['db'][collection].find({}).to_list(None)
            documents = [obj2str(document) for document in documents]
            return response.json(documents)
    if not ban or 'universal_alter' not in ban:
        @blueprint.route('/<_id>/$$', methods=['GET', 'POST'])
        async def universal_alter(r, _id):
            _id = ObjectId(_id)
            try:
                from pymongo import ReturnDocument
                _json = request_json(request)
                _json = free_from_(_json)
                _json = str2obj(_json)
                document = await next(iter(blueprint.apps)).config['db'][collection].find_one_and_update(
                    {'_id': _id},
                    {'$set': _json},
                    return_document=ReturnDocument.AFTER
                )
                document = obj2str(document)
                return render_template('crud/$$.html', **document)
            except Exception as e:
                print("sorry I can't update let's bring some thing to show")
                try:
                    document = await next(iter(blueprint.apps)).config['db'][collection].find_one({'_id': _id})
                    if not document:
                        raise
                    document = obj2str(document)
                except Exception as e:
                    print("sorry I can't show any thing sorry for you")
                    abort(501)
                return render_template('$$.html', ctx=document)
    if not ban or 'alter' not in ban:
        @blueprint.route('/<_id>/$', methods=['GET', 'POST'])
        async def alter(r, _id):
            _id = ObjectId(_id)
            try:
                if '_' in request.values:
                    _json = request_json(request)  # , specific_type=None)
                    node = request.values['_']
                    if not _json:
                        document = await next(iter(blueprint.apps)).config['db'][collection].find_one_and_update(
                            {'_id': _id},
                            {'$unset': {node: ""}},
                            return_document=ReturnDocument.AFTER
                        )
                    else:
                        document = await next(iter(blueprint.apps)).config['db'][collection].find_one_and_update(
                            {'_id': _id},
                            {'$set': {node: _json}},
                            return_document=ReturnDocument.AFTER
                        )
                else:
                    regex = re.compile(r"[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?")
                    fields = {}
                    for key, value in request.values.items():
                        _fields, key = dot_notation(fields, key)
                        _fields[key] = eval(value) if regex.match(value) else value
                    print(fields)
                    document = await next(iter(blueprint.apps)).config['db'][collection].find_one_and_update(
                        {'_id': _id},
                        {'$set': fields},
                        return_document=ReturnDocument.AFTER
                    )
                document = obj2str(document)
                return jsonify(document), 200
            except Exception as e:
                print(e)
                try:
                    document = await next(iter(blueprint.apps)).config['db'][collection].find_one({'_id': _id})
                    #  document['_id'] = str(document['_id'])
                    obj2str(document)
                    return render_template(template + '_plus.html', **document)
                except Exception as e:
                    print(e)
                    abort(405)
    if not ban or 'get' not in ban:
        @blueprint.route('/<_id>')
        async def get(r, _id):
            try:
                document = await next(iter(blueprint.apps)).config['db'][collection].find_one({'_id': ObjectId(_id)})
                document, ctx = load(document)
                #  document = obj2str(document)
                return render_template(template + '.html', **document)
            except Exception as e:
                return str(e)

if __name__ == '__main__': asyncio.new_event_loop().run_until_complete(globals()[f'util_{sys.argv[1]}']())