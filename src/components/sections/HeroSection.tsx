"use client"

import { Github, Linkedin, Mail, FileDown } from "lucide-react"
import SocialLink from "@/components/ui/SocialLink"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

const PORTRAIT_SRC = "/imageedit_3_9739108414.png"

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 pt-16 overflow-hidden">
      <FadeInWhenVisible>
        <div className="w-full max-w-6xl">

          {/* ── 3-column grid: <builder> | portrait | athlete ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8">

            {/* ── LEFT — <builder> ── */}
            <div className="hidden md:flex flex-col items-start text-left">
              <p className="font-mono text-6xl xl:text-7xl font-bold text-zinc-50 tracking-tight leading-none">
                &lt;builder&gt;
              </p>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-[14rem]">
                full-stack developer building ai-powered tools and llm systems
              </p>
            </div>

            {/* ── CENTER — portrait ── */}
            <div className="flex justify-center">
              <img
                src={PORTRAIT_SRC}
                alt="Ethan Feng"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover rounded-2xl block"
              />
            </div>

            {/* ── RIGHT — athlete ── */}
            <div className="hidden md:flex flex-col items-end text-right">
              <p className="text-6xl xl:text-7xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
                athlete
              </p>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-[14rem]">
                division iii collegiate swimmer and recreational pickleball + tennis player
              </p>
            </div>

          </div>

          {/* ── Mobile labels — below portrait ── */}
          <div className="md:hidden flex flex-col items-center text-center mt-8 gap-6">
            <div>
              <p className="font-mono text-5xl font-bold text-zinc-50 tracking-tight leading-none">
                &lt;builder&gt;
              </p>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                full-stack developer building ai-powered tools and llm systems
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
                athlete
              </p>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                division iii collegiate swimmer and recreational pickleball + tennis player
              </p>
            </div>
          </div>

          {/* ── Social links + CTA ─────────────────────────── */}
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

          <div className="text-center pb-8 md:pb-0">
            <a
              href="#featured"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ↓ see featured
            </a>
          </div>

        </div>
      </FadeInWhenVisible>
    </section>
  )
}
