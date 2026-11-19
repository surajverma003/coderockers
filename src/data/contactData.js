
export const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

// TODO: apni real details yahan daal do
export const contactInfo = [
    { icon: 'mdi:email-outline', label: 'Email', value: 'hello@ourblog.com', href: 'mailto:hello@ourblog.com' },
    { icon: 'mdi:phone-outline', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: 'mdi:map-marker-outline', label: 'Location', value: 'San Francisco, CA' },
];

// TODO: apne real profile URLs daal do
export const socials = [
    { icon: 'simple-icons:x', label: 'X (Twitter)', href: 'https://x.com' },
    { icon: 'mdi:instagram', label: 'Instagram', href: 'https://instagram.com' },
    { icon: 'mdi:linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: 'mdi:github', label: 'GitHub', href: 'https://github.com' },
];

export const topics = ['General question', 'Feedback', 'Collaboration', 'Report a bug'];
export const fieldClass = 'w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition';
export const labelClass = 'block text-sm font-semibold text-slate-900 dark:text-white mb-2';