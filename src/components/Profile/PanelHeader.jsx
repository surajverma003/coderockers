import React from 'react';

const PanelHeader = ({ title, text }) => (
    <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">{text}</p>
    </div>
);

export default PanelHeader;
