#!/usr/bin/env node

import { Command } from 'commander';
import { createCommand } from './commands/module/create.js';
import { validateCommand } from './commands/module/validate.js';
import { publishCommand } from './commands/module/publish.js';
import { installCommand } from './commands/module/install.js';
import { uninstallCommand } from './commands/module/uninstall.js';
import { listCommand } from './commands/module/list.js';
import { searchCommand } from './commands/module/search.js';
import { infoCommand } from './commands/module/info.js';
import { updateCommand } from './commands/module/update.js';
import { outdatedCommand } from './commands/module/outdated.js';
import { syncbackCommand } from './commands/module/syncback.js';
import { initCommand } from './commands/init.js';
import { registryInitCommand } from './commands/registry-init.js';

const program = new Command();

program
  .name('mk')
  .description('CLI for managing OpenCode skills')
  .version('1.0.0');

// Global commands
program
  .command('init')
  .description('Bootstrap project and install mk-* helper skills')
  .action(initCommand);

program
  .command('registry-init <git-url>')
  .description('Create a new team registry git repository')
  .action(registryInitCommand);

// Module: core
const coreCmd = program
  .command('core')
  .description('Manage core skills and agents');

coreCmd
  .command('create <name>')
  .description('Create a new core skill')
  .option('--agent', 'Create an agent instead of a skill')
  .action((name, options) => createCommand('core', name, options));

coreCmd
  .command('validate [path]')
  .description('Validate core skills')
  .option('--agent', 'Validate agents instead of skills')
  .action((path, options) => validateCommand('core', path, options));

coreCmd
  .command('publish [path]')
  .description('Publish a core skill to the registry')
  .option('--agent', 'Publish an agent instead of a skill')
  .action((path, options) => publishCommand('core', path, options));

coreCmd
  .command('install <name>')
  .description('Install a core skill from the registry')
  .option('--agent', 'Install an agent instead of a skill')
  .action((name, options) => installCommand('core', name, options));

coreCmd
  .command('uninstall <name>')
  .description('Uninstall a core skill')
  .option('--agent', 'Uninstall an agent instead of a skill')
  .action((name, options) => uninstallCommand('core', name, options));

coreCmd
  .command('list')
  .description('List installed core skills')
  .option('--agent', 'List agents instead of skills')
  .action((options) => listCommand('core', options));

coreCmd
  .command('search <query>')
  .description('Search core skills in the registry')
  .option('--agent', 'Search agents instead of skills')
  .action((query, options) => searchCommand('core', query, options));

coreCmd
  .command('info <name>')
  .description('Show info about a core skill')
  .option('--agent', 'Show info about an agent instead')
  .action((name, options) => infoCommand('core', name, options));

coreCmd
  .command('update [name]')
  .description('Update core skills to latest version')
  .option('--agent', 'Update agents instead of skills')
  .action((name, options) => updateCommand('core', name, options));

coreCmd
  .command('outdated')
  .description('Check for outdated core skills')
  .option('--agent', 'Check for outdated agents instead')
  .action((options) => outdatedCommand('core', options));

coreCmd
  .command('syncback')
  .description('Sync local core changes back to the registry')
  .option('--agent', 'Sync agents instead of skills')
  .action((options) => syncbackCommand('core', options));

// Module: unity
const unityCmd = program
  .command('unity')
  .description('Manage unity skills and agents');

unityCmd
  .command('create <name>')
  .description('Create a new unity skill')
  .option('--agent', 'Create an agent instead of a skill')
  .action((name, options) => createCommand('unity', name, options));

unityCmd
  .command('validate [path]')
  .description('Validate unity skills')
  .option('--agent', 'Validate agents instead of skills')
  .action((path, options) => validateCommand('unity', path, options));

unityCmd
  .command('publish [path]')
  .description('Publish a unity skill to the registry')
  .option('--agent', 'Publish an agent instead of a skill')
  .action((path, options) => publishCommand('unity', path, options));

unityCmd
  .command('install <name>')
  .description('Install a unity skill from the registry')
  .option('--agent', 'Install an agent instead of a skill')
  .action((name, options) => installCommand('unity', name, options));

unityCmd
  .command('uninstall <name>')
  .description('Uninstall a unity skill')
  .option('--agent', 'Uninstall an agent instead of a skill')
  .action((name, options) => uninstallCommand('unity', name, options));

unityCmd
  .command('list')
  .description('List installed unity skills')
  .option('--agent', 'List agents instead of skills')
  .action((options) => listCommand('unity', options));

unityCmd
  .command('search <query>')
  .description('Search unity skills in the registry')
  .option('--agent', 'Search agents instead of skills')
  .action((query, options) => searchCommand('unity', query, options));

unityCmd
  .command('info <name>')
  .description('Show info about a unity skill')
  .option('--agent', 'Show info about an agent instead')
  .action((name, options) => infoCommand('unity', name, options));

unityCmd
  .command('update [name]')
  .description('Update unity skills to latest version')
  .option('--agent', 'Update agents instead of skills')
  .action((name, options) => updateCommand('unity', name, options));

unityCmd
  .command('outdated')
  .description('Check for outdated unity skills')
  .option('--agent', 'Check for outdated agents instead')
  .action((options) => outdatedCommand('unity', options));

unityCmd
  .command('syncback')
  .description('Sync local unity changes back to the registry')
  .option('--agent', 'Sync agents instead of skills')
  .action((options) => syncbackCommand('unity', options));

program.parse();
