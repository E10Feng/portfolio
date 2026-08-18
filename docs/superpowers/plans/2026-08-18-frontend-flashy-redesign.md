# Cinematic Terminal Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the portfolio's existing black/orange "code editor" identity into a performing "Cinematic Terminal" — boot sequence, cursor-tracking card glow, scroll-linked HUD rail, glitch-burst route transitions, and ambient scanline atmosphere — per `docs/frontend-design/2026-08-18-flashy-redesign.md`.

**Architecture:** Layer new motion/atmosphere components on top of the existing tab-based editor UI (`VSCodeTabBar` / `TabContext` / `*File` components) and the existing card→page `TransitionContext` mechanic. No structural rewrite — the terminal window, routes, and data files (`projects.ts`, `resume.ts`) are untouched.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, `motion` (the renamed `framer-motion`, replacing it 1:1), `animejs` v4 (hand-choreographed timelines only: boot sequence, glitch bursts), hand-built Kokonut-UI-style components reskinned to the project's palette.

## Global Constraints

- Keep the existing palette exactly as-is: canvas `#000000`, accent `#f97316`, surfaces `#0d0d0d`/`#171717`, text `#ffffff`/`#666666`, borders `#1f1f1f`/`#333333`. No new brand hue — new tokens are opacity/glow variants of the existing accent, plus one decorative-only dim-green scanline tint that is never used as a UI/text color.
- Keep Syne (display), DM Sans (body), Fira Code (mono) — no font changes.
- Every new animated component must degrade to instant/static when `prefers-reduced-motion: reduce` is set (checked via the shared `src/lib/motionPreferences.ts` helper written in Task 4, or the CSS media query directly for pure-CSS effects).
- Fully migrate off `framer-motion` onto the `motion` package (`motion/react` import path) — zero remaining `from "framer-motion"` imports anywhere in `src/` after Task 1.
- Boot sequence plays once per browser session (gated via `sessionStorage`, `src/lib/bootSession.ts`, Task 5) — never replays on internal tab switches or repeat visits within the same session.
- This repo's only test harness is Vitest in **node** environment testing pure functions (`src/lib/thoughts.test.ts` is the existing precedent). New pure logic (Tasks 4, 5) gets real Vitest unit tests. Visual/motion components have no component-testing harness available — their verification step is `npm run build` + `npm run lint` + a manual check in the browser via `npm run dev`, per this project's CLAUDE.md UI-testing guidance. This is a deliberate scope choice, not a gap: do not add `@testing-library/react` or a jsdom environment as part of this plan.
- Kokonut UI ships as copy-paste source (no npm package), so "kokonut" components in this plan (`ParticleField`, `TypewriterText`, `BorderBeamButton`) are hand-built, original implementations in the same visual family (particle backdrop, typewriter reveal, rotating border-beam button), reskinned directly to this project's CSS tokens from the start — there is no upstream file to diff against.

---

## Task 1: Migrate `framer-motion` → `motion`

**Files:**
- Modify: `package.json`
- Modify (import line only): `src/components/sections/HeroSection.tsx`, `src/components/sections/FeaturedSection.tsx`, `src/components/animations/PageTransition.tsx`, `src/components/animations/FadeInWhenVisible.tsx`, `src/components/animations/FloatingBubbles.tsx`, `src/components/animations/ExpandOverlay.tsx`, `src/components/editor/ContactFile.tsx`, `src/components/editor/ResumeFile.tsx`, `src/components/editor/ProjectsFile.tsx`, `src/components/editor/EthanFile.tsx`

**Interfaces:**
- Consumes: nothing (first task).
- Produces: `motion/react` as the project-wide import path for `motion`, `AnimatePresence`, `useInView`, and (used by later tasks) `useMotionValue`, `useSpring`, `useMotionTemplate`, `useScroll`, `useTransform`. All later tasks assume this import path exists and `animejs` is installed.

- [ ] **Step 1: Update `package.json`**

In `package.json`, remove the `framer-motion` line from `dependencies` and add `motion` and `animejs`:

```json
"dependencies": {
  "animejs": "^4.5.0",
  "clsx": "^2.1.1",
  "gray-matter": "^4.0.3",
  "lucide-react": "^0.577.0",
  "motion": "^13.1.0",
  "next": "16.1.6",
  "next-mdx-remote": "^6.0.0",
  "react": "19.2.3",
  "react-dom": "19.2.3"
},
```

- [ ] **Step 2: Install**

Run: `npm install`
Expected: lockfile updates, `framer-motion` removed, `motion` and `animejs` present under `node_modules`.

