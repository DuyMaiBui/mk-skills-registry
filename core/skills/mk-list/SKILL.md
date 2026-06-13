---
name: mk-list
description: mk <module> list [--agent] — List installed skills or agents.
---

# mk-list

## Use This Skill When
- "list skills"
- "show installed"
- "what skills"
- "mk list"

## Command
```bash
mk <module> list [--agent]
```

## Rules
- Read .opencode/ directory.
- Show name and version from lockfile or skill.json.
- Format as a table.

## Example Invocation
User: "what skills are installed?"
→ Run: mk core list

## Pre-execution Validation
1. Check module directory exists.
2. Read lockfile for versions.

## Output Standard
Table of installed items with versions.

## Exit Condition
You are done when:
- List is displayed.
