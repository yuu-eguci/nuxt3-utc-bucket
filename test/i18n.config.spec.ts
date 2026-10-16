// @vitest-environment nuxt
// NOTE: i18n の messages が、全ロケールで同じキーを持っているかを確認するテスト。
//       翻訳の抜けを早めに見つけるため。
import { it, expect, describe } from 'vitest'
import i18nConfig from '../i18n/i18n.config'

describe('i18n.config.ts', () => {
  const config = i18nConfig() as { locale: string, messages: Record<string, Record<string, string>> }
  const locales = Object.keys(config.messages)

  it('has en and ja', () => {
    expect(locales).toEqual(expect.arrayContaining(['en', 'ja']))
    expect(locales).toContain(config.locale)
  })

  it('has the same keys in every locale', () => {
    const keysOf = (locale: string) => Object.keys(config.messages[locale]).sort()
    for (const locale of locales) {
      expect(keysOf(locale)).toEqual(keysOf('en'))
    }
  })
})
