import { FileDown } from "lucide-react"
import { resumeItems } from "@/data/resume"
import TimelineItem from "@/components/ui/TimelineItem"
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          number="03"
          title="timeline"
          subtitle="education, work, and research experience"
        />
        <div className="relative">
          <div className="absolute left-1 top-0 bottom-0 w-px bg-border-bright" />
          <div className="space-y-6">
            {resumeItems.map((item, index) => (
              <FadeInWhenVisible key={item.id} delay={index * 0.08}>
                <TimelineItem item={item} />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
        <FadeInWhenVisible delay={0.1}>
          <div className="mt-12 flex">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-semibold text-sm px-5 py-2.5 bg-accent text-canvas rounded-md hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              <FileDown size={15} />
              download full resume
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
