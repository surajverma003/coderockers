import React from 'react';
import { Icon } from '@iconify/react';
import { focusRing } from '../../data/homeData';
import { useShare } from '../../hooks/useViewBlog';

const ShareButtons = ({ title }) => {
    const { canNativeShare, nativeShare, copied, copyLink, links } = useShare(title);

    const btn = `inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${focusRing}`;

    return (
        <div className="flex flex-wrap items-center gap-3" data-testid="share-buttons">
            {canNativeShare && (
                <button type="button" onClick={nativeShare} className={btn}>
                    <Icon icon="mdi:share-variant" className="w-5 h-5" /> Share
                </button>
            )}
            {links.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className={btn} aria-label={`Share on ${link.name}`}>
                    <Icon icon={link.icon} className="w-5 h-5" /> {link.name}
                </a>
            ))}
            <button type="button" onClick={copyLink} className={btn}>
                <Icon icon={copied ? 'mdi:check' : 'mdi:link-variant'} className="w-5 h-5" />
                {copied ? 'Link copied' : 'Copy link'}
            </button>
        </div>
    );
};

export default ShareButtons;
