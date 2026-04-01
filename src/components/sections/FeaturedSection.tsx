"use client"

import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"
import { ExternalLink, Github } from "lucide-react"

export default function FeaturedSection() {
  return (
    <section id="featured" className="py-24 px-6 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-5xl mx-auto">

        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-3">Featured Project</p>
            <h2 className="text-5xl md:text-6xl font-bold text-zinc-50 tracking-tight">
              CyberClaw City
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          {/* 3D scene preview */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-700 mb-10 group">
            <img
              src="/cyberclaw-city-preview.jpg"
              alt="CyberClaw City — 3D AI agent architecture visualization"
              className="w-full object-cover"
              style={{ aspectRatio: '16/7', maxHeight: '520px' }}
            />

            {/* Overlay badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-500/10 backdrop-blur-sm">
                7 districts
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-purple-500/30 text-purple-400 bg-purple-500/10 backdrop-blur-sm">
                3D WebGL
              </span>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950/90 to-transparent" />

            {/* Bottom caption */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <p className="text-xs font-mono text-cyan-400/60">CYBERCLAW CITY v1.0</p>
              <p className="text-xs text-zinc-500">drag to orbit · scroll to zoom · F for first person</p>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
              A 3D explorable visualization of my AI agent architecture — built with React Three Fiber and Next.js.
              Navigate through districts representing memory, the build pipeline, job search tools, skills, and more.
              Each building is a functional component of the agent system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://cyberclaw-city.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm transition-colors"
              >
                <ExternalLink size={16} />
                explore the city live
              </a>
              <a
                href="https://github.com/E10Feng/cyberclaw-city"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-medium text-sm transition-colors"
              >
                <Github size={16} />
                view source
              </a>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Tech stack */}
        <FadeInWhenVisible delay={0.3}>
          <div className="flex flex-wrap justify-center gap-2 mt-10">
            {['Next.js 14', 'React Three Fiber', 'Three.js', 'TypeScript', 'Zustand', 'Framer Motion', 'Vercel'].map(tech => (
              <span key={tech} className="text-xs font-mono px-3 py-1 rounded-full border border-zinc-800 text-zinc-500">
                {tech}
              </span>
            ))}
          </div>
        </FadeInWhenVisible>

      </div>
    </section>
  )
}
