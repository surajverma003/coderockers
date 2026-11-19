import { getCategoryMeta } from './categoryMeta';

// Asli categories: har ek ki ginti, total views aur sabse nayi post
export const buildCategories = (posts) => {
    const map = new Map();
    posts.forEach((p) => {
        const key = p.category.toLowerCase();
        const entry = map.get(key) || { name: p.category, count: 0, views: 0, latest: p.title };
        entry.count += 1; // posts newest-first aate hain, isliye pehli post hi latest hai
        entry.views += p.views || 0;
        map.set(key, entry);
    });
    return [...map.values()].map((c) => ({ ...c, ...getCategoryMeta(c.name) }));
};

// Search + sort
export const filterAndSortCategories = (categories, query, sort) => {
    const q = query.trim().toLowerCase();
    const list = categories.filter((c) => !q || c.name.toLowerCase().includes(q) || c.blurb.toLowerCase().includes(q));
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'views') list.sort((a, b) => b.views - a.views);
    else list.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    return list;
};
