import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';

import { getDatabase, updateSection, PortfolioDatabase } from './storage';
import { generateToken, verifyCredentials, requireAuth } from './auth';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Static uploads directory
const uploadsDir = path.join(__dirname, '..', 'public', 'assets', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/assets/uploads', express.static(uploadsDir));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e4)}`;
    cb(null, `${baseName}_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (_req, file, cb) => {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${ext}. Allowed: images (.png, .jpg, .webp, .svg) and documents (.pdf).`));
    }
  }
});

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Rohit Desai Portfolio API', timestamp: new Date().toISOString() });
});

// Public: Get all content
app.get('/api/content', (_req: Request, res: Response) => {
  try {
    const data = getDatabase();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to read content database', details: err.message });
  }
});

// Public: Auth Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }

  const isValid = verifyCredentials(username, password);
  if (!isValid) {
    res.status(401).json({ error: 'Invalid administrator credentials' });
    return;
  }

  const token = generateToken(username);
  res.json({
    success: true,
    token,
    user: { username, role: 'admin' }
  });
});

// Protected: Verify session token
app.get('/api/auth/verify', requireAuth, (req: Request, res: Response) => {
  res.json({ valid: true, user: (req as any).user });
});

// Protected: Change administrator password
app.post('/api/auth/change-password', requireAuth, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'Current password and new password are required' });
    return;
  }

  // Reload env
  dotenv.config({ override: true });
  const currentUser = (req as any).user?.username || process.env.ADMIN_USERNAME || 'rohit';
  const isValid = verifyCredentials(currentUser, currentPassword);
  if (!isValid) {
    res.status(401).json({ error: 'Current password is incorrect' });
    return;
  }

  if (typeof newPassword !== 'string' || newPassword.trim().length < 4) {
    res.status(400).json({ error: 'New password must be at least 4 characters long' });
    return;
  }

  try {
    const envPath = path.join(__dirname, '..', '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    const trimmedPassword = newPassword.trim();
    if (/ADMIN_PASSWORD=.*/.test(envContent)) {
      envContent = envContent.replace(/ADMIN_PASSWORD=.*/, `ADMIN_PASSWORD=${trimmedPassword}`);
    } else {
      envContent += `\nADMIN_PASSWORD=${trimmedPassword}\n`;
    }

    fs.writeFileSync(envPath, envContent, 'utf8');
    process.env.ADMIN_PASSWORD = trimmedPassword;
    dotenv.config({ override: true });

    res.json({ success: true, message: 'Password updated successfully! You can now use your new password.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to write updated password to .env', details: err.message });
  }
});

// Protected: Update section
app.put('/api/content/:section', requireAuth, (req: Request, res: Response) => {
  const section = req.params.section as keyof PortfolioDatabase;
  const allowedSections: (keyof PortfolioDatabase)[] = [
    'personal',
    'siteConfig',
    'projects',
    'skills',
    'education',
    'certifications',
    'achievements',
    'navigation'
  ];

  if (!allowedSections.includes(section)) {
    res.status(400).json({ error: `Invalid section name: ${section}` });
    return;
  }

  try {
    const updatedDb = updateSection(section, req.body);
    res.json({
      success: true,
      section,
      updatedAt: new Date().toISOString(),
      data: updatedDb[section]
    });
  } catch (err: any) {
    res.status(500).json({ error: `Failed to update section ${section}`, details: err.message });
  }
});

// Protected: Upload file (images / PDFs)
app.post('/api/upload', requireAuth, upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const webPath = `/assets/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: webPath,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

// Protected: Batch upload multiple files (up to 15 files at once)
app.post('/api/upload-multiple', requireAuth, upload.array('files', 15), (req: Request, res: Response) => {
  const files = (req.files as Express.Multer.File[]) || [];
  if (files.length === 0) {
    res.status(400).json({ error: 'No files uploaded' });
    return;
  }

  const results = files.map((file) => ({
    url: `/assets/uploads/${file.filename}`,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
  }));

  res.json({
    success: true,
    files: results,
    urls: results.map((r) => r.url),
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio Admin Backend listening on http://localhost:${PORT}`);
});
