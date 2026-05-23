# VS Code Parody Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio navbar with a VS Code-style tab bar where clicking a tab swaps the content inside the hero editor chrome.

**Architecture:** A `TabContext` holds the active tab as client-side state. A new `VSCodeTabBar` replaces `<Navbar>` in the root layout and reads/sets that context. The hero editor chrome becomes a content switcher rendering one of four file components (`EthanFile`, `ProjectsFile`, `ResumeFile`, `ContactFile`) based on the active tab.

**Tech Stack:** Next.js 16 App Router, React context, Framer Motion, Tailwind CSS v4, TypeScript

---

## File Map

| Status | File | Role |
|--------|------|------|
| **Create** | `src/context/TabContext.tsx` | Tab state — `activeTab`, `setActiveTab`, `TabProvider`, `useTab` |
| **Create** | `src/components/editor/animations.ts` | Shared Framer Motion variants used by all file components |
| **Create** | `src/components/editor/EthanFile.tsx` | ETHAN.md content (extracted from HeroSection) |
| **Create** | `src/components/editor/ProjectsFile.tsx` | PROJECTS.md content from `src/data/projects.ts` |
| **Create** | `src/components/editor/ResumeFile.tsx` | RESUME.md content from `src/data/resume.ts` |
| **Create** | `src/components/editor/ContactFile.tsx` | CONTACT.md content |
| **Create** | `src/components/layout/VSCodeTabBar.tsx` | Fixed tab bar replacing Navbar |
| **Modify** | `src/components/sections/HeroSection.tsx` | Remove internal tab bar; add content switcher |
| **Modify** | `src/components/sections/FeaturedSection.tsx` | Conditionally render only when `activeTab === 'ethan'` |
| **Modify** | `src/app/layout.tsx` | Add `TabProvider`, swap `<Navbar>` → `<VSCodeTabBar>` |
| **Modify** | `src/app/page.tsx` | Remove `ProjectsSection`, `ResumeSection`, `ContactSection` |

---

## Task 1: TabContext

**Files:**
- Create: `src/context/TabContext.tsx`

- [ ] **Step 1: Create `src/context/TabContext.tsx`**

```tsx
"use client"

import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export type Tab = "ethan" | "projects" | "resume" | "contact"

interface TabContextType {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const TabContext = createContext<TabContextType | null>(null)

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>("ethan")
  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab(): TabContextType {
  const ctx = useContext(TabContext)
  if (!ctx) throw new Error("useTab must be used within <TabProvider>")
  return ctx
}
```

- [ ] **Step 2: Commit**

```bash
git add src/context/TabContext.tsx
git commit -m "feat: add TabContext for VS Code tab state"
```

---

## Task 2: Shared animation variants

**Files:**
- Create: `src/components/editor/animations.ts`

- [ ] **Step 1: Create `src/components/editor/animations.ts`**

These are the same variants currently defined inside `HeroSection.tsx`. Extracting them prevents repeating them in every file component.

```ts
export const editorContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

export const editorLine = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/editor/animations.ts
git commit -m "feat: add shared editor animation variants"
```

---

## Task 3: EthanFile component

**Files:**
- Create: `src/components/editor/EthanFile.tsx`

This is a straight extraction of the content currently inside `HeroSection`'s `<motion.div>`. No logic changes — just moves it into its own file and uses the shared variants.

- [ ] **Step 1: Create `src/components/editor/EthanFile.tsx`**

