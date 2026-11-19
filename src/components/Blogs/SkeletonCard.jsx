import React from 'react'

const SkeletonCard = () => (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-pulse" aria-hidden="true">
        <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800" />
        <div className="p-6 space-y-3">
            <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-3 pt-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
        </div>
    </div>
);

export default SkeletonCard
