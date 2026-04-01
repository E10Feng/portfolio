"use client"

import { Github, Linkedin, Mail, FileDown } from "lucide-react"
import SocialLink from "@/components/ui/SocialLink"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

const PORTRAIT_SRC = "/portrait.jpg"

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
      <div className="w-full max-w-5xl">

        {/* ── Portrait + floating labels ── */}
        <FadeInWhenVisible>
          <div className="relative w-full flex flex-col items-center">

            {/* ── Left label: <builder> — floats over left shoulder ── */}
            <div className="hidden md:flex flex-col items-start w-full" style={{ marginBottom: '-2rem' }}>
              <p
                className="font-mono text-6xl lg:text-7xl font-bold text-zinc-50 tracking-tight leading-none"
                style={{ textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7)' }}
              >
                &lt;builder&gt;
              </p>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
                full-stack developer building ai-powered tools and llm systems
              </p>
            </div>

            {/* ── Centered portrait — clean, full, untouched ── */}
            <div className="relative w-full flex justify-center">
              {/* Left label overlay on mobile */}
              <div className="md:hidden flex flex-col items-start mb-4">
                <p className="font-mono text-5xl font-bold text-zinc-50 tracking-tight leading-none">
                  &lt;builder&gt;
                </p>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed max-w-xs">
                  full-stack developer building ai-powered tools and llm systems
                </p>
              </div>

              <div className="relative">
                <img
                  src={PORTRAIT_SRC}
                  alt="Ethan Feng"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover rounded-2xl"
                  style={{ display: 'block' }}
                />

                {/* Right label overlay — mobile only, inside portrait bottom */}
                <div className="md:hidden absolute bottom-4 left-4">
                  <p className="text-5xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
                    athlete
                  </p>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed max-w-xs">
                    division iii collegiate swimmer and recreational pickleball + tennis player
                  </p>
                </div>

                {/* Right label — desktop, floats over right shoulder area */}
                <div
                  className="hidden md:flex flex-col items-end absolute right-0 top-1/2"
                  style={{ transform: 'translateY(-50%)' }}
                >
                  <p
                    className="text-6xl lg:text-7xl font-bold lowercase text-zinc-50 tracking-tight leading-none"
                    style={{ textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.7)' }}
                  >
                    athlete
                  </p>
                  <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs text-right">
                    division iii collegiate swimmer and recreational pickleball + tennis player
                  </p>
                </div>
              </div>
            </div>

            {/* Spacer for mobile layout */}
            <div className="md:hidden" style={{ height: '8rem' }} />
          </div>
        </FadeInWhenVisible>

        {/* ── Social links + CTA ─────────────────────────── */}
        <FadeInWhenVisible delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pb-4 mt-6">
            <SocialLink href="https://github.com/E10Feng" icon={Github} label="github" />
            <SocialLink href="https://linkedin.com/in/ethan-feng-604993221/" icon={Linkedin} label="linkedin" />
            <SocialLink href="mailto:ethan.burr@gmail.com" icon={Mail} label="email" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              <FileDown size={16} />
              resume pdf
            </a>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.3}>
          <div className="text-center pb-8 md:pb-0">
            <a
              href="#featured"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ↓ see featured
            </a>
          </div>
        </FadeInWhenVisible>

      </div>
    </section>
  )
}
