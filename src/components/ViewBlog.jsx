import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { formatViews } from '../utils/blogUtils';
import { focusRing } from '../data/homeData';
import useViewBlog from '../hooks/useViewBlog';

import ArticleSkeleton from './ViewBlog/ArticleSkeleton';
import ArticleNotFound from './ViewBlog/ArticleNotFound';
import Block from './ViewBlog/Block';
import TocList from './ViewBlog/TocList';
import RelatedCard from './ViewBlog/RelatedCard';
import ReadingProgress from './ViewBlog/ReadingProgress';
import ShareButtons from './ViewBlog/ShareButtons';

const ViewBlog = () => {
    const {
        current, post, loading, blocks, toc, showToc, related, dateLabel, timeFormat,
        articleRef, activeId, coverFailed, setCoverFailed, viewsAdded, goToHeading,
    } = useViewBlog();

    /* ---- Render ---- */
    if (loading && !current) return <ArticleSkeleton />;
    if (!current) return <ArticleNotFound />;

    return (
        <div className="bg-white dark:bg-slate-950" data-testid="view-blog-page">
            <ReadingProgress targetRef={articleRef} />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                <Link to="/blogs" className={`group inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded ${focusRing}`}>
                    <Icon icon="mdi:arrow-left" className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> All articles
                </Link>

                {/* Header */}
                <header className="mt-8 max-w-3xl">
                    <Link to={`/category/${encodeURIComponent(post.category.toLowerCase())}`} className={`inline-block px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-sm font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors ${focusRing}`} >
                        {post.category}
                    </Link>
                    <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-white">{post.title}</h1>

                    <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-3">
                            <span className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                {String(post.author).charAt(0).toUpperCase()}
                            </span>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{post.author}</p>
                                {dateLabel && <p>{dateLabel}</p>}
                            </div>
                        </div>
                        {post.readTime && (
                            <span className="inline-flex items-center gap-1.5">
                                <Icon icon="mdi:clock-outline" className="w-5 h-5" /> {post.readTime}
                            </span>
                        )}
                        {post.views !== null && (
                            <span className="inline-flex items-center gap-1.5">
                                <Icon icon="mdi:eye-outline" className="w-5 h-5" /> {formatViews(post.views + viewsAdded)} views
                            </span>
                        )}
                    </div>
                </header>

                {/* Cover */}
                <div className="mt-10 relative aspect-[21/9] overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                    {post.image && !coverFailed ? (
                        <img src={post.image} alt={post.title} onError={() => setCoverFailed(true)} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-400">
                            <Icon icon="mdi:text-box-outline" className="w-16 h-16 opacity-60" />
                        </div>
                    )}
                </div>

                {/* Body + TOC */}
                <div className={`mt-12 grid gap-12 ${showToc ? 'lg:grid-cols-[minmax(0,1fr)_14rem]' : ''}`}>
                    <div className="min-w-0">
                        {/* Mobile TOC */}
                        {showToc && (
                            <details className="lg:hidden mb-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3">
                                <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">On this page</summary>
                                <div className="mt-3">
                                    <TocList items={toc} activeId={activeId} onNavigate={goToHeading} />
                                </div>
                            </details>
                        )}

                        <article ref={articleRef} className="max-w-3xl space-y-6" data-testid="article-body">
                            {blocks.map((block, index) => (
                                <Block key={index} block={block} />
                            ))}
                        </article>

                        {/* Share */}
                        <div className="max-w-3xl mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Share this article</p>
                            <ShareButtons title={post.title} />
                        </div>

                        {/* Author */}
                        <div className="max-w-3xl mt-10 flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                            <span className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                                {String(post.author).charAt(0).toUpperCase()}
                            </span>
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400">Written by</p>
                                <p className="font-bold text-slate-900 dark:text-white">{post.author}</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop TOC */}
                    {showToc && (
                        <aside className="hidden lg:block">
                            <nav aria-label="Table of contents" className="sticky top-28" data-testid="toc">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">On this page</p>
                                <TocList items={toc} activeId={activeId} onNavigate={goToHeading} />
                            </nav>
                        </aside>
                    )}
                </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-16 px-4 sm:px-6 lg:px-8" data-testid="related-posts">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-end justify-between gap-4 mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Keep reading</h2>
                            <Link to="/blogs" className={`group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold rounded-md ${focusRing}`}>
                                All articles <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {related.map((item) => (
                                <RelatedCard key={item.id} post={item} timeFormat={timeFormat} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ViewBlog;
