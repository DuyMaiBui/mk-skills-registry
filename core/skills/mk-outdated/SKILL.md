---
name: mk-outdated
description: mk <module> outdated [--agent] — Report installed skills or agents that have newer versions.
---

# mk-outdated

## Use This Skill When
- "outdated skills"
- "old skills"
- "check updates"
- "mk outdated"

## Command
```bash
mk <module> outdated [--agent]
```

## Rules
- Fetch registry index.
- Compare installed versions with latest.
- Print table: name | current | wanted | latest.
- Exit code 1 if any outdated.

## Example Invocation
User: "are my skills outdated?"
→ Run: mk core outdated

## Pre-execution Validation
1. Read lockfile.
2. Fetch registry index.
3. Resolve latest versions.

## Output Standard
Outdated report table.

## Exit Condition
You are done when:
- Report displayed; exit code 1 if outdated items exist.
