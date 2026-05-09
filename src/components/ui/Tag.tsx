interface TagProps {
  label: string
  href?: string
  onClick?: () => void
}

export default function Tag({ label, href, onClick }: TagProps) {
  if (href) {
    return (
      <a
        href={href}
        className="inline-block px-2 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
      >
        {label}
      </a>
    )
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-block px-2 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors cursor-pointer"
      >
        {label}
      </button>
    )
  }
  return (
    <span className="inline-block px-2 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-300">
      {label}
    </span>
  )
}