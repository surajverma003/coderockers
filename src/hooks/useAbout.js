import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const useAbout = () => {
    const location = useLocation();
    const [openFaq, setOpenFaq] = useState(0);

    // Hero sirf /about route par dikhta hai (component kahin aur embed ho to nahi)
    const showHero = location.pathname === '/about';

    // Same FAQ dobara click karo to band ho jata hai
    const toggleFaq = (index) => setOpenFaq((current) => (current === index ? -1 : index));

    return { showHero, openFaq, toggleFaq };
};

export default useAbout;
