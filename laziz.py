import string, io, os, os.path, json, sys
from sanic import Blueprint, response
from static import crud, template, obj2str, load_template
blu = Blueprint('laziz_' + __name__)
_path, trans_flag = os.path.dirname(os.path.realpath(__file__)) + '/static/dictionary.py', False
def simplify(phrase): translator = str.maketrans('', '', string.punctuation); return phrase.translate(translator).lower().strip()
def digify(num):
    digits = {'0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
        '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹', '.': '.',}
    num, _num = str(num), []
    for digit in num: _num.append(digits[digit])
    return ''.join(_num)
def translate(phrase, source='en', target='fa'):
    global trans_flag
    if trans_flag: return phrase, False
    _url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl={source}&tl={target}&dt=t&q={phrase}'.format(source=source, target=target, phrase=phrase)
    try:
        r = requests.get(_url, timeout=3)
        if int(r.status_code / 100) != 2: raise Exception
    except Exception as e: trans_flag = True; return phrase, False
    r = r.content.decode('utf-8')
    r = json.loads(r)[0][0][0]
    return r, True
def trans(phrase):
    CSI = "\x1B[%sm"
    W = '\033[0m'  # white (normal)
    R = '\033[31m'  # red
    G = '\033[32m'  # green
    O = '\033[33m'  # orange
    B = '\033[34m'  # blu
    P = '\033[35m'  # purple
    if isinstance(phrase, str):
        phrase = phrase.rstrip()
        _phrase = phrase
        phrase = simplify(phrase)
        if phrase in dictionary: return dictionary[phrase]
        with open(_path, "r+") as d_file:
            d = d_file.readlines()
            d_file.seek(0)
            translated, success = translate(_phrase)
            if success:
                d = d[:-2] + ["    '{}': '{}',\n".format(phrase, translated)] + d[-2:]
                for line in d:
                    d_file.write(line)
                d_file.truncate()
                dictionary[phrase] = translated
        print((CSI % '5;30;41' + "'{}': '{}',".format(phrase, translate(_phrase)) + CSI % '0'))
        return _phrase
    import numbers
    if isinstance(phrase, numbers.Real): return digify(phrase)
    else: return phrase
def update():
    _dic = {}
    for k, v in dictionary.items(): _dic[simplify(k)] = v
    dictionary.clear(); dictionary.update(_dic)
