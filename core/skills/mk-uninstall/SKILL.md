---
name: mk-uninstall
description: mk <module> uninstall <name> — Remove an installed skill or agent.
---

# mk-uninstall

## Detected Intent
- "remove skill"
- "delete skill"
- "uninstall skill"
- "mk uninstall"

## Command
```bash
mk <module> uninstall <name>
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
