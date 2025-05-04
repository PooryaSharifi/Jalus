<footer class="w-full bg-neutral-000 border-complete-t border-n-200 pt-8 mt-12">
  <div class="container-4xl-w mx-auto">
    <div class="px-5">
      <div class="flex justify-between items-center select-none">
        <div class="ml-4" style={{height: 30, lineHeight: 0}}><img class="w-full inline-block"
            src={`/static/icon/${this.state.page ? this.state.page : 'jalus'}_shakhabeet_red.svg`} height="30" style={{objectFit: 'contain'}} alt={(this.state.page && this.state.page) ? `${this.state.page} - ${this.state.fr_page}` : "jalus - جالوس"}
            title=""/></div><button
          class="relative flex items-center user-select-none styles_btn__Q4MvL text-button-2 styles_btn--medium__4GoNC styles_btn--neutralOutlined__mLWvq styles_btn--black__xj6Mt rounded-medium flex justify-center items-center px-3 sm:px-4 py-1 rounded cursor-pointer">
          <div class="flex items-center justify-center styles_btn__loading__d5Rcc"><svg width="24" height="24"
              id="e302pyQgejw1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
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
          <div onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' });}} class="flex items-center justify-center relative grow"><span class="text-neutral-400 ml-2">بازگشت به
              بالا</span>
            <div class="flex"><svg style={{width: 24, height: 24, fill: 'var(--color-icon-low-emphasis)'}}>
                <use xlinkHref="#expandLess">
                  <symbol id="expandLess" viewBox="0 0 24 24"><path d="M7.707 14.707l-1.414-1.414 5-5a1 1 0 011.414 0l5 5-1.414 1.414L12 10.414l-4.293 4.293z"></path></symbol>
                </use>
              </svg></div>
          </div>
        </button>
      </div>
      <div class="mb-8 mt-4 md:mt-3 md:mb-0 flex items-center flex-wrap lg:flex-nowrap text-body-2 text-neutral-700">
        <p class="shrink-0" data-cro-id="footer-phonenumber">تلفن پشتیبانی ۳۲۳۰۰۳۶۵ - ۰۳۱</p>
        <div class="px-5 text-neutral-400 hidden md:block">|</div>
        <p class="shrink-0">۰۹۱۳-۳۶۵۷۶۲۳</p>
        <div class="px-5 text-neutral-400 hidden md:block">|</div>
        <p class="w-full mt-1 md:mt-0">۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</p>
      </div>
      <div class="flex my-8 items-center justify-between select-none hidden lg:flex"><a
          class="flex py-3 flex-col items-center justify-between text-center grow" data-cro-id="footer-features"
          href="/faq/question/79/">
          <div style={{width: 56, height: 56, lineHeight: 0}}><img class="w-full inline-block"
              src="/static/icon/express-delivery.svg" width="56" height="56" style={{objectFit: 'cover'}}
              alt="اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس" title=""/></div>
          <p class="text-caption text-neutral-700">اﻣﮑﺎن ﺗﺤﻮﯾﻞ اﮐﺴﭙﺮس</p>
        </a><a class="flex py-3 flex-col items-center justify-between text-center grow" data-cro-id="footer-features"
          href="/faq/question/81/">
          <div style={{width: 56, height: 56, lineHeight: 0}}><img class="w-full inline-block"
              src="/static/icon/cash-on-delivery.svg" width="56" height="56" style={{objectFit: 'cover'}}
              alt="امکان پرداخت در محل" title=""/></div>
          <p class="text-caption text-neutral-700">امکان پرداخت در محل</p>
        </a><a class="flex py-3 flex-col items-center justify-between text-center grow" data-cro-id="footer-features"
          href="/page/contact-us/">
          <div style={{width: 56, height: 56, lineHeight: 0}}><img class="w-full inline-block"
              src="/static/icon/support.svg" width="56" height="56" style={{objectFit: 'cover'}}
              alt="۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ" title=""/></div>
          <p class="text-caption text-neutral-700">۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ</p>
        </a><a class="flex py-3 flex-col items-center justify-between text-center grow" data-cro-id="footer-features"
          href="/faq/question/83/">
          <div style={{width: 56, height: 56, lineHeight: 0}}><img class="w-full inline-block"
              src="/static/icon/days-return.svg" width="56" height="56" style={{objectFit: 'cover'}}
              alt="هفت روز ضمانت بازگشت کالا" title=""/></div>
          <p class="text-caption text-neutral-700">هفت روز ضمانت بازگشت کالا</p>
        </a><a class="flex py-3 flex-col items-center justify-between text-center grow" data-cro-id="footer-features"
          href="/faq/question/82/">
          <div style={{width: 56, height: 56, lineHeight: 0}}><img class="w-full inline-block"
              src="/static/icon/original-products.svg" width="56" height="56" style={{objectFit: 'cover'}}
              alt="ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ" title=""/></div>
          <p class="text-caption text-neutral-700">ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ</p>
        </a></div>
      <div class="flex flex-wrap w-full justify-between mb-8">
        <div class="block lg:grow w-6/12 lg:w-unset">
          <p class="text-neutral-700 text-h5 mb-2 block">با {this.state.fr_page || 'جالوس'}</p><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-with-jalus"
            href="https://about.digikala.com/newsroom/">اتاق خبر {this.state.fr_page || 'جالوس'}</a><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-with-jalus"
            href="/landings/seller-introduction/">میزبانی در {this.state.fr_page || 'جالوس'}</a><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-with-jalus"
            href="https://careers.digikala.com/">فرصت‌های شغلی</a><a class="text-body-1 text-neutral-500 mb-2 block"
            data-cro-id="footer-with-jalus" href="https://digikalapublic.whistleblowernetwork.net/frontpage">گزارش
            تخلف در {this.state.fr_page || 'جالوس'}</a><a class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-with-jalus"
            href="/page/contact-us/">تماس با {this.state.fr_page || 'جالوس'}</a><a class="text-body-1 text-neutral-500 mb-2 block"
            data-cro-id="footer-with-jalus" href="https://about.digikala.com/">درباره {this.state.fr_page || 'جالوس'}</a>
        </div>
        <div class="block lg:grow w-6/12 lg:w-unset">
          <p class="text-neutral-700 text-h5 mb-2 block">خدمات مشتریان</p><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-customer-service" href="/faq/">پاسخ به
            پرسش‌های متداول</a><a class="text-body-1 text-neutral-500 mb-2 block"
            data-cro-id="footer-customer-service" href="/faq/question/83/">رویه‌های بازگرداندن رزرواسیون</a><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-customer-service"
            href="/page/terms/">شرایط استفاده</a><a class="text-body-1 text-neutral-500 mb-2 block"
            data-cro-id="footer-customer-service" href="/page/privacy/">حریم خصوصی</a><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-customer-service"
            href="/page/bug-report/">گزارش باگ</a>
        </div>
        <div class="block lg:grow w-6/12 lg:w-unset hidden md:block">
          <p class="text-neutral-700 text-h5 mb-2 block">راهنمای خرید از {this.state.fr_page || 'جالوس'}</p><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-buying-guide"
            href="/faq/question/649/">نحوه ثبت سفارش</a><a class="text-body-1 text-neutral-500 mb-2 block"
            data-cro-id="footer-buying-guide" href="/faq/question/79/">رویه ارسال کلید هوشمند</a><a
            class="text-body-1 text-neutral-500 mb-2 block" data-cro-id="footer-buying-guide"
            href="/faq/question/81/">شیوه‌های پرداخت</a>
        </div>
        <div class="w-full lg:w-unset shrink-0">
          <div class="w-full flex lg:block lg:flex-row justify-between items-start mt-8 sm:mt-0">
            <h4 class="mb-3 text-h5 text-neutral-700">همراه ما باشید!</h4>
            <div class="flex items-center"><a class="ml-6 lg:ml-8" data-cro-id="footer-instagram"
                href="https://www.instagram.com/digikalacom/">
                <div class="flex"><svg style={{width: 40, height: 40, fill: 'var(--color-icon-low-emphasis)'}}>
                    <use xlinkHref="#instagram"></use>
                  </svg></div>
              </a><a class="ml-6 lg:ml-8" data-cro-id="footer-twitter" href="https://twitter.com/digikalacom">
                <div class="flex"><svg style={{width: 40, height: 40, fill: 'var(--color-icon-low-emphasis)'}}>
                    <use xlinkHref="#twitter"></use>
                  </svg></div>
              </a><a class="ml-6 lg:ml-8" data-cro-id="footer-linkedin"
                href="https://www.linkedin.com/company/digikala/mycompany/">
                <div class="flex"><svg style={{width: 40, height: 40, fill: 'var(--color-icon-low-emphasis)'}}>
                    <use xlinkHref="#linkedin"></use>
                  </svg></div>
              </a><a class="" data-cro-id="footer-aparat" href="https://www.aparat.com/digikala/">
                <div class="flex"><svg style={{width: 40, height: 40, fill: 'var(--color-icon-low-emphasis)'}}>
                    <use xlinkHref="#aparat"></use>
                  </svg></div>
              </a></div>
          </div>
          <div class="w-full flex flex-col items-start mt-4 sm:mt-8">
            <h4 class="hidden md:block text-h5 text-neutral-700 mb-3">با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید
            </h4>
            <div class="w-full flex items-center">
              <form class="w-full flex"><label class="FormComponentFrame_FormComponentFrame__PIUpy grow w-full">
                  <div
                    class="FormComponentFrame_FormComponentFrame__input-container__BHc4I px-2 flex items-center bg-neutral-100 rounded-medium">
                    <div class="grow text-body-3"><input
                        class="px-2 TextField_TextField__input__hFMFl text-subtitle w-full TextField_TextField__bwN9_ TextField_TextField--primary__IZ6Ku"
                        type="email" name="email" placeholder="ایمیل شما" value=""/></div>
                  </div>
                </label><button
                  class="relative flex items-center user-select-none styles_btn__Q4MvL text-button-1 styles_btn--large__1Muai styles_btn--primary__y0GEv styles_btn--disabled__lljQT rounded-medium pointer-events-none rounded text-neutral-000 mr-2"
                  type="submit" data-cro-id="footer-email-submission">
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
                  <div class="flex items-center justify-center relative grow">ثبت</div>
                </button></form>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row mb-7 lg:px-5 rounded text-neutral-000 select-none py-2 items-center justify-between BaseLayoutStaticFooter_BaseLayoutStaticFooter__appSection__CH3bo">
        <div class="flex items-center text-white mb-4 lg:mb-0">
          <div class="shrink-0" style={{height: 44, lineHeight: 0}}>
            <picture>
              <source type="image/webp" srcset="/static/icon/jalus_red_white.svg"/>
              <source type="image/jpeg" srcset="/static/icon/jalus_red_white.svg"/>
              <img class="inline-block" src="/static/icon/jalus_red_white.svg" width="44" height="44" style={{objectFit: 'cover', width: 'auto'}} alt="جالوس" title=""/>
            </picture>
          </div>
          <div class="text-h3 shrink-0 mr-4"> دانلود اپلیکیشن {this.state.fr_page || 'جالوس'}</div>
        </div>
        <div class="flex items-center justify-end grow">
          <div class="flex items-center justify-center lg:justify-end flex-wrap lg:grow"><a
              class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__appDownloadLink__VZlyq m-2"
              data-cro-id="footer-bazar" target="_blank" title="دریافت از کافه‌بازار"
              href="https://trc.metrix.ir/k3of5r/">
              <div style={{height: 44, borderRadius: 4, lineHeight: 0}}><img class="w-full inline-block"
                  src="/static/icon/coffe-bazzar.svg" height="44"
                  style={{objectFit: 'contain', borderRadius: 4}} alt="دریافت از کافه‌بازار" title=""/></div>
            </a><a class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__appDownloadLink__VZlyq m-2"
              data-cro-id="footer-myket" target="_blank" title="دریافت از مایکت" href="https://trc.metrix.ir/fpydqh/">
              <div style={{height: 44, borderRadius: 4, lineHeight: 0}}><img class="w-full inline-block"
                  src="/static/icon/myket.svg" height="44"
                  style={{objectFit: 'contain', borderRadius: 4}} alt="دریافت از مایکت" title=""/></div>
            </a><a class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__appDownloadLink__VZlyq m-2"
              data-cro-id="footer-sibapp" target="_blank" title="دریافت از سیب‌اپ"
              href="https://trc.metrix.ir/4gluyi/">
              <div style={{height: 44, borderRadius: 4, lineHeight: 0}}><img class="w-full inline-block"
                  src="/static/icon/sib-app.svg" height="44"
                  style={{objectFit: 'contain', borderRadius: 4}} alt="دریافت از سیب‌اپ" title=""/></div>
            </a></div><a class="hidden lg:block mr-4" data-cro-id="footer-app-landing" target="_blank"
            href="/landings/new-app/">
            <div class="border-complete-200 bg-neutral-000"
              style={{width: 44, height: 44, borderRadius: 4, lineHeight: 0}}><img class="w-full inline-block"
                src="/static/icon/More.svg" width="44" height="44" style={{objectFit: 'cover', borderRadius: 4}}
                alt="" title=""/></div>
          </a>
        </div><a
          class="inline-flex items-center cursor-pointer styles_Anchor--white__KFujY text-button-2 lg:hidden mt-1"
          href="/landings/new-app/"><span>اطلاعات بیشتر</span>
          <div class="flex"><svg style={{width: 18, height: 18, fill: 'var(--color-icon-white)'}}>
              <use xlinkHref="#chevronLeft"></use>
            </svg></div>
        </a>
      </div>
      <div class="flex items-start justify-between border-complete-t py-8 border-n-200 flex-wrap lg:flex-nowrap">
        <div class="grow">
          <div style={{height: this.state.footExpand ? '100%' : '125px'}} class="relative seo lg:ml-10 ml-0 text-neutral-500 text-body-2 overflow-hidden styles_BaseLayoutStaticFooterAboutUs__content__d9jew_ARSHA">
            {this.state.foot ? <>{this.state.foot_title && <h1><strong>{this.state.foot_title}</strong></h1>}<p>{this.state.foot}</p></> : <><h1><strong>فروشگاه اینترنتی جالوس، بررسی، انتخاب و خرید آنلاین</strong></h1>
            <p>یک<strong> خرید</strong> اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای
              قیمت مناسب را در مدت زمان ی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛
              ویژگی‌هایی که فروشگاه اینترنتی جالوس سال‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان
              ثابت خود را داشته باشد.<br/>
              یکی از مهم‌ترین دغدغه‌های کاربران جالوس یا هر فروشگاه‌ اینترنتی دیگری، این است که کالای خریداری شده
              چه زمانی به دستشان می‌رسد. جالوس شیوه‌های مختلفی از ارسال را متناسب با فروشنده کالا،‌ مقصد کالا و
              همچنین نوع کالا در اختیار کاربران خود قرار می‌دهد. هر یک&nbsp;از <a
                href="https://www.digikala.com/landing/delivery/">روش های ارسال جالوس</a> شرایط و ویژگی‌های خاص
              خود را دارند که ممکن است گاهی برای کاربران جدید، مبهم و پیچیده به نظر برسند. برای آگاهی بیشتر مشتریان از
              خدمات جالوس، این فروشگاه اینترنتی در بخشی از وب‌سایت خود راهنمای کاملی از شیوه‌‌های ارسال را به صورت
              ساده و به دور از پیچیدگی، قرار داده است که شامل 8 نوع ارسال کالا به روش‌های زیر است: ارسال امروز، دریافت
              حضوری، دریافت از گنجه، ارسال توسط فروشنده، ارسال عادی، ارسال کالاهای بزرگ، سنگین و فوق سنگین، ارسال سریع
              سوپرمارکتی، ارسال با پست</p>
            <p>کدام محصولات در جالوس قابل سفارش هستند؟</p>
            <p>تقریبا می‌توان گفت محصولی وجود ندارد که جالوس برای مشتریان خود در سراسر کشور فراهم نکرده باشد. شما
              می‌توانید در تمامی روزهای هفته و تمامی شبانه روز&nbsp;جالوس که محصولات دارای تخفیف عالی می‌شوند،
              سفارش خود را به سادگی ثبت کرده و در روز و محدوده زمانی مناسب خود، درب منزل تحویل بگیرید. بعضی از
              گروه‌های اصلی و زیر مجموعه‌های پرطرفدار محصولات جالوس شامل مواردی می‌شود که در ادامه به معرفی آن‌ها
              می‌پردازیم که&nbsp;امکان <a href="https://www.digikala.com/landing/sameday-delivery/"><strong>ارسال
                  امروز</strong></a> برای آن ها وجود دارد.&nbsp;</p>
            <p>کالای دیجیتال</p>
            <p>انواع گوشی موبایل از برندهای مختلفی مثل آیفون، &nbsp;<a
                href="https://www.digikala.com/search/category-mobile-phone/samsung/" target="_blank">گوشی
                سامسونگ</a>،&nbsp;<a href="https://www.digikala.com/search/category-mobile-phone/nokia/"
                target="_blank">گوشی نوکیا</a>،&nbsp;<a
                href="https://www.digikala.com/search/category-mobile-phone/xiaomi/" target="_blank">گوشی
                شیائومی</a>،&nbsp;<a href="https://www.digikala.com/search/category-mobile-phone/huawei/"
                target="_blank">گوشی هواوی</a>، و...، انواع کنسول بازی ps4 و ps5، انواع تبلت‌های پرطرفدار مثل&nbsp;<a
                href="https://www.digikala.com/search/category-tablet/samsung/" target="_blank">تبلت
                سامسونگ</a>&nbsp;نوت 10، انواع هندزفری مثل&nbsp;<a
                href="https://www.digikala.com/search/category-headphone/" target="_blank">هندزفری بی سیم</a>،&nbsp;<a
                href="https://www.digikala.com/search/category-tv2/" target="_blank">تلوزیون</a>&nbsp;از برندهای مختلف
              مثل تلویزیون سامسونگ، سونی و...، انواع مانیتور، کیس، کیبورد، مودم از برندهای مختلف مثل&nbsp;<a
                href="https://www.digikala.com/search/category-3g-4g-and-5g-modem-Router/mtn-irancell/"
                target="_blank">مودم ایرانسل</a>،&nbsp;<a
                href="https://www.digikala.com/search/category-lighting-antenna/" target="_blank">آنتن</a>&nbsp;و ...
              تنها بخشی از محصولاتی هستند که زیر مجموعه کالای دیجیتال در جالوس قرار دارند.</p>
            <p>خودرو، ابزار و تجهیزات صنعتی</p>
            <p>انواع خودروهای ایرانی و خارجی از برندهای مطرحی مثل هوندا، کیا و...، موتور سیکلت از برندهایی مثل کویر
              موتور و...، لوازم جانبی خودرو مثل سیستم صوتی تصویر، ضبط و...، لوازم یدکی مثل دیسک و صفحه کلاج و... و
              لوازم مصرفی خودرو مثل&nbsp;<a href="https://www.digikala.com/search/category-car-coating/sana-3d/"
                target="_blank">کفپوش سانا</a>&nbsp;در این گروه قرار می‌گیرند.</p>
            <p>مد و پوشاک</p>
            <p>محصولاتی مثل انواع لباس مثل لباس مجلسی زنانه و مردانه، لباس راحتی، لباس ورزشی، اکسسوری، کیف، کفش، عینک
              آفتابی، لباس زیر، شال و روسری و... جزو مواردی هستند که می‌توانید آن‌ها را از برندهای مطرح ایرانی و خارجی
              موجود در جالوس مثل آدیداس، نایکی، دبنهامز، آلدو، درسا و... خریداری کنید.</p>
            <p>اسباب بازی کودک و نوزاد</p>
            <p>در این دسته از کالاهای جالوس، انواع لوازم بهداشتی و حمام کودک و نوزاد، انواع پوشاک و کفش،&nbsp;<a
                href="https://www.digikala.com/search/category-tablet/" target="_blank">تبلت</a>،&nbsp;<a
                href="https://www.digikala.com/search/category-toys/" target="_blank">اسباب‌بازی</a>، لوازم اتاق خواب
              کودک، لوازم ایمنی، لوازم شخصی و غذا خوری و ... قرار می‌گیرد تا خرید را برای پدر و مادرها به کاری سریع و
              آسان تبدیل کند.</p>
            <p>کالاهای سوپر مارکتی</p>
            <p>هر چیزی از مواد خوراکی که به آن نیاز دارید، در&nbsp;<a
                href="https://www.digikala.com/main/food-beverage/" target="_blank">سوپرمارکت</a>&nbsp;جالوس پیدا
              می‌شود، محصولات پرطرفداری مثل&nbsp;<a href="https://www.digikala.com/search/category-peanut-butter/"
                target="_blank">کره بادام‌زمینی</a>،&nbsp;<a href="https://www.digikala.com/search/category-honey/"
                target="_blank">عسل</a>،&nbsp;<a href="https://www.digikala.com/search/category-sauce-dressing/"
                target="_blank">سس</a>،&nbsp;<a href="https://www.digikala.com/search/category-coffee/"
                target="_blank">قهوه</a>،&nbsp;<a href="https://www.digikala.com/search/category-saffron/"
                target="_blank">زعفران</a>، شکلات، انواع نان و ... از برندهای معتبر و معروفی مثل&nbsp;<a
                href="https://www.digikala.com/brand/nestle/" target="_blank">نستله</a>، نوتلا، استارباکس، مزمز، چی
              توز و ... همگی در اختیار شما هستند و تا رسیدن به آشپزخانه شما تنها چند کلیک فاصله دارند.</p>
            <p>زیبایی و سلامت</p>
            <p>انواع لوازم آرایش مثل لاک، رنگ مو، لوازم آرایش لب، چشم، صورت و... همگی در جالوس موجود هستند. همچنین
              محصولات بهداشتی مثل انواع شامپو، <a href="https://www.digikala.com/search/category-sunscreen-cream/">کرم
                ضد آفتاب</a>،&nbsp;<a href="https://www.digikala.com/search/category-face-masque/"
                target="_blank">ماسک صورت</a>، ضد تعریق،&nbsp;<a
                href="https://www.digikala.com/search/category-hair-mask/" target="_blank">ماسک مو</a>&nbsp; و...،
              انواع لوازم شخصی برقی، ست هدیه، بهترین انواع عطر و اسپری، <a
                href="https://www.digikala.com/search/category-foundation/">کرم پودر</a>، ریمل و <a
                href="https://www.digikala.com/search/category-lip-stick/">رژلب </a>وانواع زیورآلات طلا و نقره
              مثل&nbsp;<a href="https://www.digikala.com/search/category-women-gold-jewelry-sets/"
                target="_blank">سرویس طلا</a>، سرویس نقره و... به همراه وسایل مراقبت شخصی طبی در گروه زیبایی و سلامت
              جالوس قرار می‌گیرد. در این بخش برندهای مطرحی مثل اسنس، پنبه ریز، سینره و... حضور دارند.</p>
            <p>خانه و آشپزخانه</p>
            <p>یکی از متنوع‌ترین بخش‌های جالوس، بخش لوازم خانه و آشپزخانه است که از محصولاتی مثل صندلی گیمینگ در
              بخش صندلی‌ها گرفته تا انواع&nbsp;<a href="https://www.digikala.com/search/category-household-furniture/"
                target="_blank">مبل راحتی</a>، انواع آبگرمکن مثل&nbsp;<a
                href="https://www.digikala.com/search/category-water-heater/butane/" target="_blank">آبگرمکن
                بوتان</a>، لباسشویی‌های متنوع مثل انواع&nbsp;<a
                href="https://www.digikala.com/search/category-washing-machines/snowa/" target="_blank">لباسشویی
                اسنوا</a>، شیرآلات مختلف مثل شیرآلات قهرمان و...، ظروف و همچنین لوازم برقی آشپزخانه مثل توستر و... را
              شامل می‌شود و امکان خریدی عالی را برای مشتریان فراهم کرده است. در بخش لوازم خانگی جالوس، برندهای
              معتبری مثل تفال، اخوان، فیلیپس، ال جی، اسنوا، جی پلاس و... حضور دارند.</p>
            <p>کتاب، لوازم تحریر و هنر</p>
            <p>بخش هنر، کتاب، رمان و لوازم تحریر جالوس نیز یکی از متنوع‌ترین بخش‌های این فروشگاه اینترنتی است.
              انواع کتاب و مجله، <a href="https://www.digikala.com/landing/language-learning-books/">کتاب زبان</a>،
              بازی، لوازم تحریر با طرح‌های مختلف مانند <a href="https://www.digikala.com/tags/miraculous/">دختر
                کفشدوزکی</a>، سازهایی مثل&nbsp;<a href="https://www.digikala.com/search/category-pianos/"
                target="_blank">پیانو</a>،&nbsp;<a href="https://www.digikala.com/search/category-dulcimer/"
                target="_blank">سنتور</a>،&nbsp;<a href="https://www.digikala.com/search/category-percussion/"
                target="_blank">هنگ درام</a>&nbsp; و... با بهترین قیمت‌ها و از بهترین برندها در دسترس شما قرار دارند.
            </p>
            <p>ورزش و سفر</p>
            <p>هر نوع وسیله و لباس ورزشی که فکرش را کنید، انواع وسایل کمپینگ و کوهنوردی، ساک و قمقمه ورزشی و... در این
              بخش قرار می‌گیرند. همچنین شما می‌توانید وسایل مد نظر خود را بر اساس نوع ورزش (آبی، هوازی، بدنسازی و...)
              در دسته‌بندی‌های جالوس پیدا کنید.</p>
            <p>محصولات بومی و محلی</p>
            <p>و در آخر جالوس از طریق به فروش رساندن محصولات بومی و سنتی متفاوتی مثل انواع خوراکی، گلیم و گبه،
              ابزار و ... تلاش کرده تا بین هنر ایرانی و متقاضیان آن کوتاه‌ترین راه را پیدا کند. در این بخش شما
              می‌توانید انواع محصولات از جمله ظروف زیبای مخصوص به&nbsp;سفره هفت‌سین&nbsp; و پذیرایی از مهمانان در
              روزهای&nbsp;نوروز، انواع آیینه و شمعدان و هر آن چیزی را که برای خلق زیبایی در روزهای بهاری به آن نیاز
              دارید، با قیمت مناسب و تنوع بسیار بالا انتخاب کنید. همچنین در صفحه <strong><a
                  href="https://www.digikala.com/tags/">برچسب ها</a></strong>، امکان مشاهده و خرید انواع محصولات با
              طرح های بومی وجود دارد.&nbsp;&nbsp;جالوس همچنین برای اینکه حال و هوای عید را به اعضای خود هدیه
              کند،&nbsp;تقویم ۱۴۰۱، انواع ایده&nbsp;عکس پروفایل عید نوروز،&nbsp;آهنگ‌های عید نوروز&nbsp;و موزیک‌های
              شاد بهاری، وسایل مربوط به&nbsp;خانه‌تکانی&nbsp;و&nbsp;انواع لباس های عید&nbsp; را برای شما فراهم کرده
              است تا بتوانید در کنار خرید خود، از این حال و هوای تازه نهایت لذت را ببرید.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </>}</div>
          <span onClick={() => {this.setState({footExpand: !this.state.footExpand})}} class="inline-flex items-center cursor-pointer styles_Anchor--secondary__3KsgY text-button-2 flex mt-2 items-center user-select-none"><span>مشاهده
              {this.state.footExpand ? ' کمتر' : ' بیشتر'}</span>
            <div class="flex"><svg style={{width: 18, height: 18, fill: 'var(--color-icon-secondary)'}}>
                <use xlinkHref="#chevronLeft"></use>
              </svg></div>
          </span>
        </div>
        <div class="w-full flex items-center mt-4 lg:mt-0 justify-center lg:justify-end">
          <div class="cursor-pointer p-2 lg:p-4 flex items-center justify-center border-complete-200 rounded mr-2">
            <div style={{width: 75, height: 75, lineHeight: 0}}>
              <picture>
                <source type="image/webp" srcset="/static/icon/rezi.webp"/>
                <source type="image/jpeg" srcset="/static/icon/rezi.png"/><img class="w-full inline-block"
                  src="/static/icon/rezi.png" width="75" height="75" style={{objectFit: 'contain'}}
                  alt="نشان ملی ثبت" title=""/>
              </picture>
            </div>
          </div>
          <div class="cursor-pointer p-2 lg:p-4 flex items-center justify-center border-complete-200 rounded mr-2">
            <div style={{width: 75, height: 75, lineHeight: 0}}>
              <picture>
                <source type="image/webp" srcset="/static/icon/kasbokar.webp"/>
                <source type="image/jpeg" srcset="/static/icon/kasbokar.png"/><img class="w-full inline-block"
                  src="/static/icon/kasbokar.png" width="75" height="75" style={{objectFit: 'contain'}}
                  alt="نماد کسب و کار های مجازی" title=""/>
              </picture>
            </div>
          </div><a class="cursor-pointer p-2 lg:p-4 flex items-center justify-center border-complete-200 rounded mr-2"
            target="_blank" referrerpolicy="origin"
            href="https://trustseal.enamad.ir/?id=19077&amp;Code=sScdOJOzhFxtcEqkjP7P">
            <div style={{width: 75, height: 75, lineHeight: 0}}><img id="sScdOJOzhFxtcEqkjP7P"
                referrerpolicy="origin" class="w-full inline-block"
                src="/static/icon/enemad.png" width="75"
                height="75" style={{objectFit: 'contain'}} alt="نماد اعتماد الکترونیک" title=""/></div>
          </a>
        </div>
      </div>
      <div
        class="flex text-caption text-neutral-500 text-center items-center flex-col justify-between border-complete-t py-8">
        برای استفاده از مطالب {this.state.fr_page || 'جالوس'}، داشتن «هدف غیرتجاری» و ذکر «منبع» کافیست. تمام حقوق اين وب‌سايت نیز برای شرکت
        نوآوران شریف سازه (فروشگاه آنلاین {this.state.fr_page || 'جالوس'}) است.</div>
    </div>
  </div>
  <div class="w-full bg-neutral-100">
    <div class="container-4xl-w mx-auto flex items-start justify-end flex-wrap">
      {this.state.foot_logos.map((logo) => (<a class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href={logo.href}>
        <div style={{height: 20, lineHeight: 0}}>
          <img class="w-full inline-block" src={logo.svg} height="20" style={{objectFit: 'contain'}} alt="مجله اینترنتی جالوس مگ" title=""/>
        </div>
      </a>))}
      {/* <a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://www.digikala.com/mag/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digimag.svg" height="20" style={{objectFit: 'contain'}}
            alt="مجله اینترنتی جالوس مگ" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://www.mydigipay.com/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digipay.svg" height="20" style={{objectFit: 'contain'}}
            alt="بهترین راهکارهای پرداخت آنلاین" title=""/></div>
      </a>
      <a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://www.digistyle.com/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digistyle.svg" height="20" style={{objectFit: 'contain'}}
            alt="خرید آنلاین مد و لباس از فروشگاه اینترنتی دیجی‌استایل با همان تجربه از جالوس" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="/plus/landing/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digiplus.svg" height="20" style={{objectFit: 'contain'}}
            alt="خدمات ویژه جالوس برای کاربران با اشتراک دیجی‌پلاس" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="/digiclub/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digiclub.svg" height="20" style={{objectFit: 'contain'}}
            alt="دیجی کلاب باشگاه مشتریان جالوس" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://digikalajet.com/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/jet.svg" height="20" style={{objectFit: 'contain'}}
            alt="خرید آنی سوپرمارکتی از فروشگاه های نزدیک" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank"
        href="https://www.digikala.com/landings/magnet/?utm_source=Digikala_web&amp;utm_medium=Footer">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/magnet.svg" height="20" style={{objectFit: 'contain'}}
            alt="مگنت - پلتفرم بررسی و انتخاب کالا" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://www.digikala.com/mehr/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digiMehr.svg" height="20" style={{objectFit: 'contain'}}
            alt="جالوس مهر - زنجیره مهربانی و لبخند" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://diginext.ir/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/diginext.svg" height="20" style={{objectFit: 'contain'}}
            alt="مرکز نوآوری و فناوری گروه جالوس" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://digiexpress.ir/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digiexpress.svg" height="20" style={{objectFit: 'contain'}}
            alt="سیستم حمل و نقل جالوس" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank"
        href="https://ganje.net/?utm_source=Digikala_web&amp;utm_medium=Footer">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/ganjeh.svg" height="20" style={{objectFit: 'contain'}} alt="گنجه" title=""/>
        </div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://digify.shop/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digify.svg" height="20" style={{objectFit: 'contain'}} alt="دیجی‌فای" title=""/>
        </div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://smartech.ir/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/smartech.svg" height="20" style={{objectFit: 'contain'}} alt="اسمارتک"
            title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://www.digikalabusiness.com/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digikala-business.svg" height="20" style={{objectFit: 'contain'}}
            alt="جالوس بیزینس" title=""/></div>
      </a><a
        class="BaseLayoutStaticFooter_BaseLayoutStaticFooter__partnersSectionItem__H4OBR border-complete-r-200 border-complete-b-200 px-5 grow flex flex-col items-center justify-center"
        data-cro-id="footer-icons" target="_blank" href="https://digikala-service.com/">
        <div style={{height: 20, lineHeight: 0}}><img class="w-full inline-block"
            src="/static/icon/digikala-service.svg" height="20" style={{objectFit: 'contain'}}
            alt="جالوس سرویس" title=""/></div>
      </a> */}
    </div>
  </div>
</footer>