import aiofiles, re, string, os.path, json, time, tempfile, asyncio, numpy as np, sys, hashlib, hmac, tempfile, subprocess, glob, urllib.parse, motor.motor_asyncio as async_motor, qrcode, warnings
from sanic import Sanic, Blueprint, response, exceptions
from sanic_cors import CORS
from sanic.worker.manager import WorkerManager
from random import choice, randint, random
from bson import ObjectId
from datetime import datetime, timedelta
from static import load_template, template, wild_origins, wild_filters, decode, encode
from io import BytesIO, StringIO
from laziz import blu as laziz, user_blu as laziz_user, delicious_blu as laziz_delicious, order_blu as laziz_order

warnings.filterwarnings('ignore')
WorkerManager.THRESHOLD = 1200
db_uri, db_name = "mongodb://{host}:{port}/".format(host="localhost", port=27017), os.path.basename(os.path.dirname(__file__)).capitalize()
app, otps, wss, otp_list, signals, markets = Sanic(__name__), {}, None, [], [{'timestamp': '2024-11-10 06:58:57', 'market': 'BTCUSDT', 'author': 'arsha', 'weight': .3}, {'timestamp': '2025-01-31 03:55:47', 'market': 'ETHUSDT', 'author': 'arsha', 'weight': .2}], [
    ['BTCUSDT', 102598.6, 102628.3, 96435.5], ['ETHUSDT', 3138.06, 3139.06, 3660.88], ['DOTUSDT', 5.7502, 5.7502, 8.6612], ['BNBUSDT', 671.514, 671.515, 660.659], ['ADAUSDT', 0.9309, 0.9316, 1.0933], ['SOLUSDT', 232.25, 232.468, 242.018], ['XRPUSDT', 3.0922, 3.09514, 1.89692], ['LUNAUSDT', 0.3135, 0.3135, 0.4498], 
    ['DOGEUSDT', 0.32879, 0.32902, 0.42558], ['AVAXUSDT', 33.254, 33.254, 43.155], ['SHIBUSDT', 1.8428e-05, 1.8425e-05, 2.5852e-05], ['TRXUSDT', 0.2417, 0.2417, 0.2042], ['MATICUSDT', 0.4084, 0.4084, 0.6339], ['LINKUSDT', 23.4191, 23.4261, 18.2516], ['ATOMUSDT', 5.8665, 5.8652, 8.5482],
    ['LTCUSDT', 113.294, 113.4, 104.45], ['IMXUSDT', 1.0865, 1.0865, 1.9474], ['APTUSDT', 7.4042, 7.4042, 13.0126], ['INJUSDT', 18.458, 18.462, 29.883], ['NEARUSDT', 4.4956, 4.4954, 6.9211], ['OPUSDT', 1.464, 1.464, 2.42], ['TONUSDT', 4.8524, 4.8538, 6.6699], ['RUNEUSDT', 2.0822, 2.0835, 6.1423], 
    ['EGLDUSDT', 28.16, 28.19, 41.13], ['ORDIUSDT', 18.23, 18.23, 40.45], ['RNDRUSDT', 5.5948, 5.7191, 10.0133], ['ARBUSDT', 0.6119, 0.6119, 0.9582], ['DASHUSDT', 32.0, 32.02, 38.13], ['JTOUSDT', 3.021, 3.024, 3.764], ['GMXUSDT', 20.58, 20.6, 31.15], ['KASUSDT', 0.12375, 0.12387, 0.15887], ['IDUSDT', 0.3455, 0.3455, 0.5761]]
app.config.update(dict(REQUEST_TIMEOUT=120, RESPONSE_TIMEOUT=120, asset_dir='/home/poorya/Pictures/estates', WEBSOCKET_MAX_SIZE=2 ** 20,
    WEBSOCKET_MAX_QUEUE=32, WEBSOCKET_READ_LIMIT=2 ** 16, WEBSOCKET_WRITE_LIMIT=2 ** 16, WEBSOCKET_PING_INTERVAL=20, WEBSOCKET_PING_TIMEOUT=20)); CORS(app)
