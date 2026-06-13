---
name: mk-uninstall
description: mk <module> uninstall <name> [--agent] — Remove an installed skill or agent.
---

# mk-uninstall

## Use This Skill When
- "remove skill"
- "delete skill"
- "uninstall skill"
- "mk uninstall"

## Command
```bash
mk <module> uninstall <name> [--agent]
```

## Rules
- Remove the skill directory or agent file.
- Update skill-lock.json.
- Do not remove dependencies of other installed skills.

## Example Invocation
User: "remove the auth skill"
→ Run: mk core uninstall auth

## Pre-execution Validation
1. Check skill/agent is installed.
2. Confirm removal if requested by config.

## Output Standard
Removal confirmation.

## Exit Condition
You are done when:
- Skill/agent is removed and lockfile updated.
