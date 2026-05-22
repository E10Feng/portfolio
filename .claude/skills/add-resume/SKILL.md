---
name: add-resume
description: Add a new entry to the resume/timeline section of the portfolio. Use when the user says "add a job", "add my internship at [company]", "add [role] to my resume", "add a new resume card", or provides work/education/research experience to showcase.
---

# Add Resume Entry

Add a new entry to `src/data/resume.ts`.

## Steps

1. **Read** `src/data/resume.ts` for the current array and `src/types/index.ts` for the `ResumeItem` shape.

2. **Gather details** — if not provided, ask for:
   - Organization name
   - Role/title
   - Type (one or more of: `"education"`, `"work"`, `"research"`, `"internship"`)
   - Start date (e.g. `"jan 2025"`)
   - End date (e.g. `"aug 2025"` or `"present"`)
   - Location (e.g. `"houston, tx"`)
   - Description bullets (array of strings — lowercase, past tense for completed roles)
   - Technologies (optional array of lowercase strings)
   - Photos (optional — array of `/filename.jpg` paths if they exist in `/public`)
   - Content blocks (optional — for the detail page)

3. **Generate an `id`** — kebab-case from org + role, e.g. `"nasa-intern"`. Check for conflicts.

4. **Insert** the new entry at the correct chronological position in the array (most recent first — check `startDate`).

5. **Verify** — re-read the file and confirm the TypeScript shape is valid.

## ResumeItem shape reference

```ts
{
  id: string
  type: Array<"education" | "work" | "research" | "internship">
  organization: string       // lowercase
  role: string               // lowercase
  startDate: string          // e.g. "jan 2025"
  endDate: string            // e.g. "aug 2025" or "present"
  location: string           // e.g. "houston, tx"
  description: string[]      // lowercase bullets
  technologies?: string[]    // lowercase
  photos?: string[]          // paths like "/photo.jpg"
  content?: Array<{ type: "text"; content: string } | { type: "image"; src: string; alt: string; caption?: string }>
}
```
