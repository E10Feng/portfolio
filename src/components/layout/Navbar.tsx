"use client"

const navLinks = [
  { label: "home", href: "/#hero" },
  { label: "featured", href: "/#featured" },
  { label: "projects", href: "/#projects" },
  { label: "resume", href: "/#resume" },
  { label: "contact", href: "/#contact" },
  { label: "thoughts", href: "/thoughts" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/#hero" className="font-display font-bold text-lg text-text hover:text-accent transition-colors">
          e10
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-text-dim hover:text-text transition-colors"
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
