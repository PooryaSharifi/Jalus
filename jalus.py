import re, string, os.path, json, time, tempfile, asyncio, numpy as np, sys, yaml, hashlib, hmac, tempfile, subprocess, glob, urllib.parse, motor.motor_asyncio as async_motor, qrcode
from sanic import Sanic, Blueprint, response, exceptions
from sanic.worker.manager import WorkerManager
from random import choice, randint, random
from bson import ObjectId
from datetime import datetime, timedelta
from static import load_template, render_template, wild_origins, wild_filters, decode, encode, template_titles
from io import BytesIO, StringIO

WorkerManager.THRESHOLD = 1200
db_uri, db_name = "mongodb://{host}:{port}/".format(host="localhost", port=27017), os.path.basename(os.path.dirname(__file__)).capitalize()
app, otps, wss, otp_list = Sanic(__name__), {}, None, []
app.config.update(dict(REQUEST_TIMEOUT=120, RESPONSE_TIMEOUT=120, asset_dir='/home/poorya/Pictures/estates',
WEBSOCKET_MAX_SIZE=2 ** 20, WEBSOCKET_MAX_QUEUE=32, WEBSOCKET_READ_LIMIT=2 ** 16, WEBSOCKET_WRITE_LIMIT=2 ** 16, WEBSOCKET_PING_INTERVAL=20, WEBSOCKET_PING_TIMEOUT=20))
app.add_route(lambda _: response.file(f'{os.path.dirname(os.path.abspath(__file__))}/static/icon/jalus_app_tent-8.png'), '/favicon.ico', name='redirect_ico')
app.add_route(lambda _: response.redirect('/properties/'), '/properties', name='properties_slash')
app.add_route(lambda _: response.redirect('/dome'), '/zome', name='zome_dome')
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
        del key['_id']; del key['save']; key['head'] = str(key['head']); key['tail'] = str(key['tail'])
        if key['fix']: str(key['fix']); key['key'] = encrypt(json.dumps(key).encode()).decode()
    return response.json(keys)
@app.get('/key/<home>')
async def load_home_keys(r, home):  #3 badana age niaz shod phone ham bebine age baze key to r.args mohit bar key bud eshkal nadare
    # session = json.loads(decode(r.headers.get('Authorization')).decode()); assert session['exp'] >= str(datetime.now()).split()[0]
    keys = await r.app.config['db']['keys'].find({'home': home, 'fix': {'$ne': False}}).sort('head', 1).to_list(None)
    for key in keys: del key['_id']; del key['phone']; del key['save']; del key['fix']
    return response.json(keys)
    # return await Key.get_collection().find({'home': home, '$or': [{'head': {'$gte': datetime.now() - timedelta(days=30), '$lte': datetime.now() + timedelta(days=60)}}, {'tail': {'$gte': datetime.now() - timedelta(days=30), '$lte': datetime.now() + timedelta(days=90)}}]}).to_list(None)
@app.get("/pay/<date>/<src:int>/<dst:int>/<value:int>")  # src, dst = 9...:phone
async def _payment_receipt(r, date, src, dst, value):
    try: dst = int(dst[3:] if dst[:3] == '+98' else dst[1:] if dst[0] == '0' else dst)
    except: return response.json({'OK': False, 'e': 'dst phone malformed format'})
    if value % 10 != 0 and (value % 1000) // 100 == 0: value = value // 1000 * 100 + value % 100
    else: value //= 10
    key = await r.app.config['db']['keys'].find_one({'sms': dst, 'value': value, 'fix': False})
    if not key: return response.json({'OK': False, 'e': 'not existed', 'en': 1})
    print(key)
    update_result = r.app.config['db']['keys'].update_one({'sms': dst, 'value': value, 'fix': False}, {'$set': {'fix': datetime.now()}})
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

@app.get('/fill/<q>')
async def _fill(r, q):
    q = urllib.parse.unquote(q)
    if q not in wild_origins: origins = []
    else: origins = wild_origins[q][:4]
    for ori in origins: ori['polygon'] = ori['polygon'].tolist()
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
    for pr in properties: pr['location'] = list(reversed(pr['location']['coordinates'])); del pr['_id']; del pr['pan_date']; del pr['detailed_date']; del pr['phoned_date']; del pr['imaged_date']
    return response.json(properties)
@app.get('/properties/<id_polygon_location:path>')
async def _properties_get(r, id_polygon_location=None, ): return response.html((await response.file(f"{os.path.dirname(os.path.abspath(__file__))}/templates/{'' if '-d' in sys.argv or '--debug' in sys.argv else 'serv/'}Search.html")).body.decode('utf-8'))

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
async def _page(r, page=None): page = 'jalus' if page == '' else page; return response.html((await render_template('base.html', {'title': template_titles[page], 'style': 'digikala'})).replace('/// block #content', await render_template(f'{page.capitalize()}.js', {})) if '-d' in sys.argv else await load_template(f'serv/{page.capitalize()}.html'))

if __name__ == '__main__':
    debug = True if '-d' in sys.argv or '--debug' in sys.argv else False
    if '-p' in sys.argv and int(sys.argv[(sys.argv.index('-p') + 1)]) == 443 or '--port' in sys.argv and int(sys.argv[(sys.argv.index('--port') + 1)]) == 443: app.run(host='0.0.0.0', port=443, debug=debug, auto_reload=debug, ssl={"cert": "/etc/letsencrypt/live/jalus.ir/fullchain.pem", "key": "/etc/letsencrypt/live/jalus.ir/privkey.pem"})
    if '-p' in sys.argv or '--port' in sys.argv: app.run(host='0.0.0.0', port=int(sys.argv[(sys.argv.index('-p') + 1) if '-p' in sys.argv else (sys.argv.index('--port') + 1)]), debug=debug, auto_reload=debug)
    else: app.run(host='0.0.0.0', port=5000, debug=debug, auto_reload=debug)