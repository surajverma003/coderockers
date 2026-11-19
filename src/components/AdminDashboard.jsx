import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import useAdminDashboard from '../hooks/useAdminDashboard';

import { isPublished, formatNumber } from '../utils/adminDashboardUtils';
import { ROWS_SHOWN, SKELETON_ROWS, QUICK_ACTIONS, cardClass, iconBtn } from '../data/adminDashboardData';

const AdminDashboard = () => {
    const {
        user, timeFormat, getBlogs, blogsLoading, blogsError,
        filter, setFilter, filtered, rows, topPosts, maxViews, statCards, tabs, initialLoading,
        busyId, deleteTarget, setDeleteTarget, actionError,
        togglePublish, confirmDelete,
    } = useAdminDashboard();

    /* ---------- Login nahi hai ---------- */
    if (!user) {
        return (
            <section className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-slate-50 dark:bg-slate-950">
                <span className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 flex items-center justify-center mb-5">
                    <Icon icon="mdi:lock-outline" className="w-8 h-8" aria-hidden="true" />
                </span>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sign in required</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Please sign in to open the dashboard.</p>
                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950" >
                    <Icon icon="mdi:login" className="w-5 h-5" aria-hidden="true" /> Sign in
                </Link>
            </section>
        );
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 dark:bg-slate-950 transition-colors min-h-[70vh]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back, {user?.name || 'Admin'}.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => getBlogs(true)} disabled={blogsLoading} aria-label="Refresh posts" title="Refresh" className={`${iconBtn} w-11 h-11 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800`} >
                            <Icon icon="mdi:refresh" className={`w-5 h-5 ${blogsLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
                        </button>
                        <Link to="/create-blog" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950" >
                            <Icon icon="mdi:plus" className="w-5 h-5" aria-hidden="true" /> New post
                        </Link>
                    </div>
                </div>

                {(blogsError || actionError) && (
                    <div role="alert" className="flex items-start gap-2 p-3 mb-6 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-sm text-red-700 dark:text-red-300">
                        <Icon icon="mdi:alert-circle-outline" className="w-5 h-5 shrink-0" aria-hidden="true" />
                        <span>{actionError || 'Could not load posts.'}</span>
                        {blogsError && !actionError && (
                            <button type="button" onClick={() => getBlogs(true)} className="ml-auto font-semibold underline">
                                Try again
                            </button>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {statCards.map((stat) => (
                        <div key={stat.title} className={`${cardClass} p-5 sm:p-6`}>
                            <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${stat.tone}`}>
                                <Icon icon={stat.icon} className="w-6 h-6" aria-hidden="true" />
                            </span>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                {initialLoading ? '-' : stat.value}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{stat.title}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Posts */}
                    <div className={`lg:col-span-2 ${cardClass} overflow-hidden`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your posts</h2>
                            <div role="tablist" aria-label="Filter posts" className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 self-start">
                                {tabs.map((t) => (
                                    <button key={t.id} type="button" role="tab" aria-selected={filter === t.id} onClick={() => setFilter(t.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${ filter === t.id ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white' }`}>
                                        {t.label} <span className="text-slate-500 dark:text-slate-500">{t.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                            {initialLoading &&
                                Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                                    <li key={i} className="flex items-center gap-4 p-4 sm:p-5 animate-pulse" aria-hidden="true">
                                        <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                                            <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                                        </div>
                                    </li>
                                ))}

                            {rows.map((blog) => {
                                const published = isPublished(blog);
                                const busy = busyId === blog.$id;
                                return (
                                    <li key={blog.$id} className="flex items-center gap-4 p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                        {blog.image ? (
                                            <img src={blog.image} alt="" loading="lazy" className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200 dark:bg-slate-800" />
                                        ) : (
                                            <span className="w-16 h-16 rounded-xl shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-500 flex items-center justify-center">
                                                <Icon icon="mdi:image-outline" className="w-7 h-7" aria-hidden="true" />
                                            </span>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${ published ? 'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400'}`}>
                                                    {published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            {published && blog.slug ? (
                                                <Link to={`/view-blog/${blog.slug}`} className="block font-semibold text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{blog.title}</Link> ) : (
                                                <p className="font-semibold text-slate-900 dark:text-white truncate">{blog.title}</p>
                                            )}
                                            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                <span>{blog.author}</span>
                                                <span>{timeFormat(blog.$updatedAt || blog.$createdAt)}</span>
                                                <span className="inline-flex items-center gap-1">
                                                    <Icon icon="mdi:eye-outline" className="w-4 h-4" aria-hidden="true" /> {formatNumber(blog.views)}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0">
                                            <button type="button" onClick={() => togglePublish(blog)} disabled={busy} aria-label={published ? `Unpublish ${blog.title}` : `Publish ${blog.title}`} title={published ? 'Unpublish' : 'Publish'} className={`${iconBtn} hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400`} >
                                                <Icon icon={busy ? 'mdi:loading' : published ? 'mdi:eye-off-outline' : 'mdi:publish'} className={`w-5 h-5 ${busy ? 'animate-spin' : ''}`} aria-hidden="true" />
                                            </button>
                                            <button type="button" onClick={() => setDeleteTarget(blog)} disabled={busy} aria-label={`Delete ${blog.title}`} title="Delete" className={`${iconBtn} hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400`} >
                                                <Icon icon="mdi:delete-outline" className="w-5 h-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}

                            {!initialLoading && rows.length === 0 && (
                                <li className="p-10 text-center">
                                    <Icon icon="mdi:post-outline" className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" aria-hidden="true" />
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {filter === 'drafts' ? 'No drafts.' : filter === 'published' ? 'No published posts yet.' : 'No posts yet.'}
                                    </p>
                                </li>
                            )}
                        </ul>

                        {filtered.length > ROWS_SHOWN && (
                            <div className="flex items-center justify-between gap-3 p-4 sm:px-6 border-t border-slate-200 dark:border-slate-800 text-sm">
                                <span className="text-slate-600 dark:text-slate-400">
                                    Showing {ROWS_SHOWN} of {filtered.length}
                                </span>
                                <Link to="/blogs" className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                    View all articles <Icon icon="mdi:arrow-right" className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Side column */}
                    <div className="space-y-6">
                        {/* Most viewed */}
                        <div className={`${cardClass} p-5 sm:p-6`}>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Most viewed</h2>
                            {topPosts.length === 0 ? (
                                <p className="text-sm text-slate-600 dark:text-slate-400">No published posts yet.</p>
                            ) : (
                                <ol className="space-y-4">
                                    {topPosts.map((blog, i) => (
                                        <li key={blog.$id}>
                                            <div className="flex items-baseline justify-between gap-3 mb-1.5">
                                                <Link to={`/view-blog/${blog.slug}`} className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors" >
                                                    <span className="text-slate-500 mr-2">{i + 1}.</span> {blog.title}
                                                </Link>
                                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 shrink-0">
                                                    {formatNumber(blog.views)}
                                                </span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden" aria-hidden="true">
                                                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${Math.max(4, ((blog.views || 0) / maxViews) * 100)}%` }} />
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>

                        {/* Quick actions (sirf wahi routes jo App.jsx mein hain) */}
                        <div className={`${cardClass} p-5 sm:p-6`}>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Quick actions</h2>
                            <div className="space-y-1">
                                {QUICK_ACTIONS.map((a) => (
                                    <Link key={a.to} to={a.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" >
                                        <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${a.tone}`}>
                                            <Icon icon={a.icon} className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        <span className="font-medium text-slate-900 dark:text-white">{a.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete confirm popup */}
            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm" onClick={() => !busyId && setDeleteTarget(null)} >
                    <div role="dialog" aria-modal="true" aria-labelledby="delete-title" onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl" >
                        <span className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
                            <Icon icon="mdi:delete-alert-outline" className="w-6 h-6" aria-hidden="true" />
                        </span>
                        <h3 id="delete-title" className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete this post?</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            <span className="font-semibold text-slate-900 dark:text-white break-words">{deleteTarget.title}</span> will be permanently deleted. This cannot be undone.
                        </p>
                        <div className="flex flex-col-reverse sm:flex-row gap-3">
                            <button type="button" onClick={() => setDeleteTarget(null)} disabled={Boolean(busyId)} autoFocus className="flex-1 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" >
                                Cancel
                            </button> <button type="button" onClick={confirmDelete} disabled={Boolean(busyId)} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" >
                                {busyId ? (
                                    <>
                                        <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" aria-hidden="true" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AdminDashboard;
