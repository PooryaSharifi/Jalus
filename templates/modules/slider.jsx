<div class="">
  <div class="flex overflow-hidden relative styles_MainHomeTopSlider__OvaWu">
    <div class="relative relative w-full dk-main-slider">
      <div>
        <div
          class="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-rtl">
          <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
            {this.state.slides.map((slide, slide_i) => (<span className={`inline-block rounded-circle mx-1 bg-neutral-900 styles_MainHomeTopSlider__pagination__mWfm2 ${this.state.slide == slide_i ? 'styles_MainHomeTopSlider__pagination--active__kVM8V' : ''}`}></span>))}
          </div>
          <div class="swiper-wrapper" style={{transform: `translate3d(${window.innerWidth * this.state.slide}px, 0px, 0px)`, transitionDuration: '0ms'}}>
            {this.state.slides.map((slide, slide_i) => (<div className={`swiper-slide ${this.state.slide == slide_i ? 'swiper-slide-active' : ''} ${this.state.slide == (slide_i + this.state.slides.length - 1) % this.state.slides.length ? 'swiper-slide-prev' : ''} ${this.state.slide == (slide_i + 1) % this.state.slides.length ? 'swiper-slide-next' : ''}`} style={{width: window.innerWidth}}>
              <div class="">
                <a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" href={slide.href} onClick={() => {if ('state' in slide) this.setState(slide.state)}}>
                  <div>
                    <div class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6" style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp" srcset={slide.webp}/> <source type="image/jpeg" srcset={slide.jpeg}/>
                        <img class="w-full h-full inline-block" src={slide.jpeg} style={{objectFit: 'cover', borderRadius: 0}} alt="" title={slide.title}/>
                      </picture>
                    </div>
                  </div>
                </a>
              </div>
            </div>))}
            {/* <div class="swiper-slide swiper-slide-active" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/landing/supermarket-awareness/?&amp;promo_name=%D8%B3%D9%88%D9%BE%D8%B1%D9%85%D8%A7%D8%B1%DA%A9%D8%AA+%D8%AF%DB%8C%D8%AC%DB%8C%E2%80%8C%DA%A9%D8%A7%D9%84%D8%A7&amp;promo_position=home_slider_new_v2&amp;promo_creative=184166&amp;bCode=184166">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/39a9f02f631f0341eced2f4c85cb06eb181f6544_1722844429.jpg?x-oss-process=image/quality,q_95/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/39a9f02f631f0341eced2f4c85cb06eb181f6544_1722844429.jpg?x-oss-process=image/quality,q_95"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/39a9f02f631f0341eced2f4c85cb06eb181f6544_1722844429.jpg?x-oss-process=image/quality,q_95"
                          ste.slityle={{objectFit: 'cover', borderRadius: 0}} alt="" title="سوپرمارکت دیجی‌کالا"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div>
            <div class="swiper-slide swiper-slide-next" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/landing/olympics/?&amp;promo_name=%D8%A7%D9%84%D9%85%D9%BE%DB%8C%DA%A9&amp;promo_position=home_slider_new_v2&amp;promo_creative=184456&amp;bCode=184456">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/8878cc02e2fc387319cda5b4fa1610cb0842fb4c_1722242016.jpg?x-oss-process=image/quality,q_95/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/8878cc02e2fc387319cda5b4fa1610cb0842fb4c_1722242016.jpg?x-oss-process=image/quality,q_95"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/8878cc02e2fc387319cda5b4fa1610cb0842fb4c_1722242016.jpg?x-oss-process=image/quality,q_95"
                          style={{objectFit: 'cover', borderRadius: 0}} alt="" title="المپیک"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div>
            <div class="swiper-slide" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/mehr/?utm_source=HomePage&amp;utm_medium=Banner&amp;utm_campaign=General&amp;promo_name=%D8%AF%DB%8C%D8%AC%DB%8C%DA%A9%D8%A7%D9%84%D8%A7%D9%85%D9%87%D8%B1&amp;promo_position=home_slider_new_v2&amp;promo_creative=184782&amp;bCode=184782">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/ab3514313cf3dd4182616c0d175a787e6fb3f4ff_1723044022.jpg?x-oss-process=image/quality,q_95/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/ab3514313cf3dd4182616c0d175a787e6fb3f4ff_1723044022.jpg?x-oss-process=image/quality,q_95"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/ab3514313cf3dd4182616c0d175a787e6fb3f4ff_1723044022.jpg?x-oss-process=image/quality,q_95"
                          style={{objectFit: 'cover', borderRadius: 0}} alt="" title="دیجیکالامهر"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div>
            <div class="swiper-slide" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/landing/Fitness/?&amp;promo_name=%D8%AA%D9%86%D8%A7%D8%B3%D8%A8+%D8%A7%D9%86%D8%AF%D8%A7%D9%85&amp;promo_position=home_slider_new_v2&amp;promo_creative=182403&amp;bCode=182403">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/1e3ced747d8cf62c297f95c0d94ef9d13732048f_1718696318.jpg?x-oss-process=image/quality,q_95/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/1e3ced747d8cf62c297f95c0d94ef9d13732048f_1718696318.jpg?x-oss-process=image/quality,q_95"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/1e3ced747d8cf62c297f95c0d94ef9d13732048f_1718696318.jpg?x-oss-process=image/quality,q_95"
                          style={{objectFit: 'cover', borderRadius: 0}} alt="" title="تناسب اندام"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div>
            <div class="swiper-slide" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/landing/ba-energy/?&amp;promo_name=%D9%BE%D8%A7%D8%B1%D8%AA%D9%86%D8%B1%D8%B4%DB%8C%D9%BE-%D9%88%D8%B2%D8%A7%D8%B1%D8%AA+%D9%86%DB%8C%D8%B1%D9%88&amp;promo_position=home_slider_new_v2&amp;promo_creative=184586&amp;bCode=184586">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/71f867b90d6dca65405a4252159f7b9c5b7cd8b6_1722415413.jpg?x-oss-process=image/quality,q_95/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/71f867b90d6dca65405a4252159f7b9c5b7cd8b6_1722415413.jpg?x-oss-process=image/quality,q_95"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/71f867b90d6dca65405a4252159f7b9c5b7cd8b6_1722415413.jpg?x-oss-process=image/quality,q_95"
                          style={{objectFit: 'cover', borderRadius: 0}} alt="" title="پارتنرشیپ-وزارت نیرو"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div>
            <div class="swiper-slide" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/product-list/plp_158380460/?&amp;promo_name=%DA%A9%D9%85%D9%BE%DB%8C%D9%86+-++%D8%B3%D9%88%D9%BE%D8%B1%D8%A7%D8%B3%D8%AA%D8%A7%D8%B1%D9%87%D8%A7+-+%D9%87%D9%88%D9%85+-+%D9%85%D8%B1%D8%AF%D8%A7%D8%AF+1403&amp;promo_position=home_slider_new_v2&amp;promo_creative=184631&amp;bCode=184631">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/24e93720f9f253d833b5131b9241ee6d8f979ca5_1722662924.jpg?x-oss-process=image/quality,q_95/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/24e93720f9f253d833b5131b9241ee6d8f979ca5_1722662924.jpg?x-oss-process=image/quality,q_95"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/24e93720f9f253d833b5131b9241ee6d8f979ca5_1722662924.jpg?x-oss-process=image/quality,q_95"
                          style={{objectFit: 'cover', borderRadius: 0}} alt=""
                          title="کمپین -  سوپراستارها - هوم - مرداد 1403"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div>
            <div class="swiper-slide" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/landing/boshghab/?&amp;promo_name=%D9%BE%D8%A7%D8%B1%D8%AA%D9%86%D8%B1%D8%B4%DB%8C%D9%BE-%D8%B2%D8%B1%D8%B3%D8%A7%D8%A8&amp;promo_position=home_slider_new_v2&amp;promo_creative=184772&amp;bCode=184772">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/71a123426127ae10b156d505afbca182d03d1d91_1722927806.gif?x-oss-process=image?x-oss-process=image/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/71a123426127ae10b156d505afbca182d03d1d91_1722927806.gif?x-oss-process=image"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/71a123426127ae10b156d505afbca182d03d1d91_1722927806.gif?x-oss-process=image"
                          style={{objectFit: 'cover', borderRadius: 0}} alt="" title="پارتنرشیپ-زرساب"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div>
            <div class="swiper-slide" style={{width: window.innerWidth}}>
              <div class=""><a class="block h-full w-full styles_MainHomeTopSliderItem__widget__n1DJ1" target="_blank"
                  href="/product-list/plp_158623545/?sort=26&amp;promo_name=%D9%BE%D8%A7%D8%B1%D8%AA%D9%86%D8%B1%D8%B4%DB%8C%D9%BE-%D8%B2%D8%B1%DB%8C%D9%86&amp;promo_position=home_slider_new_v2&amp;promo_creative=184776&amp;bCode=184776">
                  <div>
                    <div
                      class="user-select-none absolute z-1 top-0 w-full h-full styles_MainHomeTopSliderItem__image__pk1m6"
                      style={{borderRadius: 0, lineHeight: 0}}>
                      <picture>
                        <source type="image/webp"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/4743e3c09d2113d86ae7dbe415d3fd1cac85f7ac_1722951209.jpg?x-oss-process=image/quality,q_95/format,webp"/>
                        <source type="image/jpeg"
                          srcset="https://dkstatics-public.digikala.com/digikala-adservice-banners/4743e3c09d2113d86ae7dbe415d3fd1cac85f7ac_1722951209.jpg?x-oss-process=image/quality,q_95"/>
                        <img class="w-full h-full inline-block"
                          src="https://dkstatics-public.digikala.com/digikala-adservice-banners/4743e3c09d2113d86ae7dbe415d3fd1cac85f7ac_1722951209.jpg?x-oss-process=image/quality,q_95"
                          style={{objectFit: 'cover', borderRadius: 0}} alt="" title="پارتنرشیپ-زرین"/>
                      </picture>
                    </div>
                  </div>
                </a></div>
            </div> */}
          </div>
          <div class="styles_Slider__next-button-selector__R9M5X hidden">
            <div class="flex"><svg style={{width: 40, height: 40, fill: 'var(--color-icon-high-emphasis)'}}>
                <use xlinkHref="#chevronLeft">
                  <symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></symbol>
                </use>
              </svg></div>
          </div>
          <div class="styles_Slider__prev-button-selector__fsha9 hidden">
            <div class="flex"><svg style={{zIndex: 10, width: 40, height: 40, fill: 'var(--color-icon-high-emphasis)'}}>
                <use xlinkHref="#chevronRight">
                  <symbol id="chevronRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.583 12L8.29 16.293l1.414 1.414 5-5a1 1 0 000-1.414l-5-5L8.29 7.707 12.583 12z"></path></symbol>
                </use>
              </svg></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute right-0 bottom-42 flex items-center z-1 styles_MainHomeTopSlider__navigator__L7HT8">
      <div
        class="slider-arrow flex cursor-pointer items-center justify-center z-1 bg-neutral-000 rounded-circle text-neutral-700 mr-10 ml-1 styles_MainHomeTopSlider__arrow__DYOId">
        <div class="flex" onClick={() => {this.setState({slide: (this.state.slide + this.state.slides.length - 1) % this.state.slides.length})}}><svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
            <use xlinkHref="#chevronRight">
              <symbol id="chevronRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.583 12L8.29 16.293l1.414 1.414 5-5a1 1 0 000-1.414l-5-5L8.29 7.707 12.583 12z"></path></symbol>
            </use>
          </svg></div>
      </div>
      <div
        class="slider-arrow flex cursor-pointer items-center justify-center z-1 bg-neutral-000 rounded-circle text-neutral-700 mr-1 styles_MainHomeTopSlider__arrow__DYOId">
        <div class="flex" onClick={() => {this.setState({slide: (this.state.slide + 1) % this.state.slides.length})}}><svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
            <use xlinkHref="#chevronLeft">
              <symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></symbol>
            </use>
          </svg></div>
      </div>
    </div>
  </div>
</div>