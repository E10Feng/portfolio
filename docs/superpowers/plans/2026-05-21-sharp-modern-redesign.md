# Sharp Modern Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current warm-editorial design (Cormorant Garamond, brownish palette, ember orange) with a sharp modern aesthetic — near-black background, electric cyan accent, Syne + Plus Jakarta Sans + JetBrains Mono font stack.

**Architecture:** Foundation changes (globals.css + layout.tsx) must land first since all components depend on CSS tokens and font variables. After that, all component files are independent and can be rewritten in parallel.

**Tech Stack:** Next.js 16, Tailwind CSS v4, Framer Motion, next/font/google (Syne, Plus_Jakarta_Sans, JetBrains_Mono)

---

## Design System Reference

Every subagent must use ONLY these tokens. Do not use any zinc-, indigo-, cyan-, ember-, canvas-, ink-, gold-, or seam- classes from the old system.

### Color tokens (defined in globals.css, used as Tailwind utilities)

| CSS variable | Value | Tailwind classes |
|---|---|---|
| `--color-canvas` | `#050505` | `bg-canvas`, `text-canvas` |
| `--color-surface` | `#111111` | `bg-surface` |
| `--color-surface-2` | `#1a1a1a` | `bg-surface-2` |
| `--color-text` | `#f7f7f7` | `text-text` |
| `--color-text-dim` | `#666666` | `text-text-dim` |
| `--color-accent` | `#22d3ee` | `text-accent`, `bg-accent`, `border-accent` |
| `--color-border` | `#222222` | `border-border`, `bg-border` |
| `--color-border-bright` | `#333333` | `border-border-bright` |

### Font classes (defined in globals.css via next/font variables)

| Tailwind class | Font | Use |
|---|---|---|
| `font-display` | Syne | ALL headings, card titles, hero name |
| `font-sans` | Plus Jakarta Sans | Body text, descriptions, paragraphs |
| `font-code` | JetBrains Mono | Tags ONLY, dates, section numbers — not everywhere |

### Key UI patterns

**Section heading** (used in ProjectsSection, ResumeSection, ContactSection):
```tsx
<div className="mb-16 flex items-start gap-4">
  <div className="w-0.5 bg-accent self-stretch mt-1 shrink-0" />
  <div>
    <h2 className="font-display text-4xl md:text-5xl font-bold text-text">{title}</h2>
    {subtitle && <p className="font-sans mt-3 text-text-dim">{subtitle}</p>}
  </div>
</div>
```

**Project/resume card**:
```tsx
<div className="relative group bg-surface border border-border hover:border-border-bright rounded-lg p-6 transition-colors overflow-hidden">
  {/* Accent top line appears on hover */}
  <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
  {/* content */}
</div>
```

**CTA button**:
```tsx
<a className="font-display text-sm font-semibold px-5 py-2.5 bg-accent text-canvas rounded-md hover:bg-accent/90 transition-colors">
  label
</a>
```

**Ghost button**:
```tsx
<a className="font-display text-sm font-medium px-5 py-2.5 border border-border-bright text-text hover:border-accent/50 rounded-md transition-colors">
  label
</a>
```

**Tech tag**:
```tsx
<span className="font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded">label</span>
```

---

## Batch 1 — Foundation (do these first, sequentially, before any parallel tasks)

### Task 1: globals.css

**Files:** Modify `src/app/globals.css`

- [ ] **Replace the entire file with:**

```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme inline {
  /* Sharp modern palette */
  --color-canvas: #050505;
  --color-surface: #111111;
  --color-surface-2: #1a1a1a;
  --color-text: #f7f7f7;
  --color-text-dim: #666666;
  --color-accent: #22d3ee;
  --color-border: #222222;
  --color-border-bright: #333333;

  /* Font families — CSS vars injected by next/font onto <html> */
  --font-family-sans: var(--font-sans), system-ui, sans-serif;
  --font-family-display: var(--font-display), system-ui, sans-serif;
  --font-family-code: var(--font-mono), monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #050505;
  color: #f7f7f7;
  font-family: var(--font-sans), system-ui, sans-serif;
}
```

