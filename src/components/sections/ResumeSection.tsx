import { FileDown } from "lucide-react"
import { resumeItems } from "@/data/resume"
import TimelineItem from "@/components/ui/TimelineItem"
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 px-6 bg-zinc-900/40">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="resume"
          subtitle="education, work, and research experience"
        />
        {/* Legend */}
        <FadeInWhenVisible>
          <div className="flex flex-wrap gap-4 justify-center mb-10 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
              Education
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Work
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Research
            </span>
          </div>
        </FadeInWhenVisible>
        {/* Timeline */}
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-1.5 top-0 bottom-0 w-px bg-zinc-800" />
          <div className="space-y-8">
            {resumeItems.map((item, index) => (
              <FadeInWhenVisible key={item.id} delay={index * 0.1}>
                <TimelineItem item={item} />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
        {/* PDF download */}
        <FadeInWhenVisible delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              <FileDown size={16} />
              download full resume
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
