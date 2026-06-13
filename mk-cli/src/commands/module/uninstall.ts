import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { removeFromLockfile } from '../../lib/lockfile.js';
import type { ModuleName } from '../../types/index.js';

export function uninstallCommand(module: ModuleName, name: string, options?: { agent?: boolean }): void {
  const type = options?.agent ? 'agents' : 'skills';
  
  if (options?.agent) {
    // Uninstall agent
    const agentPath = path.join(process.cwd(), '.opencode', 'agents', module, `${name}.md`);
    if (!fs.existsSync(agentPath)) {
      console.log(chalk.red(`✗ Agent "${name}" is not installed`));
      process.exit(1);
    }
    
    fs.unlinkSync(agentPath);
    removeFromLockfile(module, type, name);
    console.log(chalk.green(`✓ Uninstalled agent ${name}`));
  } else {
    // Uninstall skill
    const skillDir = path.join(process.cwd(), '.opencode', 'skills', module, name);
    if (!fs.existsSync(skillDir)) {
      console.log(chalk.red(`✗ Skill "${name}" is not installed`));
      process.exit(1);
    }
    
    fs.rmSync(skillDir, { recursive: true });
    removeFromLockfile(module, type, name);
    console.log(chalk.green(`✓ Uninstalled skill ${name}`));
  }
}
