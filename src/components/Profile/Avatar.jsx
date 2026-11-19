import React from 'react';

// Naam ka pehla akshar gradient box mein
const Avatar = ({ name, email, size = 'w-14 h-14 text-2xl' }) => (
    <div
        className={`${size} shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white`}
        aria-hidden="true"
    >
        {(name || email || 'U').charAt(0).toUpperCase()}
    </div>
);

export default Avatar;
