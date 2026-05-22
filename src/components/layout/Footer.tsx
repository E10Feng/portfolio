import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="font-sans text-sm text-text-dim">
          © {new Date().getFullYear()} ethan feng
        </p>
        <nav className="flex items-center gap-6">
          <Link href="/thoughts" className="font-sans text-sm text-text-dim hover:text-text transition-colors">
            thoughts
          </Link>
        </nav>
      </div>
    </footer>
  )
}
