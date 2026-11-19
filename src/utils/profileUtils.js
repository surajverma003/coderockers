import { BIO_MAX } from '../data/profileData';

// Sirf PURE functions: input lo, output do. Yahan React state (setDraft, setUser...) kabhi nahi.
// State badalne wala logic hooks/useProfileForm.js mein hai.

// Only http/https links are allowed (a plain type="url" input still accepts "javascript:" URLs)
export const normalizeUrl = (value) => {
    const t = (value || '').trim();
    if (!t) return '';
    const withProto = /^[a-z][a-z0-9+.-]*:/i.test(t) ? t : `https://${t}`;
    try {
        const u = new URL(withProto);
        return ['http:', 'https:'].includes(u.protocol) ? u.toString() : null;
    } catch {
        return null;
    }
};

export const cleanHandle = (value, domainPattern) =>
    (value || '').trim().replace(domainPattern, '').replace(/^@/, '').replace(/\/.*$/, '');

// Appwrite user -> form ke fields
export const toProfile = (user) => ({
    name: user?.name || '',
    bio: user?.prefs?.bio || '',
    location: user?.prefs?.location || '',
    website: user?.prefs?.website || '',
    twitter: user?.prefs?.twitter || '',
    github: user?.prefs?.github || '',
});

export const validate = (draft) => {
    const name = draft.name.trim();
    if (!name) return { error: 'Name is required.' };
    if (name.length > 128) return { error: 'Name must be 128 characters or fewer.' };
    if (draft.bio.length > BIO_MAX) return { error: `Bio must be ${BIO_MAX} characters or fewer.` };

    const website = normalizeUrl(draft.website);
    if (website === null) return { error: 'Website must be a valid http or https link.' };

    const twitter = cleanHandle(draft.twitter, /^https?:\/\/(www\.)?(x|twitter)\.com\//i);
    if (twitter && !/^[A-Za-z0-9_]{1,15}$/.test(twitter)) return { error: 'X username can use letters, numbers and underscores, up to 15 characters.' };

    const github = cleanHandle(draft.github, /^https?:\/\/(www\.)?github\.com\//i);
    if (github && !/^[A-Za-z0-9-]{1,39}$/.test(github)) return { error: 'GitHub username can use letters, numbers and hyphens, up to 39 characters.' };

    return { clean: { name, bio: draft.bio.trim(), location: draft.location.trim(), website, twitter, github } };
};

// Form mein kuch badla hai ya nahi
export const isDirty = (draft, saved) =>
    Object.keys(saved).some((key) => (draft[key] || '').trim() !== (saved[key] || '').trim());

export const formatDate = (value, options = { day: 'numeric', month: 'short', year: 'numeric' }) =>
    value ? new Date(value).toLocaleDateString('en-IN', options) : '';
