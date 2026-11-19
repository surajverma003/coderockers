import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { loginSide } from '../data/loginData';

import AuthLayout, { AuthField, AuthError, AuthSubmit, OrDivider, SocialButtons } from '../reuse/AuthLayout';
import useLogin from '../hooks/useLogin';

const Login = () => {
    const { formData, isLoading, error, notice, loading, googleLogin, githubLogin, onchange, loginAccount } = useLogin();

    return (
        <AuthLayout title="Sign in" subtitle="Enter your details to continue to your account." side={loginSide}
            footer={
                <>
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Sign up
                    </Link>
                </>
            }
        >
            {notice && (
                <div role="status" className="mb-5 flex items-start gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-sm text-green-700 dark:text-green-300" >
                    <Icon icon="mdi:check-circle-outline" className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{notice}</span>
                </div>
            )}

            <SocialButtons loading={loading} googleLogin={googleLogin} githubLogin={githubLogin} />
            <OrDivider />

            <form onSubmit={loginAccount} className="space-y-5">
                <AuthField id="email" name="email" type="email" label="Email address" icon="mdi:email-outline" value={formData.email} onChange={onchange} placeholder="you@example.com" autoComplete="email" required />
                <AuthField id="password" name="password" type="password" label="Password" icon="mdi:lock-outline" value={formData.password} onChange={onchange} placeholder="Enter your password" autoComplete="current-password" required
                    right={
                        <Link to="/forgot-password" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline" >
                            Forgot password?
                        </Link>
                    }
                />

                <AuthError>{error}</AuthError>
                <AuthSubmit loading={isLoading} idleText="Sign in" loadingText="Signing in..." />
            </form>
        </AuthLayout>
    );
};

export default Login;
