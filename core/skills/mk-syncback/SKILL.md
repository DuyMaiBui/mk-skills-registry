---
name: mk-syncback
description: mk <module> syncback [--agent] — Publish local skill changes back to the registry.
---

# mk-syncback

## Use This Skill When
- "sync changes"
- "push updates"
- "publish updates"
- "mk syncback"

## Command
```bash
mk <module> syncback [--agent]
```

## Rules
- For each installed item, detect local modifications.
- Validate before publishing.
- Prompt for new version.
- Publish and update lockfile.

## Example Invocation
User: "sync my local changes"
→ Run: mk core syncback

## Pre-execution Validation
1. Identify installed items with local changes.
2. Validate each modified item.
3. Prompt for version bump.

## Output Standard
Summary of published updates.

## Exit Condition
You are done when:
- Local changes are synced to registry.
