/** #title دیوار جالوس #title **/
/** #links <link rel="stylesheet" href="/static/digikala.css"/><link rel="stylesheet" href="/static/map.css"/> #links **/
/** #elements <div id="app"></div><div onclick="(function(event) {if(event.target == document.getElementById('plyr')) {document.getElementById('plyr').style.display = 'none'; document.getElementById('plyr').innerHTML = ''}})(event)" style="display: none; background: #0004; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 10" id="plyr"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {notes: {}, ads: [], show: {}, phone: cookie('phone'), session: cookie('session'), keys: {}, potent: false, potentOtp: '', otp: false, potentPhone: '', potentInterest: '', plyr: true, searchInput: '', filter: {}, page: 1, searchExpand: false, footExpand: false, rows: 5, trans: true, background: 0};
  } async search() {
    let ads = [];
    for (var i = 0; i < 2; i ++) {
      let r = await fetch(`/users/-?q=${this.state.searchInput}&p=${this.state.page + i}`);
      if (r.status != 200) continue;
      r = await r.json(); ads.push(...r);
    } this.setState({ads: ads});

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
    let params = new URLSearchParams(window.location);
    params = Object.fromEntries(params);
    if ('p' in params) this.state.page = params.p;
    if ('q' in params) this.state.phrase = params.q;
    await this.search();
  } render() { let app = this;
    return <div>
      {this.state.potent ? ({/* #macro modules/potent */}) : (<>
        {/* #macro modules/menu */}
        <div style={{height: 108}}></div>
        {!this.state.notes.isEmpty() && <div id="notes" style={{fontSize: '1.8em', position: 'fixed', bottom: 25, left: 150, right: 150, height: 360, overflowY: 'scroll', background: '#ffff', borderRadius: 8, border: '1px solid grey', zIndex: 899}}>
          {this.state.notes.notes.map(t => <div><span style={{marginRight: 9, marginLeft: 4, marginTop: 5, verticalAlign: 'middle', display: 'inline-block', fontSize: '1.4em'}}>•</span>{t}</div>)}
          <input autoFocus placeholder="یادداشت" class="input" style={{position: 'absolute', bottom: 0, width: 'calc(100% - 18px)', border: 'none', outline: 'none', borderTop: '1px grey solid', lineHeight: '3em', fontSize: '.95em', left: 9, right: 9}} autocomplete="off" value={this.state.notes.input} onBlur={(e) => {let target = e.nativeEvent.explicitOriginalTarget; if(target.id != 'notes' && target.parentElement.id != 'notes' && target.parentElement.parentElement.id != 'notes') this.setState({notes: {}}); else window.setTimeout(() => e.target.focus(), 0)}} onChange={async (e) => {this.state.notes.input = e.target.value; this.setState({notes: this.state.notes})}} onKeyPress={async (e) => {if(e.key === 'Enter') {this.state.notes.notes.push(this.state.notes.input); this.state.notes.input = ''; this.setState({notes: this.state.notes})}}}/>
        </div>} <div style={{background: 'white', fontSize: '2.1em', paddingLeft: 150, paddingRight: 150, paddingTop: 5}}>
          {this.state.ads.map((ad) => <div class="touchable" style={{paddingTop: 10, paddingBottom: 5}} onClick={() => {this.setState({show: ad})}}>
            <div style={{flexShrink: 0, display: 'inline-block', verticalAlign: 'top', backgroundImage: `url(/static/properties/${ad.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 360, width: '36%', borderRadius: 8}}/>
            <div style={{textAlign: 'justify', display: 'inline-block', verticalAlign: 'top', paddingRight: 15, width: '64%', minHeight: 360, position: 'relative'}}>
              <span style={{fontWeight: 500, paddingLeft: 4}}>{ad.title}</span>
              <span>{ad.description}</span><br></br>
              <a style={{position: 'absolute', bottom: 0, textDecoration: 'none', color: '#343747', fontWeight: 500, cursor: 'pointer'}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); window.open(`tel:${ad.phone}`, '_self')}}>{ad.phone}</a>
              <a style={{position: 'absolute', bottom: 0, left: 0, textDecoration: 'none', color: '#f43747', fontSize: '.85em', fontWeight: 500, cursor: 'pointer', paddingRight: 10}} href={`https://divar.ir/v/_/${ad.id}`} target="_blank" rel="noopener noreferrer" onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();}}>دیوار</a>
              <a style={{position: 'absolute', bottom: 0, left: 40, textDecoration: 'none', color: '#f43747', fontSize: '.85em', fontWeight: 500, cursor: 'pointer', paddingRight: 10}} onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); window.scrollTo({ top: window.scrollY + e.target.getBoundingClientRect().top - 455 }); this.setState({notes: {title: 'salam', notes: ['سلام', 'هاواریو'], input: ''}})}}>یادداشت<span style={{backgroundColor: '#f43747', color: 'white', borderRadius: 10, width: 20, height: 20, display: 'inline-block', textAlign: 'center', verticalAlign: 'middle', marginRight: 5, lineHeight: '20px'}}>{'2'.farsify()}</span></a>
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
            <div classNmae={'p'}>{this.state.show.description}</div>
            {/*<span>{'category' in this.state.show && this.state.show.category}</span> - <span>{'id' in this.state.show && this.state.show.id}</span>*/}
            {/*<div>{'subtitle' in this.state.show && this.state.show.subtitle}</div>*/}
          </div>
        </div>}
      </>)}
    </div>
  }
}