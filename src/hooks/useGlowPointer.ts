"use client"

import { useRef } from "react"
import { useMotionValue, useSpring, useMotionTemplate } from "motion/react"

export function useGlowPointer() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const glowX = useSpring(x, { stiffness: 150, damping: 20 })
  const glowY = useSpring(y, { stiffness: 150, damping: 20 })

  const background = useMotionTemplate`radial-gradient(180px circle at ${glowX}px ${glowY}px, var(--glow-medium), transparent 70%)`

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return { ref, onPointerMove, background }
}
