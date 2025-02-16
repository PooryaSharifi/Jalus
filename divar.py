import os, os.path, random, time, glob, re, pymongo, json, subprocess, math, yaml, requests, traceback, sys, warnings
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
from random import choices
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
def get_users():
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    users.create_index([('location', '2dsphere')])
    users.create_index([('source', 1), ('category', 1), ('date', 1)])
    users.create_index([('source', 1), ('detailed', 1), ('imaged', 1), ('phoned', 1)])
    users.create_index([('link', 1)], unique=True); users.create_index([('id', 1)], unique=True)
    # users.delete_many({})
    print(f"{cs.FAIL}{cs.BOLD}Count All   : {users.count_documents({})}{cs.ENDC}")
    print(f"{cs.FAIL}{cs.BOLD}Count Detail: {users.count_documents({'detailed': True})}{cs.ENDC}")
    print(f"{cs.FAIL}{cs.BOLD}Count Phoned: {users.count_documents({'phoned': True})}{cs.ENDC}")
    print(f"{cs.FAIL}{cs.BOLD}Count Imaged: {users.count_documents({'imaged': True})}{cs.ENDC}")
    print(f"{cs.FAIL}{cs.BOLD}Count Served: {users.count_documents({'served': True})}{cs.ENDC}")
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
    'kt-post-card__title': ['kt-post-card__title'],
    'kt-post-card__bottom-description': ['kt-post-card__description', 'kt-post-card__bottom-description'],
}
used_profiles, profile_lock = [Value(c_wchar_p, '**********') for _ in range(3)], Lock()
    
def random_browser(phone=None, otp=False, headless=False):
    profile_lock.acquire()
    os.environ['GH_TOKEN'] = "<github token>"
    if phone: phone = re.sub(r'^09', '9', re.sub(r'^\+989', '9', str(phone)))
    profiles = glob.glob(f'/home/arsha/snap/firefox/common/.mozilla/firefox/*.Divar_{phone if phone else "*"}')
    if otp:
        freshes = []
        for pr in profiles:
            bfs = sorted(glob.glob(f'{pr}/ban_*'))
            if not bfs: continue
            if datetime.now() - datetime.fromisoformat(bfs[-1].split('ban_')[-1]) > timedelta(days=30): continue
            with open(bfs[-1]) as f:
                if datetime.now() - datetime.fromisoformat(f.read()) < timedelta(days=1): continue
            freshes.append(pr)
        if freshes: profiles = freshes
        else: otp = False
    if len(profiles) == 0: raise
    profiles = {p.split('/')[-1].split('_')[-1]: p for p in profiles}
    profiles = {k: v for k, v in profiles.items() if not any([k.encode() == p.value for p in used_profiles])}
    profile = choices(list(profiles.items()))[0][1]
    for p in used_profiles:
        if p.value == b'**********':  p.value = profile.split('/')[-1].split('_')[-1].encode(); break
    try:
        with open(f'{profile}/prefs.js', 'r') as prefs:
            prefs = list(prefs.readlines())
            permission = [(ipref, pref) for ipref, pref in enumerate(prefs) if 'permissions.default.image' in pref]
            if not permission or '2' not in permission[0][1]:
                if permission: prefs = [pref for ipref, pref in enumerate(prefs) if ipref != permission[0]]
                prefs.append('user_pref("permissions.default.image", 2);\n')
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
    browser = random_browser(phone)
    user = get_users().find().sort([('pan_date', -1), ('pan_cnt', 1)]).limit(1)
    # user = [{'link': 'https://divar.ir/v/_/wZSwa-DW'}]
    if not user: return
    browser.get(user[0]['link'])
    WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.XPATH, ".//button[contains(concat(' ', @class, ' '), ' post-actions__get-contact ')]"))).click()
    try:
        WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.XPATH, "//p[text()[contains(., 'شمارهٔ موبایل')]]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        phone = WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.XPATH, "//a[contains(@href,'tel:')]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        browser.quit()
        return
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
    if q: browser.get(f"https://divar.ir/s/{city}/{cat}{'?has-photo=true' if photo else ''}&q={q}")
    else: browser.get(f"https://divar.ir/s/{city}/{cat}{'?has-photo=true' if photo else ''}")
    seen, pan_date, pan_cnt = set(), datetime.now(), 0
    while True:
        t0 = time.time()
        browser.implicitly_wait(1.5); time.sleep(.5)
        for attr in cm["browse-post-list"]:
            try: post_list = browser.find_elements(by=By.CLASS_NAME, value=f'{attr}')[0]; halt = True; break
            except: halt = False
        if not halt: print(traceback.format_exc()); assert 1 == 0
        for attr in cm["post-card-item"]:
            ads, pds = post_list.find_elements(by=By.XPATH, value=f".//div[contains(concat(' ', @class, ' '), ' {attr} ')]"), []
            if ads: halt = True; break
            else: halt = False
        if not halt: print(traceback.format_exc()); assert 1 == 0
        for ad in ads:
            t1 = time.time()
            refs = [ref.get_attribute('href') for ref in ad.find_elements(by=By.XPATH, value=".//a[@href and string-length(@href)!=0]")]
            refs = [ref for ref in refs if '/v/' in ref]
            if not refs: continue
            for attr in cm['kt-post-card__title']:
                try: title = ad.find_element(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {attr} ')]").get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا'); halt = True; break
                except: halt = False
            if not halt: print(traceback.format_exc()); assert 1 == 0
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
        ads = [ad for ad in pds if ad['link'] not in seen]
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
    images = sorted(images, key=cmp_to_key(lambda a, b: -1 if len(a) < len(b) or len(a) == len(b) and a < b else (1 if len(a) > len(b) or len(a) == len(b) and a > b else 0)))
    if images:
        _asset_dir = _asset_dir + '/' + _id
        os.makedirs(_asset_dir, exist_ok=True)
        if len([name for name in os.listdir(_asset_dir)]) != len(images):
            [subprocess.run(f"curl {im} > {_asset_dir}/{iim}.webp", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL) for iim, im in enumerate(images) if iim < 6]
        ad['images'] = [f'{"/".join(_asset_dir.split("/")[-2:])}/{iim}.webp' for iim, _ in enumerate(images)]
    print(f"{cs.FAIL}{cs.BOLD}Image:{cs.ENDC} {cs.OKCYAN}{ad['link'].split('/')[-1]}{cs.ENDC} {ad['title']}")
    ad['imaged'], ad['imaged_date'] = True, datetime.now()
    return {'imaged': ad['imaged'], 'imaged_date': ad['imaged_date'], 'images': ad['images']}
    
