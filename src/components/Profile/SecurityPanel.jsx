import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { account } from '../../appwrite/appwrite';
import { cardCls, focusRing } from '../../data/profileData';
import { formatDate } from '../../utils/profileUtils';
import PanelHeader from './PanelHeader';

const SecurityPanel = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [busyId, setBusyId] = useState(null);

    const load = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await account.listSessions();
            setSessions(res.sessions || []);
        } catch (err) {
            setError(err?.message || 'Could not load your sessions.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const signOut = async (id) => {
        setBusyId(id);
        try {
            await account.deleteSession(id);
            setSessions((list) => list.filter((s) => s.$id !== id));
        } catch (err) {
            setError(err?.message || 'Could not sign out that device.');
        } finally {
            setBusyId(null);
        }
    };

    return (
        <>
            <PanelHeader title="Security" text="Keep your account safe and see where you’re signed in." />

            <div className={`${cardCls} p-6 mb-6 flex flex-wrap items-center justify-between gap-4`}>
                <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                        <Icon icon="mdi:lock-outline" aria-hidden="true" />
                    </span>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Password</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Use a strong password you don’t use anywhere else.</p>
                    </div>
                </div>
                <Link
                    to="/change-password"
                    className={`rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${focusRing}`}
                >
                    Change password
                </Link>
            </div>

            <div className={`${cardCls} p-6`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Active sessions</h3>
                    <button
                        type="button"
                        onClick={load}
                        className={`inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline rounded ${focusRing}`}
                    >
                        <Icon icon="mdi:refresh" aria-hidden="true" /> Refresh
                    </button>
                </div>

                {error && (
                    <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                        <Icon icon="mdi:alert-circle-outline" className="mt-0.5 text-lg shrink-0" aria-hidden="true" />
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="space-y-3 animate-pulse" aria-hidden="true">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-16 rounded-xl bg-slate-200 dark:bg-slate-800" />
                        ))}
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                        {sessions.map((s) => {
                            const mobile = /android|ios|iphone/i.test(`${s.osName} ${s.deviceName}`);
                            return (
                                <li key={s.$id} className="flex items-center gap-4 py-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                        <Icon icon={mobile ? 'mdi:cellphone' : 'mdi:laptop'} aria-hidden="true" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="flex flex-wrap items-center gap-2 font-medium text-slate-900 dark:text-white">
                                            {s.clientName || 'Browser'} on {s.osName || 'unknown device'}
                                            {s.current && (
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                                                    This device
                                                </span>
                                            )}
                                        </p>
                                        <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                                            {[s.countryName, s.ip, `Signed in ${formatDate(s.$createdAt)}`].filter(Boolean).join(' · ')}
                                        </p>
                                    </div>
                                    {!s.current && (
                                        <button
                                            type="button"
                                            onClick={() => signOut(s.$id)}
                                            disabled={busyId === s.$id}
                                            className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 disabled:opacity-60 transition-colors ${focusRing}`}
                                        >
                                            {busyId === s.$id ? 'Signing out…' : 'Sign out'}
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
};

export default SecurityPanel;
