# 他の image はこちら https://hub.docker.com/_/node/
FROM node:20-alpine

WORKDIR /app

# NOTE: このポートを解放する意図である、というドキュメントとして機能するコマンドです。
#       ポートを実際に解放するコマンドではありません。
EXPOSE 3000
