import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const LatestCard = ({ post, timeFormat }) => {
    const [failed, setFailed] = useState(false);
    return (
        <article className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-500/15 to-indigo-500/15">
                {post.image && !failed && (
                    <img src={post.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onError={() => setFailed(true)} alt="" />
                )}
            </div>
            <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1.5">{post.category}</span>
                <h3 className="font-bold leading-snug text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link to={`/view-blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-blue-500" >
                        {post.title}
                    </Link>
                </h3>
                <p className="mt-auto pt-4 text-xs text-slate-600 dark:text-slate-400">
                    {post.author}
                    {post.createdAt && timeFormat ? ` · ${timeFormat(post.createdAt)}` : ''}
                </p>
            </div>
        </article>
    );
};

export default LatestCard
