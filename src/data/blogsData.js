
export const PAGE_SIZE = 9;

export const DEFAULT_SORT = 'newest';

export const SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'views', label: 'Most viewed' },
    { value: 'title', label: 'Title (A–Z)' }
];

// Loading ke time kitne skeleton cards dikhane hain
export const SKELETON_COUNT = 6;

// Search type karne ke baad URL update hone se pehle ka wait (ms)
export const SEARCH_DEBOUNCE_MS = 350;
