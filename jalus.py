import re, string, os.path, json, time, tempfile, asyncio, numpy as np, sys, yaml, hashlib, hmac, tempfile, subprocess, glob, urllib.parse, motor.motor_asyncio as async_motor, qrcode
from sanic import Sanic, Blueprint, response, exceptions
from random import choice, randint, random
from bson import ObjectId
from datetime import datetime, timedelta
from scipy.spatial import Voronoi, SphericalVoronoi
from string import ascii_lowercase
from base64 import (urlsafe_b64encode, urlsafe_b64decode)
from static import load_template, render_template
from io import BytesIO, StringIO

db_uri, db_name = "mongodb://{host}:{port}/".format(host="localhost", port=27017), os.path.basename(__file__).split('.')[0].capitalize()
app, otps, wss = Sanic(__name__), {}, None
app.config.update(dict(REQUEST_TIMEOUT=12, RESPONSE_TIMEOUT=12, asset_dir='/home/poorya/Pictures/estates',
WEBSOCKET_MAX_SIZE=2 ** 20, WEBSOCKET_MAX_QUEUE=32, WEBSOCKET_READ_LIMIT=2 ** 16, WEBSOCKET_WRITE_LIMIT=2 ** 16, WEBSOCKET_PING_INTERVAL=20, WEBSOCKET_PING_TIMEOUT=20))
app.add_route(lambda _: response.file(f'{os.path.dirname(os.path.abspath(__file__))}/static/icon/jalus_app_tent-8.png'), '/favicon.ico', name='redirect_ico')
app.add_route(lambda _: response.redirect('/properties/'), '/properties', name='properties_slash')
min_files = {'plyr.js': 'plyr.js', 'plyr.css': 'plyr.min.css'}
@app.route('/static/<path:path>', methods=['GET'])
async def static_file(r, path): return await response.file(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', *urllib.parse.unquote(min_files.get(path, path)).split('/')))
@app.listener('before_server_start')
async def init_ones(sanic, loop): 
    app.config['db'] = async_motor.AsyncIOMotorClient(db_uri, maxIdleTimeMS=10000, minPoolSize=10, maxPoolSize=50, connectTimeoutMS=10000, retryWrites=True, waitQueueTimeoutMS=10000, serverSelectionTimeoutMS=10000)[db_name]
    # await Key.get_collection().create_index([("home", 1), ("phone", 1), ("fix", 1)], )  # , unique=True)
@app.listener('after_server_stop')
async def close_connection(app, loop): app.config['db'].close()

@app.post('/key/<home>/<sim>/<head>/<tail>/<value:int>')  # inja be name khodesh tooye db vase in home reserver mikone deghat beshe ke vase har home, phone maa faghat ye reserve darim.
async def save_key(r, home, sim, head, tail, value):
    sim = int(sim[3:] if sim[:3] == '+98' else sim[1:] if sim[0] == '0' else sim)
    try: session = json.loads(decode(r.headers.get('Authorization')).decode()); assert session['exp'] >= str(datetime.now()).split()[0]
    except: return response.json({'OK': False, 'e': 'jwt required'})
    Key = r.app.config['db']['keys']
    if await Key.find_one({'home': home, 'phone': session['phone'], 'fix': False}): return response.json({'OK': False, 'e': 'already existed', 'en': 1})
    # TODO attack in ke value joda midan 1 toman badesh hamino mirizan be hesab va kilid dorost mikonan ziad
    try: await Key.insert_one({'home': home, 'sim': sim, 'phone': session['phone'], 'head': head, 'tail': tail, 'value': value, 'save': datetime.now(), 'fix': False}); return response.json({'OK': True})
    except: return response.json({'OK': False})
@app.delete('/key/_/_/<head>/<tail>')
async def free_key(r, head=None, tail=None):  # pending ro chetori delete konim
    key, session = json.loads(decode(r.args['key'][0].encode()).decode()), json.loads(decode(r.args['session'][0].encode()).decode())
    assert session['exp'] >= str(datetime.now()).split()[0]
    head, tail = max(head, key['head']), max(tail, key['tail']) if head and tail else key['head'], key['tail']
    await r.app.config['db']['keys'].delete_many({'home': key['home'], 'head': {'$gte': head}, 'tail': {'$lte': tail}, 'fix': {'$ne': False}})
    return response.json({'OK': True})
@app.delete('/key/<home>')
async def cancel_key(r, home):
    session = json.loads(decode(r.headers.get('Authorization')).decode()); assert session['exp'] >= str(datetime.now()).split()[0]
    r = await r.app.config['db']['keys'].delete_many({'home': home, 'phone': session['phone'], 'fix': False})
    return response.json({'OK': True if r.deleted_count else False})
@app.put('/key/<home>/<phone>/<head>/<tail>')
async def fix_key(r, home, phone, head, tail):
    try: phone = int(phone[3:] if phone[:3] == '+98' else phone[1:] if phone[0] == '0' else phone)
    except: return response.json({'OK': False, 'e': 'phone malformed format'})
    key, session = json.loads(decode(r.args['key'][0].encode()).decode()), json.loads(decode(r.args['session'][0].encode()).decode())
    assert session['exp'] >= str(datetime.now()).split()[0]
    if key['head'] <= head and tail <= key['tail']:
        r = await r.app.config['db']['keys'].update_one({'home': home, 'phone': phone}, {'$set': {'fix': datetime.now()}})
        return response.json({'OK': True})
    return response.json({'OK': False, 'e': 'range out of bound'})
@app.get('/key')
async def load_phone_keys(r, ):
    session = json.loads(decode(r.headers.get('Authorization')).decode()); assert session['exp'] >= str(datetime.now()).split()[0]
    keys = await r.app.config['db']['keys'].find({'phone': session['phone']}).to_list(None)
    for key in keys:
        del key['_id']; del key['save']; print(key)
        if key['fix']: del key['fix']; key['key'] = encrypt(json.dumps(key).encode()).decode()
    return response.json(keys)
@app.get('/key/<home>')
async def load_home_keys(r, home):  #3 badana age niaz shod phone ham bebine age baze key to r.args mohit bar key bud eshkal nadare
    # session = json.loads(decode(r.headers.get('Authorization')).decode()); assert session['exp'] >= str(datetime.now()).split()[0]
    keys = await r.app.config['db']['keys'].find({'home': home, 'fix': {'$ne': False}}).sort('head', 1).to_list(None)
    for key in keys: del key['_id']; del key['phone']; del key['save']; del key['fix']
    return response.json(keys)
    # return await Key.get_collection().find({'home': home, '$or': [{'head': {'$gte': datetime.now() - timedelta(days=30), '$lte': datetime.now() + timedelta(days=60)}}, {'tail': {'$gte': datetime.now() - timedelta(days=30), '$lte': datetime.now() + timedelta(days=90)}}]}).to_list(None)
@app.get('/otp/<phone>/<otp:path>')
async def _otp(r, phone, otp=None):
    try: phone = int(phone[3:] if phone[:3] == '+98' else phone[1:] if phone[0] == '0' else phone)
    except: return response.json({'OK': False, 'e': 'phone malformed format'})
    if otp: return response.json({'OK': True, 'session': encode(json.dumps({'phone': phone, 'exp': str(datetime.now() + timedelta(days=180)).split()[0]}).encode())}) if phone in otps and otps[phone] == int(otp.lstrip('0')) else response.json({'OK': False})
    else:
        otps[phone] = (phone * 137 * (datetime.now().hour + 1)) % 10000; 
        if not wss: return response.json({'OK': False, 'otp':  otps[phone]} if '-d' in sys.argv or '--debug' in sys.argv else {'OK': False})
        # try: await wss.send(f'SMS {phone} {otps[phone]:04d}'); return response.json({'OK': True, 'otp':  otps[phone], 'ws': json.loads(await wss.recv())} if '-d' in sys.argv or '--debug' in sys.argv else json.loads(await wss.recv()))
        try: return response.json({'OK': True, 'otp':  otps[phone]})
        except: return response.json({'OK': False, 'otp':  otps[phone]} if '-d' in sys.argv or '--debug' in sys.argv else {'OK': False})
@app.get("/pay/<date>/<src:int>/<dst:int>/<value:int>")  # src, dst = 9...:phone
async def _payment_receipt(r, date, src, dst, value): pass

@app.get('/fill/<q>')
async def _fill(r, q):
    if q not in wild_polygons: polygons = []
    else: polygons = wild[q][:4]
    if q not in wild_features: features = []
    else: filters = wild_filters[q][:4]
    return response.json({'polygons': polygons, 'filters': filters})
@app.get('/search/<polygon>')
async def _search(r, polygon):
    polygon = polygon.split(';'); polygon = [[float(dim) for dim in p.split(',')] for p in polygons]
    filter = r.param['filter']; filter = json.loads(filter)
    properties = await r.app.config['db']['keys'].find({'location': {'$geoWithin': {'$polygon': polygon}}, **filter}).to_list(None)
    for pr in properties: del pr['_id']; del pr['_date']
    return response.json(properties)

@app.post('/potent')
async def _append_potent(r, ):
    potent = {'datetime': str(datetime.now()).split('.')[0], 'user': r.form['user'][0], 'phone': r.form['phone'][0], 'interest': r.form['interest'][0], 'link': r.form['link'][0], 'lat': r.form['lat'][0], 'lng': r.form['lng'][0]}
    with open('static/potents.csv', 'a') as potents: potents.write(','.join(potent.values()) + '\n')
    return response.json({'OK': True})
@app.get('/stories/<name_category>')  # ffmpeg -i input.mp4 -s hd480 -c:v libx264 -crf 23 -c:a aac -strict -2 output.mp4
async def _thumbnail(r, name_category):
    if name_category[-4:] != '.jpg': 
        category = '*' if name_category == '_' else name_category; stories = sorted(glob.glob(f'static/stories/{category}_*.*.[mv][pt][4t]'), key=os.path.getmtime); story_names = {}
        for story in stories:
            name = os.path.basename(story); title = name.split('.')[0]
            if title not in story_names: story_names[title] = [[], [], [randint(0, 59), randint(60, 119)]]
            if name.split('.')[2] == 'mp4': story_names[title][0].append(int(name.split('.')[1]))
            if name.split('.')[2] == 'vtt': story_names[title][1].append(name.split('.')[1])
        return response.json(story_names)
    name = urllib.parse.unquote(name_category); name = name[:-4]
    if not os.path.exists(f'static/stories/{name}.jpg'):
        names = glob.glob(f'static/stories/{name}.*.mp4')
        if not names: raise exceptions.NotFound()
        subprocess.run(' '.join(['ffmpeg', '-ss', '0', '-i', f'"{os.path.dirname(os.path.abspath(__file__))}/{max(names, key=lambda nm: chr(len(nm)) + str.casefold(nm))}"', '-vframes', '1', '-f', 'image2', '-vf', '"blackframe=0,metadata=select:key=lavfi.blackframe.pblack:value=50:function=less"', f'"{os.path.dirname(os.path.abspath(__file__))}/static/stories/{name}.jpg"']), shell=True, capture_output=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return await response.file(f'static/stories/{name}.jpg')

@app.get('/properties/<home:path>')
async def _properties_get(r, home=None, ): return response.html((await response.file(f"{os.path.dirname(os.path.abspath(__file__))}/templates/Search{'' if '-d' in sys.argv or '--debug' in sys.argv else '.serv'}.html")).body.decode('utf-8'))
@app.post('/properties')
async def _properties(r, ):
    with open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties.yml', encoding='utf8') as f: return response.json(yaml.safe_load(f.read()))

@app.get('/homes/<home>/qr')
async def _qr_(r, home):
    img_io = BytesIO()
    qrcode.make('Some data here').save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return response.raw(body=img_io.getvalue(), content_type='image/jpeg', headers={f'Content-Disposition': 'filename="key.jpeg"'})
@app.get('/homes/<home>/-')
async def _smart_home_state(r, home, ):
    with open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties.yml', encoding='utf8') as f:
        properties = yaml.safe_load(f.read()); properties = properties['properties']; properties = {p['id']: p for p in properties}
        if home in properties: return response.json(properties[home]['spaces'])
        else: raise exceptions.NotFound()
@app.get('/homes/<home>')
async def _smart_home(r, home, ): return response.html((await response.file(f"{os.path.dirname(os.path.abspath(__file__))}/templates/Home{'' if '-d' in sys.argv or '--debug' in sys.argv else '.serv'}.html")).body.decode('utf-8')) 
@app.get('/<page:path>')
async def _page(r, page=None): page = 'jalus' if page == '' else page; return response.html((await render_template('base.html', {'title': {'jalus': 'جالوس', 'go': 'جالوس رو', 'dual': 'جالوس بنای سبز دومنظوره', 'rebuild': 'جالوس بازسازی', 'host': 'جالوس صاحبخونه'}[page], 'style': 'digikala'})).replace('/// block #content', await render_template(f'{page.capitalize()}.js', {})) if '-d' in sys.argv else await load_template(f'{page.capitalize()}.serv.html'))

if __name__ == '__main__':
    debug = True if '-d' in sys.argv or '--debug' in sys.argv else False
    if '-p' in sys.argv and int(sys.argv[(sys.argv.index('-p') + 1)]) == 443 or '--port' in sys.argv and int(sys.argv[(sys.argv.index('--port') + 1)]) == 443: app.run(host='0.0.0.0', port=443, debug=debug, auto_reload=debug, ssl={"cert": "/etc/letsencrypt/live/jalus.ir/fullchain.pem", "key": "/etc/letsencrypt/live/jalus.ir/privkey.pem"})
    if '-p' in sys.argv or '--port' in sys.argv: app.run(host='0.0.0.0', port=int(sys.argv[(sys.argv.index('-p') + 1) if '-p' in sys.argv else (sys.argv.index('--port') + 1)]), debug=debug, auto_reload=debug)
    else: app.run(host='0.0.0.0', port=5000, debug=debug, auto_reload=debug)