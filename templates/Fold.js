/** #title جالوس تاشو #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, slide: 3, slides: [
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
    ], category: -1, categories: [
      {href: '/main/mobile/', title: 'کوهستانی',
      png: '/static/categories/mountain_0_exposed.webp'},
      {href: '/main/mobile/', title: 'پردسترس',
      png: '/static/categories/accessible_0_exposed.webp'},
      {href: '/main/mobile/', title: 'ساحلی',
      png: '/static/categories/beach_3_exposed.webp'},
      {href: '/main/mobile/', title: 'ییلاقی',
      png: '/static/categories/yeylaghi_1_exposed.webp'},
      {href: '/main/mobile/', title: 'قشلاقی',
      png: '/static/categories/gheshlaghi_0_exposed.webp'},
      {href: '/main/mobile/', title: 'دربستی',
      png: '/static/categories/darbasti_0_exposed.webp'},
      {href: '/main/mobile/', title: 'وییو ابدی',
      png: '/static/categories/abadi_0_exposed.webp'},
      {href: '/main/mobile/', title: 'کلبه‌ای',
      png: '/static/categories/X_1_exposed.webp'},
      {href: '/main/mobile/', title: 'استخردار',
      png: '/static/categories/pool_9_exposed.webp'},
      {href: '/main/mobile/', title: 'جنگلی',
      png: '/static/categories/jungle_5_exposed.webp'},
      {href: '/main/mobile/', title: 'اقتصادی',
      png: '/static/categories/economic_0_exposed.webp'},
      {href: '/main/mobile/', title: 'سنتی',
      png: '/static/categories/sonnati_3_exposed.webp'},
      {href: '/main/mobile/', title: 'مدرن',
      png: '/static/categories/futuristic_1_exposed.webp'},
      {href: '/main/mobile/', title: 'سوییسی',
      png: '/static/categories/swedish_0_exposed.webp'},
      {href: '/main/mobile/', title: 'تفریح‌وهیجان',
      png: '/static/categories/entertain_1_exposed.webp'},
      {href: '/main/mobile/', title: 'تجربه جدید',
      png: '/static/categories/hobit_0_exposed.webp'},
    ], products: [
      {title: "جالوس هوشمند", href: '/home/_',
      png: '/static/icon/jalus_app_phone-8.png'},
      {title: "کلید بلاکچین", href: '/host#key',
      png: '/static/icon/jalus_app_key-8.png'},
      {title: "جالوس‌پلاس", href: '/3',
      png: '/static/icon/jalus_app_plus.png'},
      {title: "حراج تابستانی", href: '/4',
      png: '/static/icon/jalus_app_off.jpg'},
      {title: "جالوس اسکان", href: '/properties',
      png: '/static/icon/jalus_app_tent-8.png'},
      {title: "اسکان لحظه‌آخری", href: '/properties?date=1',
      png: '/static/icon/jalus_app_lastsecond-8.png'},
      {title: "سازه دومنظوره", href: '/greenhome',
      png: '/static/icon/jalus_app_dual-8.png'},
      {title: "هوای بهتر", href: '/',
      png: '/static/icon/jalus_app_wind.webp'},
    ], articles: [
      {title: "همه چیز درباره‌ی خدمات ویلاهای دربستی", href: '/0',
      jpeg: '/static/articles/private_villa.0.jpg'},
      {title: "بهترین شرایط سفر به شمال", href: '/1',
      jpeg: '/static/articles/best_trip_condition.0.jpg'},
      {title: "راهنمای تور سفر نقاط گیلان و مازندران ", href: '/2',
      jpeg: '/static/articles/north_guide.0.webp'},
      {title: "کمپینگ ایمن بادست خالی در شمال", href: '/3',
      jpeg: '/static/articles/camping.0.jpg'},
    ], stories: [
      // {title: 'پاوربانک مخصوص پرچم‌دارها💪🏻', href: '/stories/0',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/9f60c5e591964904c979a11921630ec633ea5ea1_1721664701.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'موس 8 میلیونی؟!', href: '/stories/1',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/de0a1fb08019701c34455f706f51db93450315ad_1721913910.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'این فلش‌مموری رو همه می‌خوان❗️', href: '/stories/2',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/1d605d4e7623fc9a733367295762fabc5d4657ad_1721664445.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'تی شرت های زگماک', href: '/stories/3',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/652b5a8eef77fe08ad29ff5439c6163ccd8063f9_1722267433.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'پنگوئن مهربون', href: '/stories/4',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/c6b6d9c60e8651a9f42ab63fc991f87243ef028c_1722110950.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'دوچرخه کلاسیک', href: '/stories/5',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/442b5e2b6be0ee1ae4c80edcec4c85ddd377efcb_1721943521.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'اکتیو رو اکتیو کن!', href: '/stories/6',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/9e1946757d4ab353b40d352fed9e7979a32e79c4_1722212651.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'می‌خوایی از ناخنات بیشتر مراقبت کنی', href: '/stories/7',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/62222c0ec84a0ce34e5bff1b937d68d24936189c_1721729884.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'پاور بانک با ظرفیت ولی عجیب⚡', href: '/stories/8',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/56488ac3082950039df53a69b591cd8f902886ab_1722056417.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'درست استفاده‌کن', href: '/stories/9',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/785e52bd651eb58d15782d35b1940d474ece2b49_1722095866.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'کتری برقی اقتصادی', href: '/stories/10',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/f63220f09c848511f1553e1430f1cdbd8aef6ad5_1722276219.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'برای کوچولوها', href: '/stories/11',
      // jpeg: 'https://dkstatics-public.digikala.com/digikala-content-x-post-media/32d134fcb86bec1161f6a4b13429b5c88e236a44_1722156973.jpg?x-oss-process=image/resize,m_fill,h_115,w_115'},
      // {title: 'تست ارزون ترین گیتار دیجی‌کالا', href: '/stories/12',
      // jpeg: ''},
      // {title: '', href: '/stories/13',
      // jpeg: ''},
      // {title: '', href: '/stories/14',
      // jpeg: ''},
      // {title: '', href: '/stories/15',
      // jpeg: ''},
    ], offers: [
      {images: ['rent-temporary/AZn9Q1Wc/0.webp'], offer: 48},
      {images: ['rent-temporary/AZn9Q1Wc/0.webp'], offer: 43},
      {images: ['rent-temporary/AZn9Q1Wc/0.webp'], offer: 38},
      {images: ['rent-temporary/AZn9Q1Wc/0.webp'], offer: 35},
      {images: ['rent-temporary/AZn9Q1Wc/0.webp'], offer: 30},
      {images: ['rent-temporary/AZn9Q1Wc/0.webp'], offer: 26},
      {images: ['rent-temporary/AZn9Q1Wc/0.webp'], offer: 20},
    ], foot_logos: [
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
  } render() { let app = this;
    return <div>
      {this.state.potent ? ({/* #macro modules/potent */}) : (<>
        {/* #macro modules/menu */}
        <div style={{height: 105}}></div>
        {/* #macro modules/story */}
        {/* #macro modules/slider */}
        <div style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 20}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
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
        </div>
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