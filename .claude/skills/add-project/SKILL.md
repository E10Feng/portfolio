---
name: add-project
description: Add a new project card to the portfolio. Use when the user says "add a project", "add [project name] to my portfolio", "create a new project card", "I built something new", or provides project details they want to showcase. Always use this skill for adding projects — don't just edit the file directly without it.
---

# Add Project

Add a new entry to `src/data/projects.ts`.

## Steps

1. **Read** `src/data/projects.ts` to see the current array and `src/types/index.ts` for the `ProjectItem` shape.

2. **Gather details** — if the user hasn't provided them, ask for:
   - Title
   - Description (1-2 sentences, lowercase, conversational — match the tone of existing entries)
   - Tech stack (array of lowercase strings)
   - Links: `github`, `demo`, and/or `paper` (all optional)
   - Year (default to current year)
   - Featured? (default `false` unless user says otherwise)
   - Content blocks (optional — array of `{ type: "text", content: "..." }` paragraphs for the detail page)

3. **Generate an `id`** — kebab-case from the title, e.g. `"My Cool App"` → `"my-cool-app"`. Check for conflicts with existing ids.

4. **Set `date`** — use today's date in `YYYY-MM-DD` format so it sorts correctly.

5. **Insert** the new entry at the top of the `projects` array (newest first).

6. **Verify** — re-read the file and confirm the TypeScript shape is valid (no missing required fields, no type mismatches).

## ProjectItem shape reference

```ts
{
  id: string           // kebab-case slug, unique
  title: string
  description: string  // lowercase, conversational
  techStack: string[]  // lowercase strings
  links: {
    github?: string
    demo?: string
    paper?: string
  }
  featured: boolean
  year: number
  date?: string        // "YYYY-MM-DD" — used for sort order
  content?: Array<{ type: "text"; content: string } | { type: "image"; src: string; alt: string; caption?: string }>
}
```
