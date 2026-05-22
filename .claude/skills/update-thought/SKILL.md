---
name: update-thought
description: Edit an existing blog post — update its content, title, tags, excerpt, or fix typos. Use when the user says "edit the post about [topic]", "update [post title]", "fix a typo in [post]", "add a section to [post]", or "change the tags on [post]".
---

# Update Thought (Blog Post)

Edit an existing markdown file in `src/content/thoughts/`.

## Steps

1. **List** `src/content/thoughts/` to find the target file, then **read** it.

2. **Clarify** what's changing if not already clear — only ask about the fields to update.

3. **Edit** only what was asked:
   - **Frontmatter fields** (`title`, `date`, `tags`, `excerpt`) — edit the YAML block at the top
   - **Body content** — edit the markdown below the `---` closing delimiter
   - **Both** — if the user wants a full rewrite

4. **Verify** — re-read the file and confirm the frontmatter YAML is still valid (no broken indentation, tags is an array, date is `YYYY-MM-DD`).

## Frontmatter reference

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
excerpt: "One sentence shown in the card listing — keep under ~150 chars."
---
```
