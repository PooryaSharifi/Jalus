/** #title هوشمندسازی اسکان #title **/
/** #links <link href="/static/Home.css" rel="stylesheet" crossorigin="anonymous"><link href="/static/switch.css" rel="stylesheet" crossorigin="anonymous"><link href="/static/thermostat.css" rel="stylesheet" crossorigin="anonymous"> #links **/
/** #elements <div id="app"></div> #elements **/

let categories = [];
['buy', 'rent'].map((ft) => {['apartment', 'villa', 'old-house', 'office', 'store', 'industrial-agricultural-property'].map((et) => {categories.push(`${ft}-${et}`)})});
categories = categories.filter(e => e !== 'rent-old-house');
['temporary-suite-apartment', 'temporary-villa', 'temporary-workspace'].map((et) => categories.push(`rent-${et}`))
categories.push('contribution-construction'); categories.push('pre-sell-home');
const icons = {'بالکن': 'balcony', 'انباری': 'cabinet', 'پارکینگ': 'parking'}
class App extends React.Component {
  constructor(props) {super(props); let app = this; window.app = this;  // condition: Clear, Cloudy, Rainy, Snowy
    this.state = {checked: true, setting: cookie('setting') === 'true' | false, dark: cookie('dark') === 'true' | false, trans: cookie('translate') === 'false' ? false : true, weather: {"out": -3, "humidity": 53, "in": 27, "condition": "Cloudy", }, like: false, selectedSpace: 0, space: null, loaded: false, spaces: [], device: {name: 'IPhone X', type: 'phone', selected: true}, devices: [{name: 'Pocco X3', type: 'phone'}, {name: 'Galaxy S20', type: 'phone'}]}
  } async componentDidMount() {
    // var socket = this.socket = new WebSocket("ws://" + location.host + '/serial');
    // this.socket.onopen = function (eve) {setInterval(() => socket.send(JSON.stringify({foo: "bar"})), 4000)};
    // this.socket.onmessage = function (eve) {
    //   let user = JSON.parse(eve.data);
    // };
    this.state.spaces = [{
      name: 'Key',
      image: ['/static/icon/garden.webp', '/static/icon/garden.webp'],
      appliances: [{
        "title": "Door",
        "name": "b",
        "classes": "f",
        "opening": true,
        "loaded": true,
      }, {
        "title": "OutDoor",
        "name": "d",
        "classes": "f",
        "opening": true,
        "loaded": true,
      }]
    }, {
      name: 'Coffee',
      image: ['/static/icon/coffeeBanner.webp', '/static/icon/coffeeBanner.webp'],
      appliances: [{
        "title": "Mocha",
        "name": "curacao",
        "image": "/static/icon/coffee.webp",
        "imagePosition": [0, 0],
        "loaded": true,
      }, {
        "title": "Espresso",
        "name": "curacao",
        "image": "/static/icon/coffee.webp",
        "imagePosition": [2, 2],
        "loaded": true,
      }, {
        "title": "Cappuccino",
        "name": "curacao",
        "image": "/static/icon/coffee.webp",
        "imagePosition": [2, 0],
        "loaded": true,
      }, {
        "title": "Latte",
        "name": "curacao",
        "image": "/static/icon/coffee.webp",
        "imagePosition": [0, 2],
        "loaded": true,
      }, {
        "title": "Americano",
        "name": "curacao",
        "image": "/static/icon/coffee.webp",
        "imagePosition": [0, 1],
        "loaded": true,
      }, {
        "title": "Hot Chocolate",
        "name": "curacao",
        "image": "/static/icon/coffee.webp",
        "imagePosition": [1, 1],
        "loaded": true,
      }, ],
    }, {
      name: 'Juice',
      image: ['/static/icon/juicesBanner.webp', '/static/icon/juicesBanner.webp'],
      appliances: [{
        "title": "Blue Curacao",
        "name": "curacao",
        "image": "/static/icon/juices.webp",
        "imagePosition": [0, 0],
        "loaded": true,
      }, {
        "title": "Blue Punch",
        "name": "punch",
        "image": "/static/icon/juices.webp",
        "imagePosition": [1, 0],
        "loaded": true,
      }, {
        "title": "Cherry Juice",
        "name": "cherry",
        "image": "/static/icon/juices.webp",
        "imagePosition": [2, 0],
        "loaded": true,
      }, {
        "title": "Coco Mango",
        "name": "cocoMango",
        "image": "/static/icon/juices.webp",
        "imagePosition": [3, 0],
        "loaded": true,
      }, {
        "title": "Cosmopolitan",
        "name": "cosmopolitan",
        "image": "/static/icon/juices.webp",
        "imagePosition": [4, 0],
        "loaded": true,
      }, {
        "title": "Limonade",
        "name": "limonade",
        "image": "/static/icon/juices.webp",
        "imagePosition": [0, 1],
        "loaded": true,
      }, {
        "title": "Mango Juice",
        "name": "mango",
        "image": "/static/icon/juices.webp",
        "imagePosition": [1, 1],
        "loaded": true,
      }, {
        "title": "Margarita",
        "name": "margarita",
        "image": "/static/icon/juices.webp",
        "imagePosition": [2, 1],
        "loaded": true,
      }, {
        "title": "Mojito",
        "name": "mojito",
        "image": "/static/icon/juices.webp",
        "imagePosition": [3, 1],
        "loaded": true,
      }, {
        "title": "Orange Juice",
        "name": "orange",
        "image": "/static/icon/juices.webp",
        "imagePosition": [4, 1],
        "loaded": true,
      }, {
        "title": "Orange Mint",
        "name": "orangeMint",
        "image": "/static/icon/juices.webp",
        "imagePosition": [0, 2],
        "loaded": true,
      }, {
        "title": "PinaColada",
        "name": "pinaColada",
        "image": "/static/icon/juices.webp",
        "imagePosition": [1, 2],
        "loaded": true,
      }, {
        "title": "Pineapple Juice",
        "name": "pineapple",
        "image": "/static/icon/juices.webp",
        "imagePosition": [2, 2],
        "loaded": true,
      }, ],
    }, {
      name: 'Grill',
      image: ['/static/icon/grill.webp', '/static/icon/grill.webp'],
      appliances: [],
    }, {
      name: 'Dj',
      image: ['/static/icon/dj.webp', '/static/icon/dj.webp'],
      appliances: [],
    }, {
      "name": "Living Room",
      "image": ["/static/icon/living-room.jpg", "/static/icon/living-room_mirror.jpg"],
      "appliances": [{
        "title": "Lamp",
        "name": "a",
        "classes": "l",
        "opening": false,
        "loaded": true
      }, {
        "title": "Temperature",
        "name": "c",
        "classes": "a",
        "opening": false,
        "loaded": true,
        "extra": {
          "functions": ["Automatic", "Heater", "Cooler"],
          "min": 2,
          "gradi": 19,
          "max": 34,
          "fill1": {"transform": "rotate(80deg)"},
          "fill2": {"transform": "rotate(80deg)"},
          "shadow": {}
        }
      }, {
        "title": "Dj Mode",
        "name": "e",
        "classes": "l",
        "opening": false,
        "loaded": true
      }, ],
    }, ]
    let id = window.location.href.split('/');
    if (id[id.length - 1] == 'homes') { id = ''; /* fetch keys and find id of the key */}
    else id = id[id.length - 1];
    let r = await fetch(`/properties/${id}`, {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}});
    if (r.status === 200) {
      r = await r.json();
      // this.state.spaces = r[0].spaces;  // add spaces to Divar
      this.state.spaces[0].image = [`/homes/${id}/qr`, `/homes/${id}/qr`]
    } else window.location.href = "/properties";
    this.setState({ selectedSpace: 0, loaded: true }, () => {document.body.style.backgroundColor = "#F6F8FA";});
    // r = await fetch(`/weathers/@${r.location.lat},${r.location.lng}`);
    // if (r.status === 200)
    //   this.setState({weather: await r.json()});
    // if (!this.state.session) window.location.href = `/properties/${id}`;
    // r = await fetch('/key', {method: 'GET', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': this.state.session}});
    // if (r.status > 300) window.location.href = `/properties/${r[i].home}`;
    // r = await r.json(); for (var i = 0; i < r.length; i ++) if (r[i].head < Date() && Date() < r[i].tail && (r[i].home == this.state.home || this.state.home == '')) return;
    // window.location.href = `/properties/${r[i].home}`;
  } render() {
    return !this.state.loaded ? (
      <div style={{width: window.screen.width, height: window.screen.height, backgroundImage: `url(/static/icon/cover.webp)`, backgroundSize: '20%', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 50%'}}/>
    ) : this.state.space ? <div class={"dashboard" + (this.state.dark ? " dark" : "") + (this.state.trans ? " translate" : "")} style={{width: window.screen.width, minHeight: '100%'}}>
      <header>
        <div className="billBoard" style={{backgroundSize: 'cover', backgroundPosition: 'center center', backgroundImage: `url(${this.state.spaces[this.state.selectedSpace].image[this.state.trans ? 1 : 0]})`}}>
          <div className="dimmer" style={{paddingTop: 12, paddingBottom: 8}}>
            <div className={'weather f ' + (this.state.trans ? 'fa' : '')} style={{direction: this.state.trans ? 'rtl' : 'ltr', marginTop: 10, textAlign: this.state.trans ? 'inherit' : 'center'}}>
              <div>
                <strong>{this.state.trans ? this.state.weather.in.farsify() : this.state.weather.in}°<sup>C</sup></strong>
                <p>{'Indoor Temp'.translate()}</p>
              </div>
              <div>
                <strong>{this.state.trans ? this.state.weather.humidity.farsify() : this.state.weather.humidity}%</strong>
                <p>{'Outdoor Humidity'.translate()}</p>
              </div>
              <div>
                <strong>{this.state.trans ? this.state.weather.out.farsify() : this.state.weather.out}°</strong>
                <p>{'Outdoor Temp'.translate()}</p>
              </div>
            </div>
            <span className="ripple back" style={{position: 'absolute', left: 32 - 20, top: 32 - 10, borderRadius: 32, paddingTop: 10, paddingLeft: 9, paddingRight: 9}} onClick={(e) => {
              e.stopPropagation();
              this.setState({space: null}, () => {
                // window.history.pushState({"pageTitle": 'home'},"Home", '/homes/' + this.state.name + '/' + this.state.selectedSpace);
              });
            }}>
              <svg enableBackground="new 0 0 64 64" width="32" height="32" viewBox="0 0 64 64"><path style={{fill: 'white'}} d="m54 30h-39.899l15.278-14.552c.8-.762.831-2.028.069-2.828-.761-.799-2.027-.831-2.828-.069l-17.448 16.62c-.755.756-1.172 1.76-1.172 2.829 0 1.068.417 2.073 1.207 2.862l17.414 16.586c.387.369.883.552 1.379.552.528 0 1.056-.208 1.449-.621.762-.8.731-2.065-.069-2.827l-15.342-14.552h39.962c1.104 0 2-.896 2-2s-.896-2-2-2z"/></svg>
            </span>
          </div>
        </div>
      </header>
      <section>
        <div className="switch" style={{ marginTop: '.8em', textAlign: 'center'}}>
          <div style={{marginLeft: '4em', marginRight: '4em', borderTop: '1px #cbcbdf solid', marginTop: '1.5em', marginBottom: '-.8em'}}/>
          <span style={{fontFamily: 'iran-cell-bold', fontSize: '.8em', backgroundColor: this.state.dark ? '#6a6e71' : '#F6F8FA', color: this.state.dark ? '#e5e6ec' : '#343747', marginTop: '.3em', paddingLeft: '10px', paddingRight: '10px'}}>
            <span style={{fontFamily: 'iran-cell'}}>
              {this.state.spaces[this.state.selectedSpace].name.translate()}
              {' > '}
            </span>
            {this.state.extraTitle.translate()}
          </span>
          { 'functions' in this.state.space ? this.state.space.functions.map((name, idx) => (
            <div className="mid" style={{marginTop: '.2em'}}>
              <span style={{float: this.state.trans ? 'right' : 'left'}}>{name.translate()}</span>
              <label className="rocker rocker-small" style={{float: this.state.trans ? 'left' : 'right'}}>
                <input type="checkbox" defaultChecked={this.state.checked} onChange={(e) => {
//                  let url = '/' + this.state.spaces[this.state.selectedSpace].name.toLowerCase() + '/' + this.state.extraTitle.toLowerCase() + '/' + name.toLowerCase() + '/' + e.target.checked
//                  this.client.send(url);
                  this.setState({checked: !this.state.checked});
                }}/>
                <span className="switch-left">{'Yes'.translate()}</span>
                <span className="switch-right">{'No'.translate()}</span>
              </label>
            </div>
          )) : null }
        </div>
        { 'gradi' in this.state.space ? (
          <div className="thermostat">
            <div className="bar">
              <div className="inner_bar"></div>
              <div className='hold left'>
                <div className='fill fill1' style={this.state.space.fill1}></div>
              </div>
              <div className='hold right'>
                <div className='fill fill2' style={this.state.space.fill2}></div>
              </div>
              <span>{this.state.trans ? 'Temperature'.translate() : 'Temperature'}</span>
            </div>
            <div className="shadow" style={{transform: "translate(-50%, -50%) rotate("+ (-180 + this.state.space.gradi * 10)+"deg)", ...this.state.space.shadow}}>
              <div className="shadow-cube"></div>
            </div>
            <div className="number" style={{transform: "translate(-50%, -50%) rotate("+ (-180 + this.state.space.gradi * 10)+"deg)"}}>
              <span className="ext">{this.state.trans ? this.state.space.gradi.farsify() : this.state.space.gradi}</span>
            </div>
            <div className="center">
              <span className="arrow minus"><i className="material-icons" onClick={(e) => {
                e.stopPropagation();
                let space = this.state.space;
                if (space.gradi > this.state.space.min){
                  space.gradi --;
                  space.fill1 = {animation: 'none'};
                  space.fill2 = {animation: 'none'};
                  space.shadow = {animation: 'none'};
                  this.setState({space});
                  if (space.gradi > 17) {
                    space.fill1["transform"] = "rotate("+ (space.gradi - 18) * 10 +"deg)";
                    space.fill1["transitionDelay"] = "0s";
                  } else if(space.gradi === 17) {
                    space.fill2["transform"] = "rotate("+ space.gradi * 10 +"deg)";
                    space.fill2["transformDelay"] = "0.5s";
                  } else {
                    space.fill2["transform"] = "rotate("+ space.gradi * 10 +"deg)"
                    space.fill2["transformDelay"] = "0s";
                  }
                  this.setState({space});
                }
              }}>keyboard_arrow_left</i></span>
              <span className="arrow plus"><i className="material-icons" onClick={(e) => {
                e.stopPropagation();
                let space = this.state.space;
                if (space.gradi < this.state.space.max){
                  space.gradi ++;
                  space.fill1 = {animation: 'none'};
                  space.fill2 = {animation: 'none'};
                  space.shadow = {animation: 'none'};
                  this.setState({space});
                  if (space.gradi > 19) {
                    space.fill1["transform"] = "rotate("+ (space.gradi - 18) * 10 +"deg)";
                    space.fill1["transitionDelay"] = "0s";
                  } else if (space.gradi === 19) {
                    space.fill1["transform"] = "rotate("+ (space.gradi - 18) * 10 +"deg)";
                    space.fill1["transitionDelay"] = "1s";
                  } else {
                    space.fill2["transform"] = "rotate("+ space.gradi * 10 +"deg)";
                    space.fill2["transitionDelay"] = "0s";
                  } this.setState({space});
                }
              }}>keyboard_arrow_right</i></span>
              <div className="small">
                <span className="heat">{this.state.trans ? this.state.space.gradi.farsify() : this.state.space.gradi}</span>
              </div>
            </div>
          </div>
        ) : null }
      </section>
    </div> : <div class={"dashboard" + (this.state.dark ? " dark" : "") + (this.state.trans ? " translate" : "")} style={{width: window.screen.width, minHeight: '100%'}}>
      <header>
        <div className="billBoard" style={{backgroundSize: 'cover', backgroundPosition: 'center center', backgroundImage: `url(${this.state.spaces[this.state.selectedSpace].image[this.state.trans ? 1 : 0]})`}}>
          <div className="dimmer" style={{minHeight: 290}}>
            <div className="settings" style={this.state.trans ? {left: 64} : {right: 0}}>
              <svg className="touchable" style={{width: 32, height: 32, position: 'absolute', right: 18, top: -25, transform: this.state.setting ? 'rotate(22.5deg)' : 'rotate(0deg)'}} width="110" height="110" fill="white" onClick={() => {setCookie('setting', String(!this.state.setting)); this.setState({setting: !this.state.setting})}}><g transform="scale(0.29)"><g transform="translate(-559.28571,-488.79075)"><g transform="translate(491.78471,169.30575)">
                <path d="M 176.984,366.951 L 167.54,363.794 C 166.386,358.918 164.47,354.338 161.911,350.194 L 166.353,341.29 C 163.304,337.269 159.715,333.681 155.695,330.633 L 146.79,335.075 C 142.647,332.515 138.067,330.597 133.192,329.444 
                L 130.035,320.001 C 127.571,319.664 125.057,319.485 122.5,319.485 C 119.943,319.485 117.43,319.664 114.965,320.001 L 111.808,329.444 C 106.933,330.597 102.353,332.515 98.209,335.075 L 89.305,330.633 
                C 85.284,333.681 81.696,337.269 78.649,341.29 L 83.091,350.194 C 80.531,354.338 78.613,358.918 77.461,363.794 L 68.017,366.951 C 67.68,369.414 67.501,371.929 67.501,374.485 C 67.501,377.041 67.679,379.556 68.017,382.019 
                L 77.461,385.176 C 78.614,390.052 80.531,394.632 83.09,398.776 L 78.65,407.68 C 81.697,411.701 85.285,415.289 89.306,418.337 L 98.21,413.895 C 102.354,416.455 106.934,418.373 111.809,419.526 L 114.966,428.968 
                C 117.43,429.306 119.944,429.485 122.501,429.485 C 125.058,429.485 127.571,429.306 130.036,428.968 L 133.193,419.526 C 138.068,418.373 142.648,416.455 146.791,413.896 L 155.696,418.337 C 159.716,415.289 163.305,411.701 166.352,407.68 
                L 161.912,398.776 C 164.471,394.632 166.387,390.052 167.541,385.176 L 176.985,382.019 C 177.322,379.556 177.501,377.041 177.501,374.485 C 177.501,371.929 177.322,369.414 176.984,366.951 z M 122.5,412.075 
                C 101.74,412.075 84.91,395.246 84.91,374.485 C 84.91,353.724 101.74,336.895 122.5,336.895 C 143.26,336.895 160.09,353.724 160.09,374.485 C 160.09,395.246 143.26,412.075 122.5,412.075 z"/></g></g></g></svg>
              <div style={{position: 'relative', top: 0, display: this.state.setting ? 'block' : 'none'}}>
                <input type="checkbox" name={'trans'} id={'trans'} {...(this.state.trans ? {checked: 'true'} : {})} onChange={(e) => {setCookie('translate', String(!this.state.trans)); this.setState({trans: !this.state.trans});}}/>
                <label htmlFor={'trans'}><small/><div style={{position: 'absolute', fontWeight: this.state.trans ? 700 : 500, top: 18, right: this.state.trans ? 0 : 60, color: 'white', fontSize: '1.08em'}}>{this.state.trans ? 'فا' : 'EN'}</div></label>
              </div>
              <div style={{position: 'relative', top: 36, display: this.state.setting ? 'block' : 'none'}}>
                <input type="checkbox" name="dark" id="dark" {...(this.state.dark ? {checked: 'true'} : {})} onChange={(e) => {setCookie('dark', String(!this.state.dark)); this.setState({dark: !this.state.dark});}}/>
                <label htmlFor={'dark'}><small/><div style={{position: 'absolute', fontWeight: this.state.trans ? 700 : 500, top: 18, right: this.state.trans ? (this.state.dark ? -18 : -30) : 60, color: 'white', fontSize: '1.08em'}}>{this.state.dark ? 'dark'.translate() : 'light'.translate()}</div></label>
              </div>
            </div>
            {this.state.selectedSpace === 0 ? null : <>
              <div className="f fe" style={{direction: this.state.trans ? 'rtl' : 'ltr'}}>
                <div className="heading">
                  <h5 className="date">{this.state.trans ? faNow[2].farsify() : now[2]} {this.state.trans ? jDate.jaMonths[faNow[1] - 1] : jDate.grMonths[now[1]]} {this.state.trans ? faNow[0].farsify() : now[0]}</h5>
                  <h2 className="title">{this.state.weather.condition.translate()}</h2>
                </div>
                <div className="icon icon-w" style={{marginTop: 20, marginRight: this.state.trans ? '27px' : '30px', marginLeft: this.state.trans ? '30px' : '27px'}}></div>
              </div>
              <div className={'weather f ' + (this.state.trans ? 'fa' : '')} style={{direction: this.state.trans ? 'rtl' : 'ltr'}}>
                <div>
                  <strong>{this.state.trans ? this.state.weather.in.farsify() : this.state.weather.in}°<sup>C</sup></strong>
                  <p>{'Indoor Temp'.translate()}</p>
                </div>
                <div>
                  <strong>{this.state.trans ? this.state.weather.humidity.farsify() : this.state.weather.humidity}%</strong>
                  <p>{'Outdoor Humidity'.translate()}</p>
                </div>
                <div>
                  <strong>{this.state.trans ? this.state.weather.out.farsify() : this.state.weather.out}°</strong>
                  <p>{'Outdoor Temp'.translate()}</p>
                </div>
              </div>
            </>}
          </div>
        </div>
      </header>
      <section>
        <div className={"category scroll " + (this.state.trans ? 'fa' : '')} style={{direction: this.state.trans ? 'rtl' : 'ltr', overflowX: 'auto'}}>
          <ul>
            {this.state.spaces.map((space, idx) => (
              <li key={idx} onClick={(e) => this.setState({selectedSpace: idx})}>
                <a className={idx === this.state.selectedSpace ? "active" : ""}>{space.name.translate()}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="appliances" style={{direction: this.state.trans ? 'rtl' : 'ltr'}}>
          {this.state.spaces[this.state.selectedSpace].appliances.map((appliance, idx) => (
            <div key={this.state.selectedSpace + '/' + idx} className="appliance">
              {!appliance.loaded && (<div style={{position: 'absolute', width: 32, height: 32, border: appliance.selected ? 'solid 5px #F8F8F8' : 'solid 5px #343747BB', borderRadius: '50%', borderTop: appliance.selected ? 'solid 5px #F8F8F840' : 'solid 5px aliceblue', right: 'calc(50% - 19px)', top: 'calc(50% - 26px)', zIndex: 1, boxShadow: '0 0 2px 2px #34374700', animation: 'spin 1.5s linear infinite'}}></div>)}
              <input type="checkbox" name={appliance.name} id={appliance.name} {...(appliance.selected ? {checked: 'true'} : {})} onChange={(e) => {
                let spaces = this.state.spaces;
                spaces[this.state.selectedSpace].appliances[idx].selected = 'selected' in appliance ? !appliance.selected : true;
                this.setState({spaces});
                e.stopPropagation();
              }}/>
              <label htmlFor={appliance.name} style={{opacity: appliance.loaded ? 1 : .6}}>
                {'image' in appliance ? <>
                  <div style={{textAlign: 'center', marginTop: -9, marginBottom: -2}}><div style={{backgroundImage: `url(${appliance.image})`, height: 96, width: 64, backgroundSize: this.state.selectedSpace == 2 ? '500%' : '320%', display: 'inline-block', backgroundPosition: `${-appliance.imagePosition[0] * (this.state.selectedSpace == 2 ? 64 : 62) - (this.state.selectedSpace == 2 || appliance.title == 'Mocha' ? 0 : 8)}px ${-appliance.imagePosition[1] * (this.state.selectedSpace == 2 ? 96 : 92) - (this.state.selectedSpace == 2 ? 0 : 4)}px`}}></div></div>
                  <strong style={{direction: this.state.trans ? 'rtl' : 'ltr', marginBottom: -12, marginTop: -1}}>
                    <span>{appliance.title.translate()}</span>
                  </strong>
                </> : <>
                  {'extra' in appliance ? (
                    <div className="plus ripple" style={{padding: 5, lineHeight: 0, position: 'absolute', top: 121, left: this.state.trans ? 12 : 'inherit', right: this.state.trans ? 'inherit' : 12, zIndex: 10, borderRadius: 32, alignItems: 'center', textAlign: 'center'}} onClick={(e) => { e.stopPropagation();
                      this.setState({space: appliance.extra, extraTitle: appliance.title}, () => {
                        // window.history.pushState({"pageTitle": 'the space'},"the Space", '/homes/' + this.state.name + '/' + this.state.selectedSpace + '/' + appliance.name);
                      });
                    }}>
                      <svg width="16" height="16" fill={appliance.selected ? '#f9f9f9' : (this.state.dark ? "#e5e6ec" : "#343747")} viewBox="0 0 24 24">
                        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                      </svg>
                    </div>
                  ) : null}
                  <i className={appliance.classes}></i>
                  {appliance.title == 'OutDoor' && <i className="f" style={{marginRight: this.state.trans ? 18 : 0, marginLeft: this.state.trans ? 0 : 18, backgroundPosition: '0 2px, 10px -1px'}}></i>}
                  <span className="category">{this.state.spaces[this.state.selectedSpace].name.translate()}</span>
                  <strong style={{direction: this.state.trans ? 'rtl' : 'ltr'}}>
                    <span>{appliance.title.translate()}</span>
                  </strong>
                  <span style={{direction: this.state.trans ? 'rtl' : 'ltr'}} className="state" data-o={(appliance.opening ? "open" : "on").translate()} data-c={(appliance.opening ? "close" : "off").translate()}></span>
                  <small style={this.state.trans ? {left: 20, right: 'inherit'} : {}}></small>
                </> }
              </label>
            </div>
          ))}
          <div className="m-player" style={{ marginBottom: '1em' }}>
            <h2 style={{ direction: 'rtl' }}>{'Shared Devices'.translate()}</h2>
            {this.state.device && <div class={"player" + (this.state.device.selected ? ' selected' : '')}>
              <div className="disc"></div>
              <div className="artist" onClick={(e) => {e.stopPropagation(); this.state.device.selected = !this.state.device.selected; this.setState({device: this.state.device}, () => {window.scrollTo(0, document.body.scrollHeight);})}}>
                <p>{this.state.device.name}</p>
                <small>{this.state.device.type}</small>
              </div>
              <div className="controls">
                <input type="checkbox" name="a" id="p"/>
                <label htmlFor="p">
                  <div className="control"></div>
                </label>
              </div>
            </div>}
            {!this.state.device.selected && this.state.devices.map((device, idx) => (
              <div className="player" style={{background: this.state.dark ? '#515258' : '#fff', marginTop: '.7em'}}>
                <div className="artist">
                  <p style={{color: this.state.dark ? '#e5e6ec' : '#343747'}}>{device.name}</p>
                </div>
                <div className="controls">
                  <input type="checkbox" name="a" id="ppp"/>
                  <label className="touchable" htmlFor="ppp" style={{display: 'inline-block', width: 26, textAlign: 'center'}} onClick={() => {let d = this.state.device; this.state.device = device; this.state.device.selected = true; this.state.devices[idx] = d; this.setState({device: this.state.device, devices: this.state.devices})}}>
                    <svg width="16" height="16" fill={this.state.dark ? "#e5e6ec" : "#343747"} style={{position: 'relative', top: 5}} viewBox="0 0 24 24">
                      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/>
                    </svg>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>;
  }
}