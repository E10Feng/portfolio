import { getAllThoughts } from '@/lib/thoughts'
import ThoughtCard from '@/components/thoughts/ThoughtCard'

export const metadata = {
  title: 'My Thoughts — E10 Feng',
  description: 'Writing on AI, systems engineering, and building things.',
}

export default function ThoughtsPage() {
  const thoughts = getAllThoughts()

  return (
    <main className="min-h-screen bg-canvas pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 flex items-start gap-4">
          <div className="w-0.5 bg-accent self-stretch mt-1 shrink-0" />
          <div>
            <p className="font-code text-xs text-text-dim mb-2 tracking-widest">writing</p>
            <h1 className="font-display font-bold text-5xl text-text mb-3">my thoughts</h1>
            <p className="font-sans text-text-dim">On AI, systems engineering, and building things.</p>
          </div>
        </header>

        {thoughts.length === 0 ? (
          <p className="font-sans text-text-dim">No posts yet. Check back soon.</p>
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
