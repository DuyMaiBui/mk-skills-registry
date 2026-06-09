---
name: mk-validate
description: mk <module> validate [path] — Validate skill/agent files against frontmatter and structure rules.
---

# mk-validate

## Detected Intent
- "validate skills"
- "check skill"
- "lint skills"
- "mk validate"

## Command
```bash
mk <module> validate [path]
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
