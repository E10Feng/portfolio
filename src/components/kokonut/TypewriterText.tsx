"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Props {
  text: string
  speedMs?: number
  onComplete?: () => void
  className?: string
}

export default function TypewriterText({ text, speedMs = 18, onComplete, className = "" }: Props) {
  const [visibleChars, setVisibleChars] = useState(0)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisibleChars(text.length)
      onComplete?.()
      return
    }

    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleChars(i)
      if (i >= text.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, speedMs)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (prefersReducedMotion() || !cursorRef.current) {
      return
    }
    const animation = animate(cursorRef.current, {
      opacity: [1, 0],
      duration: 500,
      loop: true,
      alternate: true,
      ease: "steps(1)",
    })
    const cleanup = () => {
      animation.pause()
    }
    return cleanup
  }, [])

  return (
    <span className={className}>
      {text.slice(0, visibleChars)}
      <span ref={cursorRef} className="inline-block w-[0.5em] bg-accent align-middle" style={{ height: "1em" }} />
    </span>
  )
}
