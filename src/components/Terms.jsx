import React from 'react';
import LegalLayout from '../reuse/LegalLayout';

import { SITE_NAME, TERMS_UPDATED } from '../utils/siteConfig';
import { termsSections } from '../data/termsData';
import { useLegalTitle } from '../hooks/useLegalLayout';

const Terms = () => {
    useLegalTitle(`Terms and Conditions | ${SITE_NAME}`);

    return (
        <LegalLayout title="Terms and Conditions" subtitle={`The rules for using ${SITE_NAME}. Last updated ${TERMS_UPDATED}.`} sections={termsSections} numbered />
    );
};

export default Terms;
