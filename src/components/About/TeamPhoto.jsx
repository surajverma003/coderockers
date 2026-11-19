import React, { useState } from 'react'

const TeamPhoto = ({ member }) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-6xl font-bold">
                {member.name.charAt(0)}
            </div>
        );
    }

    return (
        <img src={member.image} alt={member.name} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
    );
};

export default TeamPhoto
