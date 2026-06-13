import chalk from 'chalk';
import { fetchIndex } from '../../lib/registry.js';
import { readLockfile } from '../../lib/lockfile.js';
import type { ModuleName } from '../../types/index.js';

export async function outdatedCommand(module: ModuleName, options?: { agent?: boolean }): Promise<void> {
  const type = options?.agent ? 'agents' : 'skills';
  const lockfile = readLockfile();
  const installed = lockfile.modules[module][type];
  
  const index = await fetchIndex();
  
  let hasOutdated = false;
  
  console.log(chalk.bold(`\nOutdated ${type} in ${module}:\n`));
  
  for (const [name, currentVersion] of Object.entries(installed)) {
    const versions = index.modules[module][type][name];
    if (!versions) continue;
    
    const latestVersion = Object.keys(versions).sort().pop()!;
    
    if (currentVersion !== latestVersion) {
      console.log(`  ${chalk.yellow(name)}  ${chalk.gray(currentVersion)} → ${chalk.cyan(latestVersion)}`);
      hasOutdated = true;
    }
  }
  
  if (!hasOutdated) {
    console.log(chalk.green('  All up to date ✓'));
  }
  
  console.log();
  
  if (hasOutdated) {
    process.exit(1);
  }
}
