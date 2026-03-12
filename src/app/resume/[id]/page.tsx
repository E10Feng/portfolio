import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { resumeItems } from "@/data/resume"
import PageTransition from "@/components/animations/PageTransition"
import FloatingBubbles from "@/components/animations/FloatingBubbles"

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return resumeItems.map((r) => ({ id: r.id }))
}

const typeLabel: Record<string, string> = {
  education: "education",
  work: "work",
  research: "research",
  internship: "internship",
}

export default async function ResumeDetailPage({ params }: Props) {
  const { id } = await params
  const item = resumeItems.find((r) => r.id === id)
  if (!item) notFound()

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24">
      {item.technologies && <FloatingBubbles tags={item.technologies} />}
      <PageTransition>
      <div className="max-w-3xl mx-auto">
        {/* back */}
        <Link
          href="/#resume"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          back to resume
        </Link>

        {/* header */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {item.type.map((t) => (
              <span key={t} className="text-xs font-medium px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-400">
                {typeLabel[t]}
              </span>
            ))}
            <span className="text-xs text-zinc-500 self-center">
              {item.startDate} — {item.endDate}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-50 tracking-tight mt-1 mb-1">
            {item.role}
          </h1>
          <p className="text-indigo-400 mb-4">
            {item.organization} · {item.location}
          </p>
          <ul className="space-y-2 mb-4">
            {item.description.map((bullet, i) => (
              <li key={i} className="text-zinc-400 flex gap-2 text-sm">
                <span className="text-zinc-600 shrink-0">–</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-zinc-800 my-10" />

        {/* photo grid */}
        {item.photos && item.photos.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {item.photos.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800">
                  <Image
                    src={src}
                    alt={`${item.organization} photo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* content blocks */}
        {item.content && item.content.length > 0 ? (
          <div className="space-y-8">
            {item.content.map((block, i) => {
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
