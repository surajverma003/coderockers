/* ------------------------------ Config ------------------------------ */

export const DATABASE_ID = '696fa68200113ad55171';
export const COLLECTION_ID = 'blogpost';
// Image upload ke liye (optional): Appwrite Storage bucket ID.
export const BUCKET_ID = 'blog-images'; // TODO
export const LIMITS = { title: 100, content: 8000, tags: 5, imageMB: 5 };
export const DRAFT_KEY = 'cr_blog_draft';

export const categories = ['Technology', 'Lifestyle', 'Travel', 'Business', 'Health', 'Food', 'Fashion', 'Sports', 'Entertainment', 'Other'];

export const emptyForm = { title: '', content: '', category: '', tags: '', imageUrl: '' };

/* ------------------------------ Style classes ------------------------------ */

export const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950';
export const inputCls = 'w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';
export const cardCls = 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
export const labelCls = 'mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300';
