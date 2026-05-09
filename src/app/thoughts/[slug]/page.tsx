import { notFound } from 'next/navigation'
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
          <MDXRemote source={thought.content} />
        </div>
      </article>
    </main>
  )
}
