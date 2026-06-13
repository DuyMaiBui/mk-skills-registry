import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function createTarball(sourceDir: string, outputPath: string): void {
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  
  const parentDir = path.dirname(sourceDir);
  const dirName = path.basename(sourceDir);
  
  execSync(`tar -czf "${outputPath}" -C "${parentDir}" "${dirName}"`, {
    stdio: 'ignore'
  });
}

export function extractTarball(tarballPath: string, outputDir: string): void {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  execSync(`tar -xzf "${tarballPath}" -C "${outputDir}"`, {
    stdio: 'ignore'
  });
}
