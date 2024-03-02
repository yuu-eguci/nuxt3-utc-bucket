// NOTE: @nuxtjs/i18n 公式ページのまま。
//       https://i18n.nuxtjs.org/docs/getting-started/usage
// NOTE: 導入時に、 VSCode がエラーを出してくることがあった。
//       Cannot find name 'defineI18nConfig'. Did you mean 'defineNuxtConfig'? ts(2552)
//       tsconfig.json に "types": ["@nuxt/types"] を追加することで解決した。
//         "compilerOptions": {
//           "types": [
//               "@nuxtjs/i18n",
//           ]
//         }
//       けど実は、 "extends": "./.nuxt/tsconfig.json" の中でちゃんと
//       "../node_modules/@nuxtjs/i18n/runtime" が読まれており、
//       時間を置いたら VSCode はちゃんとこれらを認識してくれるのかもしれない。
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  // NOTE: 大きくなってきたら、別ファイルに切り出す。
  //       import JA_TRANSLATION from './locales/ja/translation.json';
  messages: {
    en: {
      welcome: 'Welcome'
    },
    ja: {
      welcome: 'よーこそ'
    },
  }
}))
