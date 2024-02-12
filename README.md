nuxt3-utc-bucket
===

✌🏽✌🏽 Docker + Yarn + Nuxt3 + TypeScript + Vuetify + GitHub Pages

- なんか PC に volta が入っていて、 yarn のバージョンだの何だとが面倒くさい。やっぱ Docker がナンバーワンだろうということで。

## Setup

```bash
cp ./local.env ./.env; docker compose up -d; docker compose exec nuxt3-service sh

node --version
# --> v20.11.0

yarn --version
# --> 1.22.19
# NOTE: 今回いちいち Docker にしたのは、ローカル環境の yarn v4 が邪魔だから。

yarn install
yarn dev
# --> http://localhost:3005/ でアクセス。
```
