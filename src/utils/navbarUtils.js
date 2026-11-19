import { THEME_KEY } from '../data/navbarData';

// Theme: saved choice > system preference
export const getInitialTheme = () => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const saveTheme = (isDark) => localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
