---
name: mk-search
description: mk <module> search <query> — Search the registry for skills or agents.
---

# mk-search

## Detected Intent
- "find skill"
- "search skill"
- "lookup skill"
- "mk search"

## Command
```bash
mk <module> search <query>
```

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
