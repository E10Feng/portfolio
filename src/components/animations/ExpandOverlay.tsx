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
  const fullscreen = { top: -2, left: -2, width: vw + 4, height: vh + 4, borderRadius: 0 }

  return (
    <>
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 99, background: "rgba(0,0,0,0.92)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "fading" ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.div
        className="fixed overflow-hidden pointer-events-none"
        style={{ zIndex: 100, background: "#000000" }}
        initial={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 8, opacity: 1 }}
        animate={{ ...fullscreen, opacity: phase === "fading" ? 0 : 1 }}
        transition={
          phase === "fading"
            ? { duration: 0.5, ease: "easeInOut" }
            : { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      >
        <motion.div
          className="p-6"
          style={{ fontFamily: "var(--font-sans)" }}
          initial={{ opacity: 1, filter: "blur(0px)" }}
          animate={phase === "fading" ? { opacity: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: "easeIn" }}
        >
          {card.kind === "resume" ? (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {card.type.map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{typeLabel[t] ?? t}</span>
                ))}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{card.startDate} — {card.endDate}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#f7f7f7" }}>{card.role}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#f97316", marginBottom: "0.75rem" }}>{card.organization} · {card.location}</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {card.description.map((bullet, i) => (
                  <li key={i} style={{ fontSize: "0.875rem", color: "#666", display: "flex", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ color: "#333" }}>—</span>{bullet}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.75rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#f7f7f7" }}>{card.title}</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{card.year}</span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#666", marginBottom: "1rem" }}>{card.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {card.techStack.map((tech) => (
                  <span key={tech} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666", background: "#0d0d0d", padding: "2px 8px", borderRadius: "4px" }}>{tech}</span>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
