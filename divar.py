import glob, random, subprocess, os.path, time, glob, re, pymongo, json, traceback, math, sys
from datetime import datetime, timedelta, timezone
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import WebDriverException
from copy import deepcopy
from ad import categories, consultants, dim
from static import wild_origins
# open profiles ad block
# TODO age har 5 ta poshte ham natunest phone dar are file ban too folder profile ijad mikone, age hadaghal yekisho phone dar ovord age file ban bud baresh midare

cm = {
    'browse-post-list': ['post-list-eb562', 'browse-post-list', 'wf3858', 'browse-post-list-_-f3858'], 
    'post-card-item': ['widget-col-d2306', 'post-list__widget-col-c1444', 'post-card-item', 'waf972', 'post-card-item-_-af972'],
    'kt-post-card__title': ['unsafe-kt-post-card__title', 'kt-post-card__title'],
    'kt-post-card__bottom-description': ['unsafe-kt-post-card__description', 'kt-post-card__description', 'kt-post-card__bottom-description'],
}

# profile_lock = multiprocessing.Lock()
def browser(phone=None, headless=False, imaged=False, banned=None, agent='ubuntu', loading_strategy='normal'):
    # profile_lock.acquire()
    profiles = glob.glob(f'/home/purish/snap/firefox/common/.mozilla/firefox/*.Divar_{phone if phone else "*"}')
    profiles = [p for p in profiles if banned == None or (banned == True and os.path.exists(os.path.join(p, 'ban'))) or (banned == False and not os.path.exists(os.path.join(p, 'ban')))]
    profiles = [p for p in profiles if not phone or p.split('/')[-1].split('_')[-1] == phone]; random.shuffle(profiles)
    ps = subprocess.run(['ps', '-fC', 'firefox'], capture_output=True, text=True, check=False).stdout.strip().split('\n')[1:]; ps = [p for p in ps if profiles[0].split('/')[-1].split('.')[-1] in p]
    if ps: subprocess.call(f'kill {ps[0].split()[1]}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)  #MAYBE add -9
    with open(f'{profiles[0]}/prefs.js', 'r') as prefs:
        prefs = list(prefs.readlines())
        permission = [(ipref, pref) for ipref, pref in enumerate(prefs) if 'permissions.default.image' in pref]
        if not permission or f'{1 if imaged else 2}' not in permission[0][1]:
            if permission: prefs = [pref for ipref, pref in enumerate(prefs) if ipref != permission[0]]
            prefs.append(f'user_pref("permissions.default.image", {1 if imaged else 2});\n')
            with open(f'{profiles[0]}/prefs.js', 'w') as w_prefs:
                w_prefs.write(''.join(prefs))
    o = FirefoxOptions()
    if loading_strategy != 'normal': o.page_load_strategy = loading_strategy
    if headless: o.headless = True; o.add_argument('-headless');  # o.add_argument("--headless=new")
    [o.add_argument(arg) for arg in ['--profile', profiles[0], '--user-data-dir', 'selenium']]
    if agent == 'android': o.set_preference("general.useragent.override", "Mozilla/5.0 (Android 16; Mobile; rv:141.0) Gecko/141.0 Firefox/141.0")
    if agent == 'ubuntu': o.set_preference("general.useragent.override", "Mozilla/5.0 (X11; Linux i686; rv:142.0) Gecko/20100101 Firefox/142.0")
    # profile_lock.release()
    br = Firefox(options=o, service=FirefoxService(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'geckodriver')))
    br.__profile__= profiles[0]
    return br

class cs: HEADER, OKBLUE, OKCYAN, OKGREEN, WARNING, FAIL, ENDC, BOLD, UNDERLINE, CGREY, CRED, CGREEN, CYELLOW, CBLUE, CVIOLET, CWHITE = '\033[95m', '\033[94m', \
    '\033[96m', '\033[92m', '\033[93m', '\033[91m', '\033[0m', '\033[1m', '\033[4m', '\33[90m', '\33[31m', '\33[32m', '\33[33m', '\33[34m', '\33[35m', '\33[37m'