```tsx
"use client"

import { motion } from "framer-motion"
import { FileDown, Github, Linkedin, Mail } from "lucide-react"
import { editorContainer, editorLine } from "./animations"

export default function EthanFile() {
  return (
    <motion.div
      key="ethan"
      className="p-6 md:p-8 font-code text-sm leading-7"
      variants={editorContainer}
      initial="hidden"
      animate="show"
    >
      {/* Frontmatter */}
      <motion.p variants={editorLine} className="text-text-dim">---</motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">name</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">Ethan Feng</span>
      </motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">role</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">AI Engineer · Biologist · NCAA DIII Swammer</span>
      </motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">location</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">Remote / Detroit, MI</span>
      </motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">status</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">open to full-time roles</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {/* About */}
      <motion.p variants={editorLine} className="mb-1">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">About</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim">Building AI-powered tools and software, particularly in healthcare domains.</motion.p>
      <motion.p variants={editorLine} className="text-text-dim">Currently at RediMinds — previously NASA.</motion.p>
      <motion.p variants={editorLine} className="text-text-dim">WashU grad, Computational Biology, 3.9 GPA.</motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">7x NCAA All-American swimmer.</motion.p>

      {/* Stack */}
      <motion.p variants={editorLine} className="mb-1">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Stack</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">
        Python · LangGraph · FastAPI · Next.js · RAG · PostgreSQL
      </motion.p>

      {/* Currently working on */}
      <motion.p variants={editorLine} className="mb-1">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Currently working on</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim">
        <span className="text-text-dim">- </span>
        Automated medical necessity review system (RediMinds)
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">
        <span className="text-text-dim">- </span>
        BalanceWell — fall prevention app for older adults
      </motion.p>

      {/* Links */}
      <motion.p variants={editorLine} className="mb-2">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Links</span>
      </motion.p>
      <motion.div variants={editorLine} className="flex flex-wrap gap-x-6 gap-y-2">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline flex items-center gap-1.5"
        >
          <FileDown size={13} />
          Resume ↗
        </a>
        <a
          href="https://github.com/E10Feng"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
        >
          <Github size={13} />
          GitHub ↗
        </a>
        <a
          href="https://linkedin.com/in/ethan-feng-604993221/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
        >
          <Linkedin size={13} />
          LinkedIn ↗
        </a>
        <a
          href="mailto:ethan.burr@gmail.com"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-1.5"
        >
          <Mail size={13} />
          ethan.burr@gmail.com ↗
        </a>
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/editor/EthanFile.tsx
git commit -m "feat: extract EthanFile editor component"
```

---

## Task 4: ProjectsFile component

**Files:**
- Create: `src/components/editor/ProjectsFile.tsx`

- [ ] **Step 1: Create `src/components/editor/ProjectsFile.tsx`**

```tsx
"use client"

import { motion } from "framer-motion"
import { projects } from "@/data/projects"
import { editorContainer, editorLine } from "./animations"

export default function ProjectsFile() {
  return (
    <motion.div
      key="projects"
      className="p-6 md:p-8 font-code text-sm leading-7"
      variants={editorContainer}
      initial="hidden"
      animate="show"
    >
      {/* Frontmatter */}
      <motion.p variants={editorLine} className="text-text-dim">---</motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">type</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">portfolio</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {/* Projects list */}
      <motion.p variants={editorLine} className="mb-4">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Projects</span>
      </motion.p>

      {projects.map((project) => (
        <motion.p key={project.id} variants={editorLine} className="text-text-dim mb-2">
          <span className="text-text-dim">- </span>
          <a
            href={`/projects/${project.id}`}
            className="text-accent hover:underline"
          >
            {project.title}
          </a>
          <span className="text-text-dim"> — {project.description}</span>
        </motion.p>
      ))}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/editor/ProjectsFile.tsx
git commit -m "feat: add ProjectsFile editor component"
```

---

## Task 5: ResumeFile component

**Files:**
- Create: `src/components/editor/ResumeFile.tsx`

- [ ] **Step 1: Create `src/components/editor/ResumeFile.tsx`**

```tsx
"use client"

import { motion } from "framer-motion"
import { resumeItems } from "@/data/resume"
import { editorContainer, editorLine } from "./animations"

export default function ResumeFile() {
  return (
    <motion.div
      key="resume"
      className="p-6 md:p-8 font-code text-sm leading-7"
      variants={editorContainer}
      initial="hidden"
      animate="show"
    >
      {/* Frontmatter */}
      <motion.p variants={editorLine} className="text-text-dim">---</motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">type</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">work-history</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {resumeItems.map((item) => (
        <motion.div key={item.id} variants={editorLine} className="mb-6">
          {/* Section heading */}
          <p className="mb-1">
            <span className="text-text-dim"># </span>
            <a
              href={`/resume/${item.id}`}
              className="text-text font-bold hover:text-accent transition-colors"
            >
              {item.organization}
            </a>
          </p>
          {/* Role + dates */}
          <p className="text-text-dim mb-1">
            <span className="text-accent">{item.role}</span>
            <span className="text-text-dim"> · {item.startDate} – {item.endDate}</span>
          </p>
          {/* Bullets */}
          {item.description.map((bullet, i) => (
            <p key={i} className="text-text-dim">
              <span className="text-text-dim">- </span>
              {bullet}
            </p>
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/editor/ResumeFile.tsx
git commit -m "feat: add ResumeFile editor component"
```

---