- [ ] **Step 3: Migrate every import**

Run this from the repo root — every file in the list above imports `framer-motion` exactly once:

```bash
grep -rl '"framer-motion"' src --include="*.tsx" | xargs sed -i '' 's/"framer-motion"/"motion\/react"/'
```

(On Linux, drop the `''` after `-i`.)

- [ ] **Step 4: Verify no references remain**

Run: `grep -rn "framer-motion" src`
Expected: no output.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build succeeds with no type or import errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src
git commit -m "chore: migrate framer-motion to motion package"
```

---

## Task 2: Remove dead code and correct CLAUDE.md

**Files:**
- Delete: `src/components/sections/ProjectsSection.tsx`, `src/components/sections/ResumeSection.tsx`, `src/components/sections/ContactSection.tsx`, `src/components/layout/Navbar.tsx`, `src/components/ui/ProjectCard.tsx`, `src/components/ui/TimelineItem.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/SocialLink.tsx`
- Modify: `CLAUDE.md`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing later tasks depend on — this is pure removal. (Confirmed via `grep -rln` that none of these 8 files are imported anywhere outside themselves; `ProjectCard`/`TimelineItem`/`SectionHeading` were only ever used by the dead `*Section.tsx` files being removed in this same task, and `SocialLink`/`Navbar` were never imported at all.)

- [ ] **Step 1: Verify each file is truly unreferenced before deleting**

Run:
```bash
for f in ProjectsSection ResumeSection ContactSection Navbar ProjectCard TimelineItem SectionHeading SocialLink; do
  echo "== $f =="
  grep -rn "$f" src --include="*.tsx" | grep -v "/$f.tsx:"
done
```
Expected: every section prints no output (no external references).

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/sections/ProjectsSection.tsx \
       src/components/sections/ResumeSection.tsx \
       src/components/sections/ContactSection.tsx \
       src/components/layout/Navbar.tsx \
       src/components/ui/ProjectCard.tsx \
       src/components/ui/TimelineItem.tsx \
       src/components/ui/SectionHeading.tsx \
       src/components/ui/SocialLink.tsx
```

- [ ] **Step 3: Correct the Architecture section of `CLAUDE.md`**

Replace this paragraph:

```
**Single-page home** (`src/app/page.tsx`): Five sections stacked vertically — `HeroSection`, `FeaturedSection`, `ProjectsSection`, `ResumeSection`, `ContactSection`. The Navbar and Footer are in the root layout.
```

with:

```
**Single-page home** (`src/app/page.tsx`): `HeroSection` (a tab-switched fake code editor — `VSCodeTabBar` swaps `ETHAN.md`/`PROJECTS.md`/`RESUME.md`/`CONTACT.md` content via `TabContext`) followed by `FeaturedSection` (a project carousel, shown only on the `ETHAN.md` tab). `VSCodeTabBar` and `Footer` are mounted in the root layout; there is no separate `Navbar` or standalone scrolling `ProjectsSection`/`ResumeSection`/`ContactSection` — those were superseded by the tab/editor system and removed.
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build succeeds (confirms nothing still imports the deleted files).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove dead pre-editor-system components, fix CLAUDE.md architecture section"
```

---

## Task 3: Design tokens — glow and atmosphere CSS

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS custom properties `--glow-soft`, `--glow-medium`, `--glow-strong`, `--scanline-tint` and a `.scanline-overlay` utility class + `@keyframes scanline-drift`, used by Task 6 (`ScanlineOverlay`) and referenced informally (as literal rgba values) by Tasks 10/12/13's inline styles.

- [ ] **Step 1: Add glow and atmosphere tokens**

In `src/app/globals.css`, inside the existing `@theme inline { ... }` block, add after `--color-border-bright: #333333;`:

```css
  /* Glow layer — intensity variants of the existing accent, not new hues */
  --glow-soft: rgba(249, 115, 22, 0.10);
  --glow-medium: rgba(249, 115, 22, 0.22);
  --glow-strong: rgba(249, 115, 22, 0.4);

  /* Atmosphere — decorative CRT-phosphor tint, never used as a UI/text color */
  --scanline-tint: rgba(80, 255, 150, 0.035);
```

- [ ] **Step 2: Add the scanline overlay utility and keyframes**

After the existing `body { ... }` block in `src/app/globals.css`, add:

