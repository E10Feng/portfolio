import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink, FileText } from "lucide-react"
import { projects } from "@/data/projects"
import PageTransition from "@/components/animations/PageTransition"
import FloatingBubbles from "@/components/animations/FloatingBubbles"
import TechTag from "@/components/ui/TechTag"

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <main className="min-h-screen bg-canvas px-6 py-24">
      <FloatingBubbles tags={project.techStack} />
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          <Link href="/#projects" className="font-sans text-sm text-text-dim hover:text-accent transition-colors mb-10 inline-block">
            ← back to projects
          </Link>

          <div className="mb-4">
            <span className="font-code text-xs text-text-dim">{project.year}</span>
            <h1 className="font-display font-bold text-5xl text-text mt-2 mb-3">{project.title}</h1>
            <p className="font-sans text-text-dim leading-relaxed mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map(tech => <TechTag key={tech} label={tech} />)}
            </div>
            <div className="flex items-center gap-6">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5">
                  <Github size={14} /> code
                </a>
              )}
              {project.links.paper && (
                <a href={project.links.paper} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5">
                  <FileText size={14} /> paper
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5">
                  <ExternalLink size={14} /> demo
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-border my-10" />

          {project.content && project.content.length > 0 ? (
            <div className="space-y-8">
              {project.content.map((block, i) => {
                if (block.type === "text") return (
                  <p key={i} className="font-sans text-text-dim leading-relaxed whitespace-pre-line">{block.content}</p>
                )
                if (block.type === "image") return (
                  <figure key={i} className="space-y-2">
                    <div className="relative w-full overflow-hidden rounded-lg border border-border">
                      <Image src={block.src} alt={block.alt} width={1200} height={800} className="w-full h-auto object-cover" />
                    </div>
                    {block.caption && <figcaption className="font-code text-xs text-text-dim text-center">{block.caption}</figcaption>}
                  </figure>
                )
              })}
            </div>
          ) : (
            <p className="font-sans text-text-dim italic">more details coming soon.</p>
          )}
        </div>
      </PageTransition>
    </main>
  )
}
