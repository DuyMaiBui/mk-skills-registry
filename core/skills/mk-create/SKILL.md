---
name: mk-create
description: mk <module> create <name> — Create a new skill or agent scaffold.
---

# mk-create

## Detected Intent
- "create skill"
- "new skill"
- "scaffold agent"
- "mk create"

## Command
```bash
mk <module> create <name>
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