```css
.scanline-overlay {
  background:
    repeating-linear-gradient(
      0deg,
      var(--scanline-tint) 0px,
      var(--scanline-tint) 1px,
      transparent 1px,
      transparent 3px
    ),
    radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.35) 100%);
  background-size: 100% 100%, 100% 100%;
  animation: scanline-drift 9s linear infinite;
}

@keyframes scanline-drift {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 0 48px, 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .scanline-overlay {
    animation: none;
  }
}
```

- [ ] **Step 3: Verify the build still compiles Tailwind v4 CSS cleanly**

Run: `npm run build`
Expected: success, no PostCSS/Tailwind errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add glow and scanline design tokens"
```

---

## Task 4: `prefersReducedMotion` helper (TDD)

**Files:**
- Create: `src/lib/motionPreferences.ts`
- Test: `src/lib/motionPreferences.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `prefersReducedMotion(): boolean`, imported by Task 8 (`TypewriterText`), Task 9 (`BootSequence`), Task 12 (`BorderBeamButton`), and Task 13 (`GlitchBurst`).

- [ ] **Step 1: Write the failing test**

Create `src/lib/motionPreferences.test.ts`:

```ts
import { prefersReducedMotion } from './motionPreferences'

describe('prefersReducedMotion', () => {
  const originalWindow = globalThis.window

  afterEach(() => {
    globalThis.window = originalWindow
  })

  it('returns false when matchMedia reports no reduced-motion preference', () => {
    globalThis.window = {
      matchMedia: () => ({ matches: false }),
    } as unknown as Window & typeof globalThis

    expect(prefersReducedMotion()).toBe(false)
  })

  it('returns true when matchMedia reports a reduced-motion preference', () => {
    globalThis.window = {
      matchMedia: () => ({ matches: true }),
    } as unknown as Window & typeof globalThis

    expect(prefersReducedMotion()).toBe(true)
  })

  it('returns false when window is undefined (SSR)', () => {
    // @ts-expect-error simulating SSR
    globalThis.window = undefined

    expect(prefersReducedMotion()).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/motionPreferences.test.ts`
Expected: FAIL — `motionPreferences.ts` does not exist yet.

- [ ] **Step 3: Write the implementation**

Create `src/lib/motionPreferences.ts`:

```ts
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/motionPreferences.test.ts`
Expected: PASS (3/3).

- [ ] **Step 5: Commit**

```bash
git add src/lib/motionPreferences.ts src/lib/motionPreferences.test.ts
git commit -m "feat: add prefersReducedMotion helper"
```

---

## Task 5: `bootSession` helper (TDD)

**Files:**
- Create: `src/lib/bootSession.ts`
- Test: `src/lib/bootSession.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `hasBootPlayed(): boolean`, `markBootPlayed(): void`, consumed by Task 9 (`BootSequence`).

- [ ] **Step 1: Write the failing test**

Create `src/lib/bootSession.test.ts`:

```ts
import { hasBootPlayed, markBootPlayed } from './bootSession'

function fakeSessionStorage() {
  const store = new Map<string, string>()
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v) },
  } as unknown as Storage
}

