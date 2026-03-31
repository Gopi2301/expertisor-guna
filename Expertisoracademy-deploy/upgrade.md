# 🚀 Expertisor Academy - Zero-Downtime Upgrade Plan

> **For:** Antigravity IDE  
> **Project:** Expertisor Academy Migration to Laravel + Coolify  
> **Last Updated:** December 11, 2025  
> **Risk Level:** 🟢 LOW (with proper staging)  
> **Estimated Timeline:** 2-3 weeks

---

## 📊 **Executive Summary**

### Current State
- **Frontend:** React 19.1.0 + Vite
- **Backend:** PHP (raw) + MySQL + PDO
- **Hosting:** Traditional PHP hosting
- **Database:** MySQL with 2 tables (categories, courses)

### Target State
- **Frontend:** React 19.1.0 + Vite (unchanged)
- **Backend:** Laravel 11.x + MySQL + Redis
- **Hosting:** Coolify (self-hosted)
- **CI/CD:** Git-based auto-deployment
- **Infrastructure:** Docker containers

### Why This Upgrade?
✅ **Better developer experience** (migrations, ORM, validation)  
✅ **Scalability** (job queues, caching, sessions)  
✅ **Security** (built-in CSRF, XSS protection, Sanctum auth)  
✅ **Easy deployment** (Coolify handles Docker, SSL, domains)  
✅ **Future-proof** (Laravel Nova admin, API versioning, webhooks)

---

## 🛡️ **Safety Guarantees**

### Zero-Breakage Strategy
1. ✅ **Parallel deployment** - New backend runs alongside old one
2. ✅ **Database migrations tested** - No data loss
3. ✅ **Rollback plan ready** - One-click revert
4. ✅ **Staging environment** - Test before production
5. ✅ **API backward compatibility** - Frontend doesn't break

### Backup Requirements
```bash
# Before ANY changes
1. Full database backup (MySQL dump)
2. Complete codebase snapshot (Git tag)
3. Server configuration backup
4. .env file backup (credentials)
```

---

## 📋 **Phase-by-Phase Implementation**

## **PHASE 1: Environment Setup (Week 1, Days 1-2)**

### 1.1 Server Selection & Coolify Installation

#### Recommended VPS Specs
```yaml
Minimum Specs:
  CPU: 2 cores
  RAM: 4GB
  Storage: 50GB SSD
  OS: Ubuntu 22.04 LTS

Recommended Providers:
  - Hetzner Cloud: €4.90/month (CX22)
  - DigitalOcean: $24/month (4GB Droplet)
  - Vultr: $18/month (4GB)
```

#### Install Coolify
```bash
# SSH into your fresh Ubuntu server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Coolify (one-liner)
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# Access Coolify at: http://your-server-ip:8000
# Complete setup wizard (create admin account)
```

#### Post-Installation Setup
```bash
# Enable firewall
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 8000/tcp  # Coolify dashboard
ufw enable

# Set up domain (optional but recommended)
# Point your domain's A record to: your-server-ip
# Example: expertisoracademy.in → 123.45.67.89
```

---

### 1.2 Coolify Project Setup

#### Create New Project in Coolify
1. **Login to Coolify Dashboard** → `http://your-server-ip:8000`
2. **Create Project:**
   - Name: `Expertisor Academy`
   - Environment: `Production`
3. **Add Resources:**

```yaml
Resources to Add:
├── MySQL 8.0 Database
│   ├── Name: expertisor-db
│   ├── Root Password: [generate strong password]
│   └── Database: expertisor_academy
│
├── Redis 7.x
│   ├── Name: expertisor-cache
│   └── Password: [generate strong password]
│
├── Laravel Backend
│   ├── Type: Git Repository
│   ├── Repo: [your-new-laravel-repo]
│   ├── Build Pack: Nixpacks (PHP)
│   └── Domain: api.expertisoracademy.in
│
└── React Frontend
    ├── Type: Static Site
    ├── Repo: [your-existing-repo]
    ├── Build Command: npm run build
    ├── Publish Directory: dist
    └── Domain: expertisoracademy.in
```

