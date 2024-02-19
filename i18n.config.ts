// NOTE: @nuxtjs/i18n 公式ページのまま。
//       https://i18n.nuxtjs.org/docs/getting-started/usage
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome'
    },
    ja: {
      welcome: 'よーこそ'
    },
  }
}))
