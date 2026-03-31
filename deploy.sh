#!/bin/bash

# Deployment Script for Yash Host SMM Plan
# This script builds the frontend and prepares files for deployment

echo "🚀 Starting deployment process..."

# Step 1: Build frontend
echo "📦 Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"

# Step 2: Create deployment package
echo "📁 Creating deployment package..."

# Create a temporary deployment directory
rm -rf deploy_package
mkdir -p deploy_package

# Copy built frontend files
echo "Copying frontend files..."
cp -r dist/* deploy_package/

# Copy API files
echo "Copying API files..."
mkdir -p deploy_package/api
cp -r api/* deploy_package/api/

# Create .htaccess for frontend (if needed)
cat > deploy_package/.htaccess << 'EOF'
# Redirect all requests to index.html for SPA routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF

# Create deployment instructions
cat > deploy_package/DEPLOY_INSTRUCTIONS.txt << 'EOF'
DEPLOYMENT INSTRUCTIONS FOR YASH HOST
=====================================

1. Upload all files from this package to your public_html directory via:
   - cPanel File Manager, OR
   - FTP/SFTP, OR
   - SSH (recommended for SMM plan)

2. Set up MySQL database:
   - Go to cPanel > MySQL Databases
   - Create a new database (e.g., expertisor_cms)
   - Create a database user with a strong password
   - Grant ALL PRIVILEGES to the user for this database
   - Note down: database name, username, password

3. Import database schema:
   - Go to cPanel > phpMyAdmin
   - Select your database
   - Click "Import" tab
   - Upload api/schema.sql
   - Click "Go"

4. Configure database connection:
   - Edit api/config.php
   - Update DB_HOST, DB_NAME, DB_USER, DB_PASS
   - Update JWT_SECRET with a secure random string (at least 32 characters)
   - Update allowed CORS origins with your domain

5. Set file permissions (via SSH or cPanel):
   - Files: 644 (chmod 644 *.php)
   - Directories: 755 (chmod 755 api/)
   - Make sure api/config.php is NOT publicly accessible

6. Test the deployment:
   - Visit https://yourdomain.com
   - Visit https://yourdomain.com/cms/login
   - Login with: admin / admin123
   - IMMEDIATELY change the default password!

7. Security checklist:
   ✓ Change default admin password
   ✓ Update JWT_SECRET in config.php
   ✓ Verify HTTPS is working
   ✓ Test that config.php is not accessible via browser
   ✓ Enable SSL certificate (free via cPanel)

For SSH deployment (recommended):
scp -r deploy_package/* username@yourdomain.com:~/public_html/

Need help? Check DEPLOYMENT.md for detailed instructions.
EOF

echo "✅ Deployment package created in ./deploy_package/"
echo ""
echo "📋 Next steps:"
echo "1. Review deploy_package/DEPLOY_INSTRUCTIONS.txt"
echo "2. Upload files to Yash Host via cPanel/FTP/SSH"
echo "3. Configure database in api/config.php"
echo "4. Import api/schema.sql via phpMyAdmin"
echo "5. Test at https://yourdomain.com/cms/login"
echo ""
echo "🎉 Deployment package ready!"
