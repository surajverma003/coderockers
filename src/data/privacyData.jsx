import React from 'react';
import { Link } from 'react-router-dom';
import { LegalList } from '../reuse/LegalLayout';
import { SITE_NAME, CONTACT_EMAIL } from '../utils/siteConfig';

const linkCls = 'font-medium text-blue-600 dark:text-blue-400 hover:underline';

export const privacySections = [
    {
        id: 'overview',
        title: 'Overview',
        body: (
            <p>
                This policy explains what personal information {SITE_NAME} collects, why we collect it, and what control you have over it.
                We only collect what the site needs to work, and we do not sell your data.
            </p>
        ),
    },
    {
        id: 'information-we-collect',
        title: 'Information we collect',
        body: (
            <>
                <p>What we collect depends on what you do on the site:</p>
                <LegalList items={[
                    { label: 'Account details', text: 'your name, email address and password when you sign up. Passwords are handled by our authentication provider and are stored hashed, so we cannot read them.' },
                    { label: 'Social sign-in', text: 'if you continue with Google or GitHub, we receive the basic profile details they share with us, such as your name and email address.' },
                    { label: 'Profile details', text: 'anything optional you add in your settings, such as a short bio, location, website and X or GitHub usernames.' },
                    { label: 'Articles you publish', text: 'the title, text, cover image, category and tags of articles you write. Published articles are public and show your name as the author.' },
                    { label: 'Newsletter', text: 'the email address you enter in the subscribe form.' },
                    { label: 'Contact messages', text: 'your name, email, subject and message when you use the contact form.' },
                    { label: 'View counts', text: 'we count how many times each article is opened. This is a number per article, not a record of who read it.' },
                    { label: 'Technical data', text: 'our hosting and backend providers may log your IP address, browser type and request details for security and reliability. Your sign-in sessions (device, browser and approximate location) are shown to you in your Security settings, where you can sign out of any of them.' },
                ]} />
            </>
        ),
    },
    {
        id: 'how-we-use-your-data',
        title: 'How we use your data',
        body: (
            <LegalList items={[
                'To create and manage your account and keep you signed in',
                'To publish your articles and show your name as the author',
                'To send the newsletter, only if you subscribed',
                'To reply to messages you send us',
                'To count article views',
                'To keep the site secure and fix technical problems',
                'To meet legal obligations',
            ]} />
        ),
    },
    {
        id: 'cookies-and-storage',
        title: 'Cookies and browser storage',
        body: (
            <>
                <p>We use cookies and your browser storage only for things the site needs:</p>
                <LegalList items={[
                    'Keeping you signed in',
                    'Remembering your light or dark theme',
                    'Saving an unfinished article on your device while you write it',
                    'Remembering which articles you opened, so the same browser is counted only once a day',
                ]} />
                <p>We do not use advertising or cross-site tracking cookies.</p>
                <p>You can clear or block cookies and site data in your browser settings, but you will be signed out, unfinished drafts will be lost, and some features may stop working.</p>
            </>
        ),
    },
    {
        id: 'third-party-services',
        title: 'Third-party services',
        body: (
            <>
                <p>We rely on a few services to run the site. Each one has its own privacy policy:</p>
                <LegalList items={[
                    { label: 'Appwrite', text: 'authentication and database storage for accounts, articles, newsletter emails and contact messages.' },
                    { label: 'Google and GitHub', text: 'only if you choose to sign in with them.' },
                    { label: 'Iconify', text: 'site icons may be loaded from the Iconify public API, which means your browser can contact their servers and they can see your IP address.' },
                    { label: 'Image hosts', text: 'article and cover images can be loaded from other websites, such as Unsplash, so those sites may see your IP address when an image loads.' },
                ]} />
                <p>Links on the site, including the share buttons, may lead to other websites. We do not control their content or privacy practices, and nothing is sent to them unless you click.</p>
            </>
        ),
    },
    {
        id: 'your-rights',
        title: 'Your rights',
        body: (
            <>
                <p>You can edit your name and profile details yourself in your settings. You can also ask us at any time to:</p>
                <LegalList items={[
                    'Give you a copy of the personal data we hold about you',
                    'Correct data that is wrong or incomplete',
                    'Delete your account and the data linked to it',
                    'Stop using your data for a specific purpose, including the newsletter',
                    'Withdraw consent you previously gave',
                ]} />
                <p>
                    Email us at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a>
                    {' '}and we will respond as soon as we reasonably can.
                </p>
            </>
        ),
    },
    {
        id: 'data-security',
        title: 'Data security',
        body: (
            <p>
                We use access controls and encrypted connections to protect your data. No system is completely secure, so we cannot guarantee absolute security,
                but we will act quickly if we learn of a problem that affects you.
            </p>
        ),
    },
    {
        id: 'data-retention',
        title: 'Data retention',
        body: (
            <p>
                We keep your data only as long as we need it for the purposes above. Account data stays until you delete your account,
                newsletter emails stay until you unsubscribe, and contact messages are kept until we have dealt with them.
                Articles you published stay online until you ask us to remove them or your account is deleted.
            </p>
        ),
    },
    {
        id: 'children',
        title: "Children's privacy",
        body: (
            <p>
                {SITE_NAME} is not intended for anyone under 18. We do not knowingly collect data from children.
                If you believe a child has given us personal information, contact us and we will delete it.
            </p>
        ),
    },
    {
        id: 'changes',
        title: 'Changes to this policy',
        body: (
            <p>
                If we change this policy, we will update the date at the top of this page. Please check it from time to time.
                Changes apply from the moment they are posted.
            </p>
        ),
    },
    {
        id: 'contact',
        title: 'Contact us',
        body: (
            <p>
                Questions about this policy? Email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a>
                {' '}or use the contact form on our <Link to="/newsletter" className={linkCls}>newsletter and contact page</Link>.
            </p>
        ),
    },
];
