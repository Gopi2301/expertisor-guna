# Deploy to dev.expertisoracademy.com - Quick Guide

## Step 1: Create Dev Database (5 minutes)

### In cPanel:

1. Go to **MySQL® Databases**
2. Create database: `dev_cms` (full name will be `username_dev_cms`)
3. Create user: `dev_user` with strong password
4. Add user to database with ALL PRIVILEGES
5. **Save these credentials** - you'll need them!

---

## Step 2: Build for Dev Environment (2 minutes)

### Update Environment Variables:

Create/update `.env.production`:

```env
VITE_API_URL=https://dev.expertisoracademy.com/api
VITE_SITE_URL=https://dev.expertisoracademy.com
```

### Build the Project:

```bash
cd /Users/amanbhogal/Downloads/123

# Build frontend
npm run build

# Run deployment script
./deploy.sh
```

This creates `deploy_package/` with all files ready.

---

## Step 3: Upload to Dev Server

### Find Dev Directory:

Your dev environment is likely at:
- `~/public_html/dev/` or
- `~/dev.expertisoracademy.com/` or
- Check cPanel > Subdomains to see the document root

### Upload Files:

**Option A: Via SSH (Fastest)**

```bash
# Get SSH credentials from cPanel > SSH Access
# Then connect:
ssh your-username@expertisoracademy.com

# Verify you're in the right place
pwd
# Should show /home/username

# Navigate to dev directory
cd public_html/dev  # or wherever dev.expertisoracademy.com points to

# Exit SSH for now
exit
```

```bash
# From your local machine, upload files
cd /Users/amanbhogal/Downloads/123/deploy_package

# Upload everything to dev
scp -r * your-username@expertisoracademy.com:~/public_html/dev/

# Enter your cPanel password when prompted
```

**Option B: Via cPanel File Manager**

1. Go to cPanel > **File Manager**
2. Navigate to dev directory (e.g., `public_html/dev/`)
3. Click **Upload**
4. Upload all files from `deploy_package/`
5. Wait for upload to complete

---

## Step 4: Configure Database Connection

### Via SSH:

```bash
ssh your-username@expertisoracademy.com
cd public_html/dev/api
nano config.php  # or use vi
```

### Via cPanel File Manager:

1. Navigate to `public_html/dev/api/config.php`
2. Click **Edit**
3. Update these lines:

```php
// Database credentials from Step 1
define('DB_HOST', 'localhost');
define('DB_NAME', 'username_dev_cms');  // Your actual database name
define('DB_USER', 'username_dev_user');  // Your actual username
define('DB_PASS', 'your_generated_password');  // From Step 1

// Generate a random JWT secret (32+ characters)
define('JWT_SECRET', 'dev_jwt_secret_change_to_random_string_min_32_chars');

// Update allowed origins
$allowedOrigins = [
    'http://localhost:5173',
    'https://dev.expertisoracademy.com',
    'https://expertisoracademy.com'
];
```

4. Click **Save Changes**

---

## Step 5: Import Database Schema

### Via phpMyAdmin:

1. Go to cPanel > **phpMyAdmin**
2. Select your dev database (`username_dev_cms`) from left sidebar
3. Click **Import** tab
4. Click **Choose File**
5. Select `api/schema.sql` from your dev directory or upload from local
6. Click **Go**
7. ✅ Verify tables created: `admin_users`, `auth_tokens`, `categories`, `courses`, `cms_templates`

---

## Step 6: Set File Permissions (if using SSH)

```bash
ssh your-username@expertisoracademy.com
cd public_html/dev

# Set directory permissions
find . -type d -exec chmod 755 {} \;

# Set file permissions
find . -type f -exec chmod 644 {} \;

# Protect config file
chmod 600 api/config.php
```

---

## Step 7: Test Everything!

### 7.1 Test Frontend

Visit: `https://dev.expertisoracademy.com`

✅ Should load your homepage

### 7.2 Test CMS Login

Visit: `https://dev.expertisoracademy.com/cms/login`

Login with:
- Username: `admin`
- Password: `admin123`

✅ Should redirect to `/cms` dashboard

### 7.3 Test CMS Features

- [ ] Create a new course
- [ ] Edit course details
- [ ] Publish the course
- [ ] Visit the course page: `https://dev.expertisoracademy.com/{slug}`
- [ ] Create a template
- [ ] Publish template
- [ ] Visit: `https://dev.expertisoracademy.com/landing/{slug}`

### 7.4 Test API Endpoints

```bash
# Test public endpoint
curl https://dev.expertisoracademy.com/api/courses.php?published=1

# Test login
curl -X POST https://dev.expertisoracademy.com/api/auth.php?action=login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 7.5 Verify Live Site Unaffected

Visit: `https://expertisoracademy.com`

✅ Should work exactly as before - **no changes!**

---

## Troubleshooting

### Issue: "Database connection failed"

**Check:**
- Database name is correct in `config.php`
- Username is correct
- Password is correct
- Database exists in cPanel > MySQL Databases

### Issue: "404 Not Found" for CMS

**Check:**
- `.htaccess` file exists in dev directory
- mod_rewrite is enabled (contact Yash Host if needed)

### Issue: CORS errors

**Check:**
- `$allowedOrigins` in `config.php` includes `dev.expertisoracademy.com`
- Clear browser cache

### Issue: Can't login

**Check:**
- Database schema imported successfully
- `admin_users` table has the default admin user
- JWT_SECRET is set in `config.php`

---

## Quick Commands Reference

```bash
# Connect to server
ssh your-username@expertisoracademy.com

# Navigate to dev
cd public_html/dev

# Check files
ls -la

# Edit config
nano api/config.php

# Check error logs
tail -f error_log

# Set permissions
chmod 755 api/
chmod 644 api/*.php
chmod 600 api/config.php
```

---

## Next Steps After Testing

Once everything works on dev:

1. **Test thoroughly** - Try all features
2. **Fix any issues** - Debug on dev environment
3. **Get user feedback** - Share dev.expertisoracademy.com with team
4. **When ready** - Deploy to production (expertisoracademy.com)

---

## Need Help?

**Common locations to check:**
- Dev files: `~/public_html/dev/`
- Error logs: `~/public_html/dev/error_log`
- Database: cPanel > phpMyAdmin > `username_dev_cms`
- SSH Access: cPanel > Advanced > SSH Access

**If stuck:**
1. Check error logs
2. Verify database connection
3. Check file permissions
4. Contact Yash Host support if needed

---

## Summary

✅ **Safe deployment** - Live site untouched  
✅ **Complete testing** - Frontend + Backend + CMS  
✅ **Separate database** - No risk to production data  
✅ **Easy rollback** - Just delete dev files if needed  

**Your live site at expertisoracademy.com remains 100% safe!** 🎉
