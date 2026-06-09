---
name: mk-registry-init
description: mk registry-init <git-url> — Set up a new git-based skills registry.
---

# mk-registry-init

## Detected Intent
- "setup registry"
- "create registry"
- "init registry"
- "mk registry-init"

## Command
```bash
mk registry-init <git-url>
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
