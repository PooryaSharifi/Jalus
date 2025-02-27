import subprocess, requests, time, re, random, sys, pymongo, os.path, warnings, json
from datetime import datetime, timedelta
from subprocess import DEVNULL
warnings.filterwarnings('ignore')

def sync_single_tty(forced=False):
    dmesg = subprocess.check_output(f'dmesg | grep ttyUSB', shell=True).decode().split('\n')
    dmesg = [msg for msg in dmesg if msg and 'now attached to' in msg][-1]
    tty = dmesg.split()[-1]; changed = False
    with open('/root/.gammurc', 'r') as wvdial_f:
        wvdial_f = wvdial_f.read()
        wvdial_tty = re.findall(r'ttyUSB.+', wvdial_f)[0]
        if tty != wvdial_tty:
            changed = True
            wvdial_f = wvdial_f.replace(wvdial_tty, tty)
            with open('/root/.gammurc', 'w') as wvdial_w: wvdial_w.write(wvdial_f)
    with open('/etc/wvdial.conf', 'r') as wvdial_f:
        wvdial_f = wvdial_f.read()
        wvdial_tty = re.findall(r'ttyUSB.+', wvdial_f)[0]
        if tty != wvdial_tty:
            changed = True
            wvdial_f = wvdial_f.replace(wvdial_tty, tty)
            with open('/etc/wvdial.conf', 'w') as wvdial_w: wvdial_w.write(wvdial_f)
    subprocess.call('wvdial', shell=True, stdout=DEVNULL, stderr=DEVNULL)
    # if changed or forced: subprocess.call('wvdial', shell=True)
def last_sms():
    sms_list = ''
    for _try in range(5):
        sync_single_tty() if _try < 4 else sync_single_tty(forced=True)
        try: sms_list = subprocess.check_output(f'gammu getallsms', shell=True).decode(); break
        except: time.sleep(.5)
    if not sms_list: sms_list = subprocess.check_output(f'gammu getallsms', shell=True).decode()
    sms_list = re.split(r'Location.*, folder.*\n.*SMS message.*\n.*SMSC number.*:', sms_list); sms_list = [sms.strip() for sms in sms_list if sms.strip()]
    for sms in sms_list:
        sms = sms.split('\n')
        if len(sms) < 5: continue
        sms[0] = sms[3].split(':')[1].strip().lower()
        sms[0] = sms[0][1 if sms[0][0] == '"' else 0:]; sms[0] = sms[0][:-1] if sms[0][-1] == '"' else sms[0]; sms[0] = sms[0].strip(); phone = sms[0][3:] if sms[0][:3] == '+98' else sms[0][1:] if sms[0][0] == '0' else sms[0]
        timestamp = ' '.join(':'.join(sms[1].split(':')[1:]).strip().split('AM')[0].split('PM')[0].strip().split(' ')[1:])
        body = ' '.join(sms[6:]).strip()
        print(timestamp, body)
def pay():
    while True:
        sms_list = ''; all_done = True
        for _ in range(3):
            sync_single_tty()
            try: sms_list = subprocess.check_output(f'gammu getallsms', shell=True).decode(); break
            except: time.sleep(.5)
        sms_list = re.split(r'Location.*, folder.*\n.*SMS message.*\n.*SMSC number.*:', sms_list); sms_list = [sms.strip() for sms in sms_list if sms.strip()]
        for sms in sms_list:
            sms = sms.split('\n')
            if len(sms) < 5: continue
            sms[0] = sms[3].split(':')[1].strip().lower()
            sms[0] = sms[0][1 if sms[0][0] == '"' else 0:]; sms[0] = sms[0][:-1] if sms[0][-1] == '"' else sms[0]; sms[0] = sms[0].strip(); phone = sms[0][3:] if sms[0][:3] == '+98' else sms[0][1:] if sms[0][0] == '0' else sms[0]
            timestamp = ' '.join(':'.join(sms[1].split(':')[1:]).strip().split('AM')[0].split('PM')[0].strip().split(' ')[1:])
            body = ' '.join(sms[6:]).strip()
            numbers = body.replace(',', '').replace('،', '')
            numbers = re.findall(r'\+\d+', numbers)
            if numbers:
                r = requests.get(f"https://jalus.ir/pay/{'/'.join(str(datetime.now()).split('.')[0].split(' '))}/{phone}/9300345496/{numbers[0][1:]}")
                if r.status_code != 200 or not r.json()['OK']: all_done = False
        if all_done: sync_single_tty(); subprocess.Popen('gammu deleteallsms 3', shell=True, stdout=DEVNULL, stderr=DEVNULL)
        time.sleep(10)
