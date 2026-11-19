import { Query } from 'appwrite';
import { databases, ID } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID, BUCKET_ID, DRAFT_KEY, LIMITS, emptyForm } from '../data/createBlogData';

/* ------------------------------ Helpers ------------------------------ */

export const readDraft = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
        return saved && (saved.title || saved.content) ? { ...emptyForm, ...saved } : null;
    } catch {
        return null;
    }
};

export const slugify = (text) => text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60).replace(/-$/, '');

// Slug unique hona chahiye (ViewBlog slug se post dhoondhta hai)
export const makeUniqueSlug = async (base) => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('slug', base), Query.limit(1)]);
    return res.total > 0 ? `${base}-${Math.random().toString(36).slice(2, 6)}` : base;
};

export const parseTags = (value) =>
    [...new Set(value.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean))].slice(0, LIMITS.tags);

// `storage` appwrite.js mein export na ho to bhi page na toote, isliye dynamic import
export const uploadImage = async (file) => {
    const mod = await import('../appwrite/appwrite');
    const storage = mod['storage'];
    if (!storage) throw new Error('Image upload is not set up yet. Paste an image URL instead.');
    const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), file);
    return String(storage.getFileView(BUCKET_ID, uploaded.$id));
};

// category / tags columns table mein na ho to unhe hata ke dobara try karo
export const createWithFallback = async (data) => {
    const payload = { ...data };
    const dropped = [];
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
            return { doc, dropped };
        } catch (err) {
            const key = /Unknown attribute:?\s*"?(\w+)"?/i.exec(err?.message || '')?.[1];
            if (err?.code === 400 && ['category', 'tags'].includes(key) && key in payload) {
                delete payload[key];
                dropped.push(key);
                continue;
            }
            throw err;
        }
    }
    throw new Error('Could not save the article. Please try again.');
};
