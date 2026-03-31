/**
 * CMS Templates Configuration
 * Defines available templates for course landing pages
 */

export const TEMPLATES = {
    'transformation-framework': {
        id: 'transformation-framework',
        name: 'Transformation Framework',
        description: '90-day transformation landing page with guarantee badge',
        thumbnail: '/templates/transformation-preview.png',
        component: 'TransformationTemplate',
        defaultData: {
            heading: {
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
            guarantee: {
                text: "If you don't get results, I'll work with you again for free until you get results."
            },
            video: {
                thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
                embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            backgroundImage: 'https://iili.io/f7cN2St.md.png',
            ctas: {
                primary: { text: 'Apply Now', action: 'openModal' },
                secondary: { text: 'Download Brochure', url: '' }
            },
            form: {
                title: 'STRUGGLING to figure it out alone?',
                subtitle: 'Get Expert 1:1 Guidance',
                fields: [
                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your Name', required: true },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'yourname@gmail.com', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter WhatsApp Number', required: true },
                    { name: 'education', label: 'Educational qualification', type: 'text', placeholder: 'Bachelor of Engineering', required: false },
                    { name: 'profile', label: 'Current Profile', type: 'select', options: ['Select', 'Student', 'Professional', 'Entrepreneur'], required: false }
                ],
                submitButton: 'Get Fast Help',
                formAction: ''
            }
        }
    }
};

export const getTemplate = (templateId) => {
    return TEMPLATES[templateId] || null;
};

export const getAllTemplates = () => {
    return Object.values(TEMPLATES);
};

export default TEMPLATES;
