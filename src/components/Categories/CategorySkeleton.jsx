import React from 'react'
import { pulse } from '../../data/homeData';

const CategorySkeleton = () => (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6" aria-hidden="true">
        <div className={`h-12 w-12 rounded-xl mb-5 ${pulse}`} />
        <div className={`h-5 w-28 rounded mb-2 ${pulse}`} />
        <div className={`h-3 w-full rounded mb-6 ${pulse}`} />
        <div className={`h-3 w-20 rounded ${pulse}`} />
    </div>
);

export default CategorySkeleton
