import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink, FileText } from "lucide-react"
import { projects } from "@/data/projects"
import PageTransition from "@/components/animations/PageTransition"
import FloatingBubbles from "@/components/animations/FloatingBubbles"

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24">
      <FloatingBubbles tags={project.techStack} />
      <PageTransition>
      <div className="max-w-3xl mx-auto">
        {/* back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          back to projects
        </Link>

        {/* header */}
        <div className="mb-4">
          <span className="text-xs text-zinc-500">{project.year}</span>
          <h1 className="text-4xl font-bold text-zinc-50 tracking-tight mt-1 mb-3">
            {project.title}
          </h1>
          <p className="text-zinc-400 leading-relaxed mb-4">{project.description}</p>
          <div className="flex items-center gap-5">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                <Github size={15} /> code
              </a>
            )}
            {project.links.paper && (
              <a href={project.links.paper} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                <FileText size={15} /> paper
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                <ExternalLink size={15} /> demo
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-800 my-10" />

        {/* content blocks */}
        {project.content && project.content.length > 0 ? (
          <div className="space-y-8">
            {project.content.map((block, i) => {
              if (block.type === "text") {
                return (
                  <p key={i} className="text-zinc-300 leading-relaxed whitespace-pre-line">
                    {block.content}
                  </p>
                )
              }
              if (block.type === "image") {
                return (
                  <figure key={i} className="space-y-2">
                    <div className="relative w-full rounded-xl overflow-hidden border border-zinc-800">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-xs text-zinc-500 text-center">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              }
            })}
          </div>
        ) : (
          <p className="text-zinc-500 italic">more details coming soon.</p>
        )}
      </div>
      </PageTransition>
    </main>
  )
}
