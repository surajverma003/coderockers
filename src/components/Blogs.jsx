import React from 'react';
import { Icon } from '@iconify/react';

import { focusRing } from '../data/homeData';
import { PAGE_SIZE, SORT_OPTIONS, SKELETON_COUNT } from '../data/blogsData';
import { getPageNumbers } from '../utils/blogUtils';
import useBlogs from '../hooks/useBlogs';

import PostCard from './Blogs/PostCard';
import SkeletonCard from './Blogs/SkeletonCard';
import Chip from './Blogs/Chip';

const Blogs = () => {
    const {
        items, categories, filtered, pagePosts, timeFormat, getBlogs, blogsError,
        urlSearch, activeCategory, activeLabel, sort,
        searchInput, setSearchInput, inputRef, listRef,
        page, totalPages, start,
        hasFilters, showSkeleton, showError, showEmpty,
        goToPage, clearFilters, clearSearch, changeSort, selectCategory,
    } = useBlogs();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white" data-testid="blogs-page">
            {/* ============================ Header ============================ */}
            <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{activeCategory ? activeLabel : 'All articles'}</h1>
                    <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                        {activeCategory ? `Everything we’ve published about ${activeLabel.toLowerCase()}.` : 'Tutorials, guides, and stories from our writers.'}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-3xl">
                        <form onSubmit={(e) => e.preventDefault()} role="search" className="relative flex-1">
                            <label htmlFor="blogs-search" className="sr-only">
                                Search articles
                            </label>
                            <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            <input id="blogs-search" ref={inputRef} type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search by title, topic, or author" className="w-full pl-12 pr-11 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" data-testid="blogs-search-input" />
                            {searchInput && (
                                <button type="button" aria-label="Clear search" className={`absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 ${focusRing}`}
                                    onClick={clearSearch}
                                >
                                    <Icon icon="mdi:close" className="w-4 h-4" />
                                </button>
                            )}
                        </form>

                        <div className="relative sm:w-48">
                            <label htmlFor="blogs-sort" className="sr-only">Sort articles</label>
                            <select id="blogs-sort" value={sort} onChange={(e) => changeSort(e.target.value)} className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer" data-testid="blogs-sort" >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </header>

            {/* ============================= Body ============================= */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Category chips */}
                {items.length > 0 && (
                    <div role="group" aria-label="Filter by category" className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" >
                        <Chip active={!activeCategory} count={items.length} onClick={() => selectCategory(null)}>
                            All
                        </Chip>
                        {categories.map((category) => (
                            <Chip key={category.key} active={category.key === activeCategory} count={category.count} onClick={() => selectCategory(category.key)} >
                                {category.name}
                            </Chip>
                        ))}
                    </div>
                )}

                {/* Result summary */}
                <div className="flex flex-wrap items-center justify-between gap-3 mt-6 mb-8 min-h-[2rem]">
                    <p role="status" aria-live="polite" className="text-sm text-slate-600 dark:text-slate-400">
                        {showSkeleton ? 'Loading articles…' : filtered.length === 0 ? '' : `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} ${filtered.length === 1 ? 'article' : 'articles'}`}
                        {!showSkeleton && urlSearch.trim() && filtered.length > 0 && <> for “{urlSearch.trim()}”</>}
                    </p>
                    {hasFilters && !showSkeleton && (
                        <button type="button" onClick={clearFilters} className={`inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline rounded ${focusRing}`} >
                            <Icon icon="mdi:filter-remove-outline" className="w-4 h-4" /> Clear filters
                        </button>
                    )}
                </div>

                {/* Grid */}
                <div ref={listRef} className="scroll-mt-24">
                    {showSkeleton && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    )}

                    {showError && (
                        <div className="text-center py-20 px-6 border border-dashed border-red-300 dark:border-red-500/40 rounded-3xl">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 mb-5">
                                <Icon icon="mdi:alert-circle-outline" className="w-7 h-7" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">We couldn’t load the articles</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">{blogsError}</p>
                            <button type="button" onClick={() => getBlogs(true)} className={`px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors ${focusRing}`} >
                                Try again
                            </button>
                        </div>
                    )}

                    {showEmpty && !showError && (
                        <div className="text-center py-20 px-6 border border-dashed border-slate-300 dark:border-slate-700 rounded-3xl" data-testid="blogs-empty">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-5">
                                <Icon icon="mdi:file-search-outline" className="w-7 h-7" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">{hasFilters ? 'No articles found' : 'No articles yet'}</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                                {hasFilters ? 'Try a different keyword, or remove a filter to see more.' : 'New articles will show up here as soon as they are published.'}
                            </p>
                            {hasFilters && (
                                <button type="button" onClick={clearFilters} className={`px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors ${focusRing}`} >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    )}

                    {!showSkeleton && pagePosts.length > 0 && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pagePosts.map((post) => (
                                <PostCard key={post.id} post={post} timeFormat={timeFormat} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!showSkeleton && totalPages > 1 && (
                    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2" data-testid="blogs-pagination">
                        <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Previous page" className={`inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-blue-400 disabled:opacity-40 disabled:pointer-events-none transition-colors ${focusRing}`} >
                            <Icon icon="mdi:arrow-left" className="w-5 h-5" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        <span className="sm:hidden px-3 text-sm text-slate-600 dark:text-slate-400">
                            Page {page} of {totalPages}
                        </span>

                        <div className="hidden sm:flex items-center gap-2">
                            {getPageNumbers(totalPages, page).map((p, i) =>
                                p === '…' ? (
                                    <span key={`gap-${i}`} className="w-6 text-center text-slate-400" aria-hidden="true">
                                        …
                                    </span>
                                ) : (
                                    <button key={p} type="button" onClick={() => goToPage(p)} aria-label={`Page ${p}`} aria-current={p === page ? 'page' : undefined} className={`w-10 h-10 rounded-xl border text-sm font-medium transition-colors ${focusRing} ${p === page ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-400' }`} >
                                        {p}
                                    </button>
                                )
                            )}
                        </div>

                        <button type="button" onClick={() => goToPage(page + 1)} disabled={page === totalPages} aria-label="Next page" className={`inline-flex items-center gap-1.5 h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-blue-400 disabled:opacity-40 disabled:pointer-events-none transition-colors ${focusRing}`} >
                            <span className="hidden sm:inline">Next</span>
                            <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                        </button>
                    </nav>
                )}
            </main>
        </div>
    );
};

export default Blogs;
