---
name: mk-info
description: mk <module> info <name> — Show metadata for a skill or agent.
---

# mk-info

## Detected Intent
- "skill info"
- "details"
- "about skill"
- "mk info"

## Command
```bash
mk <module> info <name>
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
