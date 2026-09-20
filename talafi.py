import aiohttp, aiofiles, sys, os.path, urllib.parse, asyncio, lxml.html, glob, yaml
from sanic import Sanic, Blueprint, response, exceptions
from datetime import datetime, timedelta
from random import randint, random, choice
from PIL import Image
app, blu, static_path = Sanic(__name__), Blueprint('talafi_' + __name__), '/static/talafi'; app = blu
app.add_route(lambda _: response.file(f'{os.path.dirname(os.path.abspath(__file__))}{static_path}/coinRise.webp'), '/favicon.ico', name='redirect_ico')
@app.get('/static/<path:path>')
async def static_file(r, path): return await response.file(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', urllib.parse.unquote(path)))
@app.post('/static/<path:path>')
async def upload_static_file(r, path):
    path = f'{os.path.dirname(os.path.abspath(__file__))}/static/{path}'
    if 'override' not in r.args and os.path.exists(path): return response.json({'OK': True})
    os.makedirs(os.path.dirname(path), exist_ok=True)
    async with aiofiles.open(path, 'wb') as f: await f.write(r.files["file"][0].body)
    f.close()
    return response.json({'OK': True})
@app.get("/")
async def page(r, ): return await response.file(f'{os.path.dirname(__file__)}/templates/Talafi.html')
@app.get("/<page:(news|login|jewelry|asset|trade|wiki|pr|)>")
async def specific_page(r, page): return await response.file(f'{os.path.dirname(__file__)}/templates/Talafi.html')
@app.get("/<page:(pr|wiki)>/<_id>")
async def wiki_pr_page(r, page, _id): return await response.file(f'{os.path.dirname(__file__)}/templates/Talafi.html')
@app.get("/price")
async def last_price(r):
    proc = await asyncio.create_subprocess_exec('tail', f'-{1}', f'{os.path.dirname(__file__)}{static_path}/price.csv', stdout=asyncio.subprocess.PIPE)
    lp, stderr_data = await proc.communicate()
    if proc.returncode != 0: raise exceptions.NotFound()
    lp = lp.decode().split('\n')[0].strip().split(',')
    if not lp[0] or datetime.now() - datetime.fromisoformat(lp[0]) > timedelta(seconds = 120):
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get('https://moj3.ir/price') as r:
                    r = (await r.read()).decode()
                    r = lxml.html.fromstring(r)
                    tds = r.xpath(f"//body//div[contains(concat(' ', @class, ' '), ' table-container ')][1]//td/text()")
                    lp = [td.strip() for td in tds if td.strip()]
                    lp = [lp[i].replace(',', '').replace('%', '').replace('+', '') for i in [0, 1, 2, 3, 6, 7, 8, 15, 16, 17, 20, 21, 22, 25, 26, 27, 30, 31, 32, 35, 36, 37, 40, 41, 11, 12]]
                    lp[0] = str(datetime.now()).split('.')[0]
                    async with aiofiles.open(f'{os.path.dirname(__file__)}{static_path}/price.csv', 'a') as f: await f.write(','.join(lp) + '\n')
            except: pass
    return response.json(lp)
@app.get('/post/<name_category>')
async def _thumbnail(r, name_category):
    if name_category[-4:] != '.jpg': 
        category = '*' if name_category == '-' else name_category; stories = reversed(sorted(glob.glob(f'static/talafi/{category}_*.*.[mv][pt][4t]'), key=os.path.getmtime)); story_names = {}
        for story in stories:
            name = os.path.basename(story); title = name.split('.')[0]
            if title not in story_names: story_names[title] = [[], [], [randint(0, 59), randint(60, 119)]]
            if name.split('.')[2] == 'mp4': story_names[title][0].append(int(name.split('.')[1]))
            if name.split('.')[2] == 'vtt': story_names[title][1].append(name.split('.')[1])
        return response.json(story_names)
    name = urllib.parse.unquote(name_category); name = name[:-4]
    if not os.path.exists(f'static/talafi/{name}.jpg'):
        names = glob.glob(f'static/talafi/{name}.*.mp4')
        if not names: raise exceptions.NotFound()
        subprocess.run(' '.join(['ffmpeg', '-ss', '0', '-i', f'"{os.path.dirname(os.path.abspath(__file__))}/{max(names, key=lambda nm: chr(len(nm)) + str.casefold(nm))}"', '-vframes', '1', '-f', 'image2', '-vf', '"blackframe=0,metadata=select:key=lavfi.blackframe.pblack:value=50:function=less"', f'"{os.path.dirname(os.path.abspath(__file__))}{static_path}/{name}.jpg"']), shell=True, capture_output=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return await response.file(f'static/talafi/{name}.jpg')
@app.get('/otp/<phone>/<otp:path>')
async def _otp(r, phone, otp=None):
    try: phone = int(phone[3:] if phone[:3] == '+98' else phone[1:] if phone[0] == '0' else phone)
    except: return response.json({'OK': False, 'e': 'phone malformed format'})
    if otp: return response.json({'OK': True, 'session': encode(json.dumps({'phone': phone, 'exp': str(datetime.now() + timedelta(days=180)).split()[0]}).encode())}) if phone in otps and otps[phone] == int(otp.lstrip('0')) else response.json({'OK': False})
    else:
        otps[phone] = (phone * 137 * (datetime.now().hour + 1)) % 10000; 
        otp_list.append([str(phone), f'{otps[phone]:04d}']); return response.json({'OK': True, 'otp':  otps[phone]} if '-d' in sys.argv or '--debug' in sys.argv else {'OK': True})
@app.get('/trades/<phone>')
async def get_trades(r, phone):
    async with aiofiles.open(f'{os.path.dirname(__file__)}{static_path}/trade/{phone[-3:]}.csv', 'r') as f:
        trades = await f.read().split('\n')
        if not trades[-1]: trades.pop()
        trades = [trade.split(',') for trade in trades]
        trades = [trade for trade in trades if trade[1] == phone]
        return response.json(trades)
@app.post('/trades/<phone>')
async def append_trade(r):
    async with aiofiles.open(f'{os.path.dirname(__file__)}{static_path}/trade/{phone[-3:]}.csv', 'a') as f:
        await f.write(f"{str(datetime.now()).split('.')[0] if 'date' not in r.json else r.json['date']},{phone},{r.json['asset']},{r.json['quantity']},{r.json['cost']}")
        return response.json({'OK': True})
@app.post('/trades/<phone>/<idx>')
async def update_trade(r):
    async with aiofiles.open(f'{os.path.dirname(__file__)}{static_path}/trade/{phone[-3:]}.csv', 'r+') as f:
        trades = await f.read().split('\n')
        if not trades[-1]: trades.pop()
        iphone = 0
        for it, t in enumerate(trades):
            if phone == t.split(',')[1]:
                if iphone == idx:
                    trades[it] = f"{t.split(',')[0] if 'date' not in r.json else r.json['date']},{phone},{r.json['asset']},{r.json['quantity']},{r.json['cost']}"
                    await f.write('\n'.join(trades) + '\n')
                    return response.json({'OK': True})
                iphone += 1
        return response.json({'OK': False})
@app.delete('/trades/<phone>/<idx>')
async def delete_trade(r):
    async with aiofiles.open(f'{os.path.dirname(__file__)}{static_path}/trade/{phone[-3:]}.csv', 'r+') as f:
        trades = await f.read().split('\n')
        if not trades[-1]: trades.pop()
        iphone = 0
        for it, t in enumerate(trades):
            if phone == t.split(',')[1]:
                if iphone == idx:
                    trades = trades[:it] + trades[it + 1:]
                    await f.write('\n'.join(trades) + '\n')
                    return response.json({'OK': True})
                iphone += 1
        return response.json({'OK': False})
@app.route('/<collection>/-', methods=['GET', 'POST'])
async def find(r, collection):
    async with aiofiles.open(f'{os.path.dirname(__file__)}{static_path}/{collection}.yaml', 'r') as f:
        ds = yaml.safe_load(await f.read())
        if r.json and 'tag' in r.json: ds = [d for d in ds if r.json['tag'] in d['tags']]
        return response.json(ds)
if __name__ == '__main__':
    debug = True if '-d' in sys.argv or '--debug' in sys.argv else False
    if '-p' in sys.argv and int(sys.argv[(sys.argv.index('-p') + 1)]) == 443 or '--port' in sys.argv and int(sys.argv[(sys.argv.index('--port') + 1)]) == 443: app.run(host='0.0.0.0', port=443, debug=debug, auto_reload=debug, ssl={"cert": "/etc/letsencrypt/live/jalus.ir/fullchain.pem", "key": "/etc/letsencrypt/live/jalus.ir/privkey.pem"})
    if '-p' in sys.argv or '--port' in sys.argv: app.run(host='0.0.0.0', port=int(sys.argv[(sys.argv.index('-p') + 1) if '-p' in sys.argv else (sys.argv.index('--port') + 1)]), debug=debug, auto_reload=debug)
    else: app.run(host='0.0.0.0', port=5000, debug=debug, auto_reload=debug)