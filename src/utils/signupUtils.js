import { MIN_PASSWORD } from '../data/signupData';

export const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= MIN_PASSWORD) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
};

export const getSignupError = (err) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return 'You appear to be offline. Check your connection and try again.';
    if (err?.code === 409) return 'An account with this email already exists. Try signing in instead.';
    if (err?.code === 429) return 'Too many attempts. Wait a minute and try again.';
    return err?.message || 'Something went wrong. Try again.';
};

// Form galat ho to error message, sahi ho to '' deta hai
export const validateSignup = (formData) => {
    if (!formData.fullName.trim()) return 'Please enter your name.';
    if (formData.password.length < MIN_PASSWORD) return `Password must be at least ${MIN_PASSWORD} characters.`;
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
    return '';
};
