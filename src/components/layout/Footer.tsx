export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} ethan feng. built with next.js & tailwind css.
    </footer>
  )
}
