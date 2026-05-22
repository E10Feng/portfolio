interface Props {
  label: string
}

export default function TechTag({ label }: Props) {
  return (
    <span className="font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded">
      {label}
    </span>
  )
}
