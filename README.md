# mk Skills Registry

Git-based registry for OpenCode skills consumed by [`@mike/mk-cli`](https://www.npmjs.com/package/@mike/mk-cli).

## Modules

- **`core`** — Generic AI workflow skills and `mk-*` CLI helper skills.
- **`unity`** — Unity-specific agents. Depends on `core`.

## Layout

```
index.json
core/
  skills/
    mk-init/SKILL.md
    mk-create/SKILL.md
    ...
  agents/
unity/
  skills/
  agents/
    unity-runtime-developer.md
    unity-editor-developer.md
    unity-tester.md
    unity-reviewer.md
    unity-code-conventions.md
```

## Usage

```bash
# Configure the registry
mk registry-init https://github.com/mike/mk-skills-registry.git

# Initialize a project
mk init

# Publish a skill
mk core publish ./path/to/skill

# Install a skill
mk core install mk-init
```

## Publishing

Use `mk <module> publish [path]` from a project that has `@mike/mk-cli` installed.
