---
name: add-thought
description: Write and publish a new blog post to the "My Thoughts" section. Use when the user says "write a post about [topic]", "add a blog post", "publish a thought", "I want to write about [topic]", or provides content for a new post.
---

# Add Thought (Blog Post)

Create a new markdown file in `src/content/thoughts/`.

## Steps

1. **Gather details** — if not provided, ask for:
   - Title
   - Topic / what to write about (can be a rough idea — you'll write the full post)
   - Tags (1-4 lowercase strings, e.g. `["ai", "research"]`)
   - Tone: casual/reflective vs. technical/detailed

2. **Generate a slug** — kebab-case from the title, e.g. `"my-thoughts-on-rag"`. Check `src/content/thoughts/` for conflicts.

3. **Write the post** — create `src/content/thoughts/<slug>.md` with this structure:

```markdown
---
title: "Your Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
excerpt: "One sentence summary shown in the card listing."
---

Full markdown content here. Use ## for headings, **bold**, `code`, etc.
```

4. **Use today's date** in `YYYY-MM-DD` format for the `date` field.

5. **Verify** — the file will be auto-discovered by `src/lib/thoughts.ts` (no registration needed). Confirm the frontmatter is valid YAML and the excerpt is under ~150 characters.

## Notes

- Posts are rendered with MDX via `next-mdx-remote/rsc` — standard markdown + JSX components work
- The `excerpt` field is shown on the listing card — make it a compelling 1-sentence hook
- Tags appear as small code-style labels on the card
- Files starting with `README` are ignored by the reader
