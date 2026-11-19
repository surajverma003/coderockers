import { normalizeBlog } from './blogUtils';
import { VIEW_WINDOW_MS, RELATED_LIMIT, DATE_LOCALE } from '../data/viewBlogData';

/* ==========================================================================
   Content renderer: plain text + Markdown (bina dangerouslySetInnerHTML ke)
   ========================================================================== */

export const slugify = (text) => text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
export const stripInline = (text) => text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*`]/g, '').trim();

export const safeUrl = (url) => (/^(https?:\/\/|mailto:|\/|#)/i.test(url) ? url : null);

export const isBlockStart = (l) =>
    /^```/.test(l) ||
    /^#{1,4}\s/.test(l) ||
    /^>\s?/.test(l) ||
    /^\s*[-*+]\s+/.test(l) ||
    /^\s*\d+[.)]\s+/.test(l) ||
    /^(-{3,}|\*{3,}|_{3,})\s*$/.test(l) ||
    /^!\[[^\]]*\]\([^)\s]+\)\s*$/.test(l);

export const parseBlocks = (content) => {
    const text = String(content || '').replace(/\r\n/g, '\n');
    const lines = text.split('\n');
    // Agar blank line hai hi nahi, to har line ko alag paragraph maano (plain text content)
    const singleBreaks = !/\n\s*\n/.test(text) && text.includes('\n');

    const blocks = [];
    const usedIds = new Map();
    const makeId = (raw) => {
        const base = slugify(raw) || 'section';
        const n = usedIds.get(base) || 0;
        usedIds.set(base, n + 1);
        return n ? `${base}-${n}` : base;
    };

    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (!line.trim()) {
            i++;
            continue;
        }

        const fence = line.match(/^```(\w+)?\s*$/);
        if (fence) {
            const code = [];
            i++;
            while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
            i++;
            blocks.push({ type: 'code', lang: fence[1] || '', text: code.join('\n') });
            continue;
        }

        const heading = line.match(/^(#{1,4})\s+(.*)$/);
        if (heading) {
            const text = heading[2].trim();
            blocks.push({ type: 'heading', level: Math.max(2, heading[1].length), text, id: makeId(stripInline(text)) });
            i++;
            continue;
        }

        if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
            blocks.push({ type: 'hr' });
            i++;
            continue;
        }

        const img = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/);
        if (img) {
            blocks.push({ type: 'image', alt: img[1], src: img[2] });
            i++;
            continue;
        }

        if (/^>\s?/.test(line)) {
            const quote = [];
            while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''));
            blocks.push({ type: 'quote', text: quote.join(' ') });
            continue;
        }

        const ul = /^\s*[-*+]\s+(.*)$/;
        const ol = /^\s*\d+[.)]\s+(.*)$/;
        if (ul.test(line) || ol.test(line)) {
            const ordered = ol.test(line);
            const re = ordered ? ol : ul;
            const items = [];
            while (i < lines.length && re.test(lines[i])) items.push(lines[i++].match(re)[1]);
            blocks.push({ type: 'list', ordered, items });
            continue;
        }

        const para = [];
        while (i < lines.length && lines[i].trim() && (para.length === 0 || !isBlockStart(lines[i]))) {
            para.push(lines[i++].trim());
            if (singleBreaks) break;
        }
        blocks.push({ type: 'p', text: para.join(' ') });
    }
    return blocks;
};

/* ==========================================================================
   ViewBlog page helpers
   ========================================================================== */

// true = is baar view gino. Refresh ya dobara kholne par 24 ghante tak false.
export const shouldCountView = (docId) => {
    try {
        const key = `viewed:${docId}`;
        const last = Number(localStorage.getItem(key) || 0);
        if (last && Date.now() - last < VIEW_WINDOW_MS) return false;
        localStorage.setItem(key, String(Date.now())); // pehle hi mark karo (dev mein effect do baar chalta hai)
        return true;
    } catch {
        return false; // storage band ho to dedupe nahi ho sakta, isliye gino nahi
    }
};

// Same category aur milte-julte title wali posts
export const getRelatedPosts = (blogs, post) => {
    if (!post) return [];
    const words = new Set(post.title.toLowerCase().split(/\W+/).filter((w) => w.length > 3));
    return (blogs || [])
        .filter((b) => b.slug !== post.slug)
        .map(normalizeBlog)
        .map((p) => ({
            p,
            score: (p.category === post.category ? 3 : 0) + p.title.toLowerCase().split(/\W+/).filter((w) => words.has(w)).length
        }))
        .sort((a, b) => b.score - a.score || (b.p.views || 0) - (a.p.views || 0))
        .slice(0, RELATED_LIMIT)
        .map((x) => x.p);
};

export const formatDateLabel = (createdAt) =>
    createdAt ? new Date(createdAt).toLocaleDateString(DATE_LOCALE, { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export const buildShareLinks = (title, url) => [
    { name: 'WhatsApp', icon: 'mdi:whatsapp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { name: 'X', icon: 'mdi:twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', icon: 'mdi:linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` }
];
