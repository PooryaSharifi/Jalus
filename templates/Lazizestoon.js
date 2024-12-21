/** #title لذیذستون #title **/
/** #links  #links **/
/** #elements <div id="app"></div> #elements **/

class Dialog extends React.Component {}
class Map extends React.Component {}
const screenWidth = Math.round(window.innerWidth), screenHeight = Math.round(window.innerHeight), host = '/laziz';
class App extends React.Component {
  // Images = {
  //   "./assets/img/categories/chicken.jpg": require("./assets/img/categories/chicken.jpg"),
  //   "./assets/img/categories/fish.jpg": require("./assets/img/categories/fish.jpg"),
  //   "./assets/img/categories/lamb.jpg" : require("./assets/img/categories/lamb.jpg"),
  //   "./assets/img/categories/cold-cuts.jpg" : require("./assets/img/categories/cold-cuts.jpg"),
  //   "./assets/img/categories/eggs.jpg" : require("./assets/img/categories/eggs.jpg"),
  //   "./assets/img/categories/ready.jpg" : require("./assets/img/categories/ready.jpg"),
  //   "./assets/img/categories/combo.jpg" : require("./assets/img/categories/combo.jpg"),
  //   "./assets/img/categories/exotic.jpg" : require("./assets/img/categories/exotic.jpg"),

  //   './assets/img/cdn/offer.jpg': require('./assets/img/cdn/offer.jpg'),
  //   'shrimp': require('./assets/img/shrimp.png'),
  //   'fish': require('./assets/img/fish.png'),
  //   'chicken': require('./assets/img/chicken.png'),
  //   'lamb': require('./assets/img/sheep.png'),
  //   './assets/img/flavors/chili-1.png': require('./assets/img/flavors/chili-1.png'),
  //   './assets/img/flavors/onion-0.png': require('./assets/img/flavors/onion-0.png'),
  //   './assets/img/flavors/shrimp-0.png': require('./assets/img/flavors/shrimp-0.png'),
  //   './assets/img/flavors/smoky-0.png': require('./assets/img/flavors/smoky-0.png'),
  //   './assets/img/flavors/balsamic-0.png': require('./assets/img/flavors/balsamic-0.png'),
  //   './assets/img/flavors/raw-0.png': require('./assets/img/flavors/raw-0.png'),
  //   './assets/img/flavors/phenomenal-0.png': require('./assets/img/flavors/phenomenal-0.png'),
  // };
  nonState = {
    username: null,
    password: null,
    newReview: {},
  }
  state = {
    user: {
      location: {latitude: 35.721896, longitude: 51.312004},
    },
    locationHeader: true,
    vendor: {latitude: 35.725470, longitude: 51.320938},
    biker: {
      location: {latitude: 35.724546, longitude: 51.312297},
      temperature: 4.3,
    },
    route: [{
        latitude: 35.721896, longitude: 51.312004
      }, {
        latitude: 35.722061, longitude: 51.312006
      }, {
        latitude: 35.722391, longitude: 51.310158
      }, {
        latitude: 35.724838, longitude: 51.310857
      }, {
        latitude: 35.724546, longitude: 51.312297
      }, {
        latitude: 35.724112, longitude: 51.313310
      }, {
        latitude: 35.723188, longitude: 51.318570
      }, {
        latitude: 35.725757, longitude: 51.319799
      }, {
        latitude: 35.725470, longitude: 51.320938
      }
    ],
    locations: [],
    located: false,
    fontLoaded: false,
    web: null,  // 'https://www.google.com',
    bar: 'home',  // home, menu, cart, search, profile
    category: '',
    page: '',
    keyboard: false,
    authorized: false,
    profileEditing: false,
    categories: [{subject: '', image: ''}],
    reviewAdding: false,
    _product: {
      _id: '0123',
      subject: 'ماهی شوریده خلیج',
      image: './assets/img/cdn/fish.jpg',
      price: 5500,
      tags: [
        'تازه',
        'بدون‌تیغ',
        'امگا۳'
      ],
      description: 'ماهی شوریده خلیج فارس کشتار روز با سایز مناسب که به بهترین نحو و در دمای مناسب تحت نظارت لذیذستون به تهران رسیده و برای شما فراهم‌آوری شده‌است',
      reviews: [
        {
          _date: '۱۳ام تیرماه، ۷:۳۲',
          user: {
            image: 'static/img/avatar.jpg',
            username: 'پوریا'
          },
          body: {
            score: 4.5,
            text: 'چه‌قد عالی بود کیفیت این گوشت اما یکمی پیک دیر اومد'
          }
        }, {
          _date: '۱۳ام تیرماه، ۷:۳۲',
          user: {
            image: 'static/img/avatar.jpg',
            username: 'پوریا'
          },
          body: {
            score: 3,
            text: ' توکه می که نیستی غم آشتی جای بوسه که نداره عشق من توی دلم که میره جا نمیذاره برای من خواستی ..'
          }
        }
      ],
      quantity: 0,
      quantifying: false,
      flavoring: true,
      flavors: {
        'raw': {
          'title': 'خام',
          'image': './assets/img/flavors/raw-0.png',
          'del': ['raw', 'chili'],
        },
      }
    },
    product: null,
    products: [],
    home: null,
    orderShown: true,
    order: {
      payed: false,
      products: []
    },
    dialog: {
      shown: false,
      title: 'haa ha ha',
      description: 'ha ha hhaaaa',
      placeholder: 'uew'
    },
    q: 2,
  }

  constructor(props) {
    super(props);
    // this.locationLength = new Animated.Value(40);
    this.render = this.render.bind(this);
    this.farsify = this.farsify.bind(this);
    this.card = this.card.bind(this);
    this.carousel = this.carousel.bind(this);
    this.locationHeader = this.locationHeader.bind(this);
    this.login = this.login.bind(this);
//    this.state.product = this.state._product;
//    this.state.order.products.push(this.state._product);
    this.renderPoint = this.renderPoint.bind(this);
  }

