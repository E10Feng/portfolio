import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getThoughtBySlug, getAllThoughts } from '@/lib/thoughts'
import BackLink from '@/components/thoughts/BackLink'
import Tag from '@/components/ui/Tag'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllThoughts().map(t => ({ slug: t.slug }))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const thought = getThoughtBySlug(slug)
  if (!thought) return {}
  return { title: `${thought.title} — My Thoughts`, description: thought.excerpt }
}

export default async function ThoughtPostPage({ params }: PageProps) {
  const { slug } = await params
  const thought = getThoughtBySlug(slug)
  if (!thought) notFound()

  return (
    <main className="min-h-screen bg-canvas pt-24 pb-16 px-6">
      <article className="max-w-2xl mx-auto">
        <BackLink />
        <header className="mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-text mb-5 leading-tight">
            {thought.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <time className="font-code text-xs text-text-dim">{formatDate(thought.date)}</time>
            <div className="flex gap-2 flex-wrap">
              {thought.tags.map(tag => <Tag key={tag} label={tag} />)}
            </div>
          </div>
        </header>
        <div className="prose max-w-none [&_p]:font-sans [&_p]:text-text-dim [&_p]:leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-text [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-text [&_a]:text-accent [&_a]:no-underline [&_a:hover]:underline [&_code]:font-code [&_code]:text-text-dim [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-surface [&_pre]:border [&_pre]:border-border [&_pre]:rounded-lg">
          <MDXRemote source={thought.content} />
        </div>
      </article>
    </main>
  )
}
