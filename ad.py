import pandas as pd, os.path, random
from urllib.parse import urlparse
from functools import cmp_to_key
from datetime import datetime, timedelta, timezone

class cs: HEADER, OKBLUE, OKCYAN, OKGREEN, WARNING, FAIL, ENDC, BOLD, UNDERLINE, CGREY, CRED, CGREEN, CYELLOW, CBLUE, CVIOLET, CWHITE = '\033[95m', '\033[94m', \
    '\033[96m', '\033[92m', '\033[93m', '\033[91m', '\033[0m', '\033[1m', '\033[4m', '\33[90m', '\33[31m', '\33[32m', '\33[33m', '\33[34m', '\33[35m', '\33[37m'

def rnd_necessities():
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    for user in users.find({'detailed': True, 'location': {'$exists': True}}):
        users.update_one({'_id': user['_id']}, {'$set': {'cart': 6037123412341234, 'stat': [random.random() for _ in range(5)], 'offer': random.choice([0, 0, 0, 5, 5, random.randint(6, 39)]), 
        'family': random.choice(['قادری', 'محمدی', 'زارعی', 'نخجیری', 'حسینی']), 'gender': True if random.random() < .7 else False, 'sms': 9300345496, 'price': random.randint(4, 40) * 100000}})
categories = [f'{ft}-{et}' for ft in ['buy', 'rent'] for et in ['apartment', 'villa', 'old-house'] + ['office', 'store', 'industrial-agricultural-property']]
categories.remove('rent-old-house')
categories.extend([f'rent-{et}' for et in ['temporary-suite-apartment', 'temporary-villa', 'temporary-workspace']])
categories.extend(['contribution-construction', 'pre-sell-home'])
categories = [(cat, 1 / 666 / ((2 + ic) ** (1 / 666) - 1)) for ic, cat in enumerate(categories)]
consultants = pd.read_csv('static/consultant.csv').to_dict('records')
for c in consultants: c['location'] = {'type': 'Point', 'coordinates': [c['lng'], c['lat']]}; del c['lng']; del c['lat']

def dim(ad, asset_dir=os.path.join(os.path.join(os.path.dirname(__file__), 'static'), 'properties')):
    if not asset_dir: asset_dir = os.path.dirname(os.path.abspath(__file__)) + '/images'
    _asset_dir, _id = asset_dir + '/' + ad['category'], urlparse(ad['link']).path.split('/')[-1]
    os.makedirs(_asset_dir, exist_ok=True)
    images = [urlparse(im) for im in ad['_images']]
    images = list(set([f'{pr.scheme}://{pr.netloc}{pr.path}' for pr in images]))
    images = list(sorted(images, key=cmp_to_key(lambda a, b: -1 if len(a) < len(b) or len(a) == len(b) and a < b else (1 if len(a) > len(b) or len(a) == len(b) and a > b else 0))))
    ad['imaged'], ad['imaged_date'] = True, datetime.now()
    if images:
        _asset_dir = _asset_dir + '/' + _id
        os.makedirs(_asset_dir, exist_ok=True)
        remain = min(8, len(images))
        for iim, im in enumerate(images):
            print(im)
            if os.path.exists(f'{_asset_dir}/{iim}.webp'):
                if os.path.getsize(f'{_asset_dir}/{iim}.webp') > 3000: remain -= 1; continue
                else: os.remove(f'{_asset_dir}/{iim}.webp')
            try: r = subprocess.check_output(f"aria2c {im} --auto-file-renaming=false --dir {_asset_dir} -o {iim}.webp", shell=True, stderr=subprocess.DEVNULL); remain -= 1
            except:
                if os.path.exists(f'{_asset_dir}/{iim}.webp'): os.remove(f'{_asset_dir}/{iim}.webp')
            if remain == 0: break
        if remain > 2: ad['imaged'] = False if random.random() < .75 else True
        ad['images'] = [f'{"/".join(_asset_dir.split("/")[-2:])}/{iim}.webp' for iim, _ in enumerate(images) if os.path.exists(f'{_asset_dir}/{iim}.webp') and os.path.getsize(f'{_asset_dir}/{iim}.webp') > 3000]
    print(f"{cs.FAIL}{cs.BOLD}Image:{cs.ENDC} {cs.OKCYAN}{ad['link'].split('/')[-1]}{cs.ENDC} {ad['title']}")
    return {'imaged': ad['imaged'], 'imaged_date': ad['imaged_date'], 'images': ad['images']}

consultants = pd.read_csv('static/consultant.csv').to_dict('records')
for c in consultants: c['location'] = {'type': 'Point', 'coordinates': [c['lng'], c['lat']]}; del c['lng']; del c['lat']
def push_ads():  # TODO bayad az native khode mongo ya pymongo estefade koni to maye haye dump
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']; collection = 0
    collections = [('users', {'category': 'rent-temporary', 'phoned': True, 'phone': {'$ne': ''}, 'imaged': True, 'served': {'$ne': True}}), ('ads', {'category': {'$ne': 'rent-temporary'}, 'phoned': True, 'phone': {'$ne': ''}, 'imaged': True, 'served': {'$ne': True}})]
    while True:
        new_ads = list(users.find(collections[collection][1]).limit(4 if collection == 0 else 12))
        if not new_ads: time.sleep(60); continue
        for i_ad, ad in enumerate(new_ads):
            ad['images'] = [im for im in ad['images'] if os.path.exists(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{im}') and os.path.getsize(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{im}') > 3000][:(8 if collection == 0 else 3)]
            for im in ad['images']:
                files = {'file': open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{im}', 'rb')}
                r = requests.post(f'https://jalus.ir/static/properties/{im}', files=files, verify=False)
                if r.status_code != 200 or not r.json()['OK']: raise
            if 'consultant' not in ad: ad['consultant'] = random.choice(consultants)
            ad['title'] = ad['title'].replace('&nbsp;', ' ').split(); ad['title'] = ' '.join([w for w in ad['title'] if w])
            ad['description'] = ad['description'].replace('&nbsp;', ' ').split(); ad['description'] = ' '.join([w for w in ad['description'] if w])
            if '_images' in ad: del ad['_images']
            ad['served'] = True; ad['served_date'] = str(datetime.now()).split('.')[0]; ad['notes'] = []
            del ad['_id']; ad['pan_date'] = str(ad['pan_date']).split('.')[0]; ad['detailed_date'] = str(ad['detailed_date']).split('.')[0]
            ad['phoned_date'] = str(ad['phoned_date']).split('.')[0]; ad['imaged_date'] = str(ad['imaged_date']).split('.')[0]
            if 'swap' in ad and ad['swap'] and 'date' in ad['swap']: ad['swap']['date'] = str(ad['swap']['date']).split('.')[0]
            r = requests.post(f'https://jalus.ir/{collections[collection][0]}/{ad["id"]}/~', data=json.dumps(ad), verify=False)
            if r.status_code == 200: r = users.update_one({'id': ad['id']}, {'$set': {'images': ad['images'], 'served': True, 'served_date': datetime.now()}}); r = r.matched_count
        collection = 1 - collection if len(new_ads) == 0 or len(new_ads) % 4 != 0 else 0 if random.random() < .3 else 1
        time.sleep(10 if len(new_ads) % 4 == 0 else 60)
def auto_del():
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    users.delete_many({'pan_date': {'$lte': datetime.now() - timedelta(days=28)}, 'phoned': False})

def swap():
    # TODO algorithm of matching between swappables and requestes
    pass