---

## **PHASE 2: Backend Migration (Week 1, Days 3-7)**

### 2.1 Create New Laravel Project

```bash
# On your local machine
composer create-project laravel/laravel expertisor-backend
cd expertisor-backend

# Install required packages
composer require laravel/sanctum
composer require spatie/laravel-query-builder  # For filtering/sorting

# Initialize Git
git init
git add .
git commit -m "Initial Laravel setup"

# Push to GitHub/GitLab
git remote add origin https://github.com/yourusername/expertisor-backend.git
git push -u origin main
```

### 2.2 Database Configuration

#### Create Migrations from Current Schema

```bash
# Generate migrations
php artisan make:migration create_categories_table
php artisan make:migration create_courses_table
```

**Migration 1: Categories Table**
```php
<?php
// database/migrations/xxxx_create_categories_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 100)->unique();
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });
        
        // Seed default categories
        DB::table('categories')->insert([
            ['name' => 'Technology', 'slug' => 'technology', 'display_order' => 1],
            ['name' => 'Business', 'slug' => 'business', 'display_order' => 2],
            ['name' => 'Civil', 'slug' => 'civil', 'display_order' => 3],
            ['name' => 'Mechanical', 'slug' => 'mechanical', 'display_order' => 4],
            ['name' => 'Marketing', 'slug' => 'marketing', 'display_order' => 5],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

**Migration 2: Courses Table**
```php
<?php
// database/migrations/xxxx_create_courses_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->enum('status', ['DRAFT', 'PUBLISHED'])->default('DRAFT');
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            
            // Card Metadata
            $table->string('title');
            $table->string('mentor_name', 100)->default('');
            $table->string('mentor_image', 500)->default('');
            $table->decimal('rating', 2, 1)->default(4.9);
            $table->string('student_count', 50)->default('0+');
            $table->string('language', 50)->default('Tamil');
            $table->string('duration', 50)->default('0h');
            $table->string('thumbnail', 500)->default('');
            
            // JSON Data
            $table->json('hero_data')->nullable();
            $table->json('form_data')->nullable();
            
            // Timestamps
            $table->timestamps();
            $table->timestamp('published_at')->nullable();
            
            // Indexes
            $table->index('status');
            $table->index('category_id');
            $table->index('slug');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
