import { account } from '../appwrite/appwrite';

// User is link se /change-password pe aayega (URL mein userId aur secret ke saath).
// Ye domain Appwrite console > Overview > Platforms mein add hona chahiye.
export const sendRecoveryLink = async (address) => {
    try {
        await account.createRecovery(address, `${window.location.origin}/change-password`);
    } catch (err) {
        // Account nahi mila (404). Par ye batate nahi, taaki koi email check na kar sake
        if (err?.code === 404) return;
        throw err;
    }
};