# def setup(app, mail):
#     login_manager = LoginManager()
#     login_manager.init_app(app)
#     login_manager.login_view = 'login'
#     login_manager.session_protection = "strong"
#     # login_serializer = URLSafeTimedSerializer(app.secret_key)
#     def get_serializer(secret_key=None):
#         if secret_key is None:
#             secret_key = app.secret_key
#         return URLSafeSerializer(secret_key)
#     def get_activation_link(user):
#         s = get_serializer()
#         payload = s.dumps(user.id)
#         return url_for('activate_user', payload=payload, _external=True)
#     class User(UserMixin):
#         def __init__(self, _json):
#             self.__dict__ = _json
#             self.id = _json['username']
#     @login_manager.user_loader
#     def user_loader(username):
#         try:
#             json = users.find_one({'username': username})
#             user = User(json)
#             if isinstance(user.carts, dict):
#                 user.carts = pqdict(user.carts, key=lambda x: x[2])
#             return user
#         except: return
#     @login_manager.request_loader
#     def request_loader(request):
#         username = request.form.get('username')
#         try:
#             json = users.find_one({'username': username})
#             user = User(json)
#             user.is_authenticated = check_password_hash(user.password, request.form['password'])
#             if isinstance(user.carts, dict):
#                 user.carts = pqdict(user.carts, key=lambda x: x[2])
#             return user
#         except: return
#     @app.route('/users/activate/<payload>')
#     def activate_user(payload):
#         s = get_serializer()
#         try: user_id = s.loads(payload)
#         except BadSignature: abort(404)
#         user = users.find_one_and_update({'username': user_id}, { '$set': {'_active': True} })
#         login_user(User(user))
#         flash('User activated')
#         return redirect(url_for('homepage'))
#     @app.route('/login', methods=['GET', 'POST'])
#     def login():
#         if request.method == 'GET':
#             # return render_template('user/login.html')
#             return '''
#                    <form action='login' method='POST'>
#                     <input type='text' name='username' id='username' placeholder='username' style="display: block; margin: auto"/>
#                     <input type='password' name='password' id='password' placeholder='password' style="display: block; margin: auto"/>
#                     <input type='submit' name='submit' style="display: block; margin: auto"/>
#                    </form>
#                    '''
#         error, json = '', None
#         if 'username' in request.form:
#             json = users.find_one({'username': request.form['username']})
#             if not json: json = users.find_one({'email': request.form['username']})
#         elif 'email' in request.form:
#             json = users.find_one({'email': request.form['email']})
#             if not json: json = users.find_one({'username': request.form['email']})
#         else: error = 'id not found'
#         if not json: error = 'not found'
#         elif check_password_hash(json['password'], request.form['password']):  user = User(json); login_user(user)
#         else: error = 'password mismatch'
#         if 'redirect' in request.form:
#             _redirect = request.values['redirect']
#             _parse = urlparse(_redirect)
#             url = _parse[2]
#             params = urllib.parse.parse_qs(_parse[4])
#             if error: params['msg'] = error
#             elif 'msg' in params: del params['msg']
#             _redirect = url + '?' + '&'.join([key + '=' + value for key, value in params.items()])
#             return redirect(_redirect)
#         elif not error:
#             if json['_active'] or True:
#                 login_user(User(json), remember=True)
#             json['_id'] = str(json['_id'])
#             return jsonify({'success': True, 'user': json}), 200
#         return jsonify({'success': False, 'error': error}), 403
#     @app.route('/auto_login')
#     def auto_login():
#         admin = users.find_one({'username': 'admin'})
#         login_user(User(admin), remember=True)
#         return redirect(url_for('protected'))
#     @app.route('/signup', methods=['GET', 'POST'])
#     def signup():
#         if request.method == 'GET':
#             return '''
#                 <form action='signup' method='POST'>
#                     <input type='text' name='username' id='username' placeholder='username'  style="display: block; margin: auto"/>
#                     <input type='email' name='email' id='email' placeholder='email' style="display: block; margin: auto"/>
#                     <input type='password' name='password' id='password' placeholder='password' style="display: block; margin: auto"/>
#                     <input type='submit' name='submit' style="display: block; margin: auto"/>
#                 </form>
#             '''
#         email = request.form['email']
#         password = generate_password_hash(request.form['password'])
#         error = ''
#         if not email or not password: error = 'input empty'
#         elif not re.match(r"[^@]+@[^@]+\.[^@]+", email): error = 'email not valid'
#         else:
#             json = {
#                 '_active': False,
#                 '_date': datetime.now(),
#                 'username': request.form['username'] if 'username' in request.form else str(ObjectId()),
#                 'password': password,
#                 'phone': '09133657623',
#                 'first_name': '',
#                 'last_name': '',
#                 'email': email,
#                 'private_key': email + ':' + password,
#                 'hosting': {
#                     'language': ['farsi'],
#                     'Response rate': 65,
#                     'Response time': 145,
#                 },
#                 'wish_list': [],
#                 'carts': {},
#                 'notifications': [],
#                 'family': 1,
#                 'location': {
#                     'latitude': 35.721896,
#                     'longitude': 51.312004
#                 },
#                 'address': 'بلوارفردوس، ابراهیمی'
#             }
#             user = None
#             try:
#                 user = users.insert_one(json)
#             except Exception as e:
#                 error = 'user already existed'
#             if user:
#                 user = User(json)
#                 login_user(user, remember=True)
#                 _link = get_activation_link(user)
#                 msg = Message(subject='lazizestun activation', body=_link, sender='kafura.kafiri@gmil.com', recipients=[user.email])
#                 mail.send(msg)
#         if 'redirect' in request.values:
#             print('***')
#             _redirect = request.values['redirect']
#             _parse = urlparse(_redirect)
#             url = _parse[2]
#             params = urllib.parse.parse_qs(_parse[4])
#             if error:
#                 params['msg'] = error
#             elif 'msg' in params:
#                 del params['msg']
#             _redirect = url + '?' + '&'.join([key + '=' + value for key, value in params.items()])
#             return redirect(_redirect)
#         elif not error: return redirect(url_for('protected'))
#         else: abort(404, error)
#     @app.route('/protected')
#     @login_required
#     def protected():
#         print(type(current_user.carts))
#         return 'Logged in as: ' + current_user.username + ', ' + str(current_user.carts.__class__)
#     @app.route('/logout', methods=['GET', 'POST'])
#     @login_required
#     def logout():
#         username = current_user.username
#         logout_user()
#         if 'redirect' in request.values: _redirect = request.values['redirect']; return redirect(_redirect)
#         else: return username
@blu.route('search')
def geo(r):
    phrase = request.args['q']
    locations = [
        {
            'location': u'جی',
            'coordination': {
                'latitude': 32.656375,
                'longitude': 51.731090,
            }
        }, {
            'location': u'خوراسگان',
            'coordination': {
                'latitude': 32.655621,
                'longitude': 51.757420,
            }
        }, {
            'location': u'پروین اعتصامی',
            'coordination': {
                'latitude': 32.678393,
                'longitude': 51.714024,
            }
        }, {
            'location': u'دروازه‌شیراز',
            'coordination': {
                'latitude': 32.622313,
                'longitude': 51.664467
            }
        }, {
            'location': u'عسگریه',
            'coordination': {
                'latitude': 32.675134,
                'longitude': 51.706724
            }
        }, {
            'location': u'جلفا',
            'coordination': {
                'latitude': 32.632570,
                'longitude': 51.655912
            }
        }, {
            'location': u'کاوه',
            'coordination': {
                'latitude': 32.719616,
                'longitude': 51.671807
            }
        }, {
            'location': u'میدان لاله',
            'coordination': {
                'latitude': 32.695746,
                'longitude': 51.704852
            }
        }, {
            'location': u'آپادانا',
            'coordination': {
                'latitude': 32.632467,
                'longitude': 51.692937
            }
        },
    ]
    locations = [location for location in locations if phrase in location['location']]
    return jsonify(locations[0:2])

