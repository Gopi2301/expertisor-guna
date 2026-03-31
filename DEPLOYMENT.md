# Deployment Guide for Yash Host SMM Plan

This guide will walk you through deploying your CMS application to Yash Host.

## Prerequisites

- Yash Host SMM Plan account
- cPanel access
- SSH access (included with SMM plan)
- Your domain configured and pointing to Yash Host

---

## Step 1: Prepare for Deployment

### 1.1 Build the Application Locally

```bash
# Navigate to project directory
cd /Users/amanbhogal/Downloads/123

# Run deployment script
./deploy.sh
```

This will:
- Build the frontend with Vite
- Create a `deploy_package/` directory with all necessary files
- Generate deployment instructions

### 1.2 Update Configuration

Before deploying, update these files in `deploy_package/api/`:

**config.php**:
```php
// Update these values
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');  // From cPanel
define('DB_USER', 'your_database_user');  // From cPanel
define('DB_PASS', 'your_database_password');  // From cPanel

// CRITICAL: Change this to a secure random string!
define('JWT_SECRET', 'GENERATE_A_SECURE_RANDOM_STRING_AT_LEAST_32_CHARS');

// Update with your actual domain
$allowedOrigins = [
    'https://yourdomain.com',
    'https://www.yourdomain.com'
];
```

---

## Step 2: Set Up MySQL Database

### 2.1 Create Database via cPanel

1. Login to Yash Host cPanel
2. Navigate to **MySQL® Databases**
3. Under "Create New Database":
   - Database Name: `expertisor_cms` (or your choice)
   - Click **Create Database**
4. Under "Add New User":
   - Username: `cms_admin` (or your choice)
   - Password: Generate a strong password
   - Click **Create User**
5. Under "Add User to Database":
   - Select your user and database
   - Click **Add**
   - Grant **ALL PRIVILEGES**
   - Click **Make Changes**

### 2.2 Import Database Schema

1. Go to cPanel > **phpMyAdmin**
2. Select your database from the left sidebar
3. Click the **Import** tab
4. Click **Choose File** and select `deploy_package/api/schema.sql`
5. Click **Go**
6. Verify tables were created: `admin_users`, `auth_tokens`, `categories`, `courses`, `cms_templates`

---

## Step 3: Upload Files to Yash Host

### Option A: SSH Upload (Recommended for SMM Plan)

```bash
# From your local machine
cd deploy_package

# Upload via SCP
scp -r * username@yourdomain.com:~/public_html/

# Or use rsync for faster uploads
rsync -avz --progress * username@yourdomain.com:~/public_html/
```

### Option B: cPanel File Manager

1. Login to cPanel
2. Go to **File Manager**
3. Navigate to `public_html/`
4. Click **Upload**
5. Upload all files from `deploy_package/`
6. Extract if you uploaded as a ZIP file

### Option C: FTP/SFTP

Use FileZilla or any FTP client:
- Host: `ftp.yourdomain.com` or `yourdomain.com`
- Username: Your cPanel username
- Password: Your cPanel password
- Port: 21 (FTP) or 22 (SFTP)
- Upload to: `/public_html/`

---

## Step 4: Set File Permissions

### Via SSH:

```bash
ssh username@yourdomain.com

cd public_html

# Set directory permissions
find . -type d -exec chmod 755 {} \;

# Set file permissions
find . -type f -exec chmod 644 {} \;

# Protect sensitive files
chmod 600 api/config.php
```

### Via cPanel File Manager:

1. Select all files/folders
2. Click **Permissions**
3. Set directories to `755`
4. Set files to `644`
5. Set `api/config.php` to `600`

---

## Step 5: Configure Environment

### 5.1 Update Frontend Environment

The frontend is already built with production settings. If you need to change the API URL later:

1. Edit `.env` locally:
   ```env
   VITE_API_URL=https://yourdomain.com/api
   ```
2. Rebuild: `npm run build`
3. Re-upload `dist/` files

### 5.2 Enable SSL Certificate (HTTPS)

