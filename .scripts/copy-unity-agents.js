const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/mike/Documents/Unity/Mike/BugFightingTD/.opencode';
const targetDir = '/var/folders/mc/0sndn6v11yn8bk832x49p8bm0000gn/T/opencode/mk-skills-registry/unity/agents';

const agents = [
  { source: 'agents/unity-runtime-developer.md', target: 'unity-runtime-developer.md' },
  { source: 'agents/unity-editor-developer.md', target: 'unity-editor-developer.md' },
  { source: 'agents/unity-tester.md', target: 'unity-tester.md' },
  { source: 'agents/unity-reviewer.md', target: 'unity-reviewer.md' },
  { source: 'skills/unity-conventions/SKILL.md', target: 'unity-code-conventions.md' },
];

fs.mkdirSync(targetDir, { recursive: true });

for (const a of agents) {
  const src = path.join(sourceDir, a.source);
  const dst = path.join(targetDir, a.target);
  let content = fs.readFileSync(src, 'utf-8');

  // Normalize frontmatter for the skill registry: ensure name + description
  const name = a.target.replace('.md', '');
  const descMatch = content.match(/^description:\s*(.+)$/m);
  const description = descMatch ? descMatch[1].trim() : `${name} agent`;

  if (!content.startsWith('---')) {
    content = `---\nname: ${name}\ndescription: ${description}\n---\n\n${content}`;
  } else {
    const fmEnd = content.indexOf('---', 3);
    const fm = content.slice(0, fmEnd + 3);
    const body = content.slice(fmEnd + 3).trimStart();
    if (!/name:/.test(fm)) {
      content = fm.replace('---', `---\nname: ${name}`) + '\n' + body;
    }
    if (!/description:/.test(fm)) {
      content = content.replace('---', `---\nname: ${name}\ndescription: ${description}`);
      // Reconstruct
      const end = content.indexOf('---', 3);
      const newBody = content.slice(end + 3).trimStart();
      content = `---\nname: ${name}\ndescription: ${description}\n---\n\n${newBody}`;
    }
  }

  fs.writeFileSync(dst, content);
}

console.log('Created', agents.length, 'unity agents');
