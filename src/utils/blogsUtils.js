import { titleCase } from './blogUtils';
import { SORT_OPTIONS, DEFAULT_SORT } from '../data/blogsData';

// URL ka ?sort= valid na ho to default sort
export const resolveSort = (value) => (SORT_OPTIONS.some((o) => o.value === value) ? value : DEFAULT_SORT);

// Category chips: posts se ginti, zyada posts wali pehle
export const buildCategories = (items, activeCategory) => {
    const map = new Map();
    items.forEach((post) => {
        const key = post.category.toLowerCase();
        map.set(key, { name: post.category, count: (map.get(key)?.count || 0) + 1 });
    });
    if (activeCategory && !map.has(activeCategory)) {
        map.set(activeCategory, { name: titleCase(activeCategory), count: 0 });
    }
    return Array.from(map.entries())
        .map(([key, value]) => ({ key, ...value }))
        .sort((a, b) => b.count - a.count);
};

export const getActiveLabel = (categories, activeCategory) =>
    categories.find((c) => c.key === activeCategory)?.name || titleCase(activeCategory);

// Category + search se filter karke sort karo
export const filterAndSortPosts = (items, { search, category, sort }) => {
    const q = search.trim().toLowerCase();
    const list = items.filter((post) => {
        const inCategory = !category || post.category.toLowerCase() === category;
        const inSearch = !q || [post.title, post.excerpt, post.author, post.category].join(' ').toLowerCase().includes(q);
        return inCategory && inSearch;
    });

    const time = (post) => new Date(post.createdAt || 0).getTime();
    if (sort === 'oldest') list.sort((a, b) => time(a) - time(b));
    else if (sort === 'views') list.sort((a, b) => (b.views || 0) - (a.views || 0));
    else if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    else list.sort((a, b) => time(b) - time(a));
    return list;
};
