# Landing Page Template Guide

## Quick Start for Frontend Developers

### 📁 **File Structure**
```
src/pages/LandingPages/
├── TransformationTemplate.jsx       (Template 1)
├── LifeTransformationTemplate.jsx   (Template 2)
└── YourNewTemplate.jsx              (Template 3 - Create this)
```

---

## 🆕 **Creating a New Template**

### **Step 1: Copy Existing Template**
```bash
cp src/pages/LandingPages/TransformationTemplate.jsx \
   src/pages/LandingPages/YourNewTemplate.jsx
```

### **Step 2: Update Component Name**
```javascript
// Change this:
const TransformationTemplate = ({ data }) => {

// To this:
const YourNewTemplate = ({ data }) => {

// And at the bottom:
export default YourNewTemplate;
```

### **Step 3: Design Your Layout**
Use the `data` prop - it contains all CMS fields:

```javascript
const YourNewTemplate = ({ data }) => {
    const {
        hero,        // { title, subtitle, badge, guarantee }
        video,       // { url, embedUrl, thumbnail }
        ctas,        // { primary, secondary }
        features,    // { title, items: [] }
        testimonials // { title, items: [] }
    } = data;

    return (
        <div className="bg-black text-white">
            {/* Your custom design here */}
        </div>
    );
};
```

### **Step 4: Register Template**
Edit `src/pages/LandingPage.jsx`:

```javascript
// Add import
import YourNewTemplate from './LandingPages/YourNewTemplate';

// Add to templates object
const templates = {
    'template1': TransformationTemplate,
    'template2': LifeTransformationTemplate,
    'template3': YourNewTemplate,  // ← Add this
};
```

### **Step 5: Test Locally**
```bash
npm run dev
# Visit: http://localhost:5173/courses/test-slug
```

**Done!** ✅ Template is ready to use in CMS.

---

## ✏️ **Updating Existing Template**

### **Safe Update Process:**

1. **Edit the template file directly**
   ```bash
   # Example: Update Template 1
   code src/pages/LandingPages/TransformationTemplate.jsx
   ```

2. **Make your changes**
   - Modify JSX structure
   - Update styling
   - Add/remove sections

3. **Test with real course data**
   - Login to CMS
   - Edit a course using this template
   - Preview changes

4. **Deploy**
   ```bash
   npm run build
   # Upload to server
   ```

**⚠️ Important:** Changes apply to ALL courses using that template!

---

## 🎨 **Template Data Structure**

### **Available CMS Fields:**
```javascript
{
  hero: {
    title: "Course Title",
    subtitle: "Tagline",
    badge: "Limited Seats",
    guarantee: "100% Job Guarantee"
  },
  video: {
    url: "https://youtube.com/watch?v=...",
    embedUrl: "https://youtube.com/embed/...",
    thumbnail: "https://..."
  },
  ctas: {
    primary: { text: "Apply Now", enabled: true },
    secondary: { text: "Download Brochure", url: "...", enabled: true }
  },
  features: {
    title: "What You'll Learn",
    items: [
      { icon: "⚡", title: "Feature 1", description: "..." },
      // ...
    ]
  },
  testimonials: {
    title: "Success Stories",
    items: [
      { name: "John", role: "Student", text: "...", image: "..." },
      // ...
    ]
  }
}
```

---

## 🚫 **What NOT to Touch**

❌ **Don't modify:**
- `src/pages/LandingPage.jsx` (except adding new template)
- `src/pages/CMS/TemplateTab.jsx` (CMS editor)
- Database structure
- API endpoints

✅ **Safe to modify:**
- Template files in `src/pages/LandingPages/`
- Styling (Tailwind classes)
- Layout structure
- Component logic

---

## 📋 **Checklist for New Template**

- [ ] Copy existing template file
- [ ] Rename component
- [ ] Design custom layout
- [ ] Use all CMS data fields
- [ ] Test responsive design (mobile/desktop)
- [ ] Register in `LandingPage.jsx`
- [ ] Test with sample course
- [ ] Commit to git
- [ ] Deploy to server

---

## 🔍 **Testing Your Template**

### **Local Testing:**
```bash
# 1. Start dev server
npm run dev

# 2. Create test course in CMS
# - Select your template
# - Fill all fields
# - Save

# 3. Visit course page
# http://localhost:5173/courses/your-course-slug
```

### **Production Testing:**
```bash
# 1. Build
npm run build

# 2. Upload to server
# (via cPanel or FTP)

# 3. Test on live site
# https://expertisoracademy.in/courses/your-course-slug
```

---

## 💡 **Pro Tips**

1. **Copy Template 1 or 2** - They have all the boilerplate
2. **Keep data prop structure** - Don't change CMS field names
3. **Use Tailwind** - Consistent with rest of site
4. **Mobile-first** - Design for mobile, then desktop
5. **Test all fields** - Ensure every CMS field displays correctly
6. **Reusable components** - Extract common sections

---

## 🆘 **Common Issues**

**Template not showing in CMS?**
→ Check `LandingPage.jsx` - template registered?

**Data not displaying?**
→ Check field names match CMS structure

**Styling broken?**
→ Tailwind classes correct? Check console for errors

**Changes not reflecting?**
→ Hard refresh (Cmd+Shift+R) or rebuild

---

## 📞 **Need Help?**

- Check existing templates for reference
- Review `src/pages/CMS/TemplateTab.jsx` for CMS structure
- Test with sample data first
- Ask before modifying core files
