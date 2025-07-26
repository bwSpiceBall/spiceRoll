#!/bin/bash

echo "Installing security dependencies..."
npm install express helmet --save
npm install @types/express --save-dev

echo "Checking for robots.txt..."
if [ -f "./public/robots.txt" ]; then
  echo "robots.txt exists"
else
  echo "Creating robots.txt..."
  mkdir -p ./public
  cat > ./public/robots.txt << EOL
User-agent: *
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-content/
Disallow: /xmlrpc.php
Disallow: /.env
Disallow: /.env-save
Disallow: /.git/
Disallow: /config/
Disallow: /api/

# Allow legitimate crawlers to access the site content
User-agent: Googlebot
Allow: /
Disallow: /api/

User-agent: Bingbot
Allow: /
Disallow: /api/
EOL
fi

echo "Building the application with security enhancements..."
npm run build

echo "Security setup complete!"
echo "Now you can run 'npm run serve' to start the secure server"
