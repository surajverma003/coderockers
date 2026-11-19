import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import myContext from '../context/myContext';

import { isValidEmail } from '../utils/newsletterUtils';
import { fetchHomeBlogs, subscribeEmail } from '../api/homeApi';
import { HOME_LIMITS, TESTIMONIAL_AUTOPLAY_MS } from '../data/homeData';
import { normalizePosts, getWriters, getTotals, getCategories, getFeatured, toFeaturedArticles, getLatest, getMostRead, buildStats } from '../utils/homeUtils';

/* ============================ Home page ============================ */

const useHome = () => {
    const { user, blogs, getBlogs, blogsLoading, timeFormat } = useContext(myContext);

    // Newsletter state
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | error | success
    const [message, setMessage] = useState('');

    const statsRef = useRef(null);

    useEffect(() => {
        fetchHomeBlogs(getBlogs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const posts = useMemo(() => normalizePosts(blogs), [blogs]);
    const hasData = posts.length > 0;
    const isLoading = Boolean(blogsLoading) && !hasData;

    const writersAll = useMemo(() => getWriters(posts), [posts]);
    const totals = useMemo(() => getTotals(posts, writersAll), [posts, writersAll]);
    const categories = useMemo(() => getCategories(posts), [posts]);

    const featured = getFeatured(posts);
    const articles = toFeaturedArticles(featured, timeFormat);
    const [lead, ...rest] = articles;

    const latest = getLatest(posts, featured);
    const writers = writersAll.slice(0, HOME_LIMITS.writers);
    const mostRead = getMostRead(featured);
    const stats = buildStats(totals, hasData);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (status !== 'idle') setStatus('idle');
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (status === 'loading') return;

        if (!isValidEmail(email)) {
            setStatus('error');
            setMessage('Enter a valid email address.');
            return;
        }

        setStatus('loading');
        setMessage('');

        const result = await subscribeEmail(email);
        if (result.ok) {
            setStatus('success');
            setMessage('Subscribed successfully!');
            setEmail('');
        } else {
            setStatus('error');
            setMessage(result.message);
        }
    };

    const scrollToStats = () => {
        statsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return {
        user, timeFormat, isLoading, hasData,
        writersAll, writers, totals, categories, lead, rest, latest, mostRead, stats,
        email, status, message, statsRef,
        handleEmailChange, handleSubscribe, scrollToStats,
    };
};

export default useHome;

/* ======================== Testimonials slider ======================== */

export const useTestimonialsSlider = (items) => {
    const trackRef = useRef(null);
    const [stops, setStops] = useState(items.length);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const getStep = () => {
        const track = trackRef.current;
        const card = track?.firstElementChild;
        if (!card) return 0;
        const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
        return card.offsetWidth + gap;
    };

    const update = () => {
        const track = trackRef.current;
        const step = getStep();
        if (!track || !step) return;
        const maxScroll = track.scrollWidth - track.clientWidth;
        const total = Math.max(1, Math.round(maxScroll / step) + 1);
        const atEnd = track.scrollLeft >= maxScroll - 4;
        setStops(total);
        setActive(atEnd ? total - 1 : Math.min(Math.round(track.scrollLeft / step), total - 1));
    };

    const goTo = (index) => {
        const i = Math.max(0, Math.min(index, stops - 1));
        trackRef.current?.scrollTo({ left: i * getStep(), behavior: 'smooth' });
    };

    // Resize par stops dobara calculate karo
    useEffect(() => {
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.length]);

    // Autoplay: hover/focus/touch par ruk jata hai, reduced-motion mein band rehta hai
    useEffect(() => {
        if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = setInterval(() => goTo(active >= stops - 1 ? 0 : active + 1), TESTIMONIAL_AUTOPLAY_MS);
        return () => clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused, active, stops]);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight') goTo(active + 1);
        if (e.key === 'ArrowLeft') goTo(active - 1);
    };

    return { trackRef, stops, active, setPaused, update, goTo, onKeyDown };
};
