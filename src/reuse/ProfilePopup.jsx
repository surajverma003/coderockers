import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { focusRing } from '../data/homeData';
import { userLinks } from '../data/profilePopupData';
import { SITE_NAME } from '../utils/siteConfig';

import useProfilePopup from '../hooks/useProfilePopup';

// Avatar: image > initial > neutral icon (logged-out)
const Avatar = ({ user, size = 'w-10 h-10', text = 'text-sm' }) => {
    const [failed, setFailed] = useState(false);

    if (user?.avatar && !failed) {
        return <img src={user.avatar} alt={user.name || 'Profile'} onError={() => setFailed(true)} className={`${size} rounded-full object-cover`} />;
    }

    if (user) {
        return (
            <div className={`${size} ${text} rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold`}>
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
        );
    }

    return (
        <div className={`${size} rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400`}>
            <Icon icon="mdi:account" className="w-5 h-5" />
        </div>
    );
};

/* ------------------------------ Component ----------------------------- */

const ProfilePopup = ({ onLogout }) => {
    const { user, pathname, isOpen, setIsOpen, popupRef, triggerRef, menuRef, handleLinkClick, handleMenuKeyDown } = useProfilePopup();

    const itemClass = (active) =>
        `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${focusRing} ${active
            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`;

    return (
        <div className="relative" ref={popupRef}>
            {/* Popup animation (reduced-motion respect hota hai) */}
            <style>{`
                @keyframes cr-pop { from { opacity: 0; transform: translateY(-6px) scale(.97); } to { opacity: 1; transform: none; } }
                .cr-pop { transform-origin: top right; animation: cr-pop .16s ease-out; }
                @media (prefers-reduced-motion: reduce) { .cr-pop { animation: none; } }
            `}</style>

            {/* Avatar trigger */}
            <button ref={triggerRef} type="button" onClick={() => setIsOpen((open) => !open)} aria-haspopup="menu" aria-expanded={isOpen} aria-label={user ? `Account menu for ${user.name || 'user'}` : 'Account menu'} data-testid="profile-trigger" className={`relative w-10 h-10 rounded-full transition-all duration-300 ring-2 ${isOpen ? 'ring-blue-500' : 'ring-transparent hover:ring-blue-400'} ${focusRing}`} >
                <Avatar user={user} />
                {user && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-950 rounded-full"></span>}
            </button>

            {/* Popup menu */}
            {isOpen && (
                <div ref={menuRef} role="menu" aria-label="Account" onKeyDown={handleMenuKeyDown} className="cr-pop absolute right-0 top-full mt-3 w-64 max-w-[calc(100vw-2rem)] z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 overflow-hidden" >
                    {user ? (
                        <>
                            {/* User info */}
                            <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-800">
                                <Avatar user={user} size="w-11 h-11" text="text-base" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user.name || 'User'}</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{user.email || 'user@example.com'}</p>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="p-2">
                                {userLinks.map((link) => {
                                    const active = pathname === link.to;
                                    return (
                                        <Link key={link.to} to={link.to} role="menuitem" onClick={handleLinkClick} className={itemClass(active)}>
                                            <span className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg transition-colors ${active ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                                <Icon icon={link.icon} className="w-5 h-5" />
                                            </span>
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Logout */}
                            {onLogout && (
                                <div className="p-2 border-t border-slate-200 dark:border-slate-800">
                                    <button type="button" role="menuitem" className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors ${focusRing}`}
                                        onClick={() => {
                                            setIsOpen(false);
                                            onLogout();
                                        }}
                                    >
                                        <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10">
                                            <Icon icon="mdi:logout" className="w-5 h-5" />
                                        </span>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Guest panel */
                        <div className="p-5">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Join {SITE_NAME}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
                                Sign in to save articles, comment, and write your own posts.
                            </p>
                            <div className="space-y-2">
                                <Link to="/login" role="menuitem" onClick={handleLinkClick} className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors ${focusRing}`} >
                                    <Icon icon="mdi:login" className="w-5 h-5" /> Login
                                </Link>
                                <Link to="/signup" role="menuitem" onClick={handleLinkClick} className={`flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold transition-colors ${focusRing}`} >
                                    <Icon icon="mdi:account-plus-outline" className="w-5 h-5" /> Sign Up
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilePopup;
