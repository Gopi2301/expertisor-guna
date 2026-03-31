/**
 * API Client Service
 * Uses localStorage for development, PHP API for production
 */

import { getAuthHeaders } from './auth';

// Check if we should use local storage (development) or API (production)
// Forcing API usage even in dev to test backend integration
const USE_LOCAL_STORAGE = false; // !import.meta.env.PROD;

// Storage keys
const COURSES_KEY = 'cms_courses';
const CATEGORIES_KEY = 'cms_categories';

// API base URL - uses environment variable or defaults to /api
const envUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const API_BASE = envUrl
    ? (envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`)
    : '/api';

// ================================
// LOCAL STORAGE HELPERS
// ================================

const getStoredCourses = () => {
    try {
        return JSON.parse(localStorage.getItem(COURSES_KEY)) || [];
    } catch {
        return [];
    }
};

const saveStoredCourses = (courses) => {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
};

const getStoredCategories = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
        if (!stored || stored.length === 0) {
            // Seed default categories
            const defaults = [
                { id: 1, name: 'Technology', slug: 'technology', display_order: 1, course_count: 0 },
                { id: 2, name: 'Business', slug: 'business', display_order: 2, course_count: 0 },
                { id: 3, name: 'Civil', slug: 'civil', display_order: 3, course_count: 0 },
                { id: 4, name: 'Mechanical', slug: 'mechanical', display_order: 4, course_count: 0 },
                { id: 5, name: 'Marketing', slug: 'marketing', display_order: 5, course_count: 0 }
            ];
            localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaults));
            return defaults;
        }
        return stored;
    } catch {
        return [];
    }
};

const saveStoredCategories = (categories) => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

const generateId = () => Date.now();

const generateSlug = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// ================================
// DEFAULT COURSE DATA
// ================================

export const defaultCourseData = {
    title: '',
    slug: '',
    status: 'DRAFT',
    category_id: null,
    description: '',
    template_id: null, // Template ID (e.g., 'transformation-framework')
    template_data: null, // Template-specific customization data
    mentor_name: '',
    mentor_image: '',
    instructor: '',
    rating: 4.9,
    reviews_count: 0,
    student_count: '0+',
    language: 'Tamil',
    duration: '0h',
    level: 'All levels',
    thumbnail: '',
    deal_name: '',
    deal_course: '',
    deal_course_id: '',
    hero_data: {
        headline: {
            parts: [
                { text: 'Transform your', highlight: false },
                { text: 'mindset, career,', highlight: true },
                { text: 'and', highlight: false },
                { text: 'business', highlight: true },
                { text: 'in', highlight: false },
                { text: '90 days', highlight: true },
                { text: 'with my personalized transformation framework.', highlight: false }
            ]
        },
        guarantee: "If you don't get results, I'll work with you again for free until you get results.",
        video: { embedUrl: '', thumbnail: '' },
        buttons: {
            primary: { text: 'Apply Now', action: 'openModal' },
            secondary: { text: 'Download Brochure', url: '', enabled: false }
        },
        features: {
            title: 'What You will get in this 90 days personalized transformation?',
            items: [
                { text: '1:1 Mentorship Calls with Raghulan Gowthamian' },
                { text: 'Monthly Group Mastermind Calls with the Elite Community' },
                { text: 'A Personalized Strategy Blueprint for Your Mindset, Career, and Business' },
                { text: 'Continuous Support for Real Transformation' }
            ]
        },
        cta: {
            text: 'Apply Now',
            seatsRemaining: 5
        }
    },
    form_data: {
        title: 'STRUGGLING TO FIGURE IT OUT ALONE?',
        subtitle: 'Get Expert 1:1 Guidance',
        formAction: '',
        submitButton: 'Get Fast Help'
    }
};

// ================================
// COURSES API
// ================================

export const getAllCourses = async () => {
    if (USE_LOCAL_STORAGE) {
        return getStoredCourses();
    }
    const res = await fetch(`${API_BASE}/courses.php`);
    const data = await res.json();
    return data.success ? data.data : [];
};

export const getPublishedCourses = async () => {
    if (USE_LOCAL_STORAGE) {
        return getStoredCourses().filter(c => c.status === 'PUBLISHED');
    }
    const res = await fetch(`${API_BASE}/courses.php?published=1`);
    const data = await res.json();
    return data.success ? data.data : [];
};

export const getCourse = async (id) => {
    if (USE_LOCAL_STORAGE) {
        return getStoredCourses().find(c => c.id === parseInt(id)) || null;
    }
    const res = await fetch(`${API_BASE}/courses.php?id=${id}`);
    const data = await res.json();
    return data.success ? data.data : null;
};

export const getCourseBySlug = async (slug) => {
    if (USE_LOCAL_STORAGE) {
        return getStoredCourses().find(c => c.slug === slug && c.status === 'PUBLISHED') || null;
    }
    const res = await fetch(`${API_BASE}/courses.php?slug=${slug}`);
    const data = await res.json();
    return data.success ? data.data : null;
};

export const createCourse = async (courseData) => {
    if (USE_LOCAL_STORAGE) {
        const courses = getStoredCourses();
        const slug = generateSlug(courseData.title || 'new-course');
        const newCourse = {
            ...defaultCourseData,
            ...courseData,
            id: generateId(),
            slug: courses.some(c => c.slug === slug) ? `${slug}-${Date.now()}` : slug,
            status: 'DRAFT',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        courses.push(newCourse);
        saveStoredCourses(courses);
        return newCourse;
    }
    const res = await fetch(`${API_BASE}/courses.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(courseData)
    });
    const data = await res.json();
    if (!data.success) {
        throw new Error(data.error || 'Failed to create course');
    }
    return data.data;
};

