<div class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
  <div class="w-full py-3 lg:pt-4 lg:pb-10 flex flex-col items-center">
    <div class="mb-6 lg:mb-9 text-center">
      <h3 class="text-h3">خرید بر اساس دسته‌بندی</h3>
    </div>
    <div class="flex flex-col justify-center items-center">
      {this.state.categories.reduce((r,e,i) => (i % Math.min(8, Math.floor(window.innerWidth / 143)) ? r[r.length - 1].push(e): r.push([e])) && r, []).map((cats, cats_i) => (<div class="flex w-full flex-row items-center justify-center gap-2">
        {cats.map((category, c_i) => (<span data-cro-id="hp-categories-icons" class="h-40 px-4 flex-1 max-w-[143px]">
          <a class="flex flex-col items-center user-select-none w-full lg:p-0 lg:mx-0" href={category.href}>
            <div class="flex items-center justify-center" style={{width: 100, height: 100, lineHeight: 0}}>
              <img src={category.png} class="w-full h-full inline-block" width="100" height="100" style={{objectFit: 'contain'}} alt={category.title} title=""/>
            </div><p class="text-body2-strong text-neutral-900 mt-2 text-center ellipsis-2">{category.title}</p>
          </a>
        </span>))}
      </div>))}
    </div>
  </div>
</div>