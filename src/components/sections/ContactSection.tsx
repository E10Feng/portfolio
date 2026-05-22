import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="04"
          title="contact"
          subtitle="open to interesting conversations, collaborations, and full-time roles"
        />
        <FadeInWhenVisible delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            <a
              href="https://www.linkedin.com/in/ethan-feng-604993221/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-text hover:text-accent transition-colors"
            >
              linkedin ↗
            </a>
            <a
              href="mailto:ethan.burr@gmail.com"
              className="font-sans text-text hover:text-accent transition-colors"
            >
              ethan.burr@gmail.com ↗
            </a>
            <a
              href="https://github.com/E10Feng"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-text hover:text-accent transition-colors"
            >
              github ↗
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
