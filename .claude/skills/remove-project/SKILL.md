---
name: remove-project
description: Remove a project card from the portfolio. Use when the user says "remove [project]", "delete the [project] card", "take [project] off my portfolio", or "get rid of [project]". Always confirm the project name before deleting.
---

# Remove Project

Remove an entry from `src/data/projects.ts`.

## Steps

1. **Read** `src/data/projects.ts` to find the entry.

2. **Confirm** — show the user the project title and ask for confirmation before deleting. If the user already named a specific project clearly, this can be a quick confirm ("Removing `gradyou8` — ok?").

3. **Delete** the entire object (from `{` to `},`) for that project from the array.

4. **Verify** — re-read the file and confirm the array is still valid TypeScript (no trailing commas breaking the parse, array brackets intact).
