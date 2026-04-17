import React from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiOutlineMail, HiOutlineExternalLink } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 transition-colors pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            <img src='/icon.svg' alt="ClinAware" className="w-8 h-8" />
                            ClinAware
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Revolutionizing clinical intelligence through Deep Learning and Computer Vision.
                        </p>
                        <div className="flex gap-5 text-slate-400">
                            <a href="#" className="hover:text-sky-500 transition-colors"><SiGithub size={20} /></a>
                            <a href="#" className="hover:text-sky-500 transition-colors"><SiLinkedin size={20} /></a>
                            <a href="#" className="hover:text-sky-500 transition-colors"><HiOutlineMail size={22} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-xs uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4 text-sm">
                            {['Dashboard', 'Analysis', 'Cost Predictor', 'Health News'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-slate-500 hover:text-emerald-500 transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-xs uppercase tracking-widest">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link to="#" className="hover:text-emerald-500 transition-colors">Documentation</Link></li>
                            <li><Link to="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-2">Support</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">Need assistance with the platform?</p>
                        <a href="mailto:support@clinaware.com" className="block text-center bg-white dark:bg-slate-800 py-3 rounded-xl text-xs font-bold text-sky-600 shadow-sm border border-slate-200 dark:border-slate-700">
                            Contact Help Desk
                        </a>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-xs">© {currentYear} ClinAware Platform. Built for the future of HealthTech.</p>
                    <div className="flex gap-2">
                        {['Kavan Prajapati', 'Krish Shah'].map((name) => (
                            <span key={name} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}