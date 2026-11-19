import { useEffect, useMemo, useRef, useState } from 'react';
import { isDirty, toProfile, validate } from '../utils/profileUtils';
import { account } from '../appwrite/appwrite';

// Profile form ka saara state aur logic yahan hai (custom hook).
// Component ko bas ye values mil jaati hain: const { draft, handleChange, ... } = useProfileForm(user, setUser)
const useProfileForm = (user, setUser) => {
    const saved = useMemo(() => toProfile(user), [user]);
    const [draft, setDraft] = useState(saved);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    const dirty = isDirty(draft, saved);
    const dirtyRef = useRef(dirty);
    dirtyRef.current = dirty;

    // user baad mein aaye / refresh ho to form sync ho (par unsaved typing na mitaye)
    useEffect(() => {
        if (!dirtyRef.current) setDraft(toProfile(user));
    }, [user]);

    useEffect(() => {
        if (!notice) return undefined;
        const timer = setTimeout(() => setNotice(''), 4000);
        return () => clearTimeout(timer);
    }, [notice]);

    // Unsaved changes ke saath tab band karne par warning
    useEffect(() => {
        if (!dirty) return undefined;
        const warn = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDraft((d) => ({ ...d, [name]: value }));
        setError('');
    };

    const discard = () => {
        setDraft(saved);
        setError('');
    };

    const persistUser = (next) => {
        setUser(next);
        window.localStorage.setItem('UserInfo', JSON.stringify(next));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!dirty || saving) return;
        setError('');

        const { error: validationError, clean } = validate(draft);
        if (validationError) {
            setError(validationError);
            return;
        }

        setSaving(true);
        try {
            if (clean.name !== user.name) await account.updateName(clean.name);
            // updatePrefs replaces the whole object, so merge with what's already stored
            const { name, ...extra } = clean;
            const prefs = { ...(user.prefs || {}), ...extra };
            await account.updatePrefs(prefs);

            persistUser({ ...user, name: clean.name, prefs }); // turant UI + Navbar update
            setDraft(clean);
            setNotice('Profile updated.');
        } catch (err) {
            setError(err?.message || 'Could not save your profile. Please try again.');
            setSaving(false);
            return;
        }
        setSaving(false);

        try {
            persistUser(await account.get());
        } catch {
            /* already saved; refresh fail hona error nahi hai */
        }
    };

    return { draft, saved, dirty, saving, error, notice, handleChange, discard, handleSubmit };
};

export default useProfileForm;
