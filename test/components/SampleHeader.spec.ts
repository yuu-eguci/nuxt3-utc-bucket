// @vitest-environment nuxt
// NOTE: Nuxt の auto-import されるコンポーネントを、 Nuxt 環境ごと mount してテストするサンプル。
//       https://nuxt.com/docs/getting-started/testing#mountsuspended
import { it, expect, describe } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SampleHeader from '../../components/SampleHeader.vue'

describe('components/SampleHeader.vue', () => {
  it('renders slot content', async () => {
    const wrapper = await mountSuspended(SampleHeader, {
      slots: { default: () => 'App header (test)' },
    })
    expect(wrapper.text()).toContain('App header (test)')
  })
})
