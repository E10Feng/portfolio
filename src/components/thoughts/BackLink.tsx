import Link from 'next/link'

export default function BackLink() {
  return (
    <Link
      href="/thoughts"
      className="font-sans text-sm text-text-dim hover:text-accent transition-colors mb-8 inline-block"
    >
      ← all thoughts
    </Link>
  )
}
