/** #title جالوس بازسازی #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {menuHeight: 108, ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
      {title: 'تازه‌ترین یادداشت', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین تبلیغ', action: async () => {this.state.order = '!pan_date'; await this.search()}}, {title: 'تازه‌ترین مچ', action: async () => {this.state.order = '!last_match_date'; await this.search()}}, 
    ], secondMenuList: [
      {title: 'تازه‌ترین الف'}, {title: 'تازه‌ترین ب'}, {title: 'تازه‌ترین پ'}, 
    ], slide: 3, slides: [
      {webp: '/static/slides/Rebuild_FirstHandedFactory.webp', 
      jpeg: '/static/slides/Rebuild_FirstHandedFactory-80.jpg',
      title: 'بوکینگ هوشند', href: '#', state: {potent: true, potentInterest: 'rebuild'}},
      {webp: '/static/slides/Rebuild_MinimumPrice.webp',
      jpeg: '/static/slides/Rebuild_MinimumPrice-80.jpg',
      title: 'ویلای پنج ستاره !!', href: '#', state: {potent: true, potentInterest: 'rebuild'}},
      {webp: '/static/slides/Home_All.webp',
      jpeg: '/static/slides/Home_All-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'rebuild'}},
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
        ['img', '/static/articles/best_trip_condition.0.jpg'], ['h2', 'سلام'], ['p', 'سلام بامرام'],
        ['h2', 'بای'], ['p', 'بای بای ']
      ]}, {title: "راهنمای تور سفر نقاط گیلان و مازندران ", jpeg: '/static/articles/north_guide.0.webp', body: [
        ['img', '/static/articles/north_guide.0.webp'], ['h2', 'سلام'], ['p', 'سلام بامرام'],
        ['h2', 'بای'], ['p', 'بای بای ']
      ]}, {title: "کمپینگ ایمن بادست خالی در شمال", jpeg: '/static/articles/camping.0.jpg', body: [
        ['img', '/static/articles/camping.0.jpg'], ['h2', 'سلام'], ['p', 'سلام بامرام'],
        ['h2', 'بای'], ['p', 'بای بای ']
      ]},
    ], stories: [], offers: [], foot_logos: [
      {svg: '/static/icon/jalus_host.svg', href: '/host'}, {svg: '/static/icon/jalus_rebuild.svg', href: '/rebuild'},
      {svg: '/static/icon/jalus_dual.svg', href: '/greenhome'}, {svg: '/static/icon/jalus_key.svg', href: '/host#smartkey'},
      {svg: '/static/icon/jalus_pay.svg', href: '/host#payment'}, {svg: '/static/icon/jalus_service.svg', href: '/'},
      {svg: '/static/icon/jalus_club.svg', href: '/'}, {svg: '/static/icon/jalus_smart.svg', href: '/host#all'}
    ], potent: false, potentOtp: '', otp: false, potentPhone: '', potentInterest: '', plyr: true, searchInput: '', searchExpand: false, footExpand: false, rows: 5, trans: true, background: 0, microwave: 0, foods: {bread: {img: 0}, pizza: {img: 0}, rice: {img: 0}, fries: {img: 0}, chicken_bbq: {img: 0}, kebab: {img: 0}, falafel: {img: 0}}};
  } async componentDidMount() { let app = this;
    let stories = await fetch('http://localhost:5000/stories/rebuild'); if (stories.status < 300) {
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
        {this.state.article == -1 ? <div style={{maxWidth: 960, paddingBottom: 20, paddingLeft: 14, paddingRight: 14}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
          <h1 style={{textAlign: 'center', fontSize: '4em', fontWeight: 700, paddingTop: 20, paddingBottom: 15}}>بازسازی به سبک جالوس</h1>
          <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
            <div class="relative flex justify-center items-center w-full h-full max-w-[1336px] mx-auto rounded-none sm:rounded-3xl overflow-hidden xs:mt-0">
              <picture class="w-full h-auto rounded-none sm:rounded-3xl overflow-hidden">
                <source media="(min-width: 768px)" srcset="/stories/hosting_منظره ای از سیاره آبی.jpg"/>
                <source media="(min-width: 767px)" srcset="/stories/hosting_منظره ای از سیاره آبی.jpg"/>
                <img alt="" fetchpriority="high" width="1350" height="270" decoding="async" style={{color: 'transparent'}} sizes="100vw" src="/stories/hosting_منظره ای از سیاره آبی.jpg" class="w-full h-auto xl:object-cover"/>
              </picture>
              <button onClick={() => {loadStory('')}} style={{display: 'block'}} type="button" class="plyr__control plyr__control--overlaid" data-plyr="play" aria-pressed="false" aria-label="Play">
                <svg aria-hidden="true" focusable="false">
                  <use xlinkHref="/static/plyr.svg#plyr-play">
                    <symbol id="plyr-play" viewBox="0 0 18 18"><path d="M15.562 8.1L3.87.225c-.818-.562-1.87 0-1.87.9v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path></symbol>
                  </use>
                </svg>
                <span class="plyr__sr-only">Play</span>
              </button>
            </div>
          </div>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>بازسازی با روش جدید و متریال دست اول</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>بازسازی در جالوس با ابزار های نوین و طراحی شده در اتاق فکر جالوس انجام می‌شود. اینجا با ارتباط با کارخانه های تولیدی و سنگ بری ها و کارگاه های سفارشی سازی قیمت مواد اولیه را سرشکن می‌کنیم و 
          با بهره گیری کامل از تمام ساعت کاری کادر مجرب قیمت تمام شده بازسازی را به حداقل می‌رسانیم تا بهترین کیفت با کمترین هزینه را به شما تقدیم کنیم</p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>رمز موفیت بازسازی با جالوس</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>کاربازسازی در مجموعه جالوس به یک روتین پرتکرار تبدیل شده می‌توان گفت که تجربه کار هماهنگ و تیمی مجموعه در کنار هم سبب هم‌افزایی و ارائه خدمات بهتر شده است
          بهینه سازی در استفاده از وقت کارگر و اوستاکار و همچنین استفاده درست از متریال های دست اول تولید کنندگان مهمترین عامل خدمات باکیفیت و با قیمت رقابتی گروه ما می‌باشد</p>
          <span style={{backgroundColor: '#343747', borderRadius: 999, color: '#fdfdfd', padding: 6, paddingLeft: 12, paddingRight: 12, fontSize: '1.85em', position: 'relative', top: 15, cursor: 'pointer'}} onClick={() => {this.setState({potent: true, potentInterest: 'rebuild'})}}>برای شروع همکاری وارد شوید</span>
        </div> : <div style={{maxWidth: 768, paddingBottom: 20, paddingLeft: 14, paddingRight: 14}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
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