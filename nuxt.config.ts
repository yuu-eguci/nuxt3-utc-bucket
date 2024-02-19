// NOTE: インポートしなくてもグローバルに利用可能。
import { defineNuxtConfig } from 'nuxt/config'

// DOC: このファイルは、カスタムスクリプトの追加、モジュールの登録、レンダリングモードの変更など、ドキュメントでしばしば言及される。
//      ここ↓にオプションが全部ある。
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

  modules: [
    'vuetify-nuxt-module',
    '@nuxt/test-utils/module',
  ],

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },

  typescript: {
    typeCheck: true
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
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },

  // NOTE: Pythonista なので暗黙的な import には反対。
  //       だけれど、これによってコード量を減らすのが Nuxt3 の方針だから、合わせていく。
  // https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports
  imports: {
    autoImport: true
  },

  devtools: { enabled: true }
})