def dad(browser, user):
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
    else: print("NO DESCRIPTION")
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
    user['score'] = math.log(len(user['_images']) + 1) + math.log(len(user['description']) + 1) + math.log(len(user['title']) + 1) + math.log(len(user['options']) + 1) + math.log(len(user['features']) + 1) + math.log(len(user['rows']) + 1)
    print(f"{cs.OKGREEN}{cs.BOLD}Ad:{cs.ENDC} {cs.OKCYAN}{user['link'].split('/')[-1]}{cs.ENDC} {user['title']} {cs.CWHITE if user['score'] > 10.8 else cs.CGREY}{user['score']:.2f}{cs.ENDC}")
    # with open('../divar_detail.yml', 'a', encoding='utf-8') as f: f.write(yaml.dump(user, default_flow_style=False, indent=2, allow_unicode=True))
    return True

def phone(browser, user):
    try: _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'این صفحه حذف شده یا وجود ندارد.')]]"); return
    except: pass
    for ic, button_class in enumerate(['post-actions__non-experimental', 'post-actions__get-contact']):
        try: WebDriverWait(browser, 7).until(EC.presence_of_element_located((By.XPATH, f".//button[contains(concat(' ', @class, ' '), ' {button_class} ')]"))).click(); break
        except:
            if ic == 1: raise Exception()
    try:
        phone = WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, "//a[contains(@href,'tel:')]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        eng_phone = phone.get_attribute('href').split('tel:')[1].strip()
        user['phone'] = phone.text.strip()
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

def ppan(headless=False, rpm=45, debug=False):
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
        time.sleep(max(k / rpm * 60 - (time.time() - t0), 0))

def pdim(rpm=10, debug=False, **kwargs):
    while True:
        users, t0 = get_users(), time.time()
        _users = list(users.aggregate([{'$match': {'source': 'divar', 'imaged': False}}, {'$sample': {'size': max(5, rpm // 10)}}]))
        ads = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': True, '_images': {'$exists': True}, 'phoned': True, 'phone': {'$exists': True, '$ne': ''}, 'imaged': False}}, {'$sample': {'size': max(5, rpm // 10)}}]))
        for ad in ads:
            t1 = time.time()
            dim(ad)
            users.replace_one({'_id': ad['_id']}, ad)
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), 0))

def pdad(headless=False, rpm=10, debug=False, **kwargs):
    while True:
        users, t0 = get_users(), time.time()
        _users = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': False}}, {'$sample': {'size': max(5, rpm // 10)}}]))
        browser = random_browser(headless=headless, otp=True)
        for user in _users:
            t1 = time.time()
            browser.get(f"{user['link']}")
            succeed = dad(browser, user)
            if not succeed: continue
            users.replace_one({'_id': user['_id']}, user)
            if user['score'] > 10.8 and browser.__otp__:
                uq = phone(browser, user)
                if 'phoned' in uq and uq['phoned'] and uq['phone']:
                    users.replace_one({'_id': user['_id']}, user)
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        browser.quit()
        for p in used_profiles:
            if p.value == browser.__profile__.split('/')[-1].split('_')[-1].encode():
                p.value = b'**********'
                break
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), 0))

