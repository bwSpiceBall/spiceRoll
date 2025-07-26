import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import helmet from 'helmet';

import { blockWpScanning, rateLimit, preventPathTraversal, blockEnvFileProbing } from './middleware/security';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const configureServer = () => {
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
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  
  // For SPA routing - return index.html for all non-asset routes
  app.get('*', (_req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
  
  return app;
};

// Use in your main server file
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = configureServer();
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.info(`Server running on port ${PORT}`);
  });
}
