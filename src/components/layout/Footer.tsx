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
