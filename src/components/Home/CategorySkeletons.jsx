import React from 'react'
import { pulse } from '../../data/homeData';

const CategorySkeletons = () =>
    Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900" aria-hidden="true">
            <div className={`w-12 h-12 rounded-xl mb-6 ${pulse}`} />
            <div className={`h-4 w-20 rounded mb-2 ${pulse}`} />
            <div className={`h-3 w-14 rounded ${pulse}`} />
        </div>
    ));

export default CategorySkeletons