## Task 6: ContactFile component

**Files:**
- Create: `src/components/editor/ContactFile.tsx`

- [ ] **Step 1: Create `src/components/editor/ContactFile.tsx`**

```tsx
"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, BookOpen } from "lucide-react"
import { editorContainer, editorLine } from "./animations"

export default function ContactFile() {
  return (
    <motion.div
      key="contact"
      className="p-6 md:p-8 font-code text-sm leading-7"
      variants={editorContainer}
      initial="hidden"
      animate="show"
    >
      {/* Frontmatter */}
      <motion.p variants={editorLine} className="text-text-dim">---</motion.p>
      <motion.p variants={editorLine}>
        <span className="text-accent">type</span>
        <span className="text-text-dim">: </span>
        <span className="text-text">contact</span>
      </motion.p>
      <motion.p variants={editorLine} className="text-text-dim mb-6">---</motion.p>

      {/* Reach me */}
      <motion.p variants={editorLine} className="mb-4">
        <span className="text-text-dim"># </span>
        <span className="text-text font-bold">Reach me</span>
      </motion.p>

      <motion.div variants={editorLine} className="flex flex-col gap-3">
        <a
          href="mailto:ethan.burr@gmail.com"
          className="text-accent hover:underline flex items-center gap-2"
        >
          <Mail size={13} />
          ethan.burr@gmail.com
        </a>
        <a
          href="https://github.com/E10Feng"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-2"
        >
          <Github size={13} />
          github.com/E10Feng ↗
        </a>
        <a
          href="https://linkedin.com/in/ethan-feng-604993221/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-2"
        >
          <Linkedin size={13} />
          linkedin.com/in/ethan-feng-604993221 ↗
        </a>
        <a
          href="/thoughts"
          className="text-text-dim hover:text-accent transition-colors flex items-center gap-2"
        >
          <BookOpen size={13} />
          thoughts ↗
        </a>
      </motion.div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/editor/ContactFile.tsx
git commit -m "feat: add ContactFile editor component"
```

---

## Task 7: Refactor HeroSection

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`

The internal tab bar div is removed. The content `<motion.div>` is replaced by a switcher that renders the correct file component based on `activeTab`. A `key` prop on the wrapper forces React to remount the component on tab change, triggering the stagger animation fresh each time.

- [ ] **Step 1: Replace `src/components/sections/HeroSection.tsx`**

```tsx
"use client"

import { motion } from "framer-motion"
import { useTab } from "@/context/TabContext"
import EthanFile from "@/components/editor/EthanFile"
import ProjectsFile from "@/components/editor/ProjectsFile"
import ResumeFile from "@/components/editor/ResumeFile"
import ContactFile from "@/components/editor/ContactFile"

function ActiveFile({ tab }: { tab: string }) {
  switch (tab) {
    case "projects": return <ProjectsFile />
    case "resume":   return <ResumeFile />
    case "contact":  return <ContactFile />
    default:         return <EthanFile />
  }
}

