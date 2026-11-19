import { USER_STORAGE_KEY } from '../data/loginData';

export const getLoginError = (err) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return 'You appear to be offline. Check your connection and try again.';
    if (err?.type === 'user_blocked') return 'This account has been disabled. Please contact support.';
    if (err?.code === 401) return 'Incorrect email or password.';
    if (err?.code === 429) return 'Too many attempts. Wait a minute and try again.';
    if (err?.code === 400) return 'Please check your email and password and try again.';
    return err?.message || 'Something went wrong. Try again.';
};

export const normalizeEmail = (email) => email.trim().toLowerCase();

export const saveUserInfo = (userData) => localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
