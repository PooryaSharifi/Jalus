/** #title نقشه اسکانها #title **/
/** #links <link rel="stylesheet" href="/static/leaflet.css" /><script src="/static/leaflet.js"></script><link rel="stylesheet" href="/static/map.css"/> #links **/
/** #elements <div id="map" style="height: calc(100% - 127px); opacity: 1"></div><div id="app" style="height: calc(127px)"></div> #elements **/
// مپ یا سرچ کتگوری نداشت فعلا آیکون گذاشتم تا کاملش کنیم.
// اضافه کن هر تغییری تو نقشه دوباره صدا بزنه و فچ کنه - بعدشmongo cluster
// دو مدل آیکون یکی فقط قیمت یکی تصویر و قیمت
let params = new URLSearchParams(window.location.search);
params = Object.fromEntries(params);
params.lyr = 'lyr' in params ? parseInt(params.lyr) : 0;
let categories = [];
['buy', 'rent'].map((ft) => {['apartment', 'villa', 'old-house', 'office', 'store', 'industrial-agricultural-property'].map((et) => {categories.push(`${ft}-${et}`)})});
categories = categories.filter(e => e !== 'rent-old-house');
['temporary-suite-apartment', 'temporary-villa', 'temporary-workspace'].map((et) => categories.push(`rent-${et}`))
categories.push('contribution-construction'); categories.push('pre-sell-home');
const icons = {'بالکن': 'balcony', 'انباری': 'cabinet', 'پارکینگ': 'parking'};
const maxStat = [[-1, -54],[49, -16],[31, 43],[-31, 43],[-48, -16]], cStat = [49, 55];
var map = L.map('map').setView([32.6509, 51.6637], 13);
map.setMaxBounds([[-90, 23.826], [40.681, 63.325]]);
window.lyrs = [['lyrb', 'مات', '/static/lyrb/{z}_{x}_{y}.png'], ['lyry', 'ماهواره', '/static/lyry/{z}_{x}_{y}.webp'], ['lyrr', 'سفید', '/static/lyrr/{z}_{x}_{y}.png']];
// window.lyr.setUrl(window.lyrs[this.state.lyr == 0 ? 1 : 0][2])
window.lyr = L.tileLayer(window.lyrs[params.lyr][2], {
  attribution: '',
  maxZoom: 17,
  maxNativeZoom: 17,
  zoomControl: false,
  // crs: L.CRS.Simple,
}); window.lyr.addTo(map);
var hash = L.hash(map);

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;  // condition: Clear, Cloudy, Rainy, Snowy
    /* delCookie('phone'); delCookie('session'); */ let landing = parseInt(cookie('landing') | 0); landing = (++ landing) % 5; setCookie('landing', landing);
    this.state = {searchExpand: false, searchInput: '', searchLocations: [], searchProperties: [], searchFeatures: [], expand_lyr: false, lyr: params.lyr, landing: landing == 1, properties: [], property: 0, stat: 0, show: {}, 
      calendared: false, calendar: [], calendarBias: 0, calendarRange: [-1, -1], ordered: false, phone: cookie('phone'), session: cookie('session'), otp: false, keys: {}, category: null, category: -1, categoryShow: false, categories: [
        {href: '/properties?lyr=1&category=mountain', title: 'کوهستانی',
        png: '/static/categories/mountain_0_exposed.webp'},
        {href: '/properties?lyr=1&category=accessible', title: 'پردسترس',
        png: '/static/categories/accessible_0_exposed.webp'},
        {href: '/users?category=beach', title: 'ساحلی',
        png: '/static/categories/beach_3_exposed.webp'},
        {href: '/properties?lyr=2&category=yeylaghi', title: 'ییلاقی',
        png: '/static/categories/yeylaghi_1_exposed.webp'},
        {href: '/properties?lyr=2&category=gheshlaghi', title: 'قشلاقی',
        png: '/static/categories/gheshlaghi_0_exposed.webp'},
        {href: '/properties?lyr=1&category=whole', title: 'دربستی',
        png: '/static/categories/darbasti_0_exposed.webp'},
        {href: '/users?category=infinity', title: 'ویو ابدی',
        png: '/static/categories/abadi_0_exposed.webp'},
        {href: '/properties?lyr=1&category=tent', title: 'کلبه‌ای',
        png: '/static/categories/X_1_exposed.webp'},
        {href: '/properties?lyr=2&category=pool', title: 'استخردار',
        png: '/static/categories/pool_9_exposed.webp'},
        {href: '/properties?lyr=1&category=jungle', title: 'جنگلی',
        png: '/static/categories/jungle_5_exposed.webp'},
        {href: '/properties?lyr=0&category=economy', title: 'اقتصادی',
        png: '/static/categories/economic_0_exposed.webp'},
        {href: '/users?category=classic', title: 'سنتی',
        png: '/static/categories/sonnati_3_exposed.webp'},
        {href: '/users?category=modern', title: 'مدرن',
        png: '/static/categories/futuristic_1_exposed.webp'},
        {href: '/users?category=swedish', title: 'سوییسی',
        png: '/static/categories/swedish_0_exposed.webp'},
        {href: '/users?category=action', title: 'تفریحی‌هیجانی',
        png: '/static/categories/entertain_1_exposed.webp'},
        {href: '/users?category=new', title: 'تجربه‌جدید',
        png: '/static/categories/hobit_0_exposed.webp'},
      ]}
    this.checkReserved = this.checkReserved.bind(this); this.binSearch = this.binSearch.bind(this); this.calendar = this.calendar.bind(this);
  } async checkReserved() { if ('calendarReserved' in this.state.show) return;
    let r = await fetch(`/key/${this.state.show.id}`); r = await r.json(); let calendar = [];
    for (var j = 0; j < r.length; j ++) { let key = r[j]; calendar.push([-1, -1]);
      for (var i = 0; i < this.state.calendar.length; i ++) {
        if (this.state.calendar[i].join('-') == jDate.gregorianToJalali(...key.head.split(' ')[0].split('-')).join('-')) calendar[calendar.length - 1][0] = i;
        if (this.state.calendar[i].join('-') == jDate.gregorianToJalali(...key.tail.split(' ')[0].split('-')).join('-')) calendar[calendar.length - 1][1] = i;
      } if (calendar.length > 1 && calendar[calendar.length - 1][0] - calendar[calendar.length - 2][1] === 1) {calendar[calendar.length - 2][1] = calendar[calendar.length - 1][1]; calendar.pop()}
    } let binCalendar = []; calendar = [[4, 5], [7, 7], [9, 11], [25, 32]];
    for (var j = 0; j < calendar.length; j ++) { binCalendar.push([calendar[j][0], false]); binCalendar.push([calendar[j][1], true]); }
    this.state.show.calendarReserved = binCalendar; this.setState({show: this.state.show, landing: false}, () => {});
  } async checkPayed() { if (!this.state.session) return;
    let r = await fetch('/key', {method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': this.state.session}});
    if (r.status < 300) {
      r = await r.json(); for (var i = 0; i < r.length; i ++) this.state.keys[r[i].home] = r[i];
      for (var i = 0; i < r.length; i ++) if (r[i].fix !== false && (!('id' in this.state.show) || r[i].home == this.state.show.id)) window.location.href = `/homes/${r[i].home}`; //  && Date.parse(r[i].head) < Date.now() && Date.now() < Date.parse(r[i].tail)
    }
  } binSearch(k) { if (!('calendarReserved' in this.state.show)) return 0;
    let start = 0, arr = this.state.show.calendarReserved; let end = arr.length - 1, mid;
    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      if (arr[mid][0] === k) return arr[mid][1] ? [(mid > 0 && arr[mid][0] == arr[mid - 1][0] ? 4 : 3), mid] : [(mid + 1 < arr.length && arr[mid + 1][0] == arr[mid][0] ? 4 : 2), mid];
      if (k < arr[mid][0]) end = mid - 1; else start = mid + 1;
    } return arr[mid][0] < k ? [(!arr[mid][1] ? 1 : 0), mid] : [(arr[mid][1] ? 1 : 0), mid];
  } async componentDidMount() {
    let r = await fetch('/properties/', {method: 'POST'});
    r = await r.json();
    for (var i = 0; i < r.length; i++) {if (!('price' in r[i])) r[i].price = Math.ceil(Math.random() * 100) * 50000; if (!('stat' in r[i])) r[i].stat = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), ];}
    window.markerClick = async (e) => { e.preventDefault(); e.stopPropagation();
      let ps = window.app.state.properties, target = e.target;
      if (target.tagName == 'SPAN') target = target.parentElement;
      for (var i = 0; i < ps.length; i ++) if (ps[i].id == target.id) {
        window.history.pushState({url: window.location.href}, null, `/properties/${ps[i].id}`);
        window.app.setState({show: ps[i], landing: false}); window.app.checkReserved(); break
      }
    }; r.map((property, idx) => {
      property.icon = L.divIcon({className: 'custom-div-icon', iconSize: [108, 108], iconAnchor: [54, 54],
        html: "<div id='" + property.id + "' style='background-image: linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), url(/static/properties/" + property.images[0] + ")' class='lenz touchable' onclick='window.markerClick.apply(this, arguments)'>" + String(property.price).replace(/(\d)(?=(\d{3})+$)/g, '$1,').farsify().split('').map((ch, i, arr) => `<span style="display: inline-block; position: absolute; bottom: auto; left: 50%; transform: translateX(-.2em) rotate(${-(arr.length / 2 - i) * 8 + 20}deg); transform-origin: center 60px 0px; font-size: 1.15em; line-height: .8em; font-weight: 500">${ch}</span>`).join('') + "<span style='display: inline-block; position: absolute; bottom: auto; left: 50%; transform: translateX(-.3em) rotate(-" + String(property.price).replace(/(\d)(?=(\d{3})+$)/g, '$1,').length * 4.4 + "deg); transform-origin: center 74px 0px; font-size: 1.15em; line-height: .15em; font-weight: 500;'>تومان</span></div>",
      }); L.marker(property.location, { icon: property.icon }).addTo(map);
    });
    this.setState({properties: r.sort((p0, p1) => p1.stat[0] - p0.stat[0])}, () => {map.panTo(new L.LatLng(...this.state.properties[0].location), {animate: true, duration: .3, easeLinearity: .9})});
    for (var i = 1; i <= faNow[2]; i++) this.state.calendar.push([faNow[0], faNow[1], i]); var calendarBias = (dateObj.getDay() - (this.state.calendar.length - 1) + 2402) % 7;
    var flag = 0; for (var i = 1; flag < 4; i ++) {
      dateObj.setDate(dateObj.getDate() + 1); now = [dateObj.getUTCFullYear(), dateObj.getUTCMonth() + 1, dateObj.getUTCDate()];
      now = jDate.gregorianToJalali(now[0], now[1], now[2]); if (now[1] !== this.state.calendar[this.state.calendar.length - 1][1]) flag += 1;
      this.state.calendar.push([now[0], now[1], now[2]]);
    } this.state.calendar.pop(); 
    this.setState({calendar: this.state.calendar, calendarBias: calendarBias});
    for (let h in this.state.keys) { let key = this.state.keys[h];
      if ('fix' in key && key.fix === false) {
        this.state.ordered = true; var i = 0;
        for (i = 0; i < this.state.calendar.length; i ++) {
          if (this.state.calendar[i].join('-') == jDate.gregorianToJalali(...key.head.split(' ')[0].split('-')).join('-')) this.state.calendarRange[0] = i;
          if (this.state.calendar[i].join('-') == jDate.gregorianToJalali(...key.tail.split(' ')[0].split('-')).join('-')) this.state.calendarRange[1] = i;
        } for (i = 0; i < this.state.properties.length; i ++) if (this.state.properties[i].id  == key.home) break;
        this.setState({calendarRange: this.state.calendarRange, ordered: this.state.ordered, show: this.state.properties[i], landing: false}, async () => {map.panTo(new L.LatLng(...this.state.properties[i].location), {animate: true, duration: .3, easeLinearity: .9}); window.history.pushState({url: window.location.href}, null, `/properties/${this.state.show.id}`); window.app.checkReserved()});
      }
    } if (window.location.pathname.split('/').length == 3) {
      for (let h = 0; h < this.state.properties.length; h ++)
        if (this.state.properties[h].id == window.location.pathname.split('/')[2]) {
          this.setState({show: this.state.properties[h], landing: false}, async () => {map.panTo(new L.LatLng(...this.state.properties[h].location)); window.history.pushState({url: window.location.href}, null, `/properties/${this.state.show.id}`); }); break
        }
    } await this.checkPayed();
    // window.onpopstate = e => {if (this.state.show.isEmpty()) return; app.setState({show: {}}, () => {window.history.replaceState({}, null)})}
    // , async () => {window.history.replaceState({}, null, `/properties/${this.state.show.id}`); window.app.checkReserved()}
    // TODO oonja ke vasate buy mire login va; oonja ke buy mikone vo ghablesh login hast, va didMount -> checkForPendingLoop(); age peding dasht mimoone too divare oonsafe tekoonam nemikhore (khastam quit kone payam dialogue midim ke baz shode dari boro beband), key dasht mire too home, va ellaa /search
  } calendar () {
    return (<>
      <div style={{position: 'relative', zIndex: 2, marginBottom: -20, direction: 'ltr', marginLeft: 10, marginRight: 10}}>
        {['شنبه', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه'].map((wDay => <span style={{display: 'inline-block', width: 'calc(100% / 7)', textAlign: 'center', fontSize: '.75em', color: '#343747af', fontWeight: 700}}>{wDay}</span>))}
      </div><div className="scroll" style={{margin: '10px 10px', color: '#343747', backgroundColor: 'rgb(240, 233, 236)', fontWeight: 700, borderRadius: 12, fontSize: '1.03em', direction: 'ltr', paddingTop: 5, paddingBottom: 3, maxHeight: 44 * 5 + 16, overflowY: 'scroll', overflowX: 'hidden'}}>
        {[...Array(this.state.calendarBias).keys()].map(() => <span style={{width: 'calc(100% / 7)', textAlign: 'center', lineHeight: '12px', paddingTop: 16, paddingBottom: 16, display: 'inline-block'}}></span>)}
        {this.state.calendar.map(([y, m, d], di) => <span onClick={() => {if (m === faNow[1] && d < faNow[2] || this.binSearch(di)[0] || (this.state.calendarRange[0] !== -1 && Math.abs(this.binSearch(di)[1] - this.binSearch(this.state.calendarRange[0])[1]) > 0)) this.setState({calendarRange: [-1, -1]}); else {if (this.state.calendarRange[0] === -1) this.setState({calendarRange: [di, di]}); else if (this.state.calendarRange[0] === this.state.calendarRange[1]) this.setState({calendarRange: [Math.min(this.state.calendarRange[0], di), Math.max(this.state.calendarRange[0], di)]}); else this.setState({calendarRange: [di, di]})}}}
            class={m === faNow[1] && d < faNow[2] ? "" : "touchable"} style={{width: 'calc(100% / 7)', textAlign: 'center', lineHeight: '12px', paddingTop: 16, paddingBottom: 16, display: 'inline-block', fontSize: '1.13em', fontWeight: 500, color: this.binSearch(di)[0] ? '#fce9eb' : (m === faNow[1] && d < faNow[2] ? '#e310256F' : (this.state.calendarRange[0] <= di && di <= this.state.calendarRange[1] ? '#fff9fa' : '#212232')), backgroundColor: this.binSearch(di)[0] ? '#ee6f7b' : (this.state.calendarRange[0] <= di && di <= this.state.calendarRange[1] ? '#e31025' : 'transparent'), borderTopLeftRadius: this.state.calendarRange[0] === di || this.binSearch(di)[0] == 2 || this.binSearch(di)[0] == 4 ? 22 : 0, borderBottomLeftRadius: this.state.calendarRange[0] === di || this.binSearch(di)[0] == 2 || this.binSearch(di)[0] == 4 ? 22 : 0, borderBottomRightRadius: this.state.calendarRange[1] === di || this.binSearch(di)[0] == 3 || this.binSearch(di)[0] == 4 ? 22 : 0, borderTopRightRadius: this.state.calendarRange[1] === di || this.binSearch(di)[0] == 3 || this.binSearch(di)[0] == 4 ? 22 : 0}}>{d === 1 ? <><div style={{position: 'relative', top: -6}}>{d.farsify()}</div><div style={{lineHeight: 0, position: 'relative', top: 5, fontSize: '.79em', marginTop: -5, marginBottom: 5}}>{jDate.jaMonths[m - 1]}</div></> : d.farsify()}</span>)}  
      </div>
    </>)
  } render() {
    return (<div style={{height: '100%'}}>
      <div className="categories" style={{backgroundColor: ['#353331', '#ffffff', '#ffffff'][this.state.lyr], direction: 'ltr', borderTop: `1px solid ${['rgb(47, 39, 49)', '#fff9fa', '#fff9fa'][this.state.lyr]}`, height: '100%'}}>
        <span style={{display: 'inline-block', position: 'absolute', color: ['white', '#343727', '#343727'][this.state.lyr], fontSize: '.85em', fontWeight: 500, left: 54, bottom: 106, zIndex: 599}}>امکانات</span>
        <span style={{display: 'inline-block', position: 'absolute', color: ['white', '#343727', '#343727'][this.state.lyr], fontSize: '.85em', fontWeight: 500, left: 1, bottom: 75, zIndex: 599}}>خاص</span>
        <span style={{display: 'inline-block', position: 'absolute', color: ['white', '#343727', '#343727'][this.state.lyr], fontSize: '.85em', fontWeight: 500, left: 16, bottom: 0, zIndex: 599}}>دسترسی</span>
        <span style={{display: 'inline-block', position: 'absolute', color: ['white', '#343727', '#343727'][this.state.lyr], fontSize: '.85em', fontWeight: 500, left: 122, bottom: 76, zIndex: 599}}>اقتصادی</span>
        <span style={{display: 'inline-block', position: 'absolute', color: ['white', '#343727', '#343727'][this.state.lyr], fontSize: '.85em', fontWeight: 500, left: 90, bottom: 0, zIndex: 599}}>ظرفیت</span>
        <svg height="99" width="99" style={{backgroundImage: ['linear-gradient(to left, #35333120, #353331f0 14%)', 'linear-gradient(to left, white, white 14%)', 'linear-gradient(to left, white, white 14%)'][this.state.lyr], marginBottom: -10, position: 'relative', top: 9, left: 26, zIndex: 598}}>
          <polygon points={`${maxStat[0][0] + cStat[0]} ${maxStat[0][1] + cStat[1]},${maxStat[1][0] + cStat[0]} ${maxStat[1][1] + cStat[1]},${maxStat[2][0] + cStat[0]} ${maxStat[2][1] + cStat[1]},${maxStat[3][0] + cStat[0]} ${maxStat[3][1] + cStat[1]},${maxStat[4][0] + cStat[0]} ${maxStat[4][1] + cStat[1]}`} stroke={["rgba(200, 100, 89, .8)", '#c41a2f', '#c41a2f'][this.state.lyr]} fill={['#353331', '#ffffff', '#ffffff'][this.state.lyr]} stroke-width="1" />
          {this.state.properties.length && <polygon points={`${maxStat[0][0] * this.state.properties[this.state.property].stat[0] + cStat[0]} ${maxStat[0][1] * this.state.properties[this.state.property].stat[0] + cStat[1]},${maxStat[1][0] * this.state.properties[this.state.property].stat[1] + cStat[0]} ${maxStat[1][1] * this.state.properties[this.state.property].stat[1] + cStat[1]},${maxStat[2][0] * this.state.properties[this.state.property].stat[2] + cStat[0]} ${maxStat[2][1] * this.state.properties[this.state.property].stat[2] + cStat[1]},${maxStat[3][0] * this.state.properties[this.state.property].stat[3] + cStat[0]} ${maxStat[3][1] * this.state.properties[this.state.property].stat[3] + cStat[1]},${maxStat[4][0] * this.state.properties[this.state.property].stat[4] + cStat[0]} ${maxStat[4][1] * this.state.properties[this.state.property].stat[4] + cStat[1]}`} stroke={["rgba(200, 200, 200, .8)", "rgba(100, 100, 100, .8)", "rgba(100, 100, 100, .8)"][this.state.lyr]} fill="rgba(255, 255, 255, .1)" stroke-width="1" />}
          <line x1={maxStat[0][0] + cStat[0]} y1={maxStat[0][1] + cStat[1]} x2={cStat[0]} y2={cStat[1]} style={{stroke: 'rgba(200, 100, 89, .8)', strokeWidth: 1, strokeDasharray: '5,5'}} />
          <line x1={maxStat[1][0] + cStat[0]} y1={maxStat[1][1] + cStat[1]} x2={cStat[0]} y2={cStat[1]} style={{stroke: 'rgba(200, 100, 89, .8)', strokeWidth: 1, strokeDasharray: '5,5'}} />
          <line x1={maxStat[2][0] + cStat[0]} y1={maxStat[2][1] + cStat[1]} x2={cStat[0]} y2={cStat[1]} style={{stroke: 'rgba(200, 100, 89, .8)', strokeWidth: 1, strokeDasharray: '5,5'}} />
          <line x1={maxStat[3][0] + cStat[0]} y1={maxStat[3][1] + cStat[1]} x2={cStat[0]} y2={cStat[1]} style={{stroke: 'rgba(200, 100, 89, .8)', strokeWidth: 1, strokeDasharray: '5,5'}} />
          <line x1={maxStat[4][0] + cStat[0]} y1={maxStat[4][1] + cStat[1]} x2={cStat[0]} y2={cStat[1]} style={{stroke: 'rgba(200, 100, 89, .8)', strokeWidth: 1, strokeDasharray: '5,5'}} />
        </svg>
        {/* <div className="categories scroll" style={{width: 'calc(100% - 107px)', marginLeft: 107, display: 'flex', flexDirection: 'row', overflowX: 'auto', paddingTop: 3, paddingBottom: 4, paddingLeft: 3, paddingRight: 3, direction: 'rtl', position: 'absolute', bottom: 0}}>
          {[...new Set(this.state.properties.map(pr => pr.category))].map((category, idx) => <span className="touchable" style={{fontSize: '.88em', display: 'inline-block', width: 'auto', margin: 4, padding: 10, paddingLeft: 22, paddingRight: 22, lineHeight: '14px', backgroundColor: 'rgba(89, 89, 89, 0.75)', borderRadius: 7 + 27, color: 'rgba(247, 253, 255, .95)', borderStyle: 'solid', borderWidth: 2, borderColor: this.state.category == category ? '#ab5a51' : '#636063'}} onClick={() => {this.setState({category: category})}}>{category}</span>)}
        </div> */}
        <div style={{position: 'absolute', right: 0, bottom: 111, zIndex: 699, direction: 'rtl'}}>
          <svg onClick={() => {if(this.state.property == this.state.properties.length - 1) return; this.setState({property: this.state.property + 1}, () => {map.panTo(new L.LatLng(...this.state.properties[this.state.property].location), {animate: true, duration: .3, easeLinearity: .9});})}} class="touchable" style={{opacity: this.state.property == this.state.properties.length - 1 ? .6 : 1, backgroundColor: ["rgba(200, 100, 89, .8)", '#c41a2f', '#c41a2f'][this.state.lyr], display: 'inline-block', width: 30, height: 30, borderRadius: 15, verticalAlign: 'middle', marginRight: 5}}><polygon points="11 10, 11 20, 20, 15" stroke="rgba(200, 100, 89, .5)" fill="white" stroke-width="1" /></svg>
          <svg onClick={() => {if(this.state.property == 0) return; this.setState({property: this.state.property - 1}, () => {map.panTo(new L.LatLng(...this.state.properties[this.state.property].location), {animate: true, duration: .3, easeLinearity: .9});})}} class="touchable" style={{opacity: this.state.property == 0 ? .6 : 1, backgroundColor: ["rgba(200, 100, 89, .8)", '#c41a2f', '#c41a2f'][this.state.lyr], display: 'inline-block', width: 30, height: 30, borderRadius: 15, verticalAlign: 'middle', marginRight: 6}}><polygon points="19 10, 19 20, 10, 15" stroke="rgba(200, 100, 89, .5)" fill="white" stroke-width="1" /></svg>
          <span class="touchable" style={{backgroundColor: ["rgba(200, 100, 89, .8)", '#c41a2f', '#c41a2f'][this.state.lyr], display: 'inline-block', color: 'white', height: 28, borderRadius: 15, verticalAlign: 'middle', paddingLeft: 8, paddingRight: 10, marginRight: 6}} onClick={() => {this.setState({calendared: true})}}>تقویم</span>
          <span class="touchable" style={{backgroundColor: ["rgba(200, 100, 89, .8)", '#c41a2f', '#c41a2f'][this.state.lyr], display: 'inline-block', color: 'white', height: 28, borderRadius: 15, verticalAlign: 'middle', paddingLeft: 8, paddingRight: 10, marginRight: 6}} onClick={async () => {let stat = (this.state.stat + 1) % 5; this.setState({stat: stat, property: 0, properties: this.state.properties.sort((p0, p1) => p1.stat[stat] - p0.stat[stat])}, () => {map.panTo(new L.LatLng(...this.state.properties[this.state.property].location), {animate: true, duration: .3, easeLinearity: .9})})}}>{['پرامکانات‌ترین', 'اقتصادی‌ترین', 'جادارترین', 'پردسترس‌ترین', 'خاص‌ترین', ][this.state.stat]}</span>
          <svg onClick={() => this.setState({categoryShow: !this.state.categoryShow}, () => {if (this.state.categoryShow) window.history.pushState({}, '')})} class="touchable" style={{backgroundColor: ["rgba(200, 100, 89, .8)", '#c41a2f', '#c41a2f'][this.state.lyr], display: 'inline-block', width: 30, height: 30, borderRadius: 15, verticalAlign: 'middle', marginRight: 6, paddingLeft: 2, paddingTop: 3}}><path fill="white" d="M15.278 20.72a3.086 3.086 0 0 1-.621-.9H8.409a2.706 2.706 0 0 1-2.7-2.7V8.267a3 3 0 0 1 .895-5.865 3 3 0 0 1 .908 5.859v1.951h7.025a2.99 2.99 0 1 1 .006 1.8H7.512v5.106a.9.9 0 0 0 .9.9h6.047a3 3 0 1 1 .822 2.7Zm.922-2.121a1.2 1.2 0 1 0 1.2-1.2 1.2 1.2 0 0 0-1.2 1.197Zm0-7.5a1.2 1.2 0 1 0 1.2-1.2 1.2 1.2 0 0 0-1.2 1.197Zm-10.8-5.7a1.2 1.2 0 1 0 1.2-1.2 1.2 1.2 0 0 0-1.2 1.197Z" data-name="Path 3355"/></svg>
        </div>
        <div style={{position: 'absolute', right: 8, bottom: 81, color: ['#edf3f5', '#545747', '#545747'][this.state.lyr], fontSize: '1.02em'}}>{this.state.properties.length ? this.state.properties[this.state.property].title : '-'}</div>
        <div style={{position: 'absolute', right: 8, bottom: 48, color: ['#edf3f5', '#545747', '#545747'][this.state.lyr], fontSize: '.92em', fontWeight: 500}}><span style={{display: 'inline-block', marginRight: 2}}>تومان</span>{(this.state.properties.length ? String(this.state.properties[this.state.property].price) : '-').replace(/(\d)(?=(\d{3})+$)/g, '$1,').farsify()}</div>
      </div> <div style={{opacity: '98%', position: 'fixed', right: 5, top: 4, minHeight: 46, width: 46, borderRadius: 16, zIndex: 798, backgroundColor: '#ffffff', overflow: 'hidden', padding: 3, paddingBottom: 0, cursor: 'pointer', textAlign: 'center'}}>
        <svg style={{width: 36, height: 36, fill: '#3a3a3a', padding: 5, position: 'relative', left: 1, top: 4}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); this.setState({searchExpand: true}, () => {window.history.pushState({}, '')})}}>
          <use xlinkHref="#searchSearch">
            <symbol id="searchSearch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M10.5 18a7.5 7.5 0 115.973-2.963l4.369 4.246-1.394 1.434-4.387-4.263A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" clip-rule="evenodd"></path>
            </symbol>
          </use>
        </svg>
      </div> <div style={{opacity: '98%', position: 'fixed', right: 5, top: 58, minHeight: 46, width: 46, borderRadius: 16, zIndex: 798, backgroundColor: '#ffffff', overflow: 'hidden', padding: 3, paddingBottom: 0, cursor: 'pointer', height: this.state.expand_lyr ? 'auto' : 46}}>
        <div style={{width: 40, height: 40, borderRadius: 14, overflow: 'hidden', position: 'relative', backgroundImage: `url(/static/icon/${window.lyrs[this.state.lyr][0]}.png)`, backgroundSize: 'cover', backgroundPosition: '50% 50%'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) this.setState({expand_lyr: !this.state.expand_lyr})}}/>
        <div style={{fontSize: '.7em', fontWeight: 500, textAlign: 'center', marginTop: -2, marginBottom: 2}}>{window.lyrs[this.state.lyr][1]}</div>
        <div style={{width: 40, height: 40, borderRadius: 14, overflow: 'hidden', position: 'relative', backgroundImage: `url(/static/icon/${this.state.lyr == 0 ? window.lyrs[1][0] : window.lyrs[0][0]}.png)`, backgroundSize: 'cover', backgroundPosition: '50% 50%'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) {window.lyr.setUrl(window.lyrs[this.state.lyr == 0 ? 1 : 0][2]); this.setState({lyr: this.state.lyr == 0 ? 1 : 0, expand_lyr: false})}}}/>
        <div style={{fontSize: '.7em', fontWeight: 500, textAlign: 'center', marginTop: -2, marginBottom: 2}}>{this.state.lyr == 0 ? window.lyrs[1][1] : window.lyrs[0][1]}</div>
        <div style={{width: 40, height: 40, borderRadius: 14, overflow: 'hidden', position: 'relative', backgroundImage: `url(/static/icon/${this.state.lyr == 2 ? window.lyrs[1][0] : window.lyrs[2][0]}.png)`, backgroundSize: 'cover', backgroundPosition: '50% 50%'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) {window.lyr.setUrl(window.lyrs[this.state.lyr == 2 ? 1 : 2][2]); this.setState({lyr: this.state.lyr == 2 ? 1 : 2, expand_lyr: false})}}}/>
        <div style={{fontSize: '.7em', fontWeight: 500, textAlign: 'center', marginTop: -2, marginBottom: 0}}>{this.state.lyr == 2 ? window.lyrs[1][1] : window.lyrs[2][1]}</div>
      </div> {this.state.searchExpand && <div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 899, backgroundColor: '#1111126A', padding: 14}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) this.setState({ordered: false})}}>
        <div className="scroll" style={{height: '100%', backgroundColor: 'white', borderRadius: 16, direction: 'rtl', overflowY: 'scroll'}}>
          <input class="none" style={{'-webkit-appearance': 'none', outline: 'none', display: 'block', width: '100%', borderRadius: 10, borderWidth: 0, borderColor: 'white', lineHeight: '1.6em', fontSize: '1.3em', padding: '.4em', direction: 'rtl', color: '#343747'}} autoFocus type="text" name="search-input" placeholder="جستجو" autocomplete="off" value={this.state.searchInput} onBlur={() => {history.back()}} onChange={async (e) => {this.setState({searchInput: e.target.value})}} onKeyPress={async (e) => {if(e.key === 'Enter') {
            this.setState({searchInput: '', searchExpand: false})
          }}}/>
        </div>
      </div>} {this.state.landing && <div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 799, padding: 14, backgroundColor: '#1111126A'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) this.setState({landing: false})}}>
        <div ref={(elem) => {window.show = elem;}} className="scroll" style={{backgroundColor: 'white', borderRadius: 16, direction: 'rtl', overflowY: 'scroll'}}>
          <div style={{flexShrink: 0, display: 'inline-block', backgroundImage: 'url(/static/icon/hotel.webp)', backgroundSize: 'cover', backgroundPosition: 'center', height: 200, width: '100%'}}>
            <div style={{marginTop: 'calc(25% - 1.6rem + 10px)', fontSize: '1.6rem', paddingRight: '.9rem', paddingLeft: '.9rem', color: '#fff', whiteSpace: 'pre-line'}}> لذت تجربه ویلای هوشمند و سلف سرویس </div>
          </div>
          <div style={{paddingRight: '.9rem', paddingLeft: '.9rem'}}><span style={{display: 'inline-block', width: 6, height: 6, backgroundColor: 'black', borderRadius: 6, marginLeft: 6}}></span>در جالوس نوشیدنی سرد و گرم ۲۴ساعته و صبحانه به‌صورت مجانی سرو می‌شود</div>
          <div style={{paddingRight: '.9rem', paddingLeft: '.9rem'}}><span style={{display: 'inline-block', width: 6, height: 6, backgroundColor: 'black', borderRadius: 6, marginLeft: 6}}></span>دستیار صوتی جالوس بهترین تجربه اسکان را برایتان فراهم می‌آورد</div>
          <div style={{paddingRight: '.9rem', paddingLeft: '.9rem'}}><span style={{display: 'inline-block', width: 6, height: 6, backgroundColor: 'black', borderRadius: 6, marginLeft: 6}}></span>{'درتقویم تاریخ سفرتان را انتخاب کنید > در نقشه به جست و جو بپردازید > باانتخاب گزینه رزرو و پرداخت مبلغ کلید وای‌فای تان را دریافت کنید'}</div>
          <div className="touchable" style={{padding: '13px 14px 15px 14px', color: 'white', backgroundColor: '#e31025', textAlign: 'center', fontWeight: 700, borderRadius: 12, fontSize: '1.02em', margin: 9}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); this.setState({landing: false})}}>{'بستن'}</div>
        </div>
      </div>} {!this.state.show.isEmpty() && <div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 799, padding: 14, backgroundColor: '#1111126A'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if (this.state.ordered) return; if(e.target === e.currentTarget) history.back() }}>
        <div ref={(elem) => {window.show = elem;}} className="scroll" style={{height: '100%', backgroundColor: 'white', borderRadius: 16, direction: 'rtl', overflowY: 'scroll'}}>
          <div style={{paddingRight: '1em', direction: 'rtl', }}>
            <div>
              <span class={this.state.ordered ? "bold" : "bold touchable"} style={{left: 'calc(0px)', top: '12px', position: 'relative', display: 'inline-block', transform: 'rotate(45deg)', fontSize: '1.05em', padding: 8, paddingBottom: 3, color: '#bb2d3b', opacity: this.state.ordered ? .6 : 1}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if (this.state.ordered) return; history.back()}}>+</span>
              <span class="bold touchable" style={{left: 'calc(8px)', top: '10px', position: 'relative', display: 'inline-block', fontSize: '.95em', padding: 8, paddingBottom: 3, color: '#bb2d3b', float: 'left'}} onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); window.show.scrollTo(0, window.show.scrollHeight);}}>{this.state.ordered ? 'لغو' : 'سفارش'}</span>
            </div>
          </div>
          <div style={{marginTop: '1.05em', display: 'flex', flexDirection: 'row', overflowX: 'auto', direction: 'rtl'}}>{ this.state.show.images.map((im) => <div style={{flexShrink: 0, display: 'inline-block', backgroundImage: `url(/static/properties/${im})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 200, width: '100%'}}/>)}</div>
          <div style={{fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.5, paddingTop: '.8em', paddingBottom: '.9em', paddingRight: '.75em'}}>{this.state.show.title}</div>
          <div style={{height: '2em', paddingLeft: '1.2em', paddingRight: '1.8em', paddingBottom: '.5em'}}><a style={{textDecoration: 'none' ,float: 'left', color: '#343747', fontWeight: 500, cursor: 'pointer'}} onClick={() => {window.open(`tel:${this.state.show.phone}`, '_self')}}>{this.state.show.phone.farsify()}</a><div style={{float: 'right'}}>تماس</div></div>
          {'options' in this.state.show && (<div style={{display: 'flex', flexFlow: 'row wrap'}}>
            {Object.keys(this.state.show.options).map(k => (<div className="column" style={{flexGrow: 1, color: 'rgba(0,0,0,.87)', display: 'flex', flexDirection: 'column', flexBasis: '33.333%', padding: '16px 0', position: 'relative', textAlign: 'center'}}>
              <span style={{color: 'rgba(0,0,0,.56)', marginBottom: '4px', fontSize: '.875rem'}}>{k}</span>
              <span style={{fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.5, }}>{this.state.show.options[k].farsify()}</span>
            </div>))}
          </div>)} <hr className="divider"/> 
          {'rows' in this.state.show  && Object.keys(this.state.show.rows).map(k => (<><div style={{fontSize: '1rem', whiteSpace: 'nowrap', color: 'rgba(0,0,0,.56)', display: 'flex', justifyContent: 'space-between', lineHeight: 2, padding: '8px .7em'}}>
            <div style={{minWidth: '20%', flex: '1 1', alignItems: 'flex-start', display: 'flex'}}>
              <p style={{margin: 0, color: 'rgba(0,0,0,.56)', lineHeight: 2, overflow: 'hidden', textOverflow: 'ellipsis'}}>{k}</p>
            </div>
            <div style={{flex: '1 1', marginRight: '16px', minWidth: 'calc(50% - 16px)', alignItems: 'flex-end', display: 'flex', justifyContent: 'flex-end'}}>
              <p style={{margin: 0, color: 'rgba(0,0,0,.87)', lineHeight: 2, overflow: 'hidden', textOverflow: 'ellipsis'}}>{this.state.show.rows[k].farsify()}</p>
            </div>
          </div><hr className="divider"/></>))}
          {'features' in this.state.show && (<div style={{display: 'flex', flexFlow: 'row wrap'}}>
            {Object.keys(this.state.show.features).map(k => (<div className="column" style={{flexGrow: 1, color: this.state.show.features[k] ? 'rgba(0,0,0,.87)' : 'rgba(0,0,0,.32)', display: 'flex', flexDirection: 'column', flexBasis: '33.333%', padding: '16px 0', position: 'relative', textAlign: 'center'}}>
              {k in icons ? (<i className={icons[k]} style={{marginBottom: '4px', width: '100%', fontSize: '1.5rem', height: '24px', textRendering: 'auto', backgroundPosition: '50%', backgroundSize: 'contain', display: 'inline-block', fontFamily: 'sonnat', lineHeight: 1, fontStyle: 'normal'}}></i>) : (<span style={{color: 'rgba(0,0,0,.56)', marginBottom: '4px', fontSize: '.875rem'}}>{k}</span>)}
              <span style={{fontSize: '1.125rem', fontWeight: this.state.show.features[k] ? 500 : 400, lineHeight: 1.5, }}>{k}{!this.state.show.features[k] && ' ندارد'}</span>
            </div>))}
          </div>)}
          <div classNmae={'p'}>{this.state.show.description}</div>
          {/*<span>{'category' in this.state.show && this.state.show.category}</span> - <span>{'id' in this.state.show && this.state.show.id}</span>*/}
          {/*<div>{'subtitle' in this.state.show && this.state.show.subtitle}</div>*/}
          {this.calendar()}
          {this.state.ordered ? <>
            <div className="touchable" style={{padding: '16px 14px 12px 14px', margin: '10px 10px', color: '#343747', backgroundColor: 'rgb(240, 233, 236)', textAlign: 'center', fontWeight: 700, borderRadius: 12, fontSize: '1.03em', direction: 'ltr'}}>{String(this.state.show.cart).slice(0, 4)} . {String(this.state.show.cart).slice(4, 8)} . {String(this.state.show.cart).slice(8, 12)} . {String(this.state.show.cart).slice(12, 16)}</div>
            <div style={{fontSize: '1.1rem', paddingRight: '.9rem', paddingLeft: '.9rem', textAlign: 'justify',  textJustify: 'inter-word', lineHeight: 2, color: 'rgba(0,0,0,.87)', whiteSpace: 'pre-line'}}>مبلغ <span style={{backgroundColor: '#e3e3e3', borderRadius: 10, padding: '2px 12px', color: '#e31025', fontWeight: 500}}>{((this.state.show.price * (Math.round((new Date(...jDate.jalaliToGregorian(...this.state.calendar[this.state.calendarRange[1]])) - new Date(...jDate.jalaliToGregorian(...this.state.calendar[this.state.calendarRange[0]]))) / (1000 * 60 * 60 * 24)) + 1) + parseInt(this.state.phone.substr(this.state.phone.length - 2))) + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,').farsify()}</span> تومان را به صورت دقیق به شماره حساب بالا واریز کنید. دقت کنید که رقم یکان و دهگان مبلغ برای رهگیری در فرایند سایت ایجاد شده است.  این مازاد برای کمک به بی‌سرپرستان صرف می‌گردد. به‌محض دریافت پیامک واریز، لینک کلید دیجیتالی اسکان هوشمند برای‌شما ارسال می‌گردد.</div>
          </> : <div style={{fontSize: '1.1rem', paddingRight: '.9rem', paddingLeft: '.9rem', textAlign: 'justify',  textJustify: 'inter-word', lineHeight: 2, color: 'rgba(0,0,0,.87)', whiteSpace: 'pre-line'}}> از زمان‌های موجود بازه زمانی خودرا انتخاب کنید</div>}
          <div class={this.state.calendarRange[0] === -1 && !this.state.ordered ? "" : "touchable"} style={{padding: '13px 14px 15px 14px', margin: '10px 10px', color: 'white', backgroundColor: '#e31025', textAlign: 'center', fontWeight: 700, borderRadius: 12, fontSize: '1.02em', opacity: this.state.calendarRange[0] === -1 && !this.state.ordered ? .6 : 1}} onClick={async (e) => { 
            if (this.state.calendarRange[0] === -1 && !this.state.ordered) return; this.setState({ordered: !this.state.ordered}, async () => { window.show.scrollTo(0, window.show.scrollHeight); if (this.state.ordered) { 
              let r = await fetch(`/key/${this.state.show.id}/${this.state.show.sms}/${jDate.jalaliToGregorian(...this.state.calendar[this.state.calendarRange[0]]).join('-')}/${jDate.jalaliToGregorian(...this.state.calendar[this.state.calendarRange[1]]).join('-')}/${(this.state.show.price * (Math.round((new Date(...jDate.jalaliToGregorian(...this.state.calendar[this.state.calendarRange[1]])) - new Date(...jDate.jalaliToGregorian(...this.state.calendar[this.state.calendarRange[0]]))) / (1000 * 60 * 60 * 24)) + 1) + parseInt(this.state.phone.substr(this.state.phone.length - 2)))}`, {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': this.state.session}}); if (r.status >= 300 || !(await r.json()).OK) ; //this.setState({ordered: !this.state.ordered});
            } else { let r = await fetch(`/key/${this.state.show.id}`, {method: 'DELETE', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': this.state.session}}); if (r.status < 300) {r = await r.json(); if (r.OK) this.setState({calendarRange: [-1, -1]}); else this.setState({ordered: !this.state.ordered})}}})}}>{this.state.ordered ? 'لغو' : 'سفارش'}</div>
        </div>
      </div>} {this.state.ordered && (!this.state.session || !this.state.phone) && <div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 899, padding: '32% 12%', backgroundColor: '#1111126A'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) this.setState({ordered: false})}}>
        <div className="scroll" style={{backgroundColor: 'white', borderRadius: 16, direction: 'rtl', overflowY: 'scroll', padding: 9}}>
          {this.state.otp ? <div classNmae={'p'} style={{margin: '-1px 3px 8px 3px'}}>کد تأیید را وارد کنید</div> : <div classNmae={'p'} style={{margin: '-1px 3px 8px 3px'}}>برای استفاده از امکانات جالوس، لطفاً شمارهٔ موبایل خود را وارد کنید. کد تأیید به این شماره پیامک خواهد شد.</div>}
          <input placeHolder="موبایل" style={{display: 'block', width: '100%', borderRadius: 10, borderWidth: 1, marginBottom: 10, borderColor: '#e31025d4', lineHeight: '1.6em', fontSize: '1.3em', padding: '.4em', direction: 'ltr', color: '#343747'}} onChange={(e) => {this.setState({phone: e.target.value})}}/>
          {this.state.otp ? <input placeHolder="کد تأیید ۴ رقمی" style={{display: 'block', width: '100%', borderRadius: 10, borderWidth: 1, borderColor: '#e31025d4', lineHeight: '1.6em', fontSize: '1.3em', padding: '.4em', direction: 'ltr', color: '#343747'}} onChange={async (e) => {if (e.target.value.length == 4) {let r = await fetch(`/otp/${this.state.phone.trim().deFarsify()}/${e.target.value.trim().deFarsify()}`); if (r.status < 300) {r = await r.json(); if (r.OK) { 
            setCookie('session', r.session); setCookie('phone', this.state.phone); this.setState({session: r.session}, async () => {if (!this.state.show.isEmpty() && this.state.ordered && this.state.calendarRange[0] != -1) {let r = await fetch(`/key/${this.state.show.id}/_/${this.state.calendar[this.state.calendarRange[0]].join('-')}/${this.state.calendar[this.state.calendarRange[1]].join('-')}`, {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': this.state.session}}); if (r.status >= 300 || !(await r.json()).OK) this.setState({ordered: !this.state.ordered})}})}}}}}/>
          : <div className="touchable" style={{padding: '13px 14px 15px 14px', color: 'white', backgroundColor: '#e31025', textAlign: 'center', fontWeight: 700, borderRadius: 12, fontSize: '1.02em'}} onClick={async (e) => {let r = await fetch(`/otp/${this.state.phone.trim().deFarsify()}/`); if (r.status < 300) {if (!this.state.phone) return; r = await r.json(); this.setState({otp: true}); }}}>{'ارسال پیامک'}</div>}
        </div>
      </div>} {this.state.calendared && <div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 898, padding: 14, paddingTop: '50%', backgroundColor: '#1111126A'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) this.setState({calendared: false})}}>
        <div className="scroll" style={{backgroundColor: 'white', borderRadius: 16, direction: 'rtl', overflowY: 'scroll', padding: 0}}>
          {this.calendar()}
          <div style={{fontSize: '1.1rem', paddingRight: '.9rem', paddingLeft: '.9rem', textAlign: 'justify',  textJustify: 'inter-word', lineHeight: 2, color: 'rgba(0,0,0,.87)', whiteSpace: 'pre-line'}}>با اعمال تقویم اسکان‌های خالی در بازه انتخاب شده نمایان می‌شوند</div>
          <div className="touchable" style={{padding: '13px 14px 15px 14px', color: 'white', backgroundColor: '#e31025', textAlign: 'center', fontWeight: 700, borderRadius: 12, fontSize: '1.02em', margin: 9}} onClick={() => {this.setState({calendared: false})}}>{'اعمال'}</div>
        </div>
      </div>} {this.state.categoryShow && <div style={{direction: 'rtl', fontSize: '.8em', position: 'fixed', bottom: 145, right: 6, zIndex: 999, overflow: 'hidden', width: 115, backgroundColor: ['#353331', '#ffffff', '#ffffff'][this.state.lyr], borderRadius: 10, border: '1px solid', borderColor: ['#343332', '#d4d4d4', '#d4d4d4'][this.state.lyr], boxShadow: ['0 0 1px 1px #353331', '0 0 1px 1px #ededed', '0 0 1px 1px #ededed'][this.state.lyr]}}>
        <input autoFocus style={{height: 0, position: 'absolute', margin: 0, border: 'none', marginTop: -6}} onBlur={() => {setTimeout(() => {this.setState({categoryShow: false})}, 200)}}/>
        {this.state.categories.map((c, ci) => <div class="touchable" style={{fontWeight: 400, lineHeight: 2.1, color: ['#ffffff', '#656971', '#656971'][this.state.lyr], paddingRight: 6}} onClick={async () => {if('action' in c) await c.action(); this.setState({category: ci, categoryShow: false})}}>{c.title}</div>)}
      </div>}
    </div>)
  }
}