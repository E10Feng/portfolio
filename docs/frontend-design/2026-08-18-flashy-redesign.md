# Portfolio "Cinematic Terminal" Redesign

## Current State

The site is a fake code-editor: a VS Code-style tab bar (`ETHAN.md`, `PROJECTS.md`, `RESUME.md`, `CONTACT.md`) swaps "file" content inside a bordered window, followed by a featured-project carousel. It's built on true black (`#000000`) + a single orange accent (`#f97316`), with Syne (display), DM Sans (body), and Fira Code (mono) — already a distinctive, non-generic identity. Motion exists throughout (Framer Motion) but is conservative: opacity/y fades, staggered line reveals, one card→page expand transition, floating tag bubbles. There's no signature "wow" moment, no scroll-driven storytelling, and no atmosphere (glow, grain, scanlines) despite the terminal concept inviting it. Also found: `ProjectsSection`, `ResumeSection`, `ContactSection`, and `Navbar` are dead code — fully superseded by the tab/editor system but never deleted.

## Aesthetic Direction

**Cinematic Terminal.** Lean harder into the identity that's already there instead of replacing it: this isn't a generic "portfolio with animations," it's a high-end sci-fi dev console booting up. Black stays black, orange stays the single accent, monospace stays the voice — but now the terminal *performs*: it boots with a typed sequence and blinking cursor before content resolves, cards emit a soft orange glow that tracks the cursor, scrolling drives a HUD-style progress readout down the resume timeline, and route changes flicker like a signal re-sync instead of a plain fade. The goal: within the first two seconds on the page, it should be obvious this isn't a template — it's a console someone built.

## Typography

- Display font: **Syne** (unchanged) — geometric, expressive, already doing the job well.
- Body font: **DM Sans** (unchanged) — clean counterpoint to the mono/display pairing.
- Mono font: **Fira Code** (unchanged) — this is the workhorse of the new direction; boot sequences, typed headlines, and HUD readouts all live in this face.
- Scale: unchanged from current (`text-4xl`–`text-6xl` display headings, `text-sm`/`text-xs` mono labels). No new sizes needed — the redesign is about motion and atmosphere, not typographic rescale.

## Color Palette

- Primary/accent: `#f97316` (orange, unchanged) — CTAs, links, active states, glow source.
- Canvas: `#000000` (unchanged).
- Surface / Surface-2: `#0d0d0d` / `#171717` (unchanged).
- Text hierarchy: `#ffffff` / `#666666` (unchanged).
- Border / Border-bright: `#1f1f1f` / `#333333` (unchanged).
- **New — Glow layer**: orange used at low opacity (`rgba(249,115,22,0.08–0.25)`) as radial gradients / box-shadows for cursor-glow and boot-flicker effects. Not a new hue — an intensity layer on the existing accent.
- **New — Atmosphere texture**: a very dim green-tinted scanline/grain overlay (`rgba(80,255,150,0.02–0.04)`), decorative only, never used as a UI/text color. Reads as "CRT phosphor," not as a second brand color.

No new accent hue is being added to the palette proper — the existing black/orange system is correct and gets intensified, not diluted.

## Motion & Animation

Three libraries, three distinct jobs — not overlapping:

- **anime.js** — one-off, hand-choreographed timeline sequences that don't fit a declarative React model: the boot sequence on first load (`> initializing session...` typed line-by-line with a blinking block cursor, before the existing `editorContainer`/`editorLine` stagger takes over), and a glitch/flicker burst layered into route transitions (a few frames of RGB-split/scanline jitter timed to the `ExpandOverlay` expand).
- **Motion (the `motion` package — the renamed/unified `framer-motion`)** — everything already declarative stays declarative, and gets extended: `useScroll`/`useTransform` for a scroll-linked progress rail on the resume timeline (fills as you scroll, like a HUD readout) and parallax on the featured-project images; spring-based magnetic hover on primary buttons and cards (cursor-relative glow that follows the pointer via `useMotionValue`). This replaces the `framer-motion` import going forward — same underlying engine, current API, actively maintained name.
- **Kokonut UI** — pulled selectively (copy-paste, not wholesale adoption) for 2–3 specific high-impact moments only, then reskinned to the black/orange palette: an animated particle/gradient backdrop behind the hero, a border-beam glow treatment for the primary CTA buttons, and a typewriter/text-reveal primitive for the boot-sequence headline. Everything else (cards, tabs, layout) stays hand-built in the existing component system — Kokonut is seasoning, not a framework swap.

