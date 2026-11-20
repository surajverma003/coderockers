import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { SITE_LOGO } from '../utils/siteConfig';

const inputClass = 'w-full py-3 rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition';

/* ---------- Input field (icon + optional password show/hide) ---------- */
export const AuthField = ({ id, label, icon, type = 'text', right, hasError, ...props }) => {
    const [show, setShow] = useState(false);
    const isPassword = type === 'password';

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label htmlFor={id} className="text-sm font-semibold text-slate-900 dark:text-white">
                    {label}
                </label>
                {right}
            </div>
            <div className="relative">
                <Icon icon={icon} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                <input id={id} type={isPassword && show ? 'text' : type} aria-invalid={hasError || undefined} className={`${inputClass} pl-11 ${isPassword ? 'pr-12' : 'pr-4'} ${hasError ? 'border-red-400 dark:border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'}`}
                    {...props}
                />
                {isPassword && (
                    <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" >
                        <Icon icon={show ? 'mdi:eye-off-outline' : 'mdi:eye-outline'} className="w-5 h-5" aria-hidden="true" />
                    </button>
                )}
            </div>
        </div>
    );
};

/* ---------- Google / GitHub buttons ---------- */
export const SocialButtons = ({ loading, googleLogin, githubLogin }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button type="button" onClick={googleLogin} disabled={loading === 'google'} className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" >
            <Icon icon="logos:google-icon" className="w-5 h-5" aria-hidden="true" /> Google
        </button>
        <button type="button" onClick={githubLogin} disabled={loading === 'github'} className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-900 dark:border-slate-700 text-white font-medium hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" >
            <Icon icon="mdi:github" className="w-5 h-5" aria-hidden="true" /> GitHub
        </button>
    </div>
);

/* ---------- "or" divider ---------- */
export const OrDivider = ({ text = 'or continue with email' }) => (
    <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        <span className="text-sm text-slate-600 dark:text-slate-400">{text}</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
    </div>
);

/* ---------- Error box ---------- */
export const AuthError = ({ children }) =>
    children ? (
        <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-sm text-red-700 dark:text-red-300" >
            <Icon icon="mdi:alert-circle-outline" className="w-5 h-5 shrink-0" aria-hidden="true" /> <span>{children}</span>
        </div>
    ) : null;

/* ---------- Submit button ---------- */
export const AuthSubmit = ({ loading, idleText, loadingText }) => (
    <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" >
        {loading ? (
            <>
                <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" aria-hidden="true" />
                {loadingText}
            </>
        ) : (
            idleText
        )}
    </button>
);

/* ---------- Page layout: brand panel (left) + form (right) ---------- */
const AuthLayout = ({ title, subtitle, side, children, footer }) => (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/5">
            {/* Left: brand panel (sirf desktop pe) */}
            <aside className="relative hidden lg:flex flex-col justify-between p-10 bg-slate-900 text-white overflow-hidden">
                <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-500/25 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />

                <div className="relative flex items-center gap-3">
                    <img src={SITE_LOGO} alt="" className="w-9 h-9 object-contain" />
                    <span className="text-xl font-bold">CodeRokers</span>
                </div>

                <div className="relative">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">{side.heading}</h2>
                    <p className="text-slate-300 leading-relaxed mb-8">{side.text}</p>

                    <div className="rounded-2xl border border-slate-700 bg-slate-950/70 overflow-hidden" aria-hidden="true">
                        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800">
                            <span className="w-3 h-3 rounded-full bg-red-400/80" />
                            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                            <span className="w-3 h-3 rounded-full bg-green-400/80" />
                        </div>
                        <div className="p-4 font-mono text-sm space-y-1.5">
                            {side.terminal.map((line) => (
                                <p key={line} className={line.startsWith('$') ? 'text-blue-300' : 'text-slate-300'} >
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Right: form */}
            <div className="p-6 sm:p-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">{title}</h1>
                    <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
                </div>

                {children}

                <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">{footer}</p>
            </div>
        </div>
    </section>
);

export default AuthLayout;
