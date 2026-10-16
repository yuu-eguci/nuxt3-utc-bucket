// @vitest-environment nuxt
// NOTE: plugins/debugLog.ts が inject する $debug を、 Nuxt 環境で呼び出すテスト。
//       $debug は import.meta.dev のときだけ console.info に流す (vitest の nuxt 環境では dev ではない)。
import { it, expect, describe, vi, afterEach } from 'vitest'

describe('plugins/debugLog.ts', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('provides $debug and only logs in dev', () => {
    const info = vi.spyOn(console, 'info').mockImplementation(() => {})
    const { $debug } = useNuxtApp()
    expect(typeof $debug).toBe('function')
    $debug('hello', { count: 1 })
    if (import.meta.dev) {
      expect(info).toHaveBeenCalledWith('hello', { count: 1 })
    }
    else {
      expect(info).not.toHaveBeenCalled()
    }
  })
})
