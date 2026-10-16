nuxt3-utc-bucket
===

✌🏽✌🏽 Docker + Yarn + Nuxt3 + TypeScript + Vuetify + GitHub Pages + Copy of nuxt-utc-bucket

Nuxt3 の SPA を使いこなせるようになるため、 nuxt-utc-bucket のコピーを Nuxt3 で作る学習用リポジトリだよ。
pages / layouts / middleware / plugins / i18n のサンプルと、学びノート (コード内の NOTE / DOC コメント) を置いてある。

- Docker: 対応! (node:24-alpine, Yarn 1.22)
- Node.js: 24!
- Linter: ESLint 10 + @nuxt/eslint (flat config, stylistic)!
- Test: Vitest 5 + @nuxt/test-utils + happy-dom (unit) / Chromium (e2e)!
- Nuxt: 3.21!
- Vuetify: 3.13 (vuetify-nuxt-module 1.0.0-rc)!
- @nuxtjs/i18n: 10!

## パッと実行してみたい

```bash
cp ./local.env ./.env && docker compose up
# --> http://localhost:3005/ で NuxtWelcome、 http://localhost:3005/sample でサンプルページが開く。
#     初回は yarn install が走るので少し待ってね。
```

- `/` : Vuetify の dark theme レイアウト (`layouts/utcBucketLayout.vue`) + `<NuxtWelcome />`
- `/sample` : Vuetify の card / button、 ref / reactive、 i18n の切り替え (en / ja) のサンプル
- ページ遷移のたびに `middleware/global-middleware.global.ts` が `$debug` でブラウザの console にログを出す (dev のときだけ)

## 開発コマンド

```bash
# コンテナの中に入って作業する。
docker compose exec nuxt3-service sh

yarn lint          # ESLint (--fix したいときは yarn lint:fix)
yarn typecheck     # vue-tsc による型チェック
yarn test          # Vitest の unit テスト (watch したいときは yarn test:watch)
yarn test:e2e      # アプリをビルドして Chromium で開く e2e テスト (test/e2e)
yarn generate      # 静的サイトを ./.output/public に生成 (./dist はコンテナ内向けの symlink。 GitHub Pages 用は下を参照)
```

```bash
# GitHub Pages 用 (ROUTER_BASE=/nuxt3-utc-bucket/) の静的ビルドを手元で確認する。
# 出力先は ./.output/public (./dist はそこへの symlink)。
docker compose exec nuxt3-service sh -c 'env $(grep -v "^#" ./.github-pages.env | xargs) yarn generate'

# Pages と同じく /nuxt3-utc-bucket/ 配下で配信してブラウザで見る (ホスト側で実行)。
mkdir -p /tmp/pages && ln -sfn "$PWD/.output/public" /tmp/pages/nuxt3-utc-bucket
python3 -m http.server 3006 -d /tmp/pages   # --> http://localhost:3006/nuxt3-utc-bucket/
```

## CI / CD

- `ci.yml` : main への push と PR で lint / typecheck / test / e2e / generate を回す。
- `cd.yml` : main で `ci` が成功したあと (workflow_run) に `yarn generate` し、 `.output/public` を `gh-pages` ブランチへ publish する (GitHub Pages)。手動実行 (workflow_dispatch) もできる。
- `.github-pages.env` が Pages 用の環境変数 (`ROUTER_BASE`) を持っている。

## 環境変数

- `local.env` を `.env` にコピーして使う (開発用)。 `.env` は git 管理外。
- `ROUTER_BASE` : `app.baseURL` に入る。 GitHub Pages ではリポジトリ名のパスになる。
- `NUXT_API_SECRET` : `runtimeConfig.apiSecret` を上書きする (サンプル。デフォルトは空文字で、コードにシークレットは書かない)。

## バージョンを確認したいとき

```bash
# NOTE: yarn classic の --pattern は正規表現ではなく部分一致 (glob) なので、こう書く。
docker compose exec nuxt3-service sh -c 'node --version; yarn --version; yarn list --pattern "nuxt|vuetify|@nuxtjs/i18n" --depth=0'
```

## 学びノート

- Nuxt3 と TypeScript はやっぱなんか不安定な気がする。なんか謎のエラーがでたら、まずは `yarn dev` を再起動してみよう。
- `utils/Foo.ts` と `utils/Bar.ts` が両方 `Foo` を export しているのは、 auto-import の重複がどう扱われるかを見るためのサンプル (warning が出るのは仕様)。
- `nuxt.config.ts`, `pages/sample.vue`, `layouts/sampleLayout.vue`, `plugins/debugLog.ts` に Nuxt2 → Nuxt3 の対応メモがある。
