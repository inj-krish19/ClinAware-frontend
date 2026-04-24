import React, { useState } from 'react';
import { HiOutlineSun, HiOutlineMoon, HiMenuAlt3, HiX, HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../context/auth';
import { BACKEND_URL } from '../context/constants';

export default function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = useAuth((state) => state.isAuthenticated);
    const { dark, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Predict', path: '/predict' },
        { name: 'Analysis', path: '/analysis' },
        { name: 'News', path: '/news' },
        { name: 'Health Monitor', path: '/chronic' },
        { name: 'Report AI', path: '/vision' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const logout = async () => {

        let res = await fetch(`${BACKEND_URL}/auth/logout`, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            credentials: "include"
        });

        let response = await res.json();
        window.location.href = '/';

    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-xl bg-white/70 dark:bg-[#020617]/70 border-slate-200/50 dark:border-slate-800/50 font-inter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <div className="size-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-2 shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
                            <img src='/icon.svg' alt="logo" className="w-full h-full brightness-0 invert" />
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white   font-jakarta ">
                            ClinAware
                        </span>
                    </Link>

                    {/* Desktop Pill Nav */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/40 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-5 py-2 rounded-xl text-xs font-black uppercase   transition-all duration-300 ${location.pathname === link.path
                                        ? 'bg-white dark:bg-slate-800 text-sky-500 dark:text-sky-400 shadow-sm'
                                        : 'text-slate-500 hover:text-sky-500'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Action Hub */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button onClick={toggleTheme} className="size-10 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 transition-all hover:border-sky-500/50">
                            {dark ? <HiOutlineSun size={18} className="text-amber-400" /> : <HiOutlineMoon size={18} className="text-sky-600" />}
                        </button>

                        {isAuthenticated ? (
                            <>
                                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                                    <button onClick={() => navigate('/profile')} className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
                                        <HiOutlineUserCircle size={26} />
                                    </button>
                                    <button onClick={() => { logout(); }} className="size-10 flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                                        <HiOutlineLogout size={20} />
                                    </button>
                                </div>
                                {/* Mobile Menu Toggle */}
                                <button onClick={toggleMenu} className="md:hidden size-10 flex items-center justify-center bg-slate-900 text-white rounded-xl">
                                    {isOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
                                </button>
                            </>
                        ) : (
                            <Link to="/signin" className="px-5 sm:px-6 py-2 rounded-xl bg-sky-500 text-white text-[10px] sm:text-xs font-black uppercase   hover:bg-sky-600 transition-all">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-screen w-72 bg-white dark:bg-[#020617] z-50 p-8 border-l border-slate-200 dark:border-slate-800 md:hidden"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-10">
                                    <span className="text-xs font-black uppercase   text-slate-400">Navigation</span>
                                    <button onClick={toggleMenu} className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500">
                                        <HiX size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={toggleMenu}
                                            className={`block p-4 rounded-2xl text-sm font-black uppercase   transition-all ${location.pathname === link.path
                                                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                                                : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                                    <button onClick={() => { navigate('/profile'); toggleMenu(); }} className="flex items-center gap-3 w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase text-[10px]  ">
                                        <HiOutlineUserCircle size={20} /> Profile
                                    </button>
                                    <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-rose-500/10 text-rose-500 font-bold uppercase text-[10px] " onClick={() => { logout(); }} >
                                        <HiOutlineLogout size={20} /> Logout
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}