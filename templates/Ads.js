/** #title دیوار جالوس #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><link rel="stylesheet" href="/static/map.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
    constructor(props) {super(props); let app = this; window.app = this;
      this.state = {swap: -1, swapLocation: [51.64841, 32.70773], swapQ: 'test', swapCategory: 'cat', swapBudget: 0, note: -1, noteInput: '', ads: [], show: {}, phone: cookie('phone'), session: cookie('session'), keys: {}, potent: false, potentOtp: '', otp: false, potentPhone: '', potentInterest: '', plyr: true, searchInput: '', noteInput: '', filter: {}, page: 1, searchExpand: false, footExpand: false, rows: 5, trans: true, background: 0, leftMenu: 'لیست سرچ', urlList: '', category: -1, categoryShow: false, firstMenuShow: false, firstMenuIndex: 0, secondMenuShow: false, secondMenuIndex: 0, firstMenuList: [
        {title: 'تازه‌ترین یادداشت', action: async () => {this.state.order = '!last_note_date'; await this.search()}}, {title: 'تازه‌ترین تبلیغ', action: async () => {this.state.order = '!pan_date'; await this.search()}}, {title: 'تازه‌ترین مچ', action: async () => {this.state.order = '!last_match_date'; await this.search()}}, 
      ], secondMenuList: [
        {title: 'تازه‌ترین الف'}, {title: 'تازه‌ترین ب'}, {title: 'تازه‌ترین پ'}, 
      ], categories: [
        {q: {}, title: 'اصفهان آپارتمان'}, {q: {}, title: 'اصفهان خانه'}, {q: {}, title: 'اصفهان باغ'}, {q: {}, title: 'اصفهان خودرو'}, {q: {}, title: 'اصفهان دفترومغازه'}, {q: {}, title: 'اصفهان اجاره خانه'}]};
    } async search() {
      let ads = [];
      for (var i = 0; i < 2; i ++) {
        let r = await fetch(`/users/-?q=${this.state.searchInput}&p=${this.state.page + i}`);
        if (r.status != 200) continue;
        r = await r.json(); ads.push(...r);
      } this.setState({ads: ads})

      var st, lastScrollTop = 0, height, lock = false; document.addEventListener('scroll', async (e) => {
        if (lock) return;
        st = window.pageYOffset || document.documentElement.scrollTop;
        height = document.documentElement.scrollHeight - window.screen.height + 200;
        if (st > lastScrollTop) {
          if ((height - st) / height * this.state.ads.length < 4) {
            if (this.state.ads.length % 12 != 0) return; lock = true;
            let r = await fetch(`/users/-?q=${this.state.searchInput}&p=${this.state.page + i}`);
            if (r.status != 200) lock = false;
            else {r = await r.json(); /*  for (let i = 0; i < 12; i ++ ) this.state.ads.shift(); */ if (r.length > 0) this.state.ads.push(...r); else this.state.ads.push(this.state.ads[0]); this.setState({ads: this.state.ads, page: this.state.page + 1}); lock = false;}
          }
        } /* else if (st < lastScrollTop) {
          if (st / height * this.state.ads.length < 4) {
            if (this.state.page == 1) return; lock = true;
            let r = await fetch(`/users/-?q=${this.state.searchInput}&p=${this.state.page - 1}`);
            if (r.status != 200) lock = false;
            else {r = await r.json(); for (let i = 0; i == 0 || this.state.ads.length % 12 != 0; i ++ ) this.state.ads.pop(); this.state.ads.unshift(...r); this.setState({ads: this.state.ads, page: this.state.page - 1}); lock = false;}
          }
        }*/ lastScrollTop = st <= 0 ? 0 : st;
      }, false);
    } async componentDidMount() { let app = this;
      let params = new URLSearchParams(window.location.search);
      params = Object.fromEntries(params);
      if ('p' in params) this.state.page = params.p;
      if ('q' in params) this.state.searchInput = params.q;
      if ('o' in params) this.state.order = params.o;
      if ('ids' in params) {
        let r = await fetch(`/users/${params.ids}`);
        if (r.status == 200) {r = await r.json(); this.setState({ads: r, show: r[0]});}
      } else await this.search();
      let r = await fetch('/static/divar.csv'); if (r.status == 200) this.setState({urlList: await r.text()})
      if (!('ids' in params)) setInterval(async () => {  // TODO sort kon tu db be tartibe date biad age har kodum az in 3 ta 
        let r = await fetch(`/users/-?q=${app.state.searchInput}&p=1&n=3`);
        if (r.status != 200) return;
        r = await r.json(); var flags = [false, false, false], ad;
        for (var j = 0; j < 3; j ++) {
          for (var i = 0; i < this.state.ads.length; i ++) {
            ad = this.state.ads[i];
            if (ad.id == r[j].id) {flags[j] = true; continue}
          } if (! flags[j]) {r[j].new = true; this.state.ads.unshift(r[j])};
        }
        this.setState({ads: this.state.ads});
      }, 180000);  // 180000
    } render() { let app = this;
      return <div>
        {this.state.potent ? ({/* #macro modules/potent */}) : (<>
          {/* #macro modules/menu */}
          <div style={{height: 108}}></div>
          {this.state.leftMenu == 'ثبت و بستن' && <textarea style={{border: 'none', outline: 'none', borderTop: '1px grey solid', position: 'fixed', zIndex: 899, left: 150, right: 150, border: '1px solid grey', borderRadius: 8, marginTop: 10, direction: 'ltr', padding: 4, minHeight: 250}} value={this.state.urlList} onChange={async (e) => {this.setState({urlList: e.target.value})}}></textarea>}
          {this.state.note >= 0 && <div id="notes" style={{fontSize: '1.3em', position: 'fixed', bottom: 1, left: 80, right: 80, height: 222, overflowY: 'scroll', background: '#ffff', borderRadius: 8, border: '1px solid grey', zIndex: 898}}>
            <div style={{height: 'calc(222px - 3em)', overflowY: 'scroll', overflowX: 'hidden'}}>{this.state.ads[this.state.note].notes.toReversed().map(t => <div><span style={{marginRight: 9, marginLeft: 4, marginTop: 5, verticalAlign: 'middle', display: 'inline-block', fontSize: '1.4em'}}><span style={{color: '#a3a4ce', fontSize: 12, position: 'relative', top: -3, paddingLeft: 4}}>{t.date.split(' ')[1].split(':')[0]}:{t.date.split(' ')[1].split(':')[1]}</span>•</span>{t.note}</div>)}</div>
            <input autoFocus placeholder="یادداشت" style={{position: 'absolute', bottom: 0, width: 'calc(100% - 18px)', border: 'none', outline: 'none', borderTop: '1px grey solid', lineHeight: '3em', fontSize: '.95em', left: 9, right: 9}} autocomplete="off" value={this.state.noteInput} onBlur={(e) => {let target = e.nativeEvent.explicitOriginalTarget; if(target.id != 'notes' && target.parentElement.id != 'notes' && target.parentElement.parentElement.id != 'notes') this.setState({note: -1}); else window.setTimeout(() => e.target.focus(), 0)}}
              onChange={async (e) => {this.setState({noteInput: e.target.value})}} onKeyPress={async (e) => {if(e.key === 'Enter') {let r = await fetch(`/users/${this.state.ads[this.state.note].id}/notes`, {method: 'PUT', body: this.state.noteInput}); if (r.status == 200) {this.state.ads[this.state.note].notes.push({note: this.state.noteInput, date: (new Date(Date.now() - (new Date).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ')})}; this.setState({noteInput: ''});}}}/>
            <div class="touchable" style={{position: 'absolute', left: 3, bottom: 3, border: '1px solid #ea456e', padding: 5, paddingBottom: 4, paddingTop: 4, borderRadius: 6}} onClick={async () => {let r = await fetch(`/users/${this.state.ads[this.state.note].id}/notes`, {method: 'PUT', body: '📞'}); if (r.status == 200) {this.state.ads[this.state.note].notes.push({note: '📞', date: (new Date(Date.now() - (new Date).getTimezoneOffset() * 60000)).toISOString().replace('T', ' ')}); this.setState({note: this.state.note})}}}>📞</div>
            <div class="touchable" style={{fontSize: '1.2em', position: 'absolute', left: 35, bottom: 3, border: '1px solid #ea456e', padding: 3, paddingBottom: 2, paddingTop: 2, borderRadius: 6}}>🔥</div>
            <div class="touchable" style={{fontSize: '1.3em', position: 'absolute', left: 67, bottom: 3, border: '1px solid #ea456e', padding: 3, paddingBottom: 0, paddingTop: 2, borderRadius: 6}} onClick={() => this.setState({swap: this.state.note, note: -1})}>🔀</div>
            <a class="touchable" style={{fontSize: '1.34em', position: 'absolute', left: 101, bottom: 3, border: '1px solid #ea456e', padding: 2, paddingBottom: 0, paddingTop: 1, borderRadius: 6}} href={`/users/${this.state.ads[this.state.note].id}/~`} target="_blank" rel="noopener noreferrer">💲</a>
            <div class="touchable" style={{fontSize: '1.25em', position: 'absolute', left: 134, bottom: 3, border: '1px solid #ea456e', padding: 3, paddingBottom: 0, paddingTop: 3, borderRadius: 6}} onClick={async () => {let r = await fetch(`/users/${this.state.ads[this.state.note].id}/~`, {method: 'POST', body: JSON.stringify({disable: ('disable' in this.state.ads[this.state.note]) ? ! this.state.ads[this.state.note].disable : true})}); if (r.status == 200) {this.state.ads[this.state.note].disable = ('disable' in this.state.ads[this.state.note]) ? ! this.state.ads[this.state.note].disable : true; this.setState({note: this.state.note})}}}>❌</div>
          </div>} {this.state.swap >= 0 && <div id="swap" style={{marginBottom: 0, fontSize: '1.3em', position: 'fixed', bottom: 1, left: 80, right: 80, height: 222, overflow: 'hidden', background: '#ffff', borderRadius: 8, border: '1px solid grey', zIndex: 899}}>
            <div style={{verticalAlign: 'middle', display: 'inline-block', width: '50%', height: '100%', backgroundColor: 'yellow'}}>
              <div id="swap-categoreis"></div>
              <div id="swap-budget"></div>
              <input autoFocus placeholder="مشخصات" id="swap-q" style={{position: 'absolute', bottom: 0, width: 'calc(50% - 18px)', border: 'none', outline: 'none', borderTop: '1px grey solid', lineHeight: '3em', fontSize: '.95em', right: 9}} autocomplete="off" value={this.state.swapQ} onBlur={(e) => {let target = e.nativeEvent.explicitOriginalTarget; if(target.id != 'swap' && target.parentElement.id != 'swap' && target.parentElement.parentElement.id != 'swap' && target.parentElement.parentElement.parentElement.id != 'swap') this.setState({swap: -1}); else window.setTimeout(() => e.target.focus(), 0)}}
                onChange={async (e) => {this.setState({swapQ: e.target.value})}} />
            </div>
            <div id="swap-map" style={{verticalAlign: 'middle', display: 'inline-block', width: '50%', height: '100%', backgroundColor: 'green'}}></div>
          </div>} <div class="narrow_fit" style={{background: 'white', fontSize: '1.5em', paddingTop: 5}}>
            {this.state.ads.map((ad, adi) => <div class="touchable" style={{paddingTop: 10, paddingBottom: 5}} onClick={() => {console.log(ad.id); this.setState({show: ad})}}>
              <div class="narrow_fit_image" style={{flexShrink: 0, display: 'inline-block', verticalAlign: 'top', backgroundImage: `url(/static/properties/${ad.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 254, borderRadius: 8}}/>
              <div class="narrow_fit_text" style={{textAlign: 'justify', display: 'inline-block', verticalAlign: 'top', minHeight: 254, position: 'relative'}}>
                <span style={{fontWeight: 500, paddingLeft: 4}}>{ad.title}</span>
                <span>{ad.description}</span><br></br>
                <div style={{position: 'absolute', bottom: -3.5, textDecoration: 'none', color: '#343747', fontWeight: 500, cursor: 'pointer'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); console.log('hu ha ha')}}><img src={`/static/consultants/${ad.consultant.icon}`} style={{height: 30, display: 'inline-block', verticalAlign: 'middle', marginLeft: 4}}/>{ad.consultant.name}</div>
                <a style={{position: 'absolute', bottom: 0, textDecoration: 'none', color: '#343747', fontWeight: 500, cursor: 'pointer', right: ad.consultant.name.length * 9 + 68}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); window.open(`tel:${ad.phone}`, '_self')}}>{ad.phone}</a>
                <a style={{position: 'absolute', bottom: 0, left: 0, textDecoration: 'none', color: '#f43747', fontSize: '.85em', fontWeight: 500, cursor: 'pointer', paddingRight: 10}} href={`https://divar.ir/v/_/${ad.id}`} target="_blank" rel="noopener noreferrer" onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();}}>دیوار</a>
                <a style={{position: 'absolute', bottom: 0, left: 40, textDecoration: 'none', color: '#f43747', fontSize: '.85em', fontWeight: 500, cursor: 'pointer', paddingRight: 10}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); window.scrollTo({ top: window.scrollY + e.target.getBoundingClientRect().top - 342 }); this.setState({note: adi})}}>یادداشت<span style={{backgroundColor: '#f43747', color: 'white', borderRadius: 10, width: 20, height: 20, display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginRight: 5, lineHeight: '20px'}}>{ad.notes.length.farsify()}</span></a>
                { ad.disable && <span style={{position: 'absolute', bottom: 0, left: 120, textDecoration: 'none', color: '#e1a400', fontWeight: 700, fontSize: '.8em'}}>❌</span> }
                { ad.new && <span style={{position: 'absolute', bottom: 4, left: 135, textDecoration: 'none', color: '#e1a400', fontWeight: 700, fontSize: '.8em'}}>new</span>}
              </div>
            </div>)}
          </div>
          {!this.state.show.isEmpty() && <div style={{position: 'fixed', left: 0, right: 0, top: 0, bottom: 0, zIndex: 799, padding: 14, backgroundColor: '#1111126A'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if (this.state.ordered) return; if(e.target === e.currentTarget) this.setState({show: {}})}}>
            <div ref={(elem) => {window.show = elem;}} className="scroll" style={{height: '100%', backgroundColor: 'white', borderRadius: 16, direction: 'rtl', overflowY: 'scroll'}}>
              <div style={{paddingRight: '1em', direction: 'rtl', }}>
                <div>
                  <span class={this.state.ordered ? "bold" : "bold touchable"} style={{left: 'calc(0px)', top: '12px', position: 'relative', display: 'inline-block', transform: 'rotate(45deg)', fontSize: '1.05em', padding: 8, paddingBottom: 3, color: '#bb2d3b', opacity: this.state.ordered ? .6 : 1}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if (this.state.ordered) return; this.setState({show: {}})}}>+</span>
                  <span class="bold touchable" style={{left: 'calc(8px)', top: '10px', position: 'relative', display: 'inline-block', fontSize: '.95em', padding: 8, paddingBottom: 3, color: '#bb2d3b', float: 'left'}} onClick={(e) => { e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); window.show.scrollTo(0, window.show.scrollHeight);}}>{this.state.ordered ? 'لغو' : 'سفارش'}</span>
                </div>
              </div>
              <div style={{marginTop: '1.05em', display: 'flex', flexDirection: 'row', overflowX: 'auto', direction: 'rtl'}}>{ this.state.show.images.map((im) => <div style={{flexShrink: 0, display: 'inline-block', backgroundImage: `url(/static/properties/${im})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 200, width: '100%'}}/>)}</div>
              <div style={{fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.5, paddingTop: '.8em', paddingBottom: '.9em', paddingRight: '.75em'}}>{this.state.show.title}</div>
              <div style={{height: '2em', paddingLeft: '1.2em', paddingRight: '1.8em', paddingBottom: '.5em'}}><a style={{textDecoration: 'none' ,float: 'left', color: '#343747', fontWeight: 500, cursor: 'pointer'}} onClick={() => {window.open(`tel:${this.state.show.phone}`, '_self')}}>{('0' + this.state.show.phone.slice(3)).farsify()}</a><div style={{float: 'right'}}>تماس</div></div>
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
              <div classNmae={'p'} style={{fontSize: '1.4em', padding: 16}}>{this.state.show.description}</div>
              {/*<span>{'category' in this.state.show && this.state.show.category}</span> - <span>{'id' in this.state.show && this.state.show.id}</span>*/}
              {/*<div>{'subtitle' in this.state.show && this.state.show.subtitle}</div>*/}
            </div>
          </div>}
        </>)}
      </div>
    }
  }