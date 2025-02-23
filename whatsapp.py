from sanic import Sanic, response
from sanic.router import Route
from sanic_cors import CORS, cross_origin
from datetime import datetime, timedelta
import asyncio, signal, tempfile, subprocess, time, os, re, aiohttp, asyncio, sys
from multiprocessing import Process
from divar import ppan, pdad, pdim, pphone
from adbutils import adb
from lxml import etree
from typing import Iterable, Dict, FrozenSet
from collections import defaultdict

# def _add_cors_headers(response, methods: Iterable[str]) -> None:
#     allow_methods = list(set(methods))
#     if "OPTIONS" not in allow_methods: allow_methods.append("OPTIONS")
#     headers = {
#         "Access-Control-Allow-Methods": ",".join(allow_methods),
#         "Access-Control-Allow-Origin": "*",
#         "Access-Control-Allow-Credentials": "true",
#         "Access-Control-Allow-Headers": "origin, content-type, accept, authorization, x-xsrf-token, x-request-id",
#     }
#     response.headers.extend(headers)
# def add_cors_headers(request, response):
#     if request.method != "OPTIONS":
#         methods = [method for method in request.route.methods]
#         _add_cors_headers(response, methods)
# def _compile_routes_needing_options(
#     routes: Dict[str, Route]
# ) -> Dict[str, FrozenSet]:
#     needs_options = defaultdict(list)
#     for route in routes.values():
#         if "OPTIONS" not in route.methods:
#             needs_options[route.uri].extend(route.methods)
#     return {uri: frozenset(methods) for uri, methods in dict(needs_options).items()}
# def _options_wrapper(handler, methods):
#     def wrapped_handler(request, *args, **kwargs):
#         nonlocal methods
#         return handler(request, methods)
#     return wrapped_handler
# async def options_handler(request, methods) -> response.HTTPResponse:
#     resp = response.empty()
#     _add_cors_headers(resp, methods)
#     return resp
# def setup_options(app: Sanic, _):
#     app.router.reset()
#     needs_options = _compile_routes_needing_options(app.router.routes_all)
#     for uri, methods in needs_options.items():
#         app.add_route(_options_wrapper(options_handler, methods), uri, methods=["OPTIONS"],)
#     app.router.finalize()
app, pwd, ps = Sanic(__name__), 'haval', []
CORS(app)
# app.register_listener(setup_options, "before_server_start")
# app.register_middleware(add_cors_headers, "response")
# @app.listener('after_server_start')
# async def start_stream(sanic, loop):
#     try: subprocess.run(f'echo {pwd} | sudo -S kill -9 {subprocess.check_output(["pidof", "ffmpeg"]).decode("utf-8").strip()}', shell=True)
#     except: pass
#     subprocess.run(f'echo {pwd} | sudo -S modprobe --remove v4l2loopback', shell=True)
#     subprocess.run(f'echo {pwd} | sudo -S modprobe v4l2loopback card_label="webcam1" exclusive_caps=1 video_nr=1', shell=True)
#     v4l = subprocess.run(f'echo {pwd} | sudo -S ls -1 /sys/devices/virtual/video4linux', shell=True, capture_output=True, text=True).stdout
#     ffmpeg = subprocess.Popen(f'echo {pwd} | sudo -S ffmpeg -f x11grab -r 15 -draw_mouse 0 -s 480x853 -i :0.0+70,70 -vcodec rawvideo -vf "transpose=2,scale=1280:720" -pix_fmt yuv420p -threads 0 -f v4l2 /dev/{v4l.strip()}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
@app.listener('before_server_stop')
async def kill_stream(sanic, loop): [subprocess.run(f'echo {pwd} | sudo -S kill -9 {subprocess.check_output(["pidof", "ffmpeg"]).decode("utf-8").strip()}', shell=True)]
# @app.listener('after_server_start')
# async def start_all(sanic, loop): [ps.append(Process(target=p)) for p in [ppan, pdad, pdim, pphone]]; [p.start() for p in ps]
@app.listener('before_server_stop')
async def kill_all(sanic, loop): [p.kill() for p in ps]

def running_avds():
    avds = subprocess.run("ps aux | grep 'qemu-system-x86_64 -avd'", shell=True, capture_output=True, text=True).stdout
    avds = [av.split('qemu-system-x86_64 -avd ') for av in avds.split('\n') if '-camera-front' in av]
    return [list(map(av[-1].split(' ').__getitem__, [0, 2])) + [[v for v in av[0].split(' ') if v.strip()][1]] for av in avds]
async def xml(port):
    async with aiohttp.ClientSession() as session:
        async with session.get(f'http://localhost:{adb.device(serial=f"emulator-{port}").forward_port(7912)}/dump/hierarchy') as resp:
            return etree.fromstring((await resp.json())['result'].encode('utf-8'))
async def wait(port, path):
    for wi in range(32):
        bounds = (await xml(port)).xpath(path)
        if bounds: return bounds
        await asyncio.sleep((wi + 1) * .03)
