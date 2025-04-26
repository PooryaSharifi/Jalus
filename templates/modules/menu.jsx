<div class="fixed w-full top-0 left-0 bg-neutral-000 z-4 shadow-1-bottom styles_BaseLayoutDesktop__header__L8zhh"
  id="base_layout_desktop_fixed_header" width="1270" height="108">
  <header
    class="w-full flex flex-col bg-neutral-000 relative BaseLayoutDesktopHeader_BaseLayoutDesktopHeader__QxTqh BaseLayoutDesktopHeader_BaseLayoutDesktopHeader--nav-open__cty_v"
    style={{height: this.state.menuHeight || 108}}>
    <div class="w-full bg-neutral-000 relative z-5">
      <div class=" flex w-full container-4xl-w mx-auto relative justify-between md:px-4 grow">
        <div class="w-full py-3 flex relative z-2">
          <div class="flex flex-1 items-center grow"><a class="ml-5 shrink-0" data-cro-id="header-digikala-logo"
              href="/">
              <div style={{width: 115, height: 30, lineHeight: 0}}><img class="w-full inline-block"
                  src="/static/icon/jalus_gaf_red.svg" width="115" height="30" style={{objectFit: 'contain'}}
                  alt="لوگوی دیجیکالا" title=""/></div>
            </a>
            <div class="flex grow ml-auto">
              <div class="relative">
                <div class={"BaseLayoutSearch_BaseLayoutSearch__QHPTB " + (this.state.searchExpand ? "focus" : "")}>
                  <div data-cro-id="searchbox-click"
                    class="flex items-center SearchInput_SearchInput__HB9qi SearchInput_SearchInput__searchInput__CEpaj ellipsis bg-neutral-100 grow rounded px-0 lg:px-4 text-body-2">
                    <div class="w-full rounded-full">
                      <div class="flex items-center justify-between grow min-w-0 h-9">
                        <div class="flex cursor-pointer"><svg
                            style={{width: 24, height: 24, fill: 'var(--color-icon-low-emphasis)'}}>
                            <use xlinkHref="#searchSearch">
                              <symbol id="searchSearch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M10.5 18a7.5 7.5 0 115.973-2.963l4.369 4.246-1.394 1.434-4.387-4.263A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" clip-rule="evenodd"></path></symbol>
                            </use>
                          </svg></div><span data-cro-id="searchbox-type" class="grow px-2 lg:px-4 ellipsis">
                          {this.state.searchExpand ? (<div style={{position: 'absolute', left: 0, top: 0}} class="bg-neutral-000 overflow-y-auto rounded-medium styles_Popper__OOG0C shadow-modal border-complete-200 z-2 top-0 BaseLayoutSearch_BaseLayoutSearch__popper__SGa9Y styles_Popper--animated-active__36PO8">
                            <div class="grow">
                              <div class="flex flex-col h-full overflow-y-hidden styles_ModalLayout__y3Bs1">
                                <div class="w-full z-1 bg-neutral-000 py-3 lg:py-0" width="598" height="44">
                                  <div class="flex items-center">
                                    <div class="grow text-h5">
                                      <div data-cro-id="searchbox-click" class="flex items-center SearchInput_SearchInput__HB9qi SearchInput_SearchInput__searchInput__CEpaj SearchInput_SearchInput--active__U9csa bg-neutral-000 mx-4">
                                        <div class="w-full rounded-full">
                                          <div class="flex items-center justify-between grow min-w-0 h-9">
                                            <div class="flex cursor-pointer">
                                              <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                <use xlinkHref="#searchSearch"></use>
                                              </svg>
                                            </div>
                                              <span data-cro-id="searchbox-type" class="grow">
                                                <label class="FormComponentFrame_FormComponentFrame__PIUpy w-full">
                                                  <div class="FormComponentFrame_FormComponentFrame__input-container__BHc4I px-2 flex items-center !px-0">
                                                    <div class="grow text-body-3">
                                                      <input autoFocus class="px-2 TextField_TextField__input__hFMFl text-subtitle w-full TextField_TextField__bwN9_ TextField_TextField--primary__IZ6Ku text-neutral-500 text-body-2 lg:text-body-2 text-button-1 h-full" type="text" name="search-input" placeholder="جستجو" autocomplete="off" value={this.state.searchInput} onBlur={() => {this.setState({searchExpand: false})}} onChange={async (e) => {this.setState({searchInput: e.target.value})}} onKeyPress={async (e) => {if(e.key === 'Enter') {
                                                        this.setState({searchExpand: false, page: 1}); await this.search();
                                                      }}}/>
                                                    </div>
                                                  </div>
                                                </label>
                                              </span>
                                            <div class="flex cursor-pointer">
                                              <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                <use xlinkHref="#clear"></use>
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              <div class="grow flex flex-col overflow-y-auto">
                                <div class="grow flex flex-col styles_children__hHq5Q hide-scrollbar">
                                  <div class="pb-4 br-list-vertical-no-padding-200 top-0 right-0">
                                    <div class="gap-2">
                                      <div class="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode swiper-container-rtl">
                                        <div class="swiper-wrapper">
                                          <div class="swiper-slide swiper-slide-active" style={{width: 'auto', height: 'auto', marginLeft: 8}}>
                                            <div></div>
                                          </div>
                                        </div>
                                      <div class="styles_Slider__next-button-selector__R9M5X hidden lg:flex justify-center items-center bg-neutral-000 absolute cursor-pointer z-5 rounded-circle styles_ScrollHorizontalWrapper__button__uMRet styles_ScrollHorizontalWrapper__button--next__0VY_Y lg:hidden">
                                        <div class="flex">
                                          <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                            <use xlinkHref="#chevronLeft"></use>
                                          </svg>
                                        </div>
                                      </div>
                                      <div class="styles_Slider__prev-button-selector__fsha9 hidden lg:flex justify-center items-center bg-neutral-000 absolute cursor-pointer z-5 rounded-circle styles_ScrollHorizontalWrapper__button__uMRet styles_ScrollHorizontalWrapper__button--prev___Vx1r lg:hidden">
                                        <div class="flex">
                                          <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                            <use xlinkHref="#chevronRight"></use>
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="lg:px-4">
                                    <div class="px-5 flex flex-col">
                                      <div class="br-list-vertical-no-padding-200">
                                        <a class="flex items-center py-2" href="/brand-landing/huawei/">
                                          <div class="ml-2" style={{width: 32, height: 32, borderRadius: 4, lineHeight: 0}}>
                                            <img class="w-full inline-block" src="https://dkstatics-public.digikala.com/digikala-brands/af664f0bcf9bc412b741c618e6e52fc2d090198f_1619269008.png?x-oss-process=image/resize,m_lfit,h_160,w_160/quality,q_80" width="32" height="32" style={{objectFit: 'contain', borderRadius: 4}} alt="هوآوی" title=""/>
                                          </div>
                                          <p class="text-subtitle-strong text-neutral-700">همه کالاهای برند هوآوی</p>
                                        </a><a class="styles_Link__RMyqc" data-cro-id="searchbox-categories" href="/search/exhaust-fans/?q=%D9%87%D9%88%D8%A7%DA%A9%D8%B4">
                                          <span class="cursor-pointer py-3 break-words block !py-2">
                                            <div class="flex justify-between items-start">
                                              <div class="flex shrink-0 ml-4 mt-0.5">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchSearch"></use>
                                                </svg>
                                              </div>
                                              <div class="grow text-right">
                                                <span class="grow text-subtitle-strong text-neutral-700">هواکش</span>
                                                <div>
                                                  <div class="text-body1-strong">
                                                    <span class="text-neutral-500">در دسته</span>
                                                    <span class="text-secondary-500">هواکش</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </span>
                                        </a><a class="styles_Link__RMyqc" data-cro-id="searchbox-categories" href="/search/airplanes-and-helicopters/?q=%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7">
                                          <span class="cursor-pointer py-3 break-words block !py-2">
                                            <div class="flex justify-between items-start">
                                              <div class="flex shrink-0 ml-4 mt-0.5">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchSearch"></use>
                                                </svg>
                                              </div>
                                              <div class="grow text-right">
                                                <span class="grow text-subtitle-strong text-neutral-700">هواپیما</span>
                                                <div>
                                                  <div class="text-body1-strong">
                                                    <span class="text-neutral-500">در دسته</span>
                                                    <span class="text-secondary-500">هواپیما و هلیکوپتر</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </span>
                                        </a><a class="styles_Link__RMyqc" data-cro-id="searchbox-categories" href="/search/mobile-phone/?q=%D9%87%D9%88%D8%A7%D9%88%DB%8C">
                                          <span class="cursor-pointer py-3 break-words block !py-2">
                                            <div class="flex justify-between items-start">
                                              <div class="flex shrink-0 ml-4 mt-0.5">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchSearch"></use>
                                                </svg>
                                              </div>
                                              <div class="grow text-right">
                                                <span class="grow text-subtitle-strong text-neutral-700">هواوی</span>
                                                <div>
                                                  <div class="text-body1-strong">
                                                    <span class="text-neutral-500">در دسته</span>
                                                    <span class="text-secondary-500">گوشی موبایل</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </span>
                                        </a>
                                      </div>
                                      <div class="br-list-vertical-no-padding-200">
                                        <div data-cro-id="searchbox-suggested-search">
                                          <a class="cursor-pointer py-3 break-words block !py-2" href="/search/?q=%D9%87%D9%88%D8%A2%D9%88%DB%8C">
                                            <div class="flex justify-between items-center">
                                              <div class="flex shrink-0 ml-4">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchSearch"></use>
                                                </svg>
                                              </div>
                                              <div class="grow text-right">
                                                <span class="grow text-subtitle-strong text-neutral-700">هوآوی</span>
                                                <div></div>
                                              </div>
                                              <div class="flex items-center shrink-0 mr-4">
                                                <div class="flex cursor-pointer">
                                                  <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                    <use xlinkHref="#searchPlaceSuggest">
                                                    <symbol id="searchPlaceSuggest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 8.414L6.707 18.707l-1.414-1.414L15.586 7H9V5h9a1 1 0 011 1v9h-2V8.414z"></path></symbol>
                                                    </use>
                                                  </svg>
                                                </div>
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                        <div data-cro-id="searchbox-suggested-search">
                                          <a class="cursor-pointer py-3 break-words block !py-2" href="/search/?q=Huawei">
                                            <div class="flex justify-between items-center">
                                              <div class="flex shrink-0 ml-4">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchSearch"></use>
                                                </svg>
                                              </div>
                                              <div class="grow text-right">
                                                <span class="grow text-subtitle-strong text-neutral-700">Huawei</span>
                                                <div></div>
                                              </div>
                                              <div class="flex items-center shrink-0 mr-4">
                                                <div class="flex cursor-pointer">
                                                  <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                    <use xlinkHref="#searchPlaceSuggest">
                                                    <symbol id="searchPlaceSuggest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 8.414L6.707 18.707l-1.414-1.414L15.586 7H9V5h9a1 1 0 011 1v9h-2V8.414z"></path></symbol>
                                                    </use>
                                                  </svg>
                                                </div>
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                        <div data-cro-id="searchbox-suggested-search">
                                          <a class="cursor-pointer py-3 break-words block !py-2" href="/search/?q=%D9%87%D9%88%D8%A7%DA%A9%D8%B4">
                                            <div class="flex justify-between items-center">
                                              <div class="flex shrink-0 ml-4">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchSearch"></use>
                                                </svg>
                                              </div>
                                              <div class="grow text-right">
                                                <span class="grow text-subtitle-strong text-neutral-700">هواکش</span>
                                                <div></div>
                                              </div>
                                            <div class="flex items-center shrink-0 mr-4">
                                              <div class="flex cursor-pointer">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchPlaceSuggest">
                                                  <symbol id="searchPlaceSuggest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 8.414L6.707 18.707l-1.414-1.414L15.586 7H9V5h9a1 1 0 011 1v9h-2V8.414z"></path></symbol>
                                                  </use>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                      <div data-cro-id="searchbox-suggested-search">
                                        <a class="cursor-pointer py-3 break-words block !py-2" href="/search/?q=%D9%87%D9%88%D8%A7%D9%BE%DB%8C%D9%85%D8%A7">
                                          <div class="flex justify-between items-center">
                                            <div class="flex shrink-0 ml-4">
                                              <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                <use xlinkHref="#searchSearch"></use>
                                              </svg>
                                            </div>
                                            <div class="grow text-right">
                                              <span class="grow text-subtitle-strong text-neutral-700">هواپیما</span>
                                            <div></div>
                                            </div>
                                            <div class="flex items-center shrink-0 mr-4">
                                              <div class="flex cursor-pointer">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchPlaceSuggest">
                                                  <symbol id="searchPlaceSuggest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 8.414L6.707 18.707l-1.414-1.414L15.586 7H9V5h9a1 1 0 011 1v9h-2V8.414z"></path></symbol>
                                                  </use>
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>
                                      <div data-cro-id="searchbox-suggested-search">
                                        <a class="cursor-pointer py-3 break-words block !py-2" href="/search/?q=%D9%87%D9%88%D8%A7%D9%88%DB%8C">
                                          <div class="flex justify-between items-center">
                                            <div class="flex shrink-0 ml-4">
                                              <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                <use xlinkHref="#searchSearch"></use>
                                              </svg>
                                            </div>
                                            <div class="grow text-right">
                                              <span class="grow text-subtitle-strong text-neutral-700">هواوی</span>
                                              <div></div>
                                            </div>
                                            <div class="flex items-center shrink-0 mr-4">
                                              <div class="flex cursor-pointer">
                                                <svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                                                  <use xlinkHref="#searchPlaceSuggest">
                                                  <symbol id="searchPlaceSuggest" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 8.414L6.707 18.707l-1.414-1.414L15.586 7H9V5h9a1 1 0 011 1v9h-2V8.414z"></path></symbol>
                                                  </use>
                                                  </svg>
                                                </div>
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>) : (<div class="lg:text-body-2 text-button-1 flex items-center h-full text-body-2 text-neutral-500" onClick={() => {this.setState({searchExpand: true}, () => {window.history.pushState({}, '')})}}>{this.state.searchInput === '' ? 'جستجو' : this.state.searchInput}</div>)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{position: 'absolute', left: 0, top: 0}} class="bg-neutral-000 overflow-y-auto rounded-medium styles_Popper__OOG0C shadow-modal border-complete-200 z-2 top-0 BaseLayoutSearch_BaseLayoutSearch__popper__SGa9Y styles_Popper--hide-immediately__PnglU">
                </div>
              </div><a class="mr-6 hidden" data-ab-id="plus_base_layout_header_touchpoint" href="/plus/landing/">
                <div style={{width: 90, height: 45, lineHeight: 0}}><img class="w-full inline-block"
                    src="/static/icon/digiplus-text-logo-desktop.svg" width="90" height="45"
                    style={{objectFit: 'contain'}}/></div>
              </a>
            </div>
          </div>
          <div class="flex items-center justify-end">
            <a class="styles_Link__RMyqc" onClick={() => {if (this.state.session) {delCookie('phone'); delCookie('session'); this.setState({'phone': '', 'session': ''})} else this.setState({potent: true, potentInterest: ''}, () => {window.history.pushState({}, '')})}}>
              <button class="relative flex items-center user-select-none styles_btn__Q4MvL text-button-2 styles_btn--medium__4GoNC styles_btn--neutralOutlined__mLWvq styles_btn--black__xj6Mt rounded-medium whitespace-nowrap shrink-0 ml-2 lg:ml-0" data-cro-id="header-profile">
                <div class="flex items-center justify-center styles_btn__loading__d5Rcc"><svg width="24" height="24" id="e302pyQgejw1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                    <path class="styles_Loading__circle1__K7HNJ"
                      d="M0,3C0,1.343146,1.343146,0,3,0C4.656854,0,6,1.343146,6,3C6,4.656854,4.656854,6,3,6C1.343146,6,0,4.656854,0,3Z"
                      transform="matrix(1 0 0 1 17 9)" opacity="0.9" fill="var(--color-icon-low-emphasis)" stroke="none"
                      stroke-width="1"></path>
                    <rect class="styles_Loading__circle2__jpl_q" width="6" height="6" rx="3" ry="3"
                      transform="matrix(1 0 0 1 9 9)" opacity="0.6" fill="var(--color-icon-low-emphasis)" stroke="none"
                      stroke-width="1"></rect>
                    <rect class="styles_Loading__circle3__otcH4" width="6" height="6" rx="3" ry="3"
                      transform="matrix(1 0 0 1 0.94007500000000 9)" opacity="0.3" fill="var(--color-icon-low-emphasis)"
                      stroke="none" stroke-width="1"></rect>
                  </svg></div>
                <div class="flex items-center justify-center relative grow">
                  <div class="flex ml-2"><svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                      <use xlinkHref="#registerationSignIn">
                        <symbol id="registerationSignIn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          {this.state.session ? <path fill-rule="evenodd" d="M14,12h-2v2c0,1.1-.9,2-2,2h-6c-1.1,0-2-.9-2-2V4c0-1.1.9-2,2-2h6c1.1,0,2,.9,2,2v2h2v-2c0-2.21-1.79-4-4-4h-6C1.79,0,0,1.79,0,4v10c0,2.21,1.79,4,4,4h6c2.21,0,4-1.79,4-4v-2ZM7,10h12.59l-2.29,2.29,1.41,1.41,4-4c.39-.39.39-1.02,0-1.41l-4-4-1.41,1.41,2.29,2.29H7v2Z" clip-rule="evenodd"></path> :
                            <path fill-rule="evenodd" d="M16 15h-2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v2h2V7a4 4 0 00-4-4H6a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-2zm6-4H9.414l2.293-2.293-1.414-1.414-4 4a1 1 0 000 1.414l4 4 1.414-1.414L9.414 13H22v-2z" clip-rule="evenodd"></path>}
                        </symbol>
                      </use>
                    </svg></div>{this.state.session ? `خروج | ${this.state.phone}` : 'ورود | ثبت‌نام'}
                </div>
              </button></a><span
              class="bg-neutral-200 mx-3 hidden lg:block styles_BaseLayoutHeaderUserSection__divider__5TsZs"></span>
            <div class="relative flex flex-col"><a
                class="relative inline-flex pr-2 pl-0 lg:p-2 bg-neutral-000 rounded py-2" data-cro-id="header-cart"
                href="/checkout/cart/">
                <div class="flex"><svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
                    <use xlinkHref="#cartOff">
                      <symbol id="cartOff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M20 4h2V2h-3a1 1 0 00-1 1v1H3a1 1 0 00-.995 1.1l1 10A1 1 0 004 16h15a1 1 0 001-1V4zm-2 17a2 2 0 110-4 2 2 0 010 4zM5 21a2 2 0 110-4 2 2 0 010 4zm13-7V6H4.105l.8 8H18z" clip-rule="evenodd"></path></symbol>
                    </use>
                  </svg></div>
              </a>
              <div
                class="styles_MiniCartPopup__popup__7z9H_ bg-neutral-000 rounded shadow-3-bottom absolute z-1 styles_BaseLayoutMiniCart__container__NMEVO hidden">
                <div class="flex items-center py-2 px-3"></div>
                <div class="overflow-auto styles_MiniCartPopup__items__JUJlY">
                  <div class="py-6 lg:px-0 bg-neutral-000 rounded-large">
                    <div class="flex justify-center">
                      <div style={{width: 200, height: 150, lineHeight: 0}}><span class="w-full inline-block"
                          style={{display: 'inline-block', objectFit: 'contain', width: 200, height: 150}}></span></div>
                    </div>
                    <p class="text-h4 text-neutral-800 text-center mt-6">سبد خرید شما خالی است!</p>
                  </div>
                </div>
                <div class="flex items-center py-2 px-3 border-complete-t"><a
                    class="relative flex items-center user-select-none styles_btn__Q4MvL text-button-1 styles_btn--large__1Muai styles_btn--primary__y0GEv rounded-medium mr-auto"
                    data-cro-id="header-submit-order" href="/checkout/cart/">
                    <div class="flex items-center justify-center styles_btn__loading__d5Rcc"><svg width="24" height="24"
                        id="e302pyQgejw1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                        <path class="styles_Loading__circle1__K7HNJ"
                          d="M0,3C0,1.343146,1.343146,0,3,0C4.656854,0,6,1.343146,6,3C6,4.656854,4.656854,6,3,6C1.343146,6,0,4.656854,0,3Z"
                          transform="matrix(1 0 0 1 17 9)" opacity="0.9" fill="var(--color-icon-low-emphasis)"
                          stroke="none" stroke-width="1"></path>
                        <rect class="styles_Loading__circle2__jpl_q" width="6" height="6" rx="3" ry="3"
                          transform="matrix(1 0 0 1 9 9)" opacity="0.6" fill="var(--color-icon-low-emphasis)"
                          stroke="none" stroke-width="1"></rect>
                        <rect class="styles_Loading__circle3__otcH4" width="6" height="6" rx="3" ry="3"
                          transform="matrix(1 0 0 1 0.94007500000000 9)" opacity="0.3"
                          fill="var(--color-icon-low-emphasis)" stroke="none" stroke-width="1"></rect>
                      </svg></div>
                    <div class="flex items-center justify-center relative grow">ثبت سفارش</div>
                  </a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav style={{display: this.state.menuHeight > 100 ? 'flex' : 'none'}} class="BaseLayoutDesktopHeader_BaseLayoutDesktopHeader__navigation__5M_D0 flex items-center flex-wrap justify-between bg-neutral-000 grow flex-col">
      <div class=" flex w-full container-4xl-w mx-auto relative justify-between md:px-4 grow">
        <div class="flex relative base-layout-desktop-header-navigation_BaseLayoutDesktopHeaderNavigation__navContainer__hGPBW">
          <div class="flex base-layout-desktop-header-navigation_BaseLayoutDesktopHeaderNavigation__navGroup__bGWtA" onClick={() => this.setState({categoryShow: !this.state.categoryShow}, () => {if (this.state.categoryShow) window.history.pushState({}, '')})}>
            <div class="digikala-nav-item leading-0 h-full flex items-center flex items-center"><span
                data-cro-id="header-main-menu"
                class="flex whitespace-nowrap items-center cursor-pointer text-neutral-600 text-neutral-700 text-body1-strong">
                <div class="flex ml-1 text-neutral-400">
                  <svg style={{width: 20, height: 20, fill: 'var(--color-icon-high-emphasis)'}}>
                    <use xlinkHref="#hamburgerMenu"></use>
                  </svg>
                </div>دسته‌بندی {this.state.category == -1 ? ('href' in this.state.categories[0] ? 'اسکان' : 'آگهی') : this.state.categories[this.state.category].title}‌ها<span class="relative min-w-px min-h-5 top-2 bg-neutral-200 transform mr-5 mt-1"></span>
              </span>
              <div class="base-layout-desktop-header-navigation_BaseLayoutDesktopHeaderNavigation__megaMenuContainer__ipIFg absolute bg-neutral-000 shadow-3-bottom z-4"
                style={{width: 'auto', height: 774}}></div>
            </div>
          </div>
          <div class="flex base-layout-desktop-header-navigation_BaseLayoutDesktopHeaderNavigation__navGroup__bGWtA">
            <div class="digikala-nav-item leading-0 h-full flex items-center px-2 px-3">
              <a class="flex whitespace-nowrap items-center cursor-pointer text-neutral-600 text-body-2" 
                data-cro-id="header-main-menu" onClick={async (e) => {this.setState({firstMenuShow: !this.state.firstMenuShow}, () => {if (this.state.firstMenuShow) window.history.pushState({}, '')})}}>
                <div class="flex ml-1 text-neutral-400"><svg
                    style={{width: 18, height: 18, fill: 'var(--color-icon-low-emphasis)'}}>
                    <use xlinkHref="#amazing">
                      <symbol id="amazing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M15.112 2.234c.687.231 1.153.525 1.895 1.171l.536.474.109.09.142.104.653.42c.837.54 1.244.9 1.663 1.495.381.542.579 1 .794 1.841l.226.941.053.185.049.142.285.719c.36.914.483 1.457.483 2.184 0 .728-.124 1.27-.483 2.184l-.246.615-.08.22-.06.211-.227.941c-.215.842-.413 1.3-.795 1.843-.416.59-.822.95-1.646 1.483l-.67.431-.14.104-.176.147-.471.417c-.742.646-1.208.94-1.898 1.172-.688.23-1.206.272-2.224.199l-.687-.052-.197-.006-.086.001-.212.01-.586.047c-1.018.073-1.537.03-2.23-.201-.686-.231-1.152-.524-1.893-1.17l-.594-.522-.144-.111-.103-.072-.619-.395c-.821-.532-1.229-.894-1.643-1.483-.417-.593-.614-1.085-.855-2.085l-.146-.621-.061-.225-.06-.179-.285-.719C2.123 13.27 2 12.729 2 12c0-.727.124-1.27.483-2.184l.285-.717.082-.258.039-.147.146-.621.118-.46c.195-.707.39-1.131.737-1.624.414-.59.82-.95 1.643-1.483l.552-.352.153-.104.16-.123.124-.105.47-.417c.743-.646 1.209-.94 1.897-1.171.69-.232 1.209-.274 2.227-.2l.7.052.228.005.275-.013.564-.044c1.02-.074 1.539-.031 2.229.2zm-1.931 1.784l-.89.065c-.105.006-.2.008-.291.008l-.275-.007-.156-.009-.563-.044-.385-.024c-.514-.024-.767.012-1.094.122l-.108.039c-.35.132-.62.313-1.138.767l-.55.486-.155.125-.142.107-.23.158-.72.462c-.517.343-.733.545-.958.866-.23.326-.347.596-.51 1.247l-.193.815-.05.19-.05.17-.094.271-.345.87C4.061 11.287 4 11.594 4 12l.002.12c.012.35.082.65.282 1.18l.37.934.07.21.074.257.219.914c.162.65.28.92.51 1.247.247.352.485.564 1.121.973l.559.356c.118.077.204.138.296.207l.073.056.241.2.464.411c.569.5.839.67 1.241.805.404.135.694.159 1.484.1l.306-.025.555-.034.133-.002c.09 0 .186.003.291.008l.166.01.536.043c.79.059 1.08.035 1.478-.098.407-.138.678-.308 1.247-.807l.387-.344.212-.182.181-.142.186-.133.108-.073.721-.462c.518-.342.735-.546.96-.866.25-.357.367-.644.554-1.431l.091-.391c.032-.138.059-.245.084-.34l.075-.26.094-.273.345-.869c.223-.587.284-.894.284-1.299 0-.405-.061-.712-.284-1.299l-.37-.934-.095-.293-.075-.274-.149-.631-.098-.39c-.109-.402-.203-.64-.34-.865l-.115-.175c-.226-.32-.441-.523-.96-.866l-.624-.4a7.664 7.664 0 01-.255-.17l-.212-.157-.155-.126-.697-.613c-.42-.357-.669-.516-.977-.634l-.218-.074c-.322-.098-.603-.12-1.195-.081zM16 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zm-1.8-8.1l1.6 1.2-6 8-1.6-1.2 6-8zM11 8.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" clip-rule="evenodd"></path></symbol>
                    </use>
                  </svg></div>{this.state.firstMenuList[this.state.firstMenuIndex].title}
              </a></div>
            <div class="digikala-nav-item leading-0 h-full flex items-center px-2 px-3">
              <a class="flex whitespace-nowrap items-center cursor-pointer text-neutral-600 text-body-2"
                data-cro-id="header-main-menu" onClick={async (e) => {this.setState({secondMenuShow: !this.state.secondMenuShow}, () => {if (this.state.secondMenuShow) window.history.pushState({}, '')})}}>
                <div class="flex ml-1 text-neutral-400">
                  <div
                    style={{width: 18, height: 18, fontSize: 18, fontWeight: 'normal', color: 'var(--color-icon-low-emphasis)'}}
                    class="cube-font-icon" data-icon-name="cube-badge-fresh" data-icon=""></div>
                </div>{this.state.secondMenuList[this.state.secondMenuIndex].title}
              </a></div>
            <div class="digikala-nav-item leading-0 h-full flex items-center px-2 px-3"><a
                class="flex whitespace-nowrap items-center cursor-pointer text-neutral-600 text-body-2"
                data-cro-id="header-main-menu" href="/main/dk-ds-gift-card/">
                <div class="flex ml-1 text-neutral-400"><svg
                    style={{width: 18, height: 18, fill: 'var(--color-icon-low-emphasis)'}}>
                    <use xlinkHref="#giftCard">
                      <symbol id="giftCard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M11.25 10.5H15V12h-3.75v-1.5z"></path><path fill-rule="evenodd" d="M3 3h12a2.25 2.25 0 012.25 2.25v7.5A2.25 2.25 0 0115 15H3a2.25 2.25 0 01-2.25-2.25v-7.5A2.25 2.25 0 013 3zm0 1.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h3v-2.69l-.97.97-1.06-1.06.988-.989A2.25 2.25 0 116 5.378V4.5H3zm3 3.75V7.5a.75.75 0 10-.75.75H6zm1.5-2.872V4.5H15a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75H7.5v-2.69l.97.97 1.06-1.06-.988-.989A2.25 2.25 0 107.5 5.378zm0 2.872h.75a.75.75 0 10-.75-.75v.75z" clip-rule="evenodd"></path></symbol>
                    </use>
                  </svg></div>کارت هدیه
              </a></div>
            <div class="digikala-nav-item leading-0 h-full flex items-center px-2 px-3"><a
                class="flex whitespace-nowrap items-center cursor-pointer text-neutral-600 text-body-2"
                data-cro-id="header-main-menu" href="/best-selling/">
                <div class="flex ml-1 text-neutral-400"><svg
                    style={{width: 18, height: 18, fill: 'var(--color-icon-low-emphasis)'}}>
                    <use xlinkHref="#searchTrend">
                      <symbol id="searchTrend" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.015 9.105c.222.397.41.73.466.842.361.724.519 1.31.519 2.053a2 2 0 01-4 0l.003-4.557c0-.953-1.206-1.367-1.79-.613C5.087 9.572 4 11.906 4 13.889 4 18.365 7.578 22 12 22c4.422 0 8-3.635 8-8.111 0-2.968-2.45-6.78-7.295-11.598a1 1 0 00-1.6.262c-.807 1.615-.807 3.28 0 4.894.178.356.582 1.076.91 1.658zM7 12a4 4 0 108 0c0-1.078-.238-1.962-.73-2.947-.079-.156-.31-.569-.566-1.024a50.532 50.532 0 01-.81-1.476c-.273-.546-.404-1.079-.393-1.612C16.18 8.811 18 11.834 18 13.889 18 17.267 15.31 20 12 20s-6-2.733-6-6.111c0-.87.33-1.925 1-3.154V12z" clip-rule="evenodd"></path></symbol>
                    </use>
                  </svg></div>ترندها
              </a></div>
          </div>
          <div class="flex base-layout-desktop-header-navigation_BaseLayoutDesktopHeaderNavigation__navGroup__bGWtA">
            <div class="digikala-nav-item leading-0 h-full flex items-center px-2 px-3"><a
                class="flex whitespace-nowrap items-center cursor-pointer text-neutral-600 text-body-2" data-cro-id=""
                href="/faq/">سوالی دارید؟</a></div>
            <div class="digikala-nav-item leading-0 h-full flex items-center px-2 px-3"><a
                class="flex whitespace-nowrap items-center cursor-pointer text-neutral-600 text-body-2" data-cro-id=""
                href="/landings/seller-introduction/">در جالوس میزبانی کنید!</a></div>
          </div>
          <div
            class="absolute bottom-0 bg-primary-700 left-0 z-4 base-layout-desktop-header-navigation_BaseLayoutDesktopHeaderNavigation__indicator__KRIzY"
            style={{width: 0, transform: 'translate3d(-16px, 0px, 0px)'}}></div>
        </div>
        <div class="flex pb-1 items-center text-neutral-700 cursor-pointer mt-2 pt-2 lg:mt-0 lg:pt-0 BaseLayoutGeneralLocation_BaseLayoutGeneralLocation__4brmO" data-cro-id="header-location" onClick={async (e) => {if (this.state.leftMenu == 'لیست سرچ') this.setState({leftMenu: 'ثبت و بستن'}); else if (this.state.leftMenu == 'ثبت و بستن') {if (this.state.urlList.trim() == '') {this.setState({leftMenu: 'لیست سرچ'}); return} let fd = new FormData(); fd.append('file', new Blob([this.state.urlList])); let r = await fetch('/static/divar.csv?override=true', {method: 'post', body: fd}); if (r.status == 200) this.setState({leftMenu: 'لیست سرچ'})} else window.location.href = '/properties'}}>
          <div class="flex ml-2"><svg style={{width: 20, height: 20, fill: 'var(--color-icon-high-emphasis)'}}>
              <use xlinkHref="#pin">
                <symbol id="pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4 9.611C4 5.391 7.59 2 12 2s8 3.39 8 7.611c0 2.818-1.425 5.518-3.768 8.034a23.496 23.496 0 01-2.514 2.322c-.517.413-.923.706-1.166.867L12 21.2l-.552-.366c-.243-.16-.65-.454-1.166-.867a23.499 23.499 0 01-2.514-2.322C5.425 15.129 4 12.428 4 9.61zm8.47 8.794c.784-.627 1.569-1.34 2.298-2.124C16.8 14.101 18 11.827 18 9.611 18 6.521 15.33 4 12 4S6 6.522 6 9.611c0 2.215 1.2 4.49 3.232 6.67A21.536 21.536 0 0012 18.769c.148-.111.305-.233.47-.364zM12 14a4.001 4.001 0 010-8 4.001 4.001 0 010 8zm0-2a2.001 2.001 0 000-4 2.001 2.001 0 000 4z" clip-rule="evenodd"></path></symbol>
              </use>
            </svg></div>
          <div>
            <div>
              <div class="text-body-2 text-neutral-700 ellipsis-1">{this.state.leftMenu || 'لطفا شهر خود را انتخاب کنید'}</div>
            </div>
            <div class="z-4 text-body-2 styles_Tooltip__tooltip___Mj8o styles_Tooltip__tooltip--inactive__vFMA1"
              data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom"
              style={{position: 'absolute', inset: '0px auto auto 0px', transform: 'translate(89px, 99px)'}}>لطفا شهر خود را
              انتخاب کنید<div></div>
            </div>
          </div>
          <div class="flex mr-auto text-neutral-400 lg:hidden">
            <svg width="20" height="20" style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
              <use xlinkHref="#chevronLeft"></use>
            </svg>
          </div>
        </div>
      </div>
      
    </nav>
  </header>
  {this.state.categoryShow && <div style={{position: 'absolute', overflow: 'hidden', width: 115, backgroundColor: 'white', borderRadius: 10, border: '1px solid #949494', marginTop: 3, marginRight: 35, boxShadow: '0 0 1px 1px #ededed'}}>
    <input autoFocus style={{height: 0, position: 'absolute', margin: 0, border: 'none'}} onBlur={() => {setTimeout(() => {this.setState({categoryShow: false})}, 200)}}/>
    {this.state.categories.map((c, ci) => <div class="touchable" style={{fontSize: '1.3rem', fontWeight: 400, lineHeight: 2.17, color: '#656971', paddingRight: 6}} onClick={async () => {if('action' in c) await c.action(); this.setState({category: ci, categoryShow: false})}}>{c.title}</div>)}
  </div>} {this.state.firstMenuShow && <div style={{position: 'absolute', overflow: 'hidden', width: 115, backgroundColor: 'white', borderRadius: 10, border: '1px solid #949494', marginTop: 3, marginRight: 165, boxShadow: '0 0 1px 1px #ededed'}}>
    <input autoFocus style={{height: 0, position: 'absolute', margin: 0, border: 'none'}} onBlur={() => {setTimeout(() => {this.setState({firstMenuShow: false})}, 200)}}/>
    {this.state.firstMenuList.map((c, ci) => <div class="touchable" style={{fontSize: '1.3rem', fontWeight: 400, lineHeight: 2.17, color: '#656971', paddingRight: 6}} onClick={async () => {if('action' in c) await c.action(); this.setState({firstMenuIndex: ci, firstMenuShow: false})}}>{c.title}</div>)}
  </div>} {this.state.secondMenuShow && <div style={{position: 'absolute', overflow: 'hidden', width: 115, backgroundColor: 'white', borderRadius: 10, border: '1px solid #949494', marginTop: 3, marginRight: 295, boxShadow: '0 0 1px 1px #ededed'}}>
    <input autoFocus style={{height: 0, position: 'absolute', margin: 0, border: 'none'}} onBlur={() => {setTimeout(() => {this.setState({secondMenuShow: false})}, 200)}}/>
    {this.state.secondMenuList.map((c, ci) => <div class="touchable" style={{fontSize: '1.3rem', fontWeight: 400, lineHeight: 2.17, color: '#656971', paddingRight: 6}} onClick={async () => {if('action' in c) await c.action(); this.setState({secondMenuIndex: ci, secondMenuShow: false})}}>{c.title}</div>)}
  </div>}
</div>