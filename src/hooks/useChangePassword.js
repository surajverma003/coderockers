import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import myContext from '../context/myContext';
import { resetPasswordWithLink, updateUserPassword } from '../api/changePasswordApi';
import { RECOVERY_TITLE, CHANGE_TITLE, emptyPasswordForm } from '../data/changePasswordData';
import { getRules, getStrength, validatePasswordForm, classifyPasswordError } from '../utils/changePasswordUtils';

const useChangePassword = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Forgot-password ka email link ?userId=...&secret=... ke saath yahan aata hai.
    // Values ek baar state mein rakh lete hain, phir URL se hata dete hain.
    const [recovery] = useState(() => {
        const userId = searchParams.get('userId');
        const secret = searchParams.get('secret');
        return userId && secret ? { userId, secret } : null;
    });
    const isRecovery = Boolean(recovery);

    const { user, checkStatus } = useContext(myContext);

    // OAuth (Google/GitHub) se bane account ka password nahi hota. Tab Appwrite mein passwordUpdate khaali hota hai
    const hasPassword = user?.passwordUpdate !== '';
    const showCurrent = !isRecovery && hasPassword;

    const [formData, setFormData] = useState(emptyPasswordForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [linkInvalid, setLinkInvalid] = useState(false);
    const [checking, setChecking] = useState(!isRecovery && !user);

    // Secret URL (history/screenshot) mein na rahe
    useEffect(() => {
        if (recovery) setSearchParams({}, { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // User null ho to pehle session check, tab "Sign in required" dikhao (flash se bachne ke liye)
    useEffect(() => {
        if (isRecovery) return undefined;
        if (user) {
            setChecking(false);
            return undefined;
        }
        let alive = true;
        Promise.resolve(checkStatus?.()).finally(() => alive && setChecking(false));
        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    useEffect(() => {
        const previous = document.title;
        document.title = isRecovery ? RECOVERY_TITLE : CHANGE_TITLE;
        return () => {
            document.title = previous;
        };
    }, [isRecovery]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const strength = getStrength(formData.newPassword);
    const rules = getRules(formData.newPassword);
    const mismatch = formData.confirmPassword.length > 0 && formData.newPassword !== formData.confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const validationError = validatePasswordForm(formData, showCurrent);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            if (isRecovery) {
                await resetPasswordWithLink(recovery.userId, recovery.secret, formData.newPassword);
            } else {
                // OAuth account ke liye purana password nahi bhejte
                await updateUserPassword(formData.newPassword, showCurrent ? formData.currentPassword : undefined);
            }
            setFormData(emptyPasswordForm);
            setSuccess(true);
        } catch (err) {
            console.error('Password Error:', err?.message);
            const result = classifyPasswordError(err, isRecovery);
            if (result.linkInvalid) setLinkInvalid(true);
            else setError(result.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        user, isRecovery, hasPassword, showCurrent,
        formData, loading, error, success, linkInvalid, checking,
        strength, rules, mismatch,
        handleChange, handleSubmit,
    };
};

export default useChangePassword;
