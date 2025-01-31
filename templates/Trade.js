/** #title شریف ترید (هوش مصنوعی) #title **/
/** #links  #links **/
/** #elements <style>.touchable { cursor: pointer; transition: 0.07s ease-in-out; }
  .touchable:active { opacity: .2; }
  .touchable.selected { cursor: pointer; border-bottom: 2px solid #EB5757; opacity: .65}
  .touchable.selected.green { border-bottom-color: #33AE45;}
  .symbol-img {box-sizing: border-box;margin: 0;min-width: 0;width: 32px;height: 32px;border-radius: 99999px;
    box-shadow: inset 0 0 1px rgba(0,0,0,0.2);background-repeat: no-repeat;background-size: 100% 100%;background-position: center;}
  .row .col { display: inline-block; vertical-align: middle; }
  .row .col + .col { margin-left: -4px; }
  .row .col.one { width: 14%; padding-left: 8%; }
  .row .col.three { width: 28%; }
  .row .col.six { width: calc(50% - 2px); }
  .symbols-page { margin-top: 1em; }
  .symbols-page .row { padding-bottom: .328em; }
  .symbols-page .row { padding-top: 1.48em; }
  .symbols-page .row + .row { padding-top: .325em; }
  #date { margin-top: 1.5em; text-align: center; }
  #next span.notification::after {content: "";position: absolute;display: inline-block;height: 5px;
    width: 5px;background-color: #33AE45;border-radius: 50%;margin-left: -14px;}
</style><div id="app"></div> #elements **/

class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;
    this.state = {ordered: false, phone: cookie('phone'), session: cookie('session'), keys: {}, slide: 3, otp: false, signals: [], markets: []};
  } async componentDidMount() { let app = this;
    let r = await fetch('/trade/k', {method: 'POST', headers: { Accept: 'application/json' }}); this.setState({markets: await r.json() || []})
    r = await fetch('/trade/s', {method: 'POST', headers: { Accept: 'application/json' }}); this.setState({signals: await r.json() || []})
  } render() { let app = this;
    return <div>
      <div id="symbols-page" class="symbols-page page">
        {this.state.signals.map((signal) => <div>Signal {signal.market} {Math. floor(((Date.now()) - (new Date(signal.timestamp.replace(' ', 'T')).getTime())) / 1000 / 3600)} Hours and {Math. floor(((Date.now()) - (new Date(signal.timestamp.replace(' ', 'T')).getTime())) / 1000 / 60) % 60} Minuts ago applied to You</div>)}
        {this.state.markets.map((market) => 
          <div class="row touchable" label={market[0]} onClick={async () => {window.history.pushState({urlPath: `/k/${market[0]}`}, "", `/k/${market[0]}`); await this.updateKlines(market[0])}}>
            <div class="col one">
              <div class="symbol-img" style={{backgroundImage: `url(/static/trade/${market[0].substring(0, market[0].length - 4).toLowerCase()}.png)` }}></div>
            </div> <div class="col six">
              <span style={{color: market[1] > market[2] ? '#33AE45' : '#EB5757'}}>{market[1].toFixed(2)}$</span>
            </div> <div class="col three">
              <span style={{color: market[1] > market[3] ? '#33AE45' : '#EB5757'}}>{market[1] > market[3] ? "+" : ""}{((market[1] - market[3]) / market[3] * 100).toFixed(2)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  }
}