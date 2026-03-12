import { LucideIcon } from "lucide-react"

interface Props {
  href: string
  icon: LucideIcon
  label: string
}

export default function SocialLink({ href, icon: Icon, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors"
    >
      <Icon size={18} />
      <span className="text-sm">{label}</span>
    </a>
  )
}
