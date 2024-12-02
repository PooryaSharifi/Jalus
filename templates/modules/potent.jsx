<div style={{height: '100vh'}} class="min-h-full w-full flex items-center flex-col bg-neutral-000 justify-center" onClick={(e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); if(e.target === e.currentTarget) this.setState({potent: false, potentInterest: ''})}}>
  <div class="styles_PageLoader--hasPageContainer__gPBo1 hidden"></div>
  <div class="lg:border-complete-200 rounded-medium p-5 lg:p-8 flex flex-col items-center justify-start lg:justify-center account-wrapper_AccountWrapper__mainBox__cC78z">
    <div class="w-full relative flex items-center justify-center mb-3">
      <div class="flex cursor-pointer right-0 text-neutral-700 transition-all duration-300 ease-out opacity-0 pointer-events-none fixed lg:absolute  logo_Logo__icon__bHD2_">
        <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
          <use xlinkHref="#arrowRight"></use>
        </svg>
      </div>
      <a class="" href="/">
        <div class="transform transition-all duration-500 ease-out" style={{width: 100, lineHeight: 0}}>
          <img class="w-full inline-block" src={`/static/icon/jalus_${this.state.potentInterest ? this.state.potentInterest : 'white'}_red.svg`} width="100" style={{objectFit: 'contain'}} alt="لوگوی جالوس" title=""/>
        </div>
      </a>
    </div>
    <div class="w-full">
      <h1 class="text-h4 text-neutral-900 text-right w-full mt-4">{{'': 'ورود | ثبت‌نام', 'dual': 'خانه سبز دومنظوره', 'hosting': 'صاحبخونه', 'rebuild': 'بازسازی'}[this.state.potentInterest]}</h1>
      <p class="text-body-2 text-neutral-700 mt-4 text-right w-full">سلام!</p>
      <p class="text-body-2 text-neutral-700 mb-4 text-right w-full">لطفا شماره موبایل خود را وارد کنید</p>
      <form>
        <label class="FormComponentFrame_FormComponentFrame__PIUpy w-full FormComponentFrame_FormComponentFrame--normal__TQSOm">
          <div class="FormComponentFrame_FormComponentFrame__input-container__BHc4I px-2 flex items-center Input_InputWrapper--error__GDWAB relative text-neutral-800 bg-neutral-100 lg:bg-neutral-000 Input_InputWrapper__d_4kf">
            <div class="grow text-body-3">
              <input class="px-2 TextField_TextField__input__hFMFl text-subtitle w-full TextField_TextField__bwN9_ TextField_TextField--secondary__w_vGF text-subtitle w-full py-5 lg:py-2 rounded-medium" autoFocus type="text" name="username" autocomplete="off" disabled={this.state.otp ? true : false} value={this.state.potentPhone} onChange={async (e) => {this.setState({potentPhone: e.target.value})}} 
              onKeyPress={async (e) => {if(e.key === 'Enter') { if (!this.state.potentPhone.trim()) return;
                if (this.state.potentInterest === '') { let r = await fetch(`/otp/${this.state.potentPhone.trim().deFarsify()}/`); if (r.status < 300) {if (!this.state.potentPhone) return; r = await r.json(); this.setState({otp: true});} } 
                else { let body = new FormData(); body.append('user', '_'); body.append('phone', this.state.potentPhone); body.append('interest', this.state.potentInterest); body.append('link', '/properties/_'); body.append('lat', .0); body.append('lng', .0); await fetch('/potent', {method: 'post', body: body})}}}}/>
            </div>
          </div>
          <p class="text-body-2 text-hint-text-error">لطفا این قسمت را خالی نگذارید</p>
          {this.state.otp ? <>
            <div class="FormComponentFrame_FormComponentFrame__input-container__BHc4I px-2 flex items-center Input_InputWrapper--error__GDWAB relative text-neutral-800 bg-neutral-100 lg:bg-neutral-000 Input_InputWrapper__d_4kf">
              <div class="grow text-body-3">
                <input class="px-2 TextField_TextField__input__hFMFl text-subtitle w-full TextField_TextField__bwN9_ TextField_TextField--secondary__w_vGF text-subtitle w-full py-5 lg:py-2 rounded-medium" autoFocus type="text" name="username" autocomplete="off" value={this.state.potentOtp} onChange={async (e) => {this.setState({potentOtp: e.target.value}, async () => { if (this.state.potentOtp.length == 4) {
                  let r = await fetch(`/otp/${this.state.potentPhone.trim().deFarsify()}/${e.target.value.trim().deFarsify()}`);
                  if (r.status < 300) {r = await r.json(); if (r.OK) {setCookie('session', r.session); setCookie('phone', this.state.potentPhone.trim().deFarsify()); this.setState({phone: this.state.potentPhone.trim().deFarsify(), session: r.session, potent: false})}}
                }})}}/>
              </div>
            </div>
            <p class="text-body-2 text-hint-text-error">لطفا کد چهاررقمی پیامک شده را وارد کنید</p>
          </> : null}
        </label>
        <button class="relative flex items-center user-select-none styles_btn__Q4MvL text-button-1 styles_btn--large__1Muai styles_btn--primary__y0GEv rounded-medium w-full mt-6 lg:mt-8 text-button-1" type="submit" data-cro-id="login-register" onClick={async (e) => {e.preventDefault(); e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();  
          if (this.state.potentInterest === '') {
            if (this.state.otp && this.state.potentOtp.length == 4) { let r = await fetch(`/otp/${this.state.potentPhone.trim().deFarsify()}/${e.target.value.trim().deFarsify()}`);
              if (r.status < 300) {r = await r.json(); if (r.OK) {setCookie('session', r.session); setCookie('phone', this.state.potentPhone.trim().deFarsify()); this.setState({phone: this.state.potentPhone.trim().deFarsify(), session: r.session, potent: false})}}
            } else { let r = await fetch(`/otp/${this.state.potentPhone.trim().deFarsify()}/`); if (r.status < 300) {if (!this.state.potentPhone) return; r = await r.json(); console.log(r); this.setState({otp: true});} }
          } else { let body = new FormData(); body.append('user', '_'); body.append('phone', this.state.potentPhone); body.append('interest', this.state.potentInterest); body.append('link', '/properties/_'); body.append('lat', .0); body.append('lng', .0); await fetch('/potent', {method: 'post', body: body}) }}}>
          <div class="flex items-center justify-center styles_btn__loading__d5Rcc">
            <svg width="24" height="24" id="e302pyQgejw1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
              <path class="styles_Loading__circle1__K7HNJ" d="M0,3C0,1.343146,1.343146,0,3,0C4.656854,0,6,1.343146,6,3C6,4.656854,4.656854,6,3,6C1.343146,6,0,4.656854,0,3Z" transform="matrix(1 0 0 1 17 9)" opacity="0.9" fill="var(--color-icon-low-emphasis)" stroke="none" stroke-width="1"></path>
              <rect class="styles_Loading__circle2__jpl_q" width="6" height="6" rx="3" ry="3" transform="matrix(1 0 0 1 9 9)" opacity="0.6" fill="var(--color-icon-low-emphasis)" stroke="none" stroke-width="1"></rect>
              <rect class="styles_Loading__circle3__otcH4" width="6" height="6" rx="3" ry="3" transform="matrix(1 0 0 1 0.94007500000000 9)" opacity="0.3" fill="var(--color-icon-low-emphasis)" stroke="none" stroke-width="1"></rect>
            </svg>
          </div>
          <div class="flex items-center justify-center relative grow">{this.state.potentInterest ? 'ثبت' : 'ورود'}</div>
        </button>
      </form>
      {this.state.potentInterest ? 
        (<p class="text-caption text-neutral-700 mt-4">با شما تماس می‌گیریم و در مورد همکاری و علاقه‌مندی شما صحبت می‌کنیم</p>) : 
        (<p class="text-caption text-neutral-700 mt-4">ورود شما به معنای پذیرش <a class="mx-1 inline-block text-secondary-700" href="/page/terms/">شرایط جالوس</a>و <a class="mx-1 inline-block text-secondary-700" href="/page/privacy/">قوانین حریم‌خصوصی</a>است </p>)
      }
    </div>
  </div>
</div>