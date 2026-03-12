"use client"

const navLinks = [
  { label: "home", href: "/#hero" },
  { label: "projects", href: "/#projects" },
  { label: "resume", href: "/#resume" },
  { label: "contact", href: "/#contact" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-center">
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
