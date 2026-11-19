
export const GITHUB_URL = 'https://github.com/'; // TODO: apne project ka GitHub link

export const offerings = [
    { icon: 'mdi:book-open-page-variant-outline', title: 'Tutorials', text: 'Step-by-step guides that take you from idea to working code.' },
    { icon: 'mdi:lightbulb-on-outline', title: 'Deep dives', text: 'Longer reads that explain how and why things work under the hood.' },
    { icon: 'mdi:forum-outline', title: 'Stories & ideas', text: 'Lessons, opinions, and experiences from people who build things.' }
];

export const missionVision = [
    {
        icon: 'mdi:rocket-launch-outline',
        title: 'Our mission',
        text: 'To empower people through accessible, high-quality content that educates, inspires, and connects. We want to be a trusted source of information and a catalyst for positive change.'
    },
    {
        icon: 'mdi:eye-outline',
        title: 'Our vision',
        text: 'To become a trusted and engaging place for knowledge sharing, where every voice matters and every story has the power to make a difference in someone’s life.'
    }
];

export const values = [
    { icon: 'mdi:shield-check-outline', title: 'Integrity', text: 'Honesty and transparency in everything we publish.' },
    { icon: 'mdi:lightbulb-on-outline', title: 'Innovation', text: 'Constantly evolving to meet our readers’ needs.' },
    { icon: 'mdi:account-group-outline', title: 'Community', text: 'Building connections that matter and last.' },
    { icon: 'mdi:star-outline', title: 'Excellence', text: 'Commitment to quality in every piece of content.' }
];

export const team = [
    {
        name: 'Sarah Johnson',
        role: 'Founder & Editor-in-Chief',
        bio: 'Passionate about storytelling and community building with 10+ years of experience.',
        image: 'https://images.unsplash.com/photo-1625333899639-2c78e039f51d?q=80&w=800'
    },
    {
        name: 'Michael Chen',
        role: 'Head of Content',
        bio: 'Creative writer and strategist dedicated to delivering engaging and impactful content.',
        image: 'https://images.unsplash.com/photo-1600724818416-5ee76984c8d2?q=80&w=800'
    },
    {
        name: 'Robinson Rodriguez',
        role: 'Community Manager',
        bio: 'Connecting readers and fostering meaningful conversations within our community.',
        image: 'https://images.unsplash.com/photo-1761393255459-862745aa7c31?q=80&w=800'
    }
];

export const stack = [
    { name: 'React', icon: 'logos:react', text: 'Component-based UI' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', text: 'Styling and dark mode' },
    { name: 'Appwrite', icon: 'logos:appwrite', text: 'Auth and database' },
    { name: 'React Router', icon: 'simple-icons:reactrouter', text: 'Client-side routing' },
    { name: 'Vite', icon: 'logos:vitejs', text: 'Fast dev and build' }
];

export const faqs = [
    { q: 'How often do you publish?', a: 'New articles go live every week. Subscribe to the newsletter to get them in your inbox.' },
    { q: 'Can I write for CodeRokers?', a: 'Yes. Create a free account, then open Create Blog from your profile menu and share your idea with the community.' },
    { q: 'Is it free to read?', a: 'Every article on CodeRokers is free to read. You only need an account to write or save things.' },
    { q: 'How do I unsubscribe from the newsletter?', a: 'Every email has an unsubscribe link at the bottom. One click and you are out, no questions asked.' }
];

// Hero ke code card ke liye tokens: [text, colorClass]
export const codeLines = [
    [['const ', 'text-purple-400'], ['codeRokers ', 'text-sky-400'], ['= {', 'text-slate-200']],
    [['  mission: ', 'text-slate-200'], ["'share what we learn'", 'text-emerald-400'], [',', 'text-slate-400']],
    [['  topics: ', 'text-slate-200'], ["['code', 'design', 'life']", 'text-emerald-400'], [',', 'text-slate-400']],
    [['  stack: ', 'text-slate-200'], ["['React', 'Appwrite']", 'text-emerald-400'], [',', 'text-slate-400']],
    [['  publishing: ', 'text-slate-200'], ["'every week'", 'text-emerald-400'], [',', 'text-slate-400']],
    [['};', 'text-slate-200']]
];
