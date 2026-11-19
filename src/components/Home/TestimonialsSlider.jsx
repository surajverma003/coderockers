import React from 'react';
import { Icon } from '@iconify/react';

import { focusRing } from '../../data/homeData';
import { useTestimonialsSlider } from '../../hooks/useHome';

import SectionHeader from './SectionHeader';

const TestimonialsSlider = ({ items }) => {
    const { trackRef, stops, active, setPaused, update, goTo, onKeyDown } = useTestimonialsSlider(items);

    const arrowClass = 'w-11 h-11 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:border-blue-600 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors ' + focusRing;

    return (
        <div role="region" aria-roledescription="carousel" aria-label="Reader testimonials">
            <SectionHeader title="What our readers say" subtitle="Don't just take our word for it. Here's what our community has to say." >
                <div className="flex items-center gap-3">
                    <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous testimonials" className={arrowClass}>
                        <Icon icon="mdi:arrow-left" className="w-5 h-5" />
                    </button>
                    <button type="button" onClick={() => goTo(active + 1)} disabled={active >= stops - 1} aria-label="Next testimonials" className={arrowClass}>
                        <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                    </button>
                </div>
            </SectionHeader>

            <div ref={trackRef} onScroll={update} onKeyDown={onKeyDown} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)} tabIndex={0} className={`flex gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl ${focusRing}`} >
                {items.map((testimonial, index) => (
                    <figure key={index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${items.length}`} className="snap-start shrink-0 basis-full md:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)] flex flex-col p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/60 transition-colors" >
                        <Icon icon="mdi:format-quote-open" className="w-10 h-10 text-blue-500/40 mb-3" />
                        <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">{testimonial.text}</blockquote>
                        <figcaption className="mt-auto flex items-center gap-4">
                            <img src={testimonial.image} alt={testimonial.name} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</p>
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: stops }).map((_, i) => (
                    <button key={i} type="button" onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === active} className={`h-2.5 rounded-full transition-all duration-300 ${focusRing} ${i === active ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'}`} />
                ))}
            </div>
        </div>
    );
};

export default TestimonialsSlider;
