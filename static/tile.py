import subprocess, glob, pymongo, os.path, os, numpy as np, math, sys
from random import choices
from PIL import Image

def downloader(layer, format):
    # y = hybrid, r = somehow altered roadmap, p = terrain, m = standard roadmap, h = roads only, s = satellite only
    format = {'b': 'png', 'r': 'png', 'y': 'jpg'}[layer]; area = sys.argv[3]
    api = {'b': '`https://tile.jawg.io/dark/${z}/${x}/${y}.png?api-key=community`', 'r': '`https://mt1.google.com/vt/lyrs=r&x=${x}&y=${y}&z=${z}`', 'y': '`https://mt1.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`'}[layer]
    print(len(glob.glob(os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), '*'))))
    if layer == 'b':
        if os.name == 'nt': files = glob.glob(f'C:\\Users\\Arsha\\Downloads\\*_*_*.{format}'); print(len(files))
        else: files = glob.glob(f'/home/arsha/Downloads/*_*_*.{format}'); print(len(files))
        for f in files: z, x, y = os.path.basename(f).split('.')[0].split('_'); os.rename(f, os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), f'{z}_{x}_{y}.{format}'))
    else:
        if os.name == 'nt': files = glob.glob(f'C:\\Users\\Arsha\\Downloads\\lyrs={layer}&x=*&y=*&z=*.{format}'); print(len(files))
        else: files = glob.glob(f'/home/arsha/Downloads/lyrs={layer}&x=*&y=*&z=*.{format}'); print(len(files))
        for f in files: x = f.split('&x=')[1].split('&')[0]; y = f.split('&y=')[1].split('&')[0]; z = f.split('&z=')[1].split('_')[0]; os.rename(f, os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), f'{z}_{x}_{y}.{format}'))
    with open (os.path.join(os.path.dirname(__file__), f'lyr{layer}.wanted')) as file: not_found = list(file.readlines())
    with open (os.path.join(os.path.dirname(__file__), 'tile.js'), 'w') as f: f.write("""const inside = (vs, point) => {
        var x = point[0], y = point[1], inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];
            var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        } return inside;
    }; const fetchImage = async url => {
        const response = await fetch(url)
        return await response.blob()
    }; const downloadImage = async url => {
        const imageBlob = await fetchImage(url)
        const imageBase64 = URL.createObjectURL(imageBlob)
        const a = document.createElement('a')
        a.style.setProperty('display', 'none')
        document.body.appendChild(a)
        // a.download = url.replace(/^.*[\\\/]/, '')
        url = url.split('?')[0].split('/')
        a.download = url[4] + '_' + url[5] + '_' + url[6]
        a.href = imageBase64
        a.click()
        a.remove()
    }; const tile = (lng, lat, z) => {
        n = Math.pow(2, z)
        xtile = n * ((lng + 180) / 360)
        lat *= Math.PI / 180.0;
        ytile = n * (1 - (Math.log(Math.tan(lat) + 1 / Math.cos(lat)) / Math.PI)) / 2
        return [Math.ceil(xtile), Math.ceil(ytile)]
    }; const lng_lat = (xtile, ytile, z) => {
        n = Math.pow(2, z)
        lng_deg = xtile / n * 360.0 - 180.0
        lat_rad = Math.atan(Math.sinh(Math.PI * (1 - 2 * ytile / n)))
        lat_deg = lat_rad * 180.0 / Math.PI
        return [lng_deg, lat_deg]
    }; var locations = {
        esfahan: [32.6634, 51.6720],
        tehran: [35.7199, 51.3754],
        qeshm: [26.7939, 55.8078],
        kish: [26.5326, 53.9774],
        babol: [36.5500, 52.7075],
        nur: [36.5613, 52.0222],
        chaboksar: [36.9822, 50.5668],
        ramsar: [36.9267, 50.6447],
        salmanshahr: [36.7028, 51.1960],
        lahijan: [37.2138, 50.0419],
        rasht: [37.2925, 49.5764],
        iran: [32.8063, 53.3956],
    }; var polygons = {
        iran: [[39.782242470275875, 44.60600486157815], [38.87508392625325, 46.171556759946306], 
            [39.73367926769929, 47.99528713629139], [38.46335378158569, 48.85222068662222],
            [37.615396879023855, 49.1528844008875], [37.4791703302665, 50.16397166437581],
            [36.60356494565324, 52.0539779216154], [36.98986414237642, 54.0365020768273],
            [37.34794861915227, 53.904333980535135], [38.44821922250797, 56.96402947383344],
            [36.67250044508738, 61.15376374202473], [31.377087462908428, 61.68243695959479],
            [29.841515359218118, 60.889427339833254], [27.041145930512567, 63.3609740019969],
            [25.166013269281024, 61.60313590533794], [26.487245628968942, 53.909290282949044],
            [27.807352527190538, 51.35844259800312], [30.03979435150296, 49.99710937618306],
            [29.936767254149434, 48.609342542604864], [34.11471463577597, 45.41087026027465],
            [35.20184392718009, 46.151012567453684], [39.3744226513493, 43.98345292233683]],
        north: [[36.95356637781867, 54.07450043026862], [36.10189958071763, 52.548985794435204],
            [36.40754569357935, 51.76346332737448], [36.471623515616336, 51.10840351159929],
            [36.83959226146464, 50.43137106879855], [37.14178561186706, 50.02625019998453],
            [37.19704828980523, 49.27780662409298], [37.35004029219468, 49.10271202840294],
            [37.68688532895217, 49.03679407356934], [37.444139435303605, 50.18211872256919],
            [36.743638447886156, 51.30547079652126],],
        esfahan: [[32.92607662361982, 51.51970420908395], [32.76339637545373, 51.897359219245764],
            [32.499709175546805, 52.11845907686674], [32.45713431428922, 51.7579701885703],
            [32.34727364851933, 51.51215110672364], [32.3113007784846, 51.14685570241226],
            [32.48523018904864, 50.83511865766051], [32.76512858354662, 50.55222071449541],
            [32.77898504608362, 50.85159814073278], [32.5385013634591, 50.90378319668241],
            [32.45394763144321, 51.30203757103488], [32.64494893898015, 51.255345673859466],],
        tehran: [[35.85686566776186, 51.56662011953444], [35.77167325392059, 51.56112695575027],
            [35.728206661036815, 51.64352441251285], [35.712597479240465, 51.519241581895955],
            [35.588730781962234, 51.45126367770104], [35.74102619930165, 51.10244777740613],],
        kish: [[26.572877846490055, 54.0100857989733], [26.56243745918876, 54.02502033801151],
            [26.52343113176003, 54.05111286598633], [26.50069692094331, 54.042873120031736],
            [26.49224725017837, 53.99051640271385], [26.499928794749447, 53.951892593003755],
            [26.520973596017, 53.91000721844492], [26.548003592949733, 53.89627430854959],
            [26.578097683924835, 53.94416783109303],],
        qeshm: [[26.959570941281374, 55.750834157884505], [26.908149079101605, 55.8819834432316],
            [26.999345568348616, 56.090723676562924], [27.004851716545073, 56.22187297238211],
            [26.943045044622554, 56.29671732894146], [26.90631215023831, 56.1793009502019],
            [26.828521442959378, 56.14359538560479], [26.605266460498473, 55.89159649199594],
            [26.672779771858096, 55.68285624760114], [26.52604096705291, 55.28940838150523],
            [26.656825680734002, 55.242029843866746], [26.83587403268631, 55.77212015342306],],
    }
    var polygon = ('%s' in polygons) ? polygons.%s : polygons.north, lngs = [], lats = [];
    for (var i = 0; i < polygon.length; i ++) { lngs.push(polygon[i][1]); lats.push(polygon[i][0]); }
    var min_lng = Math.min(...lngs), max_lng = Math.max(...lngs), min_lat = Math.min(...lats), max_lat = Math.max(...lats);
    var lng = locations.%s[1], lat = locations.%s[0], min_z = Math.ceil(Math.min(Math.log2(180 / (max_lng - min_lng)), Math.log2(180 / (max_lat - min_lat)))) + 1;
    var max_z = Math.min(Math.ceil(Math.max(Math.log2(180 / (max_lng - min_lng)), Math.log2(180 / (max_lat - min_lat)))) + 10, 16), founds = %s, not_founds = %s;
    (async () => {for (var z = min_z; z <= max_z; z ++) {
        var t = tile(lng, lat, z); var xtile = t[0], ytile = t[1];
        for (var x = xtile - Math.pow(2, z - min_z); x <= xtile + Math.pow(2, z - min_z); x ++) {
            for (var y = ytile - Math.pow(2, z - min_z); y <= ytile + Math.pow(2, z - min_z); y ++) {
                let rect = [lng_lat(x, y, z), lng_lat(x + 1, y, z), lng_lat(x + 1, y + 1, z), lng_lat(x, y + 1, z)], flag = false;
                rect = [[rect[0][1], rect[0][0]], [rect[1][1], rect[1][0]], [rect[2][1], rect[2][0]], [rect[3][1], rect[3][0]]];
                for (var i = 0; i < rect.length; i ++) if (inside(polygon, rect[i])) {flag = true; break}
                for (var i = 0; i < polygon.length; i ++) if (inside(rect, polygon[i])) {flag = true; break}
                if (flag) {
                    delete not_founds[`${z}_${x}_${y}`];
                    if (!founds.includes(`${z}_${x}_${y}`)) {
                        await downloadImage(%s);
                        await new Promise(r => setTimeout(r, 40));
                    }
                }
            }
        }
    }; not_founds = Object.keys(not_founds); for (var i = 0; i < not_founds.length; i ++) {var z = not_founds[i].split('_')[0], x = not_founds[i].split('_')[1], y = not_founds[i].split('_')[2]; await downloadImage(%s); await new Promise(r => setTimeout(r, 40));}})();
    """ % (area, area, area, area, str(sorted([os.path.basename(f).split('.')[0] for f in glob.glob(os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), '*'))])), {k: '' for k in []}, api, api))

