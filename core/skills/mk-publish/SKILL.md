---
name: mk-publish
description: mk <module> publish [path] [--agent] — Publish a skill or agent to the git registry.
---

# mk-publish

## Use This Skill When
- "publish skill"
- "upload skill"
- "share skill"
- "mk publish"

## Command
```bash
mk <module> publish [path] [--agent]
```

## Rules
- Validate the skill/agent before publishing.
- Determine version from skill.json or default to 1.0.0.
- Create tarball, update registry index, commit and push.

## Example Invocation
User: "publish my new skill"
→ Run: mk core publish ./path/to/skill

## Pre-execution Validation
1. Run validation on the target.
2. Check registry is configured.
3. Determine version.

## Output Standard
Publish confirmation with module/type/name@version.

## Exit Condition
You are done when:
- Skill/agent is published to the registry.
