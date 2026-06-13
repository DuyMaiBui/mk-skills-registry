---
name: mk-update
description: mk <module> update [name] [--agent] — Update installed skills or agents to the latest version.
---

# mk-update

## Use This Skill When
- "update skills"
- "upgrade skills"
- "mk update"

## Command
```bash
mk <module> update [name] [--agent]
```

## Rules
- If name provided, update that item.
- If no name, update all items in module.
- Compare installed version vs latest from registry.
- Install latest version for outdated items.

## Example Invocation
User: "update all core skills"
→ Run: mk core update

## Pre-execution Validation
1. Read lockfile.
2. Fetch registry index.
3. Identify outdated items.

## Output Standard
Summary of updated items.

## Exit Condition
You are done when:
- Outdated items updated to latest.
