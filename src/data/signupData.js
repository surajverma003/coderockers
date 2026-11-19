// Signup page ki constants

export const PAGE_TITLE = 'Create account | CodeRokers';

export const MIN_PASSWORD = 8; // Appwrite ka minimum

export const emptySignupForm = { fullName: '', email: '', password: '', confirmPassword: '' };

// Account ban gaya par auto-login fail hua to login page par ye message jata hai
export const ACCOUNT_CREATED_NOTICE = 'Your account was created. Please sign in.';

// Left brand panel ka text
export const signupSide = {
    heading: 'Join CodeRokers',
    text: 'Create a free account to bookmark articles and publish your own.',
    terminal: ['$ coderokers signup', 'Creating your account...', 'Done. Start reading and writing.'],
};

// Password strength meter (index = score 0-4)
export const strengthLabels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
export const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
export const strengthText = [
    'text-red-600 dark:text-red-400',
    'text-orange-600 dark:text-orange-400',
    'text-yellow-700 dark:text-yellow-400',
    'text-lime-700 dark:text-lime-400',
    'text-green-600 dark:text-green-400',
];
