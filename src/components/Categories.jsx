import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { formatViews } from '../utils/blogUtils';
import { getTileClasses } from '../utils/categoryMeta';
import { cardClass, focusRing } from '../data/homeData';
import { SORT_OPTIONS, SKELETON_COUNT } from '../data/categoriesData';
import useCategories from '../hooks/useCategories';

import CategorySkeleton from './Categories/CategorySkeleton';

const Categories = () => {
    const {
        posts, categories, visible,
        isLoading, showError, blogsError, getBlogs,
        query, setQuery, sort, setSort,
    } = useCategories();

    return (
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white" data-testid="categories-page">
            {/* ============================ Header ============================ */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Browse by category</h1>
                    <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                        Pick a topic and see every article filed under it.
                        {posts.length > 0 && (
                            <span className="block mt-1 text-base text-slate-500 dark:text-slate-400">
                                {categories.length} {categories.length === 1 ? 'topic' : 'topics'} · {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                            </span>
                        )}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
                        <div className="relative flex-1">
                            <label htmlFor="category-search" className="sr-only">Search categories</label>
                            <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden="true" />
                            <input id="category-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search categories" className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [&::-webkit-search-cancel-button]:appearance-none" />
                        </div>
                        <div className="relative sm:w-48">
                            <label htmlFor="category-sort" className="sr-only">Sort categories</label>
                            <select id="category-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer" >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                            <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </header>

            {/* ============================= Body ============================= */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" aria-busy="true" aria-label="Loading categories">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => <CategorySkeleton key={i} />)}
                    </div>
                )}

                {showError && (
                    <div className="text-center py-16 px-6 border border-dashed border-red-300 dark:border-red-500/40 rounded-3xl">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 mb-5">
                            <Icon icon="mdi:alert-circle-outline" className="w-7 h-7" aria-hidden="true" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">We couldn’t load the categories</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">{blogsError}</p>
                        <button type="button" onClick={() => getBlogs(true)} className={`px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors ${focusRing}`}>
                            Try again
                        </button>
                    </div>
                )}

                {!isLoading && !showError && posts.length === 0 && (
                    <div className="text-center py-16 px-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl">
                        <p className="font-semibold mb-1">No articles yet</p>
                        <p className="text-slate-600 dark:text-slate-400">Categories will show up here as soon as articles are published.</p>
                    </div>
                )}

                {!isLoading && posts.length > 0 && (
                    <>
                        <p role="status" aria-live="polite" className="sr-only">
                            {visible.length} {visible.length === 1 ? 'category' : 'categories'} shown
                        </p>

                        {visible.length === 0 ? (
                            <div className="text-center py-16 px-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl">
                                <p className="font-semibold mb-2">No category matches “{query.trim()}”</p>
                                <button type="button" onClick={() => setQuery('')} className={`text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline rounded ${focusRing}`}>
                                    Clear search
                                </button>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {/* Saare articles ek hi click mein */}
                                {!query.trim() && (
                                    <li>
                                        <Link to="/blogs" className={`${cardClass} ${focusRing}`}>
                                            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                                                <Icon icon="mdi:view-grid-outline" className="text-2xl" aria-hidden="true" />
                                            </span>
                                            <h2 className="text-lg font-semibold">All articles</h2>
                                            <p className="mt-1 mb-5 text-sm text-slate-600 dark:text-slate-400">Every post, newest first</p>
                                            <span className="mt-auto flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                                                <Icon icon="mdi:arrow-right" className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                            </span>
                                        </Link>
                                    </li>
                                )}

                                {visible.map((c) => (
                                    <li key={c.name}>
                                        <Link to={`/category/${encodeURIComponent(c.name.toLowerCase())}`} className={`${cardClass} ${focusRing}`}>
                                            <span className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-colors duration-300 ${getTileClasses(c.color)}`}>
                                                <Icon icon={c.icon} aria-hidden="true" />
                                            </span>
                                            <h2 className="text-lg font-semibold">{c.name}</h2>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{c.blurb}</p>
                                            <p className="mt-3 mb-5 text-xs text-slate-500 dark:text-slate-500 line-clamp-1">
                                                Latest: <span className="text-slate-700 dark:text-slate-300">{c.latest}</span>
                                            </p>
                                            <span className="mt-auto flex items-center justify-between gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                                                <span>
                                                    {c.count} {c.count === 1 ? 'article' : 'articles'}
                                                    {c.views > 0 && (
                                                        <span className="ml-3 inline-flex items-center gap-1 text-xs font-normal text-slate-500 dark:text-slate-400">
                                                            <Icon icon="mdi:eye-outline" className="w-4 h-4" aria-hidden="true" />
                                                            {formatViews(c.views)}
                                                        </span>
                                                    )}
                                                </span>
                                                <Icon icon="mdi:arrow-right" className="text-lg shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Categories;
