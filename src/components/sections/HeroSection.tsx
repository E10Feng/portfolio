"use client"

import { Github, Linkedin, Mail, FileDown } from "lucide-react"
import SocialLink from "@/components/ui/SocialLink"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

// TODO: Replace this placeholder portrait with E10's real photo.
// Swap the `portraitSrc` value below with the path to the actual image.
const PORTRAIT_SRC =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face"

const CODE_SNIPPETS_LEFT = ["<div>", "function", "{ }", "design"]
const CODE_SNIPPETS_RIGHT = ["</div>", "=>", "const", "return;"]

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 pt-16 overflow-hidden">
      <div className="max-w-6xl w-full">

        {/* ── Main 3-column layout: label | portrait | label ── */}
        <FadeInWhenVisible>
          <div className="grid grid-cols-3 items-center gap-8 mb-12">

            {/* ── LEFT — athlete ──────────────────────────────── */}
            <div className="text-right">
              <p className="text-5xl sm:text-6xl font-bold lowercase text-zinc-50 tracking-tight leading-none">
                athlete
              </p>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed ml-auto max-w-xs">
                Division III collegiate swimmer and recreational pickleball + tennis player.
              </p>
            </div>

            {/* ── CENTER — Split Portrait ─────────────────────── */}
            <div className="relative mx-auto" style={{ width: "280px", height: "360px" }}>
              {/* === LEFT HALF — painterly athlete === */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "inset(0 50% 0 0)" }}
              >
                <img
                  src={PORTRAIT_SRC}
                  alt="Portrait — athlete side"
                  className="w-full h-full object-cover"
                />
                {/* Teal + orange brushstroke overlay */}
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(0,188,212,0.55) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 70% 70%, rgba(255,87,34,0.45) 0%, transparent 60%), radial-gradient(ellipse 100% 40% at 50% 10%, rgba(0,188,212,0.3) 0%, transparent 50%)",
                  }}
                />
                {/* SVG painterly displacement filter */}
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <filter id="brush-left">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.035 0.06"
                      numOctaves="3"
                      seed="5"
                      result="noise"
                    />
                    <feDisplacementMap
                      in="SourceGraphic"
                      in2="noise"
                      scale="12"
                      xChannelSelector="R"
                      yChannelSelector="G"
                    />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#brush-left)" opacity="0.7" />
                </svg>
              </div>

              {/* === RIGHT HALF — B&W builder === */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "inset(0 0 0 50%)" }}
              >
                <img
                  src={PORTRAIT_SRC}
                  alt="Portrait — builder side"
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                {/* Dark vignette on the builder side for code snippet readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(13,13,13,0.2) 0%, transparent 30%, transparent 70%, rgba(13,13,13,0.4) 100%)",
                  }}
                />
                {/* Code snippet watermarks */}
                <div className="absolute inset-0 flex flex-col justify-between py-8 px-3 pointer-events-none">
                  {CODE_SNIPPETS_RIGHT.map((snippet, i) => (
                    <span
                      key={i}
                      className="font-mono text-xs text-zinc-300 opacity-[0.18] select-none"
                      style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (3 + i * 2)}deg)` }}
                    >
                      {snippet}
                    </span>
                  ))}
                </div>
              </div>

              {/* === Centre split line === */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-zinc-800 z-10" />
            </div>

            {/* ── RIGHT — builder ─────────────────────────────── */}
            <div className="text-left">
              <p className="text-5xl sm:text-6xl font-mono font-bold text-zinc-50 tracking-tight leading-none">
                &lt;builder&gt;
              </p>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
                Full-stack developer building AI-powered tools and LLM systems.
              </p>
            </div>

          </div>
        </FadeInWhenVisible>

        {/* ── Social links + CTA ─────────────────────────── */}
        <FadeInWhenVisible delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-10">
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
          <div className="text-center">
            <a
              href="#projects"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ↓ see more
            </a>
          </div>
        </FadeInWhenVisible>

      </div>
    </section>
  )
}
