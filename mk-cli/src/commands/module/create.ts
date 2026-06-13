import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import type { ModuleName } from '../../types/index.js';

export function createCommand(module: ModuleName, name: string, options: { agent?: boolean }): void {
  const baseDir = options.agent 
    ? path.join(process.cwd(), '.opencode', 'agents', module)
    : path.join(process.cwd(), '.opencode', 'skills', module);
  
  if (options.agent) {
    // Create agent file
    const agentPath = path.join(baseDir, `${name}.md`);
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    
    const template = `---
name: ${name}
description: <description>
---

# Agent: ${name}

## Role
<role description>

## Rules
- <rule 1>
- <rule 2>
`;
    
    fs.writeFileSync(agentPath, template);
    console.log(chalk.green(`✓ Created agent: ${agentPath}`));
  } else {
    // Create skill directory
    const skillDir = path.join(baseDir, name);
    if (fs.existsSync(skillDir)) {
      console.log(chalk.red(`✗ Skill "${name}" already exists`));
      process.exit(1);
    }
    
    fs.mkdirSync(skillDir, { recursive: true });
    
    const template = `---
name: ${name}
description: <description>
---

# ${name}

## Use This Skill When
- <context>

## Rules
- <rule 1>
- <rule 2>
`;
    
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), template);
    console.log(chalk.green(`✓ Created skill: ${skillDir}`));
  }
}
