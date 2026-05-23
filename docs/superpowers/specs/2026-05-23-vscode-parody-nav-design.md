# VS Code Parody Nav Design

**Date:** 2026-05-23
**Status:** Approved

## Overview

Transform the portfolio's navigation into a full VS Code tab bar parody. The existing `ETHAN.md` editor chrome in the hero section becomes the main content area of the site; tabs in the top bar switch which "file" is open. Featured and Thoughts sections scroll below the editor when `ETHAN.md` is active.

## Architecture

### New: `TabContext` (`src/context/TabContext.tsx`)

- React context providing `activeTab` and `setActiveTab`
- Type: `'ethan' | 'projects' | 'resume' | 'contact'`
- Default: `'ethan'`
- Wraps the app via the root layout (`src/app/layout.tsx`)

### New: `VSCodeTabBar` (`src/components/layout/VSCodeTabBar.tsx`)

- Replaces the existing `<Navbar>` in the root layout
- Fixed at top, `z-50`, `h-14`, same `bg-canvas/90 backdrop-blur border-b border-border` as current navbar
- Renders 4 tabs left to right: `ETHAN.md`, `PROJECTS.md`, `RESUME.md`, `CONTACT.md`
- Reads and sets `TabContext`
- **Active tab:** larger text (`text-lg`), full `text-text` color, bottom border removed (bleeds into editor below), accent dot (the "unsaved" indicator)
- **Inactive tabs:** `text-sm`, `text-text-dim`, no bottom border treatment
- Font: `font-display` to match existing ETHAN.md tab styling
- No logo — the tabs are the identity

### Modified: `HeroSection` (`src/components/sections/HeroSection.tsx`)

- Reads `activeTab` from `TabContext`
- The internal mini tab bar (currently hardcoded "ETHAN.md") is **removed** — the global `VSCodeTabBar` replaces it
- Editor chrome (`border border-border rounded-sm`) remains as the content container
- Content area becomes a switcher: renders one of four file components based on `activeTab`
- All file views use the same stagger animation (lines fading in) so switching tabs feels like opening a file

### New: `EthanFile` sub-component

- Extracts the current ETHAN.md frontmatter + body content from `HeroSection` into its own component
- No behavior change — pure extraction for cleanliness

### New: `ProjectsFile`, `ResumeFile`, `ContactFile` sub-components

- Live alongside `EthanFile`, likely in `src/components/editor/` or colocated in `HeroSection.tsx` if small
- All use `font-code text-sm leading-7`, same line animation variants as `EthanFile`

**`ProjectsFile`:**
- Frontmatter: `type: portfolio`
- Body: `# Projects` section, each project as a markdown list item with name, one-line description, and `↗` link to `/projects/[id]`
- Data source: `src/data/projects.ts`

**`ResumeFile`:**
- Frontmatter: `type: work-history`
- Body: one `# RoleName` section per resume entry with date range and 1–2 bullet points
- Data source: `src/data/resume.ts`

**`ContactFile`:**
- Frontmatter: `type: contact`
- Body: `# Reach me` section with email, GitHub, LinkedIn as markdown-style links
- Mirrors the Links section already in ETHAN.md

### Modified: `FeaturedSection`

- The only scroll section that remains on the home page below the editor
- Conditionally rendered only when `activeTab === 'ethan'`
- Wrap in a fade animation so it disappears gracefully when switching tabs

### Removed from home page: `ProjectsSection`, `ResumeSection`, `ContactSection`

- These three scroll sections are removed from `src/app/page.tsx`
- Their content is now accessible via the `PROJECTS.md`, `RESUME.md`, and `CONTACT.md` tabs
- The component files can be kept for reference but are no longer rendered on the home page

### Thoughts

- `/thoughts` is already a separate page — it stays as-is
- No home page scroll section for Thoughts; the existing nav link to `/thoughts` can be tucked into the `ContactFile` or a footer

### Modified: Root layout (`src/app/layout.tsx`)

- Add `<TabProvider>` wrapping `{children}`
- Replace `<Navbar>` with `<VSCodeTabBar>`

## File Structure Changes

```
src/
  context/
    TabContext.tsx          # new
  components/
    layout/
      VSCodeTabBar.tsx      # new (replaces Navbar.tsx)
      Navbar.tsx            # kept but unused, or deleted
    editor/                 # new folder for file sub-components
      EthanFile.tsx
      ProjectsFile.tsx
      ResumeFile.tsx
      ContactFile.tsx
    sections/
      HeroSection.tsx       # modified
      FeaturedSection.tsx   # modified (conditional render)
```

## Interaction Design

- Tab click → `setActiveTab(tab)` → editor content swaps with stagger animation
- Active tab text is noticeably larger than inactive tabs (size contrast is the primary active indicator)
- The accent dot on the active tab is the "unsaved changes" metaphor from the original ETHAN.md tab
- No page navigation occurs — everything is client-side state
- Detail pages (`/projects/[id]`, `/resume/[id]`) still exist and are linked from `ProjectsFile` and `ResumeFile`

## Out of Scope

- Mobile nav (addressed later — VS Code tabs don't translate well to mobile, keep simple)
- VS Code sidebar / activity bar / status bar (future enhancement)
- Thoughts page tab (Thoughts stays as a scroll section below ETHAN.md, not a tab)
- Animated tab switching transitions beyond the existing stagger fade

## Non-Goals

- No URL changes when switching tabs (tabs are purely UI state)
- No persistence of active tab across page refreshes (always opens to ETHAN.md)
