// NOTE: e2e (ブラウザ) テスト用の Vitest 設定。 `yarn test:e2e` で使う。
//       @nuxt/test-utils/e2e の setup() がアプリをビルドして起動するので、
//       defineVitestConfig (Nuxt 環境) ではなく素の defineConfig を使う。
//       https://nuxt.com/docs/getting-started/testing#end-to-end-testing
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/e2e/**/*.spec.ts'],
    // NOTE: setup() でアプリを build するので、タイムアウトを長めにしている。
    testTimeout: 60_000,
    hookTimeout: 120_000,
  },
})
