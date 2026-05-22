---
name: remove-resume
description: Remove an entry from the resume/timeline section. Use when the user says "remove [company/role] from my resume", "delete the [org] card", or "take [role] off my timeline".
---

# Remove Resume Entry

Remove an entry from `src/data/resume.ts`.

## Steps

1. **Read** `src/data/resume.ts` to find the entry.

2. **Confirm** — show the role + organization and ask for confirmation. If the user already named it clearly, a quick confirm suffices ("Removing `ai systems engineering intern` at `nasa` — ok?").

3. **Delete** the entire object for that entry from the array.

4. **Verify** — re-read the file and confirm the array is still valid TypeScript (no trailing commas, brackets intact).
