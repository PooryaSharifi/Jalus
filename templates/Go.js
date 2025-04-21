/** #title جالوس رو #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {menuHeight: 108, ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
      {title: 'تازه‌ترین یادداشت', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین تبلیغ', action: async () => {this.state.order = '!pan_date'; await this.search()}}, {title: 'تازه‌ترین مچ', action: async () => {this.state.order = '!last_match_date'; await this.search()}}, 
    ], secondMenuList: [
      {title: 'تازه‌ترین الف'}, {title: 'تازه‌ترین ب'}, {title: 'تازه‌ترین پ'}, 
    ], slide: 3, slides: [
      {webp: '/static/slides/Go_Asphalt.webp', 
      jpeg: '/static/slides/Go_Asphalt-80.jpg',
      title: 'بوکینگ هوشند', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Go_Convert.webp',
      jpeg: '/static/slides/Go_Convert-80.jpg',
      title: 'ویلای پنج ستاره !!', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Go_Garden.webp',
      jpeg: '/static/slides/Go_Garden-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Go_Grass.webp',
      jpeg: '/static/slides/Go_Grass-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'host'}},
    ], category: -1, categoryShow: false, categories: [
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
      {href: '/users?category=infinity', title: 'وییو ابدی',
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
    ], products: [
      {title: "جالوس هوشمند", href: '/home',
      png: '/static/icon/jalus_app_phone-8.png'},
      {title: "کلید بلاکچین", href: '/host#key',
      png: '/static/icon/jalus_app_key-8.png'},
      {title: "جالوس املاک", href: '/estate',
      png: '/static/icon/jalus_app_plus.png'},
      {title: "حراج تابستانی", href: '/users',
      png: '/static/icon/jalus_app_off.jpg'},
      {title: "جالوس اسکان", href: '/properties',
      png: '/static/icon/jalus_app_tent-8.png'},
      {title: "اسکان لحظه‌آخری", href: '/users?date=1',
      png: '/static/icon/jalus_app_lastsecond-8.png'},
      {title: "سازه دومنظوره", href: '/dual',
      png: '/static/icon/jalus_app_dual-8.png'},
      {title: "خانه سبز", href: '/dual',
      png: '/static/icon/jalus_app_wind.webp'},
    ], article: -1, articles: [
      {title: "همه چیز درباره‌ی خدمات ویلاهای دربستی", jpeg: '/static/articles/private_villa.0.jpg', body: [
        ['img', '/static/articles/private_villa.0.jpg'], ['h2', 'سلام'], ['p', 'سلام بامرام'],
        ['h2', 'بای'], ['p', 'بای بای ']
      ]}, {title: "بهترین شرایط سفر به شمال", jpeg: '/static/articles/best_trip_condition.0.jpg', body: [
        ['img', '/static/articles/private_villa.0.jpg'], ['h2', 'سلام'], ['p', 'سلام بامرام'],
        ['h2', 'بای'], ['p', 'بای بای ']
      ]}, {title: "راهنمای تور سفر نقاط گیلان و مازندران ", jpeg: '/static/articles/north_guide.0.webp', body: [
        ['img', '/static/articles/private_villa.0.jpg'], ['h2', 'سلام'], ['p', 'سلام بامرام'],
        ['h2', 'بای'], ['p', 'بای بای ']
      ]}, {title: "کمپینگ ایمن بادست خالی در شمال", jpeg: '/static/articles/camping.0.jpg', body: [
        ['img', '/static/articles/private_villa.0.jpg'], ['h2', 'سلام'], ['p', 'سلام بامرام'],
        ['h2', 'بای'], ['p', 'بای بای ']
      ]},
    ], stories: [], offers: [], foot_logos: [
      {svg: '/static/icon/jalus_host.svg', href: '/host'}, {svg: '/static/icon/jalus_rebuild.svg', href: '/rebuild'},
      {svg: '/static/icon/jalus_dual.svg', href: '/greenhome'}, {svg: '/static/icon/jalus_key.svg', href: '/host#smartkey'},
      {svg: '/static/icon/jalus_pay.svg', href: '/host#payment'}, {svg: '/static/icon/jalus_service.svg', href: '/'},
      {svg: '/static/icon/jalus_club.svg', href: '/'}, {svg: '/static/icon/jalus_smart.svg', href: '/host#all'}
    ], potent: false, potentOtp: '', otp: false, potentPhone: '', potentInterest: '', plyr: true, searchInput: '', searchExpand: false, footExpand: false, rows: 5, trans: true, background: 0, microwave: 0, foods: {bread: {img: 0}, pizza: {img: 0}, rice: {img: 0}, fries: {img: 0}, chicken_bbq: {img: 0}, kebab: {img: 0}, falafel: {img: 0}}};
  } async componentDidMount() { let app = this;
    let stories = await fetch('http://localhost:5000/stories/go'); if (stories.status < 300) {
      stories = await stories.json(); app.setState({stories: Object.keys(stories).map((story) => ({title: story.split('_')[1], jpeg: '/stories/' + story + '.jpg', href: story, resolutions: stories[story][0], ccs: stories[story][1], markers: stories[story][2]}))})
    } let offers = await fetch('/properties/', {body: JSON.stringify({offer: {$gte: 5}}), method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}); if (offers.status < 300) {
      let offer_nt = 7, offer_avg = 0; offers = await offers.json(); offers = offers.sort(() => Math.random() - 0.5);
      for (var i = 0; i < offers.length; i ++) offer_avg += offers[i].offer;
      offer_avg /= offers.length; offers = offers.filter((offer => offer.offer >= offer_avg && offer_nt -- > 0)); this.setState({offers: offers})
    }
    setInterval(function() {app.setState({slide: (app.state.slide + 1) % app.state.slides.length});}, 7000);
    window.Y = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener("scroll", () => {
      window.NY = window.pageYOffset || document.documentElement.scrollTop;
      if (window.NY > window.Y) this.setState({menuHeight: 68})
      else this.setState({menuHeight: 108})
      window.Y = window.NY;
    })
  } render() { let app = this;
    return <div>
      {this.state.potent ? ({/* #macro modules/potent */}) : (<>
        {/* #macro modules/menu */}
        <div style={{height: 105}}></div>
        {/* #macro modules/story */}
        {/* #macro modules/slider */}
        {this.state.article == -1 ? <div style={{maxWidth: 960, paddingBottom: 20}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
          <h1 style={{textAlign: 'center', fontSize: '4em', fontWeight: 700, paddingTop: 20, paddingBottom: 15}}>جالوس رو</h1>
          <div class="w-full">
            <div class="relative flex justify-center items-center w-full h-full max-w-[1336px] mx-auto rounded-none sm:rounded-3xl overflow-hidden xs:mt-0">
              <picture class="w-full h-auto rounded-none sm:rounded-3xl overflow-hidden ">
                <source media="(min-width: 768px)" srcset="/static/slides/Go_Convert.webp"/>
                <img alt="" fetchpriority="high" width="1350" height="270" decoding="async" style={{color: 'transparent'}} sizes="100vw" src="/static/slides/Go_Convert-80.jpg" class="w-full h-auto xl:object-cover"/>
              </picture>
            </div>
          </div>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}></h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>
          لذت تجربه راندن وسیله برقی در هوای معتدل ودر طبیعت بکر شمالی و یا ماسه های ساحلی می تواند کیفیت هر سفری را افزایش دهد.
          </p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>کلید امن برای همه</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>
          همچنین به دلیل سهولت استفاده از آن در خرید ها و مسیر های کوتاه و متوسط بسیار پرکاربر و مفرح است.
داشتن آن برای سرگرم کردن فرزندتان می تواند کام آن ها را بسیار شیرین کند.
          </p>
          <span style={{backgroundColor: '#343747', borderRadius: 999, color: '#fdfdfd', padding: 6, paddingLeft: 12, paddingRight: 12, fontSize: '1.85em', position: 'relative', top: 15, cursor: 'pointer'}} onClick={() => {this.setState({potent: true, potentInterest: 'host'})}}>برای شروع همکاری وارد شوید</span>
        </div> : <div style={{maxWidth: 768, paddingBottom: 20}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
          <h1 id="article" style={{textAlign: 'center', fontSize: '4em', fontWeight: 700, paddingTop: 20, paddingBottom: 15}}>{this.state.articles[this.state.article].title}</h1>
          {this.state.articles[this.state.article].body.map(e => e[0] == 'h2' ? <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>{e[1]}</h2> : (e[0] == 'p' ? <p style={{fontSize: '1.85em', textAlign: 'justify'}}>{e[1]}</p> : (e[0] == 'img' ? 
          <div class="w-full" style={{marginBottom: 8}}>
            <div class="relative flex justify-center items-center w-full h-full max-w-[1336px] mx-auto rounded-none sm:rounded-3xl overflow-hidden xs:mt-0">
              <picture class="w-full h-auto rounded-none sm:rounded-3xl overflow-hidden ">
                <source media="(min-width: 768px)" srcset=""/><source media="(min-width: 767px)" srcset=""/>
                <img alt="" fetchpriority="high" width="1350" height="270" decoding="async" style={{color: 'transparent'}} sizes="100vw" src={e[1]} class="w-full h-auto xl:object-cover"/>
              </picture>
            </div>
          </div> : 'VIDEO')))}
        </div>}
        {/* #macro modules/articles */}
        {/* #macro modules/pr_list */}
        {/* #macro modules/club_banner */}
        {/* #macro modules/category */}
        {/* #macro modules/offer */}
        {/* #macro modules/foot */}
      </>)}
    </div>
  }
}