// Profile page ka fixed data aur Tailwind classes. Yahan koi logic ya React state nahi.

export const BIO_MAX = 300;

export const TABS = [
    { id: 'profile', label: 'Profile', icon: 'mdi:account-outline' },
    { id: 'account', label: 'Account', icon: 'mdi:card-account-details-outline' },
    { id: 'security', label: 'Security', icon: 'mdi:shield-lock-outline' },
    { id: 'danger', label: 'Delete account', icon: 'mdi:alert-outline' },
];

export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950';

export const inputCls = 'w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed';

export const cardCls = 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';

export const labelCls = 'mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300';
