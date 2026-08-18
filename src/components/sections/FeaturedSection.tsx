"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"
import { ExternalLink, Github } from "lucide-react"
import { useTab } from "@/context/TabContext"
import GlowCard from "@/components/ui/GlowCard"
import BorderBeamButton from "@/components/kokonut/BorderBeamButton"
import { prefersReducedMotion } from "@/lib/motionPreferences"

const FEATURED = [
  {
    id: "cyberclaw-city",
    title: "CyberClaw City",
    subtitle: "CYBERCLAW CITY v1.0",
    description: "A 3D explorable visualization of my AI agent architecture — built with React Three Fiber and Next.js. Navigate through districts representing memory, the build pipeline, job search tools, skills, and more. Each building is a functional component of the agent system.",
    image: "/cyberclaw-city-preview.jpg",
    badges: ["7 districts", "3D WebGL"],
    caption: "drag to orbit · scroll to zoom · F for first person",
    links: {
      demo: { href: "https://cyberclaw-city.vercel.app", label: "explore live" },
      github: { href: "https://github.com/E10Feng/cyberclaw-city", label: "view source" },
    },
    techStack: ["Next.js 14", "React Three Fiber", "Three.js", "TypeScript", "Zustand", "Framer Motion"],
  },
  {
    id: "balance-well",
    title: "BalanceWell",
    subtitle: "BALANCEWELL v1.0",
    description: "Duolingo but for rehab — a mobile-first PWA for older adults (65+) to reduce fall risk through daily balance exercises. Personalized plans with Lottie animations, a Gemini-powered AI coach that adapts each day's plan based on how you felt, and email + push reminders.",
    image: "/balance-well-preview.png",
    badges: ["AI Coach", "PWA"],
    caption: "daily exercises · ai coaching · progress tracking",
    links: {
      demo: { href: "https://balance-app-brown.vercel.app", label: "explore live" },
      github: { href: "https://github.com/E10Feng/balance-app", label: "view source" },
    },
    techStack: ["Next.js 15", "Gemini 2.5", "Vercel AI SDK", "Neon", "Drizzle ORM", "NextAuth", "PWA"],
  },
]

const INTERVAL_MS = 4000

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
}

export default function FeaturedSection() {
  const { activeTab } = useTab()

  const [[index, dir], setSlide] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-24, 24])
  const reduced = prefersReducedMotion()

  const go = useCallback((next: number, d: number) => { setSlide([next, d]) }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setSlide(([i]) => [(i + 1) % FEATURED.length, 1])
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  if (activeTab !== "ethan") return null

  const project = FEATURED[index]

  return (
    <section id="featured" ref={sectionRef} className="py-24 px-6 bg-canvas border-y border-border">
      <div className="max-w-6xl mx-auto">
        <FadeInWhenVisible>
          <div className="mb-12 flex items-start gap-4">
            <div className="w-0.5 bg-accent self-stretch mt-1 shrink-0" />
            <div>
              <p className="font-code text-xs text-text-dim mb-2 tracking-widest">01</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-text">featured</h2>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={project.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 32 }}
              >
                <h3 className="font-display font-bold text-5xl md:text-6xl text-text text-center mb-10">
                  {project.title}
                </h3>

                <GlowCard className="relative rounded-xl overflow-hidden border border-border mb-10">
                  <motion.div style={reduced ? undefined : { y: imgY }}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full object-cover"
                        style={{ aspectRatio: "16/7", maxHeight: "520px" }}
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center bg-surface-2"
                        style={{ aspectRatio: "16/7", maxHeight: "520px" }}
                      >
                        <div className="text-center">
                          <p className="font-display font-bold text-6xl text-border-bright tracking-tighter select-none">
                            {project.title}
                          </p>
                          <p className="font-code text-xs text-text-dim mt-4 tracking-widest uppercase">
                            {project.caption}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.badges.map(b => (
                      <span key={b} className="font-code text-xs px-2 py-0.5 rounded border border-border-bright text-text-dim bg-canvas/80 backdrop-blur-sm">
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-canvas/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <p className="font-code text-xs text-text-dim">{project.subtitle}</p>
                    <p className="font-code text-xs text-text-dim">{project.caption}</p>
                  </div>
                </GlowCard>

                <div className="text-center max-w-2xl mx-auto">
                  <p className="font-sans text-text-dim text-base md:text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {project.links.demo && (
                      <BorderBeamButton href={project.links.demo.href} variant="solid" icon={<ExternalLink size={15} />}>
                        {project.links.demo.label}
                      </BorderBeamButton>
                    )}
                    {project.links.github && (
                      <BorderBeamButton href={project.links.github.href} variant="outline" icon={<Github size={15} />}>
                        {project.links.github.label}
                      </BorderBeamButton>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-10">
                  {project.techStack.map(tech => (
                    <span key={tech} className="font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => go((index - 1 + FEATURED.length) % FEATURED.length, -1)}
              className="font-code text-sm text-text-dim hover:text-accent transition-colors"
              aria-label="Previous"
            >← prev</button>

            <div className="flex gap-2">
              {FEATURED.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className={`rounded-full transition-all duration-300 ${
                    i === index ? "w-6 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-border-bright hover:bg-text-dim"
                  }`}
                  aria-label={`Go to ${p.title}`}
                />
              ))}
            </div>

            <button
              onClick={() => go((index + 1) % FEATURED.length, 1)}
              className="font-code text-sm text-text-dim hover:text-accent transition-colors"
              aria-label="Next"
            >next →</button>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