describe('bootSession', () => {
  const originalWindow = globalThis.window

  afterEach(() => {
    globalThis.window = originalWindow
  })

  it('reports boot not played on a fresh session', () => {
    globalThis.window = { sessionStorage: fakeSessionStorage() } as unknown as Window & typeof globalThis
    expect(hasBootPlayed()).toBe(false)
  })

  it('reports boot played after markBootPlayed is called', () => {
    globalThis.window = { sessionStorage: fakeSessionStorage() } as unknown as Window & typeof globalThis
    markBootPlayed()
    expect(hasBootPlayed()).toBe(true)
  })

  it('treats SSR (no window) as already-played, so boot never runs server-side', () => {
    // @ts-expect-error simulating SSR
    globalThis.window = undefined
    expect(hasBootPlayed()).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/bootSession.test.ts`
Expected: FAIL — `bootSession.ts` does not exist yet.

- [ ] **Step 3: Write the implementation**

Create `src/lib/bootSession.ts`:

```ts
const BOOT_KEY = "portfolio:boot-played"

export function hasBootPlayed(): boolean {
  if (typeof window === "undefined" || !window.sessionStorage) return true
  return window.sessionStorage.getItem(BOOT_KEY) === "1"
}

export function markBootPlayed(): void {
  if (typeof window === "undefined" || !window.sessionStorage) return
  window.sessionStorage.setItem(BOOT_KEY, "1")
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/bootSession.test.ts`
Expected: PASS (3/3).

- [ ] **Step 5: Commit**

```bash
git add src/lib/bootSession.ts src/lib/bootSession.test.ts
git commit -m "feat: add bootSession helper"
```

---

## Task 6: Ambient scanline overlay

**Files:**
- Create: `src/components/animations/ScanlineOverlay.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `.scanline-overlay` CSS class from Task 3.
- Produces: `<ScanlineOverlay />`, a fixed, non-interactive layer mounted once globally.

- [ ] **Step 1: Create the component**

Create `src/components/animations/ScanlineOverlay.tsx`:

```tsx
export default function ScanlineOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 mix-blend-screen scanline-overlay"
    />
  )
}
```

- [ ] **Step 2: Mount it in the root layout**

In `src/app/layout.tsx`, add the import:

```tsx
import ScanlineOverlay from "@/components/animations/ScanlineOverlay"
```

and render it as the first child inside `<TransitionProvider>`, before `<ExpandOverlay />`:

```tsx
<TransitionProvider>
  <ScanlineOverlay />
  <ExpandOverlay />
  <VSCodeTabBar />
  {children}
  <Footer />
</TransitionProvider>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: a faint horizontal-line texture with a subtle vignette is visible over the whole page, doesn't block clicks on tabs/links/buttons, and (with OS "reduce motion" enabled) is static instead of drifting.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/animations/ScanlineOverlay.tsx src/app/layout.tsx
git commit -m "feat: add ambient scanline overlay"
```

---

## Task 7: `ParticleField` hero backdrop (Kokonut-style)

**Files:**
- Create: `src/components/kokonut/ParticleField.tsx`

**Interfaces:**
- Consumes: `--glow-soft`/`--glow-medium` intent (uses accent rgba literals directly, matching Task 3's values), `prefersReducedMotion` from Task 4.
- Produces: `<ParticleField />`, consumed by Task 9 (mounted behind the hero during/after boot).

- [ ] **Step 1: Create the component**

Create `src/components/kokonut/ParticleField.tsx`:

```tsx
"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const PARTICLE_COUNT = 36
const LINK_DISTANCE = 110

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    const reduced = prefersReducedMotion()

    const resize = () => {
      const parent = canvas.parentElement
      width = parent?.clientWidth ?? window.innerWidth
      height = parent?.clientHeight ?? 400
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: 1 + Math.random() * 1.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(249, 115, 22, 0.45)"
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(249, 115, 22, ${0.12 * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      if (!reduced) frame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-70"
    />
  )
}
```

- [ ] **Step 2: Smoke-test in isolation**

Temporarily render `<ParticleField />` inside a `relative` wrapper in `src/app/page.tsx` above `<HeroSection />`, run `npm run dev`, confirm faint drifting orange dots with connecting lines render behind content without blocking interaction, then remove the temporary render (Task 9 does the real integration).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/kokonut/ParticleField.tsx
git commit -m "feat: add ParticleField ambient hero backdrop"
```

---

## Task 8: `TypewriterText` (Kokonut-style, anime.js cursor)

**Files:**
- Create: `src/components/kokonut/TypewriterText.tsx`

**Interfaces:**
- Consumes: `animejs` (`animate`) from Task 1's install, `prefersReducedMotion` from Task 4.
- Produces: `<TypewriterText text={string} speedMs={number} onComplete={() => void} className={string} />`, consumed by Task 9 (`BootSequence`).

- [ ] **Step 1: Create the component**

Create `src/components/kokonut/TypewriterText.tsx`:

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Props {
  text: string
  speedMs?: number
  onComplete?: () => void
  className?: string
}

export default function TypewriterText({ text, speedMs = 18, onComplete, className = "" }: Props) {
  const [visibleChars, setVisibleChars] = useState(0)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisibleChars(text.length)
      onComplete?.()
      return
    }

    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleChars(i)
      if (i >= text.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, speedMs)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (prefersReducedMotion() || !cursorRef.current) return
    const animation = animate(cursorRef.current, {
      opacity: [1, 0],
      duration: 500,
      loop: true,
      alternate: true,
      easing: "steps(1)",
    })
    return () => animation.pause()
  }, [])

  return (
    <span className={className}>
      {text.slice(0, visibleChars)}
      <span ref={cursorRef} className="inline-block w-[0.5em] bg-accent align-middle" style={{ height: "1em" }} />
    </span>
  )
}
```

- [ ] **Step 2: Smoke-test in isolation**

Temporarily render `<TypewriterText text="> initializing session..." className="font-code text-sm text-text" />` inside `src/app/page.tsx`, run `npm run dev`, confirm characters reveal progressively with a blinking block cursor, then remove the temporary render (Task 9 does the real integration).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success. If `animate`/`easing`/`alternate` option names don't match the installed `animejs` v4 API, check `node_modules/animejs/lib/types` and adjust the call to match — the shape (opacity keyframes, `duration`, `loop`, an alternate/yoyo direction option) is what matters, not the exact option key names.

- [ ] **Step 4: Commit**

```bash
git add src/components/kokonut/TypewriterText.tsx
git commit -m "feat: add TypewriterText boot-sequence primitive"
```

---

## Task 9: `BootSequence` and hero integration

**Files:**
- Create: `src/components/animations/BootSequence.tsx`
- Modify: `src/components/sections/HeroSection.tsx`

**Interfaces:**
- Consumes: `hasBootPlayed`/`markBootPlayed` (Task 5), `prefersReducedMotion` (Task 4), `TypewriterText` (Task 8), `ParticleField` (Task 7).
- Produces: `<BootSequence onComplete={() => void} />`. `HeroSection` gates rendering of `ActiveFile` behind boot completion on first mount only.

- [ ] **Step 1: Create the component**

Create `src/components/animations/BootSequence.tsx`:

```tsx
"use client"

import { useState } from "react"
import { motion } from "motion/react"
import TypewriterText from "@/components/kokonut/TypewriterText"

const LINES = [
  "> whoami",
  "> loading profile...",
  "> session ready.",
]

interface Props {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: Props) {
  const [lineIndex, setLineIndex] = useState(0)

  const handleLineComplete = () => {
    if (lineIndex + 1 < LINES.length) {
      setTimeout(() => setLineIndex((i) => i + 1), 150)
    } else {
      setTimeout(onComplete, 400)
    }
  }

  return (
    <motion.div
      className="p-6 md:p-8 font-code text-sm leading-7 min-h-[240px]"
      exit={{ opacity: 0 }}
    >
      {LINES.slice(0, lineIndex + 1).map((line, i) => (
        <div key={line} className="text-text-dim">
          {i === lineIndex ? (
            <TypewriterText text={line} onComplete={handleLineComplete} />
          ) : (
            line
          )}
        </div>
      ))}
    </motion.div>
  )
}
```

- [ ] **Step 2: Integrate into `HeroSection`**

In `src/components/sections/HeroSection.tsx`, add imports and boot-gating state. Replace the file's contents with:

```tsx
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useTab } from "@/context/TabContext"
import EthanFile from "@/components/editor/EthanFile"
import ProjectsFile from "@/components/editor/ProjectsFile"
import ResumeFile from "@/components/editor/ResumeFile"
import ContactFile from "@/components/editor/ContactFile"
import BootSequence from "@/components/animations/BootSequence"
import ParticleField from "@/components/kokonut/ParticleField"
import { hasBootPlayed, markBootPlayed } from "@/lib/bootSession"

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
  const [booting, setBooting] = useState(false)

  useEffect(() => {
    setBooting(!hasBootPlayed())
  }, [])

  const handleBootComplete = () => {
    markBootPlayed()
    setBooting(false)
  }

  return (
    <section id="hero" className="relative min-h-screen bg-canvas flex flex-col justify-center px-6 md:px-16 pt-14 pb-12">
      <ParticleField />
      <div className="w-full max-w-3xl mx-auto">

        {/* Editor chrome — no internal tab bar; VSCodeTabBar handles that */}
        <motion.div
          className="border border-border rounded-sm overflow-hidden bg-canvas"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            {booting ? (
              <BootSequence key="boot" onComplete={handleBootComplete} />
            ) : (
              <ActiveFile key={activeTab} tab={activeTab} />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll hint — only shown on ETHAN.md, once boot has resolved */}
        {!booting && activeTab === "ethan" && (
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

Note: `booting` starts `false` and flips in a `useEffect` (not read from `hasBootPlayed()` directly in `useState`'s initializer) specifically so the server-rendered HTML and first client render match — `hasBootPlayed()` depends on `sessionStorage`, which doesn't exist during SSR, so evaluating it during render would cause a hydration mismatch. Reading it in `useEffect` (client-only, post-hydration) avoids that.

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`, open in an incognito/private window (fresh session).
Expected: page loads, boot lines type out one by one with a blinking cursor over the particle backdrop, then the normal `ETHAN.md` content fades in. Reload the same tab: boot does **not** replay. Switching tabs never replays it either.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/animations/BootSequence.tsx src/components/sections/HeroSection.tsx
git commit -m "feat: add session-gated boot sequence to hero"
```

---

## Task 10: `useGlowPointer` hook and `GlowCard` wrapper

**Files:**
- Create: `src/hooks/useGlowPointer.ts`
- Create: `src/components/ui/GlowCard.tsx`

**Interfaces:**
- Consumes: `useMotionValue`, `useSpring`, `useMotionTemplate` from `motion/react` (Task 1).
- Produces: `useGlowPointer()` returning `{ ref, onPointerMove, background }`; `<GlowCard className? liftOnHover? >children</GlowCard>`, consumed by Task 11.

- [ ] **Step 1: Create the hook**

Create `src/hooks/useGlowPointer.ts`:

```ts
"use client"

import { useRef } from "react"
import { useMotionValue, useSpring, useMotionTemplate } from "motion/react"

export function useGlowPointer() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const glowX = useSpring(x, { stiffness: 150, damping: 20 })
  const glowY = useSpring(y, { stiffness: 150, damping: 20 })

  const background = useMotionTemplate`radial-gradient(180px circle at ${glowX}px ${glowY}px, var(--glow-medium), transparent 70%)`

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return { ref, onPointerMove, background }
}
```

- [ ] **Step 2: Create `GlowCard`**

Create `src/components/ui/GlowCard.tsx`:

```tsx
"use client"

import { motion } from "motion/react"
import { useGlowPointer } from "@/hooks/useGlowPointer"

interface Props {
  children: React.ReactNode
  className?: string
}

export default function GlowCard({ children, className = "" }: Props) {
  const { ref, onPointerMove, background } = useGlowPointer()

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]"
        style={{ background }}
      />
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success. (No live usage yet — Task 11 wires it up.)

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useGlowPointer.ts src/components/ui/GlowCard.tsx
git commit -m "feat: add useGlowPointer hook and GlowCard wrapper"
```

---

## Task 11: Apply `GlowCard` + parallax to live card surfaces

**Files:**
- Modify: `src/components/thoughts/ThoughtCard.tsx`
- Modify: `src/components/sections/FeaturedSection.tsx`

**Interfaces:**
- Consumes: `GlowCard` (Task 10), `useScroll`/`useTransform` from `motion/react` (Task 1).
- Produces: nothing later tasks depend on.

Note: `ProjectCard` and `TimelineItem` are **not** touched here — they were deleted in Task 2 as dead code (only the removed `ProjectsSection`/`ResumeSection` ever rendered them). `ThoughtCard` and the `FeaturedSection` carousel panel are the actual live card-like surfaces in the current UI.

- [ ] **Step 1: Wrap `ThoughtCard` in `GlowCard`**

In `src/components/thoughts/ThoughtCard.tsx`, replace the `<article>` wrapper with `GlowCard`, keeping everything else (the `<Link>`, tags, heading, excerpt) unchanged:

```tsx
import Link from 'next/link'
import Tag from '@/components/ui/Tag'
import GlowCard from '@/components/ui/GlowCard'
import { Thought } from '@/lib/thoughts'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ThoughtCard({ thought }: { thought: Thought }) {
  return (
    <Link href={`/thoughts/${thought.slug}`} className="group block">
      <GlowCard className="bg-surface border border-border hover:border-border-bright rounded-lg p-6 transition-colors overflow-hidden">
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
      </GlowCard>
    </Link>
  )
}
```

(`GlowCard`'s root already renders `group relative`, matching the `group-hover:` selectors carried over from the original `article`.)

- [ ] **Step 2: Wrap the `FeaturedSection` image panel in `GlowCard` and add scroll parallax**

In `src/components/sections/FeaturedSection.tsx`, add to the imports:

```tsx
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import GlowCard from "@/components/ui/GlowCard"
```

(remove the old bare `motion, AnimatePresence` import line from `motion/react` since it's replaced by this one — there should be exactly one import from `motion/react` in the file.)

Inside `FeaturedSection`, add a section ref and scroll-linked transform right after the existing `const [paused, setPaused] = useState(false)` line:

```tsx
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-24, 24])
```

Attach the ref to the `<section>` element:

```tsx
<section id="featured" ref={sectionRef} className="py-24 px-6 bg-canvas border-y border-border">
```

Wrap the existing image panel `<div className="relative rounded-xl overflow-hidden border border-border mb-10">...</div>` in `GlowCard`, and wrap just the `<img>`/placeholder block inside it in a `motion.div` bound to `imgY`:

```tsx
<GlowCard className="relative rounded-xl overflow-hidden border border-border mb-10">
  <motion.div style={{ y: imgY }}>
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
  </motion.div>

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
</GlowCard>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`. On `/thoughts`, hover a post card — confirm a soft orange glow follows the cursor under the border and the card lifts slightly. On the homepage `ETHAN.md` tab, scroll past the featured carousel — confirm the project image shifts slightly (parallax) and the panel also shows the cursor-glow on hover.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/thoughts/ThoughtCard.tsx src/components/sections/FeaturedSection.tsx
git commit -m "feat: apply GlowCard and scroll parallax to live card surfaces"
```

---

## Task 12: `BorderBeamButton` (Kokonut-style) and CTA swap

**Files:**
- Create: `src/components/kokonut/BorderBeamButton.tsx`
- Modify: `src/components/sections/FeaturedSection.tsx`

**Interfaces:**
- Consumes: `motion` from `motion/react` (Task 1), `prefersReducedMotion` (Task 4).
- Produces: `<BorderBeamButton href variant icon external>children</BorderBeamButton>`.

- [ ] **Step 1: Create the component**

Create `src/components/kokonut/BorderBeamButton.tsx`:

```tsx
"use client"

import { motion } from "motion/react"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Props {
  href: string
  children: React.ReactNode
  variant?: "solid" | "outline"
  icon?: React.ReactNode
  external?: boolean
}

export default function BorderBeamButton({ href, children, variant = "solid", icon, external = true }: Props) {
  const reduced = prefersReducedMotion()

  const base = "relative inline-flex items-center gap-2 px-6 py-3 rounded-md font-display font-semibold text-sm isolate overflow-hidden"
  const fill = variant === "solid" ? "bg-accent text-canvas" : "text-text"
  const innerFill = variant === "solid" ? "bg-accent" : "bg-canvas"
  const outlineBorder = variant === "outline" ? "border border-border-bright" : ""

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group ${base} ${fill} ${outlineBorder}`}
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, rgba(249,115,22,0.9) 8%, transparent 16%)",
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <span className={`absolute inset-[1.5px] rounded-[5px] -z-10 ${innerFill}`} />
      {icon}
      <span className="relative">{children}</span>
    </a>
  )
}
```

- [ ] **Step 2: Swap `FeaturedSection`'s CTA buttons**

In `src/components/sections/FeaturedSection.tsx`, add the import:

```tsx
import BorderBeamButton from "@/components/kokonut/BorderBeamButton"
```

Replace the demo/github `<a>` CTA block:

```tsx
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
```

with:

```tsx
{project.links.demo && (
  <BorderBeamButton href={project.links.demo.href} variant="solid" icon={<ExternalLink size={15} />}>
    {project.links.demo.label}
  </BorderBeamButton>
)}
{project.links.github && (
  <BorderBeamButton href={project.links.github.href} variant="outline" icon={<Github size={15} />}>
    {project.links.github.label}
  </BorderBeamButton>
)}
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`. On the homepage featured carousel, confirm both CTA buttons show a slowly rotating glowing beam around their border, text stays fully legible, and (with OS "reduce motion" enabled) the beam is static instead of rotating.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/kokonut/BorderBeamButton.tsx src/components/sections/FeaturedSection.tsx
git commit -m "feat: add BorderBeamButton and use it for featured CTAs"
```

