import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLE = '404 – Page not found | CodeRokers';

// Galat address (pathname) deta hai aur browser tab mein bhi error dikhata hai
const useNotFound = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const previous = document.title;
        document.title = PAGE_TITLE;
        return () => {
            document.title = previous;
        };
    }, []);

    return pathname;
};

export default useNotFound;
