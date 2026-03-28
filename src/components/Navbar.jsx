import React, { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon, HiOutlineUpload, HiMenuAlt3, HiX, HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const { dark, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Defaulted to true as requested
    const location = useLocation();

    // 1. Check Auth Status from Backend
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/auth/me`, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    credentials: "include"
                });

                let response = await res.json();
                console.log(response)
                console.log(Boolean(response.authenticated));

                setIsAuthenticated(Boolean(response.authenticated || false));
            } catch (err) {
                setIsAuthenticated(false); // Set to false if route fails
            }
        };
        checkAuth(); // Uncomment this when your backend route is ready
    }, []);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Predict', path: '/predict' },
        { name: 'Analysis', path: '/analysis' },
        { name: 'News', path: '/news' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-lg bg-white/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between h-14">

                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2.5 group transition-transform active:scale-95">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                            <img src='/icon.svg' alt="logo" className="w-full h-full" />
                        </div>
                        <span className="text-2xl font-black bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent tracking-tight">
                            ClinAware
                        </span>
                    </Link>

                    {/* 2. Desktop Navigation - Only visible if Authenticated */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${location.pathname === link.path
                                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-sky-500'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-sky-500 transition-all shadow-sm"
                        >
                            {dark ? <HiOutlineSun size={20} className="text-amber-400" /> : <HiOutlineMoon size={20} className="text-sky-600" />}
                        </button>

                        {/* 3. Conditional Rendering for Auth State */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-lg shadow-sky-200 dark:shadow-none transition-all active:scale-95 text-sm">
                                    <HiOutlineUpload size={18} />
                                    <span>Upload Scan</span>
                                </button>

                                {/* Profile Avatar */}
                                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-sky-500 cursor-pointer hover:border-sky-500 transition-all">
                                    <HiOutlineUserCircle size={26} />
                                </div>

                                <button
                                    className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                                    title="Logout"
                                >
                                    <HiOutlineLogout size={22} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/signin" className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-sky-500">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold transition-all hover:opacity-90">
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] border-b' : 'max-h-0'} bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800`}>
                <div className="px-4 py-6 space-y-3">
                    {isAuthenticated ? (
                        <>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 rounded-2xl text-base font-bold text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:text-sky-600 dark:hover:text-sky-400 transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-sky-500 text-white font-bold shadow-lg">
                                <HiOutlineUpload size={20} />
                                <span>Upload Scan</span>
                            </button>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <Link to="/signin" className="block w-full text-center px-4 py-3 rounded-2xl font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                                Sign In
                            </Link>
                            <Link to="/signup" className="block w-full text-center px-4 py-4 rounded-2xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
