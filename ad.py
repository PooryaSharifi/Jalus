import subprocess, pandas as pd, os.path, random, traceback, sys, pymongo, requests, json, urllib3, time
from urllib.parse import urlparse
from functools import cmp_to_key
from datetime import datetime, timedelta, timezone
from static import cs

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
def rnd_necessities():
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    for user in users.find({'detailed': True, 'location': {'$exists': True}}):
        users.update_one({'_id': user['_id']}, {'$set': {'cart': 6037123412341234, 'stat': [random.random() for _ in range(5)], 'offer': random.choice([0, 0, 0, 5, 5, random.randint(6, 39)]), 
        'family': random.choice(['قادری', 'محمدی', 'زارعی', 'نخجیری', 'حسینی']), 'gender': True if random.random() < .7 else False, 'sms': 9224657623, 'price': random.randint(4, 40) * 100000}})
categories = [f'{ft}-{et}' for ft in ['buy', 'rent'] for et in ['apartment', 'villa', 'old-house'] + ['office', 'store', 'industrial-agricultural-property']]
categories.remove('rent-old-house')
categories.extend([f'rent-{et}' for et in ['temporary-suite-apartment', 'temporary-villa', 'temporary-workspace']])
categories.extend(['contribution-construction', 'pre-sell-home'])
categories = [(cat, 1 / 666 / ((2 + ic) ** (1 / 666) - 1)) for ic, cat in enumerate(categories)]
consultants = pd.read_csv('static/consultant.csv').to_dict('records')
for c in consultants: c['location'] = {'type': 'Point', 'coordinates': [c['lng'], c['lat']]}; del c['lng']; del c['lat']

def dim(ad, asset_dir=os.path.join(os.path.join(os.path.dirname(__file__), 'static'), 'properties')):
    _asset_dir, _id = asset_dir + '/' + ad['category'], urlparse(ad['link']).path.split('/')[-1]
    os.makedirs(_asset_dir, exist_ok=True)
    images = [urlparse(im) for im in ad['_images'] if 'webp_thumbnail' not in im and 'mapimage' not in im]
    images = list(set([f'{pr.scheme}://{pr.netloc}{pr.path}' for pr in images]))
    images = list(sorted(images, key=cmp_to_key(lambda a, b: -1 if len(a) < len(b) or len(a) == len(b) and a < b else (1 if len(a) > len(b) or len(a) == len(b) and a > b else 0))))
    ad['imaged'], ad['imaged_date'] = True, datetime.now()
    if images:
        _asset_dir = _asset_dir + '/' + _id
        os.makedirs(_asset_dir, exist_ok=True)
        success_download = 0
        for iim, im in enumerate(images):
            if os.path.exists(f'{_asset_dir}/{iim}.webp'):
                if os.path.getsize(f'{_asset_dir}/{iim}.webp') > 3000: continue
                else: os.remove(f'{_asset_dir}/{iim}.webp')
            # print(f"aria2c '{im}' --auto-file-renaming=false --dir {_asset_dir} -o {iim}.webp")
            try: 
                r = subprocess.check_output(f"aria2c '{im}' --auto-file-renaming=false --dir {_asset_dir} -o {iim}.webp", shell=True, stderr=subprocess.DEVNULL); success_download += 1
            except:
                if os.path.exists(f'{_asset_dir}/{iim}.webp'): os.remove(f'{_asset_dir}/{iim}.webp')
        if success_download / len(images) < .8: ad['imaged'] = False if random.random() < .8 else True
        ad['images'] = [f'{"/".join(_asset_dir.split("/")[-2:])}/{iim}.webp' for iim, _ in enumerate(images) if os.path.exists(f'{_asset_dir}/{iim}.webp') and os.path.getsize(f'{_asset_dir}/{iim}.webp') > 3000]
    print(f"{cs.FAIL}{cs.BOLD}{ad['category']}{cs.ENDC} {cs.OKCYAN}{_id}{cs.ENDC} {ad['title'][:15]}")
    return {'imaged': ad['imaged'], 'imaged_date': ad['imaged_date'], 'images': ad['images']}

consultants = pd.read_csv('static/consultant.csv').to_dict('records')
for c in consultants: c['location'] = {'type': 'Point', 'coordinates': [c['lng'], c['lat']]}; del c['lng']; del c['lat']
def push_ads(host='https://jalus.ir'):  # TODO bayad az native khode mongo ya pymongo estefade koni to maye haye dump
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']; collection = 0
    collections = [('users', {'category': 'rent-temporary', 'phoned': True, 'phone': {'$ne': ''}, 'imaged': True, 'served': {'$ne': True}}), ('ads', {'category': {'$ne': 'rent-temporary'}, 'phoned': True, 'phone': {'$ne': ''}, 'imaged': True, 'served': {'$ne': True}})]
    while True:
        new_ads = list(users.find(collections[collection][1]).limit(4 if collection == 0 else 12))
        if not new_ads: time.sleep(60); continue
        for i_ad, ad in enumerate(new_ads):
            ad['images'] = [im for im in ad['images'] if os.path.exists(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{im}') and os.path.getsize(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{im}') > 3000][:(8 if collection == 0 else 3)]
            print(f"{cs.CYELLOW}{cs.BOLD}{ad['category'][-16:]}{cs.ENDC}{cs.OKCYAN}{cs.BOLD}{ad['id']}{cs.ENDC}", end='', flush=True)
            for iim, im in enumerate(ad['images']):
                files = {'file': open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{im}', 'rb')}
                r = requests.post(f'{host}/static/properties/{im}', files=files, verify=False)
                if r.status_code != 200 or not r.json()['OK']: raise
                print(f"{cs.CGREY}{cs.BOLD}{iim}{cs.ENDC}", end='', flush=True)
            if 'consultant' not in ad: ad['consultant'] = random.choice(consultants)
            ad['title'] = ad['title'].replace('&nbsp;', ' ').split(); ad['title'] = ' '.join([w for w in ad['title'] if w])
            ad['description'] = ad['description'].replace('&nbsp;', ' ').split(); ad['description'] = ' '.join([w for w in ad['description'] if w])
            if '_images' in ad: del ad['_images']
            ad['served'] = True; ad['served_date'] = str(datetime.now()).split('.')[0]; ad['notes'] = []
            del ad['_id']; ad['pan_date'] = str(ad['pan_date']).split('.')[0]; ad['detailed_date'] = str(ad['detailed_date']).split('.')[0]
            ad['phoned_date'] = str(ad['phoned_date']).split('.')[0]; ad['imaged_date'] = str(ad['imaged_date']).split('.')[0]
            if 'swap' in ad and ad['swap'] and 'date' in ad['swap']: ad['swap']['date'] = str(ad['swap']['date']).split('.')[0]
            r = requests.post(f'{host}/{collections[collection][0]}/{ad["id"]}/~', data=json.dumps(ad), verify=False)
            if r.status_code == 200: r = users.update_one({'id': ad['id']}, {'$set': {'images': ad['images'], 'served': True, 'served_date': datetime.now()}}); r = r.matched_count; print(f"{cs.CGREEN}{cs.BOLD}Served{cs.ENDC}", flush=True)
        collection = 1 - collection if len(new_ads) == 0 or len(new_ads) % 4 != 0 else 0 if random.random() < .3 else 1
        time.sleep(10 if len(new_ads) % 4 == 0 else 60)
def auto_del():
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    users.delete_many({'pan_date': {'$lte': datetime.now() - timedelta(days=28)}, 'phoned': False})

def swap():
    # TODO algorithm of matching between swappables and requestes
    pass

if __name__ == '__main__': globals()[sys.argv[1]](sys.argv[2])