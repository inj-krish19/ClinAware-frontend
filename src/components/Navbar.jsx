import React, { useState } from 'react';
import { HiOutlineSun, HiOutlineMoon, HiOutlineUpload, HiMenuAlt3, HiX, HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi';
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
    ];

    const logout = async () => {
        try {
            await fetch(`${BACKEND_URL}/auth/logout`, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                credentials: "include"
            });
            window.location.href = '/';
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-slate-200/50 dark:border-slate-800/50 transition-all">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-2 shadow-lg shadow-sky-500/20">
                            <img src='/icon.svg' alt="logo" className="w-full h-full brightness-0 invert" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white hover:scale-105 hover:text-sky-400 transition">
                            ClinAware
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/40 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${location.pathname === link.path
                                        ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-sky-500'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:ring-2 ring-slate-200 dark:ring-slate-800 transition-all"
                        >
                            {dark ? <HiOutlineSun size={20} className="text-amber-400" /> : <HiOutlineMoon size={20} className="text-sky-600" />}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/20 transition-all">
                                    <HiOutlineUpload size={18} />
                                    <span>Upload Scan</span>
                                </button>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="p-2 text-slate-400 hover:text-sky-500 transition-colors"
                                >
                                    <HiOutlineUserCircle size={28} />
                                </button>
                                <button
                                    onClick={logout}
                                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                                >
                                    <HiOutlineLogout size={22} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/signin" className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:opacity-90 transition-all">
                                Sign In
                            </Link>
                        )}

                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-600 dark:text-slate-400">
                            {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}