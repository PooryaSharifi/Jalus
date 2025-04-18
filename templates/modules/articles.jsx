<div class="container-2xl-w mx-auto lg:px-4 2xl:px-0">
  <div class="w-full bg-neutral-000 user-select-none lg:rounded-large">
    <div class="flex justify-between py-4 items-center px-5">
      <div class="text-h5 text-neutral-900">خواندنی‌ها</div>
      {this.state.article != -1 && <span data-cro-id="hp-more-blogs" class="shrink-0"><a onClick={async () => {this.setState({article: -1})}}
        class="inline-flex items-center cursor-pointer styles_Anchor--secondary__3KsgY text-button-2"><span>بازگشت</span>
        <div class="flex"><svg style={{width: 18, height: 18, fill: 'var(--color-icon-secondary)'}}>
            <use xlinkHref="#chevronLeft">
              <symbol id="chevronLeft" viewBox="0 0 24 24"><path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path></symbol>
            </use>
          </svg></div>
      </a></span>}
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 items-stretch lg:justify-around px-5 lg:px-0">
      {this.state.articles.map((article, ai) => (<div onClick={async () => {this.setState({article: ai})}}
        class="touchable bg-neutral-000 mb-1 border-complete-200 user-select-none rounded-medium flex flex-col h-full overflow-hidden article-card_ArticleCard__container__6Ks7Q"
        data-cro-id="hp-blogs" target="_blank">
        <div style={{lineHeight: 0}}><img class="w-full article-card_ArticleCard__image__nrAQr inline-block"
            src={article.jpeg} style={{objectFit: 'cover'}} alt={article.title} title=""/></div>
        <div class="mt-2 mb-3 px-4 ellipsis-2 text-body-2 text-neutral-900 w-full text-right">{article.title}</div>
      </div>))}
    </div>
  </div>
</div>