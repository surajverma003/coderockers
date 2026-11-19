import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { isValidEmail, subscribeToNewsletter, getSubscribeError } from '../utils/newsletterUtils';
import { perks, SUCCESS_MESSAGE } from '../data/newsletterData';

import ContactUs from './Newsletter/ContactUs';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState(''); // bots bharte hain, insaan ko dikhta hi nahi
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [message, setMessage] = useState('');
    const timerRef = useRef(null);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    useEffect(() => {
        const previous = document.title;
        document.title = 'Newsletter | CodeRokers';
        return () => {
            document.title = previous;
        };
    }, []);

    const showSuccess = () => {
        setStatus('success');
        setMessage(SUCCESS_MESSAGE);
        setEmail('');
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 6000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        // Honeypot bhara hai = bot. Chupchaap "success" dikha do, kuch save mat karo
        if (honeypot) {
            showSuccess();
            return;
        }

        if (!isValidEmail(email)) {
            setStatus('error');
            setMessage('Enter a valid email address.');
            return;
        }

        setStatus('sending');
        setMessage('');

        const result = await subscribeToNewsletter(email);

        if (result.ok) {
            // Naya ho ya pehle se subscribed, message same: isse koi dusron ki subscription check nahi kar sakta
            showSuccess();
        } else {
            setStatus('error');
            setMessage(getSubscribeError(result));
        }
    };

    return (
        <>
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors">
                <div className="max-w-6xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                        {/* soft glow */}
                        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl" />
                        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 sm:p-12 lg:p-14">
                            {/* Left: form */}
                            <div className="flex flex-col justify-center">
                                <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-sm font-medium mb-5">
                                    <Icon icon="mdi:email-fast-outline" className="w-4 h-4" aria-hidden="true" /> Newsletter
                                </span>

                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                                    New posts, straight to your inbox
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                    Subscribe to get CodeRokers articles and tutorials by email. No spam.
                                </p>

                                <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
                                    <div className="flex-1">
                                        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                                        <div className="relative">
                                            <Icon icon="mdi:email-outline" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                                            <input id="newsletter-email" type="email" value={email} placeholder="you@example.com" autoComplete="email" aria-invalid={status === 'error'} aria-describedby="newsletter-feedback" className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition ${status === 'error' ? 'border-red-400 dark:border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'}`}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    if (status === 'error') { setStatus('idle'); setMessage(''); }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Honeypot: screen par nahi dikhta, keyboard se bhi nahi */}
                                    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                                        <label htmlFor="newsletter-website">Leave this field empty</label>
                                        <input id="newsletter-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                    </div>

                                    <button type="submit" disabled={status === 'sending'} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" >
                                        {status === 'sending' ? (
                                            <><Icon icon="mdi:loading" className="w-5 h-5 animate-spin" aria-hidden="true" /> Subscribing...</>) : ('Subscribe')}
                                    </button>
                                </form>

                                <div id="newsletter-feedback" role="status" aria-live="polite" className="min-h-[1.75rem] mt-3">
                                    {message && (
                                        <p className={`flex items-center gap-2 text-sm font-medium ${status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }`} >
                                            <Icon icon={status === 'success' ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline'} className="w-5 h-5 shrink-0" aria-hidden="true" /> {message}
                                        </p>
                                    )}
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                    We respect your privacy. Read our{' '}
                                    <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>

                            {/* Right: what you get */}
                            <div className="flex flex-col justify-center">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">What you'll get</h2>
                                <ul className="space-y-4">
                                    {perks.map((perk) => (
                                        <li key={perk.title} className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950" >
                                            <span className="shrink-0 w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                                <Icon icon={perk.icon} className="w-6 h-6" aria-hidden="true" />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">{perk.title}</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{perk.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/blogs" className="inline-flex items-center gap-2 self-start mt-6 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded" >
                                    Read the blog first <Icon icon="mdi:arrow-right" className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ContactUs />
        </>
    );
};

export default Newsletter;