Timing philosophy: one orchestrated boot on load (≈1.5–2s, skippable/instant on repeat visits via sessionStorage flag), then short, snappy micro-interactions (150–300ms) on hover/click, and scroll-linked motion that's directly tied to scroll position (no fixed duration — it *is* the scrollbar).

## Layout & Composition

- Hero stays the "editor window" but gains a boot moment before the file renders.
- Resume timeline gains a vertical progress rail (replacing the static `bg-border-bright` line) that fills with the orange accent as the user scrolls, HUD-style.
- Featured carousel images get subtle scroll parallax instead of sitting static.
- No structural grid changes — the win here is motion and atmosphere on the existing layout, not a re-layout. Asymmetry/overlap is intentionally not part of this pass; the terminal-window motif reads better centered and boxed than broken up.

## Component Changes

### `HeroSection` / `EthanFile` (and sibling `*File` components)
- Current: mounts straight into the staggered line reveal on tab change.
- Target: first-ever page load runs a short anime.js boot sequence (`> whoami`, `> loading profile...`, cursor blink) before handing off to the existing `editorContainer` stagger. Tab switches after that stay as-is (no re-boot).
- Key changes: new `BootSequence` component gated by a `sessionStorage` flag so it only plays once per session.

### `ProjectCard`, `TimelineItem`, `ThoughtCard`
- Current: static border, color-shift on hover.
- Target: cursor-relative orange glow under the border (Motion `useMotionValue` + radial gradient following pointer position), subtle spring lift on hover.
- Key changes: shared `GlowCard` wrapper (or hook) so the effect is written once and applied to all three card types.

### Resume timeline (`ResumeSection`'s replacement inside `ResumeFile`/detail views where a timeline is shown)
- Current: static vertical line (`bg-border-bright`).
- Target: scroll-linked fill rail using `useScroll` (`offset` bound to the timeline container) driving a `scaleY` on an orange overlay line.

### Buttons (resume download, featured CTAs, primary links)
- Current: flat `bg-accent` with color hover.
- Target: Kokonut-derived border-beam/glow treatment, reskinned to orange-on-black.

### Route transitions (`ExpandOverlay`, `PageTransition`)
- Current: expand-from-card-rect + fade, no texture.
- Target: same rect-expand mechanic, plus a brief anime.js glitch/scanline burst (a handful of frames) layered on top during the expand phase.

### Background atmosphere (new)
- Target: fixed, pointer-events-none scanline + grain overlay (CSS, very low opacity) sitting above canvas across all pages; a Kokonut-derived particle/gradient layer specifically behind the hero.

### Dead code cleanup
- `ProjectsSection`, `ResumeSection`, `ContactSection` (the old scroll-section versions, distinct from `*File` editor components), and `Navbar` are unused today and contradict `CLAUDE.md`'s description of the site. Delete them as part of this pass and correct `CLAUDE.md`'s architecture section afterward.

## What We're Keeping

- The core "editor/terminal" concept, tab system (`VSCodeTabBar`, `TabContext`), black+orange palette, and all three current fonts.
- The `TransitionContext` / `ExpandOverlay` / `PageTransition` card→page transition mechanic — extended with texture, not replaced.
- All data files (`projects.ts`, `resume.ts`), content architecture, and existing routes.
- `FloatingBubbles` — keeps its role as ambient decoration, tuned to sit alongside the new atmosphere layer rather than compete with it.

## Implementation Notes

- Swap `framer-motion` → `motion` package in `package.json` (same API surface for the `motion/react` import path); this is the actively-developed name for the library already in use, not a new dependency category.
- Add `animejs` for the boot sequence and glitch-burst timelines only — don't let it creep into places Motion already handles declaratively.
- Pull Kokonut UI components via copy-paste (their site provides source, not an installable package) into `src/components/kokonut/` or similar, then restyle to this project's Tailwind tokens (`--color-accent`, etc.) rather than their default theme.
- Boot sequence must be skippable and must not replay on every internal navigation — gate with `sessionStorage`, only the very first load in a session performs the full timeline.
- Respect `prefers-reduced-motion`: boot sequence, glitch bursts, and parallax should all degrade to instant/static for users with that preference set.
