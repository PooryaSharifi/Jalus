import subprocess, requests, time, re, random, sys, pymongo
from datetime import datetime
from subprocess import DEVNULL

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

ads = pymongo.C()['']['']
def push_ads():  # 4
    while True:
        time.sleep(240)
        new_ads, continue_flag = ads.find({}), False
        if not new_ads: continue
        new_images = [(ad['images'][0] if ad['images'] else '') for ad in new_ads]
        for im_i, im in enumerate(new_images):
            if im_i:
                try: 
                    files = {'file': open(f'{os.path.dirname(os.path.abspath(__file__))}/static/properties/{im["id"]}/0.jpg', 'rb')}
                    r = requests.post(f'https://jalus.ir/static/properties/{im["id"]}/0.jpg', files=files)
                    if r.status != 2 or not r.json['OK']: continue_flag = True; raise
                except: break
        if continue_flag: continue
        requests.post(f'https://jalus.ir/', {new_ads})

if __name__ == '__main__': globals()[sys.argv[1]]()