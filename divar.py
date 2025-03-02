import os, os.path, random, time, glob, re, pymongo, json, subprocess, math, yaml, requests, traceback, sys, warnings, pandas as pd
from urllib.parse import urlparse
from multiprocessing import Process, Value, Lock, Manager
from datetime import datetime, timedelta
from functools import cmp_to_key
from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException
from webdriver_manager.firefox import GeckoDriverManager as FirefoxDriverManager
from random import choices, randint, random
from mimetypes import guess_extension
from copy import deepcopy
from bson import ObjectId
from ctypes import c_wchar_p
from bson.json_util import dumps
from static import wild_origins
warnings.filterwarnings('ignore')
# TODO yeki halati ke ban mishe, yeki halati ke azash ye hafte migzare
class cs: HEADER, OKBLUE, OKCYAN, OKGREEN, WARNING, FAIL, ENDC, BOLD, UNDERLINE, CGREY, CRED, CGREEN, CYELLOW, CBLUE, CVIOLET, CWHITE = '\033[95m', '\033[94m', \
    '\033[96m', '\033[92m', '\033[93m', '\033[91m', '\033[0m', '\033[1m', '\033[4m', '\33[90m', '\33[31m', '\33[32m', '\33[33m', '\33[34m', '\33[35m', '\33[37m'
def get_users(stat=True):
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    users.create_index([('location', '2dsphere')])
    users.create_index([('source', 1), ('category', 1), ('date', 1)])
    users.create_index([('source', 1), ('detailed', 1), ('imaged', 1), ('phoned', 1)])
    users.create_index([('link', 1)], unique=True); users.create_index([('id', 1)], unique=True)
    # users.delete_many({})
    if stat:
        print(f"{cs.FAIL}{cs.BOLD}All, Detail : {users.count_documents({})}, {users.count_documents({'detailed': True})}{cs.ENDC}")
        print(f"{cs.FAIL}{cs.BOLD}Phone, Image: {users.count_documents({'phoned': True})}, {users.count_documents({'imaged': True})}{cs.ENDC}")
        print(f"{cs.FAIL}{cs.BOLD}Serve       : {users.count_documents({'served': True})}{cs.ENDC}")
    return users

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
cm = {
    'browse-post-list': ['post-list-eb562', 'browse-post-list', 'wf3858', 'browse-post-list-_-f3858'], 
    'post-card-item': ['widget-col-d2306', 'post-list__widget-col-c1444', 'post-card-item', 'waf972', 'post-card-item-_-af972'],
    'kt-post-card__title': ['unsafe-kt-post-card__title', 'kt-post-card__title'],
    'kt-post-card__bottom-description': ['unsafe-kt-post-card__description', 'kt-post-card__description', 'kt-post-card__bottom-description'],
}
used_profiles, profile_lock, browser_index = [Value(c_wchar_p, '**********') for _ in range(3)], Lock(), randint(0, 73)
consultants = pd.read_csv('static/consultant.csv').to_dict('records')
for c in consultants: c['location'] = {'type': 'Point', 'coordinates': [c['lng'], c['lat']]}; del c['lng']; del c['lat']

