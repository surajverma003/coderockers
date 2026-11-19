import React from 'react'
import { pulse } from '../../data/homeData';

const CardSkeleton = () => (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden" aria-hidden="true">
        <div className={`aspect-[16/10] ${pulse}`} />
        <div className="p-5 space-y-3">
            <div className={`h-3 w-16 rounded ${pulse}`} />
            <div className={`h-5 w-4/5 rounded ${pulse}`} />
            <div className={`h-3 w-1/2 rounded ${pulse}`} />
        </div>
    </div>
);

export default CardSkeleton
