/** #title جالوس #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {history.back(); document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {menuHeight: 108, ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
      {title: 'تازه‌ترین یادداشت', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین تبلیغ', action: async () => {this.state.order = '!pan_date'; await this.search()}}, {title: 'تازه‌ترین مچ', action: async () => {this.state.order = '!last_match_date'; await this.search()}}, 
    ], secondMenuList: [
      {title: 'تازه‌ترین الف'}, {title: 'تازه‌ترین ب'}, {title: 'تازه‌ترین پ'}, 
    ], slide: 3, slides: [
      {webp: '/static/slides/Home_Booking.webp',
      jpeg: '/static/slides/Home_Booking-80.jpg',
      title: 'بوکینگ هوشند', href: '/properties'},
      {webp: '/static/slides/Home_5Star.webp',
      jpeg: '/static/slides/Home_5Star-80.jpg',
      title: 'ویلای پنج ستاره !!', href: '/properties?stars=5'},
      {webp: '/static/slides/Home_All.webp',
      jpeg: '/static/slides/Home_All-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '/'},
      {webp: '/static/slides/Home_Transparency.webp',
      jpeg: '/static/slides/Home_Transparency-80.jpg',
      title: 'شفافیت', href: '/host#transparency'},
      // {webp: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/1e3ced747d8cf62c297f95c0d94ef9d13732048f_1718696318.jpg?x-oss-process=image/quality,q_95/format,webp',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/1e3ced747d8cf62c297f95c0d94ef9d13732048f_1718696318.jpg?x-oss-process=image/quality,q_95',
      // title: 'تناسب اندام', href: '/4'},
      // {webp: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/71f867b90d6dca65405a4252159f7b9c5b7cd8b6_1722415413.jpg?x-oss-process=image/quality,q_95/format,webp',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/71f867b90d6dca65405a4252159f7b9c5b7cd8b6_1722415413.jpg?x-oss-process=image/quality,q_95',
      // title: 'پارتنرشیپ-وزارت نیرو', href: '/5'},
      // {webp: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/24e93720f9f253d833b5131b9241ee6d8f979ca5_1722662924.jpg?x-oss-process=image/quality,q_95/format,webp',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/24e93720f9f253d833b5131b9241ee6d8f979ca5_1722662924.jpg?x-oss-process=image/quality,q_95',
      // title: 'کمپین -  سوپراستارها - هوم - مرداد 1403', href: '/6'},
      // {webp: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/71a123426127ae10b156d505afbca182d03d1d91_1722927806.gif?x-oss-process=image?x-oss-process=image/format,webp',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/71a123426127ae10b156d505afbca182d03d1d91_1722927806.gif?x-oss-process=image/quality,q_95',
      // title: 'پارتنرشیپ-زرساب"', href: '/7'},
      // {webp: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/4743e3c09d2113d86ae7dbe415d3fd1cac85f7ac_1722951209.jpg?x-oss-process=image/quality,q_95/format,webp',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-adservice-banners/4743e3c09d2113d86ae7dbe415d3fd1cac85f7ac_1722951209.jpg?x-oss-process=image/quality,q_95',
      // title: 'پارتنرشیپ-زرین', href: '/8'},
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
        ['img', '/static/articles/private_villa.0.jpg'], ['h2', 'لذت امینت در ویلای دربستی'], ['p', 'در ویلاهای دربستی جالوس لذت و امینت و راحتی را درکنار دوستان و خانواده خود تجربه کنید و در کنار آنها تجربه به‌یادماندنی را به ارمغان آورید همچنین با استفاده از امکاناتی که جالوس هوشمند و بوفه در اختیار شما قرار می‌گیرد آنرا  کاملتر و زیباتر کنید'], 
        ['h2', ''], ['p', '']
      ]},
      {title: "بهترین شرایط سفر به شمال", jpeg: '/static/articles/best_trip_condition.0.jpg', body: [
        ['img', '/static/articles/best_trip_condition.0.jpg'], ['h2', ''], ['p', ''],
        ['h2', 'تعداد نفرات'], ['p', 'ش'], ['h2', 'زمان سفر'], ['p', 'e'],
        ['h2', 'هزینه سفر'], ['p', ''], ['h2', 'ویلا: ساحلی یا جنگلی'], ['p', ''],
      ]},
      {title: "راهنمای تور سفر نقاط گیلان و مازندران ", jpeg: '/static/articles/north_guide.0.webp', body: [
        ['img', '/static/articles/north_guide.0.webp']
      ]},
      {title: "کمپینگ ایمن بادست خالی در شمال", jpeg: '/static/articles/camping.0.jpg', body: [
        ['img', '/static/articles/camping.0.jpg'], ['h2', 'واسه یه کمپینگ خوب فقط یک‌قدم بردار بقیش با ما'], ['p', 'حتما شما هم در یوتیوب یا اینستاگرام تجربه های کمپینگ در مناطق خوش آب‌وهوای ایران و جهان رو دیدید که با امکانات مورد نیاز و چادرزدن در مناطق امن و مخصوص بهترین تصاویر را به نمایش میگذارند. اگر شما هم علاق به کمب زدن به صورت تکی یا تیمی دارید میتوانید روی جالوس حساب کنید'], 
        ['h2', 'مکان‌ها و لوازم'], ['p', 'مواردی که جالوس در اختیار کاربران و مشتریان همیشگی خود میگذارد شامل 1.چادرهای عایق گرما و آب 2. شومینه قابل حمل 3. ترموس برای نگهداری مواد غذایی و همینطور اراضی امنی که تحت محافظت قرار گرفته اند تا به شما مسافران جالوس بهترین تجربه کمپینگ ارایه شود ']
      ]},
    ], stories: [], offers: [], foot_logos: [
      {svg: '/static/icon/jalus_host.svg', href: '/host'}, {svg: '/static/icon/jalus_rebuild.svg', href: '/rebuild'},
      {svg: '/static/icon/jalus_dual.svg', href: '/greenhome'}, {svg: '/static/icon/jalus_key.svg', href: '/host#smartkey'},
      {svg: '/static/icon/jalus_pay.svg', href: '/host#payment'}, {svg: '/static/icon/jalus_service.svg', href: '/'},
      {svg: '/static/icon/jalus_club.svg', href: '/'}, {svg: '/static/icon/jalus_smart.svg', href: '/host#all'}
    ], potent: false, potentOtp: '', otp: false, potentPhone: '', potentInterest: '', plyr: true, searchInput: '', searchExpand: false, footExpand: false, rows: 5, trans: true, background: 0, microwave: 0, foods: {bread: {img: 0}, pizza: {img: 0}, rice: {img: 0}, fries: {img: 0}, chicken_bbq: {img: 0}, kebab: {img: 0}, falafel: {img: 0}}};
  } async componentDidMount() { let app = this;
    let stories = await fetch('/stories/_'); if (stories.status < 300) {
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
        {this.state.article != -1 && <div style={{maxWidth: 768, paddingLeft: 14, paddingRight: 14}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
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