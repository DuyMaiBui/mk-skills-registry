---
name: mk-init
description: mk init — Initialize an OpenCode project and install helper skills.
---

# mk-init

## Use This Skill When
- "start new project"
- "initialize opencode"
- "bootstrap project"
- "mk init"

## Command
```bash
mk init
```

## Rules
- Create .opencode/ structure if missing.
- Prompt for registry URL if not configured.
- Prompt for modules to install and enforce dependencies.
- Install mk-* helper skills for selected modules.

## Example Invocation
User: "initialize this project"
→ Run: mk init

## Pre-execution Validation
1. Check if .opencode/ exists.
2. Verify registry is configured or prompt for it.
3. Ensure module dependencies are satisfied.

## Output Standard
Summary of created files and installed skills.

## Exit Condition
You are done when:
- Project is initialized and helper skills are installed.
