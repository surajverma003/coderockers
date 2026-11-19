import { useEffect, useState } from 'react';
import { isValidEmail, subscribeToNewsletter, getSubscribeError } from '../utils/newsletterUtils';
import { SUCCESS_MESSAGE_MS } from '../data/footerData';

const useFooter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | error | success
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (status === 'error') setStatus('idle');
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (status === 'loading') return;

        if (!isValidEmail(email)) {
            setStatus('error');
            setMessage('Enter a valid email address.');
            return;
        }

        setStatus('loading');
        setMessage('');

        const result = await subscribeToNewsletter(email);
        if (result.ok) {
            setStatus('success');
            setMessage('Subscribed successfully!');
            setEmail('');
        } else {
            setStatus('error');
            setMessage(getSubscribeError(result));
        }
    };

    // Success message 4 second baad hat jaye (cleanup ke saath)
    useEffect(() => {
        if (status !== 'success') return;
        const timer = setTimeout(() => setStatus('idle'), SUCCESS_MESSAGE_MS);
        return () => clearTimeout(timer);
    }, [status]);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return { email, status, message, handleEmailChange, handleSubscribe, scrollToTop };
};

export default useFooter;
