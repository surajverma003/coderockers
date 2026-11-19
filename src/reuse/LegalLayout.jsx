import React from 'react';
import { Icon } from '@iconify/react';

import { LEGAL_FOCUS_RING as focusRing } from '../data/legalData';
import { getSectionLabel } from '../utils/legalUtils';
import useLegalLayout from '../hooks/useLegalLayout';

// Bullet list used inside legal sections. Items are strings, or { label, text }.
export const LegalList = ({ items }) => (
    <ul className="space-y-2.5 pl-5 list-disc marker:text-blue-500">
        {items.map((item) => (
            <li key={item.label || item}>
                {item.label ? (
                    <>
                        <strong className="font-semibold text-slate-900 dark:text-white">{item.label}:</strong> {item.text}
                    </>
                ) : item}
            </li>
        ))}
    </ul>
);

// sections: [{ id, title, body }]
const LegalLayout = ({ title, subtitle, sections, numbered = false }) => {
    const { detailsRef, active, showTop, goTo, scrollToTop } = useLegalLayout(sections);

    const label = (s, i) => getSectionLabel(s, i, numbered);

    return (
        <>
            <div className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                    <header className="max-w-3xl mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">{title}</h1>
                        <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
                    </header>

                    <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
                        <details ref={detailsRef} className="lg:hidden mb-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3">
                            <summary className={`cursor-pointer font-semibold text-slate-900 dark:text-white ${focusRing}`}>On this page</summary>
                            <ul className="mt-3 space-y-2 text-sm">
                                {sections.map((s, i) => (
                                    <li key={s.id}>
                                        <a href={`#${s.id}`} onClick={(e) => goTo(e, s.id)} className={`hover:text-blue-600 dark:hover:text-blue-400 ${focusRing}`}>{label(s, i)}</a>
                                    </li>
                                ))}
                            </ul>
                        </details>

                        <nav aria-label={`${title} sections`} className="hidden lg:block">
                            <ul className="sticky top-24 space-y-1 border-l border-slate-200 dark:border-slate-700 text-sm">
                                {sections.map((s, i) => (
                                    <li key={s.id}>
                                        <a href={`#${s.id}`} onClick={(e) => goTo(e, s.id)} aria-current={active === s.id ? 'location' : undefined} className={`block -ml-px border-l-2 py-1.5 pl-4 transition-colors ${focusRing} ${active === s.id ? 'border-blue-600 dark:border-blue-400 font-semibold text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`} >
                                            {label(s, i)}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <article className="max-w-3xl space-y-12">
                            {sections.map((s, i) => (
                                <section key={s.id} id={s.id} className="scroll-mt-24">
                                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">{label(s, i)}</h2>
                                    <div className="space-y-4 leading-relaxed">{s.body}</div>
                                </section>
                            ))}
                        </article>
                    </div>
                </div>
            </div>

            {showTop && (
                <button onClick={scrollToTop} aria-label="Scroll to top" className="fixed bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus-visible:ring-offset-slate-950" >
                    <Icon icon="mdi:arrow-up" className="text-xl" aria-hidden="true" />
                </button>
            )}
        </>
    );
};

export default LegalLayout;