---

## Task 13: Glitch burst on route transitions

**Files:**
- Create: `src/components/animations/GlitchBurst.tsx`
- Modify: `src/components/animations/ExpandOverlay.tsx`

**Interfaces:**
- Consumes: `animejs` (`animate`) from Task 1, `prefersReducedMotion` (Task 4), `phase` from `TransitionContext` (already available in `ExpandOverlay`).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Create the component**

Create `src/components/animations/GlitchBurst.tsx`:

```tsx
"use client"

import { useEffect, useRef } from "react"
import { animate } from "animejs"
import { prefersReducedMotion } from "@/lib/motionPreferences"

interface Props {
  active: boolean
}

export default function GlitchBurst({ active }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !ref.current || prefersReducedMotion()) return
    const el = ref.current
    const animation = animate(el, {
      translateX: [0, -6, 5, -3, 0],
      opacity: [0, 0.5, 0.25, 0.5, 0],
      duration: 260,
      easing: "steps(5)",
    })
    return () => animation.pause()
  }, [active])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 101,
        background:
          "repeating-linear-gradient(0deg, rgba(249,115,22,0.08) 0px, rgba(249,115,22,0.08) 1px, transparent 1px, transparent 3px)",
        opacity: 0,
      }}
    />
  )
}
```

- [ ] **Step 2: Wire it into `ExpandOverlay`**

