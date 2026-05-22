"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ResumeItem, ResumeItemType } from "@/types"
import { useCardTransition } from "@/components/animations/TransitionContext"
import TechTag from "./TechTag"

const dotColor: Record<ResumeItemType, string> = {
  education: "bg-accent",
  work: "bg-accent",
  research: "bg-accent",
  internship: "bg-accent",
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
      {/* Dot */}
      <span className={`absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full ${dotColor[item.type[0]]} ring-4 ring-canvas`} />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative group bg-surface border border-border hover:border-border-bright rounded-lg p-6 overflow-hidden transition-colors"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-wrap items-center gap-3 mb-2">
          {item.type.map((t) => (
            <span key={t} className="font-code text-xs text-text-dim">{typeLabel[t]}</span>
          ))}
          <span className="font-code text-xs text-text-dim">
            {item.startDate} — {item.endDate}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-text mb-0.5 group-hover:text-accent transition-colors">
          {item.role}
        </h3>
        <p className="font-sans text-sm text-accent mb-4">
          {item.organization} · {item.location}
        </p>

        <ul className="space-y-2 mb-4">
          {item.description.map((bullet, i) => (
            <li key={i} className="font-sans text-sm text-text-dim flex gap-2.5">
              <span className="text-border-bright shrink-0 mt-0.5">—</span>
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
            className="font-sans text-xs text-text-dim hover:text-accent transition-colors cursor-pointer"
          >
            read more →
          </a>
        </div>
      </div>
    </div>
  )
}
