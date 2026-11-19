import React from 'react'

const ArticleSkeleton = () => (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse" aria-busy="true" aria-label="Loading article">
        <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800 mb-8" />
        <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800 mb-5" />
        <div className="h-10 w-4/5 rounded bg-slate-200 dark:bg-slate-800 mb-3" />
        <div className="h-10 w-2/3 rounded bg-slate-200 dark:bg-slate-800 mb-8" />
        <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="aspect-[21/9] rounded-3xl bg-slate-200 dark:bg-slate-800 mb-12" />
        <div className="space-y-4 max-w-3xl">
            {[100, 95, 100, 80, 100, 90, 60].map((w, i) => (
                <div key={i} className="h-4 rounded bg-slate-200 dark:bg-slate-800" style={{ width: `${w}%` }} />
            ))}
        </div>
    </div>
);

export default ArticleSkeleton
