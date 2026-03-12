"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { ResumeItem, ResumeItemType } from "@/types"
import { useCardTransition } from "@/components/animations/TransitionContext"
import TechTag from "./TechTag"

const dotColor: Record<ResumeItemType, string> = {
  education: "bg-indigo-500",
  work: "bg-emerald-500",
  research: "bg-amber-500",
  internship: "bg-sky-500",
}

const typeLabel: Record<ResumeItemType, string> = {
  education: "education",
  work: "work",
  research: "research",
  internship: "internship",
}

interface Props {
  item: ResumeItem
}

export default function TimelineItem({ item }: Props) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const { triggerTransition } = useCardTransition()

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    triggerTransition(rect, {
      kind: "resume",
      role: item.role,
      organization: item.organization,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      type: item.type,
      description: item.description,
      technologies: item.technologies,
    })
    setTimeout(() => router.push(`/resume/${item.id}`), 100)
  }

  return (
    <div className="relative pl-8">
      {/* dot */}
      <span
        className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${dotColor[item.type[0]]} ring-4 ring-zinc-950`}
      />
      {/* card */}
      <div
        ref={cardRef}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-7"
      >
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {item.type.map((t) => (
            <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full border border-zinc-700 text-zinc-400">
              {typeLabel[t]}
            </span>
          ))}
          <span className="text-sm text-zinc-500">
            {item.startDate} — {item.endDate}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-zinc-50 mb-0.5">{item.role}</h3>
        <p className="text-base text-indigo-400 mb-4">
          {item.organization} · {item.location}
        </p>
        <ul className="space-y-2 mb-4">
          {item.description.map((bullet, i) => (
            <li key={i} className="text-base text-zinc-400 flex gap-2.5">
              <span className="text-zinc-600 shrink-0">–</span>
              {bullet}
            </li>
          ))}
        </ul>
        {item.technologies && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.technologies.map((tech) => (
              <TechTag key={tech} label={tech} />
            ))}
          </div>
        )}
        <div className="flex justify-end">
          <a
            href={`/resume/${item.id}`}
            onClick={handleReadMore}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            read more <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  )
}
