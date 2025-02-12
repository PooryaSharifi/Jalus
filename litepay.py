import subprocess, requests, time, re, random, sys, pymongo, os.path, warnings, json
from datetime import datetime
from subprocess import DEVNULL
warnings.filterwarnings('ignore')

def sync_single_tty():
    dmesg = subprocess.check_output(f'dmesg | grep ttyUSB', shell=True).decode().split('\n')
    dmesg = [msg for msg in dmesg if msg and 'now attached to' in msg][-1]
    tty = dmesg.split()[-1]
    with open('/root/.gammurc', 'r') as wvdial_f:
        wvdial_f = wvdial_f.read()
        wvdial_tty = re.findall(r'ttyUSB.+', wvdial_f)[0]
        if tty != wvdial_tty:
            wvdial_f = wvdial_f.replace(wvdial_tty, tty)
            with open('/root/.gammurc', 'w') as wvdial_w: wvdial_w.write(wvdial_f)
        else: return
    with open('/etc/wvdial.conf', 'r') as wvdial_f:
        wvdial_f = wvdial_f.read()
        wvdial_tty = re.findall(r'ttyUSB.+', wvdial_f)[0]
        if tty != wvdial_tty:
            wvdial_f = wvdial_f.replace(wvdial_tty, tty)
            with open('/etc/wvdial.conf', 'w') as wvdial_w: wvdial_w.write(wvdial_f)
    subprocess.Popen('wvdial', shell=True, stdout=DEVNULL, stderr=DEVNULL)

def pay():
    while True:
        sync_single_tty(); all_done = True
        sms_list = subprocess.check_output(f'gammu getallsms', shell=True).decode()
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
        for phone, otp in otp_list: sync_single_tty(); subprocess.Popen(f'''BODY='کد تایید جالوس:\nCode: {otp}\nبرای دیگران نفرستید.';gammu --sendsms TEXT 98{phone} -unicode -text "$BODY"''', shell=True, stdout=DEVNULL, stderr=DEVNULL)

def push_ads():
    users = pymongo.MongoClient("mongodb://localhost:27017")[os.path.basename(os.path.dirname(__file__)).capitalize()]['users']; collection = 0
    collections = [('users', {'category': 'rent-temporary', 'detailed': True, 'phoned': True, 'imaged': True, 'served': {'$ne': True}}), ('divar', {'category': {'$ne': 'rent-temporary'}, 'detailed': True, 'phoned': True, 'imaged': True, 'served': {'$ne': True}})]
    while True:
        new_ads, continue_flag = users.find(collections[collection][1]).limit(4 if collection == 0 else 12), False
        if not new_ads: continue
        for i_ad, ad in enumerate(new_ads):
            for i_im, im in enumerate(ad['images'][:(8 if collection == 0 else 2)]):
                try:
                    files = {'file': open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{ad["category"]}/{ad["id"]}/{i_im}.webp', 'rb')}
                    r = requests.post(f'https://jalus.ir/static/properties/{ad["category"]}/{ad["id"]}/{i_im}.webp', files=files, verify=False)
                    if r.status_code != 200 or not r.json()['OK']: raise
                    print(im)
                except FileNotFoundError: print('oh oh'); break
                except Exception: print('ha ha'); continue_flag = True; break
            if continue_flag: break
        if continue_flag: continue
        for pr in new_ads: pr['location'] = list(reversed(pr['location']['coordinates'])); del pr['_id']; pr['pan_date'] = str(pr['pan_date']); pr['detailed_date'] = str(pr['detailed_date']); pr['phoned_date'] = str(pr['phoned_date']); pr['imaged_date'] = str(pr['imaged_date'])
        requests.post(f'https://jalus.ir/{collections[collection][0]}/+', data=json.dumps(new_ads), verify=False)  # too kodum berizim
        collection = 1 - collection if len(new_ads) == 0 or len(new_ads) % 4 != 0 else 0 if random() < .3 else 1
        time.sleep(240)

if __name__ == '__main__': globals()[sys.argv[1]]()