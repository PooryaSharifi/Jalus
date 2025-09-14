import subprocess, random, time, sys, urllib.parse, re, pymongo, requests, os.path
from datetime import datetime, timedelta, timezone
from static import cs

messages = pymongo.MongoClient("mongodb://localhost:27017", tz_aware=True)[os.path.basename(os.path.dirname(__file__)).capitalize()]['sms']
messages.create_index([("s", pymongo.ASCENDING), ("r", pymongo.ASCENDING), ("date", pymongo.ASCENDING)], unique=True)
messages.create_index([("numbers", pymongo.ASCENDING), ("p", pymongo.ASCENDING)])
iccids = {
    '89982057262400759404': 9224657623,
}
def sms():
    modems = subprocess.check_output(f'mmcli --list-modems', shell=True).decode().strip().split('\n')
    modems = [m.strip().split(' ')[0].split('/')[-1] for m in modems]; random.shuffle(modems)
    if modems[0].lower() == 'no': return
    for m in modems:
        for retry in range(5):
            status = subprocess.check_output(f'mmcli -m {m} --output-keyvalue | grep "state"', shell=True).decode().strip()
            if 'disable' in status: 
                if retry == 4: return
                subprocess.call(f'mmcli -m {m} --enable', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
            else: break
        sms_list = subprocess.check_output(f'mmcli -m {m} --messaging-list-sms', shell=True).decode().strip().split('\n')
        sms_list = [sms.split('/')[-1].split() for sms in sms_list]; sms_list = [(sms[0], sms[1]) for sms in sms_list if 'received' in sms[1].lower() or 'receiving' in sms[1].lower()]
        if not sms_list: continue
        receiver = iccids[subprocess.check_output(f'mmcli --sim {m} --output-keyvalue | grep "iccid"', shell=True).decode().strip().split('iccid')[-1].lstrip()[1:].lstrip()]
        for sms_id, status in sms_list:
            # sms = subprocess.check_output(f'mmcli -m {m} --sms={sms_id} --output-keyvalue', shell=True).decode().strip().split('\n')
            sms = subprocess.check_output(f'mmcli -m {m} --sms={sms_id}', shell=True).decode().strip()
            sms_lines = [data.strip() for data in sms.split('\n')]
            # sms_datetime = [data[len('sms.properties.timestamp'):].lstrip()[1:].lstrip() for data in sms if data[:len('sms.properties.timestamp')] == 'sms.properties.timestamp']
            sms_datetime = [line.split('| timestamp:')[-1].strip() for line in sms_lines if '| timestamp:' in line]
            if not sms_datetime: subprocess.call(f'mmcli -m {m} --messaging-delete-sms={sms_id}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); continue
            sms_datetime = datetime.fromisoformat(sms_datetime[0].replace('T', ' '))
            if 'receiving' in status and datetime.now(timezone.utc) - sms_datetime > timedelta(days=2):
                subprocess.call(f'mmcli -m {m} --messaging-delete-sms={sms_id}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); continue
            # sms = [data[len('sms.content.text'):].lstrip()[1:].lstrip() for data in sms if data[:len('sms.content.text')] == 'sms.content.text']
            if '             |      text: ' not in sms: subprocess.call(f'mmcli -m {m} --messaging-delete-sms={sms_id}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); continue
            sms = sms.split('             |      text: ')[-1].split('-----------------------')[0].replace('             |            ', '').strip()
            sms_sender = [line.split('|    number:')[-1].strip() for line in sms_lines if '|    number:' in line][0]
            sms_sender = sms_sender if not sms_sender[1:].isnumeric() else int(sms_sender[3:] if sms_sender[:3] == '+98' else sms_sender[1:] if sms_sender[0] == '0' else sms_sender)
            numbers = re.findall(r'\+[\d|,|،|.]+', sms.replace(',', '').replace('،', ''))
            numbers = list(sorted(set([int(num[1:]) for num in numbers])))
            print(f"{cs.CVIOLET}{cs.BOLD}S:{cs.ENDC}{cs.CGREEN}{sms_sender}{cs.ENDC}{cs.CYELLOW}{receiver}{cs.ENDC}{numbers[-1] if numbers else '-'}", f'{sms_datetime.hour}:{sms_datetime.minute}:{sms_datetime.second}')
            doc = {'s': sms_sender, 'r': receiver, 'numbers': numbers, 'date': sms_datetime, 'sms': sms, 'p': False}
            try: messages.insert_one(doc); subprocess.call(f'mmcli -m {m} --messaging-delete-sms={sms_id}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            except pymongo.errors.DuplicateKeyError: subprocess.call(f'mmcli -m {m} --messaging-delete-sms={sms_id}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def pay_loop(host='https://jalus.ir'):
    while True:
        ms = messages.count_documents({'p': False, 'numbers': {'$ne': []}})
        if not ms: sms(); time.sleep(7)
        ms = messages.find({'p': False, 'numbers': {'$ne': []}})
        for m in ms:
            m['date'] = m['date'].astimezone(timezone.utc).strftime("%Y-%m-%d %H:%M:%S").split(' ')
            r = requests.get(f"{host}/pay/{m['date'][0]}/{m['date'][1]}/{m['s']}/{m['r']}/{','.join(str(num) for num in m['numbers'])}")
            if r.status_code == 200 and r.json()['OK']: messages.update_one({'_id': m['_id']}, {'$set': {'p': True}})

def otp(otp_list):
    retries = []
    for itp, (phone, otp) in enumerate(otp_list):
        modems = subprocess.check_output(f'mmcli --list-modems', shell=True).decode().strip().split('\n')
        m = random.choice([m.strip().split(' ')[0].split('/')[-1] for m in modems])
        if m.lower() == 'no': return otp_list
        for retry in range(5):
            status = subprocess.check_output(f'mmcli -m {m} --output-keyvalue | grep "state"', shell=True).decode().strip()
            if 'disable' in status:
                if retry == 4: retries.extend(otp_list[itp: ]); return retries
                else: subprocess.call(f'mmcli -m {m} --enable', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
            else: break
        sms_id = subprocess.check_output(f'''mmcli -m {m} --messaging-create-sms="number='+98{phone}',text='کد تایید جالوس:\nCode: {otp}\nبرای دیگران نفرستید.'"''', shell=True).decode().strip().split('/')[-1]
        sms_r = subprocess.check_output(f'mmcli -m {m} --sms {sms_id} --send', shell=True).decode().strip().lower()
        if sms_r != 'successfully sent the sms': retries.append((phone, otp))
        subprocess.call(f'mmcli -m {m} --messaging-delete-sms={sms_id}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return retries

def otp_loop(host='https://jalus.ir'):
    otp_list = []
    while True:
        if otp_list: otp_list = otp(otp_list)
        else:
            otp_list = requests.get(f'{host}/otp').text.strip('\n').split('\n')
            otp_list = [op.strip().split(',') for op in otp_list if ',' in op]
            print(f"{cs.OKGREEN}{cs.BOLD}OTP:{cs.ENDC}", otp_list)
            otp_list = otp(otp_list)

if __name__ == '__main__': globals()[sys.argv[1]](sys.argv[2])