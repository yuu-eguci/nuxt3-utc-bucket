nuxt3-utc-bucket
===

✌🏽✌🏽 Docker + Yarn + Nuxt3 + TypeScript + Vuetify + GitHub Pages + Copy of nuxt-utc-bucket

- なんか PC に volta が入っていて、 yarn のバージョンだの何だとが面倒くさい。やっぱ Docker がナンバーワンだろうということで。
- Nuxt3 の SPA を使いこなせるようになるため、 nuxt-utc-bucket のコピーを Nuxt3 で作るのが目標だよ。

## Setup

```bash
# やっぱり Docker が最高だよな。
cp ./local.env ./.env; docker compose up -d; docker compose exec nuxt3-service sh

node --version
# --> v20.11.0

yarn --version
# --> 1.22.19
# NOTE: 今回いちいち Docker にしたのは、ローカル環境の yarn v4 が邪魔だから。

yarn list nuxt
# └─ nuxt@3.10.1
yarn list vuetify
# └─ vuetify@3.5.3
# NOTE: warning が出るけど、それは完全一致検索を欠く yarn list が悪い。

yarn install
yarn dev
# --> http://localhost:3005/ でアクセス。
```
