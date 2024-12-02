import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Image, TouchableOpacity, FlatList, ScrollView, Dimensions, Platform, TextInput, Animated, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { UrlTile, LocalTile } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import Dialog from "react-native-dialog";
import { WebView } from 'react-native-webview';

const screenWidth = Math.round(Dimensions.get('window').width), screenHeight = Math.round(Dimensions.get('window').height);
var host, osrm, server_ip;

export default class App extends React.Component {
  Images = {
    "./assets/img/categories/chicken.jpg": require("./assets/img/categories/chicken.jpg"),
    "./assets/img/categories/fish.jpg": require("./assets/img/categories/fish.jpg"),
    "./assets/img/categories/lamb.jpg" : require("./assets/img/categories/lamb.jpg"),
    "./assets/img/categories/cold-cuts.jpg" : require("./assets/img/categories/cold-cuts.jpg"),
    "./assets/img/categories/eggs.jpg" : require("./assets/img/categories/eggs.jpg"),
    "./assets/img/categories/ready.jpg" : require("./assets/img/categories/ready.jpg"),
    "./assets/img/categories/combo.jpg" : require("./assets/img/categories/combo.jpg"),
    "./assets/img/categories/exotic.jpg" : require("./assets/img/categories/exotic.jpg"),

    './assets/img/cdn/offer.jpg': require('./assets/img/cdn/offer.jpg'),
    'shrimp': require('./assets/img/shrimp.png'),
    'fish': require('./assets/img/fish.png'),
    'chicken': require('./assets/img/chicken.png'),
    'lamb': require('./assets/img/sheep.png'),
    './assets/img/flavors/chili-1.png': require('./assets/img/flavors/chili-1.png'),
    './assets/img/flavors/onion-0.png': require('./assets/img/flavors/onion-0.png'),
    './assets/img/flavors/shrimp-0.png': require('./assets/img/flavors/shrimp-0.png'),
    './assets/img/flavors/smoky-0.png': require('./assets/img/flavors/smoky-0.png'),
    './assets/img/flavors/balsamic-0.png': require('./assets/img/flavors/balsamic-0.png'),
    './assets/img/flavors/raw-0.png': require('./assets/img/flavors/raw-0.png'),
    './assets/img/flavors/phenomenal-0.png': require('./assets/img/flavors/phenomenal-0.png'),
  };
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
      image: require('./assets/img/cdn/fish.jpg'),
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
          'image': require('./assets/img/flavors/raw-0.png'),
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
    this.locationLength = new Animated.Value(40);
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
    server_ip = '172.20.10.9';
    host = `http://${server_ip}:5001/`;
    osrm = `http://${server_ip}:5000/`;
    console.log(host.substr(0, host.length - 1) + ':5500/{z}/{x}/{y}.png');
    let response = await fetch(host, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    });
    response = await response.json();
    response.categories.map((category) => category.image = category.image.includes('./assets/') ? this.Images[category.image] : {uri: host + category.image});
    response.home.offer.source = this.Images[response.home.offer.source];
    Object.values(response.flavors).map((flavor) => flavor.image = flavor.image.includes('./assets/') ? this.Images[flavor.image] : {uri: host + flavor.image});
    this.setState({home: response.home, categories: response.categories, flavors: response.flavors, adp: response.adp, fontLoaded: true});
    this.nonState.username = await AsyncStorage.getItem('username');
    this.nonState.password = await AsyncStorage.getItem('password');
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
          Animated.timing(
            this.locationLength, {
              toValue: 40,
              duration: 100,
              // easing: Easing.linear
            }
          ).start();
        })
    } else {
      if (this.locationLength._value != 0)
        Animated.timing(
          this.locationLength, {
            toValue: 0,
            duration: 100,
            // easing: Easing.linear
          }
        ).start(() => {this.setState({'locationHeader': false})});
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
      await AsyncStorage.setItem('username', this.nonState.username);
      await AsyncStorage.setItem('password', this.nonState.password);
      let state = { bar: 'home', /* locationHeader: false, */ authorized: true, user: response.user };
      let order = await AsyncStorage.getItem('order');
      if (order) state.order = JSON.parse(order);
      this.setState(state);
//      Animated.timing(
//        this.locationLength, {
//          toValue: 0,
//          duration: 0,
//        }
//      ).start();  // just for test, locationHeader: false
    } else {

    }
  };

  card (product, bold, idx) {
    let extra = bold ? 10 : 0;
    bold = (bold ? 5 : 4);
    return (
      <TouchableOpacity key={product.subject + '_' + idx} style={{borderRadius: 3, backgroundColor: 'white', borderColor: '#343747', width: screenWidth * bold / 5 - extra, height: screenWidth * bold / 5 - extra, marginLeft: 5, marginRight: 5, marginTop: extra / 1.3, marginBottom: extra / 1.3,
      shadowColor: "#fff", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84,  elevation: 5,}}
        onPress={async () => {
          let response = await fetch(host + 'delicious/' + product._id + '/-', {headers: { Accept: 'application/json' }});
          response = await response.json();
          response.flavors['raw'] = this.state.flavors['raw'];
          this.setState({product: response, locationHeader: false, bar: 'product'});
          Animated.timing(
            this.locationLength, {
              toValue: 0,
              duration: 0,
            }
          ).start();
        }}
      >
        <Image style={{width: screenWidth * bold / 5 - extra, height: screenWidth * (bold - 1) / 5 - extra / 1.3, marginLeft: 0, marginTop: -.5}} source={{uri: host + product.image}}/>
        <View style={{ paddingLeft: 3, paddingRight: 3, justifyContent: 'space-between', height: screenWidth / 5 }}>
          <Text style={{ color: '#373747', fontFamily: 'iran-sans', fontSize: 15 }}>{product.subject}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 9, marginBottom: 5 }}>
            <Text style={{ fontFamily: 'iran-sans', color: '#DE3136', marginTop: 5 }}>قیمت:‌ {this.farsify((product.price / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))}<Text style={{ fontFamily: 'iran-sans-bold', fontSize: 11 }}> تومان</Text></Text>
            <TouchableOpacity style={{ backgroundColor: '#DE3136', paddingLeft: 8, paddingRight: 8, padding: 3, borderRadius: 5 }}
              onPress={async () => {
                let order = this.state.order;
                product.quantity = 1;
                order.products.push(product);
                this.setState({order});
                if (!this.state.authorized)
                  this.setState({product: null, bar: 'login'});
                else
                  await AsyncStorage.setItem('order', JSON.stringify(order));
              }}>
              <Text style={{ fontFamily: 'iran-sans', color: 'white' }}>اضافه‌به سبدخرید</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  carousel (products, subject, description) {
    return (
      <View>
        <View>
          <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 16, color: '#373747' }}>{subject}</Text>
        </View>
        <View>
          <Text style={{ fontFamily: 'iran-sans', fontSize: 12, color: '#676777', marginTop: -6 }}>{description}</Text>
        </View>
        <ScrollView horizontal={true} style={{ }}
          ref={ref => this['carousel_' + subject] = ref} onContentSizeChange={(width, height) => this['carousel_' + subject].scrollTo({x: width})}>
          {this['carousel_' + subject] ? products.map((product, idx) => this.card(product, false)) : products.reverse().map((product, idx) => this.card(product, false))}
        </ScrollView>
      </View>
    );
  }

  renderPoint ({item, index}) {
    return (
      <TouchableOpacity style={{flex: 1, flexDirection: 'row', paddingLeft: 6, paddingRight: 6, paddingTop: 2, paddingBottom: 2}} onPress={() => {
        if (Object.keys(item.flavors).length == 0) item.flavors['raw'] = this.state.flavors['raw'];
        item.flavoring = false;
        this.setState({bar: 'product', product: item, locationHeader: false});
        Animated.timing(
          this.locationLength, {
            toValue: 0,
            duration: 0,
          }
        ).start();
      }}>
        <View style={{ borderRadius: 6, backgroundColor: item.status ? '#fbfafa' : '#FFF', flex: 1, flexDirection: 'row'}}>
          <View style={{padding: 5}}>
            {'image' in item ? (
              <Image style={{ width: 64, height: 64, borderRadius: 64, }} source={{ uri: host + item.image }}/>
            ) : (
              <View style={{borderRadius: 500, backgroundColor: '#fee', minWidth: 64, height: 64, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ color: 'white', fontSize: 24, fontFamily: 'iran-sans-bold' }}>{ item.name ? item.name.split(' ').map(name => (name[0])).join('‌') : 'ن' }</Text>
              </View>
            )}
          </View>
          <View style={{flex: 1, borderBottomWidth: .5, borderColor: this.state.order.products.length - 1 == index ? '#fff' : '#E6E7Ea', justifyContent: 'flex-start'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{ color: '#222', fontSize: 15, fontFamily: 'iran-sans', marginLeft: 3}}>{ item.subject }</Text>
              <Text style={{ color: '#ccc', fontSize: 12, marginTop: 1, marginRight: 2 }}> 15/09 </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={{ color: '#ccc', marginLeft: 4 }}>{ item.phone }</Text>
              <TouchableOpacity style={{ backgroundColor: '#fafafa', borderRadius: 48, paddingLeft: 5, paddingRight: 5, alignSelf: 'flex-end', marginRight: 5, marginBottom: .5,
                shadowColor: "#f7f7f7", shadowOffset: {width: 0, height: .5 }, shadowOpacity: 0.05, shadowRadius: 1.84, elevation: .5, }}
                  onPress={() => {
                    if (Object.keys(item.flavors).length == 0) item.flavors['raw'] = this.state.flavors['raw'];
                    item.flavoring = true;
                    item.quantifying = true;
                    this.setState({bar: 'product', product: item, locationHeader: false});
                    Animated.timing(
                      this.locationLength, {
                        toValue: 0,
                        duration: 0,
                      }
                    ).start();
                  }}>
                <Text style={{ color: '#DE3136', fontFamily: 'iran-sans', fontSize: 12, marginTop: -2, marginBottom: -3 }}>{ 'تغییرات' }</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#f9f9f9', height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16, alignSelf: 'flex-end', marginRight: 4,
                shadowColor: "#f7f7f7", shadowOffset: {width: 0, height: .5 }, shadowOpacity: 0.05, shadowRadius: 1.84, elevation: .5, }}
                  onPress={() => {
                    let order = this.state.order;
                    order.products = order.products.slice(index, -1);
                    if (order.products.length == 0) this.state.orderShown = false;
                    // order.products[index].quantity = Math.max(0, order.products[index].quantity - 1);
                    this.setState({order});
                  }}>
                <Image style={{ height: 10, width: 10 }} source={require('./assets/img/close-red.png')}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  /*
    javaScriptEnabled = {true}
    domStorageEnabled = {true}
    injectedJavaScript = {this.state.cookie}
    startInLoadingState={false}
    webviewState object prototype: {
      canGoBack: bool,
      canGoForward: bool,
      loading: bool,
      target: number,
      title: string,
      url: string,
    }
  */

  render () {
    return !this.state.fontLoaded ? (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator/>
      </View>
    ) : this.state.web ? (
      <WebView source={{ uri: this.state.web }} javaScriptEnabled = {true} onNavigationStateChange={async (webviewState) => {
        if (webviewState.url.includes('payed')) {
          let order = this.state.order;
          order.payed = true;
          this.setState({web: null, order: order});
          await AsyncStorage.setItem('order', JSON.stringify(order));
        }
      }} />
    ) : (
      <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
        <StatusBar barStyle="dark-content" hidden={this.state.product || this.state.bar == 'map' || this.state.bar == 'location' ? true : false} backgroundColor='white' translucent={false} networkActivityIndicatorVisible={true}/>
        <View style={{ backgroundColor: '#373747', paddingTop: 0 /*StatusBar.currentHeight*/, borderBottomWidth: .5, borderBottomColor: '#E6E7Ea'}}>
          <Animated.View style={{ zIndex: -1, width: screenWidth, height: this.locationLength, backgroundColor: 'white', justifyContent: 'center' }}>
            { this.state.locationHeader ? (
              <TouchableOpacity style={{ width: screenWidth, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                  this.setState({bar: 'location', locationHeader: false});
                  Animated.timing(
                    this.locationLength, {
                      toValue: 0,
                      duration: 0,
                      // easing: Easing.linear
                    }
                  ).start();
                }}>
                  <Text style={{ fontFamily: 'iran-sans-light', color: '#373747', fontSize: 13, marginTop: 2, marginBottom: -2 }}>، {'اصفهان'}</Text>
                  <Text style={{ fontFamily: 'iran-sans-bold', color: '#373747', fontSize: 16, marginTop: 2, marginBottom: -2 }}>{this.state.authorized ? this.state.user.address : this.state.locatedLocation}</Text>
                  <Image style={{ width: 18, height: 18, marginTop: -2, marginBottom: 2, marginLeft: 2,  }} source={require('./assets/img/marker.png')}/>
                </TouchableOpacity>
            ) : null }
          </Animated.View>
          {['menu', 'map', 'location', 'login', 'profile', 'page', 'product'].indexOf(this.state.bar) == -1 ? (
            <ScrollView horizontal={true} style={{padding: 13, paddingLeft: 3}}>
              {this.state.categories.map((category, idx) => (
                <TouchableOpacity style={{ backgroundColor: category.subject == this.state.category ? '#eee' : '#373747', borderColor: 'white', borderRightWidth: .5, padding: -12, paddingRight: 11, paddingLeft: 6, marginLeft: 4, marginRight: 3, borderRadius: this.state.category == category.subject ? 6 : 0 }} key={'categories_' + idx}
                  onPress={async () => {
                    let response = await fetch(host + 'delicious/search/' + category.subject, {
                      method: 'POST',
                      credentials: 'include',
                      headers: { Accept: 'application/json' },
                    });
                    response = await response.json();
                    this.setState({ bar: 'category', category: category.subject, products: response });
                  }}>
                  <Text style={{color: category.subject == this.state.category ? '#373747' : 'white', fontFamily: 'iran-sans-bold'}}>{category.subject}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : null}
        </View>
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
          {
            this.state.bar == 'login' ? (
              <View style={{ flex: this.state.keyboard ? 1 : 1, backgroundColor: 'white', justifyContent: this.state.keyboard ? 'center' : 'center', alignItems: 'center' }}>
                {
                  this.state.keyboard ? null : (
                    <Image style={{ }} source={require('./assets/img/login.png')}/>
                  )
                }
                <Text style={{ fontFamily: 'iran-sans-bold', color: '#DE3136' }}>ورود‌به دنیای تازه‌های خوشمزه</Text>
                <TextInput style={{ fontFamily: 'iran-sans', width: screenWidth / 2, textAlign: 'center', backgroundColor: '#FCFCFC', borderRadius: 7, padding: 3, marginTop: 20, }} placeholder="نام‌کاربری"
                  onFocus={() => {this.setState({keyboard: true})}}
                  onBlur={() => {this.setState({keyboard: false})}}
                  onChangeText={text => {this.nonState.username = text}}
                />
                <TextInput style={{ fontFamily: 'iran-sans', width: screenWidth / 2, textAlign: 'center', backgroundColor: '#FCFCFC', borderRadius: 7, padding: 3, marginTop: 10 }} placeholder="رمز‌عبور"
                  onFocus={() => {this.setState({keyboard: true})}}
                  onBlur={() => {this.setState({keyboard: false})}}
                  onChangeText={text => {this.nonState.password = text}}
                />
                <TouchableOpacity onPress={this.login}>
                  <Text style={{ width: screenWidth / 2, fontSize: 15, borderRadius: 12, paddingTop: 7, paddingBottom: 6, margin: 10, textAlign: 'center', fontFamily: 'iran-sans-bold', borderColor: '#DE3136', borderWidth: .5, color: '#DE3136', backgroundColor: 'white'}}>ورود، ثبت‌نام</Text>
                </TouchableOpacity>
              </View>
            ) : this.state.product ? (
              <ScrollView style={{ marginTop: -50 }} ref={ref => this.productScroll = ref}
                onContentSizeChange={(width, height) => {if (!('initiated' in this.state.product)) this.productScroll.scrollTo({y: 0}); this.state.product.initiated = true;}}
              >
                <Image source={{ uri: host + this.state.product.image }} style={{ width: screenWidth, height: screenWidth * 9 / 16 }}/>
                {this.state.product.offer ? (
                  <View>
                    <Text>15% Off</Text>
                  </View>
                ) : null}
                <View style={{ width: screenWidth, backgroundColor: 'white', alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 16, color: '#373747' }}>{ this.state.product.subject }</Text>
                  <Text style={{ fontFamily: 'iran-sans-light', fontSize: 13, color: '#575767' }}>{ this.state.product.tags.join(' | ') }</Text>
                  <View style={{ width: screenWidth - 10, margin: 5, borderRadius: 7, borderColor: '#9797a7', borderWidth: .5, borderBottomRightRadius: 22, borderBottomLeftRadius: 22 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 14 }}>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image style={{ width: 20, height: 20 }} source={this.Images[this.state.product.tags.find(tag => tag in this.Images)]}/>
                        <View>
                          {['۲-۳', '۳-۵', '۵-۸', '۸-۱۴', '۱۴-۲۲'].map((range, idx) => (this.state.product.quantifying || idx == this.state.product.quantity ?
                            <Text key={idx} style={{ fontFamily: 'iran-sans', fontSize: 11, color: idx == this.state.product.quantity && this.state.product.quantifying ? 'white' : '#373747', marginTop: 1, marginLeft: 8, backgroundColor: idx == this.state.product.quantity && this.state.product.quantifying ? '#DE3136' : 'white', borderRadius: 4, paddingRight: 4 }}
                              onPress={() => {
                                let product = this.state.product;
                                product.quantity = idx;
                                product.quantifying = false;
                                this.setState({product});
                              }}>{range} تکه</Text> : null
                          ))}
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Image style={{ width: 20, height: 20 }} source={require('./assets/img/weight.png')}/>
                        <View>
                          {[200, 450, 1100, 2650, 6400].map((netWeight, idx) => (this.state.product.quantifying || idx == this.state.product.quantity ?
                            <Text key={idx} style={{ fontFamily: 'iran-sans', fontSize: 11, color: idx == this.state.product.quantity && this.state.product.quantifying ? 'white' : '#373747', marginTop: 1, marginLeft: 8, backgroundColor: idx == this.state.product.quantity && this.state.product.quantifying ? '#DE3136' : 'white', borderRadius: 6, paddingRight: 4 }}
                              onPress={() => {
                                let product = this.state.product;
                                product.quantity = idx;
                                product.quantifying = false;
                                this.setState({product});
                              }}>{this.farsify(netWeight)} گرم</Text> : null
                          ))}
                        </View>
                      </View>
                      <TouchableOpacity style={{ backgroundColor: '#f7f7f7', height: 24, width: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 16, marginRight: -5 }}
                        onPress={() => {
                          let product = this.state.product;
                          product.quantifying = !product.quantifying;
                          this.setState({ product })
                        }}>
                        <Image style={{ height: 12, width: 12, transform: [{rotate: this.state.product.quantifying ? '180deg' : '0deg'}] }} source={require('./assets/img/down-curved.png')}/>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: screenWidth - 21, margin: 5, borderRadius: 18, borderColor: '#ececfc', borderWidth: .5, padding: 4, flexDirection: 'row', backgroundColor: '#fcfcfc', justifyContent: 'space-between' }}>
                      <View>
                        <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', width: screenWidth - 54 }}>
                          {Object.values(this.state.product.flavors).map((flavor, idx) =>
                            <View key={idx} style={{ flexDirection: 'row', borderRadius: 100, backgroundColor: 'white', padding: 2, justifyContent: 'center', alignItems: 'center', marginRight: 4, marginBottom: 1 }}>
                              <Image style={{ height: 26, width: 26, marginLeft: 2, marginTop: -3, marginBottom: -3 }} source={flavor.image}/>
                              <Text style={{ fontFamily: 'iran-sans-light', color: '#676777', fontSize: 11, marginRight: 8, marginLeft: 1, marginTop: 1, marginBottom: -1 }}>{flavor.title}</Text>
                              <TouchableOpacity style={{ backgroundColor: '#f7f7f7', height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}
                                onPress={() => {
                                  let product = this.state.product;
                                  this.setState({product});
                                }}>
                                <Image style={{ height: 10, width: 10 }} source={require('./assets/img/close-red.png')}/>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                        {this.state.product.flavoring && Object.keys(this.state.product.flavors).length != Object.keys(this.state.flavors).length ? (
                          <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', width: screenWidth - 54, marginTop: 7 }}>
                            {Object.keys(this.state.flavors).map((key, idx) => (key in this.state.product.flavors) ? null :
                              <View key={idx} style={{ flexGrow: 0, flexDirection: 'row', borderRadius: 100, backgroundColor: 'white', padding: 2, justifyContent: 'center', alignItems: 'center', marginRight: 4, marginBottom: 1 }}>
                                <Image style={{ height: 26, width: 26, marginLeft: 2, marginTop: -3, marginBottom: -3 }} source={this.state.flavors[key].image}/>
                                <Text style={{ fontFamily: 'iran-sans-light', color: '#676777', fontSize: 11, marginRight: 8, marginLeft: 1, marginTop: 1, marginBottom: -1 }}>{this.state.flavors[key].title}</Text>
                                <TouchableOpacity style={{ backgroundColor: '#DE3136', height: 20, width: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}
                                  onPress={() => {
                                    let product = this.state.product;
                                    this.state.flavors[key].del.map((conflict) => delete product.flavors[conflict]);
                                    product.flavors[key] = this.state.flavors[key];
                                    // product.flavoring = false;
                                    this.setState({product});
                                  }}>
                                  <Image style={{ height: 10, width: 10 }} source={require('./assets/img/plus-curved-white.png')}/>
                                </TouchableOpacity>
                              </View>
                            )}
                          </View>
                        ) : null}
                      </View>
                      <TouchableOpacity style={{ backgroundColor: '#f7f7f7', height: 24, width: 24, justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}
                        onPress={() => {
                          let product = this.state.product;
                          product.flavoring = !product.flavoring;
                          this.setState({product});
                        }}>
                        <Image style={{ height: 12, width: 12, transform: [{rotate: this.state.product.flavoring ? '45deg' : '0deg'}] }} source={require('./assets/img/plus.png')}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={{ fontFamily: 'iran-sans', fontSize: 12, color: '#575767', marginTop: 5 }}>موجوددر پیش‌سفارش</Text>
                </View>
                <View style={{ backgroundColor: 'white', padding: 3, paddingTop: 5 }}>
                  <Text style={{ fontFamily: 'iran-sans', fontSize: 13, color: '#676777' }} >{ this.state.product.description }</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ padding: 12, backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747' }}>قیمت: {this.farsify((this.state.product.price * [200, 450, 1100, 2650, 6400][this.state.product.quantity] / 100000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} تومان</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 12, backgroundColor: 'white', flex: 1, alignItems: 'center', backgroundColor: '#DE3136' }}
                    onPress={async () => {
                      let order = this.state.order;
                      order.products.push(this.state.product);
                      this.setState({order});
                      if (!this.state.authorized)
                        this.setState({bar: 'login', product: null});
                      else
                        await AsyncStorage.setItem('order', JSON.stringify(order));
                    }}>
                    <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: 'white' }}>افزودن‌به سبدخرید</Text>
                  </TouchableOpacity>
                </View>
                <Image source={{uri: host + this.state.product.image}} blurRadius={ Platform.OS == 'ios' ? 10 : 5 } style={{ width: screenWidth, height: screenWidth * 9 / 16 }}/>
                <View style={{ backgroundColor: 'white', margin: 7, padding: 9, borderRadius: 9, marginTop: -75 }}>
                  <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 15, color: '#373747', marginBottom: 5 }}>موارد ارسالی به‌شما</Text>
                  <Text style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>ظرف یک‌بارمصرف اورگانیک</Text>
                  <Text style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>محموله وکیوم دردمای زیر ۴درجه</Text>
                  <Text style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>تکه‌های گوشت آماده پخت</Text>
                  <Text style={{ fontFamily: 'iran-sans', fontSize: 14, color: '#373747' }}>سس خوشمزه طبیعی</Text>
                </View>
                <View style={{ marginTop: 8, borderRadius: 18, backgroundColor: 'white' }}>
                  {this.state.product.reviews.map((review, index) => (
                    <View key={'reviews_' + index} style={{ padding: 6, flexDirection:'column' }}>
                      <Image style={{ width: 24, height: 24, borderRadius: 12, alignSelf: 'flex-end' }} source={{uri: host + review.user.image}}/>
                      <Text style={{ fontFamily: 'iran-sans-light', color: '#373747', marginTop: -24 }}>       <Text style={{color: '#DE313688', fontSize: 10}}> {review.user.username}: </Text>{ review.body.text }</Text>
                      <Text style={{ fontFamily: 'iran-sans-light', color: '#676777', fontSize: 11, marginRight: 12 }}>{ review._date }</Text>
                    </View>
                  ))}
                  {
                    this.state.reviewAdding ? (
                      <View style={{ padding: 6, flexDirection:'column' }}>
                        <Image style={{ width: 24, height: 24, borderRadius: 12, alignSelf: 'flex-end' }} source={{uri: host + 'static/img/avatar.jpg'}}/>
                        <Text style={{ fontFamily: 'iran-sans-light', color: '#DE313688', fontSize: 10, marginTop: -21, marginRight: 29, alignSelf: 'flex-end' }}>:{this.state.user.username}</Text>
                        <TextInput style={{ justifyContent: 'flex-start', fontFamily: 'iran-sans', flex: 1, textAlign: 'center', backgroundColor: '#FCFCFC', borderRadius: 7, padding: 3, marginTop: 10, }}
                          multiline={true} numberOfLines={4} value={this.state.text} onChangeText={(text) => this.nonState.newReview.text = text} />
                        <TouchableOpacity style={{ borderRadius: 40, backgroundColor: '#DE3136', alignSelf: 'flex-end', padding: 9, paddingTop: 0, paddingBottom: 1, marginTop: 6 }}
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
                          <Text style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13 }}>افزودن</Text>
                        </TouchableOpacity>
                      </View>
                    ) : this.state.product.reviews.length == 0 ? (
                      <Text style={{ alignSelf: 'flex-end', fontFamily: 'iran-sans-light', color: '#575767', marginRight: 34, marginBottom: -24, marginTop: 6, fontSize: 13}}>اولین‌نفری باشید که راجع‌به {this.state.product.subject} نظر می‌دهید</Text>
                    ) : null
                  }
                  <TouchableOpacity style={{ width: 24, height: 24, marginRight: this.state.reviewAdding ? 70 : 6, marginTop: this.state.reviewAdding ? -31 : 0, marginBottom: 6, alignSelf: 'flex-end', backgroundColor: '#E0E0E0', borderRadius: 12, padding: 4 }}
                    onPress={() => {
                      if (this.state.authorized)
                        this.setState({reviewAdding: !this.state.reviewAdding});
                      else
                        this.setState({bar: 'login', product: null});
                    }}>
                    <Image style={{ height: 16, width: 16, transform: [this.state.reviewAdding ? {rotate: '45deg'} : {rotate: '0deg'}]}} source={require('./assets/img/add-1.png')}/>
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: 'white', padding: 3, marginTop: 6 }}>
                  {this.carousel(this.state.home.carousels[0].products, this.state.home.carousels[0].subject)}
                </View>
                <View style={{ marginBottom: 30 }}></View>
              </ScrollView>
            ) : this.state.bar == 'home' ? (
              <ScrollView onMomentumScrollBegin={this.locationHeader}>
                <Image style={{ width: screenWidth * 1.2, height: screenWidth / 2 + 80, marginLeft: -screenWidth * .085, marginTop: -80 }} source={this.state.home.offer.source} resizeMode={'cover'}/>
                <Text style={{ fontFamily: 'hand-written', fontSize: 16, color: '#4A8469', marginTop: -60, marginBottom: 60 - 28, marginRight: 25, fontSize: 25 }}>{ this.state.home.offer.massage }</Text>
                {this.carousel(this.state.home.carousels[0].products, this.state.home.carousels[0].subject)}
                <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 16, color: '#373747', marginTop: 16, }}>جست‌جو براساس طبقه‌بندی</Text>
                <View style={{ flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row-reverse', padding: 3, marginTop: -1, marginBottom: 14 }}>
                  {this.state.categories.map((category, idx) => (
                    <TouchableOpacity key={'categories_' + idx} style={{ backgroundColor: 'white', margin: 6, width: screenWidth / 3 - 14, alignItems: 'center', marginBottom: 2 }}
                      onPress={async () => {
                        let response = await fetch(host + 'delicious/search/' + category.subject, {
                          method: 'POST',
                          credentials: 'include',
                          headers: { Accept: 'application/json' },
                        });
                        response = await response.json();
                        this.setState({ bar: 'category', category: category.subject, products: response });
                      }}>
                      <Image style={{ width: screenWidth / 3 - 14, height: screenWidth / 4.8 }} source={category.image}/>
                      <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}>{category.subject}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Image source={require('./assets/img/cdn/package.jpg')} blurRadius={ Platform.OS == 'ios' ? 0 : 0 } style={{ width: screenWidth, height: screenWidth * 9 / 16 }}/>
                <View style={{ backgroundColor: 'white', margin: screenWidth / 5, padding: 9, borderRadius: 9, marginTop: -screenWidth / 2 - 7}}>
                  <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}>همه بسته‌های لذیذستونی</Text>
                  <View style={{flexDirection: 'row-reverse'}}>
                    <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 9, marginRight: 4, marginLeft: 6 }}></View>
                    <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}>دردمای زیر ۴درجه وکیوم می‌شن</Text>
                  </View>
                  <View style={{flexDirection: 'row-reverse', marginTop: -1}}>
                    <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 9, marginRight: 4, marginLeft: 6  }}></View>
                    <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}>ازچندین مرحله کنترل‌کیفی عبور می‌کنن</Text>
                  </View>
                  <View style={{flexDirection: 'row-reverse', marginTop: -1}}>
                    <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 9, marginRight: 4, marginLeft: 6  }}></View>
                    <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 14, color: '#373747', marginBottom: 5 }}> و بدون مواد نگهدارنده و افزودنی به‌دست شما می‌رسن</Text>
                  </View>
                </View>
                {this.carousel(this.state.home.carousels[1].products, this.state.home.carousels[1].subject)}
                <View style={{ height: 20 }}/>
              </ScrollView>
            ) : this.state.bar == 'menu' ? (
              <View style={{ flex: 1, marginTop: 0, backgroundColor: '#fff' }}>
                <TouchableOpacity style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
                  onPress={() => {this.setState({bar: 'home'})}}>
                  <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></View>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> لذیذستون </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}>
                  <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></View>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> پیام‌ها </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'contact_us'}))}>
                  <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></View>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> تماس‌به‌ خدمت‌گذار شما </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row-reverse', padding: 14, paddingRight: 6}}>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> آشپزی با عشق </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row-reverse', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'vision'}))}>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> شعار‌ ما </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row-reverse', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'mission'}))}>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> برنامه‌های ما </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
                  onPress={() => (this.setState({bar: 'page', page: 'subscribe'}))}>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> می‌شه با دوستات دوست ‌شم </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row-reverse', borderBottomWidth: .5, borderBottomColor: '#a7a7b7', padding: 14, paddingRight: 6}}
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
                  <View style={{ borderRadius: 5, width: 5, height: 5, backgroundColor: '#DE3136', marginTop: 12, marginRight: 6 }}></View>
                  <Text style={{ fontFamily: 'iran-sans', color: '#373747' }}> { this.state.authorized ? 'خروج' : 'ورود، ثبت‌نام'} </Text>
                </TouchableOpacity>
              </View>
            ) : this.state.bar == 'profile' ? (
              <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 7, paddingLeft: 10, paddingRight: 10 }}>
                  <TouchableOpacity onPress={() => {this.setState({bar: this.state.profileEditing ? 'profile' : 'home', product: null, profileEditing: false})}}>
                    <Image style={{width: 28, height: 28, margin: 4}} source={require('./assets/img/back-1.png')}/>
                  </TouchableOpacity>
                  <Text style={{ fontFamily: 'iran-sans-bold', color: '#373747', fontSize: 22 }}>لذیذستون</Text>
                  {
                    this.state.profileEditing ? (<View style={{width: 32, height: 32}}/>) : (
                      <TouchableOpacity onPress={() => {this.setState({profileEditing: true})}}>
                        <Image style={{width: 32, height: 32}} source={require('./assets/img/edit-profile-0.png')}/>
                      </TouchableOpacity>
                    )
                  }
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('./assets/img/avatar.jpg')} style={{ width: screenWidth / 2, height: screenWidth / 2, borderRadius: screenWidth / 4, marginTop: -screenWidth / 3.2 }}/>
                  <Text style={{ backgroundColor: this.state.profileEditing ? '#f7f7f7' : '#fff', borderRadius: 9, paddingLeft: 9, paddingRight: 9, fontFamily: 'iran-sans', fontSize: 20, color: this.state.profileEditing ? '#DE3136' : '#373747', marginTop: 10 }} onPress={() => {
                    let dialog = this.state.dialog;
                    dialog.field = 'username';
                    dialog.title = 'انتخاب نام‌کاربری';
                    dialog.description = 'نام‌کاربری جدیدتان را وارد کنید';
                    dialog.shown = true;
                    this.setState({dialog});
                  }}>{ this.state.user.username }</Text>
                  <Text style={{ fontFamily: 'iran-sans-bold', fontSize: 15, color: '#373747', marginTop: 6 }} onPress={() => {
                    let dialog = this.state.dialog;
                    dialog.field = 'family';
                    dialog.title = 'تعداد';
                    dialog.description = 'تقریباً برای چندنفر آشپزی می‌کنید';
                    dialog.shown = true;
                    this.setState({dialog});
                  }}>خانواده<Text style={{ color: '#DE3136', fontFamily: 'iran-sans', fontSize: 20, textDecorationLine: this.state.profileEditing ? 'underline' : 'none', }}>  {this.farsify(this.state.user.family)}</Text>نفره</Text>
                  <Text style={{ fontFamily: 'iran-sans', marginTop: 6, backgroundColor: this.state.profileEditing ? '#f7f7f7' : '#fff', color: this.state.profileEditing ? '#DE3136' : '#373747', borderRadius: 9, paddingLeft: 9, paddingRight: 9,}} onPress={() => {
                    let dialog = this.state.dialog;
                    dialog.field = 'phone';
                    dialog.title = 'شماره‌تماس جدید';
                    dialog.description = 'موبایلتان را وارد کنید';
                    dialog.shown = true;
                    this.setState({dialog});
                  }}> {this.farsify(this.state.user.phone)} </Text>
                  <TouchableOpacity onPress={() => {this.setState({bar: 'location'}); }} style={{ flexDirection: 'row-reverse', marginRight: 24, marginTop: this.state.profileEditing ? 10 : 1 }}>
                    <View style={{ backgroundColor: this.state.profileEditing ? '#DE3136' : '#fff', padding: 4.5, paddingTop: 5, paddingBottom: 5, marginTop: -5, borderRadius: 20 }}>
                      <Image style={{width: 24, height: 24 }} source={this.state.profileEditing ? require('./assets/img/marker-white.png') : require('./assets/img/marker.png')}/>
                    </View>
                    <Text style={{ fontFamily: 'iran-sans'}}> {this.state.user.address} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : this.state.bar == 'page' ? (
              <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                <Text style={{ fontFamily: 'iran-sans-bold', color: '#373747', fontSize: 16, width: screenWidth, textAlign: 'center' }}>
                  {this.state.page == 'subscribe' ? '' : 'به‌نام خدا'}
                </Text>
                {
                  this.state.page == 'contact_us' ? (
                    <View style={{ paddingTop: 30 }} >
                      <Text style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, textAlign: 'center' }}>شماره‌های تماس مااینجاست. تاکنون با نظرات دوستان و پاسخ‌گویی به نیازاتشان به این‌جا رسیده‌ایم. برای‌ما نظرات شما حکم طلایی را دارد که سیستم را به جلو پیش می‌برد و آن‌را ارتقاع می‌دهد.</Text>
                      <TouchableOpacity style={{ backgroundColor: '#DE3136', alignSelf: 'center', padding: 30, paddingTop: 9, paddingBottom: 8, borderRadius: 9}} onPress={() => {Linking.openURL('tel://09133657623')}}>
                        <Text style={{ fontFamily: 'iran-sans-bold', color: '#fffffe', fontSize: 15 }}>۰۹۱۳۳۶۵۷۶۲۳</Text>
                      </TouchableOpacity>
                    </View>
                  ) : this.state.page == 'mission' ? (
                    <View style={{ paddingTop: 30, alignItems: 'center' }} >
                      <Image source={require('./assets/img/quality.jpg')} style={{ width: screenWidth / 1.57, height: screenWidth / 2 }}/>
                      <Text style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, paddingBottom: 0, paddingTop: 30, textAlign: 'center' }}>محصولات پروتئینی خیلی حساسن. با آزمایشات ساده زیستی میشه فهمید که اگه شرایط نگه‌داری خوب‌نباشن به غذای ما و درنتیجه به سلامتی ما آسیب میرسونن. آیا میتونیم سلامتی گوشتمون را بهبود ببخشیم. این چالش همیشگی ماست</Text>
                      <Text style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, paddingTop: 10, textAlign: 'center' }}>با سه چیز ساده میشه کنترل محصول پروتئینی را چک کرد. دماسنج و پی‌اچ متر و پردازش تصویری از ظاهر گوشت. این مورد علاقه ماست که بتوانیم سلامت تک‌تک سفارشات را چک کنیم و به سفارش‌دهنده اطلاع دهیم</Text>
                      {/* <TouchableOpacity style={{ backgroundColor: '#DE3136', alignSelf: 'center', padding: 30, paddingTop: 9, paddingBottom: 8, borderRadius: 9}} onPress={() => {this.setState({bar: 'page_contact_us'})}}>
                        <Text style={{ fontFamily: 'iran-sans-bold', color: '#fffffe', fontSize: 15 }}>تماس‌باما</Text>
                      </TouchableOpacity> */}
                    </View>
                  ) : this.state.page == 'vision' ? (
                    <View style={{ paddingTop: 30 }} >
                      <Text style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, textAlign: 'center' }}>شاید بتونیم پیشرفت ایران عزیزمونو از پیشترفت محصولات پروتئینیمونی که می‌خوریم شروع‌کنیم</Text>
                      {/* a youtube link or embedded */}
                    </View>
                  ) : (
                    <View style={{ paddingTop: 45 }} >
                      <Text style={{ fontFamily: 'iran-sans', color: '#373747', padding: 40, textAlign: 'center' }}>شماره‌های تماس مااینجاست. تاکنون با نظرات دوستان و پاسخ‌گویی به نیازاتشان به این‌جا رسیده‌ایم. برای‌ما نظرات شما حکم طلایی را دارد که سیستم را به جلو پیش می‌برد و آن‌را ارتقاع می‌دهد.</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity style={{}} onPress={() => {Linking.openURL('tel://09133657623')}}>
                          <Image style={{width: 82, height: 82, marginTop: -9}} source={require('./assets/img/whatsapp.png')}/>
                          <Text style={{ alignSelf: 'center', fontFamily: 'iran-sans-bold', fontSize: 10, marginTop: -8, color: '#5ABA9E' }}>واتس‌اپ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => {Linking.openURL('tel://09133657623')}}>
                          <Image style={{width: 64, height: 64}} source={require('./assets/img/instagram.png')}/>
                          <Text style={{ alignSelf: 'center', fontFamily: 'iran-sans-bold', fontSize: 10, marginTop: 2, color: '#FE697B' }}>اینستاگرام</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                }
              </View>
            ) : this.state.bar == 'map' || this.state.bar == 'location' ? (
              <View style={{ flex: 1 }}>
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
                  <UrlTile urlTemplate={`http://${server_ip}:5500/{z}/{x}/{y}.png`} maximumZ={19} flipY={false} />
                  {/* <LocalTile pathTemplate={`http://${server_ip}:5500/{z}/{x}/{y}.png`} size={256}/> */}
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
                      <View style={{
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
                        <View style={{ backgroundColor: '#34374755', borderRadius: 3, marginBottom: 5, marginTop: -15 }}>
                          <Text style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13, marginBottom: -5, marginTop: -2, marginLeft: 4, marginRight: 4}}>{this.farsify(this.state.biker.temperature)} C°</Text>
                        </View>
                        <View style={{
                          width: 16,
                          height: 16,
                          backgroundColor: '#3F86F5',
                          borderRadius: 8,
                          borderWidth: 2,
                          marginBottom: 5,
                          borderColor: 'white'
                        }}/>
                        <View style={{ backgroundColor: '#34374725', borderRadius: 3, marginBottom: -10, marginTop: 0 }}>
                          <Text style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13, marginBottom: -5, marginTop: -2, marginLeft: 4, marginRight: 4}}>دما</Text>
                        </View>
                      </View>
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
                    <View>
                      <View style={{
                        width: 16 * 4,
                        height: 16 * 4,
                        backgroundColor: '#3F86F525',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#343747',
                        borderWidth: 3,
                        borderRadius: 16 * 2,
                      }}>
                        <View style={{
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
                          <Text style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -2, fontSize: 11 }}>{ this.state.user.username }</Text>
                        </View>
                      </View>
                      <View style={{ width: 4, height: 16, backgroundColor: '#343747', marginLeft: 2 * 16 - 2, marginTop: -2, borderRadius: 4 }}></View>
                      <View style={{ width: 12, height: 10, backgroundColor: '#34374764', borderRadius: 8, borderWidth: 1, borderColor: '#343747b8', marginLeft: 2 * 16 - 6, marginTop: -6 }}></View>
                    </View>
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
                    <View>
                      <View style={{
                        width: 16 * 4,
                        height: 16 * 4,
                        backgroundColor: '#3F86F525',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#343747',
                        borderWidth: 3,
                        borderRadius: 16 * 2,
                      }}>
                        <View style={{
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
                          <Text style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -2, fontSize: 11 }}>{ 'لذیذستون' }</Text>
                        </View>
                      </View>
                      <View style={{ width: 4, height: 16, backgroundColor: '#343747', marginLeft: 2 * 16 - 2, marginTop: -2, borderRadius: 4 }}></View>
                      <View style={{ width: 12, height: 10, backgroundColor: '#34374764', borderRadius: 8, borderWidth: 1, borderColor: '#343747b8', marginLeft: 2 * 16 - 6, marginTop: -6 }}></View>
                    </View>
                  </MapView.Marker>
                  }
                </MapView>
                { this.state.bar == 'location' ? (
                  <View style={{ position: 'absolute', width: screenWidth }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                      <TextInput style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 12, paddingTop: 7, paddingBottom: 8, margin: 10, textAlign: 'center', fontFamily: 'iran-sans'}} placeholder='جست‌جوی محله سکونت'
                        onChangeText={async (text) => {
                          if (text.length < 2) return;
                          let response = await fetch(host + 'geo/search?q=' + text, {
                            method: 'GET',
                            credentials: 'include',
                            headers: { Accept: 'application/json' },
                          });
                          this.setState({locations: await response.json()})
                        }}>{ this.state.location }</TextInput>
                    </View>
                    <ScrollView style={{ borderRadius: 12, backgroundColor: 'white', margin: 10, marginTop: 2 }}>
                      {this.state.locations.map((location, idx) =>
                        <Text key={idx} style={{ flex: 1, color: '#343747', fontFamily: 'iran-sans', borderBottomColor: '#f1f1f2', borderBottomWidth: .5, paddingTop: 5, paddingBottom: 6, paddingRight: 12 }} onPress={() => {
                          let d_lat = 0.1922;
                          let d_lng = 0.0821;
                          this.map.animateToRegion({
                            latitude: location.coordination.latitude,
                            longitude: location.coordination.longitude,
                            latitudeDelta: d_lat / 8,
                            longitudeDelta: d_lng / 8,
                          });
                          this.setState({locations: [], location: location.location});
                        }}>{location.location}</Text>
                      )}
                    </ScrollView>
                  </View>
                ) : null }
                { this.state.bar == 'location' &&
                  <TouchableOpacity style={{ position: 'absolute', left: screenWidth / 2 - 16 * 2, top: screenHeight / 2 - 32 - 16 * 2 - 8 }} onPress={async () => {
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
                    <View style={{
                      width: 16 * 4,
                      height: 16 * 4,
                      backgroundColor: '#3F86F525',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#343747',
                      borderWidth: 3,
                      borderRadius: 16 * 2,
                    }}>
                      <View style={{
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
                        <Text style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -2, fontSize: 11 }}>{ this.state.located ? 'انتخاب' : 'زوم' }</Text>
                      </View>
                    </View>
                    <View style={{ width: 4, height: 16, backgroundColor: '#343747', marginLeft: 2 * 16 - 2, marginTop: -2, borderRadius: 4 }}></View>
                    <View style={{ width: 12, height: 10, backgroundColor: '#34374764', borderRadius: 8, borderWidth: 1, borderColor: '#343747b8', marginLeft: 2 * 16 - 6, marginTop: -6 }}></View>
                  </TouchableOpacity>
                }
                { this.state.bar == 'map' ? (
                  <View style={{ backgroundColor: 'white', borderTopWidth: .5, borderTopColor: '#E6E7Ea', paddingTop: 3, paddingRight: 4, paddingLeft: 4 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Text style={{ color: '#3F86F5', fontFamily: 'iran-sans-light', fontSize: 13, marginTop: 6 }}>مسافت { this.farsify(2100) } متر</Text>
                      <Text style={{ color: '#343747', fontFamily: 'iran-sans', fontSize: 15, }} onPress={() => this.setState({bar: 'location'})}>اصفهان, {this.state.user.address} - </Text>
                    </View>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                      <View>
                        <Text style={{ color: '#343747', fontFamily: 'iran-sans', fontSize: 16, marginTop: 4, marginRight: 8}}>{this.farsify((this.state.order.products.map(product => (product.price * [200, 450, 1100, 2650, 6400][product.quantity])).reduce((a, b) => a + b, 0.0) / 100000 + this.state.adp / 1000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} تومان<Text style={{ fontFamily: 'iran-sans-light', color: '#643777', fontSize: 13 }}>  شامل { this.farsify((this.state.adp / 1000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) } تومان هزینه ‌دلیوری</Text></Text>
                        <Text style={{ color: '#343747', fontFamily: 'iran-sans-light', fontSize: 13, marginTop: 2, marginRight: 7}}>{this.state.order.payed ? '۴ دقیقه تا رسیدن پیک' : "نفر" + this.farsify(this.state.q) + "ام درصف"}</Text>
                      </View>
                      { !this.state.order.payed &&
                      <TouchableOpacity style={{ height: 64, width: 64, borderRadius: 48, backgroundColor: '#3F86F5', marginLeft: 12, justifyContent: 'center', alignItems: 'center', marginTop: -15, borderColor: '#34374720', borderWidth: 2 }} onPress={async () => {
                        this.setState({web: host + 'orders/' + this.state.order._id + '/pay?price=' + this.state.order.products.map(product => (product.price * [200, 450, 1100, 2650, 6400][product.quantity])).reduce((a, b) => a + b, 0) / 10});
                      }}>
                        <Text style={{ color: 'white', fontFamily: 'iran-sans-bold', fontSize: 15 }}>خرید</Text>
                      </TouchableOpacity>
                      }
                    </View>
                  </View>
                ) : (
                  <Text style={{ fontFamily: 'iran-sans', color: this.state.located ? '#3FD459' : '#DE3136', marginTop: -14 * 2 - 3, marginBottom: 3, paddingRight: 8 }}>
                    {this.state.located ? 'بسیار خوب. روی علامت را لمس کنید.' : 'زوم کنید و مکانتان را پیدا کنید. تا علامت سبز شود.'}
                  </Text>
                ) }
              </View>
            ) : (
              <View style={{ backgroundColor: '#fff', flex: 1 }}>
                {this.state.bar == 'search' ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', borderBottomWidth: .5, borderBottomColor: '#E6E7Ea'}}>
                    <TextInput style={{ flex: 1, backgroundColor: '#fbfafa', borderRadius: 12, paddingTop: 4, paddingBottom: 4, margin: 10, textAlign: 'center', fontFamily: 'iran-sans'}} placeholder='جست‌جوی لذیذها'
                      onSubmitEditing={async () => {
                        let response = await fetch(host + 'delicious/search?q=' + this.nonState.search, {
                          method: 'POST',
                          credentials: 'include',
                          headers: { Accept: 'application/json' },
                        });
                        response = await response.json();
                        this.setState({ bar: 'search', products: response });
                      }} onChangeText={text => {this.nonState.search = text}}/>
                  </View>
                ) : null}
                <FlatList
                  onMomentumScrollBegin={this.locationHeader}
                  style={{alignSelf: 'stretch', textAlign: 'center', paddingTop: 0, marginTop: 0, backgroundColor: 'f7f7f7'}}
                  data={this.state.products}
                  renderItem={({item, index}) => (this.card(item, true, index))}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )
          }
          { this.state.orderShown && this.state.order.products.length > 0 && this.state.bar != 'map' && this.state.bar != 'location' ? (
            <View style={{ borderTopLeftRadius: 22, borderTopRightRadius: 22, backgroundColor: 'white', marginTop: -30 }}>
              { this.state.order.payed ? (
                null
              ) : (
                <View style={{ borderBottomWidth: .5, borderBottomColor: '#E6E7Ea', flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', flex: .9}} onPress={async () => {
                    this.setState({order: {products: [], payed: false}});
                    await AsyncStorage.removeItem('order');
                  }}>
                    <Text style={{ fontSize: 15, flex: 1, borderRadius: 12, paddingTop: 7, paddingBottom: 6, margin: 10, marginRight: 5, textAlign: 'center', fontFamily: 'iran-sans-bold', borderColor: 'red', borderWidth: .5, color: 'red', backgroundColor: 'white'}}>انصراف</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', flex: 1.1, borderColor: '#3FD459', borderWidth: .5, backgroundColor: 'white', paddingTop: 7, paddingBottom: 6, margin: 10, marginLeft: 5, borderRadius: 12,}} onPress={async () => {
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
                    Animated.timing(
                      this.locationLength, {
                        toValue: 0,
                        duration: 0,
                      }
                    ).start();
                    let route = await fetch(osrm + 'route/v1/car/' + this.state.user.location.longitude + ',' + this.state.user.location.latitude + ';' + this.state.vendor.longitude + ',' + this.state.vendor.latitude + '?steps=true');
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
                    <Text style={{ fontSize: 12, textAlign: 'center', fontFamily: 'iran-sans-bold', color: '#3FD459', marginTop: 4}}>
                      {this.farsify((this.state.order.products.map(product => (product.price * [200, 450, 1100, 2650, 6400][product.quantity])).reduce((a, b) => a + b, 0.0) / 100000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} تومان
                    </Text>
                    <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'iran-sans-bold', color: '#3FD459', marginLeft: 8}}>سفارش</Text>
                  </TouchableOpacity>
                </View>
              ) }
              { this.state.order.payed ? (
                <View>
                  <Image style={{borderTopLeftRadius: 12, borderTopRightRadius: 12, width: screenWidth + 1, height: screenWidth * 9 / 16, margin: 0}} source={require('./assets/img/signal.gif')}/>
                  <Text style={{ fontFamily: 'iran-sans-bold', color: 'white', marginRight: 15, marginBottom: -25 + screenWidth * 9 / 16, marginTop: -screenWidth * 9 / 16 }}>شبکه لذیذستون</Text>
                  <Text style={{ fontFamily: 'iran-sans', color: '#343747', borderBottomColor: '#a4a7b7', borderBottomWidth: .5, padding: 5 }}> سفارشتان را به طور زنده از طریق شبکه لذیذستون یا روی نقشه دنبال کنید. همچنین از همین‌جا اقدام به سفارش جدید نمایید. </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 14 }}>
                    <TouchableOpacity style={{ borderRadius: 40, backgroundColor: '#DE3136', alignSelf: 'flex-end', padding: 9, paddingTop: 0, paddingBottom: 1, marginTop: 0 }}
                      onPress={() => {
                        this.setState({bar: 'map', locationHeader: false, orderShown: false});
                        Animated.timing(
                          this.locationLength, {
                            toValue: 0,
                            duration: 0,
                          }
                        ).start();
                      }}>
                      <Text style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13 }}>درنقشه دنبال‌کنید</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderRadius: 40, backgroundColor: '#DE3136', alignSelf: 'flex-end', padding: 9, paddingTop: 0, paddingBottom: 1, marginTop: 0 }}
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
                      <Text style={{ fontFamily: 'iran-sans-bold', color: 'white', fontSize: 13 }}>سفارش جدید</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <FlatList
                  style={{alignSelf: 'stretch', textAlign: 'center', paddingTop: 4}}
                  data={this.state.order.products}
                  renderItem={this.renderPoint}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) }
            </View>
          ) : null }
        </View>
        <View style={{ backgroundColor: this.state.bar == 'map' || this.state.bar == 'location' ? 'white' : '#FFFFFF', borderTopWidth: .5, borderTopColor: this.state.bar == 'map' || this.state.bar == 'location' ? 'white' : '#E6E7Ea', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8}}>
          <TouchableOpacity onPress={() => {this.setState({bar: 'home', product: null})}}>
            <Image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 8}} source={require('./assets/img/chicken-face.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({bar: 'menu', product: null, locationHeader: false});
            Animated.timing(
              this.locationLength, {
                toValue: 0,
                duration: 0,
              }
            ).start();
          }}>
            <Image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 6}} source={require('./assets/img/menu.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({orderShown: !this.state.orderShown})}}>
            <View style={{width: 36 * 1.8, height: 36 * 1.8, backgroundColor: '#343747', borderRadius: 500, marginBottom: -36 * .3, marginTop: -36 * .3, padding: .3 * 36}}>
              { this.state.order.products.length > 0 ? (
                <Text style={{ color: 'white', fontFamily: 'iran-sans', marginTop: -10, marginBottom: -13, textAlign: 'center', fontSize: 16 }}>{this.farsify(this.state.order.products.length)}</Text>
              ) : null}
              <Image style={{width: 32, height: 32, marginRight: 3, marginLeft: 3, marginTop: 6, marginBottom: 8}} source={this.state.order.payed ? require('./assets/img/cart-tick-white.png') : require('./assets/img/cart-white.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.setState({bar: 'search', product: null})}}>
            <Image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 8}} source={require('./assets/img/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.setState({bar: this.state.authorized ? 'profile' : 'login', profileEditing: false, product: null, locationHeader: false});
            Animated.timing(this.locationLength, {
              toValue: 0,
              duration: 0,
            }).start();
          }}>
            <Image style={{width: 32, height: 32, marginRight: 3, marginLeft: 4, marginTop: 6, marginBottom: 8}} source={require('./assets/img/profile.png')} />
            <View style={{ backgroundColor: '#DE3136', height: 4, width: 4, borderRadius: 2, marginTop: -9, marginLeft: 29 }}/>
          </TouchableOpacity>
        </View>
        <Dialog.Container visible={this.state.dialog.shown}>
          <Dialog.Title>{this.state.dialog.title}</Dialog.Title>
          <Dialog.Description>{this.state.dialog.description}</Dialog.Description>
          <Dialog.Input label="ورودی" onChangeText={(text) => this.nonState[this.state.dialog.field] = text}/>
          <Dialog.Button label="انصراف" onPress={() => {this.state.dialog.shown = false; this.setState({dialog: this.state.dialog})}}/>
          <Dialog.Button label="اعمال" onPress={async () => {
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
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
