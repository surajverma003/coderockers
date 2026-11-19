import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import myContext from '../context/myContext';

const useProfilePopup = () => {
    const { user } = useContext(myContext);
    const { pathname } = useLocation();

    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    // Listeners sirf tab jab popup khula ho: bahar click ya Escape par band
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };

        document.addEventListener('pointerdown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    // Page change hone par band
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleLinkClick = () => setIsOpen(false);

    // Arrow keys se menu items ke beech move karna
    const handleMenuKeyDown = (e) => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        const items = Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') || []);
        if (!items.length) return;
        e.preventDefault();
        const current = items.indexOf(document.activeElement);
        const next = e.key === 'ArrowDown' ? (current + 1) % items.length : (current - 1 + items.length) % items.length;
        items[next].focus();
    };

    return { user, pathname, isOpen, setIsOpen, popupRef, triggerRef, menuRef, handleLinkClick, handleMenuKeyDown };
};

export default useProfilePopup;
