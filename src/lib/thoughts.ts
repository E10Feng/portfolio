import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const thoughtsDir = path.join(process.cwd(), 'src/content/thoughts')

export interface Thought {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string
}

export function getAllThoughts(): Thought[] {
  if (!fs.existsSync(thoughtsDir)) return []

  const files = fs.readdirSync(thoughtsDir).filter(f => f.endsWith('.md'))

  const thoughts = files.filter(f => !f.startsWith('README')).map(filename => {
    const slug = filename.replace('.md', '')
    const raw = fs.readFileSync(path.join(thoughtsDir, filename), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      tags: (data.tags as string[]) || [],
      excerpt: data.excerpt as string,
      content,
    }
  })

  return thoughts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getThoughtBySlug(slug: string): Thought | undefined {
  const filePath = path.join(thoughtsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) || [],
    excerpt: data.excerpt as string,
    content,
  }
}