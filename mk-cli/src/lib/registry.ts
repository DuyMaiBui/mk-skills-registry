import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { simpleGit } from 'simple-git';
import { getConfig } from './config.js';
import type { ModuleName, RegistryIndex, SkillType } from '../types/index.js';

const TEMP_DIR = path.join(os.tmpdir(), 'mk-cli-registry');

export async function initRegistry(gitUrl: string): Promise<void> {
  const git = simpleGit();
  
  // Clone the repo or init new one
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }
  
  try {
    await git.clone(gitUrl, TEMP_DIR);
  } catch {
    // If clone fails, init a new repo
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    await simpleGit(TEMP_DIR).init();
  }
  
  // Create directory structure
  const dirs = [
    'core/skills',
    'core/agents',
    'unity/skills',
    'unity/agents'
  ];
  
  for (const dir of dirs) {
    const fullPath = path.join(TEMP_DIR, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  }
  
  // Create initial index.json
  const index: RegistryIndex = {
    version: '1.0.0',
    modules: {
      core: { skills: {}, agents: {} },
      unity: { skills: {}, agents: {} }
    }
  };
  
  fs.writeFileSync(
    path.join(TEMP_DIR, 'index.json'),
    JSON.stringify(index, null, 2)
  );
  
  // Commit and push
  const repoGit = simpleGit(TEMP_DIR);
  await repoGit.add('.');
  await repoGit.commit('Initialize registry');
  await repoGit.push('origin', 'main').catch(() => repoGit.push('origin', 'master'));
  
  // Update config
  const { setConfig } = await import('./config.js');
  setConfig('registry', gitUrl);
  
  console.log(`✓ Registry initialized at ${gitUrl}`);
}

export async function fetchIndex(): Promise<RegistryIndex> {
  const config = getConfig();
  if (!config.registry) {
    throw new Error('No registry configured. Run: mk registry-init <git-url>');
  }
  
  // Pull latest index
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    await simpleGit().clone(config.registry, TEMP_DIR);
  } else {
    await simpleGit(TEMP_DIR).pull('origin', 'main')
      .catch(() => simpleGit(TEMP_DIR).pull('origin', 'master'));
  }
  
  const indexPath = path.join(TEMP_DIR, 'index.json');
  const content = fs.readFileSync(indexPath, 'utf-8');
  return JSON.parse(content) as RegistryIndex;
}

export async function publishSkill(
  module: ModuleName,
  type: SkillType,
  name: string,
  version: string,
  tarballPath: string
): Promise<void> {
  const config = getConfig();
  if (!config.registry) {
    throw new Error('No registry configured');
  }
  
  // Ensure registry is up to date
  await fetchIndex();
  
  // Copy tarball to registry
  const destDir = path.join(TEMP_DIR, module, type, name);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const destPath = path.join(destDir, `${version}.tar.gz`);
  fs.copyFileSync(tarballPath, destPath);
  
  // Update index.json
  const indexPath = path.join(TEMP_DIR, 'index.json');
  const index: RegistryIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  
  if (!index.modules[module][type][name]) {
    index.modules[module][type][name] = {};
  }
  index.modules[module][type][name][version] = `${module}/${type}/${name}/${version}.tar.gz`;
  
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  
  // Commit and push
  const repoGit = simpleGit(TEMP_DIR);
  await repoGit.pull('origin', 'main').catch(() => repoGit.pull('origin', 'master'));
  await repoGit.add('.');
  await repoGit.commit(`publish: ${module}/${type}/${name}@${version}`);
  await repoGit.push('origin', 'main').catch(() => repoGit.push('origin', 'master'));
  
  console.log(`✓ Published ${module}/${type}/${name}@${version}`);
}

export async function fetchSkill(
  module: ModuleName,
  type: SkillType,
  name: string,
  version: string
): Promise<string> {
  const config = getConfig();
  if (!config.registry) {
    throw new Error('No registry configured');
  }
  
  await fetchIndex();
  
  const tarballPath = path.join(TEMP_DIR, module, type, name, `${version}.tar.gz`);
  if (!fs.existsSync(tarballPath)) {
    throw new Error(`Skill ${name}@${version} not found in registry`);
  }
  
  return tarballPath;
}
