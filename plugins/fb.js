import Vue from 'vue'

Vue.prototype.$initFBSDK = () => {
  // eslint-disable-next-line
  FB.init({
    appId: process.env.FB_APPID,
    xfbml: true,
    version: 'v2.11'
  })
}
