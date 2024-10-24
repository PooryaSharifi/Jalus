<div class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
    <div class="w-full lg:py-2 bg-neutral-000 lg:items-start flex-wrap lg:justify-around flex overflow-x-auto flex-nowrap overflow-y-hidden hide-scrollbar">
      {this.state.products.map((product) => (<a class="flex flex-col items-center user-select-none my-2 lg:my-0 lg:w-35 w-1/8 shrink-0 lg:!w-[82px] w-[75px]"
        data-cro-id={product.title} target="_blank" href={product.href}>
        <div style={{width: 52, height: 52, lineHeight: 0}}><img class="w-full inline-block"
            src={product.png} width="52" height="52" style={{objectFit: 'contain'}} alt={product.title} title=""/></div><span
          class="text-caption-strong text-neutral-700 mt-1 text-center px-3 lg:px-4">{product.title}</span>
      </a>))}
      <div data-cro-id="hp-more-ventures"
        class="shrink-0 w-[80px] flex flex-col items-center user-select-none my-2 lg:my-0 cursor-pointer lg:w-35 w-1/8 px-3 lg:px-4 lg:w-[82px]">
        <div
          class="bg-neutral-100 rounded-circle flex justify-center items-center text-neutral-400 styles_MainHomeDeepLinks__moreButton__4E_IX">
          <div class="flex"><svg style={{width: 32, height: 32, fill: 'var(--color-icon-low-emphasis)'}}>
              <use xlinkHref="#moreHoriz">
                <symbol id="moreHoriz" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M16 12c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 2c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"
                    clip-rule="evenodd"></path>
                </symbol>
              </use>
            </svg></div>
        </div><span class="text-caption-strong text-neutral-700 mt-1">بیشتر</span>
      </div>
    </div>
    <div class="lg:hidden mx-auto w-5 h-1 bg-app-background rounded-3xl relative">
      <div class="w-1/2 h-full rounded-3xl bg-neutral-700 absolute right-0"></div>
    </div>
  </div>