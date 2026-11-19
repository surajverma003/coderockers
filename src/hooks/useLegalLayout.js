import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SECTION_ROOT_MARGIN, SCROLL_TOP_THRESHOLD } from '../data/legalData';
import { scrollBehavior } from '../utils/legalUtils';

// Browser tab ka title (Privacy aur Terms dono use karte hain)
export const useLegalTitle = (title) => {
    useEffect(() => {
        const previous = document.title;
        document.title = title;
        return () => {
            document.title = previous;
        };
    }, [title]);
};

// sections: [{ id, title, body }]
const useLegalLayout = (sections) => {
    const { hash } = useLocation();
    const detailsRef = useRef(null);
    const [active, setActive] = useState(sections[0]?.id);
    const [showTop, setShowTop] = useState(false);

    // Jo section screen par hai use highlight karo
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: SECTION_ROOT_MARGIN }
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sections]);

    useEffect(() => {
        const onScroll = () => {
            setShowTop(window.scrollY > SCROLL_TOP_THRESHOLD);
            // Aakhri section chhota ho to wo kabhi highlight nahi hota tha. Page ke end par use active maan lo.
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom && sections.length) setActive(sections[sections.length - 1].id);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [sections]);

    // /privacy#cookies-and-storage jaisa seedha link khule to us section tak scroll ho
    useEffect(() => {
        if (!hash) return undefined;
        const id = decodeURIComponent(hash.slice(1));
        const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 0);
        return () => clearTimeout(timer);
    }, [hash]);

    const goTo = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
        window.history.replaceState(null, '', `#${id}`); // section ka link share kiya ja sake
        setActive(id);
        if (detailsRef.current) detailsRef.current.open = false; // mobile contents band
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: scrollBehavior() });

    return { detailsRef, active, showTop, goTo, scrollToTop };
};

export default useLegalLayout;