def random_browser(phone=None, otp=False, headless=False, imaged=False):
    global browser_index
    profile_lock.acquire()
    os.environ['GH_TOKEN'] = "<github token>"
    if phone: phone = re.sub(r'^09', '9', re.sub(r'^\+989', '9', str(phone)))
    profiles = glob.glob(f'/home/arsha/snap/firefox/common/.mozilla/firefox/*.Divar_{phone if phone else "*"}')
    if otp:
        freshes = []
        for pr in profiles:
            bfs = sorted(glob.glob(f'{pr}/ban_*'))
            if not bfs: continue
            # if datetime.now() - datetime.fromisoformat(bfs[-1].split('ban_')[-1]) > timedelta(days=60): continue
            with open(bfs[-1]) as f:
                if datetime.now() - datetime.fromisoformat(f.read()) < timedelta(days=1): continue
            freshes.append(pr)
        if freshes: profiles = freshes
        else: otp = False
    if len(profiles) == 0: raise
    profiles = {p.split('/')[-1].split('_')[-1]: p for p in profiles}
    profiles = {k: v for k, v in profiles.items() if not any([k.encode() == p.value for p in used_profiles])}
    if otp: profile = list(profiles.items())[browser_index := (browser_index + 1) % len(profiles)][1]; print(profile)
    else: profile = choices(list(profiles.items()))[0][1]
    for p in used_profiles:
        if p.value == b'**********':  p.value = profile.split('/')[-1].split('_')[-1].encode(); break
    try: ps = subprocess.check_output(f'ps -fC firefox', shell=True, stderr=subprocess.STDOUT).decode().split('\n')
    except Exception as e: ps = e.output.decode().split('\n')
    ps = [p for p in ps if 'firefox' in p and profile.split('/')[-1] in p]
    for p in ps: p = [arg for arg in p.split() if arg]; subprocess.call(f'kill -9 {p[1]}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        with open(f'{profile}/prefs.js', 'r') as prefs:
            prefs = list(prefs.readlines())
            permission = [(ipref, pref) for ipref, pref in enumerate(prefs) if 'permissions.default.image' in pref]
            if not permission or f'{1 if imaged else 2}' not in permission[0][1]:
                if permission: prefs = [pref for ipref, pref in enumerate(prefs) if ipref != permission[0]]
                prefs.append(f'user_pref("permissions.default.image", {1 if imaged else 2});\n')
                with open(f'{profile}/prefs.js', 'w') as w_prefs:
                    w_prefs.write(''.join(prefs))
    except FileNotFoundError: print('profile is fresh reopen to add no image')
    o = webdriver.FirefoxOptions()
    if headless: o.headless = True; o.add_argument('-headless');  # o.add_argument("--headless=new")
    [o.add_argument(arg) for arg in ['--profile', profile, '--user-data-dir', 'selenium']]
    profile_lock.release()
    try:
        # br = webdriver.Firefox(options=o, service=FirefoxService(FirefoxDriverManager().install()))
        br = webdriver.Firefox(options=o, service=FirefoxService('/home/arsha/.wdm/drivers/geckodriver/linux64/v0.35.0/geckodriver'))
        br.__profile__, br.__otp__ = profile, otp
        return br
    except WebDriverException: return random_browser(phone=phone, otp=otp, headless=headless)

def otp(phone):
    browser = random_browser(phone, imaged=True)
    user = get_users().find().sort([('pan_date', -1), ('pan_cnt', 1)]).limit(1)
    # user = [{'link': 'https://divar.ir/v/_/wZSwa-DW'}]
    if not user: return
    browser.get(user[0]['link'])
    WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.XPATH, ".//button[contains(concat(' ', @class, ' '), ' post-actions__get-contact ')]"))).click()
    try:
        WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.XPATH, "//p[text()[contains(., 'شمارهٔ موبایل')]]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        phone = WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.XPATH, "//a[contains(@href,'tel:')]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        time.sleep(1); browser.quit(); return
    except: pass
    try: WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.XPATH, "//button[.//*[text()[contains(., 'با قوانین دیوار موافقم')]]]"))).click()
    except: pass
    mobile = WebDriverWait(browser, 30).until(EC.presence_of_element_located((By.XPATH, '//input[@name="mobile"]')))
    mobile.send_keys(f"0{phone}")
    time.sleep(1.8)
    try: WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.XPATH, "//button[.//*[text()[contains(., 'تأیید')]]]"))).click()
    except: pass
    sms = input()
    code = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.XPATH, '//input[@name="code"]')))
    code.send_keys(sms)
    WebDriverWait(browser, 150).until(EC.invisibility_of_element_located((By.XPATH, "//div[text()[contains(., 'ورود به حساب کاربری')]]")))  # class="kt-modal__title"
    with open(browser.__profile__ + f"/ban_{str(datetime.now()).split(' ')[0]}", 'w') as f:
        f.write(f'{datetime.now() - timedelta(days=1, seconds=1)}')
    # browser.quit()

