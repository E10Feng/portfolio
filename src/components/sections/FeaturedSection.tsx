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
          <div className="relative rounded-2xl overflow-hidden border border-zinc-700 mb-10 group"
            style={{
              background: 'linear-gradient(135deg, #050508 0%, #0a0520 50%, #050508 100%)',
              aspectRatio: '16/7',
              maxHeight: '480px',
            }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* City silhouette hints */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end gap-2 px-8 pb-6">
              {[
                { h: 120, w: 20, c: '#7c3aed' },
                { h: 80, w: 16, c: '#0d9488' },
                { h: 160, w: 24, c: '#06b6d4' },
                { h: 60, w: 18, c: '#d946ef' },
                { h: 100, w: 22, c: '#10b981' },
                { h: 90, w: 16, c: '#f97316' },
                { h: 140, w: 20, c: '#3b82f6' },
              ].map((b, i) => (
                <div
                  key={i}
                  className="rounded-t-sm group-hover:opacity-80 transition-opacity"
                  style={{
                    height: `${b.h}px`,
                    width: `${b.w}px`,
                    background: `linear-gradient(to top, ${b.c}60, ${b.c}20)`,
                    boxShadow: `0 0 20px ${b.c}40`,
                  }}
                />
              ))}
            </div>

            {/* Title overlay */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-mono text-cyan-400/70">CYBERCLAW CITY v1.0</p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400/70 bg-cyan-500/10">
                  7 districts
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded border border-purple-500/30 text-purple-400/70 bg-purple-500/10">
                  3D WebGL
                </span>
              </div>
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
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