In `src/components/animations/ExpandOverlay.tsx`, add the import:

```tsx
import GlitchBurst from "./GlitchBurst"
```

Render it right after the early-return guard, before the two `motion.div`s:

```tsx
export default function ExpandOverlay() {
  const { state } = useCardTransition()
  const { rect, card, phase } = state

  if (phase === "idle" || !rect || !card) return null

  const vw = typeof window !== "undefined" ? window.innerWidth : 1440
  const vh = typeof window !== "undefined" ? window.innerHeight : 900
  const fullscreen = { top: -2, left: -2, width: vw + 4, height: vh + 4, borderRadius: 0 }

  return (
    <>
      <GlitchBurst active={phase === "expanding"} />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        ...
```

(leave everything else in the file unchanged).

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev`. Click "read more" on a thoughts card or a project/resume detail link. Expected: a brief (quarter-second) scanline jitter flashes as the card expands into the full page, then settles into the existing expand/fade transition unchanged.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Commit**

```bash
git add src/components/animations/GlitchBurst.tsx src/components/animations/ExpandOverlay.tsx
git commit -m "feat: add glitch burst to route transitions"
```

---

## Task 14: Scroll-linked HUD rail on the resume listing

**Files:**
- Modify: `src/components/editor/ResumeFile.tsx`

**Interfaces:**
- Consumes: `useScroll`, `useTransform` (or a plain `style={{ scaleY: scrollYProgress }}`) from `motion/react` (Task 1).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Add a scroll-linked accent rail down the left edge of the resume list**

Replace `src/components/editor/ResumeFile.tsx` with:

```tsx
"use client"

