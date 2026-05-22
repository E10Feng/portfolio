"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Github, ExternalLink, FileText } from "lucide-react"
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
      className="group flex flex-col h-full border border-border hover:border-border-bright rounded-sm p-6 transition-colors"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <a
          href={`/projects/${project.id}`}
          onClick={handleReadMore}
          className="font-display font-semibold text-lg text-text leading-snug group-hover:text-accent transition-colors cursor-pointer"
        >
          {project.title}
        </a>
        <span className="font-code text-xs text-text-dim shrink-0">{project.year}</span>
      </div>

      <p className="font-sans text-sm text-text-dim leading-relaxed flex-1 mb-4">
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
              className="font-sans text-xs text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Github size={12} />
              code
            </a>
          )}
          {project.links.paper && (
            <a
              href={project.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <FileText size={12} />
              paper
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <ExternalLink size={12} />
              demo
            </a>
          )}
        </div>
        <a
          href={`/projects/${project.id}`}
          onClick={handleReadMore}
          className="font-sans text-xs text-text-dim hover:text-accent transition-colors shrink-0 cursor-pointer"
        >
          read more →
        </a>
      </div>
    </div>
  )
}
