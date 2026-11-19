import React from 'react';
import LegalLayout from '../reuse/LegalLayout';

import { SITE_NAME, PRIVACY_UPDATED } from '../utils/siteConfig';
import { privacySections } from '../data/privacyData';
import { useLegalTitle } from '../hooks/useLegalLayout';

const Privacy = () => {
    useLegalTitle(`Privacy Policy | ${SITE_NAME}`);

    return (
        <LegalLayout title="Privacy Policy" subtitle={`What ${SITE_NAME} collects, why, and how you can control it. Last updated ${PRIVACY_UPDATED}.`} sections={privacySections} />
    );
};

export default Privacy;
