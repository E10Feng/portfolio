# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for E10 Feng, an AI and Systems Engineering intern. The site showcases projects (RAG pipelines, LangGraph tooling, ML research, browser extensions), resume/work history (including NASA and RediMinds), and a blog ("My Thoughts"). The stack is Next.js + Tailwind + Framer Motion, deployed on Vercel.

## Workflow

Before making any significant code change, invoke the appropriate superpowers skill (e.g. `superpowers:brainstorming` before building a new feature, `superpowers:systematic-debugging` before fixing a bug, `superpowers:writing-plans` before a multi-step task). Use `superpowers:verification-before-completion` before claiming work is done.

## Commands

```bash
npm run dev       # start dev server (Next.js on localhost:3000)
npm run build     # production build
npm run lint      # ESLint
npx vitest        # run all tests
npx vitest run src/lib/thoughts.test.ts  # run a single test file
```

## Architecture

This is a Next.js 16 App Router portfolio site for E10 Feng. It is deployed on Vercel.

**Single-page home** (`src/app/page.tsx`): Five sections stacked vertically — `HeroSection`, `FeaturedSection`, `ProjectsSection`, `ResumeSection`, `ContactSection`. The Navbar and Footer are in the root layout.

**Dynamic routes**:
- `/projects/[id]` — detail page for a project, statically generated from `src/data/projects.ts`
- `/resume/[id]` — detail page for a resume entry, statically generated from `src/data/resume.ts`
- `/thoughts/[slug]` — individual blog post rendered from markdown via `next-mdx-remote`
- `/thoughts` — listing page for all posts

**Data sources**:
- `src/data/projects.ts` and `src/data/resume.ts` — TypeScript arrays, no CMS. Adding content = editing these files.
- `src/content/thoughts/*.md` — markdown files with gray-matter frontmatter (`title`, `date`, `tags`, `excerpt`). The directory is optional; the reader returns `[]` if it's absent. Posts are rendered with MDX via `next-mdx-remote/rsc`.

**Content types** (`src/types/index.ts`): `ProjectItem` and `ResumeItem` share a `ContentBlock` type (`{ type: "text" } | { type: "image" }`). The `content` array is optional — omitting it shows "more details coming soon."

**Page transition system** (`src/components/animations/`):
- `TransitionContext` — React context with a three-phase state machine (`idle` → `expanding` → `fading`). Cards call `triggerTransition(rect, cardSnapshot)` with their `DOMRect` before navigating.
- `ExpandOverlay` — fixed overlay that reads the stored rect and animates an expand from that position. Wraps a snapshot of the card content so the animation looks like the card expanding into the page.
- `PageTransition` — wraps the destination page to fade in after the overlay finishes.

**Testing**: Vitest with node environment. Only `src/lib/thoughts.test.ts` exists.

**Styling**: Tailwind CSS v4 (PostCSS plugin), dark mode forced via `<html class="dark">`. Color palette is zinc-based throughout.
