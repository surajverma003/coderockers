// ChangePassword page ki constants
// (MIN_PASSWORD aur strength labels/colors signupData.js se aate hain, dono page me same hain)

export const RECOVERY_TITLE = 'Set new password | CodeRokers';
export const CHANGE_TITLE = 'Change password | CodeRokers';

export const emptyPasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

// Left brand panel ka text
export const sideReset = {
    heading: 'Set a new password',
    text: 'Pick something strong that you have not used anywhere else.',
    terminal: ['$ coderokers set-password', 'Verifying reset link...', 'Ready for your new password.'],
};

export const sideChange = {
    heading: 'Keep your account safe',
    text: 'Update your password from time to time, and never reuse it on other sites.',
    terminal: ['$ coderokers change-password', 'Verifying current password...', 'Password updated.'],
};
