import React from 'react'

const SectionHeader = ({ title, subtitle }) => (
    <div className="max-w-2xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">{title}</h2>
        {subtitle && <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">{subtitle}</p>}
    </div>
);

export default SectionHeader
