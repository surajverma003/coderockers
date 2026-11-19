import React, { useCallback, useEffect, useRef, useState } from 'react'
import myContext from './myContext';

import { account, databases } from '../appwrite/appwrite';
import { Query } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const DATABASE_ID = '696fa68200113ad55171';
const COLLECTION_ID = 'blogpost';

const ContextState = (props) => {
    const navigate = useNavigate();

    // Single blog
    const [blog, setBlog] = useState(null);
    const [blogLoading, setBlogLoading] = useState(false);

    // All blogs
    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(false);
    const [blogsError, setBlogsError] = useState(null);
    const blogsLoadedRef = useRef(false); // dobara fetch na ho (Appwrite reads bachte hain)

    // `loading` login buttons ke liye hai ("google" | "github" | false)
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(() => {
        try {
            const userInfo = window.localStorage.getItem("UserInfo");
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (e) {
            console.error(e.message);
            return null;
        }
    });

    // Get single blog from appwrite
    const getBlog = useCallback(async (slug) => {
        setBlog(null); // purana blog na dikhe
        setBlogLoading(true);
        try {
            const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("slug", slug)]);
            setBlog(response.documents[0] || null); // null = not found
        } catch (error) {
            console.error(error);
        } finally {
            setBlogLoading(false);
        }
    }, []);

    // Get all blogs from appwrite (newest first).
    // Ek baar load hone ke baad dobara fetch nahi hota; naya data chahiye to getBlogs(true).
    const getBlogs = useCallback(async (force = false) => {
        if (blogsLoadedRef.current && !force) return;

        setBlogsLoading(true);
        setBlogsError(null);
        try {
            const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.orderDesc('$createdAt'),
                Query.limit(100)
            ]);
            // Draft posts (is_published = false) public pages par nahi dikhne chahiye
            setBlogs(response.documents.filter((doc) => doc.is_published !== false));
            blogsLoadedRef.current = true;
        } catch (error) {
            console.error("Appwrite error:", error);
            setBlogsError(error.message || "Could not load articles.");
        } finally {
            setBlogsLoading(false);
        }
    }, []);

    // Time format fuction
    const timeFormat = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInSeconds = Math.floor((now - past) / 1000);

        const minute = 60, hour = 3600, day = 86400, month = 2592000, year = 31536000;

        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < hour) { return `${Math.floor(diffInSeconds / minute)}m ago`; }
        if (diffInSeconds < day) { return `${Math.floor(diffInSeconds / hour)}h ago`; }
        if (diffInSeconds < month) { return `${Math.floor(diffInSeconds / day)}d ago`; }
        if (diffInSeconds < year) { return `${Math.floor(diffInSeconds / month)}mo ago`; }

        return `${Math.floor(diffInSeconds / year)}y ago`;
    };

    // GOOGLE Login (redirect URL ab current origin se banta hai, deploy par bhi chalega)
    const googleLogin = () => {
        setLoading("google");

        try {
            account.createOAuth2Session(
                'google',
                `${window.location.origin}/`, // Success redirect
                `${window.location.origin}/login` // Failure redirect
            );
        } catch (error) {
            console.error("Google Login Error:", error);
            setLoading(false); // pehle "google" hi rehta tha, button atak jaata tha
        }
    };

    // GitHub Login
    const githubLogin = () => {
        setLoading("github");
        try {
            account.createOAuth2Session(
                'github',
                `${window.location.origin}/`, // Success redirect
                `${window.location.origin}/login` // Failure redirect
            );
        } catch (error) {
            console.error("GitHub Login Error:", error);
            setLoading(false);
        }
    };

    const scrollToTop = () => {
        if (window.scrollY > 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const checkStatus = async () => {
        const localUser = window.localStorage.getItem("UserInfo");

        if (localUser) {
            setUser(JSON.parse(localUser));
        }

        try {
            if (!(window.localStorage.getItem("UserInfo"))) {
                const session = await account.get();
                setUser(session);
                window.localStorage.setItem("UserInfo", JSON.stringify(session));
            }
            else {
                setUser(JSON.parse(window.localStorage.getItem("UserInfo")));
            }
        } catch (error) {
            console.error("Session Expired:", error.message);
            setUser(null);
            window.localStorage.removeItem("UserInfo");
            // navigate("/login"); // Optional
        }
    }

    // App load par session check. localStorage bhi sync rakho, warna expired session ka
    // purana user dikhta rehta tha.
    useEffect(() => {
        account.get()
            .then((session) => {
                setUser(session);
                window.localStorage.setItem("UserInfo", JSON.stringify(session));
            })
            .catch(() => {
                setUser(null);
                window.localStorage.removeItem("UserInfo");
            });
    }, []);

    return (
        <myContext.Provider value={{
            navigate,
            account,
            user, blog, blogs, loading,
            blogLoading, blogsLoading, blogsError,
            setUser, setLoading,
            getBlog, getBlogs,
            googleLogin, githubLogin,
            timeFormat, scrollToTop, checkStatus, Icon
        }}>
            {props.children}
        </myContext.Provider>
    )
}

export default ContextState
