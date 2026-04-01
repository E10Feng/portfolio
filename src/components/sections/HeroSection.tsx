"use client"

import { Github, Linkedin, Mail, FileDown } from "lucide-react"
import SocialLink from "@/components/ui/SocialLink"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

const PORTRAIT_SRC = "/portrait.jpg"

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 pt-16 overflow-hidden">
      <FadeInWhenVisible>
        <div className="relative w-full max-w-5xl flex flex-col items-center">

          {/* ── Portrait — absolutely positioned relative to this container ── */}
          <div className="relative w-full max-w-2xl mx-auto">
            <img
              src={PORTRAIT_SRC}
              alt="Ethan Feng"
              className="w-full h-auto object-cover rounded-2xl block"
            />

            {/* ── <builder> — floats over left shoulder area ── */}
            <div className="hidden md:block absolute left-0 top-1/3 w-48 pt-2 pl-4">
              <p className="font-mono text-5xl font-bold text-zinc-50 tracking-tight leading-none">
                &lt;builder&gt;
              </p>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                full-stack developer building ai-powered tools and llm systems
              </p>
            </div>

            {/* ── athlete — floats over right shoulder area ── */}
            <div className="hidden md:block absolute right-0 top-1/3 w-48 pt-2 pr-4 text-right">
              <p className="text-5xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
                athlete
              </p>
              <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                division iii collegiate swimmer and recreational pickleball + tennis player
              </p>
            </div>

            {/* ── Mobile labels — below portrait ── */}
            <div className="md:hidden flex flex-col items-center text-center mt-6 gap-6">
              <div>
                <p className="font-mono text-4xl font-bold text-zinc-50 tracking-tight leading-none">
                  &lt;builder&gt;
                </p>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-xs">
                  full-stack developer building ai-powered tools and llm systems
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
                  athlete
                </p>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-xs">
                  division iii collegiate swimmer and recreational pickleball + tennis player
                </p>
              </div>
            </div>
          </div>

          {/* ── Social links + CTA ─────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pb-4 mt-8">
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

          <a
            href="#featured"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors mt-2"
          >
            ↓ see featured
          </a>

        </div>
      </FadeInWhenVisible>
    </section>
  )
}
