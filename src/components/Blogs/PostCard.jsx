import React from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { formatViews } from '../../utils/blogUtils';

import CardImage from './CardImage';

const PostCard = ({ post, timeFormat }) => (
    <article className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
            <CardImage src={post.image} alt="" category={post.category} />
            <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-semibold text-slate-900 dark:text-white rounded-full">
                {post.category}
            </span>
            {post.views !== null && (
                <span className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                    <Icon icon="mdi:eye" className="w-4 h-4" />
                    {formatViews(post.views)}
                </span>
            )}
        </div>

        <div className="flex flex-col flex-1 p-6">
            <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                <Link to={`/view-blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-blue-500" >
                    {post.title}
                </Link>
            </h2>

            {post.excerpt && <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">{post.excerpt}</p>}

            <div className="mt-auto pt-5 flex items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                        {String(post.author).charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                        <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{post.author}</p>
                        {post.createdAt && <p>{timeFormat ? timeFormat(post.createdAt) : ''}</p>}
                    </div>
                </div>
                {post.readTime && (
                    <span className="inline-flex items-center gap-1 shrink-0">
                        <Icon icon="mdi:clock-outline" className="w-4 h-4" /> {post.readTime}
                    </span>
                )}
            </div>
        </div>
    </article>
);

export default PostCard
