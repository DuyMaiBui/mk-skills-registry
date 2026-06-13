import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { validateSkill } from '../../lib/validate-skill.js';
import { createTarball } from '../../lib/tarball.js';
import { publishSkill as publishToRegistry } from '../../lib/registry.js';
import { readLockfile } from '../../lib/lockfile.js';
import type { ModuleName } from '../../types/index.js';

export async function syncbackCommand(module: ModuleName, options?: { agent?: boolean }): Promise<void> {
  const type = options?.agent ? 'agents' : 'skills';
  const lockfile = readLockfile();
  const installed = lockfile.modules[module][type];
  
  for (const [name, version] of Object.entries(installed)) {
    if (options?.agent) {
      // Check agent
      const agentPath = path.join(process.cwd(), '.opencode', 'agents', module, `${name}.md`);
      // Simple syncback for agents - just re-publish
      console.log(chalk.blue(`Syncing ${name}...`));
      
      // Create temp tarball
      const tempDir = fs.mkdtempSync(path.join('/tmp', 'mk-syncback-'));
      const tarballPath = path.join(tempDir, `${name}.tar.gz`);
      
      const agentTempDir = path.join(tempDir, 'agent');
      fs.mkdirSync(agentTempDir);
      fs.copyFileSync(agentPath, path.join(agentTempDir, `${name}.md`));
      
      createTarball(agentTempDir, tarballPath);
      
      // Bump version
      const [major, minor, patch] = version.split('.').map(Number);
      const newVersion = `${major}.${minor}.${patch + 1}`;
      
      await publishToRegistry(module, 'agents', name, newVersion, tarballPath);
      
      fs.rmSync(tempDir, { recursive: true });
    } else {
      // Check skill
      const skillDir = path.join(process.cwd(), '.opencode', 'skills', module, name);
      
      console.log(chalk.blue(`Syncing ${name}...`));
      
      const result = validateSkill(skillDir);
      if (!result.valid) {
        console.log(chalk.red(`✗ Validation failed for ${name}:`));
        result.errors.forEach(err => console.log(chalk.red(`  - ${err}`)));
        continue;
      }
      
      // Create tarball
      const tempDir = fs.mkdtempSync(path.join('/tmp', 'mk-syncback-'));
      const tarballPath = path.join(tempDir, `${name}.tar.gz`);
      createTarball(skillDir, tarballPath);
      
      // Bump version
      const [major, minor, patch] = version.split('.').map(Number);
      const newVersion = `${major}.${minor}.${patch + 1}`;
      
      await publishToRegistry(module, 'skills', name, newVersion, tarballPath);
      
      fs.rmSync(tempDir, { recursive: true });
    }
  }
  
  console.log(chalk.green('✓ Syncback complete'));
}