export const updateCourse = async (id, updates) => {
    if (USE_LOCAL_STORAGE) {
        const courses = getStoredCourses();
        const index = courses.findIndex(c => c.id === parseInt(id));
        if (index === -1) return null;
        courses[index] = { ...courses[index], ...updates, updated_at: new Date().toISOString() };
        saveStoredCourses(courses);
        return courses[index];
    }
    const res = await fetch(`${API_BASE}/courses.php?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!data.success) {
        throw new Error(data.error || 'Failed to update course');
    }
    return data.data;
};

export const publishCourse = async (id) => {
    return updateCourse(id, { status: 'PUBLISHED', published_at: new Date().toISOString() });
};

export const unpublishCourse = async (id) => {
    return updateCourse(id, { status: 'DRAFT', published_at: null });
};

export const scheduleCourse = async (id, scheduledDate) => {
    return updateCourse(id, {
        status: 'SCHEDULED',
        scheduled_publish_at: scheduledDate
    });
};

export const archiveCourse = async (id) => {
    return updateCourse(id, {
        status: 'ARCHIVED',
        archived_at: new Date().toISOString()
    });
};

export const restoreCourse = async (id) => {
    return updateCourse(id, {
        status: 'DRAFT',
        archived_at: null
    });
};

export const deleteCourse = async (id) => {
    if (USE_LOCAL_STORAGE) {
        const courses = getStoredCourses().filter(c => c.id !== parseInt(id));
        saveStoredCourses(courses);
        return true;
    }
    const res = await fetch(`${API_BASE}/courses.php?id=${id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeaders() }
    });
    const data = await res.json();
    return data.success;
};

// ================================
// FILE UPLOAD
// ================================

export const uploadFile = async (file) => {
    if (USE_LOCAL_STORAGE) {
        // Mock upload for local storage mode
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve({
                    url: reader.result, // Data URL
                    filename: file.name,
                    original_name: file.name
                });
            };
            reader.readAsDataURL(file);
        });
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE}/upload.php`, {
        method: 'POST',
        headers: { ...getAuthHeaders() }, // Content-Type is auto-set for FormData
        body: formData
    });

    const data = await res.json();
    if (!data.success) {
        throw new Error(data.error || 'Upload failed');
    }
    return data.data;
};

// ================================
// CATEGORIES API
// ================================

export const getCategories = async () => {
    if (USE_LOCAL_STORAGE) {
        const categories = getStoredCategories();
        const courses = getStoredCourses();
        // Update course counts
        return categories.map(cat => ({
            ...cat,
            course_count: courses.filter(c => c.category_id === cat.id && c.status === 'PUBLISHED').length
        }));
    }
    const res = await fetch(`${API_BASE}/categories.php`);
    const data = await res.json();
    return data.success ? data.data : [];
};

export const getCategory = async (id) => {
    if (USE_LOCAL_STORAGE) {
        return getStoredCategories().find(c => c.id === parseInt(id)) || null;
    }
    const res = await fetch(`${API_BASE}/categories.php?id=${id}`);
    const data = await res.json();
    return data.success ? data.data : null;
};

export const createCategory = async (name) => {
    if (USE_LOCAL_STORAGE) {
        const categories = getStoredCategories();
        const newCat = {
            id: generateId(),
            name,
            slug: generateSlug(name),
            display_order: categories.length + 1,
            course_count: 0,
            created_at: new Date().toISOString()
        };
        categories.push(newCat);
        saveStoredCategories(categories);
        return newCat;
    }
    const res = await fetch(`${API_BASE}/categories.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    const data = await res.json();
    return data.success ? data.data : null;
};

