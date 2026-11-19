import React from 'react'
import { focusRing } from '../../data/homeData';

const Chip = ({ active, onClick, children, count }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${focusRing} ${
            active
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500/60'
        }`}
    >
        {children}
        <span className={`text-xs ${active ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{count}</span>
    </button>
);

export default Chip