def pan(browser, city, photo=True, log=True, rpm=10, cat=None, q=''):  # todo pan doesnt need loop and rpm
    users = get_users()
    if not cat:
        cats = [(cat, w, list(users.find({'source': 'divar', 'category': cat}).sort([('pan_date', -1), ('pan_cnt', 1)]).limit(3))[::-1]) for cat, w in deepcopy(categories)]
        cats = [(cat, w * (min((datetime.now() - lasts[-1]['pan_date']).total_seconds() / 60 / 60, 3) if lasts else 5), set([ad['link'] for ad in lasts])) for cat, w, lasts in cats]  # ln 17 / ln 2]
        w_cat_s = sum([w for _, w, _ in cats])
        cat = choices(cats, [w / w_cat_s for _, w, _ in cats])[0][0]
    try:
        if q: browser.get(f"https://divar.ir/s/{city}/{cat}{'?has-photo=true' if photo else ''}&q={q}&business-type=personal")
        else: browser.get(f"https://divar.ir/s/{city}/{cat}{'?has-photo=true' if photo else ''}&business-type=personal")
    except: return 0
    seen, pan_date, pan_cnt = set(), datetime.now(), 0
    while True:
        t0 = time.time()
        browser.implicitly_wait(1.5); time.sleep(.5)
        for attr in cm["browse-post-list"]:
            try: post_list = browser.find_elements(by=By.CLASS_NAME, value=f'{attr}')[0]; halt = True; break
            except: halt = False
        if not halt: print(traceback.format_exc()); return 0
        for attr in cm["post-card-item"]:
            ads, pds = post_list.find_elements(by=By.XPATH, value=f".//div[contains(concat(' ', @class, ' '), ' {attr} ')]"), []
            if ads: halt = True; break
            else: halt = False
        if not halt: print(traceback.format_exc()); return 0
        for ad in ads:
            t1 = time.time()
            refs = [ref.get_attribute('href') for ref in ad.find_elements(by=By.XPATH, value=".//a[@href and string-length(@href)!=0]")]
            refs = [ref for ref in refs if '/v/' in ref]
            if not refs: continue
            for attr in cm['kt-post-card__title']:
                try: title = ad.find_element(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {attr} ')]").get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا'); halt = True; break
                except: halt = False
            if not halt: continue
            subtitles = []
            for attr in cm['kt-post-card__bottom-description']:
                bottoms = ad.find_elements(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {attr} ')]")
                if not bottoms: continue
                for sub in bottoms: subtitles.append(sub.get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا')); 
                break
            # if not subtitles: print(traceback.format_exc()); assert 1 == 0
            loc = list(reversed(wild_origins[city][0]['loc']))
            print(f"{cs.WARNING}{cs.BOLD}Pan {pan_cnt}:{cs.ENDC} {cs.OKCYAN}{refs[0].split('/')[-1]}{cs.ENDC} {title} {cs.CGREY}{subtitles[0]}{cs.ENDC}")
            # with open('../divar_pan.yml', 'a', encoding='utf-8') as f: f.write(yaml.dump({'title': title, 'category': cat, 'subtitles': subtitles, 'link': refs[0], 'loc': loc, 'pan_date': pan_date}, default_flow_style=False, indent=2, allow_unicode=True))
            pds.append({
                'title': title, 'category': cat, 'subtitles': subtitles, 'id': refs[0].split('/')[-1], 'link': refs[0], 'location': {'type': 'Point', 'coordinates': loc}, 'pan_date': pan_date,
                'pan_cnt': (pan_cnt := pan_cnt + 1), 'source': 'divar', 'maker': True, 'detailed': False, 'imaged': False, 'phoned': False, 'score': 0., 'synced': False,
            })
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        ads = [ad for ad in pds if ad['link'] not in seen and ad['title']]
        [seen.add(ad['link']) for ad in ads]
        ads_length = len(ads)
        ads = [ad for ad in ads if ad['link'] not in cat]
        if not ads: break
        try:
            for ad in ads:
                users.insert_one(ad)
        except pymongo.errors.DuplicateKeyError: print(f"{cs.WARNING}{cs.BOLD}Pan: END{cs.ENDC}"); break
        if ads_length != len(ads): break
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight)"); time.sleep(10)
        load_more_class = 'post-list__load-more-btn-be092'; load_more = browser.find_elements(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {load_more_class} ')]")
        if load_more: load_more[0].click(); time.sleep(10)
        for iattr in range(len(cm["browse-post-list"])):
            time.sleep(3)
            last_title = browser.find_elements(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {cm['browse-post-list'][iattr]} ')]//div[contains(concat(' ', @class, ' '), ' {cm['post-card-item'][iattr]} ')][last()]//*[contains(concat(' ', @class, ' '), ' {cm['kt-post-card__title'][iattr]} ')]")
            if last_title: last_title = last_title[-1].get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا'); break
        try: WebDriverWait(browser, 30).until(lambda browser: 
            browser.find_elements(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {cm['browse-post-list'][iattr]} ')]//div[contains(concat(' ', @class, ' '), ' {cm['post-card-item'][iattr]} ')][last()]//*[contains(concat(' ', @class, ' '), ' {cm['kt-post-card__title'][iattr]} ')]")[0] \
            .get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا') != ads[-1]['title']
        )
        except: break
        time.sleep(max(min(pan_cnt, 10) / rpm * 60 - (time.time() - t0), 0))
    return pan_cnt

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
            if os.path.exists(f'{_asset_dir}/{iim}.webp'):
                if os.path.getsize(f'{_asset_dir}/{iim}.webp') > 3000: remain -= 1; continue
                else: os.remove(f'{_asset_dir}/{iim}.webp')
            try: r = subprocess.check_output(f"aria2c {im} --auto-file-renaming=false --dir {_asset_dir} -o {iim}.webp", shell=True, stderr=subprocess.DEVNULL); remain -= 1
            except:
                if os.path.exists(f'{_asset_dir}/{iim}.webp'): os.remove(f'{_asset_dir}/{iim}.webp')
            if remain == 0: break
        if remain > 2: ad['imaged'] = False if random() < .75 else True
        ad['images'] = [f'{"/".join(_asset_dir.split("/")[-2:])}/{iim}.webp' for iim, _ in enumerate(images) if os.path.exists(f'{_asset_dir}/{iim}.webp') and os.path.getsize(f'{_asset_dir}/{iim}.webp') > 3000]
    print(f"{cs.FAIL}{cs.BOLD}Image:{cs.ENDC} {cs.OKCYAN}{ad['link'].split('/')[-1]}{cs.ENDC} {ad['title']}")
    return {'imaged': ad['imaged'], 'imaged_date': ad['imaged_date'], 'images': ad['images']}
    
# age halate lesser bashe -> center of polygon mishe khode amlaki pas
def dad(browser, user):  # TODO choose consultant for dad after location <- voronoi, sort average distance of poligon points or center of polygon for lesser cpu
    user['detailed'], user['detailed_date'] = True, datetime.now()
    # try: _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'این راه به جایی نمی‌رسد!')]]"); return
    try: _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'این صفحه حذف شده یا وجود ندارد.')]]"); return
    except: pass
    if 'title' not in user or not user['title']: user['title'] = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' kt-page-title__texts ')]//*[contains(concat(' ', @class, ' '), ' kt-page-title__title')]").get_attribute("innerHTML")
    if 'subtitles' not in user: user['subtitles'] = []
    try: user['subtitles'].append(browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' kt-page-title__texts ')]//*[contains(concat(' ', @class, ' '), ' kt-page-title__subtitle ')]").get_attribute("innerHTML").split('|')[0].strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا'))
    except: pass
    # user['subtitle'] = [sub.strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا') for sub in user['subtitle'].split('در ')]; user['subtitle'], user['divar_date'] = user['subtitle'][1], user['subtitle'][0]
    description = browser.find_elements(by=By.XPATH, value="//p[contains(concat(' ', @class, ' '), ' kt-description-row__text kt-description-row__text--primary ')]")
    if description:
        try: user['description'] = description[0].get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا')
        except: return False
    else: user['description'] = ''; print("NO DESCRIPTION")
    title_description = user['title'].strip() + ' ' + user['description'].strip()
    title_description = [w for w in title_description.split() if w]
    if 'معاوضه' in title_description:
        swap_index = title_description.index('معاوضه')
        user['swap'] = {'q': '', 'location': {'type': 'Point', 'coordinates': [0, 0]}, 'category': '', 'budget': 0, 'date': datetime.now()}
        if swap_index + 2 < len(title_description) and title_description[swap_index + 1] == 'با': user['swap']['q'] = title_description[swap_index + 2]
    # options = browser.find_elements(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' kt-group-row-item--info-row ') and .//*[contains(concat(' ', @class, ' '), ' kt-group-row-item__title ')] and .//*[contains(concat(' ', @class, ' '), ' kt-group-row-item__value ')] and .//*[contains(concat(' ', @class, ' '), ' kt-group-row__heading ')] and .//*[contains(concat(' ', @class, ' '), ' kt-group-row__data-row ')]]")
    options = browser.find_elements(by=By.XPATH, value="//*[contains(concat(' ', @class, ' '), ' kt-group-row-item--info-row ')]")
    ks = [op.text for op in options[:len(options) // 2]]; vs = [op.text for op in options[len(options) // 2:]]
    # ks = [op.find_elements(by=By.XPATH, value=".//*[contains(concat(' ', @class, ' '), ' kt-group-row-item__title ')]") for op in options]
    # vs = [op.find_elements(by=By.XPATH, value=".//*[contains(concat(' ', @class, ' '), ' kt-group-row-item__value ')]") for op in options]
    # ks = [k[0] for k in ks if k]; vs = [v[0] for v in vs if v]
    # ks, vs = [el.get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا') for el in ks], [el.get_attribute("innerHTML").strip() for el in vs]
    user['options'] = dict(list(zip(ks, vs)))  # <- OPTIONS ->

    features = browser.find_elements(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' kt-group-row-item ') and .//*[contains(concat(' ', @class, ' '), ' kt-group-row-item__icon ')] and .//*[contains(concat(' ', @class, ' '), ' kt-group-row-item__value ')]]")
    # ks = [fe.find_element(by=By.XPATH, value=".//*[contains(concat(' ', @class, ' '), ' kt-group-row-item__title ')]") for op in options]
    disables = ['kt-group-row-item--disabled' not in fe.get_attribute("class") for fe in features]
    vs = [fe.find_element(by=By.XPATH, value=".//span[contains(concat(' ', @class, ' '), ' kt-group-row-item__value ')]") for fe in features]
    features = [el.text.strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا') for el in vs]
    user['features'] = dict(list(zip(features, disables)))  # <- FEATURES ->
    for k, v in deepcopy(user['features']).items():
        if 'ندارد' in k:
            del user['features'][k]
            user['features'][k.replace('ندارد', '').strip()] = False
    
    rows = browser.find_elements(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' kt-unexpandable-row ') and .//*[contains(concat(' ', @class, ' '), ' kt-unexpandable-row__title ')] and .//*[contains(concat(' ', @class, ' '), ' kt-unexpandable-row__value ')]]")
    ks = [row.find_element(by=By.XPATH, value=".//*[contains(concat(' ', @class, ' '), ' kt-unexpandable-row__title ')]") for row in rows]
    vs = [row.find_element(by=By.XPATH, value=".//*[contains(concat(' ', @class, ' '), ' kt-unexpandable-row__value ')]") for row in rows]
    # ks, vs = [el.get_attribute("innerHTML") for el in ks], [el.get_attribute("innerHTML") for el in vs]
    ks, vs = [el.text.strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا') for el in ks], [el.text.strip() for el in vs]
    user['rows'] = dict(list(zip(ks, vs)))  # <- ROWS ->
    images = browser.find_elements(by=By.XPATH, value="//img[contains(concat(' ', @class, ' '), ' kt-image-block__image ') and @src and string-length(@src)!=0]")
    images = list(set([img.get_attribute('src') for img in images]))
    user['_images'] = images  # <- IMAGES ->
    try:
        lat_lng = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' map-cm ')]//a[contains(concat(' ', @class, ' '), ' map-cm__button ') and @href]")
        lat_lng = urlparse(lat_lng.get_attribute('href'))
        lat, lng = lat_lng.query.split('&')
        lat, lng = float(lat.split('=')[1]), float(lng.split('=')[1])
        user['location'] = {'type': 'Point', 'coordinates': [lng, lat]}
    except: pass
        # if 'location' not in user or not user['location']:
        #     for loc in user['subtitle'].split('،'):
        #         if (loc := loc.strip()) in wild_origins:
        #             # user['location'] = {'type': 'Point', 'coordinates': list(reversed(.get()[0]['location']))}
        #             break
    d_consultants = [(abs(c['location']['coordinates'][0] - user['location']['coordinates'][0]) ** 1.3 + abs(c['location']['coordinates'][1] - user['location']['coordinates'][1]) ** 1.3, c) for c in consultants]
    d_consultants = list(sorted(d_consultants, key=lambda c: c[0]))
    if d_consultants[1][0] / d_consultants[0][0] > 1.3: user['consultant'] = d_consultants[0][1]
    else: user['consultant'] = d_consultants[0][1] if random() < .6 else d_consultants[1][1]
    user['score'] = math.log(len(user['_images']) + 1) + math.log(len(user['description']) + 1) + math.log(len(user['title']) + 1) + math.log(len(user['options']) + 1) + math.log(len(user['features']) + 1) + math.log(len(user['rows']) + 1)
    print(f"{cs.OKGREEN}{cs.BOLD}Ad:{cs.ENDC} {cs.OKCYAN}{user['link'].split('/')[-1]}{cs.ENDC} {user['title']} {cs.CWHITE if user['score'] > 12.8 else cs.CGREY}{user['score']:.2f}{cs.ENDC}")
    # with open('../divar_detail.yml', 'a', encoding='utf-8') as f: f.write(yaml.dump(user, default_flow_style=False, indent=2, allow_unicode=True))
    return True

def dphone(browser, user):
    try: _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'این صفحه حذف شده یا وجود ندارد.')]]"); return
    except: pass
    for ic, button_class in enumerate(['post-actions__non-experimental', 'post-actions__get-contact']):
        try: WebDriverWait(browser, 7).until(EC.presence_of_element_located((By.XPATH, f".//button[contains(concat(' ', @class, ' '), ' {button_class} ')]"))).click(); break
        except:
            if ic == 1: browser.quit(); raise Exception()
    try:
        phone = WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, "//a[contains(@href,'tel:')]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        eng_phone = phone.get_attribute('href').split('tel:')[1].strip()
        user['phone'] = eng_phone if eng_phone else phone.text.strip()
        user['phoned'] = True
        user['phoned_date'] = datetime.now()
        print(f"{cs.OKBLUE}{cs.BOLD}Phone:{cs.ENDC} {cs.OKCYAN}{eng_phone},{user['phone']}{cs.ENDC} {user['title']} {cs.CGREY}{user['score']:.2f}{cs.ENDC}")
        # with open('../divar_phone.yml', 'a', encoding='utf-8') as f: f.write(yaml.dump(user, default_flow_style=False, indent=2, allow_unicode=True))
        return {'phone': user['phone'], 'phoned': user['phoned'], 'phoned_date': user['phoned_date']}
    except:
        try:
            _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' kt-modal__title ') and text()[contains(., 'محدودیت نمایش اطلاعات تماس')]]")
            bf = max(glob.glob(f'{browser.__profile__}/ban_*'))
            with open(bf, 'r') as limit:
                old_ban = datetime.fromisoformat(limit.read())
                if datetime.now - old_ban > timedelta(days=1, seconds=1):
                    print('you got banned just Now')
                    with open(bf, 'w') as limit:
                        limit.write(f'{datetime.now()}')
                else: print('you got banned just again')
            browser.__otp__ = False
        except: pass
        return {}

