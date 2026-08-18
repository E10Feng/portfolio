"use client"

import { useState } from "react"
import { motion } from "motion/react"
import TypewriterText from "@/components/kokonut/TypewriterText"

const LINES = [
  "> whoami",
  "> loading profile...",
  "> session ready.",
]

interface Props {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: Props) {
  const [lineIndex, setLineIndex] = useState(0)

  const handleLineComplete = () => {
    if (lineIndex + 1 < LINES.length) {
      setTimeout(() => setLineIndex((i) => i + 1), 150)
    } else {
      setTimeout(onComplete, 400)
    }
  }

  return (
    <motion.div
      className="p-6 md:p-8 font-code text-sm leading-7 min-h-[240px]"
      exit={{ opacity: 0 }}
    >
      {LINES.slice(0, lineIndex + 1).map((line, i) => (
        <div key={line} className="text-text-dim">
          {i === lineIndex ? (
            <TypewriterText text={line} onComplete={handleLineComplete} />
          ) : (
            line
          )}
        </div>
      ))}
    </motion.div>
  )
}
