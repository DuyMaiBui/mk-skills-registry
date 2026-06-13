# mk-cli

CLI tool for managing OpenCode skills with modular `mk-*` helper skills.

## Installation

Install globally from npm:

```bash
npm install -g @DuyMaiBui/mk-skills-registry-cli
```

Verify the installation:

```bash
mk --version
```

## Installing Skills

### Initialize a project

```bash
# Create .opencode/ structure and install helper skills
mk init
```

`mk init` will prompt you to select modules:
- **`core`** — checked by default; contains CLI helper and workflow skills (`build`, `plan`, `debug`, `fix`, `test`, `review`, `scout`, `research`, `brainstorm`, `docs`, `git`, `handoff`, `watzup`)
- **`unity`** — unchecked by default; contains Unity-specific agents

If you select `unity`, `core` is auto-selected because `unity` depends on it.

### Install a skill from core

```bash
mk core install <skill-name>
```

Examples:

```bash
mk core install mk-init
mk core install build
mk core install debug
mk core install plan
```

### Install an agent from unity

```bash
mk core install mk-init          # core must be installed first
mk unity install unity-tester --agent
mk unity install unity-runtime-developer --agent
mk unity install unity-reviewer --agent
```

### List installed skills/agents

```bash
mk core list
mk core list --agent
mk unity list --agent
```

## Quick Start

```bash
# 1. Configure the skills registry
mk registry-init https://github.com/DuyMaiBui/mk-skills-registry.git

# 2. Bootstrap a new project with helper skills
mk init

# 3. Install skills
mk core install build
mk core install debug
mk core install mk-init
mk core install brainstorm

# 4. Install Unity agents (requires core to be installed first)
mk unity install unity-tester --agent
mk unity install unity-runtime-developer --agent
```

## Modules

`mk-cli` organizes skills into modules:

- **`core`** — Generic AI workflow skills and `mk-*` CLI helper skills.
- **`unity`** — Unity-specific agents. **Depends on `core`.**

> **Note:** The `unity` module has a hard dependency on `core`. You must install `core` first. `mk init` will auto-select `core` when you choose `unity`.

## Commands

### Global Commands
- `mk init` — Bootstrap project and install mk-* helper skills
- `mk registry-init <git-url>` — Create a new team registry

### Module Commands (core | unity)
- `mk <module> create <name> [--agent]` — Create new skill/agent
- `mk <module> validate [path]` — Validate skill structure
- `mk <module> publish [path] [--agent]` — Publish to registry
- `mk <module> install <name>[@version] [--agent]` — Install skill
- `mk <module> uninstall <name> [--agent]` — Remove skill
- `mk <module> list [--agent]` — List installed
- `mk <module> search <query> [--agent]` — Search registry
- `mk <module> info <name> [--agent]` — Show skill info
- `mk <module> update [name] [--agent]` — Update skill(s)
- `mk <module> outdated [--agent]` — Check for updates
- `mk <module> syncback [--agent]` — Sync local changes

## Registry Workflow

### For team leads

Set up a shared git registry once:

```bash
mk registry-init https://github.com/DuyMaiBui/mk-skills-registry.git
```

This creates the standard layout:

```
index.json
core/skills/
core/agents/
unity/skills/
unity/agents/
```

### For contributors

Publish a new skill:

```bash
mk core create my-skill
mk core validate
mk core publish
```

Publish a new agent:

```bash
mk unity create unity-my-agent --agent
mk unity validate
mk unity publish --agent
```

### For consumers

Install a skill:

```bash
mk core install mk-init
mk core install brainstorm
```

Install a Unity agent (requires core to be installed first):

```bash
mk core install mk-init
mk unity install unity-tester --agent
```

## Architecture

Each CLI feature has a corresponding `mk-*` skill that auto-detects user intent:

- `mk-init` — Bootstrap new projects
- `mk-create` — Create skills
- `mk-install` — Install skills
- `mk-validate` — Validate skills
- `mk-publish` — Publish skills
- `mk-uninstall` — Remove skills
- `mk-list` — List installed
- `mk-search` — Search registry
- `mk-info` — Skill metadata
- `mk-update` — Update skills
- `mk-outdated` — Check versions
- `mk-syncback` — Sync changes
- `mk-registry-init` — Setup registry

Run `mk init` to install all helper skills into your project.
