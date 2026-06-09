---
name: mk-outdated
description: mk <module> outdated — Report installed skills or agents that have newer versions.
---

# mk-outdated

## Detected Intent
- "outdated skills"
- "old skills"
- "check updates"
- "mk outdated"

## Command
```bash
mk <module> outdated
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
