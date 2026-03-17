import React from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                        <div className="w-6 h-6 rounded bg-sky-500" />
                        ClinAware
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Built with React, Flask, and TensorFlow.
                    </p>
                </div>

                <div className="flex gap-6 text-slate-400 dark:text-slate-600">
                    <a href="#" className="hover:text-sky-500 transition-colors"><SiGithub size={24} /></a>
                    <a href="#" className="hover:text-sky-500 transition-colors"><SiLinkedin size={24} /></a>
                    <a href="#" className="hover:text-sky-500 transition-colors"><HiOutlineMail size={26} /></a>
                </div>

                <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
                    © {new Date().getFullYear()} Clinical Intelligence Platform
                </p>
            </div>
        </footer>
    );
};