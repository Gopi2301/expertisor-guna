/**
 * CMS Storage Utilities
 * LocalStorage-based persistence for template management
 */

const STORAGE_KEY = 'cms_templates';

/**
 * Generate a unique ID
 */
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Generate a URL-friendly slug from text
 */
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

/**
 * Get all templates from storage
 */
export const getTemplates = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading templates:', error);
        return [];
    }
};

/**
 * Get a single template by ID
 */
export const getTemplate = (id) => {
    const templates = getTemplates();
    return templates.find(t => t.id === id) || null;
};

/**
 * Get a published template by slug
 */
export const getPublishedTemplateBySlug = (slug) => {
    const templates = getTemplates();
    return templates.find(t => t.slug === slug && t.status === 'published') || null;
};

/**
 * Save templates to storage
 */
const saveTemplates = (templates) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
        return true;
    } catch (error) {
        console.error('Error saving templates:', error);
        return false;
    }
};

/**
 * Create a new template with default structure
 */
export const createTemplate = (name) => {
    const templates = getTemplates();
    const slug = generateSlug(name);

    // Check for duplicate slugs
    let finalSlug = slug;
    let counter = 1;
    while (templates.some(t => t.slug === finalSlug)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
    }

    const newTemplate = {
        id: generateId(),
        name,
        slug: finalSlug,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sections: {
            hero: {
                badge: {
                    emoji: '🤔',
                    text: 'Learn from Industry Expert with 20+ years of experience'
                },
                headline: {
                    parts: [
                        { text: 'Transform your ', highlight: false },
                        { text: 'mindset', highlight: true },
                        { text: ', ', highlight: false },
                        { text: 'career', highlight: true },
                        { text: ', and ', highlight: false },
                        { text: 'business', highlight: true },
                        { text: ' in ', highlight: false },
                        { text: '90 days', highlight: true },
                        { text: ' with my personalized transformation framework.', highlight: false }
                    ]
                },
                subheadline: 'Transform your mindset, career, and business in 90 days with my personalized transformation framework.',
                video: {
                    url: '/videos/Background.webm',
                    type: 'video/webm'
                },
                buttons: {
                    primary: {
                        text: 'Apply Now',
                        icon: 'arrow-right',
                        action: 'openModal'
                    },
                    secondary: {
                        text: 'Download Brochure',
                        icon: 'download',
                        url: '/brochure.pdf'
                    }
                },
                features: [
                    { icon: 'headset', text: 'Lifetime support' },
                    { icon: 'lock', text: 'Private community' },
                    { icon: 'file-text', text: 'Templates & Tools' }
                ]
            },
            form: {
                title: 'APPLY NOW',
                subtitle: 'Fill in the details below to apply.',
                fields: [
                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'yourname@gmail.com', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter WhatsApp Number', required: true },
                    { name: 'qualification', label: 'Educational qualification', type: 'text', placeholder: 'Bachelor of Engineering', required: false },
                    { name: 'profile', label: 'Current Profile', type: 'select', placeholder: 'Select', required: false, options: ['Student', 'Working Professional', 'Business Owner', 'Other'] }
                ],
                submitButton: 'Submit',
                formAction: ''
            }
        }
    };

    templates.push(newTemplate);
    saveTemplates(templates);
    return newTemplate;
};

/**
 * Update an existing template
 */
export const updateTemplate = (id, updates) => {
    const templates = getTemplates();
    const index = templates.findIndex(t => t.id === id);

    if (index === -1) {
        return null;
    }

    templates[index] = {
        ...templates[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    saveTemplates(templates);
    return templates[index];
};

/**
 * Delete a template
 */
export const deleteTemplate = (id) => {
    const templates = getTemplates();
    const filtered = templates.filter(t => t.id !== id);

    if (filtered.length === templates.length) {
        return false;
    }

    saveTemplates(filtered);
    return true;
};

/**
 * Publish a template
 */
export const publishTemplate = (id) => {
    return updateTemplate(id, { status: 'published' });
};

/**
 * Unpublish a template (revert to draft)
 */
export const unpublishTemplate = (id) => {
    return updateTemplate(id, { status: 'draft' });
};

/**
 * Duplicate a template
 */
export const duplicateTemplate = (id) => {
    const template = getTemplate(id);
    if (!template) return null;

    const templates = getTemplates();
    const newName = `${template.name} (Copy)`;
    const slug = generateSlug(newName);

    let finalSlug = slug;
    let counter = 1;
    while (templates.some(t => t.slug === finalSlug)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
    }

    const newTemplate = {
        ...template,
        id: generateId(),
        name: newName,
        slug: finalSlug,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    templates.push(newTemplate);
    saveTemplates(templates);
    return newTemplate;
};

export default {
    getTemplates,
    getTemplate,
    getPublishedTemplateBySlug,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    publishTemplate,
    unpublishTemplate,
    duplicateTemplate
};

/**
 * Export all templates as JSON for static deployment
 */
export const exportTemplatesAsJSON = () => {
    const templates = getTemplates();
    const publishedTemplates = templates.filter(t => t.status === 'published');

    const exportData = {
        exportedAt: new Date().toISOString(),
        templates: publishedTemplates
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'cms-templates.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return publishedTemplates.length;
};

/**
 * Import templates from JSON file
 */
export const importTemplatesFromJSON = (jsonData) => {
    try {
        const data = JSON.parse(jsonData);
        if (data.templates && Array.isArray(data.templates)) {
            saveTemplates(data.templates);
            return data.templates.length;
        }
        return 0;
    } catch (error) {
        console.error('Error importing templates:', error);
        return 0;
    }
};

/**
 * Load published template from static JSON file (for production)
 * Falls back to API if static file not available
 */
export const getPublishedTemplateFromStatic = async (slug) => {
    try {
        // Try loading from static JSON file first
        const response = await fetch('/cms-templates.json');
        if (response.ok) {
            const data = await response.json();
            const template = data.templates?.find(t => t.slug === slug && t.status === 'published');
            if (template) return template;
        }
    } catch (error) {
        // Static file not available, will try API next
        console.log('Static templates not found, trying API');
    }

    // Fallback to API (for dynamic environments)
    try {
        const apiResponse = await fetch(`/api/courses.php?slug=${slug}&published=1`);
        if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            if (apiData.success && apiData.data) {
                return apiData.data;
            }
        }
    } catch (apiError) {
        console.warn('API fetch failed:', apiError);
    }

    // Final fallback to localStorage (for local development)
    return getPublishedTemplateBySlug(slug);
};
