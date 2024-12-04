bp = Blueprint('bp_' + __name__)

# ---- trans ----
_path = os.path.dirname(os.path.realpath(__file__)) + '/dictionary.py'
flag = False
def simplify(phrase):
    import string
    translator = str.maketrans('', '', string.punctuation)
    return phrase.translate(translator).lower().strip()

def digify(num):
    digits = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',

        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',

        '.': '.',
    }
    num = str(num)
    _num = []
    for digit in num: _num.append(digits[digit])
    return ''.join(_num)

def translate(phrase, source='en', target='fa'):
    global flag
    if flag: return phrase, False
    _url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl={source}&tl={target}&dt=t&q={phrase}'.format(source=source, target=target, phrase=phrase)
    try:
        r = requests.get(_url, timeout=3)
        if int(r.status_code / 100) != 2: raise Exception
    except Exception as e:
        flag = True
        return phrase, False
    r = r.content.decode('utf-8')
    r = json.loads(r)[0][0][0]
    return r, True

def trans(phrase):
    CSI = "\x1B[%sm"
    W = '\033[0m'  # white (normal)
    R = '\033[31m'  # red
    G = '\033[32m'  # green
    O = '\033[33m'  # orange
    B = '\033[34m'  # blue
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
    dictionary.clear()
    dictionary.update(_dic)
# ---- trans ----
# ---- login ----
def setup(app, mail):
    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = 'login'
    login_manager.session_protection = "strong"
    # login_serializer = URLSafeTimedSerializer(app.secret_key)

    def get_serializer(secret_key=None):
        if secret_key is None:
            secret_key = app.secret_key
        return URLSafeSerializer(secret_key)

    def get_activation_link(user):
        s = get_serializer()
        payload = s.dumps(user.id)
        return url_for('activate_user', payload=payload, _external=True)

    class User(UserMixin):
        def __init__(self, _json):
            self.__dict__ = _json
            self.id = _json['username']

    @login_manager.user_loader
    def user_loader(username):
        try:
            json = users.find_one({'username': username})
            user = User(json)
            if isinstance(user.carts, dict):
                user.carts = pqdict(user.carts, key=lambda x: x[2])
            return user
        except:
            return

    @login_manager.request_loader
    def request_loader(request):
        username = request.form.get('username')
        try:
            json = users.find_one({'username': username})
            user = User(json)
            user.is_authenticated = check_password_hash(user.password, request.form['password'])
            if isinstance(user.carts, dict):
                user.carts = pqdict(user.carts, key=lambda x: x[2])
            return user
        except:
            return

    @app.route('/users/activate/<payload>')
    def activate_user(payload):
        s = get_serializer()
        try:
            user_id = s.loads(payload)
        except BadSignature:
            abort(404)

        user = users.find_one_and_update({'username': user_id}, {
            '$set': {'_active': True}
        })
        login_user(User(user))
        flash('User activated')
        return redirect(url_for('homepage'))

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'GET':
            # return render_template('user/login.html')
            return '''
                   <form action='login' method='POST'>
                    <input type='text' name='username' id='username' placeholder='username' style="display: block; margin: auto"/>
                    <input type='password' name='password' id='password' placeholder='password' style="display: block; margin: auto"/>
                    <input type='submit' name='submit' style="display: block; margin: auto"/>
                   </form>
                   '''
        error = ''
        json = None
        if 'username' in request.form:
            json = users.find_one({'username': request.form['username']})
            if not json:
                json = users.find_one({'email': request.form['username']})
        elif 'email' in request.form:
            json = users.find_one({'email': request.form['email']})
            if not json:
                json = users.find_one({'username': request.form['email']})
        else:
            error = 'id not found'
        if not json:
            error = 'not found'
        elif check_password_hash(json['password'], request.form['password']):
            user = User(json)
            # user.carts = pqdict(user.carts, key=lambda x: x[2])
            login_user(user)
        else:
            error = 'password mismatch'
        if 'redirect' in request.form:
            _redirect = request.values['redirect']
            _parse = urlparse(_redirect)
            url = _parse[2]
            params = urllib.parse.parse_qs(_parse[4])
            if error:
                params['msg'] = error
            elif 'msg' in params:
                del params['msg']
            _redirect = url + '?' + '&'.join([key + '=' + value for key, value in params.items()])
            return redirect(_redirect)
        elif not error:
            if json['_active'] or True:
                login_user(User(json), remember=True)
            json['_id'] = str(json['_id'])
            return jsonify({'success': True, 'user': json}), 200
        return jsonify({'success': False, 'error': error}), 403

    @app.route('/auto_login')
    def auto_login():
        admin = users.find_one({'username': 'admin'})
        login_user(User(admin), remember=True)
        return redirect(url_for('protected'))

    @app.route('/signup', methods=['GET', 'POST'])
    def signup():
        if request.method == 'GET':
            # return render_template('user/login.html')
            return '''
                <form action='signup' method='POST'>
                    <input type='text' name='username' id='username' placeholder='username'  style="display: block; margin: auto"/>
                    <input type='email' name='email' id='email' placeholder='email' style="display: block; margin: auto"/>
                    <input type='password' name='password' id='password' placeholder='password' style="display: block; margin: auto"/>
                    <input type='submit' name='submit' style="display: block; margin: auto"/>
                </form>
            '''
        # username = request.form['username']
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        error = ''
        if not email or not password:
            error = 'input empty'
        elif not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            error = 'email not valid'
        else:
            json = {
                '_active': False,
                '_date': datetime.now(),
                'username': request.form['username'] if 'username' in request.form else str(ObjectId()),
                'password': password,
                'phone': '09133657623',
                'first_name': '',
                'last_name': '',
                'email': email,
                'private_key': email + ':' + password,
                'hosting': {
                    'language': ['farsi'],
                    'Response rate': 65,
                    'Response time': 145,
                },
                'wish_list': [],
                'carts': {},
                'notifications': [],
                'family': 1,
                'location': {
                    'latitude': 35.721896,
                    'longitude': 51.312004
                },
                'address': 'بلوارفردوس، ابراهیمی'
            }
            user = None
            try:
                user = users.insert_one(json)
            except Exception as e:
                error = 'user already existed'
            if user:
                user = User(json)
                login_user(user, remember=True)
                _link = get_activation_link(user)
                msg = Message(subject='lazizestun activation', body=_link, sender='kafura.kafiri@gmil.com', recipients=[user.email])
                mail.send(msg)

        if 'redirect' in request.values:
            print('***')
            _redirect = request.values['redirect']
            _parse = urlparse(_redirect)
            url = _parse[2]
            params = urllib.parse.parse_qs(_parse[4])
            if error:
                params['msg'] = error
            elif 'msg' in params:
                del params['msg']
            _redirect = url + '?' + '&'.join([key + '=' + value for key, value in params.items()])
            return redirect(_redirect)
        elif not error:
            return redirect(url_for('protected'))
        else:
            abort(404, error)

    @app.route('/protected')
    @login_required
    def protected():
        print(type(current_user.carts))
        return 'Logged in as: ' + current_user.username + ', ' + str(current_user.carts.__class__)

    @app.route('/logout', methods=['GET', 'POST'])
    @login_required
    def logout():
        username = current_user.username
        logout_user()
        if 'redirect' in request.values:
            _redirect = request.values['redirect']
            return redirect(_redirect)
        else:
            return username
