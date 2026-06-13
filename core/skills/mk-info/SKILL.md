---
name: mk-info
description: mk <module> info <name> [--agent] — Show metadata for a skill or agent.
---

# mk-info

## Use This Skill When
- "skill info"
- "details"
- "about skill"
- "mk info"

## Command
```bash
mk <module> info <name> [--agent]
```

## Rules
- Fetch registry index.
- Show name, version, description, author, keywords, dependencies.

## Example Invocation
User: "tell me about the build skill"
→ Run: mk core info build

## Pre-execution Validation
1. Check registry is configured.
2. Fetch index.
3. Verify item exists in module.

## Output Standard
Skill/agent metadata.

## Exit Condition
You are done when:
- Metadata displayed.
