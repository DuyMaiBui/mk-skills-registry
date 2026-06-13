import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import chalk from 'chalk';
import { validateSkill, validateAgent } from '../../lib/validate-skill.js';
import { createTarball } from '../../lib/tarball.js';
import { publishSkill as publishToRegistry } from '../../lib/registry.js';
import type { ModuleName } from '../../types/index.js';

export async function publishCommand(module: ModuleName, skillPath?: string, options?: { agent?: boolean }): Promise<void> {
  const baseDir = skillPath 
    ? skillPath 
    : options?.agent
      ? path.join(process.cwd(), '.opencode', 'agents', module)
      : path.join(process.cwd(), '.opencode', 'skills', module);
  
  if (options?.agent) {
    // Publish agent
    const agentName = path.basename(baseDir, '.md');
    const result = validateAgent(baseDir);
    
    if (!result.valid) {
      console.log(chalk.red('✗ Validation failed:'));
      result.errors.forEach(err => console.log(chalk.red(`  - ${err}`)));
      process.exit(1);
    }
    
    // Create temp tarball
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mk-publish-'));
    const tarballPath = path.join(tempDir, `${agentName}.tar.gz`);
    
    // For agents, create a temp dir with the agent file
    const agentTempDir = path.join(tempDir, 'agent');
    fs.mkdirSync(agentTempDir);
    fs.copyFileSync(baseDir, path.join(agentTempDir, `${agentName}.md`));
    
    createTarball(agentTempDir, tarballPath);
    
    // Get version from skill.json or prompt
    let version = '1.0.0';
    const skillJsonPath = path.join(path.dirname(baseDir), 'skill.json');
    if (fs.existsSync(skillJsonPath)) {
      const skillJson = JSON.parse(fs.readFileSync(skillJsonPath, 'utf-8'));
      version = skillJson.version || '1.0.0';
    }
    
    await publishToRegistry(module, 'agents', agentName, version, tarballPath);
    
    // Cleanup
    fs.rmSync(tempDir, { recursive: true });
  } else {
    // Publish skill
    const skillName = path.basename(baseDir);
    const result = validateSkill(baseDir);
    
    if (!result.valid) {
      console.log(chalk.red('✗ Validation failed:'));
      result.errors.forEach(err => console.log(chalk.red(`  - ${err}`)));
      process.exit(1);
    }
    
    // Create tarball
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mk-publish-'));
    const tarballPath = path.join(tempDir, `${skillName}.tar.gz`);
    createTarball(baseDir, tarballPath);
    
    // Get version
    let version = '1.0.0';
    const skillJsonPath = path.join(baseDir, 'skill.json');
    if (fs.existsSync(skillJsonPath)) {
      const skillJson = JSON.parse(fs.readFileSync(skillJsonPath, 'utf-8'));
      version = skillJson.version || '1.0.0';
    }
    
    await publishToRegistry(module, 'skills', skillName, version, tarballPath);
    
    // Cleanup
    fs.rmSync(tempDir, { recursive: true });
  }
}