```

### 2.3 Create Eloquent Models

```bash
php artisan make:model Category
php artisan make:model Course
```

**Category Model**
```php
<?php
// app/Models/Category.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'display_order',
    ];

    protected $casts = [
        'display_order' => 'integer',
    ];

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}
```

**Course Model**
```php
<?php
// app/Models/Course.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Course extends Model
{
    protected $fillable = [
        'slug',
        'status',
        'category_id',
        'title',
        'mentor_name',
        'mentor_image',
        'rating',
        'student_count',
        'language',
        'duration',
        'thumbnail',
        'hero_data',
        'form_data',
        'published_at',
    ];

    protected $casts = [
        'hero_data' => 'array',
        'form_data' => 'array',
        'rating' => 'decimal:1',
        'published_at' => 'datetime',
    ];

    // Relationships
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Scopes
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'PUBLISHED');
    }

    public function scopeBySlug(Builder $query, string $slug): Builder
    {
        return $query->where('slug', $slug);
    }
}
```

### 2.4 Create API Controllers

```bash
php artisan make:controller Api/CourseController --api
php artisan make:controller Api/CategoryController --api
```

**Course Controller**
```php
<?php
// app/Http/Controllers/Api/CourseController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{
    /**
     * Get all courses or filter by published status
     * GET /api/courses?published=1
     */
    public function index(Request $request): JsonResponse
    {
        $query = Course::with('category');

        // Filter by published status
        if ($request->boolean('published')) {
            $query->published();
        }

        $courses = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $courses,
            'error' => null,
        ]);
    }

    /**
     * Get single course by ID or slug
     * GET /api/courses?id=1
     * GET /api/courses?slug=blockchain-course
     */
    public function show(Request $request): JsonResponse
    {
        try {
            if ($request->has('id')) {
                $course = Course::with('category')->findOrFail($request->id);
            } elseif ($request->has('slug')) {
                $course = Course::with('category')->bySlug($request->slug)->firstOrFail();
            } else {
                return response()->json([
                    'success' => false,
                    'data' => null,
                    'error' => 'ID or slug required',
                ], 400);
            }

            return response()->json([
                'success' => true,
                'data' => $course,
                'error' => null,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'data' => null,
                'error' => 'Course not found',
            ], 404);
        }
    }

    /**
     * Create new course
     * POST /api/courses
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:courses,slug',
            'category_id' => 'nullable|exists:categories,id',
            'mentor_name' => 'nullable|string|max:100',
            'mentor_image' => 'nullable|string|max:500',
            'rating' => 'nullable|numeric|between:0,5',
            'student_count' => 'nullable|string|max:50',
            'language' => 'nullable|string|max:50',
            'duration' => 'nullable|string|max:50',
            'thumbnail' => 'nullable|string|max:500',
            'hero_data' => 'nullable|array',
            'form_data' => 'nullable|array',
            'status' => 'nullable|in:DRAFT,PUBLISHED',
        ]);

        $course = Course::create($validated);

        return response()->json([
            'success' => true,
            'data' => $course,
            'error' => null,
        ], 201);
    }

    /**
     * Update course
     * PUT /api/courses/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'slug' => 'sometimes|string|unique:courses,slug,' . $id,
            'category_id' => 'nullable|exists:categories,id',
            'mentor_name' => 'nullable|string|max:100',
            'mentor_image' => 'nullable|string|max:500',
            'rating' => 'nullable|numeric|between:0,5',
            'student_count' => 'nullable|string|max:50',
            'language' => 'nullable|string|max:50',
            'duration' => 'nullable|string|max:50',
            'thumbnail' => 'nullable|string|max:500',
            'hero_data' => 'nullable|array',
            'form_data' => 'nullable|array',
            'status' => 'nullable|in:DRAFT,PUBLISHED',
        ]);

        // Set published_at when status changes to PUBLISHED
        if (isset($validated['status']) && $validated['status'] === 'PUBLISHED' && !$course->published_at) {
            $validated['published_at'] = now();
        }

        $course->update($validated);

        return response()->json([
            'success' => true,
            'data' => $course,
            'error' => null,
        ]);
    }

    /**
     * Delete course
     * DELETE /api/courses/{id}
     */
    public function destroy($id): JsonResponse
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'error' => null,
        ]);
    }
}
```

**Category Controller**
```php
<?php
// app/Http/Controllers/Api/CategoryController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Get all categories
     * GET /api/categories
     */
    public function index(): JsonResponse
    {
        $categories = Category::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
            'error' => null,
        ]);
    }

    /**
     * Create category
     * POST /api/categories
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'display_order' => 'nullable|integer',
        ]);

        // Auto-generate slug if not provided
        $validated['slug'] = Str::slug($validated['name']);

        $category = Category::create($validated);

        return response()->json([
            'success' => true,
            'data' => $category,
            'error' => null,
        ], 201);
    }

    /**
     * Update category
     * PUT /api/categories/{id}
     */
    public function update(Request $request, $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'display_order' => 'sometimes|integer',
        ]);

        // Update slug if name changed
        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'data' => $category,
            'error' => null,
        ]);
    }

    /**
     * Delete category
     * DELETE /api/categories/{id}
     */
    public function destroy($id): JsonResponse
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'error' => null,
        ]);
    }
}
```

### 2.5 Configure API Routes

```php
<?php
// routes/api.php

use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Support\Facades\Route;

