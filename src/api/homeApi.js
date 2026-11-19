import { subscribeToNewsletter, getSubscribeError } from '../utils/newsletterUtils';

// Blogs fetch (context mein cache hota hai, dobara fetch nahi hota)
export const fetchHomeBlogs = async (getBlogs) => {
    try {
        await getBlogs();
    } catch (error) {
        console.error(error.message);
    }
};

// Newsletter subscribe: { ok: true } ya { ok: false, message }
export const subscribeEmail = async (email) => {
    const result = await subscribeToNewsletter(email);
    return result.ok ? { ok: true } : { ok: false, message: getSubscribeError(result) };
};