### Task 2: layout.tsx — font swap

**Files:** Modify `src/app/layout.tsx`

- [ ] **Replace font imports and apply to html element:**

```tsx
import type { Metadata } from "next"
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { TransitionProvider } from "@/components/animations/TransitionContext"
import ExpandOverlay from "@/components/animations/ExpandOverlay"

const display = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
})

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "E10 Feng — AI & Systems Engineering Portfolio",
  description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions developed at NASA and beyond.",
  openGraph: {
    title: "E10 Feng — AI & Systems Engineering Portfolio",
    description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions.",
    url: "https://portfolio-e10.vercel.app",
    siteName: "E10 Feng Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "E10 Feng Portfolio Preview" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E10 Feng — AI & Systems Engineering Portfolio",
    description: "AI and Systems Engineering intern portfolio featuring projects from NASA and RediMinds.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <TransitionProvider>
          <ExpandOverlay />
          <Navbar />
          {children}
          <Footer />
        </TransitionProvider>
      </body>
    </html>
  )
}
```

---

## Batch 2 — All components in parallel (after Batch 1 is complete)

### Task 3: Navbar + Footer

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Write Navbar.tsx:**

```tsx
"use client"

const navLinks = [
  { label: "home", href: "/#hero" },
  { label: "featured", href: "/#featured" },
  { label: "projects", href: "/#projects" },
  { label: "resume", href: "/#resume" },
  { label: "contact", href: "/#contact" },
  { label: "thoughts", href: "/thoughts" },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="/#hero" className="font-display font-bold text-lg text-text hover:text-accent transition-colors">
          ef
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-text-dim hover:text-text transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Write Footer.tsx:**

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <p className="font-sans text-sm text-text-dim">
          © {new Date().getFullYear()} ethan feng
        </p>
        <nav className="flex items-center gap-6">
          <Link href="/thoughts" className="font-sans text-sm text-text-dim hover:text-text transition-colors">
            thoughts
          </Link>
        </nav>
      </div>
    </footer>
  )
}
```

### Task 4: Shared UI primitives — SectionHeading, TechTag, Tag

**Files:**
- Modify: `src/components/ui/SectionHeading.tsx`
- Modify: `src/components/ui/TechTag.tsx`
- Modify: `src/components/ui/Tag.tsx`

- [ ] **Write SectionHeading.tsx:**

```tsx
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

interface Props {
  title: string
  number?: string
  subtitle?: string
}

export default function SectionHeading({ title, number, subtitle }: Props) {
  return (
    <FadeInWhenVisible className="mb-16">
      <div className="flex items-start gap-4">
        <div className="w-0.5 bg-accent self-stretch mt-1 shrink-0" />
        <div>
          {number && (
            <p className="font-code text-xs text-text-dim mb-2 tracking-widest">{number}</p>
          )}
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text">{title}</h2>
          {subtitle && (
            <p className="font-sans mt-3 text-text-dim">{subtitle}</p>
          )}
        </div>
      </div>
    </FadeInWhenVisible>
  )
}
```

- [ ] **Write TechTag.tsx:**

```tsx
interface Props {
  label: string
}

export default function TechTag({ label }: Props) {
  return (
    <span className="font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded">
      {label}
    </span>
  )
}
```

- [ ] **Write Tag.tsx:**

```tsx
interface TagProps {
  label: string
  href?: string
  onClick?: () => void
}

export default function Tag({ label, href, onClick }: TagProps) {
  const cls = "font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded hover:text-accent transition-colors"

  if (href) return <a href={href} className={cls}>{label}</a>
  if (onClick) return <button onClick={onClick} className={`${cls} cursor-pointer`}>{label}</button>
  return <span className="font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded">{label}</span>
}
```

### Task 5: HeroSection

**Files:** Modify `src/components/sections/HeroSection.tsx`

