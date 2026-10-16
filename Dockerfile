# 他の image はこちら https://hub.docker.com/_/node/
# NOTE: Node 20 は 2026-04 で EOL なので、 Active LTS の 24 にしている。
FROM node:24-alpine

# NOTE: ブラウザ e2e テスト (yarn test:e2e) 用の Chromium。
#       Playwright は Alpine 向けのブラウザを配布していないので、 apk のものを使う。
#       (test/e2e の setup で executablePath に渡している)
RUN apk add --no-cache chromium
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# NOTE: このポートを解放する意図である、というドキュメントとして機能するコマンドです。
#       ポートを実際に解放するコマンドではありません。
EXPOSE 3000

# NOTE: ソースは docker-compose.yml で bind mount するので、 image にはコピーしない。
#       依存のインストールと dev server の起動は、この CMD でやる。
CMD ["sh", "-c", "yarn install --frozen-lockfile && yarn dev --host 0.0.0.0 --port 3000"]
