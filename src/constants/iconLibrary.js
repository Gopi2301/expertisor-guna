import {
    Sparkles, Zap, Rocket, Star, Award, Trophy, Target,
    Lightbulb, Heart, TrendingUp, Users, BookOpen, GraduationCap,
    Code, Palette, Camera, Music, Video, Mic, Headphones,
    Globe, Map, Compass, Navigation, Briefcase, Coffee,
    Cpu, Database, Server, Cloud, Lock, Shield
} from 'lucide-react';

/**
 * Icon Library for CMS
 * Curated set of icons organized by category
 */

export const iconCategories = [
    {
        id: 'popular',
        name: 'Popular',
        icons: [
            { id: 'sparkles', name: 'Sparkles', component: Sparkles },
            { id: 'rocket', name: 'Rocket', component: Rocket },
            { id: 'star', name: 'Star', component: Star },
            { id: 'trophy', name: 'Trophy', component: Trophy },
            { id: 'award', name: 'Award', component: Award },
            { id: 'zap', name: 'Lightning', component: Zap },
            { id: 'heart', name: 'Heart', component: Heart },
            { id: 'target', name: 'Target', component: Target }
        ]
    },
    {
        id: 'education',
        name: 'Education',
        icons: [
            { id: 'graduation-cap', name: 'Graduation Cap', component: GraduationCap },
            { id: 'book-open', name: 'Book', component: BookOpen },
            { id: 'lightbulb', name: 'Lightbulb', component: Lightbulb },
            { id: 'users', name: 'Users', component: Users },
            { id: 'trending-up', name: 'Growth', component: TrendingUp }
        ]
    },
    {
        id: 'creative',
        name: 'Creative',
        icons: [
            { id: 'palette', name: 'Palette', component: Palette },
            { id: 'camera', name: 'Camera', component: Camera },
            { id: 'video', name: 'Video', component: Video },
            { id: 'music', name: 'Music', component: Music },
            { id: 'mic', name: 'Microphone', component: Mic },
            { id: 'headphones', name: 'Headphones', component: Headphones }
        ]
    },
    {
        id: 'technology',
        name: 'Technology',
        icons: [
            { id: 'code', name: 'Code', component: Code },
            { id: 'cpu', name: 'CPU', component: Cpu },
            { id: 'database', name: 'Database', component: Database },
            { id: 'server', name: 'Server', component: Server },
            { id: 'cloud', name: 'Cloud', component: Cloud }
        ]
    },
    {
        id: 'business',
        name: 'Business',
        icons: [
            { id: 'briefcase', name: 'Briefcase', component: Briefcase },
            { id: 'globe', name: 'Globe', component: Globe },
            { id: 'map', name: 'Map', component: Map },
            { id: 'compass', name: 'Compass', component: Compass },
            { id: 'navigation', name: 'Navigation', component: Navigation }
        ]
    },
    {
        id: 'security',
        name: 'Security',
        icons: [
            { id: 'shield', name: 'Shield', component: Shield },
            { id: 'lock', name: 'Lock', component: Lock }
        ]
    },
    {
        id: 'other',
        name: 'Other',
        icons: [
            { id: 'coffee', name: 'Coffee', component: Coffee }
        ]
    }
];

// Flatten all icons for easy search
export const allIcons = iconCategories.reduce((acc, category) => {
    return [...acc, ...category.icons];
}, []);

// Get icon by ID
export const getIconById = (id) => {
    return allIcons.find(icon => icon.id === id);
};

// Search icons
export const searchIcons = (query) => {
    if (!query) return allIcons;

    const lowerQuery = query.toLowerCase();
    return allIcons.filter(icon =>
        icon.name.toLowerCase().includes(lowerQuery) ||
        icon.id.toLowerCase().includes(lowerQuery)
    );
};

// Default icon
export const defaultIcon = {
    id: 'sparkles',
    name: 'Sparkles',
    component: Sparkles
};

export default {
    iconCategories,
    allIcons,
    getIconById,
    searchIcons,
    defaultIcon
};
