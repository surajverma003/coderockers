import { useEffect, useRef, useState } from 'react';
import { sendRecoveryLink } from '../api/forgotPasswordApi';
import { PAGE_TITLE, RESEND_SECONDS } from '../data/forgotPasswordData';
import { getRecoveryError, readSaved, saveSent, clearSaved } from '../utils/forgotPasswordUtils';

const useForgotPassword = () => {
    const [initial] = useState(readSaved);
    const [email, setEmail] = useState(initial?.email || '');
    const [sentTo, setSentTo] = useState(initial?.email || ''); // khaali = form dikhao, bhara = success dikhao
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(() =>
        initial ? Math.max(0, RESEND_SECONDS - Math.floor((Date.now() - initial.at) / 1000)) : 0
    );

    const successRef = useRef(null);

    useEffect(() => {
        const previous = document.title;
        document.title = PAGE_TITLE;
        return () => {
            document.title = previous;
        };
    }, []);

    // Resend ka countdown
    useEffect(() => {
        if (cooldown <= 0) return;
        const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(t);
    }, [cooldown]);

    // Success screen aate hi focus wahan jaye (screen reader aur keyboard users ke liye)
    useEffect(() => {
        if (sentTo) successRef.current?.focus();
    }, [sentTo]);

    const markSent = (address) => {
        setSentTo(address);
        setCooldown(RESEND_SECONDS);
        saveSent(address);
    };

    const sendLink = async (address) => {
        setLoading(true);
        setError('');

        try {
            await sendRecoveryLink(address);
            markSent(address);
        } catch (err) {
            console.error('Recovery Error:', err?.message);
            setError(getRecoveryError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;
        sendLink(email.trim().toLowerCase());
    };

    const handleResend = () => {
        if (loading || cooldown > 0) return;
        sendLink(sentTo);
    };

    const chooseDifferentEmail = () => {
        setSentTo('');
        setError('');
        setCooldown(0);
        clearSaved();
    };

    return { email, sentTo, loading, error, cooldown, successRef, handleEmailChange, handleSubmit, handleResend, chooseDifferentEmail };
};

export default useForgotPassword;
