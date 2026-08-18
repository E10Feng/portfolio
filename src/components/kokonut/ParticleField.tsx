"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const PARTICLE_COUNT = 36
const LINK_DISTANCE = 110

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    const reduced = prefersReducedMotion()

    const resize = () => {
      const parent = canvas.parentElement
      width = parent?.clientWidth ?? window.innerWidth
      height = parent?.clientHeight ?? 400
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: 1 + Math.random() * 1.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(249, 115, 22, 0.45)"
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.12 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      if (!reduced) frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-70"
    />
  )
}
