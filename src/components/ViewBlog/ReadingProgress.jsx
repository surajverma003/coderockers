import React from 'react';
import { useReadingProgress } from '../../hooks/useViewBlog';

const ReadingProgress = ({ targetRef }) => {
    const barRef = useReadingProgress(targetRef);

    // Navbar (h-16) ke theek neeche chipka rehta hai
    return (
        <div className="fixed left-0 right-0 top-16 z-40 h-1 pointer-events-none" aria-hidden="true" data-testid="reading-progress">
            <div ref={barRef} className="h-full origin-left bg-gradient-to-r from-blue-500 to-indigo-500" style={{ transform: 'scaleX(0)' }} />
        </div>
    );
};

export default ReadingProgress;
