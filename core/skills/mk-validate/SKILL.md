---
name: mk-validate
description: mk <module> validate [path] — Validate skill/agent files against frontmatter and structure rules.
---

# mk-validate

## Use This Skill When
- "validate skills"
- "check skill"
- "lint skills"
- "mk validate"

## Command
```bash
mk <module> validate [path]
```

## Rules
- Check SKILL.md or agent .md exists.
- Validate YAML frontmatter.
- Ensure required sections are present.
- Report pass/fail per item.

## Example Invocation
User: "validate all core skills"
→ Run: mk core validate

## Pre-execution Validation
1. Resolve target path (default module directory).
2. Find all skills/agents to validate.
3. Check frontmatter name matches folder/filename.

## Output Standard
Validation report with pass/fail status and errors.

## Exit Condition
You are done when:
- All items validated; exit code 1 if any fail.
