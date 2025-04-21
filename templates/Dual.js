/** #title جالوس بنای سبز دومنظوره #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {menuHeight: 108, ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
      {title: 'تازه‌ترین یادداشت', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین تبلیغ', action: async () => {this.state.order = '!pan_date'; await this.search()}}, {title: 'تازه‌ترین مچ', action: async () => {this.state.order = '!last_match_date'; await this.search()}}, 
    ], secondMenuList: [
      {title: 'تازه‌ترین الف'}, {title: 'تازه‌ترین ب'}, {title: 'تازه‌ترین پ'}, 
    ], slide: 3, slides: [
      {webp: '/static/slides/Home_Booking.webp', 
      jpeg: '/static/slides/Home_Booking-80.jpg',
      title: 'بوکینگ هوشند', href: '#', state: {potent: true, potentInterest: 'dual'}},
      {webp: '/static/slides/Home_5Star.webp',
      jpeg: '/static/slides/Home_5Star-80.jpg',
      title: 'ویلای پنج ستاره !!', href: '#', state: {potent: true, potentInterest: 'dual'}},
      {webp: '/static/slides/Home_All.webp',
      jpeg: '/static/slides/Home_All-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'dual'}},
      {webp: '/static/slides/Home_Transparency.webp',
      jpeg: '/static/slides/Home_Transparency-80.jpg',
      title: 'شفافیت', href: '#', state: {potent: true, potentInterest: 'dual'}},
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
    let stories = await fetch('http://localhost:5000/stories/greenhome'); if (stories.status < 300) {
      stories = await stories.json(); app.setState({stories: Object.keys(stories).map((story) => ({title: story.split('_')[1], jpeg: '/stories/' + story + '.jpg', href: story, resolutions: stories[story][0], ccs: stories[story][1], markers: stories[story][2]}))})
    } let offers = await fetch('/properties/', {body: JSON.stringify({offer: {$gte: 5}}), method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}); if (offers.status < 300) {
      let offer_nt = 7, offer_avg = 0; offers = await offers.json();
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
          <h1 style={{textAlign: 'center', fontSize: '4em', fontWeight: 700, paddingTop: 20, paddingBottom: 15}}>سبز دومظوره</h1>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>بناهای باغی</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>بناها و سازه هایی که در باغات احداث شده‌اند معمولاً و به طورعمده خالی از سکنه هستند زیرا به عنوان خانه دووم محسوب شده و برای دورهمی استفاده می‌گردند این بناها عمدتا در اطراف شهرها احداث شده و دسترسی به اندازه خانه‌های شهری ندارند.
  این بناها کاربری محدودی دارند و قابلیت سکونت کامل به صورت همیشگی ندارند. کاربرد آنها بیشتر برای تغییر مکان و تجدید فراش و تازه شدن دیدار فایل و دوستان است. این کاربری ها با منافع و اهداف نهادهای کشوری نظیر جهاد کشاورزی و شهرسازی در تضاد است.
  نظر جهاد برای زمین های کشاورز کشت و کاشت و دامداری و تولیدات خوراکیست و کاربری های دیگر ازجمله ساخت اسکان و خانه را برنمی تابد. بر اساس ماده ۱ قانون حفظ کاربری اراضی، احداث چنین بناهایی جرم محسوب می‌شود. ایجاد بناهای چند منظوره و سبز می‌تواند چاره سازباشد.
  اضافه کردن کاربردهای جدید به بنا باید به گونه‌ای باشد که کاربری اصلی یعنی زیبایی و امنیت و راحتی برای سکونت حفظ شود. و باید از همان متریال‌ها و تکنولوژی های سازه ای معمول استفاده شود. تا همان تجربه همیشگی از اسکان منتقل شود. از آنطرف کاربری های جدید درجهت ذایقه جهاد و منافع ملی و نیاز های سبز باشد</p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>هم گلخانه هم خانه</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>خانه ای را تجسم کنید که در چند دقیقه تبدیل به گلخانه در یعنی الان شاهد گلخانه ای از گلهای آپارتمانی هستیم و در کسری از زمان شاهد تبدیل شدن آن به خانه ای زیبا و مطبوع با فیلتر تصفیه هوای طبیعی هستیم
  این خانه ظاهری همانند خانه های معمول با سازه بتنی یا اسکلت فلزی است. و قیمت تمام شده آن فقط متری ۷۵۰ هزار تمان بیشتر است.
  این طرح به یقین نظر دیگران و جهاد را جلب می‌کند. و دیگر آن ها ساخت خلاف درنظر نمیگیرد. ساخت این سازه با چالش هایی روبروست که جالوس به آن پرداخته و توانسته راه حل خلاقانه ای برای آن پیدا کند.</p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>طاق باغ معلق</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>استفاده از قرقره و نورگیر و گلدان های قابل جاسازی در طاق و موتوریزاسیون این طرح را عملی می‌کند. 
  این طرح همان طور که درفیلم و عکس‌های آن نمایان است به سادگی انجم پذیر است و برای همه ابعاد و نقشه‌ای قابل اجراست. تمامی تمهیدات آن اندیشیده شده است و می‌تواند به راحتی به خانه هوشمند متصل شود.
  برای مشاهده نمونه کار و آشنایی بیشتر ثبت‌نام کنید تا همکاران ما با شما تماس بگیرند</p>
          <span style={{backgroundColor: '#343747', borderRadius: 999, color: '#fdfdfd', padding: 6, paddingLeft: 12, paddingRight: 12, fontSize: '1.85em', position: 'relative', top: 15, cursor: 'pointer'}} onClick={() => {this.setState({potent: true, potentInterest: 'dual'})}}>برای شروع همکاری وارد شوید</span>
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