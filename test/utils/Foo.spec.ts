import { it, expect, describe } from 'vitest'
import { Foo } from '../../utils/Foo'

describe('utils/Foo.spec.ts', () => {
  it('tests normal case', () => {
    const foo = new Foo(10, 20)
    expect(foo.height).toBe(10)
    expect(foo.width).toBe(20)
  })
})