1. Go to cPanel > **SSL/TLS Status**
2. Find your domain
3. Click **Run AutoSSL** (free Let's Encrypt certificate)
4. Wait for installation (usually 1-2 minutes)
5. Verify HTTPS works: `https://yourdomain.com`

---

## Step 6: Test the Deployment

### 6.1 Test Frontend

1. Visit `https://yourdomain.com`
2. Verify homepage loads correctly
3. Check browser console for errors

### 6.2 Test CMS Login

1. Visit `https://yourdomain.com/cms/login`
2. Login with default credentials:
   - Username: `admin`
   - Password: `admin123`
3. You should be redirected to `/cms`

### 6.3 Test CRUD Operations

1. Create a new course
2. Edit the course
3. Publish the course
4. View on public page
5. Delete the course

### 6.4 Test API Endpoints

```bash
# Test public endpoint (should work)
curl https://yourdomain.com/api/courses.php?published=1

# Test protected endpoint (should return 401)
curl https://yourdomain.com/api/courses.php

# Test login
curl -X POST https://yourdomain.com/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## Step 7: Post-Deployment Security

### 7.1 Change Default Password

1. Login to CMS
2. Go to Settings (when implemented) or manually update in database:

```sql
-- Via phpMyAdmin
UPDATE admin_users 
SET password_hash = '$2y$10$YOUR_NEW_BCRYPT_HASH' 
WHERE username = 'admin';
```

To generate a new hash:
```php
<?php
echo password_hash('your_new_password', PASSWORD_BCRYPT);
?>
```

### 7.2 Security Checklist

- [ ] Changed default admin password
- [ ] Updated `JWT_SECRET` in `config.php`
- [ ] Verified `config.php` is not accessible via browser
- [ ] SSL certificate is active (HTTPS working)
- [ ] Tested that `.env` files are not accessible
- [ ] Verified API authentication is working
- [ ] Checked file permissions are correct
- [ ] Removed any test/debug code

---

## Step 8: Backup Strategy

### 8.1 Database Backups

Set up automatic backups via cPanel:
1. Go to **Backup Wizard**
2. Choose **Backup**
3. Select **Full Backup**
4. Choose destination (email or remote FTP)
5. Schedule weekly backups

### 8.2 File Backups

```bash
# Manual backup via SSH
ssh username@yourdomain.com
cd ~
tar -czf backup-$(date +%Y%m%d).tar.gz public_html/
```

---

## Troubleshooting

### Issue: "Database connection failed"

**Solution**:
1. Verify database credentials in `api/config.php`
2. Check database exists in cPanel > MySQL Databases
3. Verify user has ALL PRIVILEGES
4. Try `DB_HOST = 'localhost'` or `'127.0.0.1'`

### Issue: "401 Unauthorized" on all CMS requests

**Solution**:
1. Check `JWT_SECRET` is set in `config.php`
2. Clear browser localStorage and login again
3. Verify `.htaccess` allows Authorization headers

### Issue: "Page not found" on refresh

**Solution**:
1. Verify `.htaccess` exists in `public_html/`
2. Check mod_rewrite is enabled (contact Yash Host support)
3. Verify RewriteBase is set correctly

### Issue: CORS errors in browser console

**Solution**:
1. Update `$allowedOrigins` in `api/config.php`
2. Add your domain to the array
3. Clear browser cache

### Issue: File upload fails

**Solution**:
1. Check PHP upload limits in `api/.htaccess`
2. Verify directory permissions (755 for directories)
3. Check disk space in cPanel

---

## Monitoring & Maintenance

### Check Error Logs

Via cPanel:
1. Go to **Errors**
2. View recent errors
3. Download error log for detailed analysis

Via SSH:
```bash
tail -f ~/public_html/error_log
```

### Monitor Disk Usage

```bash
# Via SSH
du -sh ~/public_html
```

Via cPanel:
- Check disk usage widget on homepage

### Performance Optimization

1. Enable Gzip compression (already in `.htaccess`)
2. Use Cloudflare for CDN (free plan available)
3. Optimize images before upload
4. Monitor database size and optimize tables regularly

---

## Support

- **Yash Host Support**: Contact via cPanel or support ticket
- **SSH Access**: Included with SMM plan
- **PHP Version**: Ensure PHP 7.4+ is active (cPanel > Select PHP Version)

---

## Next Steps

After successful deployment:

1. **Phase 2**: Implement pagination and search (see `implementation_plan.md`)
2. **Backup**: Set up automated backups
3. **Monitoring**: Set up uptime monitoring (e.g., UptimeRobot)
4. **Analytics**: Add Google Analytics or similar
5. **Documentation**: Document any custom configurations

---

## Quick Reference

**Default Login**: `admin` / `admin123` (CHANGE THIS!)

**Important Files**:
- Frontend: `/public_html/`
- API: `/public_html/api/`
- Config: `/public_html/api/config.php`
- Database Schema: `/public_html/api/schema.sql`

**Important URLs**:
- Frontend: `https://yourdomain.com`
- CMS Login: `https://yourdomain.com/cms/login`
- API: `https://yourdomain.com/api/`

**cPanel Shortcuts**:
- MySQL Databases: cPanel > Databases section
- phpMyAdmin: cPanel > Databases section
- File Manager: cPanel > Files section
- SSL/TLS: cPanel > Security section
