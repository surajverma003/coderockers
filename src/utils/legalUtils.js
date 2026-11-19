export const scrollBehavior = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

// Terms me "1. Acceptance of terms" jaisa numbered label, Privacy me sirf title
export const getSectionLabel = (section, index, numbered) => (numbered ? `${index + 1}. ${section.title}` : section.title);
