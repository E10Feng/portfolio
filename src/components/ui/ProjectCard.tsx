"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Github, ExternalLink, FileText, ArrowRight } from "lucide-react"
import { ProjectItem } from "@/types"
import { useCardTransition } from "@/components/animations/TransitionContext"
import TechTag from "./TechTag"

interface Props {
  project: ProjectItem
}

export default function ProjectCard({ project }: Props) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const { triggerTransition } = useCardTransition()

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    triggerTransition(rect, {
      kind: "project",
      title: project.title,
      description: project.description,
      year: project.year,
      techStack: project.techStack,
    })
    setTimeout(() => router.push(`/projects/${project.id}`), 100)
  }

  return (
    <div
      ref={cardRef}
      className="flex flex-col h-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-zinc-50 leading-snug">{project.title}</h3>
        <span className="text-xs text-zinc-500 shrink-0">{project.year}</span>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              <Github size={14} />
              code
            </a>
          )}
          {project.links.paper && (
            <a
              href={project.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              <FileText size={14} />
              paper
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              <ExternalLink size={14} />
              demo
            </a>
          )}
        </div>
        <a
          href={`/projects/${project.id}`}
          onClick={handleReadMore}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-200 transition-colors shrink-0 cursor-pointer"
        >
          read more <ArrowRight size={12} />
        </a>
      </div>
    </div>
  )
}
