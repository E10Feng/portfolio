import { hasBootPlayed, markBootPlayed } from './bootSession'

function fakeSessionStorage() {
  const store = new Map<string, string>()
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v) },
  } as unknown as Storage
}

describe('bootSession', () => {
  const originalWindow = globalThis.window

  afterEach(() => {
    globalThis.window = originalWindow
  })

  it('reports boot not played on a fresh session', () => {
    globalThis.window = { sessionStorage: fakeSessionStorage() } as unknown as Window & typeof globalThis
    expect(hasBootPlayed()).toBe(false)
  })

  it('reports boot played after markBootPlayed is called', () => {
    globalThis.window = { sessionStorage: fakeSessionStorage() } as unknown as Window & typeof globalThis
    markBootPlayed()
    expect(hasBootPlayed()).toBe(true)
  })

  it('treats SSR (no window) as already-played, so boot never runs server-side', () => {
    // @ts-expect-error simulating SSR
    globalThis.window = undefined
    expect(hasBootPlayed()).toBe(true)
  })
})
