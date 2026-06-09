---
name: mk-update
description: mk <module> update [name] — Update installed skills or agents to the latest version.
---

# mk-update

## Detected Intent
- "update skills"
- "upgrade skills"
- "mk update"

## Command
```bash
mk <module> update [name]
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
