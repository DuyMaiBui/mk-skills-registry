import chalk from 'chalk';
import { fetchIndex } from '../../lib/registry.js';
import type { ModuleName } from '../../types/index.js';

export async function searchCommand(module: ModuleName, query: string, options?: { agent?: boolean }): Promise<void> {
  const type = options?.agent ? 'agents' : 'skills';
  const index = await fetchIndex();
  const items = index.modules[module][type];
  
  const results = Object.entries(items).filter(([name]) => 
    name.toLowerCase().includes(query.toLowerCase())
  );
  
  if (results.length === 0) {
    console.log(chalk.yellow(`No ${type} found matching "${query}"`));
    return;
  }
  
  console.log(chalk.bold(`\nSearch results for "${query}":\n`));
  
  for (const [name, versions] of results) {
    const latestVersion = Object.keys(versions).sort().pop()!;
    console.log(`  ${chalk.cyan(name)}@${chalk.gray(latestVersion)}`);
  }
  
  console.log();
}
