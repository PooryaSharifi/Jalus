/** #title استراتژیست #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {history.back(); document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {page: 'strategist', fr_page: 'استراتژیست', menuHeight: 108, ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, leftMenu: 'مسیر قهرمانی', firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
      {title: 'پیام‌های مشاور', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین مطلب', action: async () => {this.state.order = '!pan_date'; await this.search()}}, {title: 'تازه‌ترین پادکست', action: async () => {this.state.order = '!last_match_date'; await this.search()}}, 
    ], secondMenuList: [
      {title: 'سوالات درک مطلب'}, {title: 'تست هفتگی'}, {title: 'رفع اشکال'}, 
    ], sessions: [], slide: 2, slides: [
      {webp: '/static/slides/Strategist_thoughts.webp', 
      jpeg: '/static/slides/Strategist_thoughts-80.jpg',
      title: 'بوکینگ هوشند', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Strategist_planning.webp',
      jpeg: '/static/slides/Strategist_planning-80.jpg',
      title: 'ویلای پنج ستاره !!', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Strategist_4.webp',
      jpeg: '/static/slides/Strategist_4-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'host'}},
      {webp: '/static/slides/Strategist_allin.webp',
      jpeg: '/static/slides/Strategist_allin-80.jpg',
      title: 'خدمات هوشمند و رفاهی رایگان', href: '#', state: {potent: true, potentInterest: 'host'}},
    ], category: -1, categoryTitle: 'مطالعه اختصاصی هر درس', categoryShow: false, categories: [
      {href: '/properties?lyr=1&category=mountain', title: 'زیست',
      png: '/static/categories/biology_2.webp'},
      {href: '/properties?lyr=1&category=accessible', title: 'ریاضی',
      png: '/static/categories/mathematics_0.webp'},
      {href: '/users?category=beach', title: 'شیمی',
      png: '/static/categories/chemistry_1.webp'},
      {href: '/properties?lyr=2&category=yeylaghi', title: 'فیزیک',
      png: '/static/categories/physics_3.webp'},
      {href: '/properties?lyr=2&category=gheshlaghi', title: 'ادبیات',
      png: '/static/categories/litrature_0.webp'},
      {href: '/properties?lyr=1&category=whole', title: 'دین‌وزندگی',
      png: '/static/categories/relagion_2.webp'},
      {href: '/users?category=infinity', title: 'عربی',
      png: '/static/categories/arabic_1.webp'},
      {href: '/properties?lyr=1&category=tent', title: 'انگلیسی',
      png: '/static/categories/english_0.webp'},
      {href: '/properties?lyr=2&category=pool', title: 'زمین‌شناسی',
      png: '/static/categories/geology_0.webp'},
      {href: '/properties?lyr=1&category=jungle', title: 'گسسته',
      png: '/static/categories/discrete_0.webp'},
    ], products: [
      {title: "تخمین‌رتبه هوش‌مصنوعی", href: '/strategist/takhmin',
      png: '/static/icon/Strategist_app_predict-8.png'},
      {title: "آزمون هفتگی", href: '/strategist/exam',
      png: '/static/icon/Strategist_app_exam-8.png'},
      {title: "دیوسالاران", href: '/strategist/deev',
      png: '/static/icon/Strategist_app_deev-8.png'},
      {title: "استراتژی پلاس", href: '/strategist/plus',
        png: '/static/icon/jalus_app_plus.png'},
    ], article: -1, articles: [
      {title: "هفت عادت استراتژیست کنکوری", jpeg: '/static/articles/Strategist_7.jpg', body: [
        ['img', '/static/articles/Strategist_7.jpg']
      ]}, {title: "قبل کنکور این کتابارو با جون‌ودل حسش کن", jpeg: '/static/articles/Strategist_4books.png', body: [
        ['img', '/static/articles/Strategist_4books.png']
      ]}, {title: "مدیریت سه چیز احساسات زمان تمرکز", jpeg: '/static/articles/Strategist_war.jpg', body: [
        ['img', '/static/articles/Strategist_war.jpg']
      ]}, {title: "کمپ مطالعه در حضور دکتر پوریا شریفی", jpeg: '/static/articles/Strategist_camp.jpg', body: [
        ['img', '/static/articles/Strategist_camp.jpg']
      ]},
    ], stories: [], offers: [], foot_logos: [
      {svg: '/static/icon/jalus_host.svg', href: '/host'}, {svg: '/static/icon/jalus_rebuild.svg', href: '/rebuild'},
      {svg: '/static/icon/jalus_dual.svg', href: '/greenhome'}, {svg: '/static/icon/jalus_key.svg', href: '/host#smartkey'},
      {svg: '/static/icon/jalus_pay.svg', href: '/host#payment'}, {svg: '/static/icon/jalus_service.svg', href: '/'},
      {svg: '/static/icon/jalus_club.svg', href: '/'}, {svg: '/static/icon/jalus_smart.svg', href: '/host#all'}
    ], app: 'predict', potent: false, potentOtp: '', otp: false, potentPhone: '', potentInterest: '', plyr: true, searchInput: '', searchExpand: false, footExpand: false, rows: 5, trans: true, background: 0, microwave: 0, 
    foot: 'پاورقی برای استراتژیست', predict: {mathematics_technical_12: '', mathematics_all_12: '', physics_empirical_11: '', litrature_humanity_13: ''}};
  } async componentDidMount() { let app = this;
    let stories = await fetch('http://localhost:5000/stories/strategist'); if (stories.status < 300) {
      stories = await stories.json(); app.setState({stories: Object.keys(stories).map((story) => ({title: story.split('_')[1], jpeg: '/stories/' + story + '.jpg', href: story, resolutions: stories[story][0], ccs: stories[story][1], markers: stories[story][2]}))})
    } let offers = await fetch('/properties/', {body: JSON.stringify({offer: {$gte: 5}}), method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}); if (offers.status < 300) {
      let offer_nt = 7, offer_avg = 0; offers = await offers.json(); offers = offers.sort(() => Math.random() - 0.5);
      for (var i = 0; i < offers.length; i ++) offer_avg += offers[i].offer;
      offer_avg /= offers.length; offers = offers.filter((offer => offer.offer >= offer_avg && offer_nt -- > 0)); this.setState({offers: offers})
    }
    // setInterval(function() {app.setState({slide: (app.state.slide + 1) % app.state.slides.length});}, 7000);
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
        {!this.state.app && ({/* #macro modules/slider */})}
        {this.state.app == 'predict' && <div class="relative flex justify-center items-center w-full h-full max-w-[1336px] mx-auto rounded-none sm:rounded-3xl overflow-hidden xs:mt-0">
          <div style={{background: 'linear-gradient(transparent 0%, white 100%), linear-gradient(transparent 0%, white 100%), linear-gradient(transparent 0%, white 100%), linear-gradient(to left, #654EA3 0%, #EAAFC8 100%)', maxWidth: 768, padding: 40, paddingTop: 25, borderRadius: 16, marginTop: 10}}>
            <div style={{color: 'white', fontSize: '1.8em', fontWeight: 700, marginBottom: 20}}>سهمیه: <span class="touchable" style={{borderBottom: '2px solid white'}}>منطقه یک</span> ، گروه: <span class="touchable" style={{borderBottom: '2px solid white'}}>تجربی</span> ، روش: <span class="touchable" style={{borderBottom: '2px solid white'}}>ریزنمره</span></div>
            <div style={{fontSize: '1.6em', lineHeight: '2em', marginBottom: 20}}>نمرات کنکور</div>
            {([0, 1, 2, 3, 4, 5, 6, 7, 8]).map((i) => <div style={{display: 'inline-block', marginLeft: 14, marginRight: 14, marginBottom: 20}}>
              <input style={{border: '1px solid #896fb1', width: 70, backgroundColor: '#fffb'}} class="px-2 TextField_TextField__input__hFMFl text-subtitle w-full TextField_TextField__bwN9_ TextField_TextField--secondary__w_vGF text-subtitle w-full py-5 lg:py-2 rounded-medium" type="text"/>
              <div style={{borderBottom: '4px solid #896fb1', textAlign: 'center', fontSize: '1.3em', lineHeight: '2em'}}>ریاضی</div>
            </div>)}
            <div style={{fontSize: '1.6em', lineHeight: '2em', marginBottom: 20}}>نمرات پایه دوازدهم</div>
            {([0, 1, 2, 3, 4, 5, 6, 7, 8]).map((i) => <div style={{display: 'inline-block', marginLeft: 14, marginRight: 14, marginBottom: 20}}>
              <input style={{border: '1px solid #24c386', width: 70}} class="px-2 TextField_TextField__input__hFMFl text-subtitle w-full TextField_TextField__bwN9_ TextField_TextField--secondary__w_vGF text-subtitle w-full py-5 lg:py-2 rounded-medium" type="text"/>
              <div style={{borderBottom: '4px solid #24c386', textAlign: 'center', fontSize: '1.3em', lineHeight: '2em'}}>ریاضی</div>
            </div>)}
            <button class="relative flex items-center user-select-none styles_btn__Q4MvL text-button-1 styles_btn--large__1Muai styles_btn--primary__y0GEv rounded-medium w-full mt-6 lg:mt-8 text-button-1" type="submit" data-cro-id="login-register"><div class="flex items-center justify-center relative grow">محاسبه رتبه</div></button>
          </div>
        </div>}
        {this.state.article == -1 && !this.state.app && <div style={{maxWidth: 768, paddingBottom: 20, paddingLeft: 14, paddingRight: 14}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
          <h1 style={{textAlign: 'center', fontSize: '4em', fontWeight: 700, paddingTop: 20, paddingBottom: 15}}>استراتژیست</h1>
          <div class="w-full">
            <div class="relative flex justify-center items-center w-full h-full max-w-[1336px] mx-auto rounded-none sm:rounded-3xl overflow-hidden xs:mt-0">
              <picture class="w-full h-auto rounded-none sm:rounded-3xl overflow-hidden ">
                <source media="(min-width: 768px)" srcset=""/>
                <source media="(min-width: 767px)" srcset=""/>
                <img alt="" fetchpriority="high" width="1350" height="270" decoding="async" style={{color: 'transparent', maxHeight: 420, objectFit: 'cover'}} sizes="100vw" src="/static/slides/Strategist_sensei.jpg" class="w-full h-auto xl:object-cover"/>
              </picture>
            </div>
          </div>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>بهترین استراتژیست کنکور شو</h2>
          <h3 style={{fontSize: '2.6em'}}>دکتر پوریا شریفی</h3>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>
قبولی در کامپیوتر(نرم افزار) دانشگاه صنعتی شریف با المپیاد
<br/>
قبولی در MBA دانشگاه صنعتی شریف با رتبه 19 کنکور ارشد
<br/>
قبولی در رشته دندانپزشکی اصفهان با رتبه 480 کنکور سراسری
          </p>
          <h2 style={{fontSize: '3em', fontWeight: 600, paddingTop: 5, paddingBottom: 3}}>کلاس‌ها</h2>
          {this.state.sessions.map((session) => <>
            
          </>)}
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>
            کلاس {'فیزیک 11'} {'بار خازن'} درتاریخ {'1403/09/1'} {'سه‌شنبه'} ساعت {'20:30'}
          </p>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>دانلود مشاهده جزوه</p>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>دانلود مشاهده آزمون</p>
        </div>} {this.state.article != -1 && <div style={{maxWidth: 768, paddingBottom: 20, paddingLeft: 14, paddingRight: 14}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
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