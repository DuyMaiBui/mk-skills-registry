import fs from 'node:fs';
import path from 'node:path';
import { getConfig, getConfigDir } from './config.js';
import type { ModuleName } from '../types/index.js';

export function getCacheDir(): string {
  const config = getConfig();
  return config.cacheDir;
}

export function getCachedPath(
  module: ModuleName,
  type: 'skills' | 'agents',
  name: string,
  version: string
): string {
  const cacheDir = getCacheDir();
  return path.join(cacheDir, 'modules', module, type, name, `${version}.tar.gz`);
}

export function isCached(
  module: ModuleName,
  type: 'skills' | 'agents',
  name: string,
  version: string
): boolean {
  const cachedPath = getCachedPath(module, type, name, version);
  return fs.existsSync(cachedPath);
}

export function cacheTarball(
  module: ModuleName,
  type: 'skills' | 'agents',
  name: string,
  version: string,
  tarballPath: string
): void {
  const destPath = getCachedPath(module, type, name, version);
  
  if (!fs.existsSync(path.dirname(destPath))) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
  }
  
  fs.copyFileSync(tarballPath, destPath);
}

export function ensureCacheDir(): void {
  const cacheDir = getCacheDir();
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
}
