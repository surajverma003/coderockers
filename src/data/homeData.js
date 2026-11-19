/* ----------------------------- Static data ----------------------------- */

export const pulse = 'animate-pulse bg-slate-200 dark:bg-slate-800';

export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950';

export const cardClass = 'group relative flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1';


// Demo testimonials. Aage comments/reviews database se aayenge to is array ki jagah wahi data do.
export const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'Software Developer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        text: 'CodeRokers has become my go-to source for tech articles. The quality of content is exceptional!'
    },
    {
        name: 'Michael Chen',
        role: 'Product Manager',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        text: 'I love how diverse the topics are. From coding tutorials to lifestyle tips, they cover it all.'
    },
    {
        name: 'Emily Davis',
        role: 'UX Designer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        text: 'The newsletter is amazing! I always look forward to the weekly digest in my inbox.'
    },
    {
        name: 'Priya Sharma',
        role: 'Frontend Engineer',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        text: 'The React and Tailwind tutorials are clear and practical. I shipped my first portfolio site after reading them.'
    },
    {
        name: 'Arjun Mehta',
        role: 'Full Stack Developer',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        text: 'Short, honest articles without the fluff. I read one every morning with my chai.'
    },
    {
        name: 'Olivia Brown',
        role: 'Content Strategist',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        text: 'The writing is easy to follow even when the topic is technical. Great mix of categories too.'
    }
];

// Jis post mein image nahi hai uske liye gradient placeholder
export const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#2563eb'/><stop offset='1' stop-color='#4f46e5'/></linearGradient></defs><rect width='900' height='600' fill='url(#g)'/></svg>"
)}`;

// Hero ke code-card ke liye tokens: [text, colorClass]
export const codeLines = [
    [['import ', 'text-purple-400'], ['{ useState } ', 'text-slate-200'], ['from ', 'text-purple-400'], ["'react'", 'text-emerald-400']],
    [],
    [['export default function ', 'text-purple-400'], ['Post', 'text-sky-400'], ['() {', 'text-slate-200']],
    [['  const ', 'text-purple-400'], ['[saved, setSaved] ', 'text-slate-200'], ['= ', 'text-slate-400'], ['useState', 'text-sky-400'], ['(false)', 'text-slate-200']],
    [],
    [['  return ', 'text-purple-400'], ['<Bookmark ', 'text-sky-400'], ['on', 'text-amber-300'], ['={saved} ', 'text-slate-200'], ['/>', 'text-sky-400']],
    [['}', 'text-slate-200']]
];

/* ------------------------- Home page: config ------------------------- */

export const DASH = '—';

// Kitne items kahan dikhane hain
export const HOME_LIMITS = { categories: 6, featured: 3, latest: 6, writers: 4, heroAvatars: 6 };

// Stats strip (value homeUtils.buildStats me nikalta hai)
export const STAT_ITEMS = [
    { key: 'posts', label: 'Articles published', icon: 'mdi:post-outline' },
    { key: 'writers', label: 'Writers', icon: 'mdi:pen' },
    { key: 'categories', label: 'Categories', icon: 'mdi:shape-outline' },
    { key: 'views', label: 'Total views', icon: 'mdi:eye-outline' }
];

// Testimonials slider autoplay (ms)
export const TESTIMONIAL_AUTOPLAY_MS = 5000;
