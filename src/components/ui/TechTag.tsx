interface Props {
  label: string
}

export default function TechTag({ label }: Props) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
      {label}
    </span>
  )
}
