import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import myContext from '../context/myContext';
import { normalizeBlog } from '../utils/blogUtils';
import { incrementViews } from '../api/viewBlogApi';
import { parseBlocks, shouldCountView, getRelatedPosts, formatDateLabel, buildShareLinks } from '../utils/viewBlogUtils';
import { NAVBAR_HEIGHT, TOC_MIN_ITEMS, TOC_MAX_LEVEL, TOC_ROOT_MARGIN } from '../data/viewBlogData';

/* ============================ ViewBlog page ============================ */

const useViewBlog = () => {
    const { slug } = useParams();
    const { blog, getBlog, blogLoading, blogs, getBlogs, timeFormat, user } = useContext(myContext);

    const articleRef = useRef(null);
    const [fetched, setFetched] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [coverFailed, setCoverFailed] = useState(false);
    const [viewsAdded, setViewsAdded] = useState(0);

    /* ---- Data: pehle cache (listing se aaya data), warna Appwrite se ---- */
    useEffect(() => {
        let alive = true;
        setCoverFailed(false);

        if ((blogs || []).some((b) => b.slug === slug)) {
            setFetched(true); // cache mein hai, Appwrite read bachao
            return undefined;
        }

        setFetched(false);
        Promise.resolve(getBlog(slug)).finally(() => alive && setFetched(true));
        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug, getBlog]);

    useEffect(() => {
        getBlogs?.(); // related posts ke liye (cached hai, dobara fetch nahi hota)
    }, [getBlogs]);

    // Purana blog ya draft kabhi nahi dikhna chahiye
    const source = (blogs || []).find((b) => b.slug === slug) || blog;
    const current = source && source.slug === slug && source.is_published !== false ? source : null;
    const post = useMemo(() => (current ? normalizeBlog(current) : null), [current]);

    // View count: ek browser se 24 ghante mein ek hi baar. Author apni post khole to nahi ginte.
    useEffect(() => {
        setViewsAdded(0);
        if (!current?.$id) return;
        if (user?.name && user.name === current.author) return;
        if (!shouldCountView(current.$id)) return;
        incrementViews(current.$id, current.views || 0).then((ok) => ok && setViewsAdded(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current?.$id]);

    const loading = !fetched || blogLoading;

    const blocks = useMemo(() => parseBlocks(current?.content), [current]);
    const toc = useMemo(() => blocks.filter((b) => b.type === 'heading' && b.level <= TOC_MAX_LEVEL), [blocks]);
    const related = useMemo(() => getRelatedPosts(blogs, post), [blogs, post]);

    /* ---- Page title ---- */
    useEffect(() => {
        if (!post) return undefined;
        const previous = document.title;
        document.title = `${post.title} | CodeRokers`;
        return () => {
            document.title = previous;
        };
    }, [post]);

    /* ---- TOC: jo heading screen par hai use highlight karo ---- */
    useEffect(() => {
        if (toc.length < TOC_MIN_ITEMS) return;
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveId(entry.target.id)),
            { rootMargin: TOC_ROOT_MARGIN }
        );
        toc.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [toc]);

    const goToHeading = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
    };

    const showToc = toc.length >= TOC_MIN_ITEMS;
    const dateLabel = post ? formatDateLabel(post.createdAt) : '';

    return {
        current, post, loading, blocks, toc, showToc, related, dateLabel, timeFormat,
        articleRef, activeId, coverFailed, setCoverFailed, viewsAdded, goToHeading,
    };
};

export default useViewBlog;

/* ============================ Reading progress ============================ */

export const useReadingProgress = (targetRef) => {
    const barRef = useRef(null);

    useEffect(() => {
        let ticking = false;

        const update = () => {
            ticking = false;
            const el = targetRef.current;
            const bar = barRef.current;
            if (!el || !bar) return;
            const rect = el.getBoundingClientRect();
            const scrollable = rect.height - (window.innerHeight - NAVBAR_HEIGHT);
            const progress = scrollable > 0 ? (NAVBAR_HEIGHT - rect.top) / scrollable : rect.top < NAVBAR_HEIGHT ? 1 : 0;
            bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [targetRef]);

    return barRef;
};

/* ============================ Share buttons ============================ */

export const useShare = (title) => {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;
    const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(error.message);
        }
    };

    const nativeShare = () => navigator.share({ title, url }).catch(() => { });

    const links = buildShareLinks(title, url);

    return { canNativeShare, nativeShare, copied, copyLink, links };
};
