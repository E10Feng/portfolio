import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

interface Props {
  title: string
  number?: string
  subtitle?: string
}

export default function SectionHeading({ title, number, subtitle }: Props) {
  return (
    <FadeInWhenVisible className="mb-16">
      <div className="flex items-start gap-4">
        <div className="w-0.5 bg-accent self-stretch mt-1 shrink-0" />
        <div>
          {number && (
            <p className="font-code text-xs text-text-dim mb-2 tracking-widest">{number}</p>
          )}
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">{title}</h2>
          {subtitle && (
            <p className="font-sans mt-3 text-text-dim">{subtitle}</p>
          )}
        </div>
      </div>
    </FadeInWhenVisible>
  )
}
