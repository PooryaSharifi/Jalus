/** #title استراتژیست #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><script src="/static/plyr.js" crossorigin="anonymous"></script><link rel="stylesheet" href="/static/plyr.css"/><link rel="stylesheet" href="/static/plyr.min.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {history.back(); document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this; window.mode_11 = ['معدل کل', 'تراز کل', 'ریز نمره']; window.mode_12 = ['معدل کل', 'تراز کل', 'ریز نمره']; window.mode_13 = ['درصد کلی', 'تراز کنکور', 'درصد دروس']; window.field = [['empirical', 'تجربی'], ['technical', 'ریاضی'], ['humanity', 'انسانی']]; window.quota = [[1, 'منطقه یک'], [2, 'منطقه دو'], [3, 'منطقه سه'], [5, 'سهمیه ۵ درصد'], [15, 'سهمیه ۱۵ درصد']]
    this.state = {page: 'strategist', fr_page: 'استراتژیست', menuHeight: 108, ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, leftMenu: 'مسیر قهرمانی', firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
      {title: 'پیام‌های مشاور', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین مطلب', href: '/strategist/articles'}, {title: 'تازه‌ترین پادکست', href: '/strategist/podcasts'}, 
    ], secondMenuList: [
      {title: 'سوالات درک مطلب', href: '/strategist/exam?category=dark'}, {title: 'تست هفتگی', href: '/strategist/exam'}, {title: 'رفع اشکال', href: '/strategist/exam?category=reminder'},
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
      {href: '/strategist/zist', title: 'زیست', png: '/static/categories/biology_2.webp'},
      {href: '/strategist/riazi', title: 'ریاضی', png: '/static/categories/mathematics_0.webp'},
      {href: '/strategist/shimi', title: 'شیمی', png: '/static/categories/chemistry_1.webp'},
      {href: '/strategist/fizik', title: 'فیزیک', png: '/static/categories/physics_3.webp'},
      {href: '/strategist/farsi', title: 'ادبیات', png: '/static/categories/litrature_0.webp'},
      {href: '/strategist/dini', title: 'دین‌وزندگی', png: '/static/categories/relagion_2.webp'},
      {href: '/strategist/arabi', title: 'عربی', png: '/static/categories/arabic_1.webp'},
      {href: '/strategist/englisi', title: 'انگلیسی', png: '/static/categories/english_0.webp'},
      {href: '/strategist/zamin', title: 'زمین‌شناسی', png: '/static/categories/geology_0.webp'},
      {href: '/strategist/gosaste', title: 'گسسته', png: '/static/categories/discrete_0.webp'},
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
    ], stories: [], offers: [
      {name: 'مریلا زارعی', achievement: 'برق شریف', quota: 121},
      {name: 'مصطفی اجاقی', achievement: 'کامپیوتر شریف', quota: 57},
      {name: 'محمد امیدی', achievement: 'دندانپزشکی آزاد اصفهان', quota: 760},
      {name: 'نیوشا آقایی', achievement: 'پزشکی اصفهان', quota: 840},
    ], foot_logos: [
      {svg: '/static/icon/jalus_host.svg', href: '/host'}, {svg: '/static/icon/jalus_rebuild.svg', href: '/rebuild'},
      {svg: '/static/icon/jalus_dual.svg', href: '/greenhome'}, {svg: '/static/icon/jalus_key.svg', href: '/host#smartkey'},
      {svg: '/static/icon/jalus_pay.svg', href: '/host#payment'}, {svg: '/static/icon/jalus_service.svg', href: '/'},
      {svg: '/static/icon/jalus_club.svg', href: '/'}, {svg: '/static/icon/jalus_smart.svg', href: '/host#all'}
    ], app: window.location.pathname.split('/').filter((keyword) => keyword)[1] || '', potent: false, potentOtp: '', otp: false, potentPhone: '', potentInterest: '', plyr: true, searchInput: '', searchExpand: false, footExpand: false, rows: 5, trans: true, background: 0, microwave: 0, 
    foot: 'استراتژیست زندگی قهرمانان رو ترویج میکنه. دیوسالارانی که به خاطر هدفشون حتی سیم‌کشی مغذشونو تغییر میدن و با جنگاوری قبولی تو رشته مورد علاقشونو زندگی می‌کنن. با یه آمارگیری ساده میشه دید موفقیت نه به بهره هوشی یا ژن خوب بستگی داره بلکه ممارست و آوردن چنتا عادتای تست شده به زندگیت و رعایت چنتا فوت و فن دقیقه که سبب میشه تو مسیرت قهرمان بشی درسته که تو هر راهی قهرمان یدونست و طبق آمار و احتمال، امکانش کمه که تو اون یه نفر باشی. اما بدون با زندگی کردن زندگی یه قهرمان، قطعا اون یه نفر تویی همین الان که داری این متنو میخونی داری از پنچ درصد گنجایش مغزت استفاده می‌کنی. پس اگه تا ته مسیر رو همرای کنی خبرای خوبی در انتظارته. اگه مسیرو بدونی و بلد باشی تخته گاز برونی قطعا سریع تر از رقبا به جایی که میخوای میرسی. کافی این دوی ماراتون کنکور رو پیوسته و دقیق پیش بری و به تیم من اعتماد کنی. چرا که هم خودم هم تیمم با همین چیزا به هدف رسیدن', foot_title: 'منشور دیوسالاران کنکور', 
    predict_result: {}, predict: {
      religion_all_11: '', english_all_11: '', litrature_all_11: '', arabic_all_11: '', geometry_technical_11: '', physics_technical_11: '', chemistry_empirical_11: '', biology_empirical_11: '', history_humanity_11: '', sociology_humanity_11: '',
      physics_technical_12: '', physics_empirical_12: '', mathematics_all_12: '', chemistry_technical_12: '', chemistry_empirical_12: '', arabic_all_12: '', religion_all_12: '', english_all_12: '', litrature_all_12: '', sociology_all_12: '', health_all_12: '', discrete_technical_12: '', philosophy_humanity_12: '', language_humanity_12: '', biology_empirical_12: '',
      mathematics_all_13: '', physics_empirical_13: '', chemistry_empirical_13: '', biology_empirical_13: '', geology_empirical_13: '', chemistry_technical_13: '', physics_technical_13: '', finance_humanity_13: '', litrature_humanity_13: '', arabic_humanity_13: '', history_humanity_13: '', geograpy_humanity_13: '', sociology_humanity_13: '', psychology_humanity_13: '', philosophy_humanity_13: '', logic_humanity_13: '',
      total_all_11: '', total_all_12: '', total_all_13: '', 
    }, mode_11: parseInt(cookie('mode_11') || '0'), prev_mode_11: parseInt(cookie('mode_11') || '0'), mode_12: parseInt(cookie('mode_12') || '0'), prev_mode_12: parseInt(cookie('mode_12') || '0'), mode_13: parseInt(cookie('mode_13') || '0'), prev_mode_13: parseInt(cookie('mode_13') || '0'), field: parseInt(cookie('field') || '0'), field_show: false, quota: parseInt(cookie('quota') || '0'), prev_quota: parseInt(cookie('quota') || '0')};
  } async componentDidMount() { let app = this;
    let stories = await fetch('http://localhost:5000/stories/strategist'); if (stories.status < 300) {
      stories = await stories.json(); app.setState({stories: Object.keys(stories).map((story) => ({title: story.split('_')[1], jpeg: '/stories/' + story + '.jpg', href: story, resolutions: stories[story][0], ccs: stories[story][1], markers: stories[story][2]}))})
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
        {this.state.app == 'takhmin' && <div class="relative flex justify-center items-center w-full h-full max-w-[1336px] mx-auto rounded-none sm:rounded-3xl overflow-hidden xs:mt-0">
          <div style={{background: 'linear-gradient(transparent 0%, white 100%), linear-gradient(transparent 0%, white 100%), linear-gradient(transparent 0%, white 100%), linear-gradient(to left, #654EA3 0%, #EAAFC8 100%)', maxWidth: 768, minWidth: Math.min(480, window.innerWidth), padding: 40, paddingTop: 25, borderRadius: 16, marginTop: 10}}>
            <div style={{color: 'white', fontSize: '1.8em', fontWeight: 700, marginBottom: 20}}>سهمیه: 
              {this.state.quota == -1 && <div style={{position: 'absolute', zIndex: 2, marginRight: 6, marginLeft: 6, marginTop: -6, display: 'inline-block', borderRadius: 8, border: '1px solid white', minWidth: 70, whiteSpace: 'nowrap', backgroundColor: '#ac8fc1'}}>{window.quota.map((q, qi) => <><span class="touchable" style={{display: 'inline-block', marginRight: 6, marginLeft: 6, lineHeight: '2em', borderBottom: window.quota.length - 1 == qi ? 'none' : '1px solid white', width: 'calc(100% - 12px)'}} onClick={() => {this.setState({quota: qi, prev_quota: qi})}}>{q[1]}</span><br/></>)}</div>}
              <span class="touchable" style={{borderBottom: '2px solid white', paddingLeft: 3, paddingRight: 3, paddingBottom: 4, marginRight: 8}} onClick={() => {if (this.state.field_show || this.state.mode_11 == -1 || this.state.mode_12 == -1 || this.state.mode_13 == -1 || this.state.quota == -1) return; this.setState({quota: -1})}}><span style={{display: 'inline-block', height: 9, width: 9, borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginLeft: 7}}></span>{window.quota[this.state.quota != -1 ? this.state.quota : this.state.prev_quota][1]}</span>
               ، گروه: 
              {!this.state.field_show ? <span class="touchable" style={{borderBottom: '2px solid white', paddingLeft: 3, paddingRight: 3, paddingBottom: 4, marginRight: 8}} onClick={() => {if (this.state.field_show || this.state.mode_11 == -1 || this.state.mode_12 == -1 || this.state.mode_13 == -1 || this.state.quota == -1) return; this.setState({field_show: true})}}><span style={{display: 'inline-block', height: 9, width: 9, borderRight: '2px solid white', borderBottom: '2px solid white', transform: 'rotate(45deg)', marginLeft: 7}}></span>{window.field[this.state.field][1]}</span> : 
              <div style={{position: 'absolute', zIndex: 2, marginRight: 6, marginLeft: 6, marginTop: -6, display: 'inline-block', borderRadius: 8, border: '1px solid white', minWidth: 70, whiteSpace: 'nowrap', backgroundColor: '#ac8fc1'}}>{window.field.map((f, fi) => <><span class="touchable" style={{display: 'inline-block', marginRight: 6, marginLeft: 6, lineHeight: '2em', borderBottom: window.field.length - 1 == fi ? 'none' : '1px solid white', width: 'calc(100% - 12px)'}} onClick={() => {this.setState({field: fi, field_show: false})}}>{f[1]}</span><br/></>)}</div>}
            </div>
            {([[13, 'کنکور'], [12, 'دوازدهم'], [11, 'یازدهم']]).map((grade, gi) => <>
              <div style={{fontSize: '1.6em', lineHeight: '2.2em', marginBottom: 20}}>
                {this.state[`mode_${grade[0]}`] == -1 && <div style={{position: 'absolute', zIndex: 2, display: 'inline-block', borderRadius: 8, border: '1px solid white', minWidth: 70, whiteSpace: 'nowrap', backgroundColor: '#ac8fc1'}}>{window[`mode_${grade[0]}`].map((q, qi) => <><span class="touchable" style={{display: 'inline-block', marginRight: 6, marginLeft: 6, lineHeight: '2em', borderBottom: window[`mode_${grade[0]}`].length - 1 == qi ? 'none' : '1px solid white', width: 'calc(100% - 12px)'}} onClick={() => {this.setState({[`mode_${grade[0]}`]: qi, [`prev_mode_${grade[0]}`]: qi})}}>{q}</span><br/></>)}</div>}
                <span onClick={() => {if (this.state.field_show || this.state.mode_11 == -1 || this.state.mode_12 == -1 || this.state.mode_13 == -1 || this.state.quota == -1) return; this.setState({[`mode_${grade[0]}`]: -1})}} class="touchable" style={{borderBottom: '2px solid #323444', paddingBottom: 5, paddingLeft: 6, paddingRight: 6}}><span style={{display: 'inline-block', height: 8, width: 8, borderRight: '2px solid #323444', borderBottom: '2px solid #323444', transform: 'rotate(45deg)', marginLeft: 5}}></span>{window[`mode_${grade[0]}`][this.state[`mode_${grade[0]}`] != -1 ? this.state[`mode_${grade[0]}`] : this.state[`prev_mode_${grade[0]}`]]}</span>
              {grade[1]}</div>
              <div style={{textAlign: 'center'}}>{Object.keys(this.state.predict).filter((key) => {let keys = key.split('_'); return (keys[2] == '' + grade[0] && (keys[1] == 'all' || keys[1] == window.field[this.state.field][0]) && (window[`mode_${grade[0]}`].length - 1 == this.state[`mode_${grade[0]}`] ? keys[0] != 'total' : keys[0] == 'total'))}).map((key) => <div style={{display: 'inline-block', marginLeft: 14, marginRight: 14, marginBottom: 20}}>
                <input style={{border: gi % 2 == 0 ? '1px solid #896fb1' : '1px solid #24c386', width: window[`mode_${grade[0]}`].length - 1 == this.state[`mode_${grade[0]}`] ? 70 : 140, backgroundColor: '#fffb', paddingTop: 8, paddingBottom: 8}} class="px-2 TextField_TextField__input__hFMFl text-subtitle w-full TextField_TextField__bwN9_ TextField_TextField--secondary__w_vGF text-subtitle w-full py-5 lg:py-2 rounded-medium" type="text"/>
                <div style={{borderBottom: gi % 2 == 0 ? '4px solid #896fb1' : '4px solid #24c386', textAlign: 'center', fontSize: '1.3em', lineHeight: '2.4em'}}>{window[`mode_${grade[0]}`].length - 1 == this.state[`mode_${grade[0]}`] ? key.split('_')[0].translate() : window[`mode_${grade[0]}`][this.state[`mode_${grade[0]}`] != -1 ? this.state[`mode_${grade[0]}`] : this.state[`prev_mode_${grade[0]}`]]}</div>
              </div>)}</div>
            </>)}
            <button class="touchable relative flex items-center user-select-none styles_btn__Q4MvL text-button-1 styles_btn--large__1Muai styles_btn--primary__y0GEv rounded-medium w-full mt-6 lg:mt-8 text-button-1" onClick={async () => {
              this.setState({predict_result: {loading: true}}); setCookie('field', this.state.field); setCookie('mode_11', this.state.mode_11); setCookie('mode_12', this.state.mode_12); setCookie('mode_13', this.state.mode_13); setCookie('quota', this.state.quota)
              let r = await fetch('/strategist/predict', {method: 'POST', body: JSON.stringify({predict: this.state.predict, mode_11: this.state.mode_11, mode_12: this.state.mode_12, mode_13: this.state.mode_13, field: this.state.field, quota: this.state.quota}), headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}});
              if (r.status == 200) {r = await r.json(); this.setState({predict_result: r})}
            }} data-cro-id="login-register"><div class="flex items-center justify-center relative grow">محاسبه رتبه</div></button>
          </div>
        </div>} {!this.state.predict_result.isEmpty() && <div onClick={() => this.setState({predict_result: {}})} style={{backgroundColor: '#000a', position: 'fixed', width: '100%', height: '100%', left: 0, top: 0, bottom: 0, zIndex: 5, display: 'table'}}>
          <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
            <div style={{marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#ef4056', padding: 20, width: 360, borderRadius: 8, fontSize: '1.6em', fontWeight: 500, color: 'white'}}>
              {this.state.predict_result.quota && <><span style={{marginLeft: 3}}>رتبه در سهمیه:</span>
              <span style={{fontWeight: 700}}>{this.state.predict_result.quota.farsify()}</span></>}
              {this.state.predict_result.total && <><span style={{float: 'left', fontWeight: 700}}>{this.state.predict_result.total.farsify()}</span>
              <span style={{float: 'left', marginLeft: 3}}>رتبه کل:</span></>}
              {this.state.predict_result.loading && <span class="loader"></span>}
            </div>
          </div>
        </div>} {this.state.article == -1 && !this.state.app && <div style={{maxWidth: 768, paddingBottom: 20, paddingLeft: 14, paddingRight: 14}} class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
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
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>مثل یک دانشجوی پزشکی و با تمرکز
یک دانشجوی دانشگاه شریف مطالعه
کن و برای کنکور آماده شو</p>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>توی هر درس استراتژی به روز و دقیق
داشته باش و با درک درست از مدل
فکری طراحان سوالات کنکور وامتحان
نهایی درس بخون</p>
          <p style={{fontSize: '1.85em', textAlign: 'justify'}}>تو رشته های پزشکی و دندان پزشکی
یا مهندسی مورد علاقت تو بهترین
دانشگاههای تهران و اصفهان تضمینی
قبول شو</p>
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