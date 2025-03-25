// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  vite: {  
    server: {
      hmr: {
        clientPort: 3000,
      },
    },
  },
  ssr: false,
  app: {
    // pageTransition: { name: 'fade', mode: 'out-in' },

    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Study In Uzbekistan',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `/favicon.svg`,
        },
      ],
      script: [
        {
          src: 'https://code.responsivevoice.org/responsivevoice.js?key=WHfxLRwD',
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-172842766-1',
          defer: true,
        },
        // START WWW.UZ TOP-RATING
        {
          type: 'text/javascript',
          innerHTML: `top_js = '1.0'
            top_r =
              'id=44502&r=' +
              escape(document.referrer) +
              '&pg=' +
              escape(window.location.href)
            document.cookie = 'smart_top=1; path=/'
            top_r += '&c=' + (document.cookie ? 'Y' : 'N')
          `,
        },
        {
          type: 'text/javascript',
          innerHTML: `top_js = '1.0'
            top_js = '1.1'
            top_r += '&j=' + (navigator.javaEnabled() ? 'Y' : 'N')
          `,
        },
        {
          type: 'text/javascript',
          innerHTML: `top_js = '1.0'
            top_js = '1.2'
            top_r +=
              '&wh=' +
              screen.width +
              'x' +
              screen.height +
              '&px=' +
              (navigator.appName.substring(0, 3) == 'Mic'
                ? screen.colorDepth
                : screen.pixelDepth)
          `,
        },
        {
          type: 'text/javascript',
          innerHTML: `        
            top_js = '1.3'
          `,
        },
        {
          type: 'text/javascript',
          innerHTML: `        
            top_rat = '&col=340F6E&t=ffffff&p=BD6F6F'
            top_r += '&js=' + top_js + ''
            document.write(
              '<img src="https://cnt0.www.uz/counter/collect?' +
                top_r +
                top_rat +
                '" width=0 height=0 border=0 />'
            )
          `,
        },
        // END WWW.UZ TOP-RATING
      ],
      meta: [
        {
          // Google Search Console website verification
          name: 'google-site-verification',
          content: 'qYLiO2KZSEk6E1ULJSLwd4016JMO4REWvyMQFtWTyl8',
        },
      ],
    },
  },
  css: ['@/assets/styles/main.css', '@/assets/fonts/fonts.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  routeRules: {
    '/': {
      sitemap: {
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toString('yyyy-mm-ddThh:mm:ss:zzz'),
      },
    },
    '/ru': {
      sitemap: {
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toString('yyyy-mm-ddThh:mm:ss:zzz'),
      },
    },
    '/en': {
      sitemap: {
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date().toString('yyyy-mm-ddThh:mm:ss:zzz'),
      },
    },
  },
  sitemap: {
    exclude: [
      '/profile/**',
      '/profile',
      '/cabinet/**',
      '/cabinet',
    ],
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      {
        label: 'Change Frequency',
        select: 'sitemap:changefreq',
        width: '12.5%',
      },
    ],
  },
  build: {
    transpile: ['vue-toastification'],
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.VITE_API_BASE_URL || 'localhost',
    },
  },
  devServerHandlers: [],
  nitro: {
    serveStatic: true,
  },
  experimental: {
    payloadExtraction: false,
  },
})