# ---- login ----
# ---- geo ----
@blu.route('search')
def geo():
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
# ---- geo ----
# ---- media ----
dec = {
    'b': 50,
    't': 100,
    'k': 120,
    'r': 240,
    'w': 300,
    'v': 600,
    'y': 800,
    'l': 1600,
}


def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG', quality=70)  # png is heavy todo JPEG -> PNG for the error: cannot write mode RGBA as JPEG )> google icon
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


def insert_img(image_bytes, o, sizes=('b', 't', 'k', 'r', 'v', 'w', 'y', 'l'), mime_type='image/jpeg'):
    import io
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


@blue.route('/i/dodota/+', methods=['POST'])
def add_dodota_image():
    _id, success = add_image()
    print(_id)
    response = {
        "file": "/media/i/y/{}.jpeg".format(_id),
        "success": True if success == 200 else False,
        "file_id": _id
    }
    return json.dumps(response), 200, {'ContentType': 'text/html'}


@blue.route('/i/+', methods=['GET', 'POST'])
def add_image():
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


@blue.route('/-')
def minimize_all():
    from utility import obj2str
    from flask import jsonify
    documents = fs.find()
    documents = [{
            '_id': str(document._id),
            'filename': document.filename,
        } for document in documents]
    return jsonify(documents)


@blue.route('/*', methods=['GET', 'POST'])
#@login_required
def delete_all():
    import json
    for i in fs.find():
        fs.delete(i._id)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@blue.route('/i/<size>/<_id>.<_format>')
