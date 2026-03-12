"use client"

import { motion } from "framer-motion"
import { useCardTransition } from "./TransitionContext"

const typeLabel: Record<string, string> = {
  education: "education",
  work: "work",
  research: "research",
  internship: "internship",
}

export default function ExpandOverlay() {
  const { state } = useCardTransition()
  const { rect, card, phase } = state

  if (phase === "idle" || !rect || !card) return null

  const vw = typeof window !== "undefined" ? window.innerWidth : 1440
  const vh = typeof window !== "undefined" ? window.innerHeight : 900

  // Slightly oversized (-2px / +4px) to eliminate any subpixel gaps at edges
  const fullscreen = { top: -2, left: -2, width: vw + 4, height: vh + 4, borderRadius: 0 }

  return (
    <>
      {/* Full-page dim — sits above navbar (z-99) */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 99, background: "rgba(9,9,11,0.75)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "fading" ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Expanding card — sits above everything (z-100), no border to avoid edge artifacts */}
      <motion.div
        className="fixed overflow-hidden pointer-events-none"
        style={{ zIndex: 100, background: "#18181b" }}
        initial={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          borderRadius: 12,
          opacity: 1,
        }}
        animate={{
          ...fullscreen,
          opacity: phase === "fading" ? 0 : 1,
        }}
        transition={
          phase === "fading"
            ? { duration: 0.5, ease: "easeInOut" }
            : { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      >
        {/* Card content blurs and fades as the overlay expands */}
        <motion.div
          className="p-5"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          animate={
            phase === "fading"
              ? { opacity: 0, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(8px)" }
          }
          transition={{ duration: 0.35, ease: "easeIn" }}
        >
          {card.kind === "resume" ? (
            <>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {card.type.map((t) => (
                  <span key={t} className="text-xs font-medium px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-400">
                    {typeLabel[t] ?? t}
                  </span>
                ))}
                <span className="text-xs text-zinc-500">
                  {card.startDate} — {card.endDate}
                </span>
              </div>
              <h3 className="font-semibold text-zinc-50">{card.role}</h3>
              <p className="text-sm text-indigo-400 mb-3">
                {card.organization} · {card.location}
              </p>
              <ul className="space-y-1 mb-3">
                {card.description.map((bullet, i) => (
                  <li key={i} className="text-sm text-zinc-400 flex gap-2">
                    <span className="text-zinc-600 shrink-0">–</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              {card.technologies && (
                <div className="flex flex-wrap gap-1.5">
                  {card.technologies.map((tech) => (
                    <span key={tech} className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-semibold text-zinc-50 leading-snug">{card.title}</h3>
                <span className="text-xs text-zinc-500 shrink-0">{card.year}</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">{card.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.techStack.map((tech) => (
                  <span key={tech} className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                    {tech}
                  </span>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
