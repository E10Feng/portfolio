import Link from 'next/link'
import Tag from '@/components/ui/Tag'
import GlowCard from '@/components/ui/GlowCard'
import { Thought } from '@/lib/thoughts'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ThoughtCard({ thought }: { thought: Thought }) {
  return (
    <Link href={`/thoughts/${thought.slug}`} className="group block">
      <GlowCard className="bg-surface border border-border hover:border-border-bright rounded-lg p-6 transition-colors overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-3">
          <time className="font-code text-xs text-text-dim">{formatDate(thought.date)}</time>
          <div className="flex gap-1.5 flex-wrap">
            {thought.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>
        </div>
        <h2 className="font-display font-bold text-2xl text-text group-hover:text-accent transition-colors mb-2">
          {thought.title}
        </h2>
        <p className="font-sans text-sm text-text-dim leading-relaxed">{thought.excerpt}</p>
        <div className="mt-4 font-sans text-xs text-text-dim group-hover:text-accent transition-colors">
          read more →
        </div>
      </GlowCard>
    </Link>
  )
}
