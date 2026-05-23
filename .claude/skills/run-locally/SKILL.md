---
name: run-locally
description: Use when asked to run the portfolio locally, verify a UI change works, take a screenshot of the site, or confirm a feature looks correct in the browser.
---

# Run Portfolio Locally

Launch the Next.js dev server and screenshot pages with Playwright MCP.

## Launch

```bash
# 1. Check if already running
lsof -i :3000 | grep LISTEN

# 2. If NOT running, start it (from /Users/e10/portfolio)
npm run dev &
sleep 4

# 3. Verify ready
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Expected: 200
```

## Screenshot with Playwright MCP

```
mcp__plugin_playwright_playwright__browser_navigate  { url: "http://localhost:3000" }
mcp__plugin_playwright_playwright__browser_take_screenshot  {}
```

To click a tab and screenshot the result:
```
mcp__plugin_playwright_playwright__browser_click  { element: "PROJECTS.md", ref: <from snapshot> }
mcp__plugin_playwright_playwright__browser_take_screenshot  {}
```

Use `browser_snapshot` first if you need element refs for clicking:
```
mcp__plugin_playwright_playwright__browser_snapshot  {}
```

## Tab verification checklist

After launching, verify these work:
- [ ] `ETHAN.md` tab active by default — editor shows frontmatter + About/Stack sections
- [ ] `PROJECTS.md` tab — swaps editor content to projects list
- [ ] `RESUME.md` tab — swaps to work history
- [ ] `CONTACT.md` tab — swaps to contact info
- [ ] Featured section visible when on ETHAN.md, hidden on other tabs

## Cleanup

If you started the server, kill it when done:
```bash
kill $(lsof -ti :3000)
```

If it was already running when you started, leave it alone.

## Screenshots

Playwright MCP saves screenshots inside the project directory (`.playwright-mcp/` or similar). Don't manually specify a path — let the tool pick its default location.
