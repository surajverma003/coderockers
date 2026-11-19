// Shared helpers: Home, Blogs aur (aage) SinglePost teeno yahi use karenge.
// Appwrite table "blogpost" ke columns:
// title, content, slug, views (int), author, is_published (bool), image (url)
// + system fields: $id, $createdAt, $updatedAt
// `category` aur `excerpt` columns abhi table mein nahi hain, isliye fallback diya hai.

export const titleCase = (text = '') => text.replace(/\b\w/g, (c) => c.toUpperCase());

export const toPlainText = (text = '') =>
    String(text)
        .replace(/<[^>]*>/g, ' ')
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[#*_`>]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

// 19300 -> "19.3K"
export const formatViews = (value) => {
    if (value === null || value === undefined || value === '') return '';
    const n = Number(value);
    if (Number.isNaN(n)) return String(value);
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
};

// Appwrite document -> UI ke liye clean object
export const normalizeBlog = (blog) => {
    const rawCategory = Array.isArray(blog.category) ? blog.category[0] : blog.category;
    const plain = toPlainText(blog.content || '');
    const words = plain ? plain.split(' ').length : 0;

    return {
        id: blog.$id,
        slug: blog.slug || blog.$id,
        title: blog.title || 'Untitled',
        excerpt: blog.excerpt || (plain.length > 140 ? `${plain.slice(0, 140).trim()}…` : plain),
        image: blog.image || '',
        author: blog.author || 'CodeRokers',
        category: rawCategory || 'General',
        createdAt: blog.$createdAt,
        views: typeof blog.views === 'number' ? blog.views : null,
        readTime: words ? `${Math.max(1, Math.ceil(words / 200))} min read` : null
    };
};

// 1 … 4 5 6 … 12 jaisa page list
export const getPageNumbers = (total, current) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
    if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
    return [1, '…', current - 1, current, current + 1, '…', total];
};