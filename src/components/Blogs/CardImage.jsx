import { Icon } from '@iconify/react';
import React, { useState } from 'react'

const CardImage = ({ src, alt, category }) => {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-400">
                <Icon icon="mdi:text-box-outline" className="w-12 h-12 opacity-60" />
                <span className="sr-only">{category}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
    );
};
export default CardImage
