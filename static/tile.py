import sys, glob, os
layer, format, area = sys.argv[1], {'b': 'png', 'r': 'png', 'y': 'jpg'}[sys.argv[1]], sys.argv[2]
# y = hybrid, r = somehow altered roadmap, p = terrain, m = standard roadmap, h = roads only, s = satellite only
api = {'b': '`https://tile.jawg.io/dark/${z}/${x}/${y}.png?api-key=community`', 'r': '`https://mt1.google.com/vt/lyrs=r&x=${x}&y=${y}&z=${z}`', 'y': '`https://mt1.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`'}[layer]
print(len(glob.glob(os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), '*'))))
if layer == 'b':
    if os.name == 'nt': files = glob.glob(f'C:\\Users\\Arsha\\Downloads\\*_*_*.{format}')
    else: files = glob.glob(f'/home/arsha/Downloads/*_*_*.{format}'); print(len(files))
    for f in files: z, x, y = os.path.basename(f).split('.')[0].split('_'); os.rename(f, os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), f'{z}_{x}_{y}.{format}'))
else:
    if os.name == 'nt': files = glob.glob(f'C:\\Users\\Arsha\\Downloads\\lyrs={layer}&x=*&y=*&z=*.{format}')
    else: files = glob.glob(f'/home/arsha/Downloads/lyrs={layer}&x=*&y=*&z=*.{format}'); print(len(files))
    print(len(files))
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
    chaboksar: [36.9822, 50.5668],
    ramsar: [36.9267, 50.6447],
    abasabad: [36.7228, 51.1035],
    salmanshahr: [36.7028, 51.1960],
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
        [35.588730781962234, 51.45126367770104], [35.74102619930165, 51.10244777740613],]
}
var polygon = ('%s' in polygons) ? polygons.%s : polygons.north, lngs = [], lats = [];
for (var i = 0; i < polygon.length; i ++) { lngs.push(polygon[i][1]); lats.push(polygon[i][0]); }
var min_lng = Math.min(...lngs), max_lng = Math.max(...lngs), min_lat = Math.min(...lats), max_lat = Math.max(...lats);
var lng = locations.%s[1], lat = locations.%s[0], min_z = Math.ceil(Math.min(Math.log2(180 / (max_lng - min_lng)), Math.log2(180 / (max_lat - min_lat)))) + 1;
var max_z = Math.ceil(Math.max(Math.log2(180 / (max_lng - min_lng)), Math.log2(180 / (max_lat - min_lat)))) + 10, founds = %s, not_founds = %s;
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
""" % (area, area, area, area, str(sorted([os.path.basename(f).split('.')[0] for f in glob.glob(os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), '*'))])), {k: '' for k in ['6_41_25']}, api, api))