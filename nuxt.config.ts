// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // https://nuxt.com/docs/api/nuxt-config#baseurl
    // Default: '/'
    baseURL: process.env.ROUTER_BASE || '/',

    // https://nuxt.com/docs/getting-started/seo-meta
    head: {
      title: 'Nuxt3 UTC Bucket',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${process.env.ROUTER_BASE}favicon.ico` },
      ],
    }
  },

  devtools: { enabled: true }
})
