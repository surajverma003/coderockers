import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';

import { registerUser } from '../api/signupApi';
import { PAGE_TITLE, ACCOUNT_CREATED_NOTICE, emptySignupForm } from '../data/signupData';
import { getStrength, getSignupError, validateSignup } from '../utils/signupUtils';
import { normalizeEmail, saveUserInfo } from '../utils/loginUtils';

const useSignup = () => {
    const [formData, setFormData] = useState(emptySignupForm);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { user, setUser, loading, googleLogin, githubLogin } = useContext(myContext);

    useEffect(() => {
        const previous = document.title;
        document.title = PAGE_TITLE;
        return () => {
            document.title = previous;
        };
    }, []);

    useEffect(() => {
        if (user) navigate('/', { replace: true });
    }, [user, navigate]);

    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const strength = getStrength(formData.password);
    const mismatch = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;

    const createAccount = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        const validationError = validateSignup(formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await registerUser({
                fullName: formData.fullName.trim(),
                email: normalizeEmail(formData.email),
                password: formData.password,
            });

            if (result.userData) {
                setUser(result.userData);
                saveUserInfo(result.userData);
            } else {
                // Account ban chuka hai, sirf auto-login fail hua.
                // Error dikhane ki jagah login page par bhej do, warna user dobara signup karke "already exists" dekhega.
                console.error('Signup Error:', result.error?.message);
                navigate('/login', { state: { notice: ACCOUNT_CREATED_NOTICE } });
            }
        } catch (err) {
            console.error('Signup Error:', err?.message);
            setError(getSignupError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, isLoading, error, strength, mismatch, loading, googleLogin, githubLogin, onchange, createAccount };
};

export default useSignup;