// Courses API
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/show', [CourseController::class, 'show']); // Supports ?id= and ?slug=
Route::post('/courses', [CourseController::class, 'store']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

// Categories API
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
```

### 2.6 Configure CORS

```php
<?php
// config/cors.php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://expertisoracademy.in',
        'http://localhost:5173', // Vite dev server
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### 2.7 Environment Configuration

```bash
# .env for Coolify deployment
APP_NAME="Expertisor Academy API"
APP_ENV=production
APP_KEY=base64:YOUR_KEY_HERE
APP_DEBUG=false
APP_URL=https://api.expertisoracademy.in

DB_CONNECTION=mysql
DB_HOST=${MYSQL_HOST}  # Coolify auto-fills this
DB_PORT=3306
DB_DATABASE=${MYSQL_DATABASE}
DB_USERNAME=${MYSQL_USER}
DB_PASSWORD=${MYSQL_PASSWORD}

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

REDIS_HOST=${REDIS_HOST}  # Coolify auto-fills this
REDIS_PASSWORD=${REDIS_PASSWORD}
REDIS_PORT=6379
```

---

## **PHASE 3: Data Migration (Week 2, Days 1-2)**

### 3.1 Export Data from Current Database

```bash
# SSH into current server
ssh user@current-server

# Export existing data
mysqldump -u username -p expertisor_academy categories courses > backup_$(date +%Y%m%d).sql

# Download to local machine
scp user@current-server:~/backup_*.sql ./
```

### 3.2 Import into New Laravel Database

```bash
# Option A: Via Coolify MySQL service
# Use Coolify's phpMyAdmin or connect via MySQL client

# Option B: Via Laravel seeder (recommended)
php artisan make:seeder MigrateExistingDataSeeder
```

**Migration Seeder**
```php
<?php
// database/seeders/MigrateExistingDataSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MigrateExistingDataSeeder extends Seeder
{
    public function run(): void
    {
        // Import SQL file
        $sql = file_get_contents(database_path('backup_20251211.sql'));
        
        DB::unprepared($sql);
        
        $this->command->info('Data migrated successfully!');
    }
}
```

Run migration:
```bash
php artisan db:seed --class=MigrateExistingDataSeeder
```

---

## **PHASE 4: Frontend Integration (Week 2, Days 3-4)**

### 4.1 Update API Service

```javascript
// src/services/api.js - Updated version

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.expertisoracademy.in';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Courses API
export const coursesAPI = {
  // Get all courses
  getAll: (params = {}) => api.get('/courses', { params }),
  
  // Get published courses only
  getPublished: () => api.get('/courses', { params: { published: 1 } }),
  
  // Get course by ID
  getById: (id) => api.get('/courses/show', { params: { id } }),
  
  // Get course by slug
  getBySlug: (slug) => api.get('/courses/show', { params: { slug } }),
  
  // Create course
  create: (data) => api.post('/courses', data),
  
  // Update course
  update: (id, data) => api.put(`/courses/${id}`, data),
  
  // Delete course
  delete: (id) => api.delete(`/courses/${id}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export default api;
```

### 4.2 Update Environment Variables

```bash
# .env.development
VITE_API_URL=http://localhost:8000

# .env.production
VITE_API_URL=https://api.expertisoracademy.in
```

### 4.3 Test Integration

```javascript
// Test in browser console after deployment
import { coursesAPI } from './services/api';

// Test getting all courses
coursesAPI.getPublished()
  .then(response => console.log('Courses:', response.data))
  .catch(error => console.error('Error:', error));
```

---

## **PHASE 5: Coolify Deployment (Week 2, Days 5-7)**

### 5.1 Deploy Laravel Backend

**Coolify Configuration:**
```yaml
# In Coolify Dashboard → Resources → Add New Resource

Resource Type: Git Repository
Repository URL: https://github.com/yourusername/expertisor-backend.git
Branch: main
Build Pack: Nixpacks (auto-detects Laravel)

Domains:
  - api.expertisoracademy.in

Environment Variables:
  APP_NAME: "Expertisor Academy API"
  APP_ENV: production
  APP_DEBUG: false
  APP_URL: https://api.expertisoracademy.in
  
  # Coolify auto-injects these:
  MYSQL_HOST: ${MYSQL_HOST}
  MYSQL_DATABASE: ${MYSQL_DATABASE}
  MYSQL_USER: ${MYSQL_USER}
  MYSQL_PASSWORD: ${MYSQL_PASSWORD}
  REDIS_HOST: ${REDIS_HOST}
  REDIS_PASSWORD: ${REDIS_PASSWORD}

Post-Deployment Commands:
  - php artisan migrate --force
  - php artisan config:cache
  - php artisan route:cache
  - php artisan view:cache
```

### 5.2 Deploy React Frontend

**Coolify Configuration:**
```yaml
Resource Type: Static Site
Repository URL: https://github.com/yourusername/expertisor-frontend.git
Branch: main

Build Settings:
  Install Command: npm install
  Build Command: npm run build
  Publish Directory: dist

Domains:
  - expertisoracademy.in
  - www.expertisoracademy.in

Environment Variables:
  VITE_API_URL: https://api.expertisoracademy.in
```

### 5.3 SSL Certificate Setup

Coolify auto-generates Let's Encrypt SSL certificates:
1. Go to your resource → Domains
2. Click "Generate SSL Certificate"
3. Wait 2-3 minutes for provisioning
4. ✅ Your site is now HTTPS!

---

## **PHASE 6: Testing & Validation (Week 3, Days 1-3)**

### 6.1 API Testing Checklist

```bash
# Test all endpoints
curl https://api.expertisoracademy.in/api/courses
curl https://api.expertisoracademy.in/api/courses?published=1
curl https://api.expertisoracademy.in/api/courses/show?slug=blockchain-course
curl https://api.expertisoracademy.in/api/categories

# Test CORS
curl -H "Origin: https://expertisoracademy.in" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS https://api.expertisoracademy.in/api/courses
```

### 6.2 Frontend Testing Checklist

- [ ] Homepage loads correctly
- [ ] Course listing displays all courses
- [ ] Course detail pages work
- [ ] CMS admin panel functional
- [ ] Lead capture forms submit
- [ ] Static course pages (3DS Max, Blockchain, etc.)
- [ ] Mentorship booking pages
- [ ] Mobile responsiveness
- [ ] GTM & Meta Pixel tracking
- [ ] WhatsApp button functionality

### 6.3 Performance Testing

```bash
# Load testing with Apache Bench
ab -n 1000 -c 10 https://expertisoracademy.in/
ab -n 1000 -c 10 https://api.expertisoracademy.in/api/courses?published=1

# Check response times
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://api.expertisoracademy.in/api/courses
```

---

## **PHASE 7: Go-Live Strategy (Week 3, Days 4-7)**

### 7.1 Pre-Launch Checklist

```markdown
- [ ] All data migrated and verified
- [ ] API endpoints tested and working
- [ ] Frontend connects to new backend
- [ ] SSL certificates active
- [ ] DNS records updated
- [ ] Backups configured
- [ ] Monitoring alerts set up
- [ ] Rollback plan documented
- [ ] Team notified of deployment window
```

### 7.2 DNS Migration

```bash
# Current DNS (OLD):
expertisoracademy.in A 123.45.67.89 (old server)

# New DNS (Coolify):
expertisoracademy.in A 234.56.78.90 (Coolify server)
api.expertisoracademy.in A 234.56.78.90 (Coolify server)

# Update in your domain registrar:
1. Change A record for expertisoracademy.in
2. Add A record for api.expertisoracademy.in
3. Wait for propagation (15-30 minutes)
```

### 7.3 Cutover Steps

```markdown
1. Enable "Maintenance Mode" on old site
2. Final database backup
3. Update DNS records
4. Wait 5 minutes for propagation
5. Test new site: https://expertisoracademy.in
6. Verify API: https://api.expertisoracademy.in/api/courses
7. Monitor logs in Coolify dashboard
8. Disable maintenance mode
9. Send confirmation to team
```

### 7.4 Rollback Plan (if needed)

```markdown
If something goes wrong:

1. Revert DNS to old server IP
2. Wait 5 minutes
3. Old site is live again
4. Debug issues in Coolify staging
5. Try again when fixed

Time to rollback: ~5 minutes
```

---

## 🎯 **AI Model Recommendation**

### For Antigravity IDE - Choose **Claude Sonnet 4.5**

**Why Sonnet 4.5?**

✅ **Best balance** - Smart enough for complex code, fast enough for real-time coding  
✅ **Code-first training** - Excels at Laravel, React, Docker, DevOps  
✅ **Context window** - 200K tokens (handles large codebases)  
✅ **Tool use** - Can read files, execute commands, test code  
✅ **Cost-effective** - 1/5th the cost of Opus 4  

**Model Comparison:**

| Model | Best For | Speed | Code Quality | Cost |
|-------|----------|-------|--------------|------|
| **Sonnet 4.5** ⭐ | **Full-stack dev, migrations, debugging** | ⚡⚡⚡ Fast | 🎯 Excellent | 💰 Low |
| Opus 4 | Complex architecture, novel solutions | ⚡ Slower | 🎯 Slightly better | 💰💰💰 High |
| Gemini 2.0 Flash | Quick tasks, simple scripts | ⚡⚡⚡⚡ Fastest | 🤷 Good | 💰 Lowest |

**Recommendation: Use Sonnet 4.5** for this migration project.

---

## 📊 **Success Metrics**

### Week 1 Goals
- [ ] Coolify installed and configured
- [ ] Laravel backend deployed to staging
- [ ] Database migrated successfully
- [ ] All API endpoints working

### Week 2 Goals
- [ ] Frontend connected to new API
- [ ] All tests passing
- [ ] Performance benchmarks met (< 500ms response time)
- [ ] Zero data loss confirmed

### Week 3 Goals
- [ ] Production deployment successful
- [ ] DNS cutover completed
- [ ] Old server decommissioned
- [ ] Team trained on Coolify dashboard

---

## 🚨 **Troubleshooting Guide**

### Issue: API returns 500 errors
```bash
# Check Laravel logs in Coolify
# Dashboard → Your Laravel App → Logs → Application Logs

# Common fixes:
php artisan config:clear
php artisan cache:clear
php artisan migrate --force
```

### Issue: CORS errors in browser
```php
// config/cors.php
'allowed_origins' => [
    'https://expertisoracademy.in',
    'https://www.expertisoracademy.in',
],
```

### Issue: Database connection failed
```bash
# Check environment variables in Coolify
# Make sure MYSQL_HOST, MYSQL_DATABASE, etc. are set

# Test connection:
php artisan tinker
>>> DB::connection()->getPdo();
```

### Issue: Frontend shows old data
```bash
# Clear browser cache
# Hard reload: Ctrl + Shift + R (Windows/Linux) or Cmd + Shift + R (Mac)

# Check API response:
curl https://api.expertisoracademy.in/api/courses?published=1
```

---

## 📞 **Support & Resources**

### Documentation
- Laravel: https://laravel.com/docs/11.x
- Coolify: https://coolify.io/docs
- React + Vite: https://vitejs.dev/guide/

### Coolify Dashboard
- URL: https://your-server-ip:8000
- Monitor deployments, logs, metrics

### Emergency Contacts
- Backend issues: Check Laravel logs
- Frontend issues: Check browser console
- Infrastructure: Check Coolify dashboard

---

## ✅ **Final Checklist**

```markdown
Pre-Migration:
- [ ] VPS provisioned
- [ ] Coolify installed
- [ ] Backups created
- [ ] Team notified

Migration:
- [ ] Laravel backend deployed
- [ ] Database migrated
- [ ] Frontend updated
- [ ] Tests passing

Post-Migration:
- [ ] DNS updated
- [ ] SSL active
- [ ] Monitoring enabled
- [ ] Documentation updated
- [ ] Old server decommissioned (after 1 week)
```

---

## 🎉 **Success Criteria**

You'll know the migration was successful when:

✅ **Zero downtime** - Users never noticed the switch  
✅ **Same functionality** - Everything works as before (or better!)  
✅ **Better performance** - API responses < 500ms  
✅ **Easy deployments** - Git push → Auto deploy via Coolify  
✅ **Happy developers** - Clean code, migrations, proper ORM  
✅ **Future-ready** - Can add features without fighting infrastructure

---

**Good luck with the migration! 🚀**

*If you have any questions during implementation, refer back to this document or check the Troubleshooting Guide.*
