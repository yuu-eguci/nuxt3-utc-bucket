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

- `/` : Vuetify の dark theme レイアウト (`layouts/utcBucketLayout.vue`, footer に `APP_VERSION`) + `<NuxtWelcome />`。 app bar の Sample ボタンで `/sample` へ (NuxtLink)
- `/sample` : Vuetify の card / button、 ref / reactive、 i18n の切り替え (en / ja) のサンプル
- ページ遷移のたびに `middleware/global-middleware.global.ts` が `$debug` でブラウザの console にログを出す (dev のときだけ)

## 開発コマンド

```bash
# コンテナの中に入って作業する。
# NOTE: node_modules はコンテナ (Linux) 用にインストールされているので、ホスト側で yarn は実行しない。
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
# NOTE: Docker のメモリが少ないと dev server と同時に走らせて SIGKILL されることがある。
#       そのときは `docker compose stop` してから `docker compose run --rm nuxt3-service sh -c '...'` で実行する。
docker compose exec nuxt3-service sh -c 'set -a; . ./.github-pages.env; set +a; yarn generate'

# Pages と同じく /nuxt3-utc-bucket/ 配下で配信してブラウザで見る (ホスト側で実行)。
mkdir -p /tmp/pages && ln -sfn "$PWD/.output/public" /tmp/pages/nuxt3-utc-bucket
python3 -m http.server 3006 -d /tmp/pages   # --> http://localhost:3006/nuxt3-utc-bucket/
```

## CI / CD

- `ci.yml` : main への push と PR で lint / typecheck / test / e2e / generate を回す。
- `cd.yml` : main への push で `ci` が成功したあと (workflow_run、自リポジトリの push に限定) に、 `ci` が検証したコミットを `yarn generate` して `.output/public` を `gh-pages` ブランチへ publish する (GitHub Pages)。手動実行 (workflow_dispatch) もできる。
- `.github-pages.env` が Pages 用の環境変数 (`ROUTER_BASE`) を持っている。

## 環境変数

- `local.env` を `.env` にコピーして使う (開発用)。 `.env` は git 管理外。
- `ROUTER_BASE` : `app.baseURL` に入る。 GitHub Pages ではリポジトリ名のパスになる。
- `APP_VERSION` : `runtimeConfig.public.appVersion` としてビルド時に取り込まれ、 `/` の footer に表示される (未設定なら `dev`、 GitHub Pages ではデプロイしたコミットの短い SHA)。
- `NUXT_API_SECRET` : `runtimeConfig.apiSecret` を上書きする (サンプル。デフォルトは空文字で、コードにシークレットは書かない)。

## バージョンを確認したいとき

```bash
# NOTE: yarn classic の --pattern は正規表現ではなく部分一致 (glob) なので、こう書く。
docker compose exec nuxt3-service sh -c 'node --version; yarn --version; yarn list --pattern "nuxt|vuetify|@nuxtjs/i18n" --depth=0'
```

## 依存の脆弱性 (yarn audit)

- `yarn audit` で残っているのは、ビルド/開発ツールの中でしか使われない transitive な依存 (`node-forge` via listhen, `braces` via micromatch) で、修正版が未公開のもの。生成される静的サイトには含まれない。
- transitive な依存を範囲内の最新にしたいときは `yarn.lock` を消して `yarn install` し直す (yarn classic は既存の解決を使い回すため)。

## 学びノート

- Nuxt3 と TypeScript はやっぱなんか不安定な気がする。なんか謎のエラーがでたら、まずは `yarn dev` を再起動してみよう。
- `ssr` はデフォルト (true) のままなので、 `yarn generate` は SSG (generate 時に HTML を作ってブラウザで hydrate する)。 `pages/sample.vue` の created 相当の `$debug` は generate 時にも走る。
- dev server は `127.0.0.1:3005` にだけ bind している (Nuxt DevTools が LAN に見えないように)。
- `utils/Foo.ts` と `utils/Bar.ts` が両方 `Foo` を export しているのは、 auto-import の重複がどう扱われるかを見るためのサンプル (warning が出るのは仕様)。
- `nuxt.config.ts`, `pages/sample.vue`, `layouts/sampleLayout.vue`, `plugins/debugLog.ts` に Nuxt2 → Nuxt3 の対応メモがある。
