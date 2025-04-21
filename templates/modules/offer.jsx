<div class="container-2xl-w mx-auto lg:px-4 2xl:px-0 px-5">
  <div>
    <a class="relative overflow-hidden bg-neutral-100 user-select-none w-full flex flex-col lg:flex-row justify-between rounded-large lg:items-center px-5 lg:px-10 pt-4 pb-3 styles_AmazingShortcut__main__EbBRH" target="_blank" href={`/users?offer=1`}>
      <div class="absolute left-0 top-0 bottom-0 right-0 z-1"
        style={{background: 'url(/static/icon/fresh-pattern.svg) left center no-repeat'}}>
      </div>
      <div class="absolute right-0 top-0 bottom-0 left-0 rounded-large styles_AmazingShortcut__gradient__dkw_x styles_AmazingShortcut__gradient--fresh__hwLvi"></div>
      <div class="flex flex-col lg:flex-row items-start lg:items-center z-1 shrink-0 gap-2 lg:gap-0">
        <div class="flex items-center z-1 shrink-0">
          <div style={{width: 66, height: 62, lineHeight: 0}}>
            <picture>
              <source type="image/webp" srcset="/static/icon/fresh.webp"/>
              <source type="image/jpeg" srcset="/static/icon/fresh.png"/>
              <img class="w-full inline-block" src="/static/icon/fresh.png" width="66" height="62" style={{objectFit: 'contain'}} alt="icon" title=""/>
            </picture>
          </div>
          <div class="mx-2 lg:mx-5" style={{width: 250, height: 28, lineHeight: 0}}><img
              class="w-full inline-block" src="/static/icon/fresh-incredible-offer.svg" width="250"
              height="28" style={{objectFit: 'contain'}} alt="" title=""/></div>
        </div>
        <div
          class="inline-flex items-center text-neutral-000 text-center mx-2 lg:mx-0 flex justify-center text-normal bg-fresh-700 styles_AmazingShortcut__badge__eIFZL Badge_Badge__QIekq Badge_Badge--medium__fP85d px-3 text-body2-strong"
          style={{color: 'var(--color-undefined)'}}>
          <p class="inline-block  text-body1-strong text-white">تا {Math.max(...this.state.offers.map((offer) => (offer.offer))).farsify()}٪ تخفیف</p>
        </div>
      </div>
      <div class="flex items-center justify-between lg:justify-start mt-4 lg:mt-0 lg:mr-4 z-1">
        <div class="flex items-center lg:justify-end flex-nowrap lg:flex-wrap overflow-hidden styles_AmazingShortcut__productItems__B6LWb">
          {this.state.offers.map((offer) => (
            <a class="relative bg-neutral-000 rounded-circle flex items-center justify-center p-1.5 ml-2 lg:mb-4" href={`/properties/${offer.id}`}>
              <div class="overflow-hidden rounded-circle">
                <div style={{width: 64, height: 64, lineHeight: 0}}>
                  <picture>
                    <source type="image/webp" srcset={`/static/properties/${offer.images[0]}`}/>
                    <source type="image/jpeg" srcset={`/static/properties/${offer.images[0]}`}/>
                    <img class="w-full inline-block" src={offer.jpg} width="64" height="64" style={{objectFit: 'fill'}} alt="پنیر پیتزا موزارلا شه وین - 2 کیلوگرم" title=""/>
                  </picture>
                </div>
              </div>
              <div class="px-1 text-white rounded-large flex items-center justify-center ProductPrice_ProductPrice__discountWrapper__1Ru_1 bg-hint-object-error absolute right-0 bottom-0 z-1">
                <span class="text-body2-strong" data-testid="price-discount-percent">{offer.offer.farsify()}٪</span>
              </div>
            </a>
          ))}
        </div>
        <div class="bg-neutral-000 p-3 lg:py-3 lg:px-5 text-button-2 flex items-center justify-center text-fresh-700 styles_AmazingShortcut__button__DU7l4">
          <span class="hidden lg:inline whitespace-nowrap cursor-pointer">بیش از ۵۰ ویلا</span>
          <div class="flex mr-0 lg:mr-2"><svg style={{width: 20, height: 20, fill: 'var(--color-fresh-700)'}}>
              <use xlinkHref="#arrowLeft">
                <symbol id="arrowLeft" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M11.293 19.707l1.414-1.414L7.414 13H20v-2H7.414l5.293-5.293-1.414-1.414-7 7a1 1 0 000 1.414l7 7z" clip-rule="evenodd"></path></symbol>
              </use>
            </svg>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>