async def click(port, path):
    bounds = await wait(port, path)
    bounds = re.findall(r'\[[^\[\]]*\]', bounds[0])
    bounds = [n[1:-1].split(',') for n in bounds]
    adb.device(serial=f"emulator-{port}").click((int(bounds[0][0]) + int(bounds[1][0])) // 2, (int(bounds[0][1]) + int(bounds[1][1])) // 2)
    # subprocess.run(f'adb -s emulator-{port} shell input tap {(int(bounds[0][0]) + int(bounds[1][0])) // 2} {(int(bounds[0][1]) + int(bounds[1][1])) // 2}', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
async def ensure_shell(port: str, commands, retry=16):
    if retry == 0 or not commands: return
    avds = adb.list()
    avds = [av for av in avds if av.state == 'device' and port in av.serial]
    if not avds:
        await asyncio.sleep(2. / retry)
        return await ensure_shell(port, commands, retry - 1)
    try:
        adb.device(serial=f"emulator-{port}").shell(commands[0])
        return await ensure_shell(port, commands[1:], retry)
    except: return await ensure_shell(port, commands, retry - 1)
@app.route('/')
async def _all(r):
    runs = running_avds()
    avds = subprocess.run('emulator -list-avds', shell=True, capture_output=True, text=True).stdout
    avds = [[av.strip()] for av in avds.split('\n') if av.strip() and av.strip() not in [r[0] for r in runs]]
    return response.json(runs + avds)
@app.post('/<emulator>')
@app.get('/<emulator>')
async def start(r, emulator):
    r_avds = running_avds()
    if emulator in [av[0] for av in r_avds]:  # index of and return port and emulator
        print('existed')
        return response.json({'OK': True})
    avds = subprocess.run('emulator -list-avds', shell=True, capture_output=True, text=True).stdout
    avds = [av.strip() for av in avds.split('\n') if av.strip()]
    if emulator not in avds:
        return response.json({'OK': False})
    for port in range(5555, 5555 + 64):
        if str(port) not in [av[1] for av in r_avds]:
            p = subprocess.Popen(f"ANDROID_EMULATOR_WAIT_TIME_BEFORE_KILL=1 emulator -avd {emulator} -port {port} -camera-front webcam1 -phone-number 98{emulator} -qemu -allow-host-audio", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)  # , preexec_fn=os.setsid)
            await ensure_shell(str(port), [['/data/local/tmp/atx-agent', 'server', '--stop'], ['/data/local/tmp/atx-agent', 'server', '--nouia', '-d', '--addr', '127.0.0.1:7912']])
            for retry in range(16):
                shell = subprocess.run(f'curl -X POST http://localhost:{adb.device(serial=f"emulator-{port}").forward_port(7912)}/services/uiautomator', shell=True, capture_output=True, text=True).stdout
                print(shell)
                if 'successfully started' in shell or 'already started' in shell:
                    return response.json({'OK': True, 'port': port, 'pid': p.pid,'uiv2': True})
                await asyncio.sleep(.125 * (retry + 1))
            return response.json({'OK': True, 'port': port, 'pid': p.pid, 'uiv2': False})
@app.delete('/<emulator>')
def stop(r, emulator):
    avds = running_avds()
    for av in avds:
        if emulator == av[0]:
            subprocess.Popen(f'kill -9 {av[2]}', shell=True)
            return response.json({'OK': True})
    return response.json({'OK': True})
@app.get('/<emulator>/contacts/<phone>')
async def ensure_contact(r, emulator, phone):  # time it .3s, with xml 1.6s,
    avds = running_avds()
    for av in avds:
        if emulator == av[0]:
            port, pid = av[1: ]
            with tempfile.NamedTemporaryFile() as tmp:
                tmp.write(f"BEGIN:VCARD\nVERSION:3.0\nFN:{'M' + phone[-4:]} {'divar'}\nN:{'divar'};{'M' + phone[-4:]};;;\nEMAIL;TYPE=INTERNET;TYPE=HOME:{'ex@email.com'}\nTEL;TYPE=CELL:+98{phone}\nEND:VCARD".encode())
                tmp.seek(0)
                shell = subprocess.run(f"adb -s emulator-{port} push {tmp.name} /sdcard/contacts.vcf", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                shell = subprocess.run(f'adb -s emulator-{port} shell am start -t "text/x-vcard" -d "file:///sdcard/contacts.vcf" -a android.intent.action.VIEW com.android.contacts', shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                await click(port, '//node[@text="OK"]/@bounds')
                return response.json({'OK': True})
    return response.json({'OK': True})
@app.post('/<emulator>/contacts/<phone>')
@app.get('/<emulator>/contacts/<phone>/call')
async def call(r, emulator, phone):
    avds = running_avds()
    for av in avds:
        if emulator == av[0]:
            port, pid = av[1: ]
            shell = subprocess.run(f"adb -s emulator-{port} shell am start -n com.whatsapp/com.whatsapp.Main", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            shell = subprocess.run(f"adb -s emulator-{port} shell am force-stop com.whatsapp", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            subprocess.run(f"adb -s emulator-{port} shell am start -a android.intent.action.VIEW -d 'https://api.whatsapp.com/send?phone=+98{phone}&msg=MESSAGE'", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            await click(port, '//node[@content-desc="Video call"]/@bounds')
            # await click(port, '//node[@text="CALL"]/@bounds')  # inja nist kollan halle, oon bug ke whatsapp too emulator dash oon payeenie 'mute' ro mizadim hal bud. halla dige nist ke bezanimesh peydash mikonim dafe bad ke didim automatic seen wait click
    return response.json({'OK': True})

if __name__ == '__main__':
    # asyncio.run(start(None, '9309123255'))
    # stop(None, '9309123255')
    # async def main(): print(etree.tostring(await xml(5555), pretty_print=True).decode())
    # asyncio.run(main())
    # asyncio.run(ensure_contact(None, '9309123255', '9133657623'))
    # asyncio.run(call(None, '9309123255', '9133657623'))
    if '-p' in sys.argv or '--port' in sys.argv: app.run(host='0.0.0.0', port=sys.argv[(sys.argv.index('-p') + 1) if '-p' in sys.argv else (sys.argv.index('--port') + 1)], debug=False, auto_reload=False)
    else: app.run(host='0.0.0.0', port=5000, debug=False, auto_reload=False)
    