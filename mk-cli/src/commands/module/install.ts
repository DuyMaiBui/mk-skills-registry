import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { fetchSkill } from '../../lib/registry.js';
import { extractTarball } from '../../lib/tarball.js';
import { cacheTarball, isCached, getCachedPath } from '../../lib/cache.js';
import { addToLockfile, getInstalledVersion, readLockfile } from '../../lib/lockfile.js';
import { getMissingDependencies, isModuleInstalled } from '../../lib/module.js';
import type { ModuleName } from '../../types/index.js';

export async function installCommand(module: ModuleName, name: string, options?: { agent?: boolean }): Promise<void> {
  const type = options?.agent ? 'agents' : 'skills';

  // Enforce module-level dependencies
  const lockfile = readLockfile();
  const installedModules = (['core', 'unity'] as ModuleName[]).filter((m) =>
    isModuleInstalled(m, lockfile)
  );
  const missing = getMissingDependencies(module, installedModules);
  if (missing.length > 0) {
    console.log(
      chalk.red(
        `✗ ${module} module requires: ${missing.join(', ')}. Run \`mk init\` or \`mk ${missing[0]} install <skill>\` first.`
      )
    );
    process.exit(1);
  }

  // Parse name@version
  const [skillName, version] = name.split('@');
  const targetVersion = version || 'latest';
  
  // Check if already installed
  const installedVersion = getInstalledVersion(module, type, skillName);
  if (installedVersion) {
    console.log(chalk.yellow(`⚠ ${skillName}@${installedVersion} is already installed`));
    return;
  }
  
  // Fetch from registry
  console.log(chalk.blue(`⬇ Installing ${skillName}...`));
  
  let tarballPath: string;
  
  if (targetVersion === 'latest') {
    // Fetch index to get latest version
    const { fetchIndex } = await import('../../lib/registry.js');
    const index = await fetchIndex();
    const versions = index.modules[module][type][skillName];
    
    if (!versions) {
      console.log(chalk.red(`✗ Skill "${skillName}" not found in registry`));
      process.exit(1);
    }
    
    const latestVersion = Object.keys(versions).sort().pop()!;
    tarballPath = await fetchSkill(module, type, skillName, latestVersion);
    
    // Cache it
    if (!isCached(module, type, skillName, latestVersion)) {
      cacheTarball(module, type, skillName, latestVersion, tarballPath);
    }
    
    // Extract
    const destDir = type === 'agents'
      ? path.join(process.cwd(), '.opencode', 'agents', module)
      : path.join(process.cwd(), '.opencode', 'skills', module, skillName);
    
    if (!fs.existsSync(path.dirname(destDir))) {
      fs.mkdirSync(path.dirname(destDir), { recursive: true });
    }
    
    extractTarball(tarballPath, path.dirname(destDir));
    
    // Update lockfile
    addToLockfile(module, type, skillName, latestVersion);
    
    console.log(chalk.green(`✓ Installed ${skillName}@${latestVersion}`));
  } else {
    tarballPath = await fetchSkill(module, type, skillName, targetVersion);
    
    // Extract
    const destDir = type === 'agents'
      ? path.join(process.cwd(), '.opencode', 'agents', module)
      : path.join(process.cwd(), '.opencode', 'skills', module, skillName);
    
    if (!fs.existsSync(path.dirname(destDir))) {
      fs.mkdirSync(path.dirname(destDir), { recursive: true });
    }
    
    extractTarball(tarballPath, path.dirname(destDir));
    
    // Update lockfile
    addToLockfile(module, type, skillName, targetVersion);
    
    console.log(chalk.green(`✓ Installed ${skillName}@${targetVersion}`));
  }
}
