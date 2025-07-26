import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Import security middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware configuration
// Rate limiting configuration
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // limit each IP to 100 requests per windowMs

// Track request counts for rate limiting
const requestCounts = {};

// Check if a path matches any WordPress-related patterns
const isWordPressPath = (path) => {
  const wpPatterns = [
    /^\/(wp-admin|wp-includes|wp-content|xmlrpc\.php)/i,
    /\.php$/i,
  ];
  
  return wpPatterns.some(pattern => pattern.test(path));
};

// Middleware to block WordPress scanning attempts
const blockWpScanning = (req, res, next) => {
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
const rateLimit = (req, res, next) => {
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
const preventPathTraversal = (req, res, next) => {
  const path = req.path;
  
  if (path.includes('..')) {
    console.warn(`Path traversal attempt blocked: ${path} from ${req.ip}`);
    return res.status(403).send('Forbidden');
  }
  
  next();
};

// Middleware to block common environment file probing
const blockEnvFileProbing = (req, res, next) => {
  const path = req.path.toLowerCase();
  
  if (path.includes('.env') || path.endsWith('/config') || path.includes('credentials')) {
    console.warn(`Blocked sensitive file access attempt: ${path} from ${req.ip}`);
    return res.status(404).send('Not Found');
  }
  
  next();
};

// Configure and start the server
const app = express();

// Apply security middleware
app.use(helmet()); // Set security headers
app.use(rateLimit); // Apply rate limiting
app.use(blockWpScanning); // Block WordPress scanning attempts
app.use(preventPathTraversal); // Prevent path traversal attacks
app.use(blockEnvFileProbing); // Block environment file probing

// Disable information exposure
app.disable('x-powered-by');

// Secure cookie settings
app.set('trust proxy', 1);

// Set Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Modify as needed
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// For SPA routing - return index.html for all non-asset routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.info(`Server running on port ${PORT}`);
});
