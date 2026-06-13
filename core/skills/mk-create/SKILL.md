---
name: mk-create
description: mk <module> create <name> [--agent] — Create a new skill or agent scaffold.
---

# mk-create

## Use This Skill When
- "create skill"
- "new skill"
- "scaffold agent"
- "mk create"

## Command
```bash
mk <module> create <name> [--agent]
```

## Rules
- Validate module name.
- Generate SKILL.md for skills or .md for agents.
- Use consistent frontmatter and template sections.

## Example Invocation
User: "create a skill called auth"
→ Run: mk core create auth

## Pre-execution Validation
1. Check module is valid.
2. Check name is provided and valid.
3. Ensure target directory does not already exist.

## Output Standard
Path to created scaffold file(s).

## Exit Condition
You are done when:
- Skill or agent scaffold is created and valid.
