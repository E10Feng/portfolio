interface TagProps {
  label: string
  href?: string
  onClick?: () => void
}

export default function Tag({ label, href, onClick }: TagProps) {
  const cls = "font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded hover:text-accent transition-colors"

  if (href) return <a href={href} className={cls}>{label}</a>
  if (onClick) return <button onClick={onClick} className={`${cls} cursor-pointer`}>{label}</button>
  return <span className="font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded">{label}</span>
}
