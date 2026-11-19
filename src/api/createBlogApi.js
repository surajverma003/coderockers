import { Query } from 'appwrite';
import { databases, ID } from '../appwrite/appwrite';
import { BUCKET_ID } from '../data/createBlogData';
import { slugify } from './blogEditorUtils';

// Appwrite se baat karne wale functions (React state yahan nahi).
const DATABASE_ID = '696fa68200113ad55171';
const COLLECTION_ID = 'blogpost';

// Slug unique hona chahiye (ViewBlog slug se post dhoondhta hai)
const makeUniqueSlug = async (base) => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('slug', base), Query.limit(1)]);
    return res.total > 0 ? `${base}-${Math.random().toString(36).slice(2, 6)}` : base;
};

// `storage` appwrite.js mein export na ho to bhi page na toote, isliye dynamic import
const uploadImage = async (file) => {
    const mod = await import('../appwrite/appwrite');
    const storage = mod['storage'];
    if (!storage) throw new Error('Image upload is not set up yet. Paste an image URL instead.');
    const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), file);
    return String(storage.getFileView(BUCKET_ID, uploaded.$id));
};

// category / tags columns table mein na ho to unhe hata ke dobara try karo
const createWithFallback = async (data) => {
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

// Poora flow: image upload -> unique slug -> document banao. Result: { slug, dropped }
export const createArticle = async ({ title, content, imageFile, imageUrl, author, publish, category, tags }) => {
    const image = imageFile ? await uploadImage(imageFile) : imageUrl;
    const slug = await makeUniqueSlug(slugify(title) || 'untitled');

    const data = {
        title,
        content,
        slug,
        views: 0,
        author,
        is_published: publish,
        category: category || 'General',
        ...(tags.length ? { tags } : {}),
        ...(image ? { image } : {}),
    };

    const { dropped } = await createWithFallback(data);
    return { slug, dropped };
};
