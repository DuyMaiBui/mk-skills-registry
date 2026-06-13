import fs from 'node:fs';
import path from 'node:path';
import type { Lockfile, ModuleName, ModuleLock } from '../types/index.js';

const LOCKFILE_PATH = path.join(process.cwd(), '.opencode', 'skill-lock.json');

export function readLockfile(): Lockfile {
  if (!fs.existsSync(LOCKFILE_PATH)) {
    return {
      version: '1.0.0',
      modules: {
        core: { skills: {}, agents: {} },
        unity: { skills: {}, agents: {} }
      }
    };
  }
  const content = fs.readFileSync(LOCKFILE_PATH, 'utf-8');
  return JSON.parse(content) as Lockfile;
}

export function writeLockfile(lockfile: Lockfile): void {
  const dir = path.dirname(LOCKFILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(LOCKFILE_PATH, JSON.stringify(lockfile, null, 2));
}

export function addToLockfile(
  module: ModuleName,
  type: 'skills' | 'agents',
  name: string,
  version: string
): void {
  const lockfile = readLockfile();
  lockfile.modules[module][type][name] = version;
  writeLockfile(lockfile);
}

export function removeFromLockfile(
  module: ModuleName,
  type: 'skills' | 'agents',
  name: string
): void {
  const lockfile = readLockfile();
  delete lockfile.modules[module][type][name];
  writeLockfile(lockfile);
}

export function getInstalledVersion(
  module: ModuleName,
  type: 'skills' | 'agents',
  name: string
): string | undefined {
  const lockfile = readLockfile();
  return lockfile.modules[module][type][name];
}
