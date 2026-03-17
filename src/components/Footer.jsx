import React from 'react';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { HiOutlineMail, HiOutlineExternalLink } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Analysis', path: '/analysis' },
        { name: 'Cost Predictor', path: '/predict' },
        { name: 'Health News', path: '/news' },
    ];

    const resources = [
        { name: 'Documentation', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
    ];

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2 text-2xl font-black bg-gradient-to-r from-sky-600 to-emerald-600 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
                            <img src='/icon.svg' alt="ClinAware" className="w-8 h-8 drop-shadow-sm" />
                            ClinAware
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Revolutionizing clinical intelligence through Deep Learning and Computer Vision.
                        </p>
                        <div className="flex gap-4 text-slate-400 dark:text-slate-600">
                            <a href="https://github.com/inj-krish19/clinaware-frontend" className="hover:text-sky-500 transition-all hover:scale-110"><SiGithub size={20} /></a>
                            <a href="https://linkedin.com" className="hover:text-sky-500 transition-all hover:scale-110"><SiLinkedin size={20} /></a>
                            <a href="mailto:clinawareofficial@gmail.com" className="hover:text-sky-500 transition-all hover:scale-110"><HiOutlineMail size={22} /></a>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Quick Actions</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-slate-500 dark:text-slate-400 text-sm hover:text-sky-500 dark:hover:text-sky-400 transition-colors flex items-center gap-1 group">
                                        {link.name}
                                        <HiOutlineExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
                        <ul className="space-y-4">
                            {resources.map((link) => (
                                <li key={link.name}>
                                    <a href={link.path} className="text-slate-500 dark:text-slate-400 text-sm hover:text-sky-500 transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter/Contact Placeholder */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <h4 className="text-slate-900 dark:text-white font-bold mb-2 text-sm">Need Assistance?</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">Reach out to our official support channel.</p>
                        <a
                            href="mailto:clinawareofficial@gmail.com"
                            className="block text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sky-600 dark:text-sky-400 py-2 rounded-xl text-xs font-bold hover:bg-sky-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>

                {/* Bottom Bar: Credits & Copyright */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <div className="text-slate-400 dark:text-slate-600 text-xs font-medium space-y-1">
                        <p>© {currentYear} ClinAware — Clinical Intelligence Platform.</p>
                        <p>All Rights Reserved.</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-tighter">
                            Architected & Developed by
                        </p>
                        <div className="flex gap-2 mt-1">
                            <span className="px-3 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-[10px] font-black tracking-widest uppercase">
                                Mr. Chirag Pujara
                            </span>
                            <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-[10px] font-black tracking-widest uppercase">
                                Kavan Prajapati
                            </span>
                            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase">
                                Krish Shah
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}