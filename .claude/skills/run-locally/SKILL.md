---
name: run-locally
description: Use when asked to run the portfolio locally or start the dev server so the user can preview changes in their browser.
---

# Run Portfolio Locally

```bash
# Check if already running
lsof -i :3000 | grep LISTEN

# If NOT running, start it
cd /Users/e10/portfolio && npm run dev
```

That's it. The site will be available at http://localhost:3000. Leave the server running — the user will view it in their own browser.
