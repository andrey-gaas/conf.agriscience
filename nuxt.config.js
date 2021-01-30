export default {
  head: {
    title: 'III Международный библиографический конгресс «Библиографическая информация в цифровой культуре» ГПНТБ СО РАН',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Приглашаем вас принять участие в III Международном библиографическом конгрессе, который состоится 27 – 29 апреля 2021 года. Впервые Конгресс пройдет в онлайн-формате.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Arsenal:wght@400;700&family=Ubuntu:wght@300;400;700&display=swap' },
    ]
  },
  
  css: [
    'bootstrap-css-only/css/bootstrap.min.css',
    'mdbvue/lib/css/mdb.min.css',
    { src: '~/assets/style/theme.scss', lang: 'scss' },
    { src: '~/assets/style/main.scss', lang: 'scss' }
    
  ],
  
  plugins: [
    { src: '~/plugins/vue-material' },
    { src: '~/plugins/Vuelidate' },
  ],
  
  components: true,
  
  loading: {
    color: '#82d8d5',
    height: '5px'
  },

  buildModules: [
  ],
  
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
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
  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    
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
  server: {
    host: '0.0.0.0',
    port: 3101
  },
}
