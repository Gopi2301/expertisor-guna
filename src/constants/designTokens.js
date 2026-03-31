/**
 * Design Tokens
 * Centralized design system constants
 */

export const colors = {
    // Primary Colors
    primary: '#FFF200',
    primaryDark: '#FFD500',
    primaryLight: '#FFFF66',

    // Background Colors
    background: '#000000',
    surface: '#111111',
    surfaceHover: '#1A1A1A',

    // Text Colors
    text: {
        primary: '#FFFFFF',
        secondary: '#A3A3A3',
        tertiary: '#737373',
        disabled: '#525252'
    },

    // Semantic Colors
    success: '#34D399',
    error: '#F87171',
    warning: '#FB923C',
    info: '#60A5FA',

    // Border Colors
    border: {
        default: 'rgba(255, 255, 255, 0.1)',
        hover: 'rgba(255, 255, 255, 0.2)',
        focus: 'rgba(255, 242, 0, 0.5)'
    }
};

export const fonts = {
    heading: "'Clash Display Variable', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace"
};

export const fontSizes = {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem'  // 60px
};

export const spacing = {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
    '2xl': '4rem',  // 64px
    '3xl': '6rem',  // 96px
    '4xl': '8rem'   // 128px
};

export const borderRadius = {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px'
};

export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(255, 242, 0, 0.3)'
};

export const transitions = {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
    slower: '500ms ease-in-out'
};

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
};

export const zIndex = {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
};

// Helper function to get color with opacity
export const withOpacity = (color, opacity) => {
    // Convert hex to rgba
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default {
    colors,
    fonts,
    fontSizes,
    spacing,
    borderRadius,
    shadows,
    transitions,
    breakpoints,
    zIndex,
    withOpacity
};