def inside(vs, point):
    x = point[0]; y = point[1]; inside = False
    for i_v, v in enumerate(vs[:-1]):
        xi = v[0]; yi = v[1]
        xj = vs[i_v + 1][0]; yj = vs[i_v + 1][1]
        intersect = ((yi > y) != (yj > y)) and (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if intersect: inside = not inside
    return inside
def tile(lng, lat, z):
    n = 2 ** z
    xtile = n * ((lng + 180) / 360)
    lat *= math.pi / 180.0
    ytile = n * (1 - (math.log(math.tan(lat) + 1 / math.cos(lat)) / math.pi)) / 2
    return [math.ceil(xtile), math.ceil(ytile)]
def lng_lat(xtile, ytile, z):
    n = 2 ** z
    lng_deg = xtile / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
    lat_deg = lat_rad * 180.0 / math.pi
    return [lng_deg, lat_deg]
polygons = {
    14: [
        [[35.84422, 49.48387], [35.69210, 50.55423], [35.49533, 50.77223], [35.16097, 49.96346], [35.17167, 48.99773]], 
        [[37.06682, 47.84678], [36.63764, 48.33777], [36.09618, 47.60129], [36.96028, 46.50725]], 
        [[28.61109, 54.51772], [27.92957, 55.85458], [27.28641, 55.77453], [28.59469, 53.74388]], 
        [[27.33796, 59.77594], [25.84191, 59.58648], [26.16806, 57.63322], [27.54635, 58.22027]],
        [[32.48610, 59.35016], [30.41555, 60.62745], [29.39745, 58.48394], [31.53166, 57.23601]],
        [[33.33244, 56.87876], [32.63046, 57.64220], [31.45654, 56.40895], [32.28773, 54.95058]],
        [[33.53256, 54.53461], [32.99652, 55.34698], [31.26013, 52.80218], [32.18838, 51.94086]],
        [[32.84452, 50.24759], [32.00182, 50.39930], [32.10137, 49.35201], [32.94314, 48.29494], [33.41418, 48.88710]],
        [[35.12478, 51.75490], [35.08475, 54.41715], [33.77291, 54.08926], [33.09087, 53.01751], [34.18279, 51.65702], [34.46974, 52.40088]],
        [[35.86984, 55.91467], [34.93644, 56.99621], [34.04503, 56.49704], [34.29203, 54.76462], [35.15280, 54.82824]]
    ], 16: [
        [[36.73034, 54.12983], [36.53566, 54.25113], [35.94017, 53.25973], [36.41765, 52.99017]],
    ]
}
def h2(layer):
    #  directory = f"{os.path.dirname(os.path.abspath(__file__))}/lyr{layer}"
    format = {'b': 'png', 'r': 'png', 'y': 'webp'}[layer]; directory = f"{os.path.dirname(os.path.abspath(__file__))}/lyr{layer}"; j_l = glob.glob(f"{directory}/*.{format}")
    j_l = [jpg.split('/')[-1].split('.')[0] for jpg in j_l]; j_set = set(j_l)
    families = []
    for jpg in j_l:
        z, x, y = jpg.split('_'); z, x, y = int(z), int(x), int(y)
        if z != 13 and z != 15: continue
        if f'{z + 1}_{x * 2}_{y * 2}' in j_set and f'{z + 1}_{x * 2 + 1}_{y * 2}' in j_set and \
                f'{z + 1}_{x * 2}_{y * 2 + 1}' in j_set and f'{z + 1}_{x * 2 + 1}_{y * 2 + 1}' in j_set:
            families.append([
                f'{directory}/{z}_{x}_{y}.{format}', f'{directory}/{z + 1}_{x * 2}_{y * 2}.{format}', 
                f'{directory}/{z + 1}_{x * 2 + 1}_{y * 2}.{format}', f'{directory}/{z + 1}_{x * 2}_{y * 2 + 1}.{format}', 
                f'{directory}/{z + 1}_{x * 2 + 1}_{y * 2 + 1}.{format}'])
            families[-1].append(sum([os.stat(f).st_size for f in families[-1]]))
    families = sorted(families, key=lambda family: family[-1])
    for family in families: family.pop()
    print(len(families))
    for family in families[:20000]:
        imgs, lens = [], []
        for file in family:
            with open(file, 'rb') as f:
                imgs.append(f.read())
                lens.append(len(imgs[-1]).to_bytes(2, byteorder='big', signed=False))
            os.remove(file)
        img = lens[0] + imgs[0] + lens[1] + imgs[1] + lens[2] + imgs[2] + lens[3] + imgs[3] + lens[4] + imgs[4]
        with open(family[0].replace(format, 'h2'), 'wb') as f:
            f.write(img)
def merge(layer):
    from skimage.metrics import structural_similarity as ssim
    format = {'b': 'png', 'r': 'png', 'y': 'webp'}[layer]; jpgs = glob.glob(f"lyr{layer}/*.{format}")
    j_set = set([jpg.split('/')[-1].split('.')[0] for jpg in jpgs])
    par_j_set = set()
    for jpg in jpgs:
        z, x, y = jpg.split('/')[-1].split('.')[0].split('_'); z, x, y = int(z), int(x), int(y)
        if z < 14: continue
        if f'{z - 1}_{int(x / 2)}_{int(y / 2)}' not in j_set: continue
        if f'{z + 1}_{x * 2}_{y * 2}' in j_set or f'{z + 1}_{x * 2 + 1}_{y * 2}' in j_set or \
            f'{z + 1}_{x * 2}_{y * 2 + 1}' in j_set or f'{z + 1}_{x * 2 + 1}_{y * 2 + 1}' in j_set: continue
        if f'{z}_{int(x / 2) * 2}_{int(y / 2) * 2}' not in j_set or f'{z}_{int(x / 2) * 2 + 1}_{int(y / 2) * 2}' not in j_set or \
            f'{z}_{int(x / 2) * 2}_{int(y / 2) * 2 + 1}' not in j_set or f'{z}_{int(x / 2) * 2 + 1}_{int(y / 2) * 2 + 1}' not in j_set: continue
        par_j_set.add(f'{z - 1}_{int(x / 2)}_{int(y / 2)}')
    families = []
    for i_p, p in enumerate(par_j_set):
        z, x, y = p.split('_'); z, x, y = int(z), int(x), int(y)
        parent = Image.open(f'{layer}/{p}.png')
        childs = [f'{z + 1}_{x * 2}_{y * 2}', f'{z + 1}_{x * 2 + 1}_{y * 2}', f'{z + 1}_{x * 2}_{y * 2 + 1}', f'{z + 1}_{x * 2 + 1}_{y * 2 + 1}']
        childs = [Image.open(f'{layer}/{ch}.png') for ch in childs]
        child = Image.new('RGB', (512, 512))
        child.paste(childs[0], (0, 0)); child.paste(childs[1], (256, 0))
        child.paste(childs[2], (0, 256)); child.paste(childs[3], (256, 256))
        dorf = child.resize((256, 256), resample=Image.Resampling.LANCZOS, box=None, reducing_gap=None)  # resample = NEAREST
        s = sum(ssim(np.array(parent.convert('RGB'))[:,:,i], np.array(dorf)[:,:,i], data_range=255) for i in range(3))
        families.append((s, p))
        if i_p % 1000 == 0: print(i_p)
    families = sorted(families, key=lambda f: -f[0])
    for family in families[:18000]:
        z, x, y = family[-1].split('_'); z, x, y = int(z) + 1, int(x) * 2, int(y) * 2
        chs = [f'{layer}/{z}_{x}_{y}.png', f'{layer}/{z}_{x + 1}_{y}.png', f'{layer}/{z}_{x}_{y + 1}.png', f'{layer}/{z}_{x + 1}_{y + 1}.png']
        childs = [Image.open(ch) for ch in chs]
        child = Image.new('RGB', (512, 512))
        child.paste(childs[0], (0, 0)); child.paste(childs[1], (256, 0))
        child.paste(childs[2], (0, 256)); child.paste(childs[3], (256, 256))
        try: os.remove(f'{layer}/{family[-1]}.png')
        except: pass
        child.save(f'{layer}/{family[-1]}.png', 'PNG', optimize=True)
        for ch in chs:
            try: os.remove(ch)
            except: pass
def split_3():
    format = {'b': 'png', 'r': 'png', 'y': 'webp'}[layer]; jpgs = glob.glob(f"lyr{layer}/*.{format}")
    prefer_size = len(jpgs) // 3
    ss = [[], [], []]
    ss[0] = set(choices(jpgs, k=len(jpgs) // 3))
    jpgs = [j for j in jpgs if j not in ss[0]]
    ss[0] = list(ss[0])
    while len(ss[0]) < prefer_size: ss[0].append(jpgs[-1]); jpgs.pop()
    ss[1] = set(choices(jpgs, k=len(jpgs) // 2))
    jpgs = [j for j in jpgs if j not in ss[1]]
    ss[1] = list(ss[1])
    while len(ss[1]) < prefer_size: ss[1].append(jpgs[-1]); jpgs.pop()
    ss[2] = jpgs
    print(len(ss[0]), len(ss[1]), len(ss[2]), prefer_size)
    print(ss[0][0], ss[1][0], ss[2][0])
    for i_s, s in enumerate(ss):
        for i_j, j in enumerate(s):
            if i_j % 1000 == 0: print(i_j)
            os.rename(j, f'lyry_{i_s + 1}/{j.split('/')[-1]}')
def remove_lesser_areas(layer):
    format = {'b': 'png', 'r': 'png', 'y': 'webp'}[layer]; jpgs = glob.glob(f"lyr{layer}/*.{format}")
    for i_j, jpg in enumerate(jpgs):
        if i_j % 1000 == 0: print(i_j)
        z, x, y = jpg.split('/')[-1].split('.')[0].split('_')
        z, x, y = int(z), float(x), float(y)
        ps = polygons.get(z, [])
        if not ps: continue
        lng, lat = lng_lat(x, y, z)
        for vs in ps:
            if inside(vs, [lat, lng]):
                try: os.remove(jpg)
                except: pass
def jpg2webp():
    images = glob.glob('lyry/*.jpg')
    for image in images:
        subprocess.Popen(f'convert -quality 50 {image} {image.replace('lyry', 'lyrx')[:-4]}webp', shell=True)
def stat():
    jpgs = glob.glob('Jalus/static/lyry/*.jpg')
    webps = glob.glob('Jalus/static/lyry/*.webp')
    j_sizes = [os.stat(im).st_size for im in jpgs]
    w_sizes = [os.stat(im).st_size for im in webps]
    print(min(j_sizes), max(j_sizes))
    print(min(w_sizes), max(w_sizes))
    print(sum(j_sizes) / len(j_sizes))
    print(sum(w_sizes) / len(w_sizes))
def remove_undetailed_childs(layer):
    format = {'b': 'png', 'r': 'png', 'y': 'webp'}[layer]; jpgs = glob.glob(f"lyr{layer}/*.{format}")
    zs = {'b': {13: .001, 14: .001, 15: .01, 16: .01}, 'r': {13: .001, 14: .001, 15: .01, 16: .01}, 'y': {13: 4, 14: 6, 15: 8, 16: 10}}[layer]
    stds = []
    for i_j, jpg in enumerate(jpgs):
        if i_j % 100 == 0: print(i_j // 100)
        im = np.array(Image.open(jpg))
        stds.append(np.sum(np.std(im, axis=(0, 1))))
    jpgs = [(jpg, stds[i_j]) for i_j, jpg in enumerate(jpgs)]
    jpgs = sorted(jpgs, key=lambda j: j[1])
    for jpg, score in jpgs:
        if score < zs.get(int(jpg.split('/')[-1].split('_')[0]), 0): os.remove(jpg)

if __name__ == '__main__':
    func, layer = sys.argv[1], sys.argv[2]
    globals()[func](layer)