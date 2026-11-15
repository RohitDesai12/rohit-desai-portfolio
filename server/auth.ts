import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

// Ensure JWT secret is securely loaded from environment, or generate a transient runtime secret
const getJwtSecret = (): string => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  // Transient in-memory secret: never hardcoded, changes each server boot if .env is missing
  if (!(global as any).__transient_jwt_secret) {
    (global as any).__transient_jwt_secret = crypto.randomBytes(64).toString('hex');
    console.warn('⚠️ [SECURITY WARNING] JWT_SECRET is not defined in .env. A secure random runtime secret has been generated.');
  }
  return (global as any).__transient_jwt_secret;
};

export interface AuthPayload {
  username: string;
  role: string;
}

export function generateToken(username: string): string {
  return jwt.sign({ username, role: 'admin' }, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyCredentials(username: string, password: string): boolean {
  const envUsername = process.env.ADMIN_USERNAME;
  const envPassword = process.env.ADMIN_PASSWORD;

  // Refuse authentication if environment variables are not configured
  if (!envUsername || !envPassword) {
    console.error('⚠️ [SECURITY ERROR] ADMIN_USERNAME or ADMIN_PASSWORD is not set in environment variables (.env). Authentication blocked.');
    return false;
  }

  // Strict constant-time-safe username verification
  if (username !== envUsername) {
    return false;
  }

  // If password stored in env is a bcrypt hash ($2a$ / $2b$)
  if (envPassword.startsWith('$2a$') || envPassword.startsWith('$2b$')) {
    return bcrypt.compareSync(password, envPassword);
  }

  // Constant-time string comparison to prevent timing attacks
  const passBuf = Buffer.from(password);
  const envBuf = Buffer.from(envPassword);
  if (passBuf.length !== envBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(passBuf, envBuf);
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized. Authentication token required.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AuthPayload;
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session token.' });
  }
}
