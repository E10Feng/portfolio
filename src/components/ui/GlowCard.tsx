"use client"

import { motion } from "motion/react"
import { useGlowPointer } from "@/hooks/useGlowPointer"

interface Props {
  children: React.ReactNode
  className?: string
}

export default function GlowCard({ children, className = "" }: Props) {
  const { ref, onPointerMove, background } = useGlowPointer()

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
        style={{ background }}
      />
      {children}
    </motion.div>
  )
}
