import { getAllThoughts, getThoughtBySlug } from './thoughts'
import { existsSync } from 'fs'
import path from 'path'

describe('getAllThoughts', () => {
  it('returns an array of thoughts', () => {
    const thoughts = getAllThoughts()
    expect(Array.isArray(thoughts)).toBe(true)
  })

  it('sorts by date descending', () => {
    const thoughts = getAllThoughts()
    for (let i = 1; i < thoughts.length; i++) {
      expect(new Date(thoughts[i-1].date) >= new Date(thoughts[i].date)).toBe(true)
    }
  })
})

describe('getThoughtBySlug', () => {
  it('returns undefined for non-existent slug', () => {
    const result = getThoughtBySlug('this-does-not-exist')
    expect(result).toBeUndefined()
  })
})