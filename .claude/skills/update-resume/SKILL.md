---
name: update-resume
description: Edit an existing resume entry — change its description bullets, technologies, dates, location, or content blocks. Use when the user says "update my [company] entry", "add a bullet to [role]", "change the dates for [org]", "add technologies to [role]", or "add photos to [org]".
---

# Update Resume Entry

Edit an existing entry in `src/data/resume.ts`.

## Steps

1. **Read** `src/data/resume.ts` to find the target entry.

2. **Clarify** what's changing if not already clear — ask only about the fields to update.

3. **Edit** only the specified fields. Leave everything else untouched.

4. **Verify** — re-read the file and confirm the TypeScript shape is still valid.

## Common updates

- **Description bullets**: lowercase, concise, past tense for completed roles — `"present"` roles can use present tense
- **Technologies**: lowercase strings in the array
- **Dates**: `"mon yyyy"` format, e.g. `"jan 2026"`
- **Photos**: array of `/filename.jpg` paths pointing to files in `/public`
- **Content blocks**: `{ type: "text", content: "..." }` — appear on the `/resume/[id]` detail page
- **Type**: can be multiple, e.g. `["work", "internship"]`
