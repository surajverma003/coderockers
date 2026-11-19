// ForgotPassword page ki constants

export const PAGE_TITLE = 'Forgot password | CodeRokers';

export const RESEND_SECONDS = 60;
export const LINK_LIFETIME_MS = 60 * 60 * 1000; // Appwrite recovery link 1 ghante mein expire hota hai
export const STORAGE_KEY = 'cr_recovery';

// Left brand panel ka text
export const forgotSide = {
    heading: 'Locked out?',
    text: "It happens. Enter your email and we'll send you a link to set a new password.",
    terminal: ['$ coderokers reset-password', 'Sending reset link...', 'Check your inbox.'],
};
