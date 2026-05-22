---
name: remove-thought
description: Delete a blog post from the "My Thoughts" section. Use when the user says "remove the post about [topic]", "delete [post title]", "unpublish [post]", or "take down [post]".
---

# Remove Thought (Blog Post)

Delete a markdown file from `src/content/thoughts/`.

## Steps

1. **List** the files in `src/content/thoughts/` to find the target post.

2. **Confirm** — show the post title and slug, ask for confirmation ("Removing `my-thoughts-on-rag.md` — ok?"). If the user already named it clearly, a quick confirm is enough.

3. **Delete** the file.

4. **Verify** — the file is gone and won't appear in the listing (no other registration to clean up).
