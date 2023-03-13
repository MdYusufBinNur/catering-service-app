import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - catering-service-app',
    title: 'catering-service-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // "~layouts/global.css"
    "~layouts/global.css"
  ],
  target: 'static',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/globalPlugins.js',
    '@/plugins/axios.js',
    // '~/plugins/i18n.js',
    '~/plugins/echarts.js',
    // {src: './plugins/echo', mode: 'client'},
    {src: '~/plugins/vue-pdf.js', ssr: false},
    { src: '~plugins/vueEditor.js', mode: 'client', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    "vue-toastification/nuxt",
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          file: 'en-US.js',
          name: 'English'
        }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'en',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root'  // recommended
      }
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://service.gcare.com.bd/api/admin/v1'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          golden: "#a99163"
        },
        light_new: {
          primary: '#3e2c40',
          background: '#E5E5E5',
          accent: '#9b8c99',
          secondary: '#6D7079',
          accentlight: '#E5E5E5',
          secondarylight: '#e8e0eb',
          info: '#00ead6',
          infolight: '#F7F7F7',
          active: '#987da1',
          active2: '#917da1',
          high: '#402c3d',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          tab_active: '#eddeeb',
          tab_active2: '#F2F2F2',
          btn_color: '#4F4F4F',
          card_color: '#f9f6f9',
          golden: "#a99163"

        },
        light: {
          primary: '#2C3040',
          background: '#E5E5E5',
          accent: '#8C8E9B',
          secondary: '#6D7079',
          accentlight: '#E5E5E5',
          secondarylight: '#E0E3EB',
          info: '#00ACEA',
          infolight: '#F7F7F7',
          active: '#7D85A1',
          active2: '#7D85A1',
          high: '#2C3040',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          tab_active: '#DEE2ED',
          tab_active2: '#F2F2F2',
          btn_color: '#4F4F4F',
          card_color: '#F6F7F9',
          golden: "#a99163"

        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: {url: '/admin-login', method: 'post'},
          logout: {url: '/logout', method: 'post'},
          user: {url: '/me', method: 'get'}
        }
      }
    },
    redirect: {
      login: '/auth',
      logout: '/auth',
      callback: '/auth',
      home: '/dashboard'
    }
  },
  router: {},
  server: {
    port: 3001 // default: 3000
  }
}
