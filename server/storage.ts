import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'portfolio-db.json');

export interface PortfolioDatabase {
  personal: any;
  siteConfig: any;
  projects: any[];
  skills: any[];
  education: any[];
  certifications: any[];
  achievements: any[];
  navigation: any[];
}

export function getDatabase(): PortfolioDatabase {
  if (!fs.existsSync(dbPath)) {
    throw new Error('Database file does not exist. Run seeder first.');
  }
  const raw = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(raw);
}

export function saveDatabase(data: PortfolioDatabase): void {
  // Atomic write via temp file
  const tempPath = `${dbPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, dbPath);
}

export function updateSection(sectionName: keyof PortfolioDatabase, sectionData: any): PortfolioDatabase {
  const currentDb = getDatabase();
  currentDb[sectionName] = sectionData;
  saveDatabase(currentDb);
  return currentDb;
}
