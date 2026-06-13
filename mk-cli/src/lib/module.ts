import type { Lockfile, ModuleName, ModuleMeta } from '../types/index.js';

export const MODULES = ['core', 'unity'] as const;

export function isValidModule(m: string): m is ModuleName {
  return MODULES.includes(m as ModuleName);
}

export const MODULE_META: Record<ModuleName, ModuleMeta> = {
  core: { name: 'core', requires: [] },
  unity: { name: 'unity', requires: ['core'] },
};

export function getMissingDependencies(
  module: ModuleName,
  installedModules: ModuleName[]
): ModuleName[] {
  return MODULE_META[module].requires.filter((r) => !installedModules.includes(r));
}

export function isModuleInstalled(module: ModuleName, lockfile: Lockfile): boolean {
  const m = lockfile.modules[module];
  if (!m) return false;
  return Object.keys(m.skills).length > 0 || Object.keys(m.agents).length > 0;
}
