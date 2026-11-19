import React from 'react';
import { Link } from 'react-router-dom';

import { SITE_NAME, SITE_LOGO, SITE_TAGLINE } from '../utils/siteConfig';
import { exploreLinks, legalLinks, socials, footerFocusRing as focusRing, footerLinkClass } from '../data/footerData';
import useFooter from '../hooks/useFooter';

const Footer = () => {
    const { email, status, message, handleEmailChange, handleSubscribe, scrollToTop } = useFooter();

    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-14">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-4">
                        <Link to="/" className={`inline-flex items-center gap-2.5 rounded-lg hover:opacity-80 transition-opacity ${focusRing}`}>
                            <img src={SITE_LOGO} alt="" className="w-10 h-10 object-contain" />
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{SITE_NAME}</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {SITE_TAGLINE}
                        </p>

                        <div className="flex items-center gap-3 mt-6">
                            {socials.map((social) => (
                                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} data-testid={social.testid} className={`w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:-translate-y-0.5 transition-all duration-300 ${focusRing}`} >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule={social.evenodd ? 'evenodd' : 'nonzero'} clipRule={social.evenodd ? 'evenodd' : 'nonzero'} d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Explore</h4>
                        <ul className="space-y-3">
                            {exploreLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className={footerLinkClass} data-testid={link.testid}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className={footerLinkClass} data-testid={link.testid}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 lg:col-span-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Get the weekly digest</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">New articles in your inbox. No spam, unsubscribe anytime.</p>

                        <form onSubmit={handleSubscribe} noValidate>
                            <label htmlFor="footer-email" className="sr-only">
                                Email address
                            </label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input id="footer-email" type="email" value={email} onChange={handleEmailChange} placeholder="Your email" aria-invalid={status === 'error'} aria-describedby="footer-newsletter-message" className={`flex-1 min-w-0 px-4 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder-slate-500 outline-none transition-all focus:ring-2 focus:border-transparent ${ status === 'error' ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500' }`} />
                                <button type="submit" className={`px-5 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors ${focusRing}`} disabled={status === 'loading'} data-testid="footer-newsletter-submit" >
                                    Subscribe
                                </button>
                            </div>

                            <p id="footer-newsletter-message" role="status" className={`mt-2 min-h-[1.25rem] text-xs ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`} data-testid={status === 'success' ? 'footer-newsletter-success' : undefined} >
                                {status === 'success' && '✓ '}
                                {status !== 'idle' && message}
                            </p>
                        </form>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400" data-testid="footer-copyright">
                        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
                    </p>
                    <button type="button" onClick={scrollToTop} className={`group inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded ${focusRing}`} >
                        Back to top
                        <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 group-hover:border-blue-400 transition-colors">
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