def ppan(headless=False, rpm=45, debug=False, **kwargs):
    while True:
        if len([arg for arg in sys.argv if len(arg) and arg[0] != '-' and not arg.isnumeric()]) > 3:
            browser, t0 = random_browser(headless=headless, phone=sys.argv[-2] + '-' + sys.argv[-1]), time.time()
            cat = sys.argv[-1]
            k = pan(browser, city=sys.argv[-2], photo=True, log=True, rpm=rpm, cat=cat)
        else:
            with open(os.path.join(os.path.join(os.path.dirname(__file__), 'static'), 'divar.csv'), encoding='utf-8') as csv:
                csv = csv.readlines(); csv = [[v.strip() for v in l.strip().split(',')] for l in csv]; csv = [l for l in csv if len(l) == 4]
                city, cat, _, q = choices(csv, [float(l[2]) for l in csv], k=1)[0]
            print(city, cat, q)
            browser, t0 = random_browser(headless=headless, phone=city + '-' + cat), time.time()
            k = pan(browser, city=city, photo=True, log=True, rpm=rpm, cat=cat, q=q)
        browser.quit()
        for p in used_profiles:
            if p.value == browser.__profile__.split('/')[-1].split('_')[-1].encode(): p.value = b'**********'; break
        time.sleep(max(k / rpm * 60 - (time.time() - t0), 45 if k else 90))

