
// Configuration for your app

module.exports = function (ctx) {
  return {
    preFetch: true,
    // --> boot files are part of "main.js"
    boot: [
      'axios',
      'filters'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      //'fontawesome-v5',
      // 'ionicons-v4',
      // 'mdi-v3',
      
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QFooter',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QTabs',
        'QRouteTab',
        'QAvatar',
        'QSpace',
        'QSelect',
        'QInput',
        'QCheckbox',
        'QDate',
        'QPopupProxy',
        'QToggle',
        'QChip',
        'QDialog',
        'QNoSsr',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QImg',
        'QSeparator',
        'QList',
        'QItem',
        'QItemSection',
        'QMenu',
        'QBadge',
        'QInnerLoading',
        'QSpinnerGears',
        'QTab',
        'QExpansionItem',
        'QScrollArea'
      ],

      directives: [
        'Ripple',
        'ClosePopup',
        'TouchSwipe'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Meta'
      ],
      config: {
        notify: {
          color:'primary',
          classes:'notify',
          timeout:"1300",
          position:'center'          
        }
      }        

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      gzip: true,
      // analyze: true,
      extractCSS: false,
      extendWebpack (cfg) {
      }
    },

    devServer: {
      // https: true,
      port: parseInt(process.env.PORT),
      open: false,
      proxy: {
        '/api': {
          target: "http://localhost:5050/",
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }      
    },

    // animations: 'all', // --- includes all animations
    //animations: [],

    ssr: {
      pwa: false,
      /*
      componentCache: {
        max: 0,
        maxAge: 80000//900000
      },      
      */
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        /*
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
        */
      }
    },


  }
}
