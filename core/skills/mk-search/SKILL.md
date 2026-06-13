---
name: mk-search
description: mk <module> search <query> [--agent] — Search the registry for skills or agents.
---

# mk-search

## Use This Skill When
- "find skill"
- "search skill"
- "lookup skill"
- "mk search"

## Command
```bash
mk <module> search <query> [--agent]
```

## Rules
- Fetch registry index.
- Filter by query across name, description, keywords.
- Print results as a table.

## Example Invocation
User: "search for debug skills"
→ Run: mk core search debug

## Pre-execution Validation
1. Check registry is configured.
2. Fetch index.
3. Normalize query for matching.

## Output Standard
Table of matching skills/agents with versions.

## Exit Condition
You are done when:
- Search results displayed.
