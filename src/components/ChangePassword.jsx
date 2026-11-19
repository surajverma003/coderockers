import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { MIN_PASSWORD, strengthLabels, strengthColors, strengthText } from '../data/signupData';
import { sideReset, sideChange } from '../data/changePasswordData';

import useChangePassword from '../hooks/useChangePassword';
import AuthLayout, { AuthField, AuthError, AuthSubmit } from '../reuse/AuthLayout';

const ChangePassword = () => {
    const {
        user, isRecovery, hasPassword, showCurrent,
        formData, loading, error, success, linkInvalid, checking,
        strength, rules, mismatch,
        handleChange, handleSubmit,
    } = useChangePassword();

    const linkClass = 'inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';
    const primaryLink = `${linkClass} bg-blue-600 hover:bg-blue-700 text-white`;
    const secondaryLink = `${linkClass} border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800`;

    /* ---------- Session check chal raha hai ---------- */
    if (checking) {
        return (
            <AuthLayout title="One moment" subtitle="Checking your session..." side={sideChange} footer="">
                <div role="status" className="flex justify-center py-6 text-blue-600 dark:text-blue-400">
                    <Icon icon="mdi:loading" className="w-8 h-8 animate-spin" aria-hidden="true" />
                    <span className="sr-only">Loading</span>
                </div>
            </AuthLayout>
        );
    }

    /* ---------- Na recovery link, na logged-in user ---------- */
    if (!isRecovery && !user) {
        return (
            <AuthLayout title="Sign in required" subtitle="You need to be signed in to change your password." side={sideChange} footer="Forgot your password? We can email you a reset link." >
                <div className="space-y-3">
                    <Link to="/login" className={primaryLink}>
                        <Icon icon="mdi:login" className="w-5 h-5" aria-hidden="true" /> Sign in
                    </Link>
                    <Link to="/forgot-password" className={secondaryLink}>
                        <Icon icon="mdi:lock-reset" className="w-5 h-5" aria-hidden="true" /> Reset password
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    /* ---------- Reset link kharab ya expire ---------- */
    if (linkInvalid) {
        return (
            <AuthLayout title="Link expired" subtitle="This reset link is invalid or has already been used." side={sideReset}
                footer={
                    <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Back to sign in
                    </Link>
                }
            >
                <div role="alert" className="space-y-6">
                    <div className="flex items-start gap-4 p-5 rounded-2xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10">
                        <Icon icon="mdi:link-variant-off" className="w-6 h-6 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                        <p className="text-sm text-red-700 dark:text-red-300">
                            Reset links work once and expire after 1 hour. Request a new one to continue.
                        </p>
                    </div>
                    <Link to="/forgot-password" className={primaryLink}>
                        <Icon icon="mdi:email-fast-outline" className="w-5 h-5" aria-hidden="true" /> Request a new link
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    /* ---------- Success ---------- */
    if (success) {
        return (
            <AuthLayout title={isRecovery ? 'Password reset' : hasPassword ? 'Password updated' : 'Password set'} subtitle="Use your new password the next time you sign in." side={isRecovery ? sideReset : sideChange} footer="You can change it again anytime from your profile." >
                <div role="status" className="space-y-6">
                    <div className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                        <span className="shrink-0 w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center">
                            <Icon icon="mdi:shield-check-outline" className="w-6 h-6" aria-hidden="true" />
                        </span>
                        <p className="text-slate-700 dark:text-slate-300">Your password was changed successfully.</p>
                    </div>

                    {isRecovery ? (
                        <Link to="/login" className={primaryLink}>
                            <Icon icon="mdi:login" className="w-5 h-5" aria-hidden="true" /> Sign in
                        </Link>
                    ) : (
                        <div className="space-y-3">
                            <Link to="/profile" className={primaryLink}>
                                <Icon icon="mdi:account-outline" className="w-5 h-5" aria-hidden="true" /> Go to profile
                            </Link>
                            <Link to="/" className={secondaryLink}>
                                <Icon icon="mdi:home-outline" className="w-5 h-5" aria-hidden="true" /> Back to home
                            </Link>
                        </div>
                    )}
                </div>
            </AuthLayout>
        );
    }

    /* ---------- Form ---------- */
    return (
        <AuthLayout
            title={isRecovery ? 'Set new password' : hasPassword ? 'Change password' : 'Set a password'}
            subtitle={ isRecovery ? 'Choose a new password for your account.' : hasPassword ? 'Enter your current password, then choose a new one.' : 'Choose a password so you can also sign in with your email.' }
            side={isRecovery ? sideReset : sideChange}
            footer={
                isRecovery ? (
                    <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Back to sign in
                    </Link>
                ) : (
                    <Link to="/profile" className="inline-flex items-center gap-2 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors" >
                        <Icon icon="mdi:arrow-left" className="w-5 h-5" aria-hidden="true" /> Back to profile
                    </Link>
                )
            }
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Google/GitHub se aaye user ko samjhao ki purana password kyun nahi maang rahe */}
                {!isRecovery && !hasPassword && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-sm text-blue-800 dark:text-blue-200">
                        <Icon icon="mdi:information-outline" className="w-5 h-5 shrink-0" aria-hidden="true" />
                        <span>You signed in with Google or GitHub, so you do not have a password yet. No current password is needed.</span>
                    </div>
                )}

                {showCurrent && (
                    <AuthField id="currentPassword" name="currentPassword" type="password" label="Current password" icon="mdi:lock-outline" value={formData.currentPassword} onChange={handleChange} placeholder="Enter current password" autoComplete="current-password" required />
                )}

                <div>
                    <AuthField id="newPassword" name="newPassword" type="password" label="New password" icon="mdi:lock-plus-outline" value={formData.newPassword} onChange={handleChange} placeholder={`At least ${MIN_PASSWORD} characters`} autoComplete="new-password" minLength={MIN_PASSWORD} required />

                    {formData.newPassword && (
                        <div className="mt-3" aria-live="polite">
                            <div className="flex gap-1.5" aria-hidden="true">
                                {[0, 1, 2, 3].map((i) => (
                                    <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${ i < strength ? strengthColors[strength] : 'bg-slate-200 dark:bg-slate-800' }`} />
                                ))}
                            </div>
                            <p className={`mt-1.5 text-xs font-medium ${strengthText[strength]}`}>
                                Password strength: {strengthLabels[strength]}
                            </p>

                            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                                {rules.map((rule) => (
                                    <li key={rule.text} className={`flex items-center gap-2 text-xs ${ rule.ok ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400' }`} >
                                        <Icon icon={rule.ok ? 'mdi:check-circle' : 'mdi:circle-outline'} className="w-4 h-4 shrink-0" aria-hidden="true" />
                                        {rule.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    <AuthField id="confirmPassword" name="confirmPassword" type="password" label="Confirm new password" icon="mdi:lock-check-outline" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter new password" autoComplete="new-password" hasError={mismatch} required />
                    {formData.confirmPassword && (
                        <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${ mismatch ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400' }`} >
                            <Icon icon={mismatch ? 'mdi:close-circle' : 'mdi:check-circle'} className="w-4 h-4" aria-hidden="true" />
                            {mismatch ? 'Passwords do not match' : 'Passwords match'}
                        </p>
                    )}
                </div>

                <AuthError>{error}</AuthError>

                <AuthSubmit loading={loading} idleText={isRecovery ? 'Set new password' : hasPassword ? 'Update password' : 'Set password'} loadingText="Updating..." />
            </form>
        </AuthLayout>
    );
};

export default ChangePassword;
