import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { focusRing } from '../data/homeData';

import useNotFound from '../hooks/useNotFound';

const NotFound = () => {
    const pathname = useNotFound();

    return (
        <section className="relative overflow-hidden" data-testid="not-found-page">
            {/* Ek baar hilne wala broken-link icon (reduced-motion mein band) */}
            <style>{`
                @keyframes cr-shake {
                    0%, 100% { transform: rotate(0); }
                    15% { transform: rotate(-12deg); }
                    30% { transform: rotate(10deg); }
                    45% { transform: rotate(-8deg); }
                    60% { transform: rotate(6deg); }
                    75% { transform: rotate(-3deg); }
                }
                .cr-shake { animation: cr-shake .9s ease-in-out .3s 1; }
                @media (prefers-reduced-motion: reduce) { .cr-shake { animation: none; } }
            `}</style>

            {/* Background: dot grid + halka laal glow (error ka mood) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background-size:24px_24px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
                {/* Error badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 mb-8">
                    <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-semibold text-red-700 dark:text-red-300">Error 404</span>
                </div>

                {/* 4 [broken link] 4 */}
                <div className="flex items-center justify-center gap-2 sm:gap-4 select-none" role="img" aria-label="404">
                    <span className="text-8xl sm:text-[10rem] lg:text-[12rem] font-black leading-none tracking-tighter text-red-600 dark:text-red-500">4</span>
                    <span className="cr-shake flex items-center justify-center w-20 h-20 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border-[6px] sm:border-8 border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10">
                        <Icon icon="mdi:link-off" className="w-10 h-10 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-red-600 dark:text-red-500" />
                    </span>
                    <span className="text-8xl sm:text-[10rem] lg:text-[12rem] font-black leading-none tracking-tighter text-red-600 dark:text-red-500">4</span>
                </div>

                <h1 className="mt-8 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Page not found</h1>
                <p className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
                    This page does not exist. It may have been moved or deleted, or the link is wrong.
                </p>

                {/* Alert box: kaun sa address galat tha */}
                <div role="alert" className="mt-8 mx-auto max-w-lg flex items-start gap-3 text-left rounded-xl border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 px-4 py-3" >
                    <Icon icon="mdi:close-circle" className="w-6 h-6 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-red-800 dark:text-red-200">No page exists at this address</p>
                        <p className="mt-1 font-mono text-sm text-red-700 dark:text-red-300 break-all">{pathname}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link to="/" className={`group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 ${focusRing}`} >
                        <Icon icon="mdi:home-outline" className="w-5 h-5" /> Go home
                    </Link>
                    <Link to="/blogs" className={`inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:-translate-y-0.5 ${focusRing}`} >
                        <Icon icon="mdi:book-open-page-variant-outline" className="w-5 h-5" /> Browse articles
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
