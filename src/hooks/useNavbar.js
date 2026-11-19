import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';
import { SCROLL_SHADOW_THRESHOLD } from '../data/navbarData';
import { USER_STORAGE_KEY } from '../data/loginData';
import { getInitialTheme, saveTheme } from '../utils/navbarUtils';

const useNavbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const searchRef = useRef(null);
    const { pathname } = useLocation();

    const { googleLogin, user, setUser, account, navigate } = useContext(myContext);

    /* ---- Theme ---- */
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        saveTheme(next);
    };

    /* ---- Mobile menu ---- */
    const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // Page change hone par menu band
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Escape se menu band
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && setIsMobileMenuOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    /* ---- Scroll shadow ---- */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > SCROLL_SHADOW_THRESHOLD);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ---- Search: "/" dabao to search focus ---- */
    useEffect(() => {
        const onKey = (e) => {
            const tag = e.target.tagName;
            const typing = tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable;
            if (e.key === '/' && !typing) {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;
        // Blogs page par ?search= query param se filter karna
        navigate(`/blogs?search=${encodeURIComponent(query)}`);
        setIsMobileMenuOpen(false);
    };

    /* ---- Auth ---- */
    const logout = async () => {
        const confirm = window.confirm('Do you really want to logout?');
        if (!confirm) return;

        try {
            await account.deleteSession('current');
            window.localStorage.removeItem(USER_STORAGE_KEY);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAuth = () => {
        if (user) {
            logout();
        } else {
            googleLogin();
        }
    };

    return {
        user, isDarkMode, isMobileMenuOpen, searchQuery, scrolled, searchRef,
        toggleDarkMode, toggleMobileMenu, closeMobileMenu,
        handleSearchChange, handleSearch, handleAuth,
    };
};

export default useNavbar;