import { useRef } from "react"
import { motion, useScroll } from "motion/react"
import Link from "next/link"
import { resumeItems } from "@/data/resume"
import { editorContainer, editorLine } from "./animations"

export default function ResumeFile() {
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] })

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

      <div ref={listRef} className="relative pl-4">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px bg-accent origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        {resumeItems.map((item) => (
          <motion.div key={item.id} variants={editorLine} className="mb-6">
            {/* Section heading */}
            <p className="mb-1">
              <span className="text-text-dim"># </span>
              <Link
                href={`/resume/${item.id}`}
                className="text-text font-bold hover:text-accent transition-colors"
              >
                {item.organization}
              </Link>
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
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, open the `RESUME.md` tab, scroll the page up/down through the list. Expected: a thin accent-colored line fills downward along the left edge in sync with scroll position, over a dim static base line.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: success.

- [ ] **Step 4: Commit**

```bash
git add src/components/editor/ResumeFile.tsx
git commit -m "feat: add scroll-linked HUD rail to resume listing"
```

---

## Task 15: Full verification pass

**Files:** none (verification only).

**Interfaces:**
- Consumes: everything built in Tasks 1–14.
- Produces: a pass/fail report; no commit unless a fix is needed.

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 2: Unit tests**

Run: `npx vitest run`
Expected: all tests pass, including `motionPreferences.test.ts`, `bootSession.test.ts`, and the pre-existing `thoughts.test.ts`.

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: success, no type errors.

- [ ] **Step 4: Manual browser walkthrough**

Run: `npm run dev`, then in a browser:
1. Fresh incognito window at `/` — confirm boot sequence plays once, then `ETHAN.md` content and particle backdrop render.
2. Reload — confirm boot does **not** replay.
3. Switch all four tabs (`ETHAN.md`/`PROJECTS.md`/`RESUME.md`/`CONTACT.md`) — confirm no boot replay, content stagger-reveals as before.
4. Scroll through `RESUME.md` — confirm the HUD rail fills with scroll.
5. Scroll to the featured carousel — confirm image parallax and glow-on-hover on the panel; confirm both CTA buttons show the rotating border beam.
6. Visit `/thoughts` — confirm cursor-glow on post cards.
7. Click into a project or resume detail page — confirm the glitch burst flashes briefly during the expand transition, then the page reveals normally.
8. In OS accessibility settings, enable "reduce motion," reload fresh — confirm boot sequence skips instantly, scanline is static, particle field is static, border-beam buttons are static, glitch burst does not fire.
9. Resize to a mobile viewport — confirm nothing overflows horizontally and the particle canvas/scanline don't break layout.

- [ ] **Step 5: Report results**

If every check in Step 4 passes and Steps 1–3 are clean, the redesign is complete — no further action. If any check fails, fix the specific issue in the relevant task's file and re-run the affected verification step before considering the plan done.
