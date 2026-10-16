// NOTE: 実際にアプリをビルドして、ブラウザ (Chromium) で開いて確認する e2e テスト。
//       https://nuxt.com/docs/getting-started/testing#end-to-end-testing
//       `yarn test` (unit) とは分けて `yarn test:e2e` で実行する (vitest.e2e.config.ts 参照)。
//       ブラウザは Docker では apk の chromium、 CI では `playwright-core install chromium` で用意する。
import { describe, it, expect } from 'vitest'
import { setup, createPage, url } from '@nuxt/test-utils/e2e'

await setup({
  browser: true,
  browserOptions: {
    type: 'chromium',
    launch: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    },
  },
})

describe('pages (browser)', () => {
  it('index shows NuxtWelcome inside the Vuetify layout', async () => {
    const page = await createPage('/')
    expect(await page.locator('header.v-app-bar .v-app-bar-title').textContent()).toContain('Nuxt3 UTC Bucket')
    expect(await page.locator('.v-application.v-theme--dark').count()).toBe(1)
    expect(await page.locator('html').getAttribute('lang')).toBe('en')
    expect(await page.locator('footer a[aria-label="GitHub repository"]').getAttribute('href'))
      .toBe('https://github.com/yuu-eguci/nuxt3-utc-bucket')
    await page.close()
  })

  it('sample page renders 4 card variants and switches i18n locale', async () => {
    const page = await createPage('/sample')
    expect(await page.locator('.v-card .text-overline').allTextContents())
      .toEqual(['elevated', 'flat', 'tonal', 'outlined'])
    expect((await page.locator('form p').textContent())?.trim()).toBe('Welcome')

    await page.selectOption('form select', 'ja')
    await expect.poll(async () => (await page.locator('form p').textContent())?.trim()).toBe('よーこそ')
    // NOTE: app.vue の useLocaleHead で <html lang> もロケールに追従する。
    await expect.poll(async () => page.locator('html').getAttribute('lang')).toBe('ja')

    // NOTE: setLocale で cookie に保存されるので、リロードしても ja のまま。
    await page.reload()
    await expect.poll(async () => (await page.locator('form p').textContent())?.trim()).toBe('よーこそ')
    await page.close()
  })

  it('unknown route returns the 404 page', async () => {
    const response = await fetch(url('/does-not-exist'))
    expect(response.status).toBe(404)
    expect(await response.text()).toContain('404')
  })
})