dec = {
    'b': 50, 't': 100, 'k': 120,
    'r': 240, 'w': 300, 'v': 600,
    'y': 800, 'l': 1600,
}
def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG', quality=70)  # png is heavy todo JPEG -> PNG for the error: cannot write mode RGBA as JPEG )> google icon
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')
def insert_img(image_bytes, o, sizes=('b', 't', 'k', 'r', 'v', 'w', 'y', 'l'), mime_type='image/jpeg'):
    file_name = '{0}_{1}'.format('n', str(o))
    fs.put(image_bytes, contentType=mime_type, filename=file_name)
    for width, size in [(dec[size], size) for size in sizes]:
        img = Image.open(io.BytesIO(image_bytes))
        wpercent = (width / float(img.size[0]))
        hsize = int((float(img.size[1]) * float(wpercent)))
        img = img.resize((width, hsize), Image.ANTIALIAS)
        imgByteArr = io.BytesIO()
        img.save(imgByteArr, format='PNG')
        file_name = '{0}_{1}'.format(size, str(o))
        fs.put(imgByteArr.getvalue(), contentType=mime_type, filename=file_name)
    return str(o), 200
@blu.route('/i/dodota/+', methods=['POST'])
def add_dodota_image(r):
    _id, success = add_image()
    print(_id)
    response = {
        "file": "/media/i/y/{}.jpeg".format(_id),
        "success": True if success == 200 else False,
        "file_id": _id
    }
    return json.dumps(response), 200, {'ContentType': 'text/html'}
@blu.route('/i/+', methods=['GET', 'POST'])
def add_image(r):
    try:
        o = ObjectId()
        if 'url' in request.values:
            url = request.values['url']
            mime_type = mimetypes.guess_type(url)[0]
            r = requests.get(url, stream=True)
            return insert_img(r.raw.read(), o, mime_type=mime_type)
        if 'file' in request.files:
            file = request.files['file']
            mime_type = mimetypes.guess_type(file.filename)[0]
            return insert_img(file.read(), o, mime_type=mime_type)
        if 'Filedata' in request.files:
            file = request.files['Filedata']
            mime_type = mimetypes.guess_type(file.filename)[0]
            return insert_img(file.read(), o, mime_type=mime_type)
        raise Exception
    except Exception as e:
        abort(400, e)
@blu.route('/-')
def minimize_all(r):
    from utility import obj2str
    from flask import jsonify
    documents = fs.find()
    documents = [{
            '_id': str(document._id),
            'filename': document.filename,
        } for document in documents]
    return jsonify(documents)
@blu.route('/*', methods=['GET', 'POST'])
def delete_all(r):
    import json
    for i in fs.find():
        fs.delete(i._id)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
# @blu.route('/i/<size>/<_id>.<_format>')
@blu.route('/i/<size>/<_id>')
def get_image(r, _id, size, _format=None):
    try:
        file_name = '{0}_{1}'.format(size, _id)
        im_stream = fs.get_last_version(filename=file_name)
        im = Image.open(im_stream)
        return serve_pil_image(im)
    except Exception as e:
        return str(e), 400