def get_users(stat=0):
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    users.create_index([('location', '2dsphere')])
    users.create_index([('source', 1), ('category', 1), ('date', 1)])
    users.create_index([('source', 1), ('detailed', 1), ('imaged', 1), ('phoned', 1)])
    users.create_index([('link', 1)], unique=True); users.create_index([('id', 1)], unique=True)
    # users.delete_many({})
    if stat == 1: print(f"{cs.FAIL}{cs.BOLD}Detail, Phone: {users.count_documents({'detailed': True})}, {users.count_documents({'phoned': True})}{cs.ENDC}")
    if stat == 2: print(f"{cs.FAIL}{cs.BOLD}Imaged, Serve: {users.count_documents({'imaged': True})}, {users.count_documents({'served': True})}{cs.ENDC}")
    return users

def potp(phone, headless=False, rpm=0, debug=False):
    br = browser(phone, imaged=True, loading_strategy='none')
    user = get_users(stat=1).find().sort([('pan_date', -1), ('pan_cnt', 1)]).limit(1)
    if not user: return
    br.get(user[0]['link'])
    WebDriverWait(br, 10).until(EC.presence_of_element_located((By.ID, 'app')))
    try: phone_btn = WebDriverWait(br, 1).until(EC.presence_of_element_located((By.XPATH, ".//button[contains(concat(' ', @class, ' '), ' post-actions__get-contact ')]"))); time.sleep(.5); phone_btn.click()
    except: phone_btn = WebDriverWait(br, 1).until(EC.presence_of_element_located((By.XPATH, ".//button[contains(concat(' ', @class, ' '), ' post-actions__non-experimental ')]"))); time.sleep(.5); phone_btn.click()
    try:
        WebDriverWait(br, 3).until(EC.presence_of_element_located((By.XPATH, "//p[text()[contains(., 'شمارهٔ موبایل')]]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        phone = WebDriverWait(br, 3).until(EC.presence_of_element_located((By.XPATH, "//a[contains(@href,'tel:')]")))  # class="kt-base-row__title kt-unexpandable-row__title"
        time.sleep(1); br.quit(); os.remove(f'{br.__profile__}/ban'); return
    except: pass
    try: WebDriverWait(br, 3).until(EC.presence_of_element_located((By.XPATH, "//button[.//*[text()[contains(., 'با قوانین دیوار موافقم')]]]"))).click()
    except: pass
    mobile = WebDriverWait(br, 30).until(EC.presence_of_element_located((By.XPATH, '//input[@name="mobile"]')))
    mobile.send_keys(f"0{phone}")
    time.sleep(1.8)
    try: WebDriverWait(br, 10).until(EC.presence_of_element_located((By.XPATH, "//button[.//*[text()[contains(., 'تأیید')]]]"))).click()
    except: pass
    sms = input()
    code = WebDriverWait(br, 10).until(EC.presence_of_element_located((By.XPATH, '//input[@name="code"]')))
    code.send_keys(sms)
    WebDriverWait(br, 150).until(EC.invisibility_of_element_located((By.XPATH, "//div[text()[contains(., 'ورود به حساب کاربری')]]")))  # class="kt-modal__title"
    try: os.remove(f'{br.__profile__}/ban')
    except: pass

def pan(browser, city, photo=True, log=True, rpm=10, cat=None, q=''):  # todo pan doesnt need loop and rpm
    users = get_users()
    if not cat:
        cats = [(cat, w, list(users.find({'source': 'divar', 'category': cat}).sort([('pan_date', -1), ('pan_cnt', 1)]).limit(3))[::-1]) for cat, w in deepcopy(categories)]
        cats = [(cat, w * (min((datetime.now() - lasts[-1]['pan_date']).total_seconds() / 60 / 60, 3) if lasts else 5), set([ad['link'] for ad in lasts])) for cat, w, lasts in cats]  # ln 17 / ln 2]
        w_cat_s = sum([w for _, w, _ in cats])
        cat = random.choices(cats, [w / w_cat_s for _, w, _ in cats])[0][0]
    # try:
    if q: browser.get(f"https://divar.ir/s/{city}/{cat}{'?has-photo=true' if photo else ''}&q={q}&business-type=personal")
    else: browser.get(f"https://divar.ir/s/{city}/{cat}{'?has-photo=true' if photo else ''}&business-type=personal")
    # except: return 0
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
            loc = list(reversed(wild_origins[city][0]['loc'])); loc[0] += .024 * (random.random() - .5); loc[1] += .016 * (random.random() - .5)
            print(f"{cs.WARNING}{cs.BOLD}{pan_cnt}:{cs.ENDC} {cs.OKCYAN}{refs[0].split('/')[-1]}{cs.ENDC} {title[:15]} {cs.CGREY}{subtitles[0][:9]}{cs.ENDC}")
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
        new_flag = False
        for ad in ads:  # age ye jadid didi vel nakon
            try: users.insert_one(ad); new_flag = True
            except: continue
        if not new_flag: print(f"{cs.WARNING}{cs.BOLD}Pan: END{cs.ENDC}"); break
        # try:  # age ye tekrari didi bia birun
        #     for ad in ads:
        #         users.insert_one(ad)
        # except pymongo.errors.DuplicateKeyError: print(f"{cs.WARNING}{cs.BOLD}Pan: END{cs.ENDC}"); break
        if ads_length != len(ads): print(f"{cs.WARNING}{cs.BOLD}Pan: END{cs.ENDC}"); break
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight)"); time.sleep(10)
        load_more_class = 'post-list__load-more-btn-be092'; load_more = browser.find_elements(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {load_more_class} ')]")
        if load_more: load_more[0].click(); time.sleep(10)
        halt = False
        for attr in cm["browse-post-list"]:
            try: post_list = browser.find_elements(by=By.CLASS_NAME, value=f'{attr}')[0]; halt = True; break
            except: pass
        if not halt: return pan_cnt
        for attr in cm["post-card-item"]:
            try: last_post = post_list.find_elements(by=By.XPATH, value=f".//div[contains(concat(' ', @class, ' '), ' {attr} ')]")[-1]; halt = True; break
            except: pass
        if not halt: return pan_cnt
        for attr in cm["kt-post-card__title"]:
            try: last_title = last_post.find_elements(by=By.XPATH, value=f".//*[contains(concat(' ', @class, ' '), ' {attr} ')]")[0].get_attribute("innerHTML").strip().replace('\u200c', ' ').replace('ئ', 'ی').replace('آ', 'ا'); halt = True; break
            except: pass
        if not halt: return pan_cnt
        try: WebDriverWait(browser, 30).until(lambda browser: last_title != ads[-1]['title'] )
        except: break
        time.sleep(max(min(pan_cnt, 10) / rpm * 60 - (time.time() - t0), 0))
    return pan_cnt
    
# age halate lesser bashe -> center of polygon mishe khode amlaki pas
def detail(browser, user):  # TODO choose consultant for detail after location <- voronoi, sort average distance of poligon points or center of polygon for lesser cpu
    user['detailed'], user['detailed_date'] = True, datetime.now()
    # try: _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'این راه به جایی نمی‌رسد!')]]"); return
    try: _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'این صفحه حذف شده یا وجود ندارد.')]]"); return
    except: 
        try: _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'این آگهی حذف شده است.')]]"); return
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
    user['precise_location'] = False
    try:
        # WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, f".//img[contains(concat(' ', @src, ' '), 'mapimage')]"))).click()
        WebDriverWait(browser, 15).until(EC.presence_of_element_located((By.XPATH, f".//img[contains(concat(' ', @alt, ' '), 'موقعیت مکانی')]"))).click()
        # lat_lng = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' map-cm ')]//a[contains(concat(' ', @class, ' '), ' map-cm__button ') and @href]")
        lat_lng = WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, "//*[contains(concat(' ', @class, ' '), ' kt-new-modal ')]//a[contains(concat(' ', @class, ' '), ' kt-button--primary ') and @href]"))).get_attribute('href')
        # lat, lng = urlparse(lat_lng).query.split('&')
        lat, lng = lat_lng[4:].split(',')
        # lat, lng = float(lat.split('=')[1]), float(lng.split('=')[1])
        lat, lng = float(lat), float(lng)
        user['location'] = {'type': 'Point', 'coordinates': [lng, lat]}
        user['precise_location'] = True
    except: pass  # print(traceback.format_exc())
        # if 'location' not in user or not user['location']:
        #     for loc in user['subtitle'].split('،'):
        #         if (loc := loc.strip()) in wild_origins:
        #             # user['location'] = {'type': 'Point', 'coordinates': list(reversed(.get()[0]['location']))}
        #             break
    d_consultants = [(abs(c['location']['coordinates'][0] - user['location']['coordinates'][0]) ** 1.3 + abs(c['location']['coordinates'][1] - user['location']['coordinates'][1]) ** 1.3, c) for c in consultants]
    d_consultants = list(sorted(d_consultants, key=lambda c: c[0]))
    if d_consultants[1][0] / d_consultants[0][0] > 1.3: user['consultant'] = d_consultants[0][1]
    else: user['consultant'] = d_consultants[0][1] if random.random() < .6 else d_consultants[1][1]
    user['score'] = math.log(len(user['_images']) + 1) + math.log(len(user['description']) + 1) + math.log(len(user['title']) + 1) + math.log(len(user['options']) + 1) + math.log(len(user['features']) + 1) + math.log(len(user['rows']) + 1)
    p_values = [*user['options'].values(), *user['rows'].values(), *user['subtitles']]
    fa_nums = {'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '٥': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',}
    p_values = [''.join([fa_nums.get(c, c) for c in v]) for v in p_values if 'تومان' in v]
    p_values = [int(re.sub('[^0-9]','', v)) for v in p_values if re.sub('[^0-9]','', v)]
    user['price'] = max(p_values) if p_values else -1
    area_values = []
    if 'options' in user: area_values.extend([v for k, v in user['options'].items() if 'متراژ' in k])
    if 'rows' in user: area_values.extend([v for k, v in user['rows'].items() if 'متراژ' in k])
    area_values = [''.join([fa_nums.get(c, c) for c in v]) for v in area_values]
    area_values = [int(re.sub('[^0-9]','', v)) for v in area_values if re.sub('[^0-9]','', v)]
    user['area'] = max(area_values) if area_values else -1
    user['floor_area'] = min(area_values) if area_values else -1
    age_values = []
    if 'options' in user: age_values.extend([v for k, v in user['options'].items() if 'ساخت' in k])
    if 'rows' in user: age_values.extend([v for k, v in user['rows'].items() if 'ساخت' in k])
    age_values = [''.join([fa_nums.get(c, c) for c in v]) for v in age_values]
    age_values = [int(re.sub('[^0-9]','', v)) for v in age_values if re.sub('[^0-9]','', v)]
    user['age'] = max(age_values) if age_values else -1
    rooms_values = []
    if 'options' in user: rooms_values.extend([v for k, v in user['options'].items() if 'اتاق' in k])
    if 'rows' in user: rooms_values.extend([v for k, v in user['rows'].items() if 'اتاق' in k])
    rooms_values = [''.join([fa_nums.get(c, c) for c in v]) for v in rooms_values]
    rooms_values = [int(re.sub('[^0-9]','', v)) for v in rooms_values if re.sub('[^0-9]','', v)]
    user['rooms'] = max(rooms_values) if rooms_values else -1
    user['width'] = -1
    try: kt_chip = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' post-page__section--padded ')]//button[contains(concat(' ', @class, ' '), ' kt-chip')]//span").get_attribute("innerHTML"); kt_chip_succeeded = True
    except: kt_chip = user['title'].strip() + ' ' + user['description'].strip(); kt_chip = [w for w in kt_chip.split() if w]; kt_chip_succeeded = False
    if 'آپارتمان' in kt_chip and 'residential' in user['category']: user['category'] = user['category'].replace('residential', 'apartment'); kt_chip = kt_chip if kt_chip_succeeded else 'آپارتمان'
    elif ('منزل' in kt_chip or 'خانه' in kt_chip or 'ویلا' in kt_chip) and 'residential' in user['category']: user['category'] = user['category'].replace('residential', 'villa'); kt_chip = kt_chip if kt_chip_succeeded else 'منزل و خانه و ویلا'
    elif 'کلنگی' in kt_chip and 'residential' in user['category']: user['category'] = user['category'].replace('residential', 'old-house'); kt_chip = kt_chip if kt_chip_succeeded else 'کلنگی'
    if ('زمین' in kt_chip or 'باغ' in kt_chip or 'کشاورزی' in kt_chip) and 'commercial-property' in user['category']: user['category'] = user['category'].replace('commercial-property', 'industrial-agricultural-property'); kt_chip = kt_chip if kt_chip_succeeded else 'کشاورزی و باغ و زمین'
    elif ('مطب' in kt_chip or 'دفتر' in kt_chip or 'اداری' in kt_chip) and 'commercial-property' in user['category']: user['category'] = user['category'].replace('commercial-property', 'office'); kt_chip = kt_chip if kt_chip_succeeded else 'اداری و دفتر و مطب'
    elif ('تجاری' in kt_chip or 'مغازه' in kt_chip) and 'commercial-property' in user['category']: user['category'] = user['category'].replace('commercial-property', 'store'); kt_chip = kt_chip if kt_chip_succeeded else 'مغازه و تجاری'
    
    title_description = user['title'].strip() + ' ' + user['description'].strip(); title_description = [w for w in title_description.split() if w]
    if 'معاوضه' in title_description:
        swap_index = title_description.index('معاوضه')
        user['swap'] = {'swapArea': 0, 'swapCapacity': 0, 'swapBudget': 0, 'swapLiquidity': 0, 'swapDebt': 0, 'swapQ': '', 'swapLocation': {'type': 'Point', 'coordinates': [0, 0]}, 'swapCategory': [kt_chip, user['category']], 'date': datetime.now()}
        if swap_index + 2 < len(title_description) and title_description[swap_index + 1] == 'با': user['swap']['q'] = title_description[swap_index + 2]
    print(f"{cs.OKGREEN}{cs.BOLD}{'@' if user['precise_location'] else '?'}{cs.ENDC}{cs.OKCYAN}{user['link'].split('/')[-1]}{cs.ENDC}{user['title'][:15]}{cs.CWHITE if user['score'] > 14.8 else cs.CGREY}{user['score']:.1f}{cs.ENDC}{cs.OKGREEN}{user['location']['coordinates'][1]:.2f},{user['location']['coordinates'][0]:.2f}{cs.ENDC}")
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
        print(f"{cs.OKBLUE}{cs.BOLD}Phone:{cs.ENDC}{cs.OKCYAN}{user['phone']}{cs.ENDC} {user['title'][:15]} {cs.CGREY}{user['score']:.1f}{cs.ENDC}")
        # with open('../divar_phone.yml', 'a', encoding='utf-8') as f: f.write(yaml.dump(user, default_flow_style=False, indent=2, allow_unicode=True))
        return {'phone': user['phone'], 'phoned': user['phoned'], 'phoned_date': user['phoned_date']}
    except:
        try:
            _404 = browser.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' kt-modal__title ') and text()[contains(., 'محدودیت نمایش اطلاعات تماس')]]")
            with open(f'{browser.__profile__}/ban', 'w') as b: pass
        except: pass
        return {}

