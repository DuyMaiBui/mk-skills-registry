import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

export interface Config {
  registry?: string;
  cacheDir: string;
}

const CONFIG_DIR = path.join(os.homedir(), '.opencode');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export function getConfig(): Config {
  if (!fs.existsSync(CONFIG_FILE)) {
    return { cacheDir: path.join(CONFIG_DIR, 'cache') };
  }
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  return JSON.parse(content) as Config;
}

export function setConfig(key: keyof Config, value: string): void {
  const config = getConfig();
  (config as unknown as Record<string, string>)[key] = value;
  
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

export function getConfigDir(): string {
  return CONFIG_DIR;
}
