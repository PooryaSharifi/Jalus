/** #title جالوس بازسازی #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, slide: 3, slides: [
      {webp: '/static/slides/Rebuild_FirstHandedFactory.webp', 
      jpeg: '/static/slides/Rebuild_FirstHandedFactory-80.jpg',
      title: 'بوکینگ هوشند', href: '#', state: {potent: true, potentInterest: 'rebuild'}},
      {webp: '/static/slides/Rebuild_MinimumPrice.webp',
      jpeg: '/static/slides/Rebuild_MinimumPrice-80.jpg',
      title: 'ویلای پنج ستاره !!', href: '#', state: {potent: true, potentInterest: 'rebuild'}},
      {webp: '/static/slides/Home_All.webp',
      jpeg: '/static/slides/Home_All-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'rebuild'}},
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
      // {href: '/main/mobile/', title: 'موبایل',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/aba1e5dca8958ac1176e25cd194ff8ac622cd383_1692600155.png'},
      // {href: '/main/electronic-devices/', title: 'کالای دیجیتال',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/8f80e75e4c2dca42ee0538e100c7a7b05455aa88_1692600287.png'},
      // {href: '/main/book-and-media/', title: 'کتاب، لوازم تحریر و هنر',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/3582bbed0a53318c2332d2c79b051b226f02a3bb_1692600677.png'},
      // {href: '/main/home-and-kitchen/', title: 'خانه و آشپزخانه',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/0c3cc1cb589df1c74c4ad95a742bb6df967956a8_1692600390.png'},
      // {href: '/landing/category-home-appliance/', title: 'لوازم خانگی برقی',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/c16b7dff700a9d99880174c32ec233d20ddb531c_1703057953.png'},
      // {href: '/main/apparel/', title: 'مد و پوشاک',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/5795b31a635f1e23df96a908c009f31744ede38f_1692600481.png'},
      // {href: '/search/category-gold-jewelry/', title: 'طلا و نقره',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/d17e98a20e1681c7bac5af856aa9552250ec9a96_1710666504.png'},
      // {href: '/main/personal-appliance/', title: 'آرایشی بهداشتی',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/0cefa48f5c58adbbde8c5a76b22ee49de0e667f5_1692600876.png'},
      // {href: '/search/category-health-care/', title: 'تجهیزات پزشکی و سلامت',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/a8579f44936c7fdff292b005a5d927601cb67cb9_1714224510.jpg'},
      // {href: '/main/vehicles-spare-parts/', title: 'خودرو و موتورسیکلت',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/4e985adcf61dd54d4d8abe725a62ba3990ea1eb1_1692601177.png'},
      // {href: '/main/vehicles/', title: 'ابزار آلات و تجهیزات',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/5d89d5b168e5ed079d619181e849cc737ec42c8d_1692601067.png'},
      // {href: '/main/sport-entertainment/', title: 'ورزش و سفر',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/1c44d5964f259e0725ec86ca9739de888f1862c7_1692600975.png'},
      // {href: '/main/dk-ds-gift-card/', title: 'کارت هدیه و گیفت کارت',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/20c179dff5c513104599d33858b6b11e77ced9b4_1692601532.png'},
      // {href: '/main/food-beverage/', title: 'کالای خوراکی و اساسی',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/da24c42172585abb0c328accf85d071049c4253e_1692600598.png'},
      // {href: '/main/mother-and-child/', title: 'اسباب بازی، کودک و نوزاد',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/0c46d2532d61dd3a5b6a3afc17552c23c1b4d39e_1692600773.png'},
      // {href: '/main/rural-products/', title: 'محصولات بومی و محلی',
      // png: 'https://dkstatics-public.digikala.com/digikala-mega-menu/af02140ea60e0fd478b09b279976a095c95615b6_1692601283.png'},
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
    let stories = await fetch('http://localhost:5000/stories/rebuild'); if (stories.status < 300) {
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