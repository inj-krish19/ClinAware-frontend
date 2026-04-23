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

    return (
        <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-xl bg-white/70 dark:bg-[#020617]/70 border-slate-200/50 dark:border-slate-800/50 font-inter">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="size-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 p-2 shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
                            <img src='/icon.svg' alt="logo" className="w-full h-full brightness-0 invert" />
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter font-jakarta">
                            ClinAware
                        </span>
                    </Link>

                    {/* Centered Pill Nav */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-900/40 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${location.pathname === link.path
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
                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme} className="size-10 rounded-xl flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 transition-all hover:border-sky-500/50">
                            {dark ? <HiOutlineSun size={18} className="text-amber-400" /> : <HiOutlineMoon size={18} className="text-sky-600" />}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                                <button onClick={() => navigate('/profile')} className="p-2 text-slate-400 hover:text-sky-500 transition-colors">
                                    <HiOutlineUserCircle size={26} />
                                </button>
                                <button onClick={() => {/* logout logic */ }} className="size-10 flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all">
                                    <HiOutlineLogout size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/signin" className="px-6 py-2 rounded-xl bg-sky-500 text-white text-xs font-black uppercase tracking-widest hover:bg-sky-600 transition-all">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}