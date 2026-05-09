# My Thoughts Blog — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a blog ("my thoughts") section to the portfolio with dedicated `/thoughts` route, markdown-based posts, and "my thoughts" nav label.

**Architecture:** Posts stored as `.md` files in `src/content/thoughts/` with YAML frontmatter. Next.js App Router serves `/thoughts` listing and `/thoughts/[slug]` post pages. `next-mdx-remote` renders Markdown to React components.

**Tech Stack:** Next.js (App Router), `next-mdx-remote`, `gray-matter` (frontmatter parsing), Tailwind CSS

---

## File Structure

```
src/
  content/
    thoughts/                          # Create: post markdown files
      README.md                        # Create: notes on post format
  app/
    thoughts/
      page.tsx                        # Create: listing page
      [slug]/
        page.tsx                      # Create: individual post page
  components/
    thoughts/
      ThoughtCard.tsx                 # Create: post card for listing
      BackLink.tsx                    # Create: back navigation
    ui/
      Tag.tsx                         # Create: tag badge component
  lib/
    thoughts.ts                       # Create: getAllThoughts(), getThoughtBySlug()
```

**Modify:**
- `src/components/layout/Navbar.tsx` — add "my thoughts" nav link
- `src/components/layout/Footer.tsx` — add "my thoughts" footer link
- `src/app/page.tsx` — no changes needed (hero links use anchor scroll, "my thoughts" is nav-linked)

**Install:**
- `next-mdx-remote`
- `gray-matter`

---

## Tasks

### Task 1: Install dependencies

- [ ] **Step 1: Install `next-mdx-remote` and `gray-matter`**

