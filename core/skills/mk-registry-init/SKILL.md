---
name: mk-registry-init
description: mk registry-init <git-url> — Set up a new git-based skills registry.
---

# mk-registry-init

## Use This Skill When
- "setup registry"
- "create registry"
- "init registry"
- "mk registry-init"

## Command
```bash
mk registry-init <git-url>
```

## Rules
- Clone or init registry repo.
- Create standard directory structure.
- Create initial index.json.
- Commit and push.
- Update local config with registry URL.

## Example Invocation
User: "setup a new registry"
→ Run: mk registry-init https://github.com/DuyMaiBui/mk-skills-registry.git

## Pre-execution Validation
1. Validate git URL format.
2. Check registry does not already exist locally.
3. Ensure push permissions.

## Output Standard
Registry initialization confirmation.

## Exit Condition
You are done when:
- Registry is initialized and configured.
