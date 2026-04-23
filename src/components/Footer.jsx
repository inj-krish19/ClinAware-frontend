import React from 'react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import { LuArrowRight, LuHeart } from 'react-icons/lu';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-900 transition-colors pt-24 pb-12 font-inter">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white tracking-tighter font-jakarta">
                            <div className="size-10 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                                <img src='/icon.svg' alt="ClinAware" className="w-6 h-6 brightness-0 invert" />
                            </div>
                            ClinAware
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                            Revolutionizing clinical intelligence through Deep Learning nodes and computer vision architectures.
                        </p>
                        <div className="flex gap-4">
                            {[SiGithub, SiLinkedin, SiX, HiOutlineMail].map((Icon, i) => (
                                <a key={i} href="#" className="size-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-500/5 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-black mb-8 text-[10px] uppercase tracking-[0.2em] font-jakarta">Infrastructure</h4>
                            <ul className="space-y-4 text-sm font-semibold">
                                {['Dashboard', 'Risk Analysis', 'Cost Predictor', 'Clinical News'].map((item) => (
                                    <li key={item}>
                                        <Link to="#" className="text-slate-500 hover:text-sky-500 transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-slate-900 dark:text-white font-black mb-8 text-[10px] uppercase tracking-[0.2em] font-jakarta">Governance</h4>
                            <ul className="space-y-4 text-sm font-semibold">
                                {['Documentation', 'Privacy Protocol', 'Terms', 'AI Ethics'].map((item) => (
                                    <li key={item}>
                                        <Link to="#" className="text-slate-500 hover:text-emerald-500 transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Support Bento Box */}
                    <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="text-slate-900 dark:text-white font-black mb-2 font-jakarta">Clinical Support</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 font-medium">Inquiry response time: &lt; 2 hours</p>
                            <a href="mailto:support@clinaware.com" className="flex items-center justify-between bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl text-xs font-black text-sky-600 shadow-sm border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 transition-all">
                                Contact Help Desk
                                <LuArrowRight />
                            </a>
                        </div>
                        <div className="absolute -top-4 -right-4 size-24 bg-sky-500/5 blur-2xl rounded-full group-hover:bg-sky-500/10 transition-colors" />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest font-mono">
                        © {currentYear} ClinAware // Precision Health OS
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Architects</span>
                        {['Kavan Prajapati', 'Krish Shah'].map((name) => (
                            <span key={name} className="px-5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-tight shadow-sm">
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}