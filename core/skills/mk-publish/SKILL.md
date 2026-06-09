---
name: mk-publish
description: mk <module> publish [path] — Publish a skill or agent to the git registry.
---

# mk-publish

## Detected Intent
- "publish skill"
- "upload skill"
- "share skill"
- "mk publish"

## Command
```bash
mk <module> publish [path]
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
