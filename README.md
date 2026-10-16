nuxt3-utc-bucket
===

Nuxt3 で、pages・layouts・middleware・plugins・i18n を試すやつ。
[nuxt-utc-bucket](https://github.com/yuu-eguci/nuxt-utc-bucket) の Nuxt3 版。コード内の学びノートも残してあるよ。

- Docker: 対応!
- Node.js: 24 / Yarn: 1.22!
- Nuxt: 3.21 / Vuetify: 3.13 / @nuxtjs/i18n: 10!
- Linter: ESLint 10!
- Test: Vitest 5 + Chromium!

## パッと実行してみたい

```bash
cp ./local.env ./.env
docker compose up
```

最初は依存のインストールで少し待ってね。

- http://localhost:3005/ --> トップページ。Sample ボタンでサンプルへ。
- http://localhost:3005/sample --> カード・ボタン・英語 / 日本語の切り替え。

開発サーバは手元からだけアクセスできる設定。止めるときは `docker compose down`。

## テストとか

別のターミナルからコンテナへ入る。

```bash
docker compose exec nuxt3-service sh

yarn lint
yarn typecheck
yarn test
yarn test:e2e
```

`test:e2e` はアプリをビルドして、本物の Chromium で画面を操作する。
自動修正なら `yarn lint:fix`、テストを見張るなら `yarn test:watch`。

`node_modules` はコンテナ用なので、ホスト側で `yarn` を実行しないでね。
メモリが厳しいときは開発サーバを止めて、`docker compose run --rm nuxt3-service yarn test:e2e` で実行。

## GitHub Pages 用にビルドする

```bash
docker compose run --rm nuxt3-service sh -c 'set -a; . ./.github-pages.env; set +a; yarn generate'
```

`.output/public/` に静的サイトができる。`/nuxt3-utc-bucket/` 配下で配信する設定だよ。
開発サーバと同時にビルドするとメモリ不足になることがあるので、そのときは先に `docker compose stop`。

`main` に push すると、CI で lint・型・単体テスト・ブラウザテスト・静的ビルドを確認。
成功したコミットだけ、既存の GitHub Pages に公開する。

## 環境変数

- `local.env` --> 手元用。`.env` にコピーして使う。`.env` はコミットしない。
- `.github-pages.env` --> Pages 用のパス設定。
- `ROUTER_BASE` --> 配信するパス。
- `APP_VERSION` --> トップの footer に表示。Pages では公開したコミットの短い SHA。
- `NUXT_API_SECRET` --> サーバ専用の設定例。既定は空。秘密の値をコードに書かない。

## 学びノート

- `yarn generate` は HTML を先に作る SSG。ブラウザ側でも動くけど、ビルド中にもページの処理が走る。
- `utils/Foo.ts` と `utils/Bar.ts` の同名 export は、auto-import の重複を試すためのもの。warning は意図どおり。
- `nuxt.config.ts`・`pages/sample.vue`・`layouts/sampleLayout.vue`・`plugins/debugLog.ts` に使い方のメモがある。
- 開発・ビルド用の依存には `yarn audit` の指摘が残っている。全部解消したわけではないよ。
