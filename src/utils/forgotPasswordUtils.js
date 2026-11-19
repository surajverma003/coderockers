import { LINK_LIFETIME_MS, STORAGE_KEY } from '../data/forgotPasswordData';

export const getRecoveryError = (err) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return 'You appear to be offline. Check your connection and try again.';
    if (err?.code === 429) return 'Too many requests. Wait a minute and try again.';
    // 400 mein Appwrite ka config detail (jaise "URL host must be one of...") hota hai.
    // Wo user ko dikhana theek nahi, console mein poora error already log hota hai.
    if (err?.code === 400) return 'We could not send the reset link. Check the email address and try again.';
    return err?.message || 'Something went wrong. Try again.';
};

// Refresh karne par success screen aur cooldown na ud jaye (sirf is tab ke liye)
export const readSaved = () => {
    try {
        const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
        if (!saved?.email || Date.now() - saved.at > LINK_LIFETIME_MS) return null;
        return saved;
    } catch {
        return null;
    }
};

export const saveSent = (address) => {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ email: address, at: Date.now() }));
    } catch { /* storage band ho to bhi flow chalna chahiye */ }
};

export const clearSaved = () => {
    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
};