# @blu.route('/i/<size>/<_id>.<_format>', methods=['DELETE'])
@blu.route('/i/<size>/<_id>', methods=['DELETE'])
def delete(r, _id, size, _format=None):
    try:
        file_name = '{0}_{1}'.format(size, _id)
        file = fs.find_one({'filename': file_name})
        fs.delete(file._id)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        print(e)
        return abort(400, e)
# @blu.route('/i/<_id>.<_format>', methods=['DELETE'])
@blu.route('/i/<_id>', methods=['DELETE'])
def delete_many(r, _id, _format=None):
    delete(_id, 'n', _format=_format)
    for size in dec:
        delete(_id, size, _format=_format)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
@blu.route('/f/+<path:path>')
def insert_file(r, path):
    path = '/' + path
    with open(path, "rb") as file:
        mime = mimetypes.MimeTypes().guess_type(path)
        _id = fs.put(file.read(), contentType=mime)
        return str(_id)
    abort(403)
@blu.route('/f/-<path:path>')
def file_on_path(r, path):
    path = '/' + path
    from utility import send_file_partial
    return send_file_partial(path)
@blu.route('/f/<_id_format>')
def get_file(r, _id_format):
    f_stream = fs.get(ObjectId(_id_format.split('.')[0]))
    from utility import my_send_file_partial
    return my_send_file_partial(f_stream)
# ---- user ----
user_blu = Blueprint('laziz_users_' + __name__)  # template_folder='./templates/user'
crud(blueprint=user_blu, collection='laziz_users', skeleton={}, template='index', ban={})
def reviewed(blu, collection):
    @blu.route('/<_id>/review', methods=['POST'])
    # @login_required
    def review(r, _id):
        next(iter(blu.apps)).config['db'][collection].update_one({'_id': ObjectId(_id)}, {
            '$push': {
                {
                    '_date': datetime.now(),
                    'user': {
                        'username': current_user.username,
                        'image': current_user.image,
                    },
                    'body': {
                        'text': request.form['text']
                    }
                }
            }
        })
        return jsonify({'success': True}), 201
# blu.blueprint(user_blu)
# ---- order ----
order_blu = Blueprint('laziz_orders_', url_prefix='/orders', )
@order_blu.route('/<_id>/pay', methods=['GET'])
def pay(_id): return render_template('gate.html', _id=_id, price=request.args['price'])
@order_blu.route('/<_id>/payed', methods=['GET'])
def payed(r, _id):
    order = orders.find_one_and_update({'_id': ObjectId(_id)}, {
        '$set': {'payed': True},
    }, return_document=ReturnDocument.AFTER)
    publish.single("poorya/lazizestun", json.dumps(obj2str(order), ensure_ascii=False, default=lambda o: o.__str__() if isinstance(o, datetime) else o), hostname="localhost")
    return jsonify({}), 200
crud(blueprint=order_blu, collection='laziz_orders', skeleton={}, template='index', ban={})  # ban={'get'}
if __name__ == '__main__order__':
    order = orders.find_one({})
    publish.single("poorya/lazizestun", json.dumps(obj2str(order), ensure_ascii=False, default=lambda o: o.__str__() if isinstance(o, datetime) else o), hostname="localhost")
# ---- delicious ----
initial = {
    'subject': 'ماهی شوریده خلیج',
    'image': 'peace.png',
    'tags': [
        'تازه',
        'بدون‌تیغ',
        'امگا۳'
    ],
    'description': 'ماهی شوریده خلیج فارس کشتار روز با سایز مناسب که به بهترین نحو و در دمای مناسب تحت نظارت لذیذستون به تهران رسیده و برای شما فراهم‌آوری شده‌است'
}
delicious_blu = Blueprint('laziz_delicious_' + __name__)  # template_folder='../../templates/delicious'
# @blu.route('/search', methods=['GET', 'POST'])
@delicious_blu.route('/search/<tag:(.*|)>', methods=['GET', 'POST'])
async def search(r, tag=None):
    q = {}
    if 'q' in r.args: q["$text"] = {"$search": request.args['q']}
    if tag: q['tags'] = tag
    _delicious = await next(iter(delicious_blu.apps)).config['db']['laziz_delicious'].find(q).to_list(None)
    if 'l' in r.args: _delicious = _delicious.limit(int(r.args['l']))
    if r.method == 'POST': return response.json(obj2str(list(_delicious)))
    else: return render_template('delicious/list.html', list=_delicious)
reviewed(delicious_blu, 'laziz_delicious')
@delicious_blu.route('/<_id>/<title>', methods=['GET', 'POST'])
async def hot_key_get(r, _id, title):
    document = delicious.find_one({'title': title})
    if not document:
        document = delicious.find_one({'_id': ObjectId(_id)})
    if not document:
        return abort(404)
    if request.method == 'POST':
        return jsonify(obj2str(document))
    else:
        return render_template('delicious/delicious.html', **document)
