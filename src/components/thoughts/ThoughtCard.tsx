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