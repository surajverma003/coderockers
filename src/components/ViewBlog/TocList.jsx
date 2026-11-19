import React from 'react'
import { stripInline } from '../../utils/viewBlogUtils';
    
const TocList = ({ items, activeId, onNavigate }) => (
    <ul className="space-y-1">
        {items.map((item) => (
            <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => onNavigate(e, item.id)} className={`block py-1.5 pl-3 border-l-2 text-sm leading-snug transition-colors ${item.level > 2 ? 'ml-3' : ''} ${activeId === item.id ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400'}`} >
                    {stripInline(item.text)}
                </a>
            </li>
        ))}
    </ul>
);

export default TocList
