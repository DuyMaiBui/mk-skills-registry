---
name: mk-list
description: mk <module> list — List installed skills or agents.
---

# mk-list

## Detected Intent
- "list skills"
- "show installed"
- "what skills"
- "mk list"

## Command
```bash
mk <module> list
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
