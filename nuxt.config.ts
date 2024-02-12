// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // https://nuxt.com/docs/api/nuxt-config#baseurl
    // Default: '/'
    baseURL: process.env.ROUTER_BASE || '/',
  },

  devtools: { enabled: true }
})
