---
name: update-project
description: Edit an existing project card — change its description, tech stack, links, featured status, or content blocks. Use when the user says "update [project]", "edit the [project] card", "change the description of [project]", "add a link to [project]", "mark [project] as featured", or "add more detail to [project]".
---

# Update Project

Edit an existing entry in `src/data/projects.ts`.

## Steps

1. **Read** `src/data/projects.ts` to find the target entry.

2. **Clarify** what's changing if the user hasn't been specific — ask only about the fields they want to update, not the whole entry.

3. **Edit** only the specified fields. Do not touch unrelated fields.

4. **Verify** — re-read the file and confirm the TypeScript shape is still valid.

## Common updates

- **Description**: keep the existing lowercase, conversational tone
- **Tech stack**: lowercase strings in the array
- **Links**: add/update `github`, `demo`, or `paper` keys under `links: {}`
- **Featured**: toggle `featured: true/false`
- **Content blocks**: each block is `{ type: "text", content: "..." }` — these appear on the `/projects/[id]` detail page
- **Date**: update to today if the project was recently relaunched/updated
