import React, { useState, useEffect } from 'react';
import { HiOutlineSun, HiOutlineMoon, HiOutlineUpload } from 'react-icons/hi';

export default function Navbar() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Brand */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-200 dark:shadow-none transition-transform group-hover:scale-105">
                        <span className="text-white font-bold text-xl">C</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
                        ClinAware
                    </span>
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-300 font-medium">
                    {['Dashboard', 'Analysis', 'Predict', 'Reports', 'News'].map((item) => (
                        <a key={item} href={`/${item.toLowerCase()}`} className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
                    >
                        {theme === 'light' ? <HiOutlineMoon size={20} /> : <HiOutlineSun size={20} />}
                    </button>

                    <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md shadow-sky-100 dark:shadow-none transition-all">
                        <HiOutlineUpload size={20} />
                        <span>Upload Scan</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};