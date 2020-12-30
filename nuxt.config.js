export default {
  head: {
    title: 'agrisci',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons' },
    ]
  },
  
  css: [
    'bootstrap-css-only/css/bootstrap.min.css',
    'mdbvue/lib/css/mdb.min.css',
    { src: 'vue-material/dist/vue-material.min.css', lang: 'css' },
    { src: '~/assets/style/theme.scss', lang: 'scss' },
    { src: '~/assets/style/main.scss', lang: 'scss' }
    
  ],
  
  plugins: [
    { src: '~/plugins/vue-material' },
    { src: '~/plugins/Vuelidate' },
  ],
  
  components: true,
  
  loading: {
    color: 'blue',
    height: '5px'
  },

  buildModules: [
  ],
  
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: false,
          fallbackLocale: 'en'
        },
      locales: [
        {
          name: 'Russian',
          code: 'ru',
          iso: 'ru-RU',
          file: 'ru.js'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'en-US',
          file: 'en.js'
        },
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ru',
      strategy: 'prefix_except_default',
    }]

  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['vue-material'],
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    },
    extend(config, ctx) {},
    transpile: [
      'mdbvue/lib/components'
    ]
  },
  serverMiddleware: [
    /* { path: '/api/auth/registration', handler: '~/api/auth/registration.js' }, */
    { path: '/api', handler: '~/api' },
  ],
}
