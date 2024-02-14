import { it, expect, describe } from 'vitest'
import { Foo } from '../../utils/Bar'

describe('utils/Bar.spec.ts', () => {
  it('tests normal case', () => {
    expect(Foo(-1, 1)).toBe(0)
    expect(Foo(0, 0)).toBe(0)
    expect(Foo(1, 2)).toBe(3)
  })
})
