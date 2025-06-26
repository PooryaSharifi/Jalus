<div class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
  <div class="container-2xl-w mx-auto">
    <div class="pt-4">
      <div style={{overflowX: 'scroll', scrollbarWidth: 'none'}} class="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-rtl">
        <div class="swiper-wrapper">
          {this.state.stories.map((story) => (<div class="swiper-slide" style={{width: 'auto', height: 'auto', marginLeft: 24}}>
            <div class="ml-3 lg:ml-0 w-[84px] shrink-0 cursor-pointer" onClick={() => {window.history.pushState({}, ''); loadStory(story.title, story.resolutions.map((res) => ('/static/stories/' + story.href + '.' + res + '.mp4')), story.ccs.map((cc) => ('/static/stories/' + story.href + '.' + cc + '.vtt')), story.markers)}}>
              <div class="styles_container__ipSg9 rounded-circle shrink-0 w-full aspect-square relative flex items-center justify-center">
                <div class="rounded-circle overflow-hidden bg-white aspect-square styles_innerContainer__6FPF0 flex items-center justify-center">
                  <div class="rounded-circle overflow-hidden flex items-center justify-center styles_image__ggcBy" style={{borderRadius: 99999, lineHeight: 0}}>
                    <img class="w-full inline-block" src={story.jpeg} style={{objectFit: 'cover', borderRadius: 99999}} alt="" title=""/>
                  </div>
                </div>
              </div>
              <div>
                <div><div class="mt-2 text-caption text-center text-neutral-800 ellipsis-2">{story.title}</div></div>
                <div class="z-4 text-body-2 styles_Tooltip__tooltip___Mj8o styles_Tooltip__tooltip--inactive__vFMA1"
                  style={{position: 'absolute', inset: 'auto auto 0px 0px', transform: 'translate(84px)'}}
                  data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="right-end">{story.title}<div></div>
                </div>
              </div>
            </div>
          </div>))}
          </div>
        <div
          class="styles_Slider__next-button-selector__R9M5X hidden lg:flex justify-center items-center bg-neutral-000 absolute cursor-pointer z-5 rounded-circle styles_ScrollHorizontalWrapper__button__uMRet styles_ScrollHorizontalWrapper__button--next__0VY_Y">
          <div class="flex"><svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
              <use xlinkHref="#chevronLeft">
                <symbol id="chevronLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></symbol>
              </use>
            </svg></div>
        </div>
        <div
          class="styles_Slider__prev-button-selector__fsha9 hidden lg:flex justify-center items-center bg-neutral-000 absolute cursor-pointer z-5 rounded-circle styles_ScrollHorizontalWrapper__button__uMRet styles_ScrollHorizontalWrapper__button--prev___Vx1r lg:hidden">
          <div class="flex"><svg style={{width: 24, height: 24, fill: 'var(--color-icon-high-emphasis)'}}>
              <use xlinkHref="#chevronRight">
                <symbol id="chevronRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.583 12L8.29 16.293l1.414 1.414 5-5a1 1 0 000-1.414l-5-5L8.29 7.707 12.583 12z"></path></symbol>
              </use>
            </svg></div>
        </div>
      </div>
    </div>
  </div>
</div>