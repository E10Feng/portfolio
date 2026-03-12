import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

interface Props {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <FadeInWhenVisible className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-zinc-50 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-zinc-400 max-w-xl mx-auto">{subtitle}</p>
      )}
    </FadeInWhenVisible>
  )
}
