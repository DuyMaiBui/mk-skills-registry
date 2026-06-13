import chalk from 'chalk';
import { fetchIndex } from '../../lib/registry.js';
import { getInstalledVersion } from '../../lib/lockfile.js';
import { installCommand } from './install.js';
import type { ModuleName } from '../../types/index.js';

export async function updateCommand(module: ModuleName, name?: string, options?: { agent?: boolean }): Promise<void> {
  const type = options?.agent ? 'agents' : 'skills';
  
  if (name) {
    // Update specific skill
    const installedVersion = getInstalledVersion(module, type, name);
    if (!installedVersion) {
      console.log(chalk.red(`✗ ${name} is not installed`));
      process.exit(1);
    }
    
    const index = await fetchIndex();
    const versions = index.modules[module][type][name];
    const latestVersion = Object.keys(versions).sort().pop()!;
    
    if (installedVersion === latestVersion) {
      console.log(chalk.green(`✓ ${name} is already up to date (${installedVersion})`));
      return;
    }
    
    await installCommand(module, `${name}@${latestVersion}`, options);
  } else {
    // Update all
    const { readLockfile } = await import('../../lib/lockfile.js');
    const lockfile = readLockfile();
    const installed = lockfile.modules[module][type];
    
    const index = await fetchIndex();
    
    for (const [skillName, currentVersion] of Object.entries(installed)) {
      const versions = index.modules[module][type][skillName];
      if (!versions) continue;
      
      const latestVersion = Object.keys(versions).sort().pop()!;
      
      if (currentVersion !== latestVersion) {
        await installCommand(module, `${skillName}@${latestVersion}`, options);
      }
    }
  }
}
