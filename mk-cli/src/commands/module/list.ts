import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { readLockfile } from '../../lib/lockfile.js';
import type { ModuleName } from '../../types/index.js';

export function listCommand(module: ModuleName, options?: { agent?: boolean }): void {
  const type = options?.agent ? 'agents' : 'skills';
  const lockfile = readLockfile();
  const installed = lockfile.modules[module][type];
  
  const entries = Object.entries(installed);
  
  if (entries.length === 0) {
    console.log(chalk.yellow(`No ${type} installed in ${module}`));
    return;
  }
  
  console.log(chalk.bold(`\nInstalled ${type} in ${module}:\n`));
  
  for (const [name, version] of entries) {
    console.log(`  ${chalk.cyan(name)}@${chalk.gray(version)}`);
  }
  
  console.log();
}
