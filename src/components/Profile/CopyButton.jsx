import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { focusRing } from '../../data/profileData';

const CopyButton = ({ text, label }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return undefined;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={label}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 ${focusRing}`}
        >
            <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} className={copied ? 'text-green-600' : ''} aria-hidden="true" />
        </button>
    );
};

export default CopyButton;
