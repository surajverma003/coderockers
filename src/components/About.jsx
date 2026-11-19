import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { focusRing } from '../data/homeData';
import { GITHUB_URL, offerings, missionVision, values, team, stack, faqs, codeLines } from '../data/aboutData';
import useAbout from '../hooks/useAbout';

import SectionHeader from './About/SectionHeader';
import TeamPhoto from './About/TeamPhoto';

const About = () => {
    const { showHero, openFaq, toggleFaq } = useAbout();

    return (
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white" data-testid="about-page">
            <style>{`
                @keyframes cr-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
                .cr-rise { opacity: 0; animation: cr-rise .7s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: var(--d, 0ms); }
                @media (prefers-reduced-motion: reduce) { .cr-rise { opacity: 1; animation: none; } }
            `}</style>

            {/* ============================ Hero ============================ */}
            {showHero && (
                <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background-size:24px_24px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <div className="cr-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 mb-8" style={{ '--d': '0ms' }}>
                                <Icon icon="mdi:information-outline" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">About CodeRokers</span>
                            </div>

                            <h1 className="cr-rise text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]" style={{ '--d': '80ms' }}>
                                Our
                                <span className="relative block w-fit text-blue-600 dark:text-blue-400">
                                    story
                                    <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                                        <path d="M2 10C50 4 150 4 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="cr-rise mt-10 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed" style={{ '--d': '160ms' }}>
                                We started CodeRokers with a simple mission: to share knowledge, inspire creativity, and build a community of curious people who love making things.
                            </p>

                            <div className="cr-rise flex flex-wrap gap-4 mt-10" style={{ '--d': '240ms' }}>
                                <Link to="/blogs" className={`group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 ${focusRing}`} >
                                    Read our articles <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:-translate-y-0.5 ${focusRing}`} >
                                    <Icon icon="mdi:github" className="w-5 h-5" /> View on GitHub
                                </a>
                            </div>
                        </div>

                        {/* Code card */}
                        <div className="cr-rise lg:col-span-5" style={{ '--d': '300ms' }} aria-hidden="true">
                            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-900/20 dark:shadow-blue-500/10">
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                                    <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                                    <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                                    <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
                                    <span className="ml-3 text-xs text-slate-400 font-mono">about.js</span>
                                </div>
                                <pre className="p-5 text-[13px] sm:text-sm leading-7 font-mono overflow-x-auto">
                                    <code>
                                        {codeLines.map((line, i) => (
                                            <div key={i} className="flex">
                                                <span className="w-6 shrink-0 select-none text-slate-600 text-right mr-4">{i + 1}</span>
                                                <span className="whitespace-pre">
                                                    {line.map(([text, color], j) => (
                                                        <span key={j} className={color}>
                                                            {text}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ============================ Story ============================ */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Why we write</h2>
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">Good content should be easy to find, easy to read, and worth your time.</p>
                    </div>
                    <div className="lg:col-span-7 space-y-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                        <p>CodeRokers began as a small project with a big idea: the best way to learn is to share what you learn. Every article here is written with care, so that readers can understand a topic quickly and then go build something with it.</p>
                        <p>We believe in the power of storytelling and in authentic voices. Whether it is a tutorial, a deep dive, or a personal story, our goal is to keep it honest, clear, and useful.</p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-14 grid md:grid-cols-3 gap-6">
                    {offerings.map((item) => (
                        <div key={item.title} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500/60 transition-colors">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 mb-5">
                                <Icon icon={item.icon} className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ======================== Mission & Values ======================== */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Mission & values" subtitle="The principles that shape everything we do and create." />

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {missionVision.map((item) => (
                            <div key={item.title} className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-blue-600 text-white mb-6">
                                    <Icon icon={item.icon} className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div key={value.title} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                                <Icon icon={value.icon} className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                                <h4 className="text-lg font-semibold mb-1.5">{value.title}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================== Team ============================== */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Meet the team" subtitle="The people behind CodeRokers who bring you new content every week." />

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <article key={member.name} className="group">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 mb-5">
                                    <TeamPhoto member={member} />
                                </div>
                                <h3 className="text-xl font-bold">{member.name}</h3>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1 mb-3">{member.role}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{member.bio}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================ Built with ============================ */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Built with" subtitle="CodeRokers is a hand-built web app. Here is the toolbox behind it." />

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {stack.map((tool) => (
                            <div key={tool.name} className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-400 dark:hover:border-blue-500/60 hover:-translate-y-1 transition-all duration-300" >
                                <Icon icon={tool.icon} className="w-10 h-10 mb-4 text-slate-800 dark:text-slate-100" />
                                <h3 className="font-semibold">{tool.name}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{tool.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================== FAQ ============================== */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <SectionHeader title="Frequently asked questions" subtitle="Quick answers to the things people ask us most." />

                    <div className="space-y-3">
                        {faqs.map((faq, index) => {
                            const open = openFaq === index;
                            return (
                                <div key={faq.q} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                    <h3>
                                        <button type="button" onClick={() => toggleFaq(index)} aria-expanded={open} aria-controls={`faq-panel-${index}`} className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold rounded-2xl ${focusRing}`} >
                                            {faq.q} <Icon icon="mdi:chevron-down" className={`w-6 h-6 shrink-0 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                                        </button>
                                    </h3>
                                    <div id={`faq-panel-${index}`} className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-5 text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============================== CTA ============================== */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl bg-blue-600 dark:bg-slate-900 dark:border dark:border-slate-800 px-6 py-16 sm:px-16 sm:py-20 text-center">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-size:22px_22px] bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5">Want to be part of the story?</h2>
                        <p className="text-lg text-blue-100 dark:text-slate-400 mb-10 max-w-2xl mx-auto">Read, subscribe, or share your own ideas with the community.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link to="/newsletter" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600" >
                                <Icon icon="mdi:email-newsletter" className="w-5 h-5" /> Join the newsletter
                            </Link>
                            <Link to="/blogs" className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-white font-semibold rounded-full border-2 border-white/50 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600" >
                                <Icon icon="mdi:compass" className="w-5 h-5" /> Explore articles
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
