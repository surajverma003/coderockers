import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { forgotSide } from '../data/forgotPasswordData';

import useForgotPassword from '../hooks/useForgotPassword';
import AuthLayout, { AuthField, AuthError, AuthSubmit } from '../reuse/AuthLayout';

const ForgotPassword = () => {
    const { email, sentTo, loading, error, cooldown, successRef, 
        handleEmailChange, handleSubmit, handleResend, chooseDifferentEmail } = useForgotPassword();

    const backToLogin = (
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded" >
            <Icon icon="mdi:arrow-left" className="w-5 h-5" aria-hidden="true" /> Back to sign in
        </Link>
    );

    return (
        <AuthLayout title={sentTo ? 'Check your email' : 'Forgot password?'} subtitle={sentTo ? 'If an account exists, a reset link is on its way.' : 'No worries. We will email you a reset link.'} side={forgotSide}
            footer={
                <>
                    Remember your password?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Sign in
                    </Link>
                </>
            }
        >
            {!sentTo ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <AuthField id="email" name="email" type="email" label="Email address" icon="mdi:email-outline" value={email} onChange={handleEmailChange} placeholder="you@example.com" autoComplete="email" required />

                    <AuthError>{error}</AuthError>

                    <AuthSubmit loading={loading} idleText="Send reset link" loadingText="Sending..." />

                    <div className="text-center">{backToLogin}</div>
                </form>
            ) : (
                <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="space-y-6 focus:outline-none">
                    <div className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                        <span className="shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center">
                            <Icon icon="mdi:email-check-outline" className="w-6 h-6" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                            <p className="text-sm text-slate-600 dark:text-slate-400">We sent a link to</p>
                            <p className="font-semibold text-slate-900 dark:text-white break-all">{sentTo}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                The link expires after 1 hour. Not there? Check your spam folder.
                            </p>
                        </div>
                    </div>

                    <AuthError>{error}</AuthError>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button type="button" onClick={handleResend} disabled={loading || cooldown > 0} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" >
                            {loading ? (
                                <>
                                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" aria-hidden="true" />
                                    Sending...
                                </>
                            ) : cooldown > 0 ? (
                                `Resend in ${cooldown}s`
                            ) : (
                                'Resend email'
                            )}
                        </button>
                        <button type="button" onClick={chooseDifferentEmail} className="flex-1 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" >
                            Use a different email
                        </button>
                    </div>

                    <div className="text-center">{backToLogin}</div>
                </div>
            )}
        </AuthLayout>
    );
};

export default ForgotPassword;
