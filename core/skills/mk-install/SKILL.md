---
name: mk-install
description: mk <module> install <name>[@version] [--agent] — Install a skill or agent from the registry.
---

# mk-install

## Use This Skill When
- "install skill"
- "get skill"
- "add skill"
- "mk install"

## Command
```bash
mk <module> install <name>[@version] [--agent]
```

## Rules
- Default to latest version if not specified.
- Check module dependencies before installing.
- Fetch tarball from registry or cache.
- Extract to .opencode/ and update lockfile.

## Example Invocation
User: "install the build skill"
→ Run: mk core install build

## Pre-execution Validation
1. Check module dependencies are satisfied.
2. Check if already installed.
3. Fetch registry index to resolve version.

## Output Standard
Installed name@version and any warnings.

## Exit Condition
You are done when:
- Skill/agent is installed and lockfile updated.
