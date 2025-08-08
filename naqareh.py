from datetime import datetime
from sanic import Blueprint, response, exceptions
from static import jdate, load_template
import jwt, urllib

secret = 'secret'
admin_password = 'admin'
admin_username = 'admin'
blu = Blueprint('naqareh_' + __name__)

@blu.route('/admin/<admin_key>/<username>/<password>')
async def new_user(r, admin_key, username, password):
    admin_key = admin_key.encode()
    admin = jwt.decode(admin_key, secret, algorithms=['HS256'])
    if admin['u'] != admin_username or admin['p'] != admin_password: abort(403)
    encoded_jwt = jwt.encode({'u': username, 'p': password}, secret, algorithm='HS256')
    q = {'key': encoded_jwt}
    day = await r.app.config['db']['days'].find_one(q)
    if not day: await r.app.config['db']['days'].insert_one(q)
    return response.json({'OK': True, 'key': encoded_jwt})

@blu.get('/admin/<key>')
async def admin_page(r, key):
    try:
        key = jwt.decode(key, secret, algorithms=['HS256'])
        return response.html(await load_template(f'Barnameh.html'))
    except: exceptions.NotFound(f"incorrect key")

@blu.get('/admin/<key>/<year:int>/<month:int>/<day:int>')
async def admin_page_day(r, key, year, month, day): 
    try:
        key = jwt.decode(key, secret, algorithms=['HS256'])
        return response.html(await load_template(f'Barnameh.html'))
    except: exceptions.NotFound(f"incorrect key")

@blu.route('/<username>/<password>')
async def get_key(r, username, password):
    encoded_jwt = jwt.encode({'u': username, 'p': password}, secret, algorithm='HS256')
    if username == admin_username and password == admin_password: return response.json({'OK': True, 'key': encoded_jwt})
    day = await r.app.config['db']['days'].find_one({'key': encoded_jwt})
    if day: return response.json({'OK': True, 'key': encoded_jwt})
    raise exceptions.NotFound(f"incorrect username password")

async def get_day(collection, user, year, month, day):
    q = {
        'user': user,
        'date': {
            'year': year,
            'month': month,
            'day': day,
        }
    }
    day = await collection.find_one(q)
    if not day:
        day = q
        day['hours'] = [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]
        day['delays'] = [
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]
        day['titles'] = [
            '--', '--', '--', '--', '--', '--', 
            '--', '--', '--', '--', '--', '--', 
            '--', '--', '--', '--', '--', '--', 
            '--', '--', '--', '--', '--', '--', 
        ]
        await collection.insert_one(day)
    del day['_id']
    return day

@blu.route('/<key>')
async def index(r, key):
    key = jwt.decode(key, secret, algorithms=['HS256'])
    now = datetime.now()
    jd = jdate.gregorian_to_jd(now.year, now.month, now.day)
    date = jdate.jd_to_persian(jd)
    day = await get_day(r.app.config['db']['days'], key['u'], date[0], date[1], int(date[2]))
    return response.json({'OK': True, 'day': day})

@blu.route('/<key>/<year:int>/<month:int>/<day:int>')
async def index_day(r, key, year, month, day):
    key = jwt.decode(key, secret, algorithms=['HS256'])
    _day = await get_day(r.app.config['db']['days'], key['u'], year, month, day)
    return response.json({'OK': True, 'day': _day})

@blu.route('/title/<key>/<year:int>/<month:int>/<day:int>/<hour_index:int>/<value>', methods=['GET', 'POST'])
async def set_title(r, key, year, month, day, hour_index, value):
    value = urllib.parse.unquote(value)
    key = jwt.decode(key, secret, algorithms=['HS256'])
    q = {
        'user': key['u'],
        'date': {
            'year': year,
            'month': month,
            'day': day
        }
    }
    r = await r.app.config['db']['days'].update_one(q, {
        '$set': {f'titles.{hour_index}': value}
    })
    if r.matched_count: return response.json({'OK': True})
    raise exceptions.NotFound(f"can't find day")

@blu.route('/<key>/<year:int>/<month:int>/<day:int>/<hour_index:int>/<value:int>', methods=['POST', 'GET'])
async def set_hour(r, key, year, month, day, hour_index, value):
    key = jwt.decode(key, secret, algorithms=['HS256'])
    now = datetime.now()
    jd = jdate.gregorian_to_jd(now.year, now.month, now.day)
    date = jdate.jd_to_persian(jd)
    delay = (now.hour - hour_index - 7) * 60 + now.minute
    if year > date[0] or (year == date[0] and month > date[1]) or (year == date[0] and month == date[1] and day > int(date[2])) or (year == date[0] and month == date[1] and day == int(date[2]) and delay < 0): raise exceptions.NotFound(f"don't judge the future")
    q = {
        'user': key['u'],
        'date': {
            'year': year,
            'month': month,
            'day': day
        }
    }
    r = await r.app.config['db']['days'].update_one(q, {
        '$set': {f'hours.{hour_index}': value, f'delays.{hour_index}': delay}
    })
    if r.matched_count: return response.json({'OK': True})
    raise exceptions.NotFound(f"can't find day")

@blu.get("/")
async def _page(r, ): return response.html(await load_template(f'Barnameh.html'))
@blu.get("/<year:int>/<month:int>/<day:int>")
async def _page_day(r, year, month, day): return response.html(await load_template(f'Barnameh.html'))