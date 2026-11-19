import { account } from '../appwrite/appwrite';

// Forgot-password ke email link (userId + secret) se naya password set karo.
// Purane SDK mein 4th argument (passwordAgain) zaroori hai, naye mein ignore ho jaata hai
export const resetPasswordWithLink = (userId, secret, newPassword) =>
    account.updateRecovery(userId, secret, newPassword, newPassword);

// Logged-in user ka password badlo.
// OAuth account ke liye currentPassword undefined bhejte hain.
export const updateUserPassword = (newPassword, currentPassword) =>
    account.updatePassword(newPassword, currentPassword);
