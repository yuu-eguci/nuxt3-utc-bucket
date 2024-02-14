// NOTE: 参考↓
//       https://nuxt.com/docs/guide/directory-structure/plugins
//       > Nuxt automatically reads the files in the plugins/ directory and loads them at the creation of the Vue application.
// こういう風に使う↓
// const { $debug } = useNuxtApp()
// $debug({variants})
export default defineNuxtPlugin(nuxtApp => {
  // プラグインに渡される唯一の引数は nuxtApp。

  // 開発環境でのみ console.info を実行する `debug` 関数を提供。
  const debug = (...args: any[]) => {
    // Nuxt 3 では `context.isDev` が `process.dev` に変更されているらしい。
    if (process.dev) {
      console.info(...args)
    }
  }

  // `debug` 関数を inject する。
  nuxtApp.provide('debug', debug)

  // NOTE: 以下のようにしても、同じ効果があるらしい。
  //       なんか nuxtApp.provide のほうが直感的かなあと思ったのでそっちにしました。
  // return {
  //   provide: {
  //     debug
  //   }
  // }
})

// NOTE: script setup の中で使うぶんには問題ないんだけれど、
//       middleware の中とかで使うときは `'$debug' is of type 'unknown'. ts(18046)` が出ちゃう。
//       それを解消するために type を追加している。
//       `.d.ts` に書こう、みたいな向きもあったけれど、
//       $debug を使うってことはこのファイルを絶対見るんだからここでよくね? って感じ。
declare module '#app' {
  interface NuxtApp {
    $debug: (...args: any[]) => void;
  }
}
