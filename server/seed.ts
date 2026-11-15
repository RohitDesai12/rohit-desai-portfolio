import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { personalData } from '../src/data/personal';
import { siteConfig } from '../src/data/siteConfig';
import { projectsData } from '../src/data/projects';
import { skillsData } from '../src/data/skills';
import { educationData } from '../src/data/education';
import { certificationsData } from '../src/data/certifications';
import { achievementsData } from '../src/data/achievements';
import { navItems } from '../src/data/navigation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'data', 'portfolio-db.json');

const initialDatabase = {
  personal: personalData,
  siteConfig: siteConfig,
  projects: projectsData,
  skills: skillsData,
  education: educationData,
  certifications: certificationsData,
  achievements: achievementsData,
  navigation: navItems,
};

fs.mkdirSync(path.dirname(dbPath), { recursive: true });
fs.writeFileSync(dbPath, JSON.stringify(initialDatabase, null, 2), 'utf-8');

console.log('Successfully seeded database at:', dbPath);