def pphone(headless=False, rpm=10, debug=False, **kwargs):  # rpm
    while True:
        users, t0 = get_users(), time.time()
        # _users = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': True, 'phoned': False}}, {'$sample': {'size': 1}}]))
        _users = list(users.find({'source': 'divar', 'detailed': True, 'phoned': False}).sort([('score', -1)]).limit(max(5, rpm // 10)))  # 5 * 12 = 60
        browser = random_browser(headless=headless, otp=True)
        if not browser.__otp__: print(f"{cs.OKBLUE}{cs.BOLD}Phone:{cs.ENDC} no otp browser"); time.sleep(60); continue
        for user in _users:
            t1 = time.time()
            if user['score'] < 10.8: break
            browser.get(f"{user['link']}")
            uq = phone(browser, user)
            if 'phoned' in uq and uq['phoned'] and uq['phone']:
                users.replace_one({'_id': user['_id']}, user)
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        browser.quit()
        for p in used_profiles:
            if p.value == browser.__profile__.split('/')[-1].split('_')[-1].encode():
                p.value = b'**********'
                break
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), 0))

def pup(rpm=10, debug=False, **kwargs):
    while True:
        users, t0 = get_users(), time.time()
        # _users = list(users.find({'source': 'divar', 'detailed': True, 'imaged': True, 'phoned': True, 'synced': False}).limit(10))
        _users = list(users.find({'detailed': True, '_images': {'$exists': True}, 'phoned': True, 'phone': {'$ne': ''}, 'imaged': True, 'synced': False}).limit(max(5, rpm // 10)))
        print('**', len(_users))
        for user in _users:
            user['_id'], t1 = str(user['_id']), time.time()
            if 'pan_date' in user: user['pan_date'] = str(user['pan_date'])
            if 'detailed_date' in user: user['detailed_date'] = str(user['detailed_date'])
            if 'phoned_date' in user: user['phoned_date'] = str(user['phoned_date'])
            if 'imaged_date' in user: user['imaged_date'] = str(user['imaged_date'])
            if 'synced_date' in user: user['synced_date'] = str(user['synced_date'])
            r = requests.put('http://localhost:5000/users', json.dumps(user))
            if r.status_code == 201:
                for im in user['images']:
                    t2 = time.time()
                    with open(f'/home/poorya/Pictures/estate/{im}', 'rb') as f:
                        while True:
                            rim = requests.post(f'http://localhost:5000/static/{im}', files={'file': f})
                            if rim.status_code == 409 or rim.status_code == 201: break
                            time.sleep(max(1 / len(user['images']) / rpm * 60 - (time.time() - t2), 0))
                user['synced'] = True
                r = users.update_one({'_id': ObjectId(user['_id'])}, {'$set': {'synced': True, 'synced_date': datetime.now()}})
                print(f"{cs.OKCYAN}{cs.BOLD}Up:{cs.ENDC} {cs.OKCYAN}{user['link'].split('/')[-1]}{cs.ENDC} {user['title']}")
                if debug: debug = 2; break
            else: continue
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        if debug == 2: break
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), 0))

"""TODO boro to fs image hara bibin age file image khali bud ya kam bud sai kon dobare download koni age synced dobare ersal koni"""

if __name__ == '__main__':
    routines = {'upload': pup, 'image': pdim, 'phone': pphone, 'detail': pdad, 'pan': ppan}
    if len(sys.argv) > 1 and sys.argv[1] in routines:
        debug = True if ('-d' in sys.argv or '--debug' in sys.argv) else False
        headless = True if ('-h' in sys.argv or '--headless' in sys.argv) else False
        if '-r' in sys.argv or '--rpm' in sys.argv:
            routines[sys.argv[1]](headless=headless, debug=debug, rpm=int(sys.argv[(sys.argv.index('-r') + 1) if '-r' in sys.argv else (sys.argv.index('--rpm') + 1)]))
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
            # phone(browser, u)
            print(yaml.dump(u, default_flow_style=False, allow_unicode=True))
            dim(u, asset_dir='static/properties')
            browser.quit()