import { databases } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID } from '../data/viewBlogData';

// JUGAAD VERSION: browser se seedha views +1.
// Is kaam ke liye blogpost table mein Any role ko Update permission chahiye (chat mein steps diye hain).
// Asli/secure tarika baad mein: Appwrite Function.

// Pehle atomic increment try karta hai (do log ek saath aaye to bhi count sahi rahe).
// SDK purana ho to read-modify-write par fallback.
export const incrementViews = async (docId, currentViews = 0) => {
    try {
        if (typeof databases.incrementDocumentAttribute === 'function') {
            try {
                await databases.incrementDocumentAttribute(DATABASE_ID, COLLECTION_ID, docId, 'views', 1);
                return true;
            } catch (error) {
                console.warn('Atomic increment fail, fallback par ja rahe:', error?.message);
            }
        }
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, { views: currentViews + 1 });
        return true;
    } catch (error) {
        console.error('Views error:', error?.message);
        return false;
    }
};
