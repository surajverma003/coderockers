import { normalizeBlog, formatViews } from './blogUtils';
import { getCategoryMeta } from './categoryMeta';
import { PLACEHOLDER_IMAGE, DASH, HOME_LIMITS, STAT_ITEMS } from '../data/homeData';

/* ---- Sab kuch asli posts se nikalte hain ---- */

export const normalizePosts = (blogs) => (blogs || []).map(normalizeBlog);

// Writers: author ke hisaab se posts aur views ka jod (zyada views wale pehle)
export const getWriters = (posts) => {
    const map = new Map();
    posts.forEach((p) => {
        const entry = map.get(p.author) || { name: p.author, posts: 0, views: 0 };
        entry.posts += 1;
        entry.views += p.views || 0;
        map.set(p.author, entry);
    });
    return [...map.values()].sort((a, b) => b.views - a.views || b.posts - a.posts);
};

export const getTotals = (posts, writersAll) => ({
    posts: posts.length,
    writers: writersAll.length,
    categories: new Set(posts.map((p) => p.category.toLowerCase())).size,
    views: posts.reduce((sum, p) => sum + (p.views || 0), 0),
});

// Category cards: asli posts se ginti, zyada posts wali pehle (max 6)
export const getCategories = (posts) => {
    const map = new Map();
    posts.forEach((p) => {
        const key = p.category.toLowerCase();
        const entry = map.get(key) || { name: p.category, count: 0 };
        entry.count += 1;
        map.set(key, entry);
    });
    return [...map.values()]
        .sort((a, b) => b.count - a.count)
        .slice(0, HOME_LIMITS.categories)
        .map((c) => ({ ...c, ...getCategoryMeta(c.name) }));
};

// Featured = sabse zyada views wale 3 articles
export const getFeatured = (posts) =>
    [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, HOME_LIMITS.featured);

export const toFeaturedArticles = (featured, timeFormat) =>
    featured.map((post) => ({
        id: post.slug, // /view-blog/:slug
        title: post.title,
        excerpt: post.excerpt,
        image: post.image || PLACEHOLDER_IMAGE,
        author: post.author,
        date: post.createdAt && timeFormat ? timeFormat(post.createdAt) : '',
        category: post.category,
        views: formatViews(post.views),
    }));

// Latest = sabse nayi 6 posts (jo featured mein nahi hain)
export const getLatest = (posts, featured) => {
    const featuredSlugs = new Set(featured.map((p) => p.slug));
    return posts.filter((p) => !featuredSlugs.has(p.slug)).slice(0, HOME_LIMITS.latest);
};

export const getMostRead = (featured) => (featured[0] && featured[0].views > 0 ? featured[0] : null);

export const buildStats = (totals, hasData) => {
    const values = {
        posts: String(totals.posts),
        writers: String(totals.writers),
        categories: String(totals.categories),
        views: formatViews(totals.views) || '0',
    };
    return STAT_ITEMS.map(({ key, label, icon }) => ({ value: hasData ? values[key] : DASH, label, icon }));
};
