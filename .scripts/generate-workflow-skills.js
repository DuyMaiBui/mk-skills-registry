const fs = require('fs');
const path = require('path');
const baseDir = '/var/folders/mc/0sndn6v11yn8bk832x49p8bm0000gn/T/opencode/mk-skills-registry/core/skills';

const skills = [
  {
    name: 'cook',
    desc: 'Implement features end-to-end: plan, code, test, review.',
    when: ['implement a feature', 'build functionality', 'cook a feature', 'end-to-end implementation'],
    rules: ['Always activate before implementing any feature, plan, or fix.', 'Follow the approved canonical plan.', 'Verify with tests and review before completion.']
  },
  {
    name: 'debug',
    desc: 'Investigate and diagnose errors with root cause analysis before fixes.',
    when: ['debug this', 'find the bug', 'root cause analysis', 'investigate failure'],
    rules: ['Analyze root cause before proposing fixes.', 'Use systematic elimination.', 'Report findings with evidence.']
  },
  {
    name: 'fix',
    desc: 'Fix bugs, errors, test failures, and code problems safely.',
    when: ['fix this bug', 'resolve error', 'repair failure', 'fix test'],
    rules: ['Activate before fixing any bug.', 'Make minimal safe changes.', 'Verify the fix resolves the issue.']
  },
  {
    name: 'test',
    desc: 'Run unit, integration, e2e, and UI tests and analyze coverage.',
    when: ['run tests', 'check coverage', 'write tests', 'test this'],
    rules: ['Run relevant test suites.', 'Analyze failures carefully.', 'Report pass/fail with evidence.']
  },
  {
    name: 'review',
    desc: 'Review code quality, security, and correctness with rigor.',
    when: ['review my code', 'code review', 'check this PR', 'audit this'],
    rules: ['Prioritize correctness and risk over style.', 'Cite evidence for findings.', 'Distinguish blockers from nits.']
  },
  {
    name: 'scout',
    desc: 'Explore codebases to find where features are implemented or used.',
    when: ['find where this is implemented', 'how is this used', 'show all calls to', 'explore codebase'],
    rules: ['Use targeted searches first.', 'Map relationships across files.', 'Summarize findings concisely.']
  },
  {
    name: 'research',
    desc: 'Research technical solutions, architectures, and best practices.',
    when: ['research this', 'evaluate options', 'best practice for', 'architecture review'],
    rules: ['Gather multiple sources.', 'Compare tradeoffs.', 'Cite sources and recommendations.']
  },
  {
    name: 'plan',
    desc: 'Create phased implementation plans with clear scope and acceptance criteria.',
    when: ['plan this feature', 'how should we build this', 'create implementation plan', 'break this down'],
    rules: ['Start from approved scope.', 'Define acceptance criteria.', 'Keep plans executable.']
  },
  {
    name: 'brainstorm',
    desc: 'Explore ideas, options, and tradeoffs before committing to a direction.',
    when: ['brainstorm', 'explore options', 'what are the options', 'help me think through'],
    rules: ['Generate diverse options.', 'Compare tradeoffs honestly.', 'Capture decisions explicitly.']
  },
  {
    name: 'team',
    desc: 'Orchestrate parallel agent teams for large or multi-track work.',
    when: ['spawn agents', 'parallel work', 'multi-agent task', 'delegate to team'],
    rules: ['Decompose work into independent tracks.', 'Assign specialist agents.', 'Aggregate results clearly.']
  },
  {
    name: 'handoff',
    desc: 'Save and resume session context for continuity across sessions or developers.',
    when: ['save session', 'hand off', 'resume context', 'where did I leave off'],
    rules: ['Capture current task status.', 'Record blockers and next steps.', 'Store in standard handoff format.']
  },
  {
    name: 'watzup',
    desc: 'Summarize session progress, git history, and task status.',
    when: ['what did we do today', 'session summary', 'progress report', 'watzup'],
    rules: ['Review git history.', 'Summarize task progress.', 'Highlight blockers and next actions.']
  },
  {
    name: 'docs',
    desc: 'Analyze codebases and create or update project documentation.',
    when: ['update docs', 'write documentation', 'summarize codebase', 'docs are out of date'],
    rules: ['Keep docs close to code.', 'Use the project docs structure.', 'Verify accuracy against code.']
  },
  {
    name: 'git',
    desc: 'Run Git workflows safely with conventional commits and PR automation.',
    when: ['commit this', 'create PR', 'merge branch', 'git workflow'],
    rules: ['Use conventional commits.', 'Inspect diffs before committing.', 'Scan for secrets.']
  },
];

for (const s of skills) {
  const dir = path.join(baseDir, s.name);
  fs.mkdirSync(dir, { recursive: true });
  const yamlDesc = s.desc.includes(':') || s.desc.includes('#') ? `"${s.desc}"` : s.desc;
  const content = `---
name: ${s.name}
description: ${yamlDesc}
---

# ${s.name}

## Use This Skill When
${s.when.map(w => '- ' + w).join('\n')}

## Rules
${s.rules.map(r => '- ' + r).join('\n')}
`;
  fs.writeFileSync(path.join(dir, 'SKILL.md'), content);
}

console.log('Created', skills.length, 'workflow skills');
