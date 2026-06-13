import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { validateSkill, validateAgent } from '../../lib/validate-skill.js';
import type { ModuleName } from '../../types/index.js';

export function validateCommand(module: ModuleName, skillPath?: string, options?: { agent?: boolean }): void {
  const baseDir = skillPath 
    ? skillPath 
    : options?.agent
      ? path.join(process.cwd(), '.opencode', 'agents', module)
      : path.join(process.cwd(), '.opencode', 'skills', module);
  
  let hasErrors = false;
  
  if (options?.agent) {
    // Validate agents
    if (!fs.existsSync(baseDir)) {
      console.log(chalk.yellow('No agents found'));
      return;
    }
    
    const agents = fs.readdirSync(baseDir).filter(f => f.endsWith('.md'));
    
    for (const agent of agents) {
      const agentPath = path.join(baseDir, agent);
      const result = validateAgent(agentPath);
      
      if (result.valid) {
        console.log(chalk.green(`✓ ${agent}`));
      } else {
        console.log(chalk.red(`✗ ${agent}`));
        result.errors.forEach(err => console.log(chalk.red(`  - ${err}`)));
        hasErrors = true;
      }
    }
  } else {
    // Validate skills
    if (!fs.existsSync(baseDir)) {
      console.log(chalk.yellow('No skills found'));
      return;
    }
    
    const skills = fs.readdirSync(baseDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
    
    for (const skill of skills) {
      const skillDir = path.join(baseDir, skill);
      const result = validateSkill(skillDir);
      
      if (result.valid) {
        console.log(chalk.green(`✓ ${skill}`));
      } else {
        console.log(chalk.red(`✗ ${skill}`));
        result.errors.forEach(err => console.log(chalk.red(`  - ${err}`)));
        hasErrors = true;
      }
    }
  }
  
  if (hasErrors) {
    process.exit(1);
  }
}
