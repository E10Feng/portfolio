# Blog ("My Thoughts") — Design Spec

## Overview

Add a blog section to the portfolio website. Posts live as Markdown files in the repo. Users write in their notes app, paste to me, and I create the files. Navigation and UI copy uses "my thoughts" instead of "blog."

## Directory Structure

```
src/
  content/
    thoughts/
      2026-05-08-vectorless-rag.md   # YYYY-MM-DD-slug.md
      ...
  app/
    thoughts/
      page.tsx                       # listing page
      [slug]/
        page.tsx                     # individual post
```

## Frontmatter Schema

```yaml
title: "Post Title"
date: "2026-05-08"
tags: ["rag", "ai", "vectorless"]
excerpt: "One-sentence summary for the listing page."
```

## Listing Page (`/thoughts`)

- Reverse chronological order
- Each post card shows: title, date (formatted "May 8, 2026"), tags, excerpt
- Clicking a card navigates to the post
- Clean, minimal layout — similar visual weight to other portfolio sections

## Individual Post Page (`/thoughts/[slug]`)

- Renders Markdown to HTML
- Title, date, tags at top
- Clean reading layout (centered, max-width ~650px)
- Back link at top → `/thoughts`
- Tags are clickable (filter to listing page with that tag — stretch, can defer)

## MDX/Markdown Setup

- Use `next-mdx-remote` or `@next/mdx` to render Markdown
- Allows code blocks, headers, lists, etc. in posts
- Apply consistent typography styles

## Navigation Updates

**Navbar** — add link:
```ts
{ label: "my thoughts", href: "/thoughts" }
```

**Hero section** — add "my thoughts" button linking to `/thoughts`

**Footer** — add "my thoughts" link

## Workflow

1. User writes post in notes app
2. User pastes post content + frontmatter metadata in chat
3. I create/update the `.md` file in `src/content/thoughts/`
4. User commits (or I commit if write access granted)

## Post Creation (First Post)

The initial implementation should include the vectorless RAG post once the system is live, so the blog isn't empty.

## Out of Scope

- Comments
- Likes/views
- Pagination (if posts < 20)
- RSS feed
- Draft system
- Search

These can be added later if needed.