crud(blueprint=delicious_blu, collection='laziz_delicious', skeleton=initial, template='index', ban={})  # ban={'get'}
# blu.blueprint(delicious_blu)

# ---- laziz ----
# blu.add_route('/favicon.ico', 'favicon', lambda: redirect('/static/img/favicon.ico'))
blu.add_route(lambda _, path: redirect('/static/build/' + path), '/build/<path:path>', name='build')
blu.add_route(lambda _, path: redirect('/static/img/' + path), '/img/<path:path>', name='img')
blu.add_route(lambda _: redirect('/static/font/Roboto-Regular.woff2'), '/fonts/roboto/Roboto-Regular.woff2', name='woff2')
blu.add_route(lambda _: redirect('/static/font/Roboto-Regular.woff'), '/fonts/roboto/Roboto-Regular.woff', name='woff')
@blu.route("/seafood")
def homepage(r): return render_template('index.html')
@blu.route("/home_page/get-categories-home", methods=['GET', 'POST'])
def categories(r): return render_template('categories.html')
@blu.get("/")
async def laziz_page(r, ): return response.html(await load_template(f'Laziz.html'))
@blu.post("/")
async def get_delicious(r):
    _0 = await next(iter(blu.apps)).config['db']['laziz_delicious'].aggregate([
        {'$match': {}},
        {'$sample': {'size': 3}}
    ]).to_list(None)
    _0 = obj2str(list(_0))
    _1 = await next(iter(blu.apps)).config['db']['laziz_delicious'].aggregate([
        {'$match': {}},
        {'$sample': {'size': 4}}
    ]).to_list(None)
    _1 = obj2str(list(_1))
    output = {
        'categories': [
            {
                'subject': u'مرغ',
                'image': 'static/laziz/chicken.jpg'
            }, {
                'subject': u'ماهی',
                'image': 'static/laziz/fish.jpg'
            }, {
                'subject': u'گوشت',
                'image': 'static/laziz/lamb.jpg'
            }, {
                'subject': u'برش‌سرد',
                'image': 'static/laziz/cold-cuts.jpg'
            }, {
                'subject': u'تخم‌مرغ',
                'image': 'static/laziz/eggs.jpg'
            }, {
                'subject': u'آماده',
                'image': 'static/laziz/ready.jpg'
            }, {
                'subject': u'ترکیبی',
                'image': 'static/laziz/combo.jpg'
            }, {
                'subject': u'خارجی',
                'image': 'static/laziz/exotic.jpg'
            },
        ],
        'home': {
            'offer': {
                'source': 'static/laziz/offer.jpg',
                'massage': u'چه‌ساده چه‌خوشمزه'
            },
            'carousels': [
                {
                    'products': _0,
                    'subject': u'پیشنهاد لذیذستونی'
                }, {
                    'products': _1,
                    'subject': u'تازه‌ها'
                }
            ]
        },
        'flavors': {
            'chili': {
                'title': u'فلفلی',
                'image': 'static/laziz/chili-1.png',
                'del': ['chili', 'raw', 'phenomenal'],
            },
            'onion': {
                'title': u'پیازجعفری',
                'image': 'static/laziz/onion-0.png',
                'del': ['onion', 'raw', 'phenomenal'],
            },
            'fried': {
                'title': u'سوخاری',
                'image': 'static/laziz/shrimp-0.png',
                'del': ['fried', 'raw', 'phenomenal'],
            },
            'smoky': {
                'title': u'دودی',
                'image': 'static/laziz/smoky-0.png',
                'del': ['smoky', 'raw', 'phenomenal'],
            },
            'balsamic': {
                'title': u'بالزامیک',
                'image': 'static/laziz/balsamic-0.png',
                'del': ['balsamic', 'raw', 'phenomenal'],
            },
            'raw': {
                'title': u'خام',
                'image': 'static/laziz/raw-0.png',
                'del': ['raw', 'chili', 'onion', 'fried', 'smoky', 'balsamic', 'phenomenal'],
            },
            'phenomenal': {
                'title': u'شگفت‌انگیز',
                'image': 'static/laziz/phenomenal-0.png',
                'del': ['raw', 'chili', 'onion', 'fried', 'smoky', 'balsamic', 'phenomenal'],
            },
        },
        'deliveryPrice': 3500,
    }
    return response.json(output)
