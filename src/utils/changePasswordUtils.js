import { MIN_PASSWORD } from '../data/signupData';

export const getRules = (pw) => [
    { ok: pw.length >= MIN_PASSWORD, text: `At least ${MIN_PASSWORD} characters` },
    { ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw), text: 'Upper and lowercase letters' },
    { ok: /\d/.test(pw), text: 'At least one number' },
    { ok: /[^A-Za-z0-9]/.test(pw), text: 'At least one special character' },
];

export const getStrength = (pw) => getRules(pw).filter((r) => r.ok).length;

// Reset link kharab/adhoora/expire ya use ho chuka ho
export const isInvalidLink = (err) =>
    err?.code === 401 || err?.code === 404 || (err?.code === 400 && /user ?id|secret/i.test(err?.message || ''));

// Login session khatam ho chuka ho (galat current password se alag)
export const isSessionExpired = (err) => err?.type === 'general_unauthorized_scope' || /missing scope/i.test(err?.message || '');

// Form galat ho to error message, sahi ho to '' deta hai
export const validatePasswordForm = (formData, showCurrent) => {
    if (formData.newPassword.length < MIN_PASSWORD) return `New password must be at least ${MIN_PASSWORD} characters long.`;
    if (formData.newPassword !== formData.confirmPassword) return 'New passwords do not match.';
    if (showCurrent && formData.currentPassword === formData.newPassword) return 'New password must be different from your current password.';
    return '';
};

// Appwrite error -> { linkInvalid: true } ya { message }
export const classifyPasswordError = (err, isRecovery) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return { message: 'You appear to be offline. Check your connection and try again.' };
    if (err?.code === 429) return { message: 'Too many attempts. Wait a minute and try again.' };
    if (isRecovery && isInvalidLink(err)) return { linkInvalid: true };
    if (!isRecovery && isSessionExpired(err)) return { message: 'Your session has expired. Please sign in again and retry.' };
    if (err?.code === 401) return { message: 'Current password is incorrect.' };
    return { message: err?.message || 'Failed to change password. Try again.' };
};