Run: `npm install next-mdx-remote gray-matter`
Expected: packages added to `dependencies` in `package.json`

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add next-mdx-remote and gray-matter for blog posts"
```

---

### Task 2: Create `src/lib/thoughts.ts` — post retrieval logic

**Files:**
- Create: `src/lib/thoughts.ts`
- Test: `src/lib/thoughts.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// src/lib/thoughts.test.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/thoughts.test.ts`
Expected: FAIL — `getAllThoughts` and `getThoughtBySlug` not defined

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/lib/thoughts.ts
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

  const thoughts = files.map(filename => {
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/thoughts.test.ts`
Expected: PASS (returns empty array since no posts exist yet)

- [ ] **Step 5: Commit**

```bash
git add src/lib/thoughts.ts src/lib/thoughts.test.ts
git commit -m "feat: add thoughts post retrieval lib"
```

---

### Task 3: Create `src/content/thoughts/` directory with sample post

**Files:**
- Create: `src/content/thoughts/README.md`
- Create: `src/content/thoughts/2026-05-08-vectorless-rag.md`

- [ ] **Step 1: Create `src/content/thoughts/README.md`**

```markdown
# My Thoughts — Writing Format

Posts are Markdown files with YAML frontmatter.

## Filename
`YYYY-MM-DD-slug.md` — e.g., `2026-05-08-vectorless-rag.md`

## Frontmatter

```yaml
---
title: "Post Title"
date: "2026-05-08"
tags: ["tag1", "tag2"]
excerpt: "One-sentence summary for the listing page."
---
```

## Workflow

1. Write post in your notes app
2. Paste to me with frontmatter metadata
3. I create the `.md` file here
4. Commit and push
```

- [ ] **Step 2: Create placeholder post (empty template)**

```markdown
---
title: ""
date: ""
tags: []
excerpt: ""
---

<!-- Post content goes here -->
```

- [ ] **Step 3: Commit**

```bash
git add src/content/thoughts/
git commit -m "feat: add content/thoughts directory and format guide"
```

---

### Task 4: Create `src/components/ui/Tag.tsx`

**Files:**
- Create: `src/components/ui/Tag.tsx`

- [ ] **Step 1: Write the component**

```tsx
interface TagProps {
  label: string
  href?: string
  onClick?: () => void
}

export default function Tag({ label, href, onClick }: TagProps) {
  if (href) {
    return (
      <a
        href={href}
        className="inline-block px-2 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
      >
        {label}
      </a>
    )
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-block px-2 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors cursor-pointer"
      >
        {label}
      </button>
    )
  }
  return (
    <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-300">
      {label}
    </span>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/Tag.tsx
git commit -m "feat: add Tag UI component"
```

---

### Task 5: Create `src/components/thoughts/ThoughtCard.tsx`

**Files:**
- Create: `src/components/thoughts/ThoughtCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Link from 'next/link'
import Tag from '@/components/ui/Tag'
import { Thought } from '@/lib/thoughts'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

interface ThoughtCardProps {
  thought: Thought
}

export default function ThoughtCard({ thought }: ThoughtCardProps) {
  return (
    <Link href={`/thoughts/${thought.slug}`} className="group block">
      <article className="p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <time className="text-sm text-zinc-500">{formatDate(thought.date)}</time>
          <div className="flex gap-1.5 flex-wrap">
            {thought.tags.map(tag => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
        <h2 className="text-xl font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors mb-2">
          {thought.title}
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{thought.excerpt}</p>
        <div className="mt-4 text-sm text-indigo-400 group-hover:text-indigo-300 transition-colors">
          read more →
        </div>
      </article>
    </Link>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/thoughts/ThoughtCard.tsx
git commit -m "feat: add ThoughtCard component"
```

---

### Task 6: Create `src/components/thoughts/BackLink.tsx`

**Files:**
- Create: `src/components/thoughts/BackLink.tsx`

- [ ] **Step 1: Write the component**

```tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BackLink() {
  return (
    <Link
      href="/thoughts"
      className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm mb-8"
    >
      <ArrowLeft size={16} />
      all thoughts
    </Link>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/thoughts/BackLink.tsx
git commit -m "feat: add BackLink component"
```

---

### Task 7: Create `src/app/thoughts/page.tsx` — listing page

**Files:**
- Create: `src/app/thoughts/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { getAllThoughts } from '@/lib/thoughts'
import ThoughtCard from '@/components/thoughts/ThoughtCard'

export const metadata = {
  title: 'My Thoughts — E10 Feng',
  description: 'Writing on AI, systems engineering, and building things.',
}

export default function ThoughtsPage() {
  const thoughts = getAllThoughts()

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-50 mb-4">my thoughts</h1>
          <p className="text-zinc-400">
            Writing on AI, systems engineering, and building things.
          </p>
        </header>

        {thoughts.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            <p>No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {thoughts.map(thought => (
              <ThoughtCard key={thought.slug} thought={thought} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Next.js build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add src/app/thoughts/page.tsx
git commit -m "feat: add /thoughts listing page"
```

---

### Task 8: Create `src/app/thoughts/[slug]/page.tsx` — individual post page

**Files:**
- Create: `src/app/thoughts/[slug]/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getThoughtBySlug, getAllThoughts } from '@/lib/thoughts'
import BackLink from '@/components/thoughts/BackLink'
import Tag from '@/components/ui/Tag'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const thoughts = getAllThoughts()
  return thoughts.map(thought => ({ slug: thought.slug }))
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const thought = getThoughtBySlug(slug)
  if (!thought) return {}
  return {
    title: `${thought.title} — My Thoughts`,
    description: thought.excerpt,
  }
}

export default async function ThoughtPostPage({ params }: PageProps) {
  const { slug } = await params
  const thought = getThoughtBySlug(slug)
  if (!thought) notFound()

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-16 px-6">
      <article className="max-w-2xl mx-auto">
        <BackLink />

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-50 mb-4 leading-tight">
            {thought.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <time className="text-zinc-500">{formatDate(thought.date)}</time>
            <div className="flex gap-1.5 flex-wrap">
              {thought.tags.map(tag => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </header>

        <div className="prose prose-invert prose-zinc prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-a:text-indigo-400 prose-code:text-zinc-200 prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 max-w-none">
          {/* @ts-expect-error — next-mdx-remote RSC compatibility */}
          <MDXRemote source={thought.content} />
        </div>
      </article>
    </main>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: Next.js build succeeds

- [ ] **Step 3: Commit**

```bash
git add "src/app/thoughts/[slug]/page.tsx"
git commit -m "feat: add /thoughts/[slug] individual post page"
```

---

### Task 9: Update Navbar — add "my thoughts" link

**Files:**
- Modify: `src/components/layout/Navbar.tsx:6-14`

- [ ] **Step 1: Update navLinks array**

In `src/components/layout/Navbar.tsx`, add to the `navLinks` array:
```ts
{ label: "my thoughts", href: "/thoughts" },
```
Place it after "featured" or at the end — ordering is flexible.

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: builds successfully

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: add my thoughts nav link"
```

---

### Task 10: Update Footer — add "my thoughts" link

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Update Footer**

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
      <div className="flex flex-col items-center gap-4">
        <nav className="flex items-center gap-6">
          <Link href="/thoughts" className="hover:text-zinc-300 transition-colors">
            my thoughts
          </Link>
        </nav>
        <p>
          © {new Date().getFullYear()} ethan feng. built with next.js & tailwind css.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: builds successfully

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add my thoughts link to footer"
```

---

### Task 11: Create a sample post

**Files:**
- Create: `src/content/thoughts/2026-05-08-welcome.md`

- [ ] **Step 1: Create welcome post**

```markdown
---
title: "Welcome to My Thoughts"
date: "2026-05-08"
tags: ["announcement"]
excerpt: "A brief introduction to my writing — AI, systems, and building things."
---

This is the first post on my thoughts section. More to come soon.
```

- [ ] **Step 2: Commit**

```bash
git add src/content/thoughts/2026-05-08-welcome.md
git commit -m "feat: add welcome post"
```

---

### Task 12: Final build verification

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: SUCCESS — no errors

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: no errors

- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "feat: add my thoughts blog section"
```