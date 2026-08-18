"use client"

import { useEffect, useRef } from "react"
import { animate, steps } from "animejs"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Props {
  active: boolean
}

export default function GlitchBurst({ active }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !ref.current || prefersReducedMotion()) return
    const el = ref.current
    const animation = animate(el, {
      translateX: [0, -6, 5, -3, 0],
      opacity: [0, 0.5, 0.25, 0.5, 0],
      duration: 260,
      ease: steps(5),
    })
    return () => {
      animation.pause()
    }
  }, [active])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 101,
        background:
          "repeating-linear-gradient(0deg, rgba(249,115,22,0.08) 0px, rgba(249,115,22,0.08) 1px, transparent 1px, transparent 3px)",
        opacity: 0,
      }}
    />
  )
}
