---
name: mk-install
description: mk <module> install <name>[@version] — Install a skill or agent from the registry.
---

# mk-install

## Detected Intent
- "install skill"
- "get skill"
- "add skill"
- "mk install"

## Command
```bash
mk <module> install <name>[@version]
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
