import { useContext, useEffect, useMemo, useState } from 'react';
import myContext from '../context/myContext';
import { normalizeBlog } from '../utils/blogUtils';
import { DEFAULT_SORT, PAGE_TITLE } from '../data/categoriesData';
import { buildCategories, filterAndSortCategories } from '../utils/categoriesUtils';

const useCategories = () => {
    const { blogs, getBlogs, blogsLoading, blogsError } = useContext(myContext);

    const [query, setQuery] = useState('');
    const [sort, setSort] = useState(DEFAULT_SORT);

    // Seedha /categories kholne par bhi data aaye (cache hota hai, dobara fetch nahi hota)
    useEffect(() => {
        getBlogs?.();
    }, [getBlogs]);

    useEffect(() => {
        const previous = document.title;
        document.title = PAGE_TITLE;
        return () => {
            document.title = previous;
        };
    }, []);

    const posts = useMemo(() => (blogs || []).map(normalizeBlog), [blogs]);
    const isLoading = Boolean(blogsLoading) && posts.length === 0;
    const showError = !blogsLoading && Boolean(blogsError) && posts.length === 0;

    const categories = useMemo(() => buildCategories(posts), [posts]);
    const visible = useMemo(() => filterAndSortCategories(categories, query, sort), [categories, query, sort]);

    return {
        posts, categories, visible,
        isLoading, showError, blogsError, getBlogs,
        query, setQuery, sort, setSort,
    };
};

export default useCategories;
