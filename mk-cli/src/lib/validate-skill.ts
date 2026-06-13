import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { SkillFrontmatter } from '../types/index.js';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateSkill(skillPath: string): ValidationResult {
  const errors: string[] = [];
  
  // Check if SKILL.md exists
  const skillMdPath = path.join(skillPath, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) {
    errors.push(`SKILL.md not found at ${skillPath}`);
    return { valid: false, errors };
  }
  
  const content = fs.readFileSync(skillMdPath, 'utf-8');
  
  // Check for YAML frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    errors.push('Missing YAML frontmatter in SKILL.md');
    return { valid: false, errors };
  }
  
  try {
    const frontmatter = yaml.load(frontmatterMatch[1]) as SkillFrontmatter;
    
    if (!frontmatter.name || typeof frontmatter.name !== 'string') {
      errors.push('Frontmatter missing "name" field');
    }
    
    if (!frontmatter.description || typeof frontmatter.description !== 'string') {
      errors.push('Frontmatter missing "description" field');
    }
  } catch (e) {
    errors.push(`Invalid YAML frontmatter: ${(e as Error).message}`);
  }
  
  // Validate skill.json if present
  const skillJsonPath = path.join(skillPath, 'skill.json');
  if (fs.existsSync(skillJsonPath)) {
    try {
      const skillJson = JSON.parse(fs.readFileSync(skillJsonPath, 'utf-8'));
      if (skillJson.dependencies && typeof skillJson.dependencies !== 'object') {
        errors.push('skill.json: "dependencies" must be an object');
      }
    } catch (e) {
      errors.push(`Invalid skill.json: ${(e as Error).message}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateAgent(agentPath: string): ValidationResult {
  const errors: string[] = [];
  
  if (!fs.existsSync(agentPath)) {
    errors.push(`Agent file not found: ${agentPath}`);
    return { valid: false, errors };
  }
  
  const content = fs.readFileSync(agentPath, 'utf-8');
  
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    errors.push('Missing YAML frontmatter in agent file');
    return { valid: false, errors };
  }
  
  try {
    const frontmatter = yaml.load(frontmatterMatch[1]) as SkillFrontmatter;
    
    if (!frontmatter.name || typeof frontmatter.name !== 'string') {
      errors.push('Frontmatter missing "name" field');
    }
    
    if (!frontmatter.description || typeof frontmatter.description !== 'string') {
      errors.push('Frontmatter missing "description" field');
    }
  } catch (e) {
    errors.push(`Invalid YAML frontmatter: ${(e as Error).message}`);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
