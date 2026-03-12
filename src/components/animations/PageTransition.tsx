"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useCardTransition } from "./TransitionContext"

const MIN_TOTAL_MS = 900
const MAX_TOTAL_MS = 4000

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { completeTransition, state } = useCardTransition()
  const { triggeredAt } = state
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const clickedAt = triggeredAt ?? Date.now()

    const msElapsed = Date.now() - clickedAt
    const minRemaining = Math.max(0, MIN_TOTAL_MS - msElapsed)
    const maxRemaining = Math.max(0, MAX_TOTAL_MS - msElapsed)

    let done = false
    const finish = () => {
      if (done) return
      done = true
      setRevealed(true)
      completeTransition()
    }

    const images = Array.from(document.querySelectorAll("img")).filter(
      (img) => !img.complete
    )

    if (images.length === 0) {
      const t = setTimeout(finish, minRemaining)
      return () => clearTimeout(t)
    }

    let loaded = 0
    let minTimer: ReturnType<typeof setTimeout> | null = null

    const onImageSettled = () => {
      loaded++
      if (loaded < images.length) return
      const elapsed = Date.now() - clickedAt
      const wait = Math.max(0, MIN_TOTAL_MS - elapsed)
      minTimer = setTimeout(finish, wait)
    }

    images.forEach((img) => {
      img.addEventListener("load", onImageSettled)
      img.addEventListener("error", onImageSettled)
    })

    const fallback = setTimeout(finish, maxRemaining)

    return () => {
      done = true
      images.forEach((img) => {
        img.removeEventListener("load", onImageSettled)
        img.removeEventListener("error", onImageSettled)
      })
      if (minTimer) clearTimeout(minTimer)
      clearTimeout(fallback)
    }
  }, [completeTransition, triggeredAt])

  return (
    // opacity stays 0 until `revealed` flips — content never bleeds through the overlay
    <motion.div
      animate={{ opacity: revealed ? 1 : 0 }}
      transition={revealed ? { duration: 0.5, delay: 0.25, ease: "easeOut" } : { duration: 0 }}
    >
      {children}
    </motion.div>
  )
}
