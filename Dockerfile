# 他の image はこちら https://hub.docker.com/_/node/
# NOTE: Node 20 は 2026-04 で EOL なので、 Active LTS の 24 にしている。
FROM node:24-alpine

WORKDIR /app

# NOTE: このポートを解放する意図である、というドキュメントとして機能するコマンドです。
#       ポートを実際に解放するコマンドではありません。
EXPOSE 3000

# NOTE: ソースは docker-compose.yml で bind mount するので、 image にはコピーしない。
#       依存のインストールと dev server の起動は compose の command でやる。
CMD ["sh", "-c", "yarn install --frozen-lockfile && yarn dev --host 0.0.0.0 --port 3000"]