  async componentDidMount () {
    let response = await fetch(host, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    });
    response = await response.json();
    // response.categories.map((category) => category.image = category.image.includes('./assets/') ? this.Images[category.image] : {uri: host + category.image});
    // response.home.offer.source = this.Images[response.home.offer.source];
    // Object.values(response.flavors).map((flavor) => flavor.image = flavor.image.includes('./assets/') ? this.Images[flavor.image] : {uri: host + flavor.image});
    this.setState({home: response.home, categories: response.categories, flavors: response.flavors, adp: response.adp, fontLoaded: true});
    this.nonState.username = cookie('username');
    this.nonState.password = cookie('password');
    if (this.nonState.username && this.nonState.password)
      this.login();
    console.log(this.state.fontLoaded);
  }

  farsify (num) {
    let table = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    num = '' + num;
    // return num.split('').map((ch) => table[parseInt(ch)]).join('');
    return num.split('').map((ch) => ch >= '0' && ch <= '9' ? table[parseInt(ch)] : ch).join('');
  }

  locationHeader (e) {
    if (e.nativeEvent.contentOffset.y == 0 && e.nativeEvent.velocity.y == 0) {
      if (this.locationLength._value != 40)
        this.setState({'locationHeader': true}, () => {
          window.animate(window.locationLength, 'height', 40, .2);
        })
    } else {
      if (this.locationLength._value != 0)
        window.animate(window.locationLength, 'height', 0, .2);
        this.setState({'locationHeader': false})
    }
  }

  login = async () => {
    this.setState({keyboard: false});
    let data = new FormData();
    data.append('username', this.nonState.username);
    data.append('password', this.nonState.password);
    let response = await fetch(host + 'login', {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
      body: data,
    });
    response = await response.json();
    if (response.success) {
      setCookie('username', this.nonState.username);
      setCookie('password', this.nonState.password);
      let state = { bar: 'home', /* locationHeader: false, */ authorized: true, user: response.user };
      let order = cookie('order');
      if (order) state.order = JSON.parse(order);
      this.setState(state);
    } else {

    }
  };

  card (product, bold, idx) {
    let extra = bold ? 10 : 0;
    bold = (bold ? 5 : 4);
    return (
      <div className="touchable" key={product.subject + '_' + idx} style={{borderRadius: 3, backgroundColor: 'white', borderColor: '#343747', width: screenWidth * bold / 5 - extra, height: screenWidth * bold / 5 - extra, marginLeft: 5, marginRight: 5, marginTop: extra / 1.3, marginBottom: extra / 1.3,
      shadowColor: "#fff", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84,  elevation: 5,}}
        onPress={async () => {
          let response = await fetch(host + 'delicious/' + product._id + '/-', {headers: { Accept: 'application/json' }});
          response = await response.json();
          response.flavors['raw'] = this.state.flavors['raw'];
          this.setState({product: response, locationHeader: false, bar: 'product'});
          window.animate(window.locationLength, 'height', 0, .1);
        }}
      >
        <image style={{width: screenWidth * bold / 5 - extra, height: screenWidth * (bold - 1) / 5 - extra / 1.3, marginLeft: 0, marginTop: -.5}} source={{uri: host + product.image}}/>
        <div style={{ paddingLeft: 3, paddingRight: 3, justifyContent: 'space-between', height: screenWidth / 5 }}>
          <p style={{ color: '#373747', fontFamily: 'iran-sans', fontSize: 15 }}>{product.subject}</p>
          <div style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 9, marginBottom: 5 }}>
            <p style={{ fontFamily: 'iran-sans', color: '#DE3136', marginTop: 5 }}>قیمت:‌ {this.farsify((product.price / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}<p style={{ fontFamily: 'iran-sans-bold', fontSize: 11 }}> تومان</p></p>
            <div className="touchable" style={{ backgroundColor: '#DE3136', paddingLeft: 8, paddingRight: 8, padding: 3, borderRadius: 5 }}
              onPress={async () => {
                let order = this.state.order;
                product.quantity = 1;
                order.products.push(product);
                this.setState({order});
                if (!this.state.authorized) this.setState({product: null, bar: 'login'});
                else setCookie('order', JSON.stringify(order));
              }}>
              <p style={{ fontFamily: 'iran-sans', color: 'white' }}>اضافه‌به سبدخرید</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  carousel (products, subject, description) {
    return (
      <div>
        <div>
          <p style={{ fontFamily: 'iran-sans-bold', fontSize: 16, color: '#373747' }}>{subject}</p>
        </div>
        <div>
          <p style={{ fontFamily: 'iran-sans', fontSize: 12, color: '#676777', marginTop: -6 }}>{description}</p>
        </div>
        <div class="scrollview" style={{ }}
          ref={ref => this['carousel_' + subject] = ref} onContentSizeChange={(width, height) => this['carousel_' + subject].scrollTo({x: width})}>
          {this['carousel_' + subject] ? products.map((product, idx) => this.card(product, false)) : products.reverse().map((product, idx) => this.card(product, false))}
        </div>
      </div>
    );
  }

  renderPoint ({item, index}) {
    return (
      <div className="touchable" style={{flex: 1, flexDirection: 'row', paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2}} onPress={() => {
        if (Object.keys(item.flavors).length == 0) item.flavors['raw'] = this.state.flavors['raw'];
        item.flavoring = false;
        this.setState({bar: 'product', product: item, locationHeader: false});
        window.animate(window.locationLength, 'height', 0, .1);
      }}>
        <div style={{ borderRadius: 6, backgroundColor: item.status ? '#fbfafa' : '#FFF', flex: 1, flexDirection: 'row'}}>
          <div style={{padding: 5}}>
            {'image' in item ? (
              <image style={{ width: 64, height: 64, borderRadius: 64, }} source={{ uri: host + item.image }}/>
            ) : (
              <div style={{borderRadius: 500, backgroundColor: '#fee', minWidth: 64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
                <p style={{ color: 'white', fontSize: 24, fontFamily: 'iran-sans-bold' }}>{ item.name ? item.name.split(' ').map(name => (name[0])).join('‌') : 'ن' }</p>
              </div>
            )}
          </div>
          <div style={{flex: 1, borderBottomWidth: .5, borderColor: this.state.order.products.length - 1 == index ? '#fff' : '#E6E7Ea', justifyContent: 'flex-start'}}>
            <div style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <p style={{ color: '#222', fontSize: 15, fontFamily: 'iran-sans', marginLeft: 3}}>{ item.subject }</p>
              <p style={{ color: '#ccc', fontSize: 12, marginTop: 1, marginRight: 2 }}> 15/09 </p>
            </div>
            <div style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <p style={{ color: '#ccc', marginLeft: 4 }}>{ item.phone }</p>
              <div className="touchable" style={{ backgroundColor: '#fafafa', borderRadius: 48, paddingLeft: 5, paddingRight: 5, alignSelf: 'flex-end', marginRight: 5, marginBottom: .5,
                shadowColor: "#f7f7f7", shadowOffset: {width: 0, height: .5 }, shadowOpacity: 0.05, shadowRadius: 1.84, elevation: .5, }}
                  onPress={() => {
                    if (Object.keys(item.flavors).length == 0) item.flavors['raw'] = this.state.flavors['raw'];
                    item.flavoring = true;
                    item.quantifying = true;
                    this.setState({bar: 'product', product: item, locationHeader: false});
                    window.animate(window.locationLength, 'height', 0, .1);
                  }}>
                <p style={{ color: '#DE3136', fontFamily: 'iran-sans', fontSize: 12, marginTop: -2, marginBottom: -3 }}>{ 'تغییرات' }</p>
              </div>
              <div className="touchable" style={{ backgroundColor: '#f9f9f9', height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16, alignSelf: 'flex-end', marginRight: 4,
                shadowColor: "#f7f7f7", shadowOffset: {width: 0, height: .5 }, shadowOpacity: 0.05, shadowRadius: 1.84, elevation: .5, }}
                  onPress={() => {
                    let order = this.state.order;
                    order.products = order.products.slice(index, -1);
                    if (order.products.length == 0) this.state.orderShown = false;
                    // order.products[index].quantity = Math.max(0, order.products[index].quantity - 1);
                    this.setState({order});
                  }}>
                <image style={{ height: 10, width: 10 }} source={'./assets/img/close-red.png'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render () {
    return !this.state.fontLoaded ? (
      <div style={{ flex: 1, justifyContent: 'center' }}>
        {/* <ActivityIndicator/> */}
      </div>
    ) : this.state.web ? (
      <WebView source={{ uri: this.state.web }} javaScriptEnabled = {true} onNavigationStateChange={async (webviewState) => {
        if (webviewState.url.includes('payed')) {
          let order = this.state.order;
          order.payed = true;
          this.setState({web: null, order: order});
          setCookie('order', JSON.stringify(order));
        }
      }} />
    ) : (
      <div style={{flex: 1, backgroundColor: '#f7f7f7'}}>
        {/* <StatusBar barStyle="dark-content" hidden={this.state.product || this.state.bar == 'map' || this.state.bar == 'location' ? true : false} backgroundColor='white' translucent={false} networkActivityIndicatorVisible={true}/> */}
        <div style={{ backgroundColor: '#373747', paddingTop: 0 /*StatusBar.currentHeight*/, borderBottomWidth: .5, borderBottomColor: '#E6E7Ea'}}>
          <div style={{ zIndex: -1, width: screenWidth, height: this.locationLength, backgroundColor: 'white', justifyContent: 'center' }}>
            { this.state.locationHeader ? (
              <div className="touchable" style={{ width: screenWidth, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                  this.setState({bar: 'location', locationHeader: false});
                  window.animate(window.locationLength, 'height', 0, .1);
                }}>
                  <p style={{ fontFamily: 'iran-sans-light', color: '#373747', fontSize: 13, marginTop: 2, marginBottom: -2 }}>، {'اصفهان'}</p>
                  <p style={{ fontFamily: 'iran-sans-bold', color: '#373747', fontSize: 16, marginTop: 2, marginBottom: -2 }}>{this.state.authorized ? this.state.user.address : this.state.locatedLocation}</p>
                  <image style={{ width: 18, height: 18, marginTop: -2, marginBottom: 2, marginLeft: 2,  }} source={'./assets/img/marker.png'}/>
                </div>
            ) : null }
          </div>
          {['menu', 'map', 'location', 'login', 'profile', 'page', 'product'].indexOf(this.state.bar) == -1 ? (
            <div class="scrollview" style={{padding: 13, paddingLeft: 3}}>
              {this.state.categories.map((category, idx) => (
                <div className="touchable" style={{ backgroundColor: category.subject == this.state.category ? '#eee' : '#373747', borderColor: 'white', borderRightWidth: .5, padding: -12, paddingRight: 11, paddingLeft: 6, marginLeft: 4, marginRight: 3, borderRadius: this.state.category == category.subject ? 6 : 0 }} key={'categories_' + idx}
                  onPress={async () => {
                    let response = await fetch(host + 'delicious/search/' + category.subject, {
                      method: 'POST',
                      credentials: 'include',
                      headers: { Accept: 'application/json' },
                    });
                    response = await response.json();
                    this.setState({ bar: 'category', category: category.subject, products: response });
                  }}>
                  <p style={{color: category.subject == this.state.category ? '#373747' : 'white', fontFamily: 'iran-sans-bold'}}>{category.subject}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {/* ---- 1 ---- */}
        <div style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
          {
            this.state.bar == 'login' ? (
              <div style={{ flex: this.state.keyboard ? 1 : 1, backgroundColor: 'white', justifyContent: this.state.keyboard ? 'center' : 'center', alignItems: 'center' }}>
                {
                  this.state.keyboard ? null : (
                    <image style={{ }} source={'./assets/img/login.png'}/>
                  )
                }
                <p style={{ fontFamily: 'iran-sans-bold', color: '#DE3136' }}>ورود‌به دنیای تازه‌های خوشمزه</p>
                <input style={{ fontFamily: 'iran-sans', width: screenWidth / 2, textAlign: 'center', backgroundColor: '#FCFCFC', borderRadius: 7, padding: 3, marginTop: 20, }} placeholder="نام‌کاربری"
                  onFocus={() => {this.setState({keyboard: true})}}
                  onBlur={() => {this.setState({keyboard: false})}}
                  onChangep={text => {this.nonState.username = text}}
                />
                <input style={{ fontFamily: 'iran-sans', width: screenWidth / 2, textAlign: 'center', backgroundColor: '#FCFCFC', borderRadius: 7, padding: 3, marginTop: 10 }} placeholder="رمز‌عبور"
                  onFocus={() => {this.setState({keyboard: true})}}
                  onBlur={() => {this.setState({keyboard: false})}}
                  onChangep={text => {this.nonState.password = text}}
                />
                <div className="touchable" onPress={this.login}>
                  <p style={{ width: screenWidth / 2, fontSize: 15, borderRadius: 12, paddingTop: 7, paddingBottom: 6, margin: 10, textAlign: 'center', fontFamily: 'iran-sans-bold', borderColor: '#DE3136', borderWidth: .5, color: '#DE3136', backgroundColor: 'white'}}>ورود، ثبت‌نام</p>
                </div>
              </div>
            ) : this.state.product ? (
              <div style={{ marginTop: -50 }} ref={ref => this.productScroll = ref}
                onContentSizeChange={(width, height) => {if (!('initiated' in this.state.product)) this.productScroll.scrollTo({y: 0}); this.state.product.initiated = true;}}
              >
                <image source={{ uri: host + this.state.product.image }} style={{ width: screenWidth, height: screenWidth * 9 / 16 }}/>
                {this.state.product.offer ? (
                  <div>
                    <p>15% Off</p>
                  </div>
                ) : null}
                <div style={{ width: screenWidth, backgroundColor: 'white', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'iran-sans-bold', fontSize: 16, color: '#373747' }}>{ this.state.product.subject }</p>
                  <p style={{ fontFamily: 'iran-sans-light', fontSize: 13, color: '#575767' }}>{ this.state.product.tags.join(' | ') }</p>
                  <div style={{ width: screenWidth - 10, margin: 5, borderRadius: 7, borderColor: '#9797a7', borderWidth: .5, borderBottomRightRadius: 22, borderBottomLeftRadius: 22 }}>
                    <div style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 14 }}>
                      <div style={{ flexDirection: 'row', flex: 1 }}>
                        <image style={{ width: 20, height: 20 }} source={this.Images[this.state.product.tags.find(tag => tag in this.Images)]}/>
                        <div>
                          {['۲-۳', '۳-۵', '۵-۸', '۸-۱۴', '۱۴-۲۲'].map((range, idx) => (this.state.product.quantifying || idx == this.state.product.quantity ?
                            <p key={idx} style={{ fontFamily: 'iran-sans', fontSize: 11, color: idx == this.state.product.quantity && this.state.product.quantifying ? 'white' : '#373747', marginTop: 1, marginLeft: 8, backgroundColor: idx == this.state.product.quantity && this.state.product.quantifying ? '#DE3136' : 'white', borderRadius: 4, paddingRight: 4 }}
                              onPress={() => {
                                let product = this.state.product;
                                product.quantity = idx;
                                product.quantifying = false;
                                this.setState({product});
                              }}>{range} تکه</p> : null
                          ))}
                        </div>
                      </div>
                      <div style={{ flexDirection: 'row', flex: 1 }}>
                        <image style={{ width: 20, height: 20 }} source={'./assets/img/weight.png'}/>
                        <div>
                          {[200, 450, 1100, 2650, 6400].map((netWeight, idx) => (this.state.product.quantifying || idx == this.state.product.quantity ?
                            <p key={idx} style={{ fontFamily: 'iran-sans', fontSize: 11, color: idx == this.state.product.quantity && this.state.product.quantifying ? 'white' : '#373747', marginTop: 1, marginLeft: 8, backgroundColor: idx == this.state.product.quantity && this.state.product.quantifying ? '#DE3136' : 'white', borderRadius: 6, paddingRight: 4 }}
                              onPress={() => {
                                let product = this.state.product;
                                product.quantity = idx;
                                product.quantifying = false;
                                this.setState({product});
                              }}>{this.farsify(netWeight)} گرم</p> : null
                          ))}
                        </div>
                      </div>
                      <div className="touchable" style={{ backgroundColor: '#f7f7f7', height: 24, width: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 16, marginRight: -5 }}
                        onPress={() => {
                          let product = this.state.product;
                          product.quantifying = !product.quantifying;
                          this.setState({ product })
                        }}>
                        <image style={{ height: 12, width: 12, transform: [{rotate: this.state.product.quantifying ? '180deg' : '0deg'}] }} source={'./assets/img/down-curved.png'}/>
                      </div>
                    </div>
                    <div style={{ width: screenWidth - 21, margin: 5, borderRadius: 18, borderColor: '#ececfc', borderWidth: .5, padding: 4, flexDirection: 'row', backgroundColor: '#fcfcfc', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', width: screenWidth - 54 }}>
                          {Object.values(this.state.product.flavors).map((flavor, idx) =>
                            <div key={idx} style={{ flexDirection: 'row', borderRadius: 100, backgroundColor: 'white', padding: 2, justifyContent: 'center', alignItems: 'center', marginRight: 4, marginBottom: 1 }}>
                              <image style={{ height: 26, width: 26, marginLeft: 2, marginTop: -3, marginBottom: -3 }} source={flavor.image}/>
                              <p style={{ fontFamily: 'iran-sans-light', color: '#676777', fontSize: 11, marginRight: 8, marginLeft: 1, marginTop: 1, marginBottom: -1 }}>{flavor.title}</p>
                              <div className="touchable" style={{ backgroundColor: '#f7f7f7', height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}
                                onPress={() => {
                                  let product = this.state.product;
                                  this.setState({product});
                                }}>
                                <image style={{ height: 10, width: 10 }} source={'./assets/img/close-red.png'}/>
                              </div>
                            </div>
                          )}
                        </div>
                        {this.state.product.flavoring && Object.keys(this.state.product.flavors).length != Object.keys(this.state.flavors).length ? (
                          <div style={{ flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', width: screenWidth - 54, marginTop: 7 }}>
                            {Object.keys(this.state.flavors).map((key, idx) => (key in this.state.product.flavors) ? null :
                              <div key={idx} style={{ flexGrow: 0, flexDirection: 'row', borderRadius: 100, backgroundColor: 'white', padding: 2, justifyContent: 'center', alignItems: 'center', marginRight: 4, marginBottom: 1 }}>
                                <image style={{ height: 26, width: 26, marginLeft: 2, marginTop: -3, marginBottom: -3 }} source={this.state.flavors[key].image}/>
                                <p style={{ fontFamily: 'iran-sans-light', color: '#676777', fontSize: 11, marginRight: 8, marginLeft: 1, marginTop: 1, marginBottom: -1 }}>{this.state.flavors[key].title}</p>
                                <div className="touchable" style={{ backgroundColor: '#DE3136', height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}
                                  onPress={() => {
                                    let product = this.state.product;
                                    this.state.flavors[key].del.map((conflict) => delete product.flavors[conflict]);
                                    product.flavors[key] = this.state.flavors[key];
                                    // product.flavoring = false;
                                    this.setState({product});
                                  }}>
                                  <image style={{ height: 10, width: 10 }} source={'./assets/img/plus-curved-white.png'}/>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="touchable" style={{ backgroundColor: '#f7f7f7', height: 24, width: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}
                        onPress={() => {
                          let product = this.state.product;
                          product.flavoring = !product.flavoring;
                          this.setState({product});
                        }}>
                        <image style={{ height: 12, width: 12, transform: [{rotate: this.state.product.flavoring ? '45deg' : '0deg'}] }} source={'./assets/img/plus.png'}/>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'iran-sans', fontSize: 12, color: '#575767', marginTop: 5 }}>موجوددر پیش‌سفارش</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: 3, paddingTop: 5 }}>
                  <p style={{ fontFamily: 'iran-sans', fontSize: 13, color: '#676777' }} >{ this.state.product.description }</p>
                </div>
                <div style={{ flexDirection: 'row' }}>
                  <div className="touchable" style={{ padding: 12, backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
                    <p style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747' }}>قیمت: {this.farsify((this.state.product.price * [200, 450, 1100, 2650, 6400][this.state.product.quantity] / 100000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} تومان</p>
                  </div>
                  <div className="touchable" style={{ padding: 12, backgroundColor: 'white', flex: 1, alignItems: 'center', backgroundColor: '#DE3136' }}
                    onPress={async () => {
                      let order = this.state.order;
                      order.products.push(this.state.product);
                      this.setState({order});
                      if (!this.state.authorized)
                        this.setState({bar: 'login', product: null});
                      else
                        await AsyncStorage.setItem('order', JSON.stringify(order));
                    }}>
                    <p style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: 'white' }}>افزودن‌به سبدخرید</p>
                  </div>
                </div>
                <image source={{uri: host + this.state.product.image}} blurRadius={ /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? 10 : 5 } style={{ width: screenWidth, height: screenWidth * 9 / 16 }}/>
                <div style={{ backgroundColor: 'white', margin: 7, padding: 9, borderRadius: 9, marginTop: -75 }}>
                  <p style={{ fontFamily: 'iran-sans-bold', fontSize: 15, color: '#373747', marginBottom: 5 }}>موارد ارسالی به‌شما</p>
                  <p style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>ظرف یک‌بارمصرف اورگانیک</p>
                  <p style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>محموله وکیوم دردمای زیر ۴درجه</p>
                  <p style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>تکه‌های گوشت آماده پخت</p>
                  <p style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>سس خوشمزه طبیعی</p>
                </div>
                <div style={{ marginTop: 8, borderRadius: 18, backgroundColor: 'white' }}>
                  {this.state.product.reviews.map((review, index) => (
                    <div key={'reviews_' + index} style={{ padding: 6, flexDirection:'column' }}>
                      <image style={{ width: 24, height: 24, borderRadius: 12, alignSelf: 'flex-end' }} source={{uri: host + review.user.image}}/>
                      <p style={{ fontFamily: 'iran-sans-light', color: '#373747', marginTop: -24 }}>       <p style={{color: '#DE313688', fontSize: 10}}> {review.user.username}: </p>{ review.body.text }</p>
                      <p style={{ fontFamily: 'iran-sans-light', color: '#676777', fontSize: 11, marginRight: 12 }}>{ review._date }</p>
                    </div>
                  ))}
                  {
                    this.state.reviewAdding ? (
                      <div style={{ padding: 6, flexDirection:'column' }}>
                        <image style={{ width: 24, height: 24, borderRadius: 12, alignSelf: 'flex-end' }} source={{uri: host + 'static/img/avatar.jpg'}}/>
                        <p style={{ fontFamily: 'iran-sans-light', color: '#DE313688', fontSize: 10, marginTop: -21, marginRight: 29, alignSelf: 'flex-end' }}>:{this.state.user.username}</p>
                        <input style={{ justifyContent: 'flex-start', fontFamily: 'iran-sans', flex: 1, textAlign: 'center', backgroundColor: '#FCFCFC', borderRadius: 7, padding: 3, marginTop: 10, }}
                          multiline={true} numberOfLines={4} value={this.state.text} onChangep={(text) => this.nonState.newReview.text = text} />
                        <div className="touchable" style={{ borderRadius: 40, backgroundColor: '#DE3136', alignSelf: 'flex-end', padding: 9, paddingTop: 0, paddingBottom: 1, marginTop: 6 }}
                          onPress={async () => {
                            let data = new FormData();
                            data.append('text', this.nonState.newReview.text);
                            let response = await fetch(host + 'delicious/' + this.state.product._id + '/review', {
                              method: 'POST',
                              credentials: 'include',
                              headers: { Accept: 'application/json' },
                              body: data,
                            });
                          }}>
                          <p style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13 }}>افزودن</p>
                        </div>
                      </div>
                    ) : this.state.product.reviews.length == 0 ? (
                      <p style={{ alignSelf: 'flex-end', fontFamily: 'iran-sans-light', color: '#575767', marginRight: 34, marginBottom: -24, marginTop: 6, fontSize: 13}}>اولین‌نفری باشید که راجع‌به {this.state.product.subject} نظر می‌دهید</p>
                    ) : null
                  }
                  <div className="touchable" style={{ width: 24, height: 24, marginRight: this.state.reviewAdding ? 70 : 6, marginTop: this.state.reviewAdding ? -31 : 0, marginBottom: 6, alignSelf: 'flex-end', backgroundColor: '#E0E0E0', borderRadius: 12, padding: 4 }}
                    onPress={() => {
                      if (this.state.authorized)
                        this.setState({reviewAdding: !this.state.reviewAdding});
                      else
                        this.setState({bar: 'login', product: null});
                    }}>
                    <image style={{ height: 16, width: 16, transform: [this.state.reviewAdding ? {rotate: '45deg'} : {rotate: '0deg'}]}} source={'./assets/img/add-1.png'}/>
                  </div>
                </div>
                <div style={{ backgroundColor: 'white', padding: 3, marginTop: 6 }}>
                  {this.carousel(this.state.home.carousels[0].products, this.state.home.carousels[0].subject)}
                </div>
                <div style={{ marginBottom: 30 }}></div>
              </div>
            ) : this.state.bar == 'home' ? (
              <div onMomentumScrollBegin={this.locationHeader}>
                <image style={{ width: screenWidth * 1.2, height: screenWidth / 2 + 80, marginLeft: -screenWidth * .085, marginTop: -80 }} source={this.state.home.offer.source} resizeMode={'cover'}/>
                <p style={{ fontFamily: 'hand-written', fontSize: 16, color: '#4A8469', marginTop: -60, marginBottom: 60 - 28, marginRight: 25, fontSize: 25 }}>{ this.state.home.offer.massage }</p>
                {this.carousel(this.state.home.carousels[0].products, this.state.home.carousels[0].subject)}
                <p style={{ fontFamily: 'iran-sans-bold', fontSize: 16, color: '#373747', marginTop: 16, }}>جست‌جو براساس طبقه‌بندی</p>
                <div style={{ flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row-reverse', padding: 3, marginTop: -1, marginBottom: 14 }}>
                  {this.state.categories.map((category, idx) => (
                    <div className="touchable" key={'categories_' + idx} style={{ backgroundColor: 'white', margin: 6, width: screenWidth / 3 - 14, alignItems: 'center', marginBottom: 2 }}
                      onPress={async () => {
                        let response = await fetch(host + 'delicious/search/' + category.subject, {
                          method: 'POST',
                          credentials: 'include',
                          headers: { Accept: 'application/json' },
                        });
                        response = await response.json();
                        this.setState({ bar: 'category', category: category.subject, products: response });
                      }}>
                      <image style={{ width: screenWidth / 3 - 14, height: screenWidth / 4.8 }} source={category.image}/>
                      <p style={{ fontFamily: 'iran-sans', color: '#373747' }}>{category.subject}</p>
                    </div>
                  ))}
                </div>
                <image source={'./assets/img/cdn/package.jpg'} blurRadius={ 0 } style={{ width: screenWidth, height: screenWidth * 9 / 16 }}/>
                <div style={{ backgroundColor: 'white', margin: screenWidth / 5, padding: 9, borderRadius: 9, marginTop: -screenWidth / 2 - 7}}>
                  <p style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}>همه بسته‌های لذیذستونی</p>
                  <div style={{flexDirection: 'row-reverse'}}>
                    <div style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 9, marginRight: 4, marginLeft: 6 }}></div>
                    <p style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}>دردمای زیر ۴درجه وکیوم می‌شن</p>
                  </div>
                  <div style={{flexDirection: 'row-reverse', marginTop: -1}}>
                    <div style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 9, marginRight: 4, marginLeft: 6  }}></div>
                    <p style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}>ازچندین مرحله کنترل‌کیفی عبور می‌کنن</p>
                  </div>
                  <div style={{flexDirection: 'row-reverse', marginTop: -1}}>
                    <div style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 9, marginRight: 4, marginLeft: 6  }}></div>
                    <p style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}> و بدون مواد نگهدارنده و افزودنی به‌دست شما می‌رسن</p>
                  </div>
                </div>
                {this.carousel(this.state.home.carousels[1].products, this.state.home.carousels[1].subject)}
                <div style={{ height: 20 }}/>
              </div>
            ) : this.state.bar == 'menu' ? (
              <div style={{ flex: 1, marginTop: 0, backgroundColor: '#fff' }}>
                <div className="touchable" style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
                  onPress={() => {this.setState({bar: 'home'})}}>
                  <div style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></div>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> لذیذستون </p>
                </div>
                <div className="touchable" style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}>
                  <div style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></div>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> پیام‌ها </p>
                </div>
                <div className="touchable" style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'contact_us'}))}>
                  <div style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></div>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> تماس‌به‌ خدمت‌گذار شما </p>
                </div>
                <div className="touchable" style={{flexDirection: 'row-reverse', padding: 14, paddingRight: 6}}>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> آشپزی با عشق </p>
                </div>
                <div className="touchable" style={{flexDirection: 'row-reverse', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'vision'}))}>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> شعار‌ ما </p>
                </div>
                <div className="touchable" style={{flexDirection: 'row-reverse', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'mission'}))}>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> برنامه‌های ما </p>
                </div>
                <div className="touchable" style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'subscribe'}))}>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> می‌شه با دوستات دوست ‌شم </p>
                </div>
                <div className="touchable" style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
                  onPress={async () => {
                    if (this.state.authorized) {
                      await AsyncStorage.removeItem('username');
                      await AsyncStorage.removeItem('password');
                      this.nonState.username = null;
                      this.nonState.password = null;
                      this.setState({bar: 'login', authorized: false, user: {}, });
                    } else
                      this.setState({bar: 'login'})
                  }}>
                  <div style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></div>
                  <p style={{ fontFamily: 'iran-sans', color: '#373747' }}> { this.state.authorized ? 'خروج' : 'ورود، ثبت‌نام'} </p>
                </div>
              </div>
            ) : this.state.bar == 'profile' ? (
              <div style={{ backgroundColor: 'white', flex: 1 }}>
                <div style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, paddingLeft: 10, paddingRight: 10 }}>
                  <div className="touchable" onPress={() => {this.setState({bar: this.state.profileEditing ? 'profile' : 'home', product: null, profileEditing: false})}}>
                    <image style={{width: 28, height: 28, margin: 4}} source={'./assets/img/back-1.png'}/>
                  </div>
                  <p style={{ fontFamily: 'iran-sans-bold', color: '#373747', fontSize: 22 }}>لذیذستون</p>
                  {
                    this.state.profileEditing ? (<div style={{width: 32, height: 32}}/>) : (
                      <div className="touchable" onPress={() => {this.setState({profileEditing: true})}}>
                        <image style={{width: 32, height: 32}} source={'./assets/img/edit-profile-0.png'}/>
                      </div>
                    )
                  }
                </div>
                <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <image source={'./assets/img/avatar.jpg'} style={{ width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4, marginTop: -screenWidth / 3.2 }}/>
                  <p style={{ backgroundColor: this.state.profileEditing ? '#f7f7f7' : '#fff', borderRadius: 9, paddingLeft: 9, paddingRight: 9, fontFamily: 'iran-sans', fontSize: 20, color: this.state.profileEditing ? '#DE3136' : '#373747', marginTop: 10 }} onPress={() => {
                    let dialog = this.state.dialog;
                    dialog.field = 'username';
                    dialog.title = 'انتخاب نام‌کاربری';
                    dialog.description = 'نام‌کاربری جدیدتان را وارد کنید';
                    dialog.shown = true;
                    this.setState({dialog});
                  }}>{ this.state.user.username }</p>
                  <p style={{ fontFamily: 'iran-sans-bold', fontSize: 15, color: '#373747', marginTop: 6 }} onPress={() => {
                    let dialog = this.state.dialog;
                    dialog.field = 'family';
                    dialog.title = 'تعداد';
                    dialog.description = 'تقریباً برای چندنفر آشپزی می‌کنید';
                    dialog.shown = true;
                    this.setState({dialog});
                  }}>خانواده<p style={{ color: '#DE3136', fontFamily: 'iran-sans', fontSize: 20, textDecorationLine: this.state.profileEditing ? 'underline' : 'none', }}>  {this.farsify(this.state.user.family)}</p>نفره</p>
                  <p style={{ fontFamily: 'iran-sans', marginTop: 6, backgroundColor: this.state.profileEditing ? '#f7f7f7' : '#fff', color: this.state.profileEditing ? '#DE3136' : '#373747', borderRadius: 9, paddingLeft: 9, paddingRight: 9,}} onPress={() => {
                    let dialog = this.state.dialog;
                    dialog.field = 'phone';
                    dialog.title = 'شماره‌تماس جدید';
                    dialog.description = 'موبایلتان را وارد کنید';
                    dialog.shown = true;
                    this.setState({dialog});
                  }}> {this.farsify(this.state.user.phone)} </p>
                  <div className="touchable" onPress={() => {this.setState({bar: 'location'}); }} style={{ flexDirection: 'row-reverse', marginRight: 24, marginTop: this.state.profileEditing ? 10 : 1 }}>
                    <div style={{ backgroundColor: this.state.profileEditing ? '#DE3136' : '#fff', padding: 4.5, paddingTop: 5, paddingBottom: 5, marginTop: -5, borderRadius: 20 }}>
                      <image style={{width: 24, height: 24 }} source={this.state.profileEditing ? './assets/img/marker-white.png' : './assets/img/marker.png'}/>
                    </div>
                    <p style={{ fontFamily: 'iran-sans'}}> {this.state.user.address} </p>
                  </div>
                </div>
              </div>
            ) : this.state.bar == 'page' ? (
              <div style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                <p style={{ fontFamily: 'iran-sans-bold', color: '#373747', fontSize: 16, width: screenWidth, textAlign: 'center' }}>
                  {this.state.page == 'subscribe' ? '' : 'به‌نام خدا'}
                </p>
                {
                  this.state.page == 'contact_us' ? (
                    <div style={{ paddingTop: 30 }} >
                      <p style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, textAlign: 'center' }}>شماره‌های تماس مااینجاست. تاکنون با نظرات دوستان و پاسخ‌گویی به نیازاتشان به این‌جا رسیده‌ایم. برای‌ما نظرات شما حکم طلایی را دارد که سیستم را به جلو پیش می‌برد و آن‌را ارتقاع می‌دهد.</p>
                      <div className="touchable" style={{ backgroundColor: '#DE3136', alignSelf: 'center', padding: 30, paddingTop: 9, paddingBottom: 8, borderRadius: 9}} onPress={() => {Linking.openURL('tel://09133657623')}}>
                        <p style={{ fontFamily: 'iran-sans-bold', color: '#fffffe', fontSize: 15 }}>۰۹۱۳۳۶۵۷۶۲۳</p>
                      </div>
                    </div>
                  ) : this.state.page == 'mission' ? (
                    <div style={{ paddingTop: 30, alignItems: 'center' }} >
                      <image source={'./assets/img/quality.jpg'} style={{ width: screenWidth / 1.57, height: screenWidth / 2 }}/>
                      <p style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, paddingBottom: 0, paddingTop: 30, textAlign: 'center' }}>محصولات پروتئینی خیلی حساسن. با آزمایشات ساده زیستی میشه فهمید که اگه شرایط نگه‌داری خوب‌نباشن به غذای ما و درنتیجه به سلامتی ما آسیب میرسونن. آیا میتونیم سلامتی گوشتمون را بهبود ببخشیم. این چالش همیشگی ماست</p>
                      <p style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, paddingTop: 10, textAlign: 'center' }}>با سه چیز ساده میشه کنترل محصول پروتئینی را چک کرد. دماسنج و پی‌اچ متر و پردازش تصویری از ظاهر گوشت. این مورد علاقه ماست که بتوانیم سلامت تک‌تک سفارشات را چک کنیم و به سفارش‌دهنده اطلاع دهیم</p>
                      {/* <div className="touchable" style={{ backgroundColor: '#DE3136', alignSelf: 'center', padding: 30, paddingTop: 9, paddingBottom: 8, borderRadius: 9}} onPress={() => {this.setState({bar: 'page_contact_us'})}}>
                        <p style={{ fontFamily: 'iran-sans-bold', color: '#fffffe', fontSize: 15 }}>تماس‌باما</p>
                      </div> */}
                    </div>
                  ) : this.state.page == 'vision' ? (
                    <div style={{ paddingTop: 30 }} >
                      <p style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, textAlign: 'center' }}>شاید بتونیم پیشرفت ایران عزیزمونو از پیشترفت محصولات پروتئینیمونی که می‌خوریم شروع‌کنیم</p>
                      {/* a youtube link or embedded */}
                    </div>
                  ) : (
                    <div style={{ paddingTop: 45 }} >
                      <p style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, textAlign: 'center' }}>شماره‌های تماس مااینجاست. تاکنون با نظرات دوستان و پاسخ‌گویی به نیازاتشان به این‌جا رسیده‌ایم. برای‌ما نظرات شما حکم طلایی را دارد که سیستم را به جلو پیش می‌برد و آن‌را ارتقاع می‌دهد.</p>
                      <div style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <div className="touchable" style={{}} onPress={() => {Linking.openURL('tel://09133657623')}}>
                          <image style={{width: 82, height: 82, marginTop: -9}} source={'./assets/img/whatsapp.png'}/>
                          <p style={{ alignSelf: 'center', fontFamily: 'iran-sans-bold', fontSize: 10, marginTop: -8, color: '#5ABA9E' }}>واتس‌اپ</p>
                        </div>
                        <div className="touchable" style={{}} onPress={() => {Linking.openURL('tel://09133657623')}}>
                          <image style={{width: 64, height: 64}} source={'./assets/img/instagram.png'}/>
                          <p style={{ alignSelf: 'center', fontFamily: 'iran-sans-bold', fontSize: 10, marginTop: 2, color: '#FE697B' }}>اینستاگرام</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            ) : this.state.bar == 'map' || this.state.bar == 'location' ? (
              <div style={{ flex: 1 }}>
                <MapView style={{flex: 1}} ref={map => this.map = map}
                  initialRegion={{
                    latitude: this.state.user.location.latitude,
                    longitude: this.state.user.location.longitude,
                    latitudeDelta: 0.1922 / 4,
                    longitudeDelta: 0.0821 / 4,
                  }}
                  onRegionChangeComplete={(region) => {
                    if (this.state.bar == 'location') {
                      this.nonState.latitude = region.latitude;
                      this.nonState.longitude = region.longitude;
                      if (region.latitudeDelta + region.longitudeDelta < 0.0342875 && !this.state.located)
                        this.setState({located: true});
                      if (region.latitudeDelta + region.longitudeDelta > 0.0342875 && this.state.located)
                        this.setState({located: false});
                    }
                  }}
                >
                  <UrlTile urlTemplate={`/static/lyrr/{z}/{x}/{y}.png`} maximumZ={19} flipY={false} />
                  { this.state.bar == 'map' &&
                    <MapView.Polyline
                      coordinates={this.state.route}
                      strokeColor={'#03A9B7'}
                      strokeWidth={4}
                    />
                  }
                  { this.state.bar == 'map' &&
                    <MapView.Marker style={{ zIndex: 99 }} anchor={{ x: 0.5, y: .5 }} centerOffset={{ x: 0.5, y: .5 }}
                      coordinate={{
                        latitude: this.state.biker.location.latitude,
                        longitude: this.state.biker.location.longitude,
                      }} >
                      <div style={{
                        zIndex: 97,
                        width: 16 * 4,
                        height: 16 * 4,
                        backgroundColor: '#3F86F525',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#3F86F545',
                        borderWidth: 1,
                        borderRadius: 16 * 2,
                      }}>
                        <div style={{ backgroundColor: '#34374755', borderRadius: 3, marginBottom: 5, marginTop: -15 }}>
                          <p style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13, marginBottom: -5, marginTop: -2, marginLeft: 4, marginRight: 4}}>{this.farsify(this.state.biker.temperature)} C°</p>
                        </div>
                        <div style={{
                          width: 16,
                          height: 16,
                          backgroundColor: '#3F86F5',
                          borderRadius: 8,
                          borderWidth: 2,
                          marginBottom: 5,
                          borderColor: 'white'
                        }}/>
                        <div style={{ backgroundColor: '#34374725', borderRadius: 3, marginBottom: -10, marginTop: 0 }}>
                          <p style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13, marginBottom: -5, marginTop: -2, marginLeft: 4, marginRight: 4}}>دما</p>
                        </div>
                      </div>
                    </MapView.Marker>
                  }
                  { this.state.bar == 'map' &&
                  <MapView.Marker
                    style={{
                      zIndex: 98
                    }}
                    coordinate={{
                      latitude: this.state.user.location.latitude,
                      longitude: this.state.user.location.longitude,
                    }}
                    anchor={{ x: 0.5, y: .94 }}
                    centerOffset={{ x: 0.5, y: .94 }}>
                    <div>
                      <div style={{
                        width: 16 * 4,
                        height: 16 * 4,
                        backgroundColor: '#3F86F525',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#343747',
                        borderWidth: 3,
                        borderRadius: 16 * 2,
                      }}>
                        <div style={{
                          width: 16 * 3.5,
                          height: 16 * 3.5,
                          backgroundColor: '#3F86F5',
                          borderRadius: 28,
                          borderWidth: 3,
                          marginBottom: 0,
                          borderColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <p style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -2, fontSize: 11 }}>{ this.state.user.username }</p>
                        </div>
                      </div>
                      <div style={{ width: 4, height: 16, backgroundColor: '#343747', marginLeft: 2 * 16 - 2, marginTop: -2, borderRadius: 4 }}></div>
                      <div style={{ width: 12, height: 10, backgroundColor: '#34374764', borderRadius: 8, borderWidth: 1, borderColor: '#343747b8', marginLeft: 2 * 16 - 6, marginTop: -6 }}></div>
                    </div>
                  </MapView.Marker>
                  }
                  { this.state.bar == 'map' &&
                  <MapView.Marker
                    style={{
                      zIndex: 98
                    }}
                    coordinate={{
                      latitude: this.state.vendor.latitude,
                      longitude: this.state.vendor.longitude,
                    }}
                    anchor={{ x: 0.5, y: .94 }}
                    centerOffset={{ x: 0.5, y: .94 }}>
                    <div>
                      <div style={{
                        width: 16 * 4,
                        height: 16 * 4,
                        backgroundColor: '#3F86F525',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#343747',
                        borderWidth: 3,
                        borderRadius: 16 * 2,
                      }}>
                        <div style={{
                          width: 16 * 3.5,
                          height: 16 * 3.5,
                          backgroundColor: '#3F86F5',
                          borderRadius: 28,
                          borderWidth: 3,
                          marginBottom: 0,
                          borderColor: 'white',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <p style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -2, fontSize: 11 }}>{ 'لذیذستون' }</p>
                        </div>
                      </div>
                      <div style={{ width: 4, height: 16, backgroundColor: '#343747', marginLeft: 2 * 16 - 2, marginTop: -2, borderRadius: 4 }}></div>
                      <div style={{ width: 12, height: 10, backgroundColor: '#34374764', borderRadius: 8, borderWidth: 1, borderColor: '#343747b8', marginLeft: 2 * 16 - 6, marginTop: -6 }}></div>
                    </div>
                  </MapView.Marker>
                  }
                </MapView>
                { this.state.bar == 'location' ? (
                  <div style={{ position: 'absolute', width: screenWidth }}>
                    <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                      <input style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 12, paddingTop: 7, paddingBottom: 8, margin: 10, textAlign: 'center', fontFamily: 'iran-sans'}} placeholder='جست‌جوی محله سکونت'
                        onChangep={async (text) => {
                          if (text.length < 2) return;
                          let response = await fetch(host + 'geo/search?q=' + text, {
                            method: 'GET',
                            credentials: 'include',
                            headers: { Accept: 'application/json' },
                          });
                          this.setState({locations: await response.json()})
                        }}>{ this.state.location }</input>
                    </div>
                    <div style={{ borderRadius: 12, backgroundColor: 'white', margin: 10, marginTop: 2 }}>
                      {this.state.locations.map((location, idx) =>
                        <p key={idx} style={{ flex: 1, color: '#343747', fontFamily: 'iran-sans', borderBottomColor: '#f1f1f2', borderBottomWidth: .5, paddingTop: 5, paddingBottom: 6, paddingRight: 12 }} onPress={() => {
                          let d_lat = 0.1922;
                          let d_lng = 0.0821;
                          this.map.animateToRegion({
                            latitude: location.coordination.latitude,
                            longitude: location.coordination.longitude,
                            latitudeDelta: d_lat / 8,
                            longitudeDelta: d_lng / 8,
                          });
                          this.setState({locations: [], location: location.location});
                        }}>{location.location}</p>
                      )}
                    </div>
                  </div>
                ) : null }
                { this.state.bar == 'location' &&
                  <div className="touchable" style={{ position: 'absolute', left: screenWidth / 2 - 16 * 2, top: screenHeight / 2 - 32 - 16 * 2 - 8 }} onPress={async () => {
                    if (! this.state.located) return;
                    this.setState({locatedLocation: this.state.location});
                    if (this.state.authorized) {
                      let response = await fetch(host + 'users/' + this.state.user._id +
                        '/$?address=' + this.state.location +
                        '&location.latitude=' + this.nonState.latitude +
                        '&location.longitude=' + this.nonState.longitude , {
                          method: 'GET',
                          credentials: 'include',
                          headers: { Accept: 'application/json' },
                        });
                      if (response.status == 200) {
                        let dialog = this.state.dialog;
                        dialog.field = 'address';
                        dialog.title = 'انتخاب محل سکونت';
                        dialog.description = 'آدرستان رابه صورت‌کامل وارد‌ نمایید.';
                        dialog.shown = true;
                        this.setState({dialog, user: await response.json()});
                      }
                    }
                  }}>
                    <div style={{
                      width: 16 * 4,
                      height: 16 * 4,
                      backgroundColor: '#3F86F525',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#343747',
                      borderWidth: 3,
                      borderRadius: 16 * 2,
                    }}>
                      <div style={{
                        width: 16 * 3.5,
                        height: 16 * 3.5,
                        backgroundColor: '#3F86F5',
                        borderRadius: 28,
                        borderWidth: 3,
                        marginBottom: 0,
                        borderColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <p style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -2, fontSize: 11 }}>{ this.state.located ? 'انتخاب' : 'زوم' }</p>
                      </div>
                    </div>
                    <div style={{ width: 4, height: 16, backgroundColor: '#343747', marginLeft: 2 * 16 - 2, marginTop: -2, borderRadius: 4 }}></div>
                    <div style={{ width: 12, height: 10, backgroundColor: '#34374764', borderRadius: 8, borderWidth: 1, borderColor: '#343747b8', marginLeft: 2 * 16 - 6, marginTop: -6 }}></div>
                  </div>
                }
                { this.state.bar == 'map' ? (
                  <div style={{ backgroundColor: 'white', borderTopWidth: .5, borderTopColor: '#E6E7Ea', paddingTop: 3, paddingRight: 4, paddingLeft: 4 }}>
                    <div style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <p style={{ color: '#3F86F5', fontFamily: 'iran-sans-light', fontSize: 13, marginTop: 6 }}>مسافت { this.farsify(2100) } متر</p>
                      <p style={{ color: '#343747', fontFamily: 'iran-sans', fontSize: 15, }} onPress={() => this.setState({bar: 'location'})}>اصفهان, {this.state.user.address} - </p>
                    </div>
                    <div style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                      <div>
                        <p style={{ color: '#343747', fontFamily: 'iran-sans', fontSize: 16, marginTop: 4, marginRight: 8}}>{this.farsify((this.state.order.products.map(product => (product.price * [200, 450, 1100, 2650, 6400][product.quantity])).reduce((a, b) => a + b, 0.0) / 100000 + this.state.adp / 1000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} تومان<p style={{ fontFamily: 'iran-sans-light', color: '#643777', fontSize: 13 }}>  شامل { this.farsify((this.state.adp / 1000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) } تومان هزینه ‌دلیوری</p></p>
                        <p style={{ color: '#343747', fontFamily: 'iran-sans-light', fontSize: 13, marginTop: 2, marginRight: 7}}>{this.state.order.payed ? '۴ دقیقه تا رسیدن پیک' : "نفر" + this.farsify(this.state.q) + "ام درصف"}</p>
                      </div>
                      { !this.state.order.payed &&
                      <div className="touchable" style={{ height: 64, width: 64, borderRadius: 48, backgroundColor: '#3F86F5', marginLeft: 12, justifyContent: 'center', alignItems: 'center', marginTop: -15, borderColor: '#34374720', borderWidth: 2 }} onPress={async () => {
                        this.setState({web: host + 'orders/' + this.state.order._id + '/pay?price=' + this.state.order.products.map(product => (product.price * [200, 450, 1100, 2650, 6400][product.quantity])).reduce((a, b) => a + b, 0) / 10});
                      }}>
                        <p style={{ color: 'white', fontFamily: 'iran-sans-bold', fontSize: 15 }}>خرید</p>
                      </div>
                      }
                    </div>
                  </div>
                ) : (
                  <p style={{ fontFamily: 'iran-sans', color: this.state.located ? '#3FD459' : '#DE3136', marginTop: -14 * 2 - 3, marginBottom: 3, paddingRight: 8 }}>
                    {this.state.located ? 'بسیار خوب. روی علامت را لمس کنید.' : 'زوم کنید و مکانتان را پیدا کنید. تا علامت سبز شود.'}
                  </p>
                ) }
              </div>
            ) : (
              <div style={{ backgroundColor: '#fff', flex: 1 }}>
                {this.state.bar == 'search' ? (
                  <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', borderBottomWidth: .5, borderBottomColor: '#E6E7Ea'}}>
                    <input style={{ flex: 1, backgroundColor: '#fbfafa', borderRadius: 12, paddingTop: 4, paddingBottom: 4, margin: 10, textAlign: 'center', fontFamily: 'iran-sans'}} placeholder='جست‌جوی لذیذها'
                      onSubmitEditing={async () => {
                        let response = await fetch(host + 'delicious/search?q=' + this.nonState.search, {
                          method: 'POST',
                          credentials: 'include',
                          headers: { Accept: 'application/json' },
                        });
                        response = await response.json();
                        this.setState({ bar: 'search', products: response });
                      }} onChangep={text => {this.nonState.search = text}}/>
                  </div>
                ) : null}
                <FlatList
                  onMomentumScrollBegin={this.locationHeader}
                  style={{alignSelf: 'stretch', textAlign: 'center', paddingTop: 0, marginTop: 0, backgroundColor: 'f7f7f7'}}
                  data={this.state.products}
                  renderItem={({item, index}) => (this.card(item, true, index))}
                  keyExtractor={(item, index) => index.toString()}
                />
              </div>
            )
          }
          { this.state.orderShown && this.state.order.products.length > 0 && this.state.bar != 'map' && this.state.bar != 'location' ? (
            <div style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor: 'white', marginTop: -30 }}>
              { this.state.order.payed ? (
                null
              ) : (
                <div style={{ borderBottomWidth: .5, borderBottomColor: '#E6E7Ea', flexDirection: 'row' }}>
                  <div className="touchable" style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', flex: .9}} onPress={async () => {
                    this.setState({order: {products: [], payed: false}});
                    await AsyncStorage.removeItem('order');
                  }}>
                    <p style={{ fontSize: 15, flex: 1, borderRadius: 12, paddingTop: 7, paddingBottom: 6, margin: 10, marginRight: 5, textAlign: 'center', fontFamily: 'iran-sans-bold', borderColor: 'red', borderWidth: .5, color: 'red', backgroundColor: 'white'}}>انصراف</p>
                  </div>
                  <div className="touchable" style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', flex: 1.1, borderColor: '#3FD459', borderWidth: .5, backgroundColor: 'white', paddingTop: 7, paddingBottom: 6, margin: 10, marginLeft: 5, borderRadius: 12,}} onPress={async () => {
                    let data = new FormData();
                    let order = this.state.order;
                    order.price = order.products.map(product => (product.price * [200, 450, 1100, 2650, 6400][product.quantity])).reduce((a, b) => a + b, 0.0) / 100 + this.state.adp;
                    await AsyncStorage.setItem('order', JSON.stringify(order));
                    data.append('json', JSON.stringify(order));
                    let response = await fetch(host + 'orders/+', {
                      method: 'POST',
                      credentials: 'include',
                      headers: { Accept: 'application/json' },
                      body: data,
                    });
                    order._id = await response.text();
                    this.setState({bar: 'map', product: null, locationHeader: false, orderShown: false, order: order});
                    window.animate(window.locationLength, 'height', 0, .1);
                    let route = await fetch('http://103.215.221.23:5000/' + 'route/v1/car/' + this.state.user.location.longitude + ',' + this.state.user.location.latitude + ';' + this.state.vendor.longitude + ',' + this.state.vendor.latitude + '?steps=true');
                    route = await route.json();
                    route = route['routes'][0]['legs'][0]['steps'].map(step => ({
                      latitude: step['maneuver']['location'][1],
                      longitude: step['maneuver']['location'][0],
                    }));
                    this.setState({route: route});
                    let min_lat = Math.min(this.state.user.location.latitude, this.state.vendor.latitude);
                    let min_lng = Math.min(this.state.user.location.longitude, this.state.vendor.longitude);
                    let d_lat = Math.abs(this.state.user.location.latitude - this.state.vendor.latitude);
                    let d_lng = Math.abs(this.state.user.location.longitude - this.state.vendor.longitude);
                    console.log(min_lat);
                    console.log(min_lng);
                    this.map.animateToRegion({
                      latitude: min_lat,
                      longitude: min_lng + d_lng / 2,
                      latitudeDelta: d_lat * 2.7,
                      longitudeDelta: d_lng * 2.7,
                    });
                  }}>
                    <p style={{ fontSize: 12, textAlign: 'center', fontFamily: 'iran-sans-bold', color: '#3FD459', marginTop: 4}}>
                      {this.farsify((this.state.order.products.map(product => (product.price * [200, 450, 1100, 2650, 6400][product.quantity])).reduce((a, b) => a + b, 0.0) / 100000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} تومان
                    </p>
                    <p style={{ fontSize: 16, textAlign: 'center', fontFamily: 'iran-sans-bold', color: '#3FD459', marginLeft: 8}}>سفارش</p>
                  </div>
                </div>
              ) }
              { this.state.order.payed ? (
                <div>
                  <image style={{borderTopLeftRadius: 12, borderTopRightRadius: 12, width: screenWidth + 1, height: screenWidth * 9 / 16, margin: 0}} source={'./assets/img/signal.gif'}/>
                  <p style={{ fontFamily: 'iran-sans-bold', color: 'white', marginRight: 15, marginBottom: -25 + screenWidth * 9 / 16, marginTop: -screenWidth * 9 / 16 }}>شبکه لذیذستون</p>
                  <p style={{ fontFamily: 'iran-sans', color: '#343747', borderBottomColor: '#a4a7b7', borderBottomWidth: .5, padding: 5 }}> سفارشتان را به طور زنده از طریق شبکه لذیذستون یا روی نقشه دنبال کنید. همچنین از همین‌جا اقدام به سفارش جدید نمایید. </p>
                  <div style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 14 }}>
                    <div className="touchable" style={{ borderRadius: 40, backgroundColor: '#DE3136', alignSelf: 'flex-end', padding: 9, paddingTop: 0, paddingBottom: 1, marginTop: 0 }}
                      onPress={() => {
                        this.setState({bar: 'map', locationHeader: false, orderShown: false});
                        window.animate(window.locationLength, 'height', 0, .1);
                      }}>
                      <p style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13 }}>درنقشه دنبال‌کنید</p>
                    </div>
                    <div className="touchable" style={{ borderRadius: 40, backgroundColor: '#DE3136', alignSelf: 'flex-end', padding: 9, paddingTop: 0, paddingBottom: 1, marginTop: 0 }}
                      onPress={async () => {
                        this.setState({order: {
                          payed: false,
                          products: []
                        }, orderShown: false});
                        await AsyncStorage.setItem('order', JSON.stringify({
                          payed: false,
                          products: []
                        }));
                      }}>
                      <p style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13 }}>سفارش جدید</p>
                    </div>
                  </div>
                </div>
              ) : (
                <FlatList
                  style={{alignSelf: 'stretch', textAlign: 'center', paddingTop: 4}}
                  data={this.state.order.products}
                  renderItem={this.renderPoint}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) }
            </div>
          ) : null }
        </div>
        {/* ---- 2 ---- */}
        <div style={{ backgroundColor: this.state.bar == 'map' || this.state.bar == 'location' ? 'white' : '#FFFFFF', borderTopWidth: .5, borderTopColor: this.state.bar == 'map' || this.state.bar == 'location' ? 'white' : '#E6E7Ea', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8}}>
          <div className="touchable" onPress={() => {this.setState({bar: 'home', product: null})}}>
            <image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 8}} source={'./assets/img/chicken-face.png'} />
          </div>
          <div className="touchable" onPress={() => {
            this.setState({bar: 'menu', product: null, locationHeader: false});
            window.animate(window.locationLength, 'height', 0, .1);
          }}>
            <image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 6}} source={'./assets/img/menu.png'} />
          </div>
          <div className="touchable" onPress={() => {this.setState({orderShown: !this.state.orderShown})}}>
            <div style={{width: 36 * 1.8, height: 36 * 1.8, backgroundColor: '#343747', borderRadius: 500, marginBottom: -36 * .3, marginTop: -36 * .3, padding: .3 * 36}}>
              { this.state.order.products.length > 0 ? (
                <p style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -10, marginBottom: -13, textAlign: 'center', fontSize: 16 }}>{this.farsify(this.state.order.products.length)}</p>
              ) : null}
              <image style={{width: 32, height: 32, marginRight: 3, marginLeft: 3, marginTop: 6, marginBottom: 8}} source={this.state.order.payed ? './assets/img/cart-tick-white.png' : './assets/img/cart-white.png'} />
            </div>
          </div>
          <div className="touchable" onPress={() => {this.setState({bar: 'search', product: null})}}>
            <image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 8}} source={'./assets/img/search.png'} />
          </div>
          <div className="touchable" onPress={() => {
            this.setState({bar: this.state.authorized ? 'profile' : 'login', profileEditing: false, product: null, locationHeader: false});
            window.animate(window.locationLength, 'height', 0, .1);
          }}>
            <image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 8}} source={'./assets/img/profile.png'} />
            <div style={{ backgroundColor: '#DE3136', height: 4, width: 4, borderRadius: 2, marginTop: -9, marginLeft: 29 }}/>
          </div>
        </div>
        {/* ---- 3 ---- */}
        <div visible={this.state.dialog.shown}>
          <h2>{this.state.dialog.title}</h2>
          <p>{this.state.dialog.description}</p>
          <input label="ورودی" onChangep={(text) => this.nonState[this.state.dialog.field] = text}/>
          <button label="انصراف" onPress={() => {this.state.dialog.shown = false; this.setState({dialog: this.state.dialog})}}/>
          <button label="اعمال" onPress={async () => {
            let response = await fetch(host + 'users/' + this.state.user._id + '/$?' + this.state.dialog.field + '=' + this.nonState[this.state.dialog.field], {
              method: 'GET',
              credentials: 'include',
              headers: { Accept: 'application/json' },
            });
            if (response.status == 200) {
              this.state.dialog.shown = false;
              this.setState({dialog: this.state.dialog, user: await response.json()});
            } else {
              this.state.dialog.description = 'دوباره تلاش کنید';
              this.setState({dialog: this.state.dialog});
            }
          }}/>
        </div>
      </div>
    );
  }
}