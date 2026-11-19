import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Moon, Sun, Menu, X, LogOut } from 'lucide-react';

import { SITE_NAME, SITE_LOGO } from '../utils/siteConfig';
import { focusRing } from '../data/homeData';
import { navLinks, iconBtn, desktopLinkClass, mobileLinkClass } from '../data/navbarData';
import useNavbar from '../hooks/useNavbar';

import ProfilePopup from '../reuse/ProfilePopup';

/* ------------------------------ Helpers ------------------------------- */

const GoogleIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

/* ------------------------------ Component ----------------------------- */

const Navbar = () => {
    const {
        user, isDarkMode, isMobileMenuOpen, searchQuery, scrolled, searchRef,
        toggleDarkMode, toggleMobileMenu, closeMobileMenu,
        handleSearchChange, handleSearch, handleAuth,
    } = useNavbar();

    return (
        <nav className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-shadow duration-300 bg-white/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 ${scrolled ? 'shadow-sm shadow-slate-900/5 dark:shadow-black/20' : ''}`} data-testid="navbar" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Logo / Brand */}
                    <Link to="/" className={`flex items-center gap-2.5 rounded-lg shrink-0 hover:opacity-80 transition-opacity ${focusRing}`}>
                        <img src={SITE_LOGO} alt="" className="w-10 h-10 object-contain" />
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{SITE_NAME}</span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden lg:flex items-center gap-1" data-testid="desktop-nav-links">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} to={link.href} className={desktopLinkClass} data-testid={`nav-link-${link.name.toLowerCase()}`}>
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <form onSubmit={handleSearch} role="search" className="relative" data-testid="search-bar-container">
                            <label htmlFor="navbar-search" className="sr-only">
                                Search articles
                            </label>
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={18} data-testid="search-icon" />
                            <input id="navbar-search" ref={searchRef} type="search" placeholder="Search articles" value={searchQuery} onChange={handleSearchChange} className="w-40 xl:w-56 focus:w-60 xl:focus:w-72 pl-10 pr-9 py-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 [&::-webkit-search-cancel-button]:appearance-none" data-testid="search-input" />
                            {!searchQuery && (
                                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                    /
                                </kbd>
                            )}
                        </form>

                        <button onClick={toggleDarkMode} className={iconBtn} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} data-testid="dark-mode-toggle">
                            <Sun className={`absolute text-yellow-500 transition-all duration-300 ${isDarkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} size={20} data-testid="sun-icon" />
                            <Moon className={`absolute transition-all duration-300 ${isDarkMode ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} size={20} data-testid="moon-icon" />
                        </button>

                        <ProfilePopup />

                        {user ? (
                            <button onClick={handleAuth} className={iconBtn} aria-label="Log out" title="Log out" data-testid="auth-btn">
                                <LogOut size={20} />
                            </button>
                        ) : (
                            <button onClick={handleAuth} className={`inline-flex items-center gap-2 pl-3 pr-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${focusRing}`} data-testid="auth-btn" >
                                <GoogleIcon className="w-5 h-5" /> Sign in
                            </button>
                        )}
                    </div>

                    {/* Mobile controls */}
                    <div className="lg:hidden flex items-center gap-2">
                        <button onClick={toggleDarkMode} className={iconBtn} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} data-testid="mobile-dark-mode-toggle">
                            {isDarkMode ? <Sun className="text-yellow-500" size={20} /> : <Moon size={20} />}
                        </button>
                        <ProfilePopup />
                        <button onClick={toggleMobileMenu} className={iconBtn} aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu" data-testid="mobile-menu-button" >
                            {isMobileMenuOpen ? <X size={22} data-testid="close-icon" /> : <Menu size={22} data-testid="menu-icon" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu drawer (page ke upar overlay hota hai, content ko push nahi karta) */}
            <div id="mobile-menu" aria-hidden={!isMobileMenuOpen} className={`lg:hidden absolute inset-x-0 top-full grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-in-out ${isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100 visible' : 'grid-rows-[0fr] opacity-0 invisible'}`} data-testid="mobile-menu-drawer" >
                <div className="min-h-0 overflow-y-auto max-h-[calc(100dvh-4rem)] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10">
                    <div className="px-4 pt-4 pb-5 space-y-2">
                        {/* Mobile search */}
                        <form onSubmit={handleSearch} role="search" className="relative mb-3">
                            <label htmlFor="mobile-search" className="sr-only">
                                Search articles
                            </label>
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" size={18} />
                            <input id="mobile-search" type="search" placeholder="Search articles" value={searchQuery} onChange={handleSearchChange} className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all [&::-webkit-search-cancel-button]:appearance-none" data-testid="mobile-search-input" />
                        </form>

                        {/* Mobile links */}
                        {navLinks.map((link) => {
                            const LinkIcon = link.icon;
                            return (
                                <NavLink key={link.name} to={link.href} onClick={closeMobileMenu} className={mobileLinkClass} data-testid={`mobile-nav-link-${link.name.toLowerCase()}`} >
                                    <LinkIcon size={20} /> {link.name}
                                </NavLink>
                            );
                        })}

                        {/* Auth */}
                        <button onClick={handleAuth} className={`w-full mt-2 flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium ${focusRing}`} data-testid="mobile-auth-btn" >
                            {user ?
                                (<><LogOut size={20} /> Logout</>) :
                                (<><GoogleIcon /> Continue with Google</>)
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
