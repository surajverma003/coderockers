import React from 'react';
import { Link } from 'react-router-dom';
import { LegalList } from '../reuse/LegalLayout';
import { SITE_NAME, CONTACT_EMAIL, JURISDICTION } from '../utils/siteConfig';

const linkCls = 'font-medium text-blue-600 dark:text-blue-400 hover:underline';

export const termsSections = [
    {
        id: 'acceptance',
        title: 'Acceptance of terms',
        body: (
            <>
                <p>
                    By using {SITE_NAME} (the "Service"), you agree to these Terms. If you do not agree, please do not use the Service.
                </p>
                <p>
                    If we change these Terms, the new version applies once it is posted here. Continuing to use the Service after that means you accept the change.
                </p>
            </>
        ),
    },
    {
        id: 'definitions',
        title: 'Definitions',
        body: (
            <LegalList items={[
                { label: '"Service"', text: `the ${SITE_NAME} website and everything on it, including articles, code examples and features.` },
                { label: '"You"', text: 'anyone who visits or uses the Service.' },
                { label: '"We", "us"', text: `the people who run ${SITE_NAME}.` },
                { label: '"Your content"', text: 'anything you submit to us, such as articles you publish, profile details, contact messages and newsletter signups.' },
            ]} />
        ),
    },
    {
        id: 'your-account',
        title: 'Your account',
        body: (
            <>
                <p>You can read most of the site without an account. Some features, such as writing articles, need one, either by email and password or by signing in with Google or GitHub.</p>
                <LegalList items={[
                    'Give accurate information when you sign up',
                    'Keep your password private. You are responsible for activity under your account',
                    'Tell us if you think someone else has accessed your account',
                ]} />
            </>
        ),
    },
    {
        id: 'acceptable-use',
        title: 'Acceptable use',
        body: (
            <>
                <p>Use the Service lawfully and fairly. Please do not:</p>
                <LegalList items={[
                    'Break any law or someone else\'s rights',
                    'Pretend to be another person or to represent us',
                    'Publish content that is unlawful, hateful, misleading or that copies other people\'s work without permission',
                    'Scrape the site in bulk, or collect other users\' emails or details',
                    'Bypass, disable or probe the site\'s security',
                    'Upload viruses or anything that harms the Service or other users',
                    'Send spam through the contact form or newsletter signup, or inflate article views by automated means',
                    'Harass or threaten anyone',
                ]} />
                <p>We may remove content or suspend accounts that break these rules.</p>
            </>
        ),
    },
    {
        id: 'content-and-ownership',
        title: 'Content and ownership',
        body: (
            <>
                <p>
                    The articles, code, design and branding on {SITE_NAME} belong to us or our licensors unless a page says otherwise.
                    You may link to our pages and quote short excerpts with credit. Anything beyond that needs our written permission.
                </p>
                <p>
                    You keep ownership of what you send us. Messages and newsletter signups are used only as needed to run the Service, for example to read and reply to your message.
                </p>
            </>
        ),
    },
    {
        id: 'content-you-publish',
        title: 'Content you publish',
        body: (
            <>
                <p>
                    You keep ownership of the articles you write. By publishing an article, you give us a free, non-exclusive, worldwide licence
                    to store, display and share it on the Service, with your name as the author.
                </p>
                <LegalList items={[
                    'You confirm that you wrote it or have the right to publish it, including any images you use',
                    'You are responsible for what you publish, not us',
                    'Published articles are public and can be seen by anyone',
                    'We may unpublish, edit or remove content that breaks these Terms or the law',
                ]} />
                <p>
                    You can ask us to remove your articles at any time by emailing{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a>.
                </p>
            </>
        ),
    },
    {
        id: 'privacy',
        title: 'Privacy',
        body: (
            <p>
                How we handle your personal data is explained in our{' '}
                <Link to="/privacy" className={linkCls}>Privacy Policy</Link>.
            </p>
        ),
    },
    {
        id: 'third-party-links',
        title: 'Third-party links and services',
        body: (
            <p>
                The Service may link to other websites or use outside services. We do not control them and are not responsible for their content or practices.
                Their own terms and privacy policies apply when you use them.
            </p>
        ),
    },
    {
        id: 'termination',
        title: 'Termination',
        body: (
            <>
                <p>
                    You can stop using the Service at any time. To delete your account and its data, email us at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a>.
                </p>
                <p>
                    We may suspend or end your access if you break these Terms or misuse the Service. Sections that by their nature should continue
                    after that, such as ownership, disclaimers and limits on liability, will continue.
                </p>
            </>
        ),
    },
    {
        id: 'disclaimer',
        title: 'Disclaimer',
        body: (
            <>
                <p>The Service is provided "as is" and "as available", without warranties of any kind, to the extent the law allows.</p>
                <LegalList items={[
                    'Articles are for general information and are not professional advice',
                    'Code examples may contain mistakes or become outdated, so test them before relying on them',
                    'Articles written by users express the views of their authors, not ours',
                    'We do not promise the Service will always be available, error-free or secure',
                ]} />
            </>
        ),
    },
    {
        id: 'limitation-of-liability',
        title: 'Limitation of liability',
        body: (
            <p>
                To the extent the law allows, we are not liable for indirect or consequential losses, or for loss of data or profits, that result from using or being unable to use the Service.
                The Service is free, so any liability we do have is limited to the amount you have paid us, if any.
                Nothing in these Terms limits liability that cannot be limited by law.
            </p>
        ),
    },
    {
        id: 'changes',
        title: 'Changes to these terms',
        body: (
            <p>
                We may update these Terms from time to time. For significant changes we will try to give notice on the site before they take effect.
                The date at the top of this page shows when they were last changed.
            </p>
        ),
    },
    {
        id: 'governing-law',
        title: 'Governing law',
        body: (
            <p>
                These Terms are governed by the laws of {JURISDICTION}, and disputes will be handled by the courts there.
                If a part of these Terms is found unenforceable, the rest still applies. If we do not enforce a right straight away, that does not mean we give it up.
            </p>
        ),
    },
    {
        id: 'contact',
        title: 'Contact us',
        body: (
            <p>
                Questions about these Terms? Email{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>{CONTACT_EMAIL}</a>
                {' '}or use the form on our <Link to="/newsletter" className={linkCls}>contact page</Link>.
            </p>
        ),
    },
];
