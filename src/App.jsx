import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ContextState from './context/ContextState';

import MyProfile from './components/MyProfile';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blogs from './components/Blogs';
import ViewBlog from './components/ViewBlog';
import About from './components/About';
import Categories from './components/Categories';
import Newsletter from './components/Newsletter';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import CreateBlog from './components/CreateBlog';
import GenerateCode from './components/GenerateCode';
import Terms from './components/Terms';
import Privacy from './components/Policy';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Page (path) badalne par top se shuru ho. Sirf pathname dekhta hai,
// isliye listing ke ?page= / ?search= badalne par scroll nahi uchhalta.
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const App = () => {
    return (
        <>
            <div className="poppins flex flex-col min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <ContextState>
                        <ScrollToTop />
                        <Navbar />
                        <div className="flex-1">
                            <Routes>
                                {/* --- PUBLIC ACCESSIBLE ROUTES --- */}
                                <Route path='/' element={<Home />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/blogs' element={<Blogs />} />
                                <Route path='/category/:category' element={<Blogs />} />
                                <Route path='/view-blog/:slug' element={<ViewBlog />} />
                                <Route path='/categories' element={<Categories />} />
                                <Route path='/newsletter' element={<Newsletter />} />

                                <Route path='/profile' element={<MyProfile />} />
                                <Route path='/admin-dashboard' element={<AdminDashboard />} />
                                <Route path='/create-blog' element={<CreateBlog />} />

                                {/* --- USER AUTHENTICATION & RECOVERY --- */}
                                <Route path='/login' element={<Login />} />
                                <Route path='/signup' element={<Signup />} />
                                <Route path='/forgot-password' element={<ForgotPassword />} />
                                <Route path='/change-password' element={<ChangePassword />} />

                                {/* --- SPECIAL TOOLS : GenerateCode Component --- */}
                                <Route path='/generatecode' element={<GenerateCode />} />

                                {/* --- LEGAL & INFORMATION --- */}
                                <Route path='/privacy' element={<Privacy />} />
                                <Route path='/terms' element={<Terms />} />

                                {/* --- 404 --- */}
                                <Route path='*' element={<NotFound />} />
                            </Routes>
                        </div>
                        <Footer />
                    </ContextState>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
