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