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
