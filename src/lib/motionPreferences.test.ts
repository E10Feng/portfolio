import { prefersReducedMotion } from './motionPreferences'

describe('prefersReducedMotion', () => {
  const originalWindow = globalThis.window

  afterEach(() => {
    globalThis.window = originalWindow
  })

  it('returns false when matchMedia reports no reduced-motion preference', () => {
    globalThis.window = {
      matchMedia: () => ({ matches: false }),
    } as unknown as Window & typeof globalThis

    expect(prefersReducedMotion()).toBe(false)
  })

  it('returns true when matchMedia reports a reduced-motion preference', () => {
    globalThis.window = {
      matchMedia: () => ({ matches: true }),
    } as unknown as Window & typeof globalThis

    expect(prefersReducedMotion()).toBe(true)
  })

  it('returns false when window is undefined (SSR)', () => {
    // @ts-expect-error simulating SSR
    globalThis.window = undefined

    expect(prefersReducedMotion()).toBe(false)
  })
})
