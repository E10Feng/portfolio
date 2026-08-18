"use client"

import { motion } from "motion/react"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Props {
  href: string
  children: React.ReactNode
  variant?: "solid" | "outline"
  icon?: React.ReactNode
  external?: boolean
}

export default function BorderBeamButton({ href, children, variant = "solid", icon, external = true }: Props) {
  const reduced = prefersReducedMotion()

  const base = "relative inline-flex items-center gap-2 px-6 py-3 rounded-md font-display font-semibold text-sm isolate overflow-hidden"
  const fill = variant === "solid" ? "bg-canvas text-canvas" : "text-text"
  const innerFill = variant === "solid" ? "bg-accent" : "bg-canvas"
  const outlineBorder = variant === "outline" ? "border border-border-bright" : ""

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group ${base} ${fill} ${outlineBorder}`}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, rgba(249,115,22,0.9) 8%, transparent 16%)",
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <span className={`absolute inset-[1.5px] rounded-[5px] -z-10 ${innerFill}`} />
      {icon}
      <span className="relative">{children}</span>
    </a>
  )
}
