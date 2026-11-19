// AdminDashboard ki constants

// Blogs ka collection: CreateBlog aur ViewBlog bhi yahi ("blogpost") use karte hain.
// (Pehle yahan 'blogs' likha tha, jo galat tha, isliye publish/delete fail ho sakte the.)
export const BLOGS_COLLECTION_ID = 'blogpost';

export const ROWS_SHOWN = 8; // "Your posts" me ek baar me kitni rows
export const TOP_POSTS_LIMIT = 5; // "Most viewed" me kitni posts
export const SKELETON_ROWS = 4; // Loading ke time kitni placeholder rows

/* ------------------------------ Style classes ------------------------------ */

export const cardClass = 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';

export const iconBtn = 'w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

/* ------------------------------ Stat cards / tabs ------------------------------ */

// key = adminDashboardUtils.buildStatCards me value yahin se nikalta hai
export const STAT_CARDS = [
    { key: 'total', title: 'Total posts', icon: 'mdi:post-outline', tone: 'bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400' },
    { key: 'published', title: 'Published', icon: 'mdi:check-circle-outline', tone: 'bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400' },
    { key: 'drafts', title: 'Drafts', icon: 'mdi:file-edit-outline', tone: 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400' },
    { key: 'views', title: 'Total views', icon: 'mdi:eye-outline', tone: 'bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400' },
];

export const FILTER_TABS = [
    { id: 'all', label: 'All', statKey: 'total' },
    { id: 'published', label: 'Published', statKey: 'published' },
    { id: 'drafts', label: 'Drafts', statKey: 'drafts' },
];

// Quick actions (sirf wahi routes jo App.jsx mein hain)
export const QUICK_ACTIONS = [
    { to: '/create-blog', icon: 'mdi:plus', label: 'Create new post', tone: 'bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400' },
    { to: '/blogs', icon: 'mdi:text-box-multiple-outline', label: 'Browse articles', tone: 'bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400' },
    { to: '/categories', icon: 'mdi:folder-outline', label: 'Categories', tone: 'bg-purple-100 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400' },
    { to: '/profile', icon: 'mdi:account-outline', label: 'My profile', tone: 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400' },
];
