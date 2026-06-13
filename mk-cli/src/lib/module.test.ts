import { describe, it, expect } from 'vitest';
import {
  isValidModule,
  getMissingDependencies,
  isModuleInstalled,
} from './module.js';
import type { Lockfile } from '../types/index.js';

describe('module', () => {
  it('validates core module', () => {
    expect(isValidModule('core')).toBe(true);
  });

  it('validates unity module', () => {
    expect(isValidModule('unity')).toBe(true);
  });

  it('rejects invalid module', () => {
    expect(isValidModule('invalid')).toBe(false);
  });

  it('returns no missing dependencies for core', () => {
    expect(getMissingDependencies('core', [])).toEqual([]);
  });

  it('returns no missing dependencies for unity when core is installed', () => {
    expect(getMissingDependencies('unity', ['core'])).toEqual([]);
  });

  it('returns core as missing dependency for unity', () => {
    expect(getMissingDependencies('unity', [])).toEqual(['core']);
  });

  it('detects installed module from skills', () => {
    const lockfile: Lockfile = {
      version: '1.0.0',
      modules: {
        core: { skills: { 'mk-init': '1.0.0' }, agents: {} },
        unity: { skills: {}, agents: {} },
      },
    };
    expect(isModuleInstalled('core', lockfile)).toBe(true);
    expect(isModuleInstalled('unity', lockfile)).toBe(false);
  });

  it('detects installed module from agents', () => {
    const lockfile: Lockfile = {
      version: '1.0.0',
      modules: {
        core: { skills: {}, agents: { 'unity-tester': '1.0.0' } },
        unity: { skills: {}, agents: {} },
      },
    };
    expect(isModuleInstalled('core', lockfile)).toBe(true);
    expect(isModuleInstalled('unity', lockfile)).toBe(false);
  });
});
