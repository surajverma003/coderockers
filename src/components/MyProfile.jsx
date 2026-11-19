import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import myContext from '../context/myContext';
import useProfileForm from '../hooks/useProfileForm';

import { CONTACT_EMAIL } from '../utils/siteConfig';
import { BIO_MAX, TABS, focusRing, inputCls, cardCls, labelCls } from '../data/profileData';
import { cleanHandle, formatDate, normalizeUrl } from '../utils/profileUtils';

import Avatar from './Profile/Avatar';
import CopyButton from './Profile/CopyButton';
import PanelHeader from './Profile/PanelHeader';
import SecurityPanel from './Profile/SecurityPanel';

const MyProfile = () => {
    const { user, setUser } = useContext(myContext);

    // Form ka saara state aur logic hook mein hai (hooks/useProfileForm.js)
    const { draft, saved, dirty, saving, error, notice, handleChange, discard, handleSubmit } = useProfileForm(user, setUser);
    const [tab, setTab] = useState('profile');

    // Tabs: arrow keys se bhi badle
    const onTabKeyDown = (e) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        const index = TABS.findIndex((t) => t.id === tab);
        const next = TABS[(index + keys[e.key] + TABS.length) % TABS.length];
        setTab(next.id);
        document.getElementById(`tab-${next.id}`)?.focus();
    };

    if (!user) {
        return (
            <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-20">
                <div className={`${cardCls} max-w-md w-full p-8 text-center`}>
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                        <Icon icon="mdi:account-lock-outline" className="text-3xl" aria-hidden="true" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">You’re not signed in</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">Sign in to manage your profile and settings.</p>
                    <Link to="/login" className={`inline-flex px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors ${focusRing}`}>Sign in</Link>
                </div>
            </section>
        );
    }

    const preview = { ...draft, website: normalizeUrl(draft.website) || '' };
    const filled = Object.values(saved).filter(Boolean).length;
    const percent = Math.round((filled / Object.keys(saved).length) * 100);
    const deleteMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Account deletion request')}&body=${encodeURIComponent(`Please delete my account (ID: ${user.$id}).`)}`;

    return (
        <section className="bg-slate-50 dark:bg-slate-950 px-4 py-10 sm:px-6 lg:px-8 transition-colors" data-testid="profile-page">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">Manage your profile, account and security.</p>
                </header>

                <div className="grid lg:grid-cols-[16rem_minmax(0,1fr)] gap-8">
                    {/* ---------------------- Left: summary + tabs ---------------------- */}
                    <aside className="lg:sticky lg:top-24 h-fit">
                        <div className={`${cardCls} p-5`}>
                            <div className="flex items-center gap-3">
                                <Avatar name={saved.name} email={user.email} />
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-slate-900 dark:text-white">{saved.name || 'Add your name'}</p>
                                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="mb-1.5 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                    <span>Profile complete</span><span className="font-semibold text-slate-700 dark:text-slate-200">{percent}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden" role="progressbar" aria-label="Profile completeness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                                    <div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${percent}%` }} />
                                </div>
                            </div>

                            <div role="tablist" aria-label="Settings sections" aria-orientation="vertical" onKeyDown={onTabKeyDown} className="mt-5 -mx-1 flex lg:flex-col gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {TABS.map((t) => {
                                    const active = tab === t.id;
                                    const danger = t.id === 'danger';
                                    return (
                                        <button key={t.id} id={`tab-${t.id}`} role="tab" type="button" aria-selected={active} aria-controls="settings-panel" tabIndex={active ? 0 : -1} onClick={() => setTab(t.id)} className={`shrink-0 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${focusRing} ${ active ? danger ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' : danger ? 'text-red-600/80 dark:text-red-400/80 hover:bg-red-50 dark:hover:bg-red-500/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' }`}>
                                            <Icon icon={t.icon} className="text-xl" aria-hidden="true" /> {t.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* --------------------------- Right: panel --------------------------- */}
                    <div id="settings-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="min-w-0">
                        <div aria-live="polite">
                            {notice && (
                                <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-300 dark:border-green-500/40 bg-green-50 dark:bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                                    <Icon icon="mdi:check-circle-outline" className="text-lg" aria-hidden="true" />{notice}
                                </div>
                            )}
                        </div>

                        {/* ------------------------------ Profile ------------------------------ */}
                        {tab === 'profile' && (
                            <>
                                <PanelHeader title="Public profile" text="This is how readers see you next to your articles." />
                                <div className="grid xl:grid-cols-[minmax(0,1fr)_17rem] gap-6 items-start">
                                    <form onSubmit={handleSubmit} noValidate className={`${cardCls} p-6 sm:p-8 space-y-5`}>
                                        {error && (
                                            <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                                                <Icon icon="mdi:alert-circle-outline" className="mt-0.5 text-lg shrink-0" aria-hidden="true" />{error}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="name" className={labelCls}>Full name</label>
                                                <input id="name" name="name" type="text" value={draft.name} onChange={handleChange} maxLength={128} required autoComplete="name" className={inputCls} />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className={labelCls}>Email</label>
                                                <input id="email" type="email" value={user.email || ''} disabled aria-describedby="email-hint" className={inputCls} />
                                                <p id="email-hint" className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">Your sign-in email can’t be changed here.</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="bio" className={labelCls}>Bio</label>
                                            <textarea id="bio" name="bio" rows={4} value={draft.bio} onChange={handleChange} maxLength={BIO_MAX} placeholder="A line or two about you" className={`${inputCls} resize-none`} />
                                            <p className={`mt-1.5 text-right text-xs ${draft.bio.length > BIO_MAX * 0.9 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>{draft.bio.length}/{BIO_MAX}</p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label htmlFor="location" className={labelCls}>Location</label>
                                                <input id="location" name="location" type="text" value={draft.location} onChange={handleChange} placeholder="City, Country" maxLength={80} autoComplete="address-level2" className={inputCls} />
                                            </div>
                                            <div>
                                                <label htmlFor="website" className={labelCls}>Website</label>
                                                <input id="website" name="website" type="text" inputMode="url" value={draft.website} onChange={handleChange} placeholder="yoursite.com" className={inputCls} />
                                            </div>
                                            <div>
                                                <label htmlFor="twitter" className={labelCls}>X username</label>
                                                <input id="twitter" name="twitter" type="text" value={draft.twitter} onChange={handleChange} placeholder="username" className={inputCls} />
                                            </div>
                                            <div>
                                                <label htmlFor="github" className={labelCls}>GitHub username</label>
                                                <input id="github" name="github" type="text" value={draft.github} onChange={handleChange} placeholder="username" className={inputCls} />
                                            </div>
                                        </div>

                                        {/* Sticky save bar: sirf tab dikhti hai jab kuch badla ho */}
                                        {dirty && (
                                            <div className="sticky bottom-4 z-10 -mx-2 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3 shadow-xl shadow-slate-900/10" role="status">
                                                <p className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                                                    <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" /> You have unsaved changes
                                                </p>
                                                <div className="flex gap-2">
                                                    <button type="button" onClick={discard} disabled={saving} className={`rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-60 ${focusRing}`}>Discard</button>
                                                    <button type="submit" disabled={saving} className={`inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}>
                                                        {saving ? (<><Icon icon="svg-spinners:ring-resize" className="text-lg" aria-hidden="true" />Saving...</>) : 'Save changes'}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </form>

                                    {/* Live preview */}
                                    <aside className="xl:sticky xl:top-24" aria-label="Profile preview">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Live preview</p>
                                        <div className={`${cardCls} p-5`}>
                                            <div className="flex items-center gap-3">
                                                <Avatar name={preview.name} email={user.email} size="w-12 h-12 text-xl" />
                                                <div className="min-w-0">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Written by</p>
                                                    <p className="truncate font-bold text-slate-900 dark:text-white">{preview.name || 'Your name'}</p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line break-words">
                                                {preview.bio || <span className="text-slate-400">Your bio will appear here.</span>}
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                                                {preview.location && <span className="inline-flex items-center gap-1"><Icon icon="mdi:map-marker-outline" className="text-base" aria-hidden="true" />{preview.location}</span>}
                                                {preview.website && <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400"><Icon icon="mdi:link-variant" className="text-base" aria-hidden="true" />{preview.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>}
                                                {preview.twitter && <span className="inline-flex items-center gap-1"><Icon icon="simple-icons:x" aria-hidden="true" />@{cleanHandle(preview.twitter, /^https?:\/\/(www\.)?(x|twitter)\.com\//i)}</span>}
                                                {preview.github && <span className="inline-flex items-center gap-1"><Icon icon="mdi:github" className="text-base" aria-hidden="true" />{cleanHandle(preview.github, /^https?:\/\/(www\.)?github\.com\//i)}</span>}
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </>
                        )}

                        {/* ------------------------------ Account ------------------------------ */}
                        {tab === 'account' && (
                            <>
                                <PanelHeader title="Account" text="Your account details and shortcuts." />
                                <div className={`${cardCls} divide-y divide-slate-200 dark:divide-slate-800 mb-6`}>
                                    {[
                                        { label: 'Email', value: user.email, extra: (
                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${user.emailVerification ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                                                <Icon icon={user.emailVerification ? 'mdi:check-decagram' : 'mdi:alert-outline'} aria-hidden="true" />{user.emailVerification ? 'Verified' : 'Not verified'}
                                            </span>
                                        ) },
                                        { label: 'Member since', value: formatDate(user.$createdAt, { month: 'long', year: 'numeric' }) },
                                        { label: 'User ID', value: user.$id, mono: true, copy: true },
                                    ].map((row) => (
                                        <div key={row.label} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">{row.label}</span>
                                            <span className="flex min-w-0 items-center gap-2">
                                                <span className={`truncate font-medium text-slate-900 dark:text-white ${row.mono ? 'font-mono text-sm' : ''}`}>{row.value}</span>
                                                {row.extra}
                                                {row.copy && <CopyButton text={row.value} label="Copy user ID" />}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <nav aria-label="Account shortcuts" className="grid sm:grid-cols-3 gap-4">
                                    {[
                                        { to: '/create-blog', icon: 'mdi:pencil-plus-outline', title: 'Write a post' },
                                        { to: '/admin-dashboard', icon: 'mdi:view-dashboard-outline', title: 'Dashboard' },
                                        { to: '/privacy', icon: 'mdi:shield-account-outline', title: 'Privacy policy' },
                                    ].map((l) => (
                                        <Link key={l.to} to={l.to} className={`group ${cardCls} p-5 hover:border-blue-400 dark:hover:border-blue-500/60 hover:-translate-y-0.5 transition-all ${focusRing}`}>
                                            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"><Icon icon={l.icon} aria-hidden="true" /></span>
                                            <span className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                                                {l.title}<Icon icon="mdi:arrow-right" className="text-slate-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                            </span>
                                        </Link>
                                    ))}
                                </nav>
                            </>
                        )}

                        {/* ------------------------------ Security ------------------------------ */}
                        {tab === 'security' && <SecurityPanel />}

                        {/* ------------------------------- Danger ------------------------------- */}
                        {tab === 'danger' && (
                            <>
                                <PanelHeader title="Delete account" text="Permanently remove your account and its data." />
                                <div className="rounded-2xl border border-red-300 dark:border-red-500/40 bg-white dark:bg-slate-900 p-6 sm:p-8">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl text-red-600 dark:bg-red-500/15 dark:text-red-400"><Icon icon="mdi:alert-outline" aria-hidden="true" /></div>
                                    <p className="mb-6 max-w-xl text-slate-600 dark:text-slate-300">
                                        Account deletion is handled by request. We will remove your account and its data. <strong className="font-semibold text-slate-900 dark:text-white">This can’t be undone.</strong>
                                    </p>
                                    <a href={deleteMailto} className={`inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 transition-colors ${focusRing}`}>
                                        <Icon icon="mdi:email-outline" className="text-lg" aria-hidden="true" />Request deletion
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile
