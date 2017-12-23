require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en',
      dir: 'ltr'
    },
    title: 'What Did Congress Do Today?',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { hid: 'description', name: 'description', content: 'Find out what votes and activity has Congress done today.' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#293340' },
      { property: 'og:url', content: 'http://whatdidcongressdo.today' },
      { property: 'og:title', content: 'What Did Congress Do Today?' },
      { property: 'og:description', content: 'Find out what votes and activity has Congress done today.' },
      { property: 'og:image', content: 'http://whatdidcongressdo.today/congress.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@njgingrich' },
      { name: 'twitter:title', content: 'What Did Congress Do Today?' },
      { name: 'twitter:description', content: 'Find out what votes and activity has Congress done today.' },
      { name: 'twitter:image', content: 'http://whatdidcongressdo.today/congress.jpg' },
      { property: 'fb:app_id', content: process.env.FB_APPID }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=EB+Garamond|Merriweather' }
    ],
    script: [
      { type: 'text/javascript', src: 'https://connect.facebook.net/en_US/all.js', async: 'true' }
    ]
  },
  router: {
    base: '/'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    dir: 'docs'
  },
  plugins: [
    { src: '~plugins/fb.js' }
  ],
  modules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/dotenv'
  ],
  'google-analytics': {
    id: 'UA-111460974-2'
  }
}