export default function HeroSection() {
  const { activeTab } = useTab()

  return (
    <section id="hero" className="min-h-screen bg-canvas flex flex-col justify-center px-6 md:px-16 pt-14 pb-12">
      <div className="w-full max-w-3xl mx-auto">

        {/* Editor chrome — no internal tab bar; VSCodeTabBar handles that */}
        <motion.div
          className="border border-border rounded-sm overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Re-key on tab change to retrigger stagger animation */}
          <ActiveFile key={activeTab} tab={activeTab} />
        </motion.div>

        {/* Scroll hint — only shown on ETHAN.md */}
        {activeTab === "ethan" && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          >
            <a href="#featured" className="font-code text-xs text-text-dim hover:text-accent transition-colors tracking-widest">
              ↓ scroll
            </a>
          </motion.div>
        )}

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the file looks right, then commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: refactor HeroSection to use tab content switcher"
```

---

## Task 8: VSCodeTabBar

**Files:**
- Create: `src/components/layout/VSCodeTabBar.tsx`

The active tab gets `text-lg`, full color, and the bottom border is cleared using `border-b-canvas -mb-px` (same trick used in the original HeroSection tab). The accent dot moves here from `EthanFile`.

- [ ] **Step 1: Create `src/components/layout/VSCodeTabBar.tsx`**

```tsx
"use client"

import { useTab } from "@/context/TabContext"
import type { Tab } from "@/context/TabContext"

const TABS: { id: Tab; label: string }[] = [
  { id: "ethan",    label: "ETHAN.md" },
  { id: "projects", label: "PROJECTS.md" },
  { id: "resume",   label: "RESUME.md" },
  { id: "contact",  label: "CONTACT.md" },
]

export default function VSCodeTabBar() {
  const { activeTab, setActiveTab } = useTab()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-border">
      <div className="flex items-end h-14 px-2">
        {TABS.map(({ id, label }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={[
                "flex items-center gap-2 px-4 py-2 font-display border border-border transition-all duration-150 cursor-pointer",
                isActive
                  ? "text-text text-lg bg-canvas border-b-canvas -mb-px rounded-t-sm"
                  : "text-text-dim text-sm bg-surface hover:text-text rounded-t-sm",
              ].join(" ")}
            >
              {label}
              {isActive && <span className="w-2 h-2 rounded-full bg-accent" />}
            </button>
          )
        })}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/VSCodeTabBar.tsx
git commit -m "feat: add VSCodeTabBar component"
```

---

## Task 9: Wire up layout and home page

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/sections/FeaturedSection.tsx`

- [ ] **Step 1: Update `src/app/layout.tsx`**

Replace the `Navbar` import with `VSCodeTabBar` and wrap the body with `TabProvider`. The rest of the file stays unchanged.

```tsx
import type { Metadata } from "next"
import { Syne, DM_Sans, Fira_Code } from "next/font/google"
import "./globals.css"
import VSCodeTabBar from "@/components/layout/VSCodeTabBar"
import Footer from "@/components/layout/Footer"
import { TransitionProvider } from "@/components/animations/TransitionContext"
import ExpandOverlay from "@/components/animations/ExpandOverlay"
import { TabProvider } from "@/context/TabContext"

const display = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
})

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const mono = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "E10 Feng — AI Engineering Portfolio",
  description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions developed at NASA and beyond.",
  openGraph: {
    title: "E10 Feng — AI Engineering Portfolio",
    description: "Explore the portfolio of E10 Feng, an AI and Systems Engineering intern. Specializing in Python, RAG architectures, and AI-driven solutions.",
    url: "https://portfolio-e10.vercel.app",
    siteName: "E10 Feng Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "E10 Feng Portfolio Preview" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E10 Feng — AI Engineering Portfolio",
    description: "AI and Systems Engineering intern portfolio featuring projects from NASA and RediMinds.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <TabProvider>
          <TransitionProvider>
            <ExpandOverlay />
            <VSCodeTabBar />
            {children}
            <Footer />
          </TransitionProvider>
        </TabProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

Remove `ProjectsSection`, `ResumeSection`, and `ContactSection`. Keep only `HeroSection` and `FeaturedSection`.

```tsx
import HeroSection from "@/components/sections/HeroSection"
import FeaturedSection from "@/components/sections/FeaturedSection"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedSection />
    </main>
  )
}
```

- [ ] **Step 3: Update `src/components/sections/FeaturedSection.tsx`**

Add `"use client"` at the top (if not already present), import `useTab`, and wrap the section's return in a conditional — return `null` when the active tab is not `"ethan"`.

Open `src/components/sections/FeaturedSection.tsx`, find the top of the file, and add:

```tsx
"use client"

import { useTab } from "@/context/TabContext"
```

Then inside the component function, add at the very top of the function body (before the `return`):

```tsx
const { activeTab } = useTab()
if (activeTab !== "ethan") return null
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/components/sections/FeaturedSection.tsx
git commit -m "feat: wire TabProvider, VSCodeTabBar into layout; conditionally render FeaturedSection"
```

---

## Task 10: Verify in browser

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000`.

- [ ] **Step 2: Check the tab bar**

Confirm: four tabs visible at top — `ETHAN.md`, `PROJECTS.md`, `RESUME.md`, `CONTACT.md`. `ETHAN.md` is active by default (larger text, accent dot, bottom border cleared into editor).

- [ ] **Step 3: Click each tab**

- `PROJECTS.md` — editor swaps to projects list with stagger animation; Featured section disappears
- `RESUME.md` — editor swaps to work history
- `CONTACT.md` — editor swaps to contact info
- `ETHAN.md` — returns to original content; Featured section reappears; scroll hint returns

- [ ] **Step 4: Run lint and build**

```bash
npm run lint
npm run build
```

Expected: no errors.

- [ ] **Step 5: Commit and push**

```bash
git add -A
git commit -m "feat: VS Code parody nav complete"
git push
```
