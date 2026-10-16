// NOTE: インポートしなくてもグローバルに利用可能。
import { defineNuxtConfig } from 'nuxt/config'
// NOTE: ufo は Nuxt が依存している URL ユーティリティ。 https://github.com/unjs/ufo
import { withTrailingSlash } from 'ufo'

// DOC: このファイルは、カスタムスクリプトの追加、モジュールの登録、レンダリングモードの変更など、ドキュメントでしばしば言及される。
//      ここ↓にオプションが全部ある。
// https://nuxt.com/docs/api/configuration/nuxt-config
// NOTE: GitHub Pages ではリポジトリ名がパスの先頭につく (/nuxt3-utc-bucket/) ので、
//       .github-pages.env の ROUTER_BASE で baseURL を切り替えている。
//       favicon の href も同じ値を使わないと、 baseURL 配下に置かれた favicon.ico を見つけられない。
//       Nuxt は app.baseURL の末尾に / を補うので、こちらも withTrailingSlash で揃えている。
const baseURL = withTrailingSlash(process.env.ROUTER_BASE || '/')

export default defineNuxtConfig({
  modules: [
    // NOTE: ESLint の flat config (.nuxt/eslint.config.mjs) を生成してくれるモジュール。
    //       https://eslint.nuxt.com/packages/module
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
  ],

  // NOTE: Pythonista なので暗黙的な import には反対。
  //       だけれど、これによってコード量を減らすのが Nuxt3 の方針だから、合わせていく。
  // https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports
  imports: {
    autoImport: true,
  },

  devtools: { enabled: true },

  app: {
    // https://nuxt.com/docs/api/nuxt-config#baseurl
    // Default: '/'
    baseURL,

    // https://nuxt.com/docs/getting-started/seo-meta
    head: {
      title: 'Nuxt3 UTC Bucket',
      // NOTE: <html lang> は app.vue で useLocaleHead を使ってロケールに追従させている。
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
      ],
    },
  },

  // DOC: Environment Variables and Private Tokens
  //      runtimeConfig API は、環境変数のような値をアプリケーションの残りの部分に公開します
  //      デフォルトでは、これらのキーはサーバサイドでのみ利用可能です。
  //      runtimeConfig.public 内のキーは、クライアントサイドでも利用可能です。
  //      こういう風に↓取得できる。
  //      const runtimeConfig = useRuntimeConfig()
  // DOC: runtimeConfig vs app.config
  //      runtimeConfig: 環境変数を使用してビルド後に指定する必要があるプライベートまたはパブリックトークン。
  //      app.config: ビルド時に決定されるパブリックトークン、テーマのバリエーションやタイトルなどのウェブサイト設定、
  //                  機密性のないプロジェクト設定。
  runtimeConfig: {
    // The private keys which are only available server-side
    // NOTE: 値は環境変数 NUXT_API_SECRET で上書きされる (Nuxt が runtimeConfig のキー名から自動で読む)。
    //       プレースホルダでもコードにシークレットは書かないよう、デフォルトは空文字にしている。
    //       https://nuxt.com/docs/guide/going-further/runtime-config#environment-variables
    apiSecret: '',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api',
      // NOTE: .env (local.env) / .github-pages.env の APP_VERSION をビルド時に取り込んで、 footer に表示している。
      //       (static generate なので、ここで読んだ値がそのまま HTML に焼き込まれる)
      appVersion: process.env.APP_VERSION || 'dev',
    },
  },

  typescript: {
    typeCheck: true,
  },

  eslint: {
    config: {
      // NOTE: インデントやクォートなどのスタイルも ESLint に見てもらう。
      //       https://eslint.nuxt.com/packages/module#stylistic
      stylistic: true,
    },
  },

  i18n: {
    // NOTE: @nuxtjs/i18n v9 以降は i18n/ ディレクトリが基準で、 vueI18n のパスもそこからの相対になる。
    //       https://i18n.nuxtjs.org/docs/getting-started/usage
    //       https://i18n.nuxtjs.org/docs/guide/migrating#upgrading-from-nuxtjsi18n-v8x-to-v9x
    vueI18n: './i18n.config.ts',
    locales: ['en', 'ja'],
    defaultLocale: 'en',
    // NOTE: GitHub Pages の URL を変えたくないので、ロケールを URL の prefix にしない。
    strategy: 'no_prefix',
    // NOTE: detectBrowserLanguage はデフォルトで有効 (初回はブラウザの言語設定から選び、
    //       setLocale で選んだロケールは cookie "i18n_redirected" に保存される)。
    //       https://i18n.nuxtjs.org/docs/guide/browser-language-detection
  },

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      // NOTE: テーマはここで一括設定する (layouts で theme="dark" を書くより、アプリ全体で一貫する)。
      //       https://vuetifyjs.com/en/features/theme/
      theme: {
        defaultTheme: 'dark',
      },
    },
  },
})
