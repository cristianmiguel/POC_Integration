// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    // Private keys (only available server-side)
    // Public keys (exposed to client)
    public: {
      contentful: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.CONTENTFUL_ENVIRONMENT || 'master'
      },
      algolia: {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        applicationId: process.env.ALGOLIA_APP_ID,
        indexName: process.env.ALGOLIA_INDEX_NAME || 'algolia_apparel_sample_dataset',
        lite: true,
        cache: false,
        instantSearch: {
          theme: 'algolia'
        },
        docSearch: {},
        recommend: "",
        globalIndex: "",
        useFetch: false
      }
    }
  },

  typescript: {
    strict: true,
    typeCheck: false  // Disabled to avoid vite-plugin-checker issues
  },

  app: {
    head: {
      title: 'eCommerce Store',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Modern eCommerce experience powered by Vue, Contentful, and Algolia' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/styles/main.css']
})
