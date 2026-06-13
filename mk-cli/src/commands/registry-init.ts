import chalk from 'chalk';
import { initRegistry } from '../lib/registry.js';

export async function registryInitCommand(gitUrl: string): Promise<void> {
  console.log(chalk.bold(`Initializing registry at ${gitUrl}...\n`));
  
  try {
    await initRegistry(gitUrl);
    console.log(chalk.green('\n✓ Registry initialized successfully'));
    console.log(chalk.gray('\nTeam members can now use:'));
    console.log(chalk.gray('  mk init'));
  } catch (error) {
    console.log(chalk.red(`\n✗ Failed to initialize registry: ${(error as Error).message}`));
    process.exit(1);
  }
}
