const fs = require('fs');
const path = require('path');
const baseDir = '/var/folders/mc/0sndn6v11yn8bk832x49p8bm0000gn/T/opencode/mk-skills-registry/core/skills';

const skills = [
  { name: 'mk-init', cmd: 'mk init', desc: 'Initialize an OpenCode project and install helper skills.', intent: ['start new project', 'initialize opencode', 'bootstrap project', 'mk init'] },
  { name: 'mk-create', cmd: 'mk <module> create <name>', desc: 'Create a new skill or agent scaffold.', intent: ['create skill', 'new skill', 'scaffold agent', 'mk create'] },
  { name: 'mk-validate', cmd: 'mk <module> validate [path]', desc: 'Validate skill/agent files against frontmatter and structure rules.', intent: ['validate skills', 'check skill', 'lint skills', 'mk validate'] },
  { name: 'mk-publish', cmd: 'mk <module> publish [path]', desc: 'Publish a skill or agent to the git registry.', intent: ['publish skill', 'upload skill', 'share skill', 'mk publish'] },
  { name: 'mk-install', cmd: 'mk <module> install <name>[@version]', desc: 'Install a skill or agent from the registry.', intent: ['install skill', 'get skill', 'add skill', 'mk install'] },
  { name: 'mk-uninstall', cmd: 'mk <module> uninstall <name>', desc: 'Remove an installed skill or agent.', intent: ['remove skill', 'delete skill', 'uninstall skill', 'mk uninstall'] },
  { name: 'mk-list', cmd: 'mk <module> list', desc: 'List installed skills or agents.', intent: ['list skills', 'show installed', 'what skills', 'mk list'] },
  { name: 'mk-search', cmd: 'mk <module> search <query>', desc: 'Search the registry for skills or agents.', intent: ['find skill', 'search skill', 'lookup skill', 'mk search'] },
  { name: 'mk-info', cmd: 'mk <module> info <name>', desc: 'Show metadata for a skill or agent.', intent: ['skill info', 'details', 'about skill', 'mk info'] },
  { name: 'mk-update', cmd: 'mk <module> update [name]', desc: 'Update installed skills or agents to the latest version.', intent: ['update skills', 'upgrade skills', 'mk update'] },
  { name: 'mk-outdated', cmd: 'mk <module> outdated', desc: 'Report installed skills or agents that have newer versions.', intent: ['outdated skills', 'old skills', 'check updates', 'mk outdated'] },
  { name: 'mk-syncback', cmd: 'mk <module> syncback', desc: 'Publish local skill changes back to the registry.', intent: ['sync changes', 'push updates', 'publish updates', 'mk syncback'] },
  { name: 'mk-registry-init', cmd: 'mk registry-init <git-url>', desc: 'Set up a new git-based skills registry.', intent: ['setup registry', 'create registry', 'init registry', 'mk registry-init'] },
];

for (const s of skills) {
  const dir = path.join(baseDir, s.name);
  fs.mkdirSync(dir, { recursive: true });
  const content = `---
name: ${s.name}
description: ${s.cmd} — ${s.desc}
---

# ${s.name}

## Detected Intent
${s.intent.map(i => '- "' + i + '"').join('\n')}

## Command
\`\`\`bash
${s.cmd}
\`\`\`

## Validation
1. Verify module name is valid (core or unity).
2. Extract name/version from user message when applicable.
3. Run the corresponding mk command.
`;
  fs.writeFileSync(path.join(dir, 'SKILL.md'), content);
}

console.log('Created', skills.length, 'mk-* skills');
