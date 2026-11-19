import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { formatViews } from '../utils/blogUtils';
import { getTileClasses } from '../utils/categoryMeta';
import { codeLines, focusRing, pulse, testimonials } from '../data/homeData';
import useHome from '../hooks/useHome';

import TestimonialsSlider from './Home/TestimonialsSlider';
import SectionHeader from './Home/SectionHeader';
import CategorySkeletons from './Home/CategorySkeletons';
import FeaturedSkeleton from './Home/FeaturedSkeleton';
import CardSkeleton from './Home/CardSkeleton';
import LatestCard from './Home/LatestCard';

const Home = () => {
    const {
        user, timeFormat, isLoading, hasData,
        writersAll, writers, totals, categories, lead, rest, latest, mostRead, stats,
        email, status, message, statsRef,
        handleEmailChange, handleSubscribe, scrollToStats,
    } = useHome();

    return (
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white" data-testid="home-page">
            {/* Hero entrance (ek hi orchestrated moment). Reduced motion respect hota hai. */}
            <style>{`
                @keyframes cr-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
                .cr-rise { opacity: 0; animation: cr-rise .7s cubic-bezier(.2,.7,.2,1) forwards; animation-delay: var(--d, 0ms); }
                @media (prefers-reduced-motion: reduce) { .cr-rise { opacity: 1; animation: none; } }
            `}</style>

            {/* ============================ Hero ============================ */}
            <section className="relative overflow-hidden">
                {/* Dot grid background */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background-size:24px_24px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
                <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/3 w-[28rem] h-[28rem] rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-12 gap-14 items-center min-h-[calc(100vh-4rem)]">
                    {/* Left: copy */}
                    <div className="lg:col-span-7">
                        <div className="cr-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 mb-8" style={{ '--d': '0ms' }} >
                            <span className="relative flex w-2 h-2">
                                <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping"></span>
                                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">New articles every week</span>
                        </div>

                        <h1 className="cr-rise text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]" style={{ '--d': '80ms' }} >
                            Welcome to
                            <span className="relative block w-fit text-blue-600 dark:text-blue-400">
                                CodeRokers
                                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                                    <path d="M2 10C50 4 150 4 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className="cr-rise mt-10 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed" style={{ '--d': '160ms' }} >
                            Discover insightful articles, explore diverse categories, and stay updated with our newsletter. Your journey to knowledge starts here.
                        </p>

                        <div className="cr-rise flex flex-wrap gap-4 mt-10" style={{ '--d': '240ms' }}>
                            <Link to="/blogs" className={`group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 ${focusRing}`} data-testid="explore-articles-btn" >
                                Explore Articles <Icon icon="mdi:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link to="/newsletter" className={`inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-full border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:-translate-y-0.5 ${focusRing}`} data-testid="subscribe-btn" >
                                <Icon icon="mdi:bell-ring" className="w-5 h-5" /> Subscribe Now
                            </Link>
                        </div>

                        {/* Asli numbers (nakli "10,000+ readers" aur "4.9 rating" hata diye) */}
                        {hasData && (
                            <div className="cr-rise flex flex-wrap items-center gap-x-8 gap-y-4 mt-12" style={{ '--d': '320ms' }}>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {writersAll.slice(0, 6).map((w) => (
                                            <div key={w.name} title={w.name} className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-950 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold" >
                                                {String(w.name).charAt(0).toUpperCase()}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                        <span className="font-semibold text-slate-900 dark:text-white">{totals.posts}</span> articles by{' '}
                                        <span className="font-semibold text-slate-900 dark:text-white">{totals.writers}</span> writers
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                    <Icon icon="mdi:eye" className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    <span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{formatViews(totals.views) || '0'}</span> total reads
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: code card (CodeRokers ka apna world) */}
                    <div className="cr-rise lg:col-span-5 relative" style={{ '--d': '300ms' }} aria-hidden="true">
                        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-900/20 dark:shadow-blue-500/10">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900">
                                <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                                <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
                                <span className="ml-3 text-xs text-slate-400 font-mono">getting-started.jsx</span>
                            </div>
                            <pre className="p-5 text-[13px] sm:text-sm leading-7 font-mono overflow-x-auto">
                                <code>
                                    {codeLines.map((line, i) => (
                                        <div key={i} className="flex">
                                            <span className="w-6 shrink-0 select-none text-slate-600 text-right mr-4">{i + 1}</span>
                                            <span className="whitespace-pre">
                                                {line.length === 0 ? ' ' : line.map(([text, color], j) => (
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

                        {/* Floating chips */}
                        {mostRead && (
                            <div className="absolute -bottom-6 -left-2 sm:-left-8 flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
                                <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <Icon icon="mdi:eye" className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{formatViews(mostRead.views)} reads</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Most read article</p>
                                </div>
                            </div>
                        )}
                        <div className="absolute -top-5 -right-2 sm:-right-6 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl">
                            <Icon icon="mdi:bookmark" className="w-4 h-4 text-indigo-500" />
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Saved</span>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator (ab clickable hai) */}
                <button type="button" onClick={scrollToStats} aria-label="Scroll to next section" className={`hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 transition-colors ${focusRing}`} >
                    <Icon icon="mdi:chevron-down" className="w-6 h-6" />
                </button>
            </section>

            {/* ============================ Stats ============================ */}
            <section ref={statsRef} className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <dl className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800">
                        {stats.map((stat, index) => (
                            <div key={index} className={`flex items-center gap-4 px-4 sm:px-8 py-8 ${index >= 2 ? 'border-t border-slate-200 dark:border-slate-800 lg:border-t-0' : ''}`} >
                                <div className="hidden sm:flex w-12 h-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400">
                                    <Icon icon={stat.icon} className="w-6 h-6" />
                                </div>
                                <div>
                                    <dd className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">{stat.value}</dd>
                                    <dt className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</dt>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* =========================== Categories =========================== */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Explore categories" subtitle="Pick a topic and jump straight to the articles that matter to you." actionTo="/blogs" actionLabel="All topics" />

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.length === 0 && <CategorySkeletons />}
                        {categories.map((category, index) => (
                            <Link key={index} to={`/category/${category.name.toLowerCase()}`} className={`group relative flex flex-col p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 ${focusRing}`} >
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-colors duration-300 ${getTileClasses(category.color)}`}>
                                    <Icon icon={category.icon} className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">{category.name}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{category.count} {category.count === 1 ? 'article' : 'articles'}</p>
                                <Icon icon="mdi:arrow-top-right" className="absolute top-5 right-5 w-5 h-5 text-slate-400 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======================== Featured Articles ======================== */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader title="Featured articles" subtitle="Our most-read articles right now." actionTo="/blogs" actionLabel="View all articles" />

                    <div className="grid lg:grid-cols-5 gap-6">
                        {isLoading && <FeaturedSkeleton />}
                        {!isLoading && !lead && <p className="lg:col-span-5 text-slate-600 dark:text-slate-400">No articles yet. Check back soon.</p>}

                        {/* Lead article */}
                        {lead && (
                            <Link to={`/view-blog/${lead.id}`} className={`group relative lg:col-span-3 lg:row-span-2 min-h-[26rem] rounded-3xl overflow-hidden bg-slate-900 ${focusRing}`} >
                                <img src={lead.image} alt={lead.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-slate-900 rounded-full">{lead.category}</span>
                                    {lead.views !== '' && (
                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                                            <Icon icon="mdi:eye" className="w-4 h-4" /> {lead.views}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">{lead.title}</h3>
                                    <p className="text-slate-300 mb-5 line-clamp-2 max-w-xl">{lead.excerpt}</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                                            {String(lead.author).charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white leading-tight">{lead.author}</p>
                                            <p className="text-xs text-slate-400">{lead.date}</p>
                                        </div>
                                        <span className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-white">
                                            Read more <Icon icon="mdi:arrow-right" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Side articles */}
                        {rest.map((article) => (
                            <Link key={article.id} to={`/view-blog/${article.id}`} className={`group lg:col-span-2 flex gap-4 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 ${focusRing}`} >
                                <div className="relative w-32 sm:w-40 shrink-0 rounded-xl overflow-hidden">
                                    <img src={article.image} alt={article.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="flex flex-col py-1 pr-2 min-w-0">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1.5">{article.category}</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{article.excerpt}</p>
                                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{article.author}</span>
                                        <span>{article.date}</span>
                                        {article.views !== '' && (
                                            <span className="inline-flex items-center gap-1">
                                                <Icon icon="mdi:eye" className="w-3.5 h-3.5" /> {article.views}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================== Latest articles =========================== */}
            {(isLoading || latest.length > 0) && (
                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeader title="Latest articles" subtitle="Recently published by our writers." actionTo="/blogs" actionLabel="Browse all" />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
                            {latest.map((post) => (
                                <LatestCard key={post.id} post={post} timeFormat={timeFormat} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================ Testimonials ============================ */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <TestimonialsSlider items={testimonials} />
                </div>
            </section>

            {/* ============================ Top writers ============================ */}
            {(isLoading || writers.length > 0) && (
                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeader title="Top writers" subtitle="The people behind our most-read articles." actionTo="/blogs" actionLabel="All articles" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {isLoading && [0, 1, 2, 3].map((i) => <div key={i} className={`h-40 rounded-2xl ${pulse}`} aria-hidden="true" />)}
                            {writers.map((writer, index) => (
                                <Link key={writer.name} to={`/blogs?search=${encodeURIComponent(writer.name)}`} className={`group relative flex flex-col p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 ${focusRing}`} >
                                    <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mb-5">
                                        {String(writer.name).charAt(0).toUpperCase()}
                                    </span>
                                    <h3 className="font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{writer.name}</h3>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                        {writer.posts} {writer.posts === 1 ? 'article' : 'articles'}
                                    </p>
                                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                        <Icon icon="mdi:eye-outline" className="w-4 h-4" /> {formatViews(writer.views) || '0'} views
                                    </p>
                                    {index === 0 && (
                                        <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                                            <Icon icon="mdi:trophy-outline" className="w-3.5 h-3.5" /> Most read
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ============================ Newsletter ============================ */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 grid md:grid-cols-2 gap-10 items-center shadow-sm">
                    <div>
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-500/15 rounded-2xl mb-6">
                            <Icon icon="mdi:email-newsletter" className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Get the weekly digest</h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            The latest articles, tutorials, and updates, delivered straight to your inbox. No spam, unsubscribe anytime.
                        </p>
                    </div>

                    <div>
                        <form onSubmit={handleSubscribe} noValidate className="flex flex-col gap-3">
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <div className="relative">
                                <Icon icon="mdi:email-outline" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input id="newsletter-email" type="email" value={email} placeholder="Enter your email address" aria-invalid={status === 'error'} aria-describedby="newsletter-message" className={`w-full pl-12 pr-4 py-4 rounded-xl border bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all focus:ring-2 focus:border-transparent ${status === 'error' ? 'border-red-400 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'}`}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <button type="submit" disabled={status === 'loading'} className={`px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 ${focusRing}`} >
                                <Icon icon="mdi:send" className="w-5 h-5" /> Subscribe
                            </button>
                        </form>

                        <p id="newsletter-message" role="status" className={`mt-3 text-sm min-h-[1.25rem] flex items-center gap-2 ${status === 'error' ? 'text-red-600 dark:text-red-400' : status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {status === 'success' && <Icon icon="mdi:check-circle" className="w-4 h-4" />}
                            {status === 'error' && <Icon icon="mdi:alert-circle" className="w-4 h-4" />}
                            {status === 'idle' || status === 'loading' ? (
                                <span>We never share your email address.</span>
                            ) : (
                                message
                            )}
                        </p>
                    </div>
                </div>
            </section>

            {/* ================================ CTA ================================ */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl bg-blue-600 dark:bg-slate-900 dark:border dark:border-slate-800 px-6 py-16 sm:px-16 sm:py-20 text-center">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-size:22px_22px] bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
                    <div className="relative">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5">Ready to start your journey?</h2>
                        <p className="text-lg text-blue-100 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                            Join our community of readers and writers. Share your knowledge, learn from others, and grow together.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {/* Logged-in user ko signup button nahi dikhana */}
                            {!user && (
                                <Link to="/signup" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600" >
                                    <Icon icon="mdi:account-plus" className="w-5 h-5" /> Create Free Account
                                </Link>
                            )}
                            <Link to="/blogs" className={`inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 ${user ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg' : 'bg-transparent text-white border-2 border-white/50 hover:bg-white/10'}`} >
                                <Icon icon="mdi:compass" className="w-5 h-5" /> Explore Content
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
