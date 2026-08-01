# mk Skills Registry

Git-based registry for OpenCode skills consumed by [`@duymaibui/mk-skills-registry-cli`](https://github.com/DuyMaiBui/mk-skills-registry/pkgs/npm/mk-skills-registry-cli), published via [GitHub Packages](https://npm.pkg.github.com).

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
mk registry-init https://github.com/DuyMaiBui/mk-skills-registry.git

# Initialize a project
mk init

# Publish a skill
mk core publish ./path/to/skill

# Install a skill
mk core install mk-init
```

## Publishing

Use `mk <module> publish [path]` from a project that has `@mike/mk-cli` installed.