Portrait src is `/transparent (1).png` (a transparent PNG cutout of Ethan).

- [ ] **Write HeroSection.tsx:**

```tsx
"use client"

import { Github, Linkedin, Mail, FileDown } from "lucide-react"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

const PORTRAIT_SRC = "/transparent (1).png"

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-canvas flex items-center px-6 pt-16">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* Portrait */}
          <FadeInWhenVisible className="shrink-0">
            <div className="relative">
              <img
                src={PORTRAIT_SRC}
                alt="Ethan Feng"
                className="w-64 h-auto object-cover"
              />
            </div>
          </FadeInWhenVisible>

          {/* Text side */}
          <div className="flex-1 text-center md:text-left">
            <FadeInWhenVisible>
              <p className="font-code text-xs text-accent tracking-widest uppercase mb-4">
                AI Systems Engineer · Builder · D3 Swimmer
              </p>
              <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl text-text leading-none mb-6">
                Ethan<br />Feng
              </h1>
              <p className="font-sans text-text-dim text-lg leading-relaxed max-w-md mb-8">
                Building AI-powered tools, RAG pipelines, and LLM systems. Currently interning at RediMinds — previously NASA.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-6">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-sm px-5 py-2.5 bg-accent text-canvas rounded-md hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  <FileDown size={15} />
                  Resume
                </a>
                <a
                  href="https://github.com/E10Feng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-medium text-sm px-5 py-2.5 border border-border-bright text-text hover:border-accent/50 rounded-md transition-colors flex items-center gap-2"
                >
                  <Github size={15} />
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-6 justify-center md:justify-start">
                <a
                  href="https://linkedin.com/in/ethan-feng-604993221/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
                <a
                  href="mailto:ethan.burr@gmail.com"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <Mail size={14} />
                  ethan.burr@gmail.com
                </a>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>

        <div className="text-center mt-16 pb-8">
          <a href="#featured" className="font-code text-xs text-text-dim hover:text-accent transition-colors tracking-widest">
            ↓ scroll
          </a>
        </div>
      </div>
    </section>
  )
}
```

### Task 6: ProjectCard + ProjectsSection

**Files:**
- Modify: `src/components/ui/ProjectCard.tsx`
- Modify: `src/components/sections/ProjectsSection.tsx`

- [ ] **Write ProjectCard.tsx:**