@blue.route('/i/<size>/<_id>')
def get_image(_id, size, _format=None):
    try:
        file_name = '{0}_{1}'.format(size, _id)
        im_stream = fs.get_last_version(filename=file_name)
        im = Image.open(im_stream)
        return serve_pil_image(im)
    except Exception as e:
        return str(e), 400


@blue.route('/i/<size>/<_id>.<_format>*', methods=['GET', 'POST'])
@blue.route('/i/<size>/<_id>*', methods=['GET', 'POST'])
def delete(_id, size, _format=None):
    try:
        file_name = '{0}_{1}'.format(size, _id)
        file = fs.find_one({'filename': file_name})
        fs.delete(file._id)
        return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        print(e)
        return abort(400, e)


@blue.route('/i/<_id>.<_format>*', methods=['GET', 'POST'])
@blue.route('/i/<_id>*', methods=['GET', 'POST'])
def delete_many(_id, _format=None):
    delete(_id, 'n', _format=_format)
    for size in dec:
        delete(_id, size, _format=_format)
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


@blue.route('/f/+<path:path>')
def insert_file(path):
    path = '/' + path
    with open(path, "rb") as file:
        mime = mimetypes.MimeTypes().guess_type(path)
        _id = fs.put(file.read(), contentType=mime)
        return str(_id)
    abort(403)


@blue.route('/f/-<path:path>')
def file_on_path(path):
    path = '/' + path
    from utility import send_file_partial
    return send_file_partial(path)


@blue.route('/f/<_id>.<_format>')
def get_file(_id, _format):
    f_stream = fs.get(ObjectId(_id))
    from utility import my_send_file_partial
    return my_send_file_partial(f_stream)
# ---- media ----
# ---- user ----
blu = Blueprint('users', __name__, template_folder='./templates/user', url_prefix='/users', )
crud(blueprint=blu, collection=users, skeleton={}, template='index', ban={})
# ---- user ----
# ---- review ----
def reviewed(blu, collection):
    @blu.route('/<_id>/review', methods=['POST'])
    @login_required
    def review(_id):
        collection.update_one({'_id': ObjectId(_id)}, {
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
# ---- review ----
# ---- order ----
@blu.route('/<_id>/pay', methods=['GET'])
def pay(_id):
    return render_template('gate.html', _id=_id, price=request.args['price'])


@blu.route('/<_id>/payed', methods=['GET'])
def payed(_id):
    order = orders.find_one_and_update({'_id': ObjectId(_id)}, {
        '$set': {'payed': True},
    }, return_document=ReturnDocument.AFTER)
    publish.single("poorya/lazizestun", json.dumps(obj2str(order), ensure_ascii=False, default=lambda o: o.__str__() if isinstance(o, datetime) else o), hostname="localhost")
    # send it to Express app
    # requests.post("")
    return jsonify({}), 200


crud(blueprint=blu, collection=orders, skeleton={}, template='index', ban={})  # ban={'get'}

if __name__ == '__main__':
    order = orders.find_one({})
    publish.single("poorya/lazizestun", json.dumps(obj2str(order), ensure_ascii=False, default=lambda o: o.__str__() if isinstance(o, datetime) else o), hostname="localhost")
# ---- order ----
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

blu = Blueprint('delicious', __name__, template_folder='../../templates/delicious', url_prefix='/delicious', )


@blu.route('/search', methods=['GET', 'POST'])
@blu.route('/search/<tag>', methods=['GET', 'POST'])
def search(tag=None):
    q = {}
    if 'q' in request.args:
        q["$text"] = {"$search": request.args['q']}
    if tag:
        q['tags'] = tag
    _delicious = delicious.find(q)
    if 'l' in request.args:
        _delicious = _delicious.limit(int(request.args['l']))
    if request.method == 'POST':
        return jsonify(obj2str(list(_delicious)))
    else:
        return render_template('delicious/list.html', list=_delicious)


reviewed(blu, delicious)


@blu.route('/<_id>/<title>', methods=['GET', 'POST'])
def hot_key_get(_id, title):
    document = delicious.find_one({'title': title})
    if not document:
        document = delicious.find_one({'_id': ObjectId(_id)})
    if not document:
        return abort(404)
    if request.method == 'POST':
        return jsonify(obj2str(document))
    else:
        return render_template('delicious/delicious.html', **document)

crud(blueprint=blu, collection=delicious, skeleton=initial, template='index', ban={})  # ban={'get'}
with open('static/delicious.json') as jf:
    collection = json.load(jf)
    delicious.delete_many({'subject': {'$in': [document['subject'] for document in collection]}})
    for document in collection:
        document['_date'] = datetime.now()
    delicious.insert_many(collection)
# ---- delicious ----