import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { getConfig, setConfig } from '../lib/config.js';
import { writeLockfile } from '../lib/lockfile.js';
import { MODULES, MODULE_META } from '../lib/module.js';
import type { ModuleName } from '../types/index.js';

export async function initCommand(): Promise<void> {
  console.log(chalk.bold('🚀 Initializing OpenCode project\n'));
  
  // Check if .opencode exists
  const opencodeDir = path.join(process.cwd(), '.opencode');
  if (!fs.existsSync(opencodeDir)) {
    fs.mkdirSync(opencodeDir, { recursive: true });
    console.log(chalk.green('✓ Created .opencode/ directory'));
  }
  
  // Check config
  const config = getConfig();
  if (!config.registry) {
    const { registryUrl } = await inquirer.prompt([{
      type: 'input',
      name: 'registryUrl',
      message: 'Registry git URL (leave empty to skip):',
      default: ''
    }]);
    
    if (registryUrl) {
      setConfig('registry', registryUrl);
      console.log(chalk.green('✓ Saved registry URL'));
    }
  }
  
  // Select modules
  let { selectedModules } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'selectedModules',
    message: 'Which modules to install?',
    choices: [
      { name: 'core', checked: true },
      { name: 'unity', checked: false }
    ]
  }]);

  // Enforce module-level dependencies
  const selectedSet = new Set<string>(selectedModules);
  for (const module of selectedModules as ModuleName[]) {
    for (const required of MODULE_META[module].requires) {
      if (!selectedSet.has(required)) {
        selectedSet.add(required);
        console.log(
          chalk.yellow(
            `⚠ ${module} depends on ${required}; ${required} has been auto-selected.`
          )
        );
      }
    }
  }
  selectedModules = Array.from(selectedSet);

  if (selectedModules.length === 0) {
    console.log(chalk.yellow('No modules selected. Exiting.'));
    return;
  }
  
  // Create initial lockfile
  writeLockfile({
    version: '1.0.0',
    modules: {
      core: { skills: {}, agents: {} },
      unity: { skills: {}, agents: {} }
    }
  });
  
  // Install mk-* skills for each selected module
  console.log(chalk.bold('\n📦 Installing mk-* helper skills...\n'));
  
  for (const module of selectedModules) {
    const mkSkills = [
      'mk-init',
      'mk-create',
      'mk-validate',
      'mk-publish',
      'mk-install',
      'mk-uninstall',
      'mk-list',
      'mk-search',
      'mk-info',
      'mk-update',
      'mk-outdated',
      'mk-syncback',
      'mk-registry-init'
    ];
    
    for (const skillName of mkSkills) {
      // Create skill directory with template
      const skillDir = path.join(opencodeDir, 'skills', module, skillName);
      fs.mkdirSync(skillDir, { recursive: true });
      
      const template = `---
name: ${skillName}
description: ${skillName} — Auto-detects intent and runs the appropriate mk command.
---

# ${skillName}

## Detected Intent
- "<trigger phrases>"

## Command
\`\`\`bash
mk ${module} ${skillName.replace('mk-', '')} <args>
\`\`\`

## Validation
1. Check prerequisites
2. Extract parameters from context
3. Execute command
`;
      
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), template);
    }
    
    console.log(chalk.green(`✓ Installed ${mkSkills.length} mk-* skills for ${module}`));
  }
  
  console.log(chalk.bold('\n✅ Project initialized!'));
  console.log(chalk.gray('\nNext steps:'));
  console.log(chalk.gray('  mk core create <skill-name>'));
  console.log(chalk.gray('  mk core validate'));
  console.log(chalk.gray('  mk core publish\n'));
}
