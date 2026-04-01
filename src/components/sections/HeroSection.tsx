"use client"

import { Github, Linkedin, Mail, FileDown } from "lucide-react"
import SocialLink from "@/components/ui/SocialLink"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

const PORTRAIT_SRC = "/imageedit_3_9739108414.png"

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">

      {/* ── Hero section bg — light to separate from dark nav ── */}
      <div className="w-full max-w-5xl pt-16">

        <FadeInWhenVisible>
          {/* ── Portrait with overlaid labels at eye level ── */}
          <div className="relative w-full">

            <img
              src={PORTRAIT_SRC}
              alt="Ethan Feng"
              className="w-full max-w-2xl mx-auto h-auto object-cover block rounded-2xl"
            />

            {/* ── <builder> — left side, eye level ── */}
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-40">
              <p className="font-mono text-6xl font-bold text-zinc-50 tracking-tight leading-none">
                &lt;builder&gt;
              </p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                full-stack developer building ai-powered tools and llm systems
              </p>
            </div>

            {/* ── athlete — right side, eye level ── */}
            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-40 text-right">
              <p className="text-6xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
                athlete
              </p>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                division iii collegiate swimmer and recreational pickleball + tennis player
              </p>
            </div>

          </div>
        </FadeInWhenVisible>

        {/* ── Mobile labels — below portrait ── */}
        <div className="md:hidden flex flex-col items-center text-center mt-8 gap-6">
          <div>
            <p className="font-mono text-4xl font-bold text-zinc-50 tracking-tight leading-none">
              &lt;builder&gt;
            </p>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
              full-stack developer building ai-powered tools and llm systems
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
              athlete
            </p>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
              division iii collegiate swimmer and recreational pickleball + tennis player
            </p>
          </div>
        </div>

        {/* ── Social links + CTA ─────────────────────────── */}
        <FadeInWhenVisible delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pb-4 mt-10">
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

        <div className="text-center pb-8">
          <a
            href="#featured"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ↓ see featured
          </a>
        </div>

      </div>
    </section>
  )
}
