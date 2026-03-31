# 📚 Expertisor Academy - Codebase Documentation

> **Last Updated:** December 11, 2025  
> **Project Type:** E-Learning Platform  
> **Live URL:** https://expertisoracademy.in/

---

## 🏗️ Project Overview

**Expertisor Academy** is an online education platform offering technical and professional courses. The platform features:

- Static landing pages for flagship courses
- Dynamic CMS for creating new course pages
- Lead generation system
- Mentorship booking program
- Multi-language course support (Tamil, English)

---

## 🖥️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI Framework |
| Vite | 7.1.1 | Build tool & dev server |
| React Router DOM | 7.6.0 | Client-side routing |
| Tailwind CSS | 3.4.17 | Utility-first styling |
| Firebase | 12.6.0 | Backend services |
| Lottie React | 2.4.1 | Animations |
| React Hot Toast | 2.5.2 | Notifications |
| Axios | 1.10.0 | HTTP client |
| Lucide React | 0.525.0 | Icons |

### Backend

| Technology | Purpose |
|------------|---------|
| PHP | REST API endpoints |
| MySQL | Database |
| PDO | Database abstraction |

---

## 📁 Project Structure

```
/123
├── 📄 index.html              # HTML entry point
├── 📄 package.json            # Dependencies & scripts
├── 📄 vite.config.js          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind configuration
├── 📄 postcss.config.js       # PostCSS configuration
├── 📄 eslint.config.js        # ESLint configuration
│
├── 📁 api/                    # PHP Backend
│   ├── config.php             # Database configuration
│   ├── schema.sql             # Database schema
│   ├── courses.php            # Courses REST API
│   └── categories.php         # Categories REST API
│
├── 📁 public/                 # Static assets
│   └── (images, videos, PDFs)
│
├── 📁 src/                    # React Frontend
│   ├── 📄 main.jsx            # React entry point
│   ├── 📄 App.jsx             # Root component with routing
│   ├── 📄 index.css           # Global styles
│   │
│   ├── 📁 pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Courses.jsx
│   │   ├── Course.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Mentors.jsx
│   │   ├── Initiative.jsx
│   │   ├── AffilateMarketing.jsx
│   │   ├── ThreeDMax.jsx
│   │   ├── AmazonCourse.jsx
│   │   ├── SolidWorks.jsx
│   │   ├── Civil3D.jsx
│   │   ├── Blockchain.jsx
│   │   ├── SSRCourse.jsx
│   │   ├── Mentorship.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── CourseListing.jsx
│   │   ├── LandingPage.jsx
│   │   ├── TermsAndServices.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── RefundAndCertificationPolicy.jsx
│   │   └── 📁 CMS/            # Admin CMS pages
│   │       ├── CourseList.jsx
│   │       ├── CourseEditor.jsx
│   │       ├── CategoryManager.jsx
│   │       ├── TemplateList.jsx
│   │       ├── TemplateEditor.jsx
│   │       ├── TemplatePreview.jsx
│   │       └── Settings.jsx
│   │
│   ├── 📁 components/         # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── WhatsAppButton.jsx
│   │   ├── 📁 HomeComponents/
│   │   ├── 📁 CourseComponents/
│   │   ├── 📁 InitiativeComponents/
│   │   ├── 📁 MentorshipComponents/
│   │   ├── 📁 CMSComponents/
│   │   ├── 📁 AffilateComponents/
│   │   ├── 📁 ThreeDMaxComponents/
│   │   ├── 📁 AmazonComponents/
│   │   ├── 📁 BlockchainComponents/
│   │   ├── 📁 SolidworksComponents/
│   │   ├── 📁 Civil3DComponents/
│   │   └── 📁 TestimonialsComponents/
│   │
│   ├── 📁 context/
│   │   └── CourseContextProvider.jsx
│   │
│   ├── 📁 services/
│   │   └── api.js             # API client service
│   │
│   ├── 📁 constants/
│   │   └── pages.js           # Static page content data
│   │
│   ├── 📁 assets/             # Images, icons, JSON animations
│   │
│   └── 📁 utils/              # Utility functions
│       └── utmUtils.js
│
└── 📁 dist/                   # Production build output
```

---

## 🛤️ Routing Overview

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Homepage with hero, courses, testimonials |
| `/courses` | `Courses` | Course catalog with filters |
| `/testimonials` | `Testimonials` | Student testimonials page |
| `/mentors` | `Mentors` | Mentor profiles |
| `/course/:id` | `Course` | Individual course details |