export const updateCategory = async (id, updates) => {
    if (USE_LOCAL_STORAGE) {
        const categories = getStoredCategories();
        const index = categories.findIndex(c => c.id === parseInt(id));
        if (index === -1) return null;
        if (updates.name) {
            updates.slug = generateSlug(updates.name);
        }
        categories[index] = { ...categories[index], ...updates };
        saveStoredCategories(categories);
        return categories[index];
    }
    const res = await fetch(`${API_BASE}/categories.php?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!data.success) {
        throw new Error(data.error || 'Failed to update category');
    }
    return data.data;
};

export const deleteCategory = async (id) => {
    if (USE_LOCAL_STORAGE) {
        const courses = getStoredCourses();
        if (courses.some(c => c.category_id === parseInt(id))) {
            throw new Error('Cannot delete category with courses');
        }
        const categories = getStoredCategories().filter(c => c.id !== parseInt(id));
        saveStoredCategories(categories);
        return true;
    }
    const res = await fetch(`${API_BASE}/categories.php?id=${id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeaders() }
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    return true;
};

// ================================
// DUPLICATE COURSE
// ================================

export const duplicateCourse = async (id) => {
    const original = await getCourse(id);
    if (!original) throw new Error('Course not found');

    const { id: _, created_at, updated_at, published_at, ...courseData } = original;
    return createCourse({
        ...courseData,
        title: `${original.title} (Copy)`,
        slug: `${original.slug}-copy`,
        status: 'DRAFT'
    });
};

// ================================
// LEADS STORAGE
// ================================

const LEADS_KEY = 'cms_leads';

const getStoredLeads = () => {
    try {
        return JSON.parse(localStorage.getItem(LEADS_KEY)) || [];
    } catch {
        return [];
    }
};

const saveStoredLeads = (leads) => {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
};

export const saveLead = (courseId, leadData) => {
    const leads = getStoredLeads();
    leads.push({
        id: generateId(),
        course_id: courseId,
        ...leadData,
        submitted_at: new Date().toISOString()
    });
    saveStoredLeads(leads);
    return leads[leads.length - 1];
};

export const getLeads = async (courseId = null) => {
    const leads = getStoredLeads();
    if (courseId) {
        return leads.filter(l => l.course_id === parseInt(courseId));
    }
    return leads;
};

export const exportLeadsCSV = async (courseId = null) => {
    const leads = await getLeads(courseId);
    const courses = await getAllCourses();

    if (leads.length === 0) return null;

    // Build CSV header
    const headers = ['ID', 'Course', 'Name', 'Email', 'Phone', 'Submitted At'];

    // Build CSV rows
    const rows = leads.map(lead => {
        const course = courses.find(c => c.id === lead.course_id);
        return [
            lead.id,
            course?.title || 'Unknown',
            lead.name || '',
            lead.email || '',
            lead.phone || '',
            lead.submitted_at
        ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    return csv;
};

export const clearLeads = async () => {
    saveStoredLeads([]);
    return true;
};

export default {
    getAllCourses,
    getPublishedCourses,
    getCourse,
    getCourseBySlug,
    createCourse,
    updateCourse,
    publishCourse,
    unpublishCourse,
    deleteCourse,
    duplicateCourse,
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadFile,
    saveLead,
    getLeads,
    exportLeadsCSV,
    clearLeads,
    defaultCourseData
};
