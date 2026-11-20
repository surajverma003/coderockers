import { DATABASE_ID, databases, ID, SUBSCRIBERS_COLLECTION_ID } from '../appwrite/appwrite';

export const isValidEmail = (value = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

// Result: { ok: true, already: false }  -> naya subscriber
//         { ok: true, already: true }   -> pehle se subscribed (409)
//         { ok: false, code, error }    -> kuch galat hua
export const subscribeToNewsletter = async (email) => {
    try {
        await databases.createDocument(DATABASE_ID, SUBSCRIBERS_COLLECTION_ID, ID.unique(), {
            email: email.trim().toLowerCase(),
        });
        return { ok: true, already: false };
    } catch (error) {
        if (error?.code === 409) return { ok: true, already: true };
        console.error('Newsletter error:', error?.message);
        return { ok: false, code: error?.code, error: error?.message };
    }
};

// User ko dikhane layak error message
export const getSubscribeError = (result) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return 'You appear to be offline. Check your connection and try again.';
    if (result?.code === 429) return 'Too many attempts. Please wait a minute and try again.';
    return "Couldn't subscribe right now. Try again in a moment.";
};
