import React from 'react'

const ArticleNotFound = () => (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center" data-testid="blog-not-found">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-red-600 dark:border-red-500 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 mb-6">
            <Icon icon="mdi:file-question-outline" className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Article not found</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">This article doesn’t exist or is no longer available.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/blogs" className={`inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors ${focusRing}`}>
                <Icon icon="mdi:book-open-page-variant-outline" className="w-5 h-5" /> Browse articles
            </Link>
            <Link to="/" className={`inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${focusRing}`}>
                Go home
            </Link>
        </div>
    </div>
);

export default ArticleNotFound
