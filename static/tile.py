import sys, glob, os
layer, format = sys.argv[1], {'b': 'png', 'r': 'png', 'y': 'jpeg'}[sys.argv[1]]
# y = hybrid, r = somehow altered roadmap, p = terrain, m = standard roadmap, h = roads only, s = satellite only
api = {'b': '`https://tile.jawg.io/dark/${z}/${x}/${y}.png?api-key=community`', 'r': '`https://mt1.google.com/vt/lyrs=r&x=${x}&y=${y}&z=${z}`', 'y': '`https://mt1.google.com/vt/lyrs=y&x=${x}&y=${y}&z=${z}`'}[layer]
print(len(glob.glob(os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), '*'))))
if layer == 'b':
    # files = glob.glob(f'C:\\Users\\Arsha\Downloads\\*_*_*.{format}')
    files = glob.glob(f'/home/arsha/Downloads/*_*_*.{format}'); print(len(files))
    for f in files: z, x, y = os.path.basename(f).split('.')[0].split('_'); os.rename(f, os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), f'{z}_{x}_{y}.{format}'))
else:
    # files = glob.glob(f'C:\\Users\\Arsha\Downloads\\lyrs={layer}&x=*&y=*&z=*.{format}')
    files = glob.glob(f'/home/arsha/Downloads/lyrs={layer}&x=*&y=*&z=*.{format}'); print(len(files))
    for f in files: x = f.split('&x=')[1].split('&')[0]; y = f.split('&y=')[1].split('&')[0]; z = f.split('&z=')[1].split('_')[0]; os.rename(f, os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), f'{z}_{x}_{y}.{format}'))
with open (os.path.join(os.path.dirname(__file__), f'lyr{layer}.wanted')) as file: not_found = list(file.readlines())
with open (os.path.join(os.path.dirname(__file__), 'tile.js'), 'w') as f: f.write(""" const fetchImage = async url => {
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
}; var locations = {
    esfahan: [32.6634, 51.6720],
    chaboksar: [36.9822, 50.5668],
    ramsar: [36.9267, 50.6447],
    abasabad: [36.7228, 51.1035],
    salmanshahr: [36.7028, 51.1960],
    iran: [32.8063, 53.3956],
}
var lng = locations.iran[1], lat = locations.iran[0], min_z = 6, max_z = 15, founds = %s, not_founds = %s;
(async () => {for (var z = min_z; z <= max_z; z ++) {
    var t = tile(lng, lat, z)
    var xtile = t[0], ytile = t[1]
    for (var x = xtile - Math.pow(2, z - min_z); x <= xtile + Math.pow(2, z - min_z); x ++) {
        for (var y = ytile - Math.pow(2, z - min_z); y <= ytile + Math.pow(2, z - min_z); y ++) {
            delete not_founds[`${z}_${x}_${y}`];
            if (!founds.includes(`${z}_${x}_${y}`)) {
                await downloadImage(%s);
                await new Promise(r => setTimeout(r, 40));
            }
        }
    }
} not_founds = Object.keys(not_founds); for (var i = 0; i < not_founds.length; i ++) {var z = not_founds[i].split('_')[0], x = not_founds[i].split('_')[1], y = not_founds[i].split('_')[2]; await downloadImage(%s); await new Promise(r => setTimeout(r, 40));}})();
""" % (str(sorted([os.path.basename(f).split('.')[0] for f in glob.glob(os.path.join(os.path.join(os.path.dirname(__file__), f'lyr{layer}'), '*'))])), {k: '' for k in ['6_41_25']}, api, api))