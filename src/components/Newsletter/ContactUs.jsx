import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

import { COLLECTION_ID, DATABASE_ID, databases, ID } from '../../appwrite/appwrite';
import { EMPTY_FORM, contactInfo, socials, topics, fieldClass, labelClass } from '../../data/contactData';

const ContactUs = () => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitted, setSubmitted] = useState(false);
    const [sentName, setSentName] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const timerRef = useRef(null);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (sending) return;

        setSending(true);
        setError('');

        try {
            const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                message: formData.message.trim(),
                subject: formData.subject.trim(),
            });

            console.log('Success:', response);

            setSentName(formData.name.trim().split(' ')[0]);
            setSubmitted(true);
            setFormData(EMPTY_FORM);

            timerRef.current = setTimeout(() => setSubmitted(false), 8000);
        } catch (err) {
            console.error('Appwrite Error:', err.message);
            setError("Couldn't send your message. Check your connection and try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="max-w-2xl mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                        Get in touch
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Have a question or want to collaborate? Send us a message and we'll reply as soon as we can.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left: info */}
                    <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-24 h-fit">
                        {contactInfo.map((item) => {
                            const content = (
                                <>
                                    <span className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Icon icon={item.icon} className="w-6 h-6" aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm text-slate-600 dark:text-slate-400">{item.label}</span>
                                        <span className="block font-semibold text-slate-900 dark:text-white break-words">{item.value}</span>
                                    </span>
                                </>
                            );
                            const cardClass = 'group flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors';

                            return item.href ? (
                                <a key={item.label} href={item.href} className={`${cardClass} hover:border-blue-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`} >
                                    {content}
                                </a>
                            ) : (
                                <div key={item.label} className={cardClass}>
                                    {content}
                                </div>
                            );
                        })}

                        {/* Social links */}
                        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Follow us</h3>
                            <div className="flex gap-3">
                                {socials.map((s) => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" >
                                        <Icon icon={s.icon} className="w-5 h-5" aria-hidden="true" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 lg:p-10 h-full">
                            {submitted ? (
                                <div role="status" className="flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                                        <Icon icon="mdi:check-bold" className="w-8 h-8" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        Message sent{sentName ? `, ${sentName}` : ''}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        We've received your message and will reply by email.
                                    </p>
                                    <button type="button" onClick={() => setSubmitted(false)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" >
                                        <Icon icon="mdi:email-plus-outline" className="w-5 h-5" aria-hidden="true" /> Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={sendMessage} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="contact-name" className={labelClass}>Full name</label>
                                            <input id="contact-name" type="text" name="name" value={formData.name} onChange={onchange} required autoComplete="name" className={fieldClass} placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label htmlFor="contact-email" className={labelClass}>Email address</label>
                                            <input id="contact-email" type="email" name="email" value={formData.email} onChange={onchange} required autoComplete="email" className={fieldClass} placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-subject" className={labelClass}>Subject</label>
                                        <input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={onchange} required className={fieldClass} placeholder="How can we help?" />
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {topics.map((t) => {
                                                const active = formData.subject === t;
                                                return (
                                                    <button key={t} type="button" aria-pressed={active} onClick={() => setFormData({ ...formData, subject: t })} className={`px-3 py-1.5 rounded-full text-sm border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${active ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'}`} >
                                                        {t}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="contact-message" className={labelClass}>Message</label>
                                        <textarea id="contact-message" name="message" value={formData.message} onChange={onchange} required rows="6" className={`${fieldClass} resize-none`} placeholder="Tell us more about your inquiry..." />
                                    </div>

                                    {error && (
                                        <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-sm text-red-700 dark:text-red-300">
                                            <Icon icon="mdi:alert-circle-outline" className="w-5 h-5 shrink-0" aria-hidden="true" />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <button type="submit" disabled={sending} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900" >
                                        {sending ?
                                            (<><Icon icon="mdi:loading" className="w-5 h-5 animate-spin" aria-hidden="true" /> Sending...</>) :
                                            (<><Icon icon="mdi:send-outline" className="w-5 h-5" aria-hidden="true" /> Send message</>)
                                        }
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
