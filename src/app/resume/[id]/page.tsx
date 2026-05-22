import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { resumeItems } from "@/data/resume"
import PageTransition from "@/components/animations/PageTransition"
import FloatingBubbles from "@/components/animations/FloatingBubbles"
import TechTag from "@/components/ui/TechTag"

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return resumeItems.map((r) => ({ id: r.id }))
}

const typeLabel: Record<string, string> = {
  education: "education", work: "work", research: "research", internship: "internship",
}

export default async function ResumeDetailPage({ params }: Props) {
  const { id } = await params
  const item = resumeItems.find((r) => r.id === id)
  if (!item) notFound()

  return (
    <main className="min-h-screen bg-canvas px-6 py-24">
      {item.technologies && <FloatingBubbles tags={item.technologies} />}
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          <Link href="/#resume" className="font-sans text-sm text-text-dim hover:text-accent transition-colors mb-10 inline-block">
            ← back to resume
          </Link>

          <div className="mb-4">
            <div className="flex flex-wrap gap-3 mb-2">
              {item.type.map((t) => (
                <span key={t} className="font-code text-xs text-text-dim">{typeLabel[t]}</span>
              ))}
              <span className="font-code text-xs text-text-dim">{item.startDate} — {item.endDate}</span>
            </div>
            <h1 className="font-display font-bold text-5xl text-text mt-2 mb-1">{item.role}</h1>
            <p className="font-sans text-sm text-accent mb-5">{item.organization} · {item.location}</p>
            <ul className="space-y-2 mb-5">
              {item.description.map((bullet, i) => (
                <li key={i} className="font-sans text-text-dim flex gap-2.5 text-sm">
                  <span className="text-border-bright shrink-0 mt-0.5">—</span>{bullet}
                </li>
              ))}
            </ul>
            {item.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map(tech => <TechTag key={tech} label={tech} />)}
              </div>
            )}
          </div>

          <div className="border-t border-border my-10" />

          {item.photos && item.photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {item.photos.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                  <Image src={src} alt={`${item.organization} photo ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {item.content && item.content.length > 0 ? (
            <div className="space-y-8">
              {item.content.map((block, i) => {
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
