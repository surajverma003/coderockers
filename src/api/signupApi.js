import { account, ID } from '../appwrite/appwrite';

// Account banao aur seedha login kar do.
// Account banne me error aaye to throw hota hai.
// Account ban gaya par auto-login fail hua (jaise kisi aur account ka session khula hai) to
// { created: true, userData: null, error } milta hai.
export const registerUser = async ({ fullName, email, password }) => {
    await account.create(ID.unique(), email, password, fullName);

    try {
        await account.createEmailPasswordSession(email, password);
        const userData = await account.get();
        return { created: true, userData };
    } catch (error) {
        return { created: true, userData: null, error };
    }
};