def otp():
    while True:
        otp_list = requests.get(f'https://jalus.ir/otp').text.strip('\n').split('\n'); otp_list = [op.strip().split(',') for op in otp_list if ',' in op]
        for phone, otp in otp_list:
            for _ in range(7):
                sync_single_tty()
                try: subprocess.call(f'''BODY='کد تایید جالوس:\nCode: {otp}\nبرای دیگران نفرستید.';gammu --sendsms TEXT 98{phone} -unicode -text "$BODY"''', shell=True, stdout=DEVNULL, stderr=DEVNULL); break
                except: time.sleep(.5)
def push_ads():  # http://10.42.0.11:5000, https://jalus.ir
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']; collection = 0
    collections = [('users', {'category': 'rent-temporary', 'detailed': True, 'phoned': True, 'phone': {'$ne': ''}, 'imaged': True, 'served': {'$ne': True}}), ('ads', {'category': {'$ne': 'rent-temporary'}, 'detailed': True, 'phoned': True, 'phone': {'$ne': ''}, 'imaged': True, 'served': {'$ne': True}})]
    while True:
        new_ads = list(users.find(collections[collection][1]).limit(4 if collection == 0 else 12))
        if not new_ads: time.sleep(60); continue
        for i_ad, ad in enumerate(new_ads):
            ad['images'] = ad['images'][:(8 if collection == 0 else 3)]
            for i_im, im in enumerate(ad['images']):
                try:
                    files = {'file': open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{ad["category"]}/{ad["id"]}/{i_im}.webp', 'rb')}
                    r = requests.post(f'http://10.42.0.11:5000/static/properties/{ad["category"]}/{ad["id"]}/{i_im}.webp', files=files, verify=False)
                    if r.status_code != 200 or not r.json()['OK']: raise
                    print(im)
                except FileNotFoundError: ad['images'][i_im] = 'not found'; continue
                except Exception: ad['images'][i_im] = 'network'; break
            if ad['images'][i_im] != 'network':
                ad['images'] = [im for im in ad['images'] if im != 'not found']
                ad['served'] = True; ad['served_date'] = str(datetime.now()).split('.')[0]; ad['notes'] = []
                del ad['_id']; ad['pan_date'] = str(ad['pan_date']).split('.')[0]; ad['detailed_date'] = str(ad['detailed_date']).split('.')[0]
                ad['phoned_date'] = str(ad['phoned_date']).split('.')[0]; ad['imaged_date'] = str(ad['imaged_date']).split('.')[0]
                if 'swap' in ad and ad['swap'] and 'date' in ad['swap']: ad['swap']['date'] = str(ad['swap']['date']).split('.')[0]
                print(ad)
                r = requests.post(f'http://10.42.0.11:5000/{collections[collection][0]}/{ad['id']}/~', data=json.dumps(ad), verify=False)
                if r.status_code == 200: r = users.update_one({'id': ad['id']}, {'$set': {'images': ad['images'], 'served': True, 'served_date': datetime.now()}}); r = r.matched_count
        collection = 1 - collection if len(new_ads) == 0 or len(new_ads) % 4 != 0 else 0 if random.random() < .3 else 1
        time.sleep(10 if len(new_ads) % 4 == 0 else 60)
def auto_del():
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']
    users.delete_many({'pan_date': {'$lte': datetime.now() - timedelta(days=28)}, 'phoned': False})

if __name__ == '__main__': globals()[sys.argv[1]]()