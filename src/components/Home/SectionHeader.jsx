import React from 'react'
import { Link } from 'react-router-dom';
import { focusRing } from '../../data/homeData';
import { Icon } from '@iconify/react';

const SectionHeader = ({ title, subtitle, actionTo, actionLabel, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
        <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">{title}</h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>
        {actionTo && (
            <Link to={actionTo} className={`group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold rounded-md ${focusRing}`} >
                {actionLabel} <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
        )}
        {children}
    </div>
);

export default SectionHeader
