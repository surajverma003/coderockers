import { BookOpen, Info, LayoutGrid, Mail } from 'lucide-react';
import { focusRing } from './homeData';

export const navLinks = [
    { name: 'Blogs', href: '/blogs', icon: BookOpen },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Categories', href: '/categories', icon: LayoutGrid },
    { name: 'Newsletter', href: '/newsletter', icon: Mail },
];

export const THEME_KEY = 'theme'; // localStorage key
export const SCROLL_SHADOW_THRESHOLD = 8; // itna scroll karne par navbar par shadow aaye

/* ---------------------------- Style classes ---------------------------- */

export const iconBtn = `relative w-10 h-10 shrink-0 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors ${focusRing}`;

// NavLink in dono ko { isActive } ke saath call karta hai
export const desktopLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${focusRing} ${isActive
        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
    }`;

export const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${focusRing} ${isActive
        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;