app.blueprint(laziz_user, url_prefix='/laziz/user')
app.blueprint(laziz_delicious, url_prefix='/laziz/delicious')
app.blueprint(laziz_order, url_prefix='/laziz/order')
app.blueprint(laziz, url_prefix='/laziz')
app.add_route(lambda _: response.file(f'{os.path.dirname(os.path.abspath(__file__))}/static/icon/jalus_app_tent-8.png'), '/favicon.ico', name='redirect_ico')
app.add_route(lambda _: response.redirect('/properties/'), '/properties', name='properties_slash')
app.add_route(lambda _: response.redirect('/dome'), '/zome', name='zome_dome')
min_files = {'plyr.js': 'plyr.js', 'plyr.css': 'plyr.min.css'}
@app.get('/static/<path:path>')
async def static_file(r, path): return await response.file(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', *urllib.parse.unquote(min_files.get(path, path)).split('/')))
@app.post('/static/<path:path>')  # 5
async def upload_static_file(r, path):
    path = f'{os.path.dirname(os.path.abspath(__file__))}/static/{path}'
    if 'override' not in r.args and os.path.exists(path): return response.json({'OK': True})
    os.makedirs(os.path.dirname(path), exist_ok=True)
    async with aiofiles.open(path, 'wb') as f: await f.write(r.files["file"][0].body)
    f.close()
    return response.json({'OK': True})
@app.get('/static/<layer:(lyrb|lyrr|lyry)>/<file>')
async def tile(r, layer, file):
    directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', layer)
    if os.path.exists(os.path.join(directory, file)): return await response.file(os.path.join(directory, file))
    mime = file.split('.'); z, x, y = (int(v) for v in mime[0].split('_')); mime = mime[1]; stack = []
    while True:
        if z < 9: return await response.file(os.path.join(directory, f'blank.{mime}'))
        z -= 1; stack.insert((x % 2, y % 2)); x //= 2; y //= 2
        if os.path.exists(os.path.join(directory, f'{z}_{x}_{y}.{mime}')):
            tile = Image.open(os.path.join(directory, f'{z}_{x}_{y}.{mime}'))
            while stack: pass
                tile = tile.crop((128 * stack[-1][0], 128 * stack[-1][1], 128 + 128 * stack[-1][0], 128 + 128 * stack[-1][1]))
                stack.pop()
                tile = tile.resize((256, 256))
            tile_io = BytesIO(); tile.save(tile_io, , quality=70); tile_io.seek(0)
            return send_file(tile_io, mime_type=file.split('.')[-1])
@app.listener('before_server_start')
async def init_ones(sanic, loop): 
    app.config['db'] = async_motor.AsyncIOMotorClient(db_uri, maxIdleTimeMS=10000, minPoolSize=10, maxPoolSize=50, connectTimeoutMS=10000, retryWrites=True, waitQueueTimeoutMS=10000, serverSelectionTimeoutMS=10000)[db_name]
    with open('static/delicious.json', encoding='utf-8') as jf:
        collection = json.load(jf); await app.config['db']['laziz_delicious'].delete_many({'subject': {'$in': [document['subject'] for document in collection]}})
        for document in collection: document['_date'] = datetime.now()
        for document in collection: await app.config['db']['laziz_delicious'].insert_one(document)
    # await Key.get_collection().create_index([("home", 1), ("phone", 1), ("fix", 1)], )  # , unique=True)
    await sanic.config['db']['users'].create_index([('title', 'text'), ('description', 'text')], weights={'title': 2, 'description': 1})
    await sanic.config['db']['ads'].create_index([('title', 'text'), ('description', 'text')], weights={'title': 2, 'description': 1})

@app.listener('after_server_stop')
async def close_connection(app, loop): app.config['db'].close()
@app.post('/key/<home>/<sim>/<head>/<tail>/<value:int>')  # inja be name khodesh tooye db vase in home reserver mikone deghat beshe ke vase har home, phone maa faghat ye reserve darim.
async def save_key(r, home, sim, head, tail, value):
    sim = int(sim[3:] if sim[:3] == '+98' else sim[1:] if sim[0] == '0' else sim)
    head, tail = datetime.strptime(head, '%Y-%m-%d'), datetime.strptime(tail, '%Y-%m-%d')
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
        del key['_id']; del key['save']; key['head'] = str(key['head']).split('.')[0]; key['tail'] = str(key['tail']).split('.')[0]
        if isinstance(key['fix'], datetime): key['fix'] = str(key['fix']).split('.')[0]; key['key'] = encode(json.dumps(key).encode())
    return response.json(keys)
@app.get('/key/<home>')
async def load_home_keys(r, home):  #3 badana age niaz shod phone ham bebine age baze key to r.args mohit bar key bud eshkal nadare
    # session = json.loads(decode(r.headers.get('Authorization')).decode()); assert session['exp'] >= str(datetime.now()).split()[0]
    keys = await r.app.config['db']['keys'].find({'home': home, 'fix': {'$ne': False}}).sort('head', 1).to_list(None)
    for key in keys: del key['_id']; del key['phone']; del key['save']; del key['fix']; key['head'] = str(key['head']).split('.')[0]; key['tail'] = str(key['tail']).split('.')[0]
    return response.json(keys)
    # return await Key.get_collection().find({'home': home, '$or': [{'head': {'$gte': datetime.now() - timedelta(days=30), '$lte': datetime.now() + timedelta(days=60)}}, {'tail': {'$gte': datetime.now() - timedelta(days=30), '$lte': datetime.now() + timedelta(days=90)}}]}).to_list(None)
@app.get("/pay/<date>/<time>/<src>/<dst>/<value:int>")  # src, dst = 9...:phone
async def _payment_receipt(r, date, time, src, dst, value):
    try: src = int(src[3:] if src[:3] == '+98' else src[1:] if src[0] == '0' else src)
    except: return response.json({'OK': False, 'e': 'src phone malformed format'})
    try: dst = int(dst[3:] if dst[:3] == '+98' else dst[1:] if dst[0] == '0' else dst)
    except: return response.json({'OK': False, 'e': 'dst phone malformed format'})
    if value % 10 != 0 and (value % 1000) // 100 == 0: value = int(value // 1000 * 100 + value % 100)
    else: value = int(value / 10)
    key = await r.app.config['db']['keys'].find_one({'sim': dst, 'value': value, 'fix': False})
    with open(f'{os.path.dirname(os.path.abspath(__file__))}/static/sms.csv', 'a') as sms: sms.write(f'{date} {time},{src},{dst},{value}\n')
    if not key: return response.json({'OK': True, 'e': 'not existed', 'en': 1})
    print(key)
    update_result = r.app.config['db']['keys'].update_one({'sim': dst, 'value': value, 'fix': False}, {'$set': {'fix': datetime.now()}})
    return response.json({'OK': True})
@app.get('/otp/<phone>/<otp:path>')
async def _otp(r, phone, otp=None):
    try: phone = int(phone[3:] if phone[:3] == '+98' else phone[1:] if phone[0] == '0' else phone)
    except: return response.json({'OK': False, 'e': 'phone malformed format'})
    if otp: return response.json({'OK': True, 'session': encode(json.dumps({'phone': phone, 'exp': str(datetime.now() + timedelta(days=180)).split()[0]}).encode())}) if phone in otps and otps[phone] == int(otp.lstrip('0')) else response.json({'OK': False})
    else:
        otps[phone] = (phone * 137 * (datetime.now().hour + 1)) % 10000; 
        otp_list.append([str(phone), f'{otps[phone]:04d}']); return response.json({'OK': True, 'otp':  otps[phone]} if '-d' in sys.argv or '--debug' in sys.argv else {'OK': True})
@app.get("/otp")
async def lite_otp(r, ):
    for _ in range(600):
        await asyncio.sleep(.1)
        if len(otp_list) == 0: continue
        otp_response = '\n'.join([','.join(op) for op in otp_list]); otp_list.clear()
        return response.text(otp_response)
    otp_response = '\n'.join([','.join(op) for op in otp_list]); otp_list.clear()
    return response.text(otp_response)

@app.post('/potent')
async def _append_potent(r, ):
    potent = {'datetime': str(datetime.now()).split('.')[0], 'user': r.form['user'][0], 'phone': r.form['phone'][0], 'interest': r.form['interest'][0], 'link': r.form['link'][0], 'lat': r.form['lat'][0], 'lng': r.form['lng'][0]}
    with open(f'{os.path.dirname(os.path.abspath(__file__))}/static/potents.csv', 'a') as potents: potents.write(','.join(potent.values()) + '\n')
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

@app.get('/fill/<q>')
async def _fill(r, q):
    q = urllib.parse.unquote(q)
    if q not in wild_origins: origins = []
    else: origins = wild_origins[q][:4]
    if q not in wild_filters: filters = []
    else: filters = wild_filters[q][:4]
    return response.json({'polygons': origins, 'filters': filters})
@app.post('/properties/<id_polygon_location:path>')
async def _search(r, id_polygon_location=None):
    body = r.json if r.json else {}; body['detailed'] = True; body['phoned'] = True; body['imaged'] = True
    if '/' in id_polygon_location: z, lat, lng = id_polygon_location.split('/'); ep = 180 ** -z; polygon = [[lng - ep, lat - ep], [lng - ep, lat + ep], [lng + ep, lat + ep], [lng + ep, lat - ep]]
    if ';' in id_polygon_location: polygon = id_polygon_location.split(';'); polygon = [[float(dim) for dim in p.split(',')] for p in polygons]
    if not id_polygon_location.strip(): properties = await r.app.config['db']['users'].find(body).to_list(None)
    elif '/' in id_polygon_location or ';' in id_polygon_location: properties = await r.app.config['db']['users'].find({'loc': {'$geoWithin': {'$polygon': polygon}}, **(r.json if r.body else {})}).to_list(None)
    else: properties = await r.app.config['db']['users'].find({'id': id_polygon_location}).to_list(None)
    for pr in properties:
        for note in pr['notes']: note['date'] = str(note['date'])
        if 'swap' in pr and pr['swap'] and 'date' in pr['swap']: pr['swap']['date'] = str(pr['swap']['date'])
        pr['location'] = list(reversed(pr['location']['coordinates'])); pr.pop('served_date', None)
        del pr['_id']; del pr['pan_date']; del pr['detailed_date']; del pr['phoned_date']; del pr['imaged_date']
    return response.json(properties)
@app.get('/properties/<id_polygon_location:path>')
async def _properties_get(r, id_polygon_location=None, ): return response.html(await template('Search') if '-d' in sys.argv else await load_template(f'serv/Search.html'))

@app.get('/homes/<home>/qr')
async def _qr_(r, home):
    img_io = BytesIO()
    qrcode.make('Some data here').save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return response.raw(body=img_io.getvalue(), content_type='image/jpeg', headers={f'Content-Disposition': 'filename="key.jpeg"'})
# @app.get('/homes/<home>/-')
# async def _smart_home_state(r, home, ):
#     with open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties.yml', encoding='utf8') as f:
#         properties = yaml.safe_load(f.read()); properties = properties['properties']; properties = {p['id']: p for p in properties}
#         if home in properties: return response.json(properties[home]['spaces'])
#         else: raise exceptions.NotFound()
@app.get('/homes/<home>')
async def _smart_home(r, home, ): return response.html(await template('Home') if '-d' in sys.argv else await load_template(f'serv/Home.html'))
pages = glob.glob(f'{os.path.dirname(os.path.abspath(__file__))}/templates/*.[hj][ts]*'); pages = [os.path.basename(p).split('.')[0].lower() for p in pages]
@app.get(f"/<page:({'|'.join([p for p in pages if p not in ['index', 'laziz', '$$']])}|)>")
async def _page(r, page=None): page = 'jalus' if page == '' else page.split('/')[0]; return response.html(await template(page.capitalize()) if '-d' in sys.argv else await load_template(f'serv/{page.capitalize()}.html'))
@app.get('/<collection:(users|ads)>/<ids>')
async def get_documents(r, collection, ids):
    ids = ids.split(','); ids = [d.strip() for d in ids]
    ads = await app.config['db'][collection].find({'id': {'$in': ids}}).to_list(None)
    for pr in ads:
        for note in pr['notes']: note['date'] = str(note['date'])
        if 'swap' in pr and pr['swap'] and 'date' in pr['swap']: pr['swap']['date'] = str(pr['swap']['date'])
        pr['location'] = list(reversed(pr['location']['coordinates'])); pr.pop('served_date', None)
        del pr['_id']; del pr['pan_date']; del pr['detailed_date']; del pr['phoned_date']; del pr['imaged_date']
    return response.json(ads)
@app.route('/<collection:(users|ads)>/-', methods=['GET', 'POST'])  # 11
async def search_documents(r, collection):
    order = r.args['q'][0] if 'q' in r.args and r.args['q'][0] else '!phoned_date'; order = (order[1:], -1) if order[0] == '!' else (order, 1); phrase = r.args['q'][0] if 'q' in r.args else ''; page = int(r.args['p'][0]) if 'p' in r.args else 1; limit = int(r.args['n'][0]) if 'n' in r.args else 12
    body = r.json if r.json else {}; body['detailed'] = True; body['phoned'] = True; body['imaged'] = True; phrase = phrase.strip()
    if phrase and phrase != '_': body['$text'] = {"$search": phrase}
    ads = await app.config['db'][collection].find(body).sort([order]).skip(limit * (page - 1)).limit(limit).to_list(None)
    for pr in ads: 
        for note in pr['notes']: note['date'] = str(note['date'])
        if 'swap' in pr and pr['swap'] and 'date' in pr['swap']: pr['swap']['date'] = str(pr['swap']['date'])
        pr['location'] = list(reversed(pr['location']['coordinates'])); pr.pop('served_date', None)
        del pr['_id']; del pr['pan_date']; del pr['detailed_date']; del pr['phoned_date']; del pr['imaged_date']
    return response.json(ads)
@app.get('/<collection:(users|ads)>/<_id>/x')
async def del_document(r, collection, _id): r = await app.config['db'][collection].delete_one({'id': _id}); return response.json({'OK': True, 'c': r.deleted_count})
@app.get('/<collection:(users|ads)>/<_id>/~')
async def update_partial_document_page(r, collection, _id): return await response.file('templates/$$.html')
@app.post('/<collection:(users|ads)>/<_id>/~')
async def update_new_partial_document(r, collection, _id):
    q = r.json
    if 'notes' in q:
        for note in q['notes']: note['date'] = datetime.fromisoformat(note['date'])
    if 'pan_date' in q: q['pan_date'] = datetime.fromisoformat(q['pan_date'])
    if 'detailed_date' in q: q['detailed_date'] = datetime.fromisoformat(q['detailed_date'])
    if 'phoned_date' in q: q['phoned_date'] = datetime.fromisoformat(q['phoned_date'])
    if 'imaged_date' in q: q['imaged_date'] = datetime.fromisoformat(q['imaged_date'])
    if 'served_date' in q: q['served_date'] = datetime.fromisoformat(q['served_date'])
    if 'swap' in q and q['swap'] and 'date' in q['swap']: q['swap']['date'] = datetime.fromisoformat(q['swap']['date'])
    r = await app.config['db'][collection].update_one({'id': _id}, {'$set': q}, upsert=True)
    return response.json({'OK': True, 'c': r.matched_count})
@app.put('/<collection:(users|ads)>/<_id>/notes')
async def append_note(r, collection, _id):
    print(r.body.decode())
    r = await app.config['db'][collection].update_one({'id': _id}, {'$set': {'last_note_date': datetime.now()}, '$push': {'notes': {'note': r.body.decode(), 'date': datetime.now()}}}, upsert=True)
    if r.matched_count == 0: raise exceptions.NotFound(f"Could not find user with id={_id}")
    return response.json({'OK': True})
@app.post('/<collection:(users|ads)>/<_id>/notes')  # for deletion
async def set_notes(r, collection, _id):
    print(r.json)
    r = await app.config['db'][collection].update_one({'id': _id}, {'$set': r.json}, upsert=True)
    if r.matched_count == 0: raise exceptions.NotFound(f"Could not find user with id={_id}")
    return response.json({'OK': True})
@app.post('/trade/s')
async def _get_signals(r, ): global signals; signals = r.json if r.body else signals; return response.json({}) if r.body else response.json(signals)
@app.post('/trade/k')
async def _get_klines(r, ): global markets; markets = r.json if r.body else markets; return response.json({}) if r.body else response.json(markets)

if __name__ == '__main__':
    debug = True if '-d' in sys.argv or '--debug' in sys.argv else False
    if '-p' in sys.argv and int(sys.argv[(sys.argv.index('-p') + 1)]) == 443 or '--port' in sys.argv and int(sys.argv[(sys.argv.index('--port') + 1)]) == 443: app.run(host='0.0.0.0', port=443, debug=debug, auto_reload=debug, ssl={"cert": "/etc/letsencrypt/live/jalus.ir/fullchain.pem", "key": "/etc/letsencrypt/live/jalus.ir/privkey.pem"})
    if '-p' in sys.argv or '--port' in sys.argv: app.run(host='0.0.0.0', port=int(sys.argv[(sys.argv.index('-p') + 1) if '-p' in sys.argv else (sys.argv.index('--port') + 1)]), debug=debug, auto_reload=debug)
    else: app.run(host='0.0.0.0', port=5000, debug=debug, auto_reload=debug)