import { account } from '../appwrite/appwrite';

// Email + password se login.
// { ok: true, userData } ya { ok: false, message } deta hai. Baaki errors throw hote hain.
export const loginWithEmail = async (email, password) => {
    try {
        await account.createEmailPasswordSession(email, password);
    } catch (err) {
        if (err?.type !== 'user_session_already_exists') throw err;

        // Kisi aur tab mein pehle se login hai (is tab ka state purana tha)
        const existing = await account.get();
        if ((existing.email || '').toLowerCase() !== email) {
            return {
                ok: false,
                message: `You are already signed in as ${existing.email}. Sign out first to use a different account.`,
            };
        }
    }

    const userData = await account.get();
    return { ok: true, userData };
};
