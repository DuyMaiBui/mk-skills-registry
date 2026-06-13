import chalk from 'chalk';
import { fetchIndex } from '../../lib/registry.js';
import type { ModuleName } from '../../types/index.js';

export async function infoCommand(module: ModuleName, name: string, options?: { agent?: boolean }): Promise<void> {
  const type = options?.agent ? 'agents' : 'skills';
  const index = await fetchIndex();
  const versions = index.modules[module][type][name];
  
  if (!versions) {
    console.log(chalk.red(`✗ ${type.slice(0, -1)} "${name}" not found`));
    process.exit(1);
  }
  
  const latestVersion = Object.keys(versions).sort().pop()!;
  
  console.log(chalk.bold(`\n${name}\n`));
  console.log(`  Module:    ${module}`);
  console.log(`  Type:      ${type.slice(0, -1)}`);
  console.log(`  Latest:    ${latestVersion}`);
  console.log(`  Versions:  ${Object.keys(versions).join(', ')}`);
  console.log();
}
