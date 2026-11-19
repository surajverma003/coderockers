// Category ke naam se icon, color aur ek line ka blurb. Home aur Categories dono yahi use karte hain.
// Jo naam yahan nahi hai (naya category) use default icon aur blurb mil jaata hai.

const META = {
    technology: { icon: 'mdi:laptop', color: 'blue', blurb: 'Code, tools and the web' },
    lifestyle: { icon: 'mdi:leaf', color: 'pink', blurb: 'Habits, home and everyday life' },
    design: { icon: 'mdi:palette-outline', color: 'pink', blurb: 'UI, UX and visual thinking' },
    travel: { icon: 'mdi:airplane', color: 'green', blurb: 'Places, routes and trip notes' },
    business: { icon: 'mdi:briefcase-outline', color: 'orange', blurb: 'Startups, money and careers' },
    health: { icon: 'mdi:heart-pulse', color: 'red', blurb: 'Fitness, sleep and wellbeing' },
    food: { icon: 'mdi:silverware-fork-knife', color: 'yellow', blurb: 'Recipes and food stories' },
    entertainment: { icon: 'mdi:movie-open-outline', color: 'orange', blurb: 'Movies, shows and games' },
    fashion: { icon: 'mdi:hanger', color: 'pink', blurb: 'Style, trends and wardrobes' },
    sports: { icon: 'mdi:soccer', color: 'green', blurb: 'Games, training and athletes' },
    other: { icon: 'mdi:shape-outline', color: 'blue', blurb: 'Everything that does not fit elsewhere' },
    general: { icon: 'mdi:text-box-outline', color: 'blue', blurb: 'Articles without a specific topic' },
};

export const getCategoryMeta = (name = '') =>
    META[name.toLowerCase()] || { icon: 'mdi:tag-outline', color: 'blue', blurb: `Articles about ${name}` };

// Icon tile ke classes (hover par poora rang bhar jaata hai)
const TILE = {
    blue: 'bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white',
    pink: 'bg-pink-100 dark:bg-pink-500/15 text-pink-600 dark:text-pink-400 group-hover:bg-pink-600 group-hover:text-white',
    green: 'bg-green-100 dark:bg-green-500/15 text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white',
    orange: 'bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white',
    red: 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 group-hover:bg-red-600 group-hover:text-white',
    yellow: 'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 group-hover:bg-yellow-600 group-hover:text-white',
};

export const getTileClasses = (color) => TILE[color] || TILE.blue;
