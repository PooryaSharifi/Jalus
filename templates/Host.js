/** #title جالوس صاحبخونه #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {history.back(); document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {menuHeight: 108, ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
      {title: 'تازه‌ترین یادداشت', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین تبلیغ', action: async () => {this.state.order = '!pan_date'; await this.search()}}, {title: 'تازه‌ترین مچ', action: async () => {this.state.order = '!last_match_date'; await this.search()}}, 
    ], secondMenuList: [
      {title: 'تازه‌ترین الف'}, {title: 'تازه‌ترین ب'}, {title: 'تازه‌ترین پ'}, 
    ], slide: 3, slides: [
      {webp: '/static/slides/Hosting_All.webp',
      jpeg: '/static/slides/Hosting_All-80.jpg',
      title: 'بوکینگ هوشند', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Hosting_LockPrivacy.webp',
      jpeg: '/static/slides/Hosting_LockPrivacy-80.jpg',
      title: 'ویلای پنج ستاره !!', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Hosting_Toiletry.webp',
      jpeg: '/static/slides/Hosting_Toiletry-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Home_All.webp',
      jpeg: '/static/slides/Home_All-80.jpg',
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
    let stories = await fetch('/stories/host'); if (stories.status < 300) {
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
    window.onpopstate = e => { let plyr = document.getElementById('plyr'); if (plyr) {plyr.style.display = 'none'; plyr.innerHTML = ''} }
  } render() { let app = this;
    return <div>
      {this.state.potent ? ({/* #macro modules/potent */}) : (<>
        {/* #macro modules/menu */}
        <div style={{height: 105}}></div>
        {/* #macro modules/story */}
        {/* #macro modules/slider */}
        {this.state.article == -1 ? <div style={{maxWidth: 960, paddingBottom: 20, paddingLeft: 14, paddingRight: 14}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
          <h1 style={{textAlign: 'center', fontSize: '4em', fontWeight: 700, paddingTop: 20, paddingBottom: 15}}>میزبانی جالوس</h1>
          <div class="w-full">
            <div class="relative flex justify-center items-center w-full h-full max-w-[1336px] mx-auto rounded-none sm:rounded-3xl overflow-hidden xs:mt-0">
              <picture class="w-full h-auto rounded-none sm:rounded-3xl overflow-hidden ">
                <source media="(min-width: 768px)" srcset=""/>
                <source media="(min-width: 767px)" srcset=""/>
                <img alt="" fetchpriority="high" width="1350" height="270" decoding="async" style={{color: 'transparent'}} sizes="100vw" src="/static/slides/Hosting_Split.jpg" class="w-full h-auto xl:object-cover"/>
              </picture>
            </div>
          </div>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>جالوس آژانس اجاره ویلا نیست!!</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>جالوس یک استاندارد برای رفاه و لذت بیشتر مسافران به وسیله تکنولوژی و ارائه خدمات نوین است.
          هدف ایجاد رفا و تجربه بی نظیر از اسکان با مدیریت هزینه ها برای مسافر است، تجربه‌ای مانند هتل های All در ترکیه می‌باشد.
          با استفاده از لوازم بهداشتی که به راحتی و با قیمت رقابتی در جالوس فراهم می‌شود. می‌توان آنرا به صورت رایگان تقدیم مسافر کرد.
          و خیالش را از بابت نظافت و سلامت خود و محیط داخل اسکان راحت کرد</p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>کلید امن برای همه</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>کلید QrCode یک کلید ۵۱۲ بیتی با امنیت دوبرابر رمزگذاری ارزهای دیجیتالی است.
          درون این کلید تاریخ ورود و خرود و نام مسافر به صورت رمزشده قرارگرفته تا همه مسافران باهمراه داشتن موبایل خود دراصل کلید ویلاوسکونت را داشته باشند
          با فرارسیدن تاریخ انقضای کلید قفل درب دیگر توسط آن باز نخواهد شد.</p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>میزبان جالوس شو و همه چیزرو در دست بگیر</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>سیستم همکاری با جالوس شفاف‌تر از قرار دادن آگهی برروی دیوار برای صاحبان ویلا هاست
          و از طرفی بی دقدقه تر و ایمن تر برای مسافران شما می‌باشد. 
          مسافران ابتدا با سرچ در جالوس اطلاعات ویلای شما و تلفن شمارا مشاهده می‌کنند. سپس با مشاهد روزهای خالی بازه ورود و خروج خود را انتخاب می‌کنند.
          و اقدام به ثبت سفارش می‌کنند. شماره تماس صاحب ویلا ازهمان ابتدا در دسترس مسافر قرار می‌گیرد تا به او امکان گفت و گو
          و مکالمه و اطلاعات مورد نیاز داده شود. و حس اعتماد در مسافر شکل گیرد. همچنین اپراتورهای جالوس در خدمت مسافران قرار میگیرند تا شکل رسمی تر و قابل اعتمادتری به سیستم داده
          سیستم رزرو و پرداخت و پول واریزی به صورت مستقیم به حساب صاحب ویلا از طریق کارت به کارت انتقال رمزارز صورت میگیرد.
          با دریافت پیامک واریز پول به حساب صاحب خانه . او سایت را به روزرسانی و تاریخ مورد نظر را رزرو ویلای خود برای مسافر می‌کند. 
          برای جلوگیری از بروز رزرو اسکان توسط چند مسافر به طور همزمان اپراتورها حظور دارند تا این فرایند را سرعت بخشند
          </p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>ارزش افزوده برای مسافران جالوس</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>اکثر سفرهای به اسکان های خصوصی و شخصی به صورت زمینی و خودرویی انجام می‌شود
          مسافران در روز اول اسکان با چالش هایی روبه‌رو می‌شوند که شامل حمام و نظافت. جست و جوی امکانات اسکان و طریقه لذت بردن از آن، و فهم اتمسفر آن مکان است.
          با ایجاد یک بوفه هوشند می‌توان تجربه هتل های آل ترکیه را برای مسافران فراهم کرد.</p>

          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>ارزش افزوده برای مسافران جالوس</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>
کار با جوشکاری و ساخت اسکلت آهنی آغاز می شود. سپس باغچه های متحرک به وسیله کابلها و بلبرینگ ها به اسکلت اضافه میشوند
با آمدن مسولان و ناظران برای بازدید نقشه های ساخت گلخانه ارایه میشوند
و به مرور اسکلت تبدیل به گلخانه با سقف صاف آماده برای تیغه چینی و تاق  نیمه شفاف می شود. و کماکان کاربری گلخانه حفظ می شود
تا در مراحل بعدی نازک کاری صورت گیرد و زیبایی ساخت مورد توجه قرار گیرد.
و هردوکاربرد سازه مد نظر قرار گیرد. با پایین آمدن گلدان های تخت فضا و سازه تبدیل به یک گلخانه مکانیزه و زیبا تبدیل می شود. و با 
بالا رفتن گلدان ها کف و زیر گلدان ها با تاق همسطح می شود و جلو ورود نور از تاق را می گیرد در واقع جزیی از تاق شده و به زیبایی سازه کمک می کند
</p>

          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>ارزش افزوده برای مسافران جالوس</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>یخچال فریزر هوشمند غذا های نیمه آماده با کیفیت برای سرخ کردن و فراهم آوردن در ماکروفر و سرخکن و راحتی مسافران همراه است
این یخچال های هوشمند به  سنسورهای اندازه گیری جرم و دوربین تجهیز شده اند و به صورت آنلاین میزان مصرف را اندازه می گیرند. و در پایان سفر میزان مصرف مسافران را اندازه گیری می کنند و مقدار باقی مانده به صورت نقد به حساب مسافر ریخته می شوند
درون این یخچال ها تمام  خوردنی های و نوشیدنی های مشترک میان تمام کاربران با قیمت خرید به صورت عمده و کمترین هزینه برای رفاه مسافران فراهم می شود. 
این موارد شامل 20 لیتر آبمعدنی 6 نوشابه خانواده
و همچنین ظرف های درب دار سلیکونی شامل موارد پیتزا و پیراشکی نیمه منجمد و سیب زمینی و ناگت مرغ  و جوجه و کوبیده و دیگر غذا های پر  خواهان
و همچنین پک  کاپ های بستنی و مزه ها و فینگرفود های آماده ای که در زمان مسافر صرفه جویی می کند.</p>

          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>ارزش افزوده برای مسافران جالوس</h2>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>با در آوردن یک ظرف درب دار و پلمپ حاوی غذای نیمه منجمد از یخچال فریزر هوشمند یخچال متوجه نوع و آیدی ظرف و غذای درون آن را شناسایی می کند.
و تنظیمات سرخ کن را متناسب با آن قرار می دهد. تا بدون داشتن دانش طریقه فراهم آوردن غذا به حداقل برسد. و به راحتی با قرار دادن ظرف درون سرخکن و بست درب آن بعد از مدت معلوم شده در هر شرایطی غذای با کیفیت به دست مسافر برسد.
به صورت می توان با ورود مسافرانی که ساعت ها در مسیر بوده اند تا به شمال ایران برسند غذای اتوماتیک فراهم کرد
</p>

          <span style={{backgroundColor: '#343747', borderRadius: 999, color: '#fdfdfd', padding: 6, paddingLeft: 12, paddingRight: 12, fontSize: '1.85em', position: 'relative', top: 15, cursor: 'pointer'}} onClick={() => {this.setState({potent: true, potentInterest: 'host'})}}>برای شروع همکاری وارد شوید</span>
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