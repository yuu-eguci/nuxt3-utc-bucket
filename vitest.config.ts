// NOTE: ここ↓を参考に作りました。
//       https://nuxt.com/docs/getting-started/testing
import { defineVitestConfig } from '@nuxt/test-utils/config'

// NOTE: これは unit テスト用。 e2e (ブラウザ) テストはビルドが走って時間がかかるし、
//       defineVitestConfig を使ってはいけないので、 vitest.e2e.config.ts に分けている。
export default defineVitestConfig({
  test: {
    exclude: ['test/e2e/**', '**/node_modules/**'],
  },
})