### Course Landing Pages (Static)

| Route | Component | Description |
|-------|-----------|-------------|
| `/techbundle` | `Initiative` | All-in-One Tech Bundle |
| `/reels-affiliate-marketing-tamil` | `AffilateMarketing` | Affiliate Marketing course |
| `/3dsmax-tamil` | `ThreeDMax` | 3DS Max course (Tamil) |
| `/3dsmax-english` | `ThreeDMax` | 3DS Max course (English) |
| `/amazon-seller-tamil-course` | `AmazonCourse` | Amazon Seller course |
| `/solidworks-tamil` | `SolidWorks` | SolidWorks course |
| `/civil3d-tamil` | `Civil3D` | Civil 3D course (Tamil) |
| `/civil3d-english` | `Civil3D` | Civil 3D course (English) |
| `/blockchain-course-for-students` | `Blockchain` | Blockchain for Students |
| `/blockchain-course-for-working-professionals` | `Blockchain` | Blockchain for Professionals |
| `/blockchain-course-for-business` | `Blockchain` | Blockchain for Business |
| `/ssr-course` | `SSRCourse` | SSR Course landing |

### Mentorship Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/eliteconnect` | Redirect | Redirects to `/eliteconnect/askraghulan` |
| `/eliteconnect/:mentorKey` | `Mentorship` | Mentor landing page |
| `/eliteconnect/:mentorKey/life-transformation` | `MentDet` | Booking details |

### CMS Admin Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/cms` | `CMSLayout` | CMS dashboard |
| `/cms/courses` | `CourseList` | Manage courses |
| `/cms/courses/new` | `CourseEditor` | Create new course |
| `/cms/courses/edit/:id` | `CourseEditor` | Edit course |
| `/cms/categories` | `CategoryManager` | Manage categories |
| `/cms/settings` | `Settings` | CMS settings |

### Dynamic CMS Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/courses-list` | `CourseListing` | CMS-managed course listing |
| `/landing/:slug` | `LandingPage` | Dynamic landing pages |
| `/:slug` | `CourseDetail` | Dynamic course detail pages |

### Legal Pages

| Route | Component |
|-------|-----------|
| `/termsandservices` | `TermsAndServices` |
| `/privacypolicy` | `PrivacyPolicy` |
| `/RefundAndCertificationPolicy` | `RefundAndCertificationPolicy` |

---

## 🗄️ Database Schema

### Categories Table

```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Courses Table

```sql
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    status ENUM('DRAFT', 'PUBLISHED') DEFAULT 'DRAFT',
    category_id INT NULL,
    
    -- Card Metadata
    title VARCHAR(255) NOT NULL,
    mentor_name VARCHAR(100) DEFAULT '',
    mentor_image VARCHAR(500) DEFAULT '',
    rating DECIMAL(2,1) DEFAULT 4.9,
    student_count VARCHAR(50) DEFAULT '0+',
    language VARCHAR(50) DEFAULT 'Tamil',
    duration VARCHAR(50) DEFAULT '0h',
    thumbnail VARCHAR(500) DEFAULT '',
    
    -- JSON Data
    hero_data JSON,    -- Hero section configuration
    form_data JSON,    -- Lead capture form configuration
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

### Default Categories

| ID | Name | Slug |
|----|------|------|
| 1 | Technology | technology |
| 2 | Business | business |
| 3 | Civil | civil |
| 4 | Mechanical | mechanical |
| 5 | Marketing | marketing |

---

## 🔌 API Reference

### Base URL
- **Development:** Uses `localStorage`
- **Production:** `/api`

### Courses API

#### Get All Courses
```http
GET /api/courses.php
```

#### Get Published Courses Only
```http
GET /api/courses.php?published=1
```

#### Get Course by ID
```http
GET /api/courses.php?id={id}
```

#### Get Course by Slug
```http
GET /api/courses.php?slug={slug}
```

#### Create Course
```http
POST /api/courses.php
Content-Type: application/json

{
  "title": "Course Title",
  "category_id": 1,
  "mentor_name": "Mentor Name",
  "language": "Tamil",
  "hero_data": {...},
  "form_data": {...}
}
```

#### Update Course
```http
PUT /api/courses.php?id={id}
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "PUBLISHED"
}
```

#### Delete Course
```http
DELETE /api/courses.php?id={id}
```

