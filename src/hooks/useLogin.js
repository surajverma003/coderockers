import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import myContext from '../context/myContext';
import { loginWithEmail } from '../api/loginApi';
import { PAGE_TITLE, emptyLoginForm } from '../data/loginData';
import { getLoginError, normalizeEmail, saveUserInfo } from '../utils/loginUtils';

const useLogin = () => {
    const [formData, setFormData] = useState(emptyLoginForm);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser, loading, googleLogin, githubLogin } = useContext(myContext);

    // Signup se aaya message (jaise "Your account was created. Please sign in.")
    const notice = location.state?.notice;

    useEffect(() => {
        const previous = document.title;
        document.title = PAGE_TITLE;
        return () => {
            document.title = previous;
        };
    }, []);

    // Pehle se logged-in user ko login page pe rokne ki zaroorat nahi
    useEffect(() => {
        if (user) navigate('/', { replace: true });
    }, [user, navigate]);

    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const loginAccount = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        setIsLoading(true);
        setError('');

        const email = normalizeEmail(formData.email);

        try {
            const result = await loginWithEmail(email, formData.password);
            if (!result.ok) {
                setError(result.message);
                return;
            }

            // State aur LocalStorage update karo
            setUser(result.userData);
            saveUserInfo(result.userData);
        } catch (err) {
            console.error('Login Error:', err?.message);
            setError(getLoginError(err));
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, isLoading, error, notice, loading, googleLogin, githubLogin, onchange, loginAccount };
};

export default useLogin;