def ppan(headless=False, rpm=45, debug=False, **kwargs):
    while True:
        if len([arg for arg in sys.argv if len(arg) and arg[0] != '-' and not arg.isnumeric()]) > 3:
            br, t0 = browser(headless=headless, phone=sys.argv[-2] + '-' + sys.argv[-1], loading_strategy='normal'), time.time()
            cat = sys.argv[-1]
            k = pan(br, city=sys.argv[-2], photo=True, log=True, rpm=rpm, cat=cat)
        else:
            with open(os.path.join(os.path.join(os.path.dirname(__file__), 'static'), 'divar.csv'), encoding='utf-8') as csv:
                csv = csv.readlines(); csv = [[v.strip() for v in l.strip().split(',')] for l in csv]; csv = [l for l in csv if len(l) == 4]
                city, cat, _, q = random.choices(csv, [float(l[2]) for l in csv], k=1)[0]
            print(city, cat, q)
            br, t0 = browser(headless=headless, phone=city + '-' + cat), time.time()
            k = pan(br, city=city, photo=True, log=True, rpm=rpm, cat=cat, q=q)
        br.quit()
        time.sleep(max(k / rpm * 60 - (time.time() - t0), 45 if k else 90))

def pdetail(headless=False, rpm=10, debug=False, **kwargs):
    while True:
        users, t0 = get_users(stat=1), time.time()
        _users = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': False}}, {'$sample': {'size': max(5, rpm // 4)}}]))
        br = browser(headless=headless, agent='android', banned=False, loading_strategy='eager')
        for user in _users:
            t1 = time.time()
            try: 
                br.get(f"{user['link']}"); WebDriverWait(br, 10).until(EC.presence_of_element_located((By.ID, 'app')))
                br.execute_script("window.scrollTo(0, document.body.scrollHeight)")
                WebDriverWait(br, 3).until(EC.presence_of_element_located((By.XPATH, ".//*[contains(concat(' ', @class, ' '), ' kt-description-row__text ')]")))
            except: print(traceback.format_exc())
            succeed = detail(br, user)
            if not succeed: continue
            users.replace_one({'_id': user['_id']}, user)
            # if user['score'] > 12.8 and br.__otp__:
            #     uq = dphone(br, user)
            #     if 'phoned' in uq and uq['phoned'] and uq['phone']:
            #         users.replace_one({'_id': user['_id']}, user)
            #     else:
            #         try: 
            #             _404 = br.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'شماره مخفی شده است')]]")
            #             user['phoned'] = True; user['phone'] = '_'; user['phoned_date'] = datetime.now()
            #             users.replace_one({'_id': user['_id']}, user)
            #         except: pass
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        br.quit()
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), (max(5, rpm // 4) - len(_users)) * 7))

def pphone(headless=False, rpm=10, debug=False, phone=None, **kwargs):  # rpm
    while True:
        users, t0 = get_users(stat=2), time.time()
        _users = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': True, 'phoned': False, 'score': {'$gt': 12.8}, 'pan_date': {'$gt': datetime.now() - timedelta(days=28)}}}, {'$sample': {'size': max(1, min(rpm // 10, 1))}}]))
        br = browser(headless=headless, banned=False, loading_strategy='eager')
        for user in _users:
            t1 = time.time()
            if user['score'] < 12.8: break
            try: br.get(f"{user['link']}"); WebDriverWait(br, 10).until(EC.presence_of_element_located((By.ID, 'app')))
            except: _users = []; break
            uq = dphone(br, user)
            if 'phoned' in uq and uq['phoned'] and uq['phone']:
                users.replace_one({'_id': user['_id']}, user)
            else:
                try: 
                    _404 = br.find_element(by=By.XPATH, value="//div[contains(concat(' ', @class, ' '), ' title ') and text()[contains(., 'شماره مخفی شده است')]]")
                    user['phoned'] = True; user['phone'] = '_'; user['phoned_date'] = datetime.now()
                    users.replace_one({'_id': user['_id']}, user)
                except: pass
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        br.quit()
        time.sleep(max(len(_users) / rpm * 60 - (time.time() - t0), (1 - len(_users)) * 60))

def pimage(rpm=10, debug=False, **kwargs):
    while True:
        users, t0 = get_users(), time.time()
        # _users = list(users.aggregate([{'$match': {'source': 'divar', 'imaged': {'$ne': True}}}, {'$sample': {'size': max(5, rpm // 10)}}]))
        ads = list(users.aggregate([{'$match': {'source': 'divar', 'detailed': True, '_images': {'$exists': True}, 'phoned': True, 'phone': {'$exists': True, '$ne': ''}, 'imaged': {'$ne': True}}}, {'$sample': {'size': max(5, rpm // 10)}}]))
        for ad in ads:
            t1 = time.time(); r = dim(ad)
            if r['imaged']: users.update_one({'_id': ad['_id']}, {'$set': r})
            time.sleep(max(1 / rpm * 60 - (time.time() - t1), 0))
        time.sleep(max(max(5, rpm // 10) / rpm * 60 - (time.time() - t0), (max(5, rpm // 10) - len(ads)) * 7))

if __name__ == '__main__':
    debug = True if ('-d' in sys.argv or '--debug' in sys.argv) else False
    headless = True if ('-h' in sys.argv or '--headless' in sys.argv) else False
    phone = [p for p in sys.argv if len(p) == 10 and p.isnumeric()]; phone = phone[0] if phone else None
    if phone: phone = re.sub(r'^09', '9', re.sub(r'^\+989', '9', str(phone)))
    if '-r' in sys.argv or '--rpm' in sys.argv:
        globals()['p' + sys.argv[1]](headless=headless, debug=debug, phone=phone, rpm=float(sys.argv[(sys.argv.index('-r') + 1) if '-r' in sys.argv else (sys.argv.index('--rpm') + 1)]))
    else: globals()['p' + sys.argv[1]](headless=headless, debug=debug, phone=phone)