def pdim(rpm=10, debug=False, **kwargs):
    while True:
        users, t0 = get_users(stat=False), time.time()
        _users = list(users.aggregate([{'$match': {'source': 'divar', 'imaged': {'$ne': True}}}, {'$sample': {'size': max(5, rpm // 10)}}]))
        ads = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': True, '_images': {'$exists': True}, 'phoned': True, 'phone': {'$exists': True, '$ne': ''}, 'imaged': {'$ne': True}}}, {'$sample': {'size': max(5, rpm // 10)}}]))
        # ads = list(users.find({'id': 'QZ8fmObt'}))
        for ad in ads:
            t1 = time.time(); r = dim(ad)
            users.update_one({'_id': ad['_id']}, {'$set': r})
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), (max(5, rpm // 10) - len(ads)) * 7))

def pdad(headless=False, rpm=10, debug=False, **kwargs):
    while True:
        users, t0 = get_users(), time.time()
        _users = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': False}}, {'$sample': {'size': max(5, rpm // 4)}}]))
        browser = random_browser(headless=headless, otp=False)
        for user in _users:
            t1 = time.time()
            try: browser.get(f"{user['link']}")
            except: continue
            succeed = dad(browser, user)
            if not succeed: continue
            users.replace_one({'_id': user['_id']}, user)
            # if user['score'] > 12.8 and browser.__otp__:
            #     uq = dphone(browser, user)
            #     if 'phoned' in uq and uq['phoned'] and uq['phone']:
            #         users.replace_one({'_id': user['_id']}, user)
            #     else:
            #         try: 
            #             _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'شماره مخفی شده است')]]")
            #             user['phoned'] = True; user['phone'] = '_'; user['phoned_date'] = datetime.now()
            #             users.replace_one({'_id': user['_id']}, user)
            #         except: pass
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        browser.quit()
        for p in used_profiles:
            if p.value == browser.__profile__.split('/')[-1].split('_')[-1].encode():
                p.value = b'**********'
                break
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), (max(5, rpm // 4) - len(_users)) * 7))

def pphone(headless=False, rpm=10, debug=False, phone=None, **kwargs):  # rpm
    while True:
        users, t0 = get_users(), time.time()
        # _users = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': True, 'phoned': False}}, {'$sample': {'size': 1}}]))
        # _users = list(users.find({'source': 'divar', 'detailed': True, 'phoned': False}).sort([('score', -1)]).limit(max(5, rpm // 10)))  # 5 * 12 = 60
        _users = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': True, 'phoned': False, 'score': {'$gt': 12.8}}}, {'$sample': {'size': max(1, min(rpm // 10, 1))}}]))
        browser = random_browser(headless=headless, otp=True, phone=phone)
        if not browser.__otp__: print(f"{cs.OKBLUE}{cs.BOLD}Phone:{cs.ENDC} no otp browser"); time.sleep(60); continue
        for user in _users:
            t1 = time.time()
            if user['score'] < 12.8: break
            try: browser.get(f"{user['link']}")
            except: _users = []; break
            uq = dphone(browser, user)
            if 'phoned' in uq and uq['phoned'] and uq['phone']:
                users.replace_one({'_id': user['_id']}, user)
            else:
                try: 
                    _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'شماره مخفی شده است')]]")
                    user['phoned'] = True; user['phone'] = '_'; user['phoned_date'] = datetime.now()
                    users.replace_one({'_id': user['_id']}, user)
                except: pass
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        browser.quit()
        for p in used_profiles:
            if p.value == browser.__profile__.split('/')[-1].split('_')[-1].encode():
                p.value = b'**********'
                break
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), (1 - len(_users)) * 60))
        # time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0) + randint(-270, 270), 0))

def swap():
    # TODO algorithm of matching between swappables and requestes
    pass

if __name__ == '__main__':
    routines = {'image': pdim, 'phone': pphone, 'detail': pdad, 'pan': ppan}  # , 'upload': pup, }
    if len(sys.argv) > 1 and sys.argv[1] in routines:
        debug = True if ('-d' in sys.argv or '--debug' in sys.argv) else False
        headless = True if ('-h' in sys.argv or '--headless' in sys.argv) else False
        phone = [p for p in sys.argv if len(p) == 10 and p.isnumeric()]; phone = phone[0] if phone else None
        if '-r' in sys.argv or '--rpm' in sys.argv:
            routines[sys.argv[1]](headless=headless, debug=debug, phone=phone, rpm=float(sys.argv[(sys.argv.index('-r') + 1) if '-r' in sys.argv else (sys.argv.index('--rpm') + 1)]))
        else: routines[sys.argv[1]](headless=headless, debug=debug)
    elif len(sys.argv) > 1: otp(sys.argv[2]) if sys.argv[1] == 'otp' else random_browser(phone=sys.argv[2], headless=False) if sys.argv[1] == 'browser' else ()
    else:
        users = ['wYCHa2QQ', 'wYJjQnAg', 'gYhK77DW'] # print(r.modified_count, r.matched_count) # users = list(users.aggregate([{'$match': {'source': 'divar', 'imaged': False, 'detailed': True, '_images': {'$exists': True, '$ne': []}}}, {'$sample': {'size': 1000}}])); users = sorted(users, key=lambda u: -u['score']); print(users[len(users) // 2]['score'])
        for u in users:
            u = {'_id': ObjectId(), 'link': f'https://divar.ir/v/_/{u}', 'title': None, 'category': 'rent-temporary', 'pan_date': None, 'pan_cnt': 0, 'divar_date': None, 'subtitle': None, 'location': None, 'source': 'divar', 'maker': True, 'detailed': False, 'imaged': False, 'phoned': False, 'score': 0.0, 'synced': False}
            browser = random_browser(headless=False, otp=True)
            browser.get(f"{u['link']}")
            dad(browser, u)
            u['_id'] = str(u['_id']); u['gender'] = True; u['family'] = ''; u['category'] = 'استخردار'; u['phone'] = ''
            del u['detailed']; del u['detailed_date']; del u['synced']; del u['subtitle']; del u['source']; del u['score']
            del u['pan_cnt']; del u['pan_date']; del u['phoned']; del u['maker']; del u['imaged']
            # dphone(browser, u)
            print(yaml.dump(u, default_flow_style=False, allow_unicode=True))
            dim(u, asset_dir='static/properties')
            browser.quit()