### Categories API

#### Get All Categories
```http
GET /api/categories.php
```

#### Create Category
```http
POST /api/categories.php
Content-Type: application/json

{
  "name": "Category Name"
}
```

#### Update Category
```http
PUT /api/categories.php?id={id}
Content-Type: application/json

{
  "name": "Updated Name"
}
```

#### Delete Category
```http
DELETE /api/categories.php?id={id}
```

### API Response Format

```json
{
  "success": true,
  "data": {...},
  "error": null
}
```

---

## 🎯 Key Features

### 1. Course Management

- **Static Courses:** Hardcoded in `src/constants/pages.js`
- **CMS Courses:** Dynamic creation via admin panel
- **Dual Language:** Tamil and English versions

### 2. Lead Generation

- Dynamic form builder in CMS
- Fields: Name, Email, Phone (customizable)
- Leads stored in localStorage (dev) or database (prod)
- CSV export functionality

### 3. Hero Section Configuration

```javascript
hero_data: {
  badge: { emoji: '🎓', text: 'Learn from Expert', highlight: '' },
  headline: { 
    parts: [
      { text: 'Master ', highlight: false },
      { text: 'Your Skill', highlight: true }
    ]
  },
  subheadline: 'Transform your career.',
  video: { url: '/videos/Background.webm' },
  buttons: {
    primary: { text: 'Apply Now', action: 'openModal' },
    secondary: { text: 'Download Brochure', url: '/brochure.pdf' }
  }
}
```

### 4. Analytics & Tracking

- **Google Tag Manager:** `GTM-5LFBM9P6`
- **Meta Pixel:** `3925754201017337`
- **UTM Parameter Tracking:** Captured and stored

### 5. Mentorship Program

- Multiple mentor profiles
- Booking system via `/eliteconnect/:mentorKey`
- Life transformation sessions

---

## 🚀 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 📋 Environment Configuration

### .env (Development)
```env
VITE_API_URL=http://localhost:3000
```

### .env.production
```env
VITE_API_URL=https://expertisoracademy.in
```

---

## 🎨 Styling Guidelines

### Tailwind Configuration

The project uses Tailwind CSS with custom configuration:

- **Font:** Inter (via `@fontsource/inter`)
- **Background:** Black (`bg-black`)
- **Text:** White (`text-white`)
- **Theme:** Dark mode by default

### Color Palette

| Usage | Color |
|-------|-------|
| Background | `#000000` |
| Text Primary | `#FFFFFF` |
| Accent | Custom per section |
| Error | `#EF4444` |

---

## 🔧 State Management

### CourseContext

Provides global state for:

```javascript
{
  courses,           // Array of course objects
  categories,        // Filter categories
  languages,         // Available languages
  selectedCategories,
  courseType,
  handleCourseClick, // Navigation handler
  scrollRef,         // Carousel scroll reference
  scrollLeft,        // Scroll functions
  scrollRight
}
```

### Usage

```jsx
import { CourseContext } from './context/CourseContextProvider';

const Component = () => {
  const { courses, handleCourseClick } = useContext(CourseContext);
  // ...
};
```

---

## 📦 Deployment

### Production Build

1. Run `npm run build`
2. Deploy `/dist` folder to web server
3. Configure PHP API on server
4. Set up MySQL database using `schema.sql`
5. Update `api/config.php` with database credentials

### Required Server Configuration

- PHP 7.4+
- MySQL 5.7+
- CORS enabled
- mod_rewrite for SPA routing

---

## 🔗 External Integrations

| Service | Purpose |
|---------|---------|
| Firebase | Authentication & backend |
| Google Tag Manager | Analytics |
| Meta Pixel | Facebook tracking |
| Zoho Forms | Lead capture (some pages) |
| YouTube | Video embeds |

---

## 📱 Responsive Design

The application is fully responsive with breakpoints:

| Breakpoint | Width |
|------------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Desktop | > 1024px |

---

## 🧪 Testing

Currently no automated tests. Recommended:

- Jest for unit tests
- React Testing Library for components
- Cypress for E2E tests

---

## 📝 Contributing

1. Create feature branch
2. Make changes
3. Test locally with `npm run dev`
4. Build and verify with `npm run build`
5. Submit pull request

---

## 📞 Support

For technical issues, contact the development team.

---

*This documentation is auto-generated and reflects the current state of the codebase.*
