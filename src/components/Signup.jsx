import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout, { AuthField, AuthError, AuthSubmit, OrDivider, SocialButtons } from '../reuse/AuthLayout';
import { MIN_PASSWORD, signupSide, strengthLabels, strengthColors, strengthText } from '../data/signupData';

import useSignup from '../hooks/useSignup';

const Signup = () => {
    const { formData, isLoading, error, strength, mismatch, loading, googleLogin, githubLogin, onchange, createAccount } = useSignup();

    return (
        <AuthLayout title="Create account" subtitle="It takes less than a minute." side={signupSide}
            footer={
                <>
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Sign in
                    </Link>
                </>
            }
        >
            <SocialButtons loading={loading} googleLogin={googleLogin} githubLogin={githubLogin} />
            <OrDivider />

            <form onSubmit={createAccount} className="space-y-5">
                <AuthField id="fullName" name="fullName" label="Full name" icon="mdi:account-outline" value={formData.fullName} onChange={onchange} placeholder="John Doe" autoComplete="name" maxLength={128} required />

                <AuthField id="email" name="email" type="email" label="Email address" icon="mdi:email-outline" value={formData.email} onChange={onchange} placeholder="you@example.com" autoComplete="email" required />

                <div>
                    <AuthField id="password" name="password" type="password" label="Password" icon="mdi:lock-outline" value={formData.password} onChange={onchange} placeholder={`At least ${MIN_PASSWORD} characters`} autoComplete="new-password" minLength={MIN_PASSWORD} required />

                    {formData.password && (
                        <div className="mt-3" aria-live="polite">
                            <div className="flex gap-1.5" aria-hidden="true">
                                {[0, 1, 2, 3].map((i) => (
                                    <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${ i < strength ? strengthColors[strength] : 'bg-slate-200 dark:bg-slate-800' }`} />
                                ))}
                            </div>
                            <p className={`mt-1.5 text-xs font-medium ${strengthText[strength]}`}>
                                Password strength: {strengthLabels[strength]}
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <AuthField id="confirmPassword" name="confirmPassword" type="password" label="Confirm password" icon="mdi:lock-check-outline" value={formData.confirmPassword} onChange={onchange} placeholder="Re-enter your password" autoComplete="new-password" hasError={mismatch} required />
                    {mismatch && (
                        <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
                            Passwords do not match.
                        </p>
                    )}
                </div>

                <AuthError>{error}</AuthError>

                <AuthSubmit loading={isLoading} idleText="Create account" loadingText="Creating account..." />

                <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                    By creating an account you agree to our{' '}
                    <Link to="/terms" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Terms
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Privacy Policy
                    </Link>
                    .
                </p>
            </form>
        </AuthLayout>
    );
};

export default Signup;
