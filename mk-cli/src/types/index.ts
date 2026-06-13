export interface SkillManifest {
  name: string;
  version: string;
  description?: string;
  author?: string;
  keywords?: string[];
  dependencies?: Record<string, string>;
  files?: string[];
}

export interface SkillFrontmatter {
  name: string;
  description: string;
}

export interface RegistryIndex {
  version: string;
  modules: Record<ModuleName, ModuleIndex>;
}

export interface ModuleIndex {
  skills: Record<SkillName, SkillVersions>;
  agents: Record<AgentName, SkillVersions>;
}

export type ModuleName = 'core' | 'unity';
export type SkillName = string;
export type AgentName = string;
export type SkillVersions = Record<string, string>; // version -> tarball path

export interface Lockfile {
  version: string;
  modules: Record<ModuleName, ModuleLock>;
}

export interface ModuleLock {
  skills: Record<SkillName, string>; // name -> version
  agents: Record<AgentName, string>;
}

export type SkillType = 'skills' | 'agents';

export interface ModuleMeta {
  name: ModuleName;
  requires: ModuleName[];
}
