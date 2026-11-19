import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import myContext from '../context/myContext';
import { normalizeBlog } from '../utils/blogUtils';
import { PAGE_SIZE, SEARCH_DEBOUNCE_MS } from '../data/blogsData';
import { resolveSort, buildCategories, getActiveLabel, filterAndSortPosts } from '../utils/blogsUtils';

const useBlogs = () => {
    const { blogs, getBlogs, blogsLoading, blogsError, timeFormat } = useContext(myContext);

    const navigate = useNavigate();
    const routeParams = useParams(); // /category/:category
    const [searchParams] = useSearchParams(); // ?search= &category= &sort= &page=

    const listRef = useRef(null);
    const inputRef = useRef(null);

    // URL hi single source of truth hai
    const urlSearch = searchParams.get('search') || '';
    const activeCategory = (routeParams.category || searchParams.get('category') || '').toLowerCase();
    const sort = resolveSort(searchParams.get('sort'));
    const pageParam = parseInt(searchParams.get('page'), 10) || 1;

    const [searchInput, setSearchInput] = useState(urlSearch);

    /* ---- Data ---- */
    useEffect(() => {
        getBlogs?.();
    }, [getBlogs]);

    const items = useMemo(() => (blogs || []).map(normalizeBlog), [blogs]);
    const categories = useMemo(() => buildCategories(items, activeCategory), [items, activeCategory]);
    const activeLabel = getActiveLabel(categories, activeCategory);
    const filtered = useMemo(
        () => filterAndSortPosts(items, { search: urlSearch, category: activeCategory, sort }),
        [items, urlSearch, activeCategory, sort]
    );

    /* ---- Pagination ---- */
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const page = Math.min(pageParam, totalPages);
    const start = (page - 1) * PAGE_SIZE;
    const pagePosts = filtered.slice(start, start + PAGE_SIZE);

    /* ---- URL update helper ---- */
    const updateParams = (patch, { replace = false } = {}) => {
        const next = new URLSearchParams(searchParams);
        // /category/:name route se aaye ho to category ko query mein carry karo
        if (activeCategory) next.set('category', activeCategory);
        Object.entries(patch).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') next.delete(key);
            else next.set(key, String(value));
        });
        const qs = next.toString();
        navigate(`/blogs${qs ? `?${qs}` : ''}`, { replace });
    };

    const goToPage = (p) => {
        updateParams({ page: p === 1 ? null : p });
        listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const clearFilters = () => {
        setSearchInput('');
        navigate('/blogs');
    };

    const clearSearch = () => {
        setSearchInput('');
        updateParams({ search: null, page: null }, { replace: true });
        inputRef.current?.focus();
    };

    const changeSort = (value) => updateParams({ sort: value === 'newest' ? null : value, page: null });

    const selectCategory = (key) => updateParams({ category: key, page: null });

    /* ---- Search input: debounce + URL sync (Navbar search ke saath bhi chalta hai) ---- */
    useEffect(() => {
        if (document.activeElement !== inputRef.current) setSearchInput(urlSearch);
    }, [urlSearch]);

    useEffect(() => {
        if (searchInput.trim() === urlSearch.trim()) return;
        const timer = setTimeout(() => updateParams({ search: searchInput.trim() || null, page: null }, { replace: true }), SEARCH_DEBOUNCE_MS);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    useEffect(() => {
        document.title = activeCategory ? `${activeLabel} articles | CodeRokers` : 'All articles | CodeRokers';
    }, [activeCategory, activeLabel]);

    /* ---- Derived UI state ---- */
    const hasFilters = Boolean(activeCategory || urlSearch.trim());
    const showSkeleton = blogsLoading && items.length === 0;
    const showError = !blogsLoading && blogsError && items.length === 0;
    const showEmpty = !showSkeleton && !showError && filtered.length === 0;

    return {
        // data
        items, categories, filtered, pagePosts, timeFormat, getBlogs, blogsError,
        // url state
        urlSearch, activeCategory, activeLabel, sort,
        // search input
        searchInput, setSearchInput, inputRef, listRef,
        // pagination
        page, totalPages, start,
        // ui flags
        hasFilters, showSkeleton, showError, showEmpty,
        // handlers
        goToPage, clearFilters, clearSearch, changeSort, selectCategory,
    };
};

export default useBlogs;