```tsx
"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { Github, ExternalLink, FileText } from "lucide-react"
import { ProjectItem } from "@/types"
import { useCardTransition } from "@/components/animations/TransitionContext"
import TechTag from "./TechTag"

interface Props {
  project: ProjectItem
}

export default function ProjectCard({ project }: Props) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const { triggerTransition } = useCardTransition()

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    triggerTransition(rect, {
      kind: "project",
      title: project.title,
      description: project.description,
      year: project.year,
      techStack: project.techStack,
    })
    setTimeout(() => router.push(`/projects/${project.id}`), 100)
  }

  return (
    <div
      ref={cardRef}
      className="relative group flex flex-col h-full bg-surface border border-border hover:border-border-bright rounded-lg p-6 transition-colors overflow-hidden"
    >
      {/* Accent top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display font-semibold text-lg text-text leading-snug group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <span className="font-code text-xs text-text-dim shrink-0">{project.year}</span>
      </div>

      <p className="font-sans text-sm text-text-dim leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.map((tech) => (
          <TechTag key={tech} label={tech} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Github size={12} />
              code
            </a>
          )}
          {project.links.paper && (
            <a
              href={project.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <FileText size={12} />
              paper
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <ExternalLink size={12} />
              demo
            </a>
          )}
        </div>
        <a
          href={`/projects/${project.id}`}
          onClick={handleReadMore}
          className="font-sans text-xs text-text-dim hover:text-accent transition-colors shrink-0 cursor-pointer"
        >
          read more →
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Write ProjectsSection.tsx:**

```tsx
import { projects } from "@/data/projects"
import ProjectCard from "@/components/ui/ProjectCard"
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="02"
          title="projects"
          subtitle="AI, healthcare research, and backend engineering work"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...projects].sort((a, b) => {
            const aVal = a.date ?? `${a.year ?? 0}-01-01`
            const bVal = b.date ?? `${b.year ?? 0}-01-01`
            return bVal.localeCompare(aVal)
          }).map((project, index) => (
            <FadeInWhenVisible key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} />
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Task 7: TimelineItem + ResumeSection

**Files:**
- Modify: `src/components/ui/TimelineItem.tsx`
- Modify: `src/components/sections/ResumeSection.tsx`

- [ ] **Write TimelineItem.tsx:**

```tsx
"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { ResumeItem, ResumeItemType } from "@/types"
import { useCardTransition } from "@/components/animations/TransitionContext"
import TechTag from "./TechTag"

const dotColor: Record<ResumeItemType, string> = {
  education: "bg-accent",
  work: "bg-accent",
  research: "bg-text-dim",
  internship: "bg-accent",
}

const typeLabel: Record<ResumeItemType, string> = {
  education: "education",
  work: "work",
  research: "research",
  internship: "internship",
}

interface Props {
  item: ResumeItem
}

export default function TimelineItem({ item }: Props) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const { triggerTransition } = useCardTransition()

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    triggerTransition(rect, {
      kind: "resume",
      role: item.role,
      organization: item.organization,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      type: item.type,
      description: item.description,
      technologies: item.technologies,
    })
    setTimeout(() => router.push(`/resume/${item.id}`), 100)
  }

  return (
    <div className="relative pl-8">
      {/* Dot */}
      <span className={`absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full ${dotColor[item.type[0]]} ring-4 ring-canvas`} />

      {/* Card */}
      <div
        ref={cardRef}
        className="relative group bg-surface border border-border hover:border-border-bright rounded-lg p-6 overflow-hidden transition-colors"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-wrap items-center gap-3 mb-2">
          {item.type.map((t) => (
            <span key={t} className="font-code text-xs text-text-dim">{typeLabel[t]}</span>
          ))}
          <span className="font-code text-xs text-text-dim">
            {item.startDate} — {item.endDate}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-text mb-0.5 group-hover:text-accent transition-colors">
          {item.role}
        </h3>
        <p className="font-sans text-sm text-accent mb-4">
          {item.organization} · {item.location}
        </p>

        <ul className="space-y-2 mb-4">
          {item.description.map((bullet, i) => (
            <li key={i} className="font-sans text-sm text-text-dim flex gap-2.5">
              <span className="text-border-bright shrink-0 mt-0.5">—</span>
              {bullet}
            </li>
          ))}
        </ul>

        {item.technologies && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.technologies.map((tech) => (
              <TechTag key={tech} label={tech} />
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <a
            href={`/resume/${item.id}`}
            onClick={handleReadMore}
            className="font-sans text-xs text-text-dim hover:text-accent transition-colors cursor-pointer"
          >
            read more →
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Write ResumeSection.tsx:**

```tsx
import { FileDown } from "lucide-react"
import { resumeItems } from "@/data/resume"
import TimelineItem from "@/components/ui/TimelineItem"
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 px-6 bg-surface">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          number="03"
          title="timeline"
          subtitle="education, work, and research experience"
        />
        <div className="relative">
          <div className="absolute left-1 top-0 bottom-0 w-px bg-border-bright" />
          <div className="space-y-6">
            {resumeItems.map((item, index) => (
              <FadeInWhenVisible key={item.id} delay={index * 0.08}>
                <TimelineItem item={item} />
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
        <FadeInWhenVisible delay={0.1}>
          <div className="mt-12 flex">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-semibold text-sm px-5 py-2.5 bg-accent text-canvas rounded-md hover:bg-accent/90 transition-colors flex items-center gap-2"
            >
              <FileDown size={15} />
              download full resume
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
```

### Task 8: FeaturedSection

**Files:** Modify `src/components/sections/FeaturedSection.tsx`

- [ ] **Write FeaturedSection.tsx** (preserving carousel logic, updating all styling):

```tsx
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
    id: "gradyou8",
    title: "gradYOU8",
    subtitle: "GRADYOU8 v1.0",
    description: "Upload your WashU transcript and get a full graduation audit — which requirements you've satisfied, what's remaining, and an AI chat to answer questions about your degree. RAG pipeline over WashU Bulletin PDFs supports any major or minor without hardcoding.",
    image: null,
    badges: ["RAG", "FastAPI"],
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

  const go = useCallback((next: number, d: number) => { setSlide([next, d]) }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setSlide(([i]) => [(i + 1) % FEATURED.length, 1])
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused])

  const project = FEATURED[index]

  return (
    <section id="featured" className="py-24 px-6 bg-surface border-y border-border">
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

                {/* Preview */}
                <div className="relative rounded-xl overflow-hidden border border-border mb-10">
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

                  {/* Badges */}
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
                </div>

                {/* Description + links */}
                <div className="text-center max-w-2xl mx-auto">
                  <p className="font-sans text-text-dim text-base md:text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {project.links.demo && (
                      <a
                        href={project.links.demo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display font-semibold text-sm px-6 py-3 bg-accent text-canvas rounded-md hover:bg-accent/90 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink size={15} />
                        {project.links.demo.label}
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display font-medium text-sm px-6 py-3 border border-border-bright text-text hover:border-accent/50 rounded-md transition-colors flex items-center gap-2"
                      >
                        <Github size={15} />
                        {project.links.github.label}
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap justify-center gap-2 mt-10">
                  {project.techStack.map(tech => (
                    <span key={tech} className="font-code text-xs text-text-dim bg-surface-2 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <button
              onClick={() => go((index - 1 + FEATURED.length) % FEATURED.length, -1)}
              className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full border border-border-bright bg-surface text-text-dim hover:text-text hover:border-accent/50 transition-colors flex items-center justify-center text-lg"
              aria-label="Previous"
            >‹</button>
            <button
              onClick={() => go((index + 1) % FEATURED.length, 1)}
              className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full border border-border-bright bg-surface text-text-dim hover:text-text hover:border-accent/50 transition-colors flex items-center justify-center text-lg"
              aria-label="Next"
            >›</button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
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
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
```

### Task 9: ContactSection + ExpandOverlay

**Files:**
- Modify: `src/components/sections/ContactSection.tsx`
- Modify: `src/components/animations/ExpandOverlay.tsx`

- [ ] **Write ContactSection.tsx:**

```tsx
import SectionHeading from "@/components/ui/SectionHeading"
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible"

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-canvas">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          number="04"
          title="contact"
          subtitle="open to interesting conversations, collaborations, and full-time roles"
        />
        <FadeInWhenVisible delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            <a
              href="https://www.linkedin.com/in/ethan-feng-604993221/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-text hover:text-accent transition-colors"
            >
              linkedin ↗
            </a>
            <a
              href="mailto:ethan.burr@gmail.com"
              className="font-sans text-text hover:text-accent transition-colors"
            >
              ethan.burr@gmail.com ↗
            </a>
            <a
              href="https://github.com/E10Feng"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-text hover:text-accent transition-colors"
            >
              github ↗
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
```

- [ ] **Write ExpandOverlay.tsx** (update background color to match new surface; preserve all animation logic):

```tsx
"use client"

import { motion } from "framer-motion"
import { useCardTransition } from "./TransitionContext"

const typeLabel: Record<string, string> = {
  education: "education",
  work: "work",
  research: "research",
  internship: "internship",
}

export default function ExpandOverlay() {
  const { state } = useCardTransition()
  const { rect, card, phase } = state

  if (phase === "idle" || !rect || !card) return null

  const vw = typeof window !== "undefined" ? window.innerWidth : 1440
  const vh = typeof window !== "undefined" ? window.innerHeight : 900
  const fullscreen = { top: -2, left: -2, width: vw + 4, height: vh + 4, borderRadius: 0 }

  return (
    <>
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 99, background: "rgba(5,5,5,0.85)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "fading" ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.div
        className="fixed overflow-hidden pointer-events-none"
        style={{ zIndex: 100, background: "#111111" }}
        initial={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 8, opacity: 1 }}
        animate={{ ...fullscreen, opacity: phase === "fading" ? 0 : 1 }}
        transition={
          phase === "fading"
            ? { duration: 0.5, ease: "easeInOut" }
            : { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
        }
      >
        <motion.div
          className="p-6"
          style={{ fontFamily: "var(--font-sans)" }}
          initial={{ opacity: 1, filter: "blur(0px)" }}
          animate={phase === "fading" ? { opacity: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: "easeIn" }}
        >
          {card.kind === "resume" ? (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {card.type.map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{typeLabel[t] ?? t}</span>
                ))}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{card.startDate} — {card.endDate}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#f7f7f7" }}>{card.role}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#22d3ee", marginBottom: "0.75rem" }}>{card.organization} · {card.location}</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {card.description.map((bullet, i) => (
                  <li key={i} style={{ fontSize: "0.875rem", color: "#666", display: "flex", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{ color: "#333" }}>—</span>{bullet}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.75rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#f7f7f7" }}>{card.title}</h3>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666" }}>{card.year}</span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#666", marginBottom: "1rem" }}>{card.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {card.techStack.map((tech) => (
                  <span key={tech} style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#666", background: "#1a1a1a", padding: "2px 8px", borderRadius: "4px" }}>{tech}</span>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
```

### Task 10: Thoughts pages + components

**Files:**
- Modify: `src/app/thoughts/page.tsx`
- Modify: `src/components/thoughts/ThoughtCard.tsx`
- Modify: `src/components/thoughts/BackLink.tsx`
- Modify: `src/app/thoughts/[slug]/page.tsx`

- [ ] **Write thoughts/page.tsx:**

```tsx
import { getAllThoughts } from '@/lib/thoughts'
import ThoughtCard from '@/components/thoughts/ThoughtCard'

export const metadata = {
  title: 'My Thoughts — E10 Feng',
  description: 'Writing on AI, systems engineering, and building things.',
}

export default function ThoughtsPage() {
  const thoughts = getAllThoughts()

  return (
    <main className="min-h-screen bg-canvas pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 flex items-start gap-4">
          <div className="w-0.5 bg-accent self-stretch mt-1 shrink-0" />
          <div>
            <p className="font-code text-xs text-text-dim mb-2 tracking-widest">writing</p>
            <h1 className="font-display font-bold text-5xl text-text mb-3">my thoughts</h1>
            <p className="font-sans text-text-dim">On AI, systems engineering, and building things.</p>
          </div>
        </header>

        {thoughts.length === 0 ? (
          <p className="font-sans text-text-dim">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-6">
            {thoughts.map(thought => (
              <ThoughtCard key={thought.slug} thought={thought} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
```

- [ ] **Write ThoughtCard.tsx:**

```tsx
import Link from 'next/link'
import Tag from '@/components/ui/Tag'
import { Thought } from '@/lib/thoughts'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ThoughtCard({ thought }: { thought: Thought }) {
  return (
    <Link href={`/thoughts/${thought.slug}`} className="group block">
      <article className="relative bg-surface border border-border hover:border-border-bright rounded-lg p-6 transition-colors overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 mb-3">
          <time className="font-code text-xs text-text-dim">{formatDate(thought.date)}</time>
          <div className="flex gap-1.5 flex-wrap">
            {thought.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>
        </div>
        <h2 className="font-display font-bold text-2xl text-text group-hover:text-accent transition-colors mb-2">
          {thought.title}
        </h2>
        <p className="font-sans text-sm text-text-dim leading-relaxed">{thought.excerpt}</p>
        <div className="mt-4 font-sans text-xs text-text-dim group-hover:text-accent transition-colors">
          read more →
        </div>
      </article>
    </Link>
  )
}
```

- [ ] **Write BackLink.tsx:**

```tsx
import Link from 'next/link'

export default function BackLink() {
  return (
    <Link
      href="/thoughts"
      className="font-sans text-sm text-text-dim hover:text-accent transition-colors mb-8 inline-block"
    >
      ← all thoughts
    </Link>
  )
}
```

- [ ] **Write thoughts/[slug]/page.tsx** (preserve all existing logic, update styling only):

```tsx
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getThoughtBySlug, getAllThoughts } from '@/lib/thoughts'
import BackLink from '@/components/thoughts/BackLink'
import Tag from '@/components/ui/Tag'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllThoughts().map(t => ({ slug: t.slug }))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const thought = getThoughtBySlug(slug)
  if (!thought) return {}
  return { title: `${thought.title} — My Thoughts`, description: thought.excerpt }
}

export default async function ThoughtPostPage({ params }: PageProps) {
  const { slug } = await params
  const thought = getThoughtBySlug(slug)
  if (!thought) notFound()

  return (
    <main className="min-h-screen bg-canvas pt-24 pb-16 px-6">
      <article className="max-w-2xl mx-auto">
        <BackLink />
        <header className="mb-12">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-text mb-5 leading-tight">
            {thought.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <time className="font-code text-xs text-text-dim">{formatDate(thought.date)}</time>
            <div className="flex gap-2 flex-wrap">
              {thought.tags.map(tag => <Tag key={tag} label={tag} />)}
            </div>
          </div>
        </header>
        <div className="prose max-w-none [&_p]:font-sans [&_p]:text-text-dim [&_p]:leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-text [&_h3]:font-display [&_h3]:font-bold [&_h3]:text-text [&_a]:text-accent [&_a]:no-underline [&_a:hover]:underline [&_code]:font-code [&_code]:text-text-dim [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-surface [&_pre]:border [&_pre]:border-border [&_pre]:rounded-lg">
          <MDXRemote source={thought.content} />
        </div>
      </article>
    </main>
  )
}
```

### Task 11: Detail pages

**Files:**
- Modify: `src/app/projects/[id]/page.tsx`
- Modify: `src/app/resume/[id]/page.tsx`

- [ ] **Write projects/[id]/page.tsx:**

```tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink, FileText } from "lucide-react"
import { projects } from "@/data/projects"
import PageTransition from "@/components/animations/PageTransition"
import FloatingBubbles from "@/components/animations/FloatingBubbles"
import TechTag from "@/components/ui/TechTag"

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <main className="min-h-screen bg-canvas px-6 py-24">
      <FloatingBubbles tags={project.techStack} />
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          <Link href="/#projects" className="font-sans text-sm text-text-dim hover:text-accent transition-colors mb-10 inline-block">
            ← back to projects
          </Link>

          <div className="mb-4">
            <span className="font-code text-xs text-text-dim">{project.year}</span>
            <h1 className="font-display font-bold text-5xl text-text mt-2 mb-3">{project.title}</h1>
            <p className="font-sans text-text-dim leading-relaxed mb-5">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map(tech => <TechTag key={tech} label={tech} />)}
            </div>
            <div className="flex items-center gap-6">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5">
                  <Github size={14} /> code
                </a>
              )}
              {project.links.paper && (
                <a href={project.links.paper} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5">
                  <FileText size={14} /> paper
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                  className="font-sans text-sm text-text-dim hover:text-accent transition-colors flex items-center gap-1.5">
                  <ExternalLink size={14} /> demo
                </a>
              )}
            </div>
          </div>

          <div className="border-t border-border my-10" />

          {project.content && project.content.length > 0 ? (
            <div className="space-y-8">
              {project.content.map((block, i) => {
                if (block.type === "text") return (
                  <p key={i} className="font-sans text-text-dim leading-relaxed whitespace-pre-line">{block.content}</p>
                )
                if (block.type === "image") return (
                  <figure key={i} className="space-y-2">
                    <div className="relative w-full overflow-hidden rounded-lg border border-border">
                      <Image src={block.src} alt={block.alt} width={1200} height={800} className="w-full h-auto object-cover" />
                    </div>
                    {block.caption && <figcaption className="font-code text-xs text-text-dim text-center">{block.caption}</figcaption>}
                  </figure>
                )
              })}
            </div>
          ) : (
            <p className="font-sans text-text-dim italic">more details coming soon.</p>
          )}
        </div>
      </PageTransition>
    </main>
  )
}
```

- [ ] **Write resume/[id]/page.tsx:**

```tsx
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { resumeItems } from "@/data/resume"
import PageTransition from "@/components/animations/PageTransition"
import FloatingBubbles from "@/components/animations/FloatingBubbles"
import TechTag from "@/components/ui/TechTag"

interface Props { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return resumeItems.map((r) => ({ id: r.id }))
}

const typeLabel: Record<string, string> = {
  education: "education", work: "work", research: "research", internship: "internship",
}

export default async function ResumeDetailPage({ params }: Props) {
  const { id } = await params
  const item = resumeItems.find((r) => r.id === id)
  if (!item) notFound()

  return (
    <main className="min-h-screen bg-canvas px-6 py-24">
      {item.technologies && <FloatingBubbles tags={item.technologies} />}
      <PageTransition>
        <div className="max-w-3xl mx-auto">
          <Link href="/#resume" className="font-sans text-sm text-text-dim hover:text-accent transition-colors mb-10 inline-block">
            ← back to resume
          </Link>

          <div className="mb-4">
            <div className="flex flex-wrap gap-3 mb-2">
              {item.type.map((t) => (
                <span key={t} className="font-code text-xs text-text-dim">{typeLabel[t]}</span>
              ))}
              <span className="font-code text-xs text-text-dim">{item.startDate} — {item.endDate}</span>
            </div>
            <h1 className="font-display font-bold text-5xl text-text mt-2 mb-1">{item.role}</h1>
            <p className="font-sans text-sm text-accent mb-5">{item.organization} · {item.location}</p>
            <ul className="space-y-2 mb-5">
              {item.description.map((bullet, i) => (
                <li key={i} className="font-sans text-text-dim flex gap-2.5 text-sm">
                  <span className="text-border-bright shrink-0 mt-0.5">—</span>{bullet}
                </li>
              ))}
            </ul>
            {item.technologies && (
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map(tech => <TechTag key={tech} label={tech} />)}
              </div>
            )}
          </div>

          <div className="border-t border-border my-10" />

          {item.photos && item.photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {item.photos.map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                  <Image src={src} alt={`${item.organization} photo ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {item.content && item.content.length > 0 ? (
            <div className="space-y-8">
              {item.content.map((block, i) => {
                if (block.type === "text") return (
                  <p key={i} className="font-sans text-text-dim leading-relaxed whitespace-pre-line">{block.content}</p>
                )
                if (block.type === "image") return (
                  <figure key={i} className="space-y-2">
                    <div className="relative w-full overflow-hidden rounded-lg border border-border">
                      <Image src={block.src} alt={block.alt} width={1200} height={800} className="w-full h-auto object-cover" />
                    </div>
                    {block.caption && <figcaption className="font-code text-xs text-text-dim text-center">{block.caption}</figcaption>}
                  </figure>
                )
              })}
            </div>
          ) : (
            <p className="font-sans text-text-dim italic">more details coming soon.</p>
          )}
        </div>
      </PageTransition>
    </main>
  )
}
```

---

## Execution order summary

1. **Do Task 1 and Task 2 first** (globals.css + layout.tsx) — everything else depends on these CSS tokens and font variables being in place.
2. **Then run Tasks 3–11 all in parallel** — they are all separate files with no write conflicts.
