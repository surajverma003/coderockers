import { TOP_POSTS_LIMIT, STAT_CARDS, FILTER_TABS } from '../data/adminDashboardData';

export const isPublished = (blog) => blog.is_published !== false;

export const formatNumber = (value) => {
    const n = Number(value) || 0;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    return String(n);
};

// Real data se stats (pehle 156 users aur 89 comments hardcoded the)
export const calcStats = (list) => {
    const published = list.filter(isPublished).length;
    const views = list.reduce((sum, b) => sum + (Number(b.views) || 0), 0);
    return { total: list.length, published, drafts: list.length - published, views };
};

export const getTopPosts = (list) =>
    [...list].filter(isPublished).sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, TOP_POSTS_LIMIT);

export const filterPosts = (list, filter) =>
    list.filter((b) => (filter === 'all' ? true : filter === 'published' ? isPublished(b) : !isPublished(b)));

export const buildStatCards = (stats) =>
    STAT_CARDS.map(({ key, title, icon, tone }) => ({
        title,
        icon,
        tone,
        value: key === 'views' ? formatNumber(stats.views) : stats[key],
    }));

export const buildTabs = (stats) =>
    FILTER_TABS.map(({ id, label, statKey }) => ({ id, label, count: stats[statKey] }));
