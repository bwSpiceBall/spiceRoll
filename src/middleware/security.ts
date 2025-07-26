import { Request, Response, NextFunction } from 'express';

/**
 * Security middleware to protect the application from common attacks
 */

// Rate limiting configuration
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // limit each IP to 100 requests per windowMs

// Track request counts for rate limiting
const requestCounts: Record<string, { count: number; resetTime: number }> = {};

// Check if a path matches any WordPress-related patterns
const isWordPressPath = (path: string): boolean => {
  const wpPatterns = [
    /^\/(wp-admin|wp-includes|wp-content|xmlrpc\.php)/i,
    /\.php$/i,
  ];
  
  return wpPatterns.some(pattern => pattern.test(path));
};

// Middleware to block WordPress scanning attempts
export const blockWpScanning = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  
  if (isWordPressPath(path)) {
    // Log the blocked attempt
    console.warn(`Blocked WordPress scanning attempt: ${req.method} ${path} from ${req.ip}`);
    
    // Return a generic 404 to avoid giving information to scanners
    return res.status(404).send('Not Found');
  }
  
  next();
};

// Basic rate limiting middleware
export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  
  // Initialize or reset expired entries
  if (!requestCounts[ip] || requestCounts[ip].resetTime < now) {
    requestCounts[ip] = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    return next();
  }
  
  // Increment count for existing IPs
  requestCounts[ip].count++;
  
  // Check if limit exceeded
  if (requestCounts[ip].count > MAX_REQUESTS) {
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return res.status(429).send('Too Many Requests');
  }
  
  next();
};

// Prevent directory traversal attacks
export const preventPathTraversal = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  
  if (path.includes('..')) {
    console.warn(`Path traversal attempt blocked: ${path} from ${req.ip}`);
    return res.status(403).send('Forbidden');
  }
  
  next();
};

// Middleware to block common environment file probing
export const blockEnvFileProbing = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path.toLowerCase();
  
  if (path.includes('.env') || path.endsWith('/config') || path.includes('credentials')) {
    console.warn(`Blocked sensitive file access attempt: ${path} from ${req.ip}`);
    return res.status(404).send('Not Found');
  }
  
  next();
};
