// @vitest-environment nuxt
// NOTE: middleware/global-middleware.global.ts を関数として直接呼び出すテスト。
//       $debug の中身までは見ていない。 (useNuxtApp を mockNuxtImport で差し替えると Nuxt 環境の初期化が壊れ、
//       nuxtApp.$debug は getter なので上書きもできないため。 $debug は test/plugins/debugLog.spec.ts で見ている。)
import { it, expect, describe } from 'vitest'
import type { RouteLocationNormalized } from 'vue-router'
import middleware from '../../middleware/global-middleware.global'

const route = (fullPath: string, params: Record<string, string> = {}) =>
  ({ fullPath, params }) as unknown as RouteLocationNormalized

describe('middleware/global-middleware.global.ts', () => {
  it('aborts navigation when params.id is "1"', () => {
    // NOTE: abortNavigation() は error なしで呼ぶと false を返す。
    expect(middleware(route('/items/1', { id: '1' }), route('/'))).toBe(false)
  })

  it('lets other navigations through', () => {
    expect(middleware(route('/sample'), route('/'))).toBeUndefined()
  })
})
