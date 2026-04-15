"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"
import { ExternalLink, Github } from "lucide-react"

const FEATURED = [
  {
    id: "cyberclaw-city",
    title: "CyberClaw City",
    subtitle: "CYBERCLAW CITY v1.0",
    description:
      "A 3D explorable visualization of my AI agent architecture — built with React Three Fiber and Next.js. Navigate through districts representing memory, the build pipeline, job search tools, skills, and more. Each building is a functional component of the agent system.",
    image: "/cyberclaw-city-preview.jpg",
    badges: [
      { label: "7 districts", accent: "cyan" },
      { label: "3D WebGL", accent: "purple" },
    ],
    caption: "drag to orbit · scroll to zoom · F for first person",
    links: {
      demo: { href: "https://cyberclaw-city.vercel.app", label: "explore the city live" },
      github: { href: "https://github.com/E10Feng/cyberclaw-city", label: "view source" },
    },
    techStack: ["Next.js 14", "React Three Fiber", "Three.js", "TypeScript", "Zustand", "Framer Motion", "Vercel"],
  },
  {
    id: "gradyou8",
    title: "gradYOU8",
    subtitle: "GRADYOU8 v1.0",
    description:
      "Upload your WashU transcript and get a full graduation audit — which requirements you've satisfied, what's remaining, and an AI chat to answer questions about your degree. RAG pipeline over WashU Bulletin PDFs supports any major or minor without hardcoding.",
    image: null,
    badges: [
      { label: "RAG", accent: "cyan" },
      { label: "FastAPI", accent: "purple" },
    ],
    caption: "upload transcript · view requirements · chat with ai",
    links: {
      github: { href: "https://github.com/E10Feng/gradYOU8", label: "view source" },
    },
    techStack: ["FastAPI", "Python", "React", "Vite", "Minimax", "RAG"],
  },
]

const INTERVAL_MS = 4000

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
}

export default function FeaturedSection() {
  const [[index, dir], setSlide] = useState([0, 1])
  const [paused, setPaused] = useState(false)

  const go = useCallback((next: number, d: number) => {
    setSlide([next, d])
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setSlide(([i]) => [(i + 1) % FEATURED.length, 1])
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  const project = FEATURED[index]

  return (
    <section id="featured" className="py-24 px-6 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-5xl mx-auto">

        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-3">Featured Projects</p>
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
                {/* Title */}
                <h2 className="text-5xl md:text-6xl font-bold text-zinc-50 tracking-tight text-center mb-10">
                  {project.title}
                </h2>

                {/* Preview */}
                <div className="relative rounded-2xl overflow-hidden border border-zinc-700 mb-10 group">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-cover"
                      style={{ aspectRatio: "16/7", maxHeight: "520px" }}
                    />
                  ) : (
                    <div
                      className="w-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
                      style={{ aspectRatio: "16/7", maxHeight: "520px" }}
                    >
                      <div className="text-center">
                        <p className="text-6xl font-black text-zinc-700 tracking-tighter select-none">
                          {project.title}
                        </p>
                        <p className="text-sm font-mono text-zinc-600 mt-3">graduation audit · rag · ai chat</p>
                      </div>
                    </div>
                  )}

                  {/* Overlay badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.badges.map(b => (
                      <span
                        key={b.label}
                        className={`text-xs font-mono px-2 py-0.5 rounded border backdrop-blur-sm ${
                          b.accent === "cyan"
                            ? "border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                            : "border-purple-500/30 text-purple-400 bg-purple-500/10"
                        }`}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950/90 to-transparent" />

                  {/* Bottom caption */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <p className="text-xs font-mono text-cyan-400/60">{project.subtitle}</p>
                    <p className="text-xs text-zinc-500">{project.caption}</p>
                  </div>
                </div>

                {/* Description + links */}
                <div className="text-center max-w-2xl mx-auto">
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {project.links.demo && (
                      <a
                        href={project.links.demo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm transition-colors"
                      >
                        <ExternalLink size={16} />
                        {project.links.demo.label}
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-sm transition-colors"
                      >
                        <Github size={16} />
                        {project.links.github.label}
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap justify-center gap-2 mt-10">
                  {project.techStack.map(tech => (
                    <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full border border-zinc-800 text-zinc-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <button
              onClick={() => go((index - 1 + FEATURED.length) % FEATURED.length, -1)}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 p-2 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors backdrop-blur-sm"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => go((index + 1) % FEATURED.length, 1)}
              className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 p-2 rounded-full border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors backdrop-blur-sm"
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {FEATURED.map((p, i) => (
              <button
                key={p.id}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-cyan-400" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Go to ${p.title}`}
              />
            ))}
          </div>
        </FadeInWhenVisible>

      </div>
    </section>
  )
}
