import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    LuActivity, LuNewspaper, LuArrowRight, LuUserPlus,
    LuLayoutDashboard, LuCircleCheck, LuScanFace, LuFileText,
    LuShieldCheck, LuZap, LuLock, LuHeartPulse, LuDatabase, LuChartLine
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    const [activeTab, setActiveTab] = useState('insurance');

    const services = {
        insurance: {
            title: "Insurance Predictor",
            path: "/predict",
            description: "Eliminating medical billing shock through Random Forest Regressors that forecast premiums with 98% precision.",
            details: "By analyzing 14+ biometric markers, we provide users with a financial roadmap, preventing the common 'surprise' of high-risk premium spikes.",
            icon: LuShieldCheck,
            color: "emerald"
        },
        news: {
            title: "Clinical News Bot",
            path: "/news",
            subtitle: "Awareness Updates",
            description: "Automated cron-job pipeline scraping the latest global healthcare breakthroughs and summarizing them using NLP for quick consumption.",
            details: "Stay updated without effort, Unbiased clinical sourcing, Automated daily curations",
            icon: LuNewspaper,
            color: "purple",
        },
        chronic: {
            title: "Vitals Intelligence",
            path: "/chronic",
            description: "Early-stage detection of Hypertension and Type-II Diabetes through neural binary classification.",
            details: "We convert raw clinical data into a risk-index. Detecting symptoms 6 months before they become chronic, effectively saving lives through early intervention.",
            icon: LuActivity,
            color: "rose"
        },
        vision: {
            title: "Vision Report AI",
            path: "/vision",
            description: "Proprietary OCR and Clinical LLM pipeline that deconstructs complex medical PDFs into plain English.",
            details: "Patients often ignore reports they don't understand. Our AI breaks down blood markers into 'Actionable Insights,' ensuring no vital sign is overlooked.",
            icon: LuScanFace,
            color: "sky"
        }
    };

    return (
        <main className="bg-slate-50 dark:bg-[#030712] text-slate-600 dark:text-slate-300 pt-20 transition-colors duration-300">
            {/* --- REFINED HERO --- */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] font-bold uppercase  ">
                            <LuHeartPulse className="animate-pulse" /> Healthcare Platform
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white font-poppins">
                            Intelligence that <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-500 dark:from-sky-400 dark:to-emerald-400">Understands your Vitals.</span>
                        </h1>
                        <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                            ClinAware isn't just a dashboard. It's a clinical layer that sits between your complex medical data and your peace of mind, using neural architecture to predict risks before they become realities.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <Link to="/signup" className="px-6 py-3 rounded-xl bg-sky-600 text-white font-bold text-sm hover:bg-sky-500 transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20">
                                Get Started <LuArrowRight size={16} />
                            </Link>
                            <Link to="/news" className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                                Read Clinical News
                            </Link>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-8">
                            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm dark:shadow-none">
                                <LuShieldCheck className="text-emerald-500 dark:text-emerald-400 mb-3" size={24} />
                                <h4 className="text-slate-900 dark:text-white font-bold">Secure Vault</h4>
                                <p className="text-xs text-slate-500 mt-1">End-to-end encrypted clinical records.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm dark:shadow-none">
                                <LuZap className="text-amber-500 dark:text-yellow-400 mb-3" size={24} />
                                <h4 className="text-slate-900 dark:text-white font-bold">Real-time</h4>
                                <p className="text-xs text-slate-500 mt-1">Instant inference on report uploads.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm dark:shadow-none">
                                <LuDatabase className="text-purple-600 dark:text-purple-400 mb-3" size={24} />
                                <h4 className="text-slate-900 dark:text-white font-bold">Data Silos</h4>
                                <p className="text-xs text-slate-500 mt-1">Unified view of your medical history.</p>
                            </div>
                            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl h-48 flex flex-col justify-end shadow-sm dark:shadow-none">
                                <LuChartLine className="text-sky-600 dark:text-sky-400 mb-3" size={24} />
                                <h4 className="text-slate-900 dark:text-white font-bold">94% Accuracy</h4>
                                <p className="text-xs text-slate-500 mt-1">Trained on 50k+ clinical datasets.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROBLEM & SOLUTION SECTION --- */}
            <section className="bg-slate-100/50 dark:bg-slate-900/30 py-24 border-y border-slate-200 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-poppins">Why ClinAware Matters</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto italic font-medium text-sm">
                            "Healthcare data is currently fragmented, confusing, and reactive. We make it unified, simple, and predictive."
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "The Jargon Barrier", desc: "Medical reports are written for doctors, not patients. Our AI translates 'Hyperlipidemia' into 'High Cholesterol' with actionable diet plans.", icon: LuScanFace },
                            { title: "Preventing Crisis", desc: "Most people only visit doctors when they are sick. Our Vitals Engine spots patterns of hypertension before the first symptom appears.", icon: LuActivity },
                            { title: "Financial Literacy", desc: "Medical debt is the #1 cause of bankruptcy. We predict your premiums so you can plan your family's future without fear.", icon: LuShieldCheck }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-black/20 border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all group shadow-sm dark:shadow-none">
                                <item.icon className="text-sky-600 dark:text-sky-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MODULE EXPLORER WITH ANIMATED TEXT --- */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3 space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-poppins">System Modules</h2>
                        {Object.keys(services).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`w-full text-left p-6 rounded-2xl border transition-all ${activeTab === key
                                    ? 'bg-sky-600/10 border-sky-500 text-sky-600 dark:text-white'
                                    : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {React.createElement(services[key].icon, { size: 20 })}
                                    <span className="font-bold text-sm uppercase  ">{services[key].title}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="md:w-2/3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 relative overflow-hidden shadow-sm dark:shadow-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 space-y-6"
                            >
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{services[activeTab].title}</h3>
                                <p className="text-lg text-sky-600 dark:text-sky-400 font-medium">{services[activeTab].description}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-black/30 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                                    {services[activeTab].details}
                                </p>
                                <Link to={services[activeTab].path} className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm group">
                                    Access Module Core <LuArrowRight className="group-hover:translate-x-2 transition-transform text-sky-500" />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute top-[-10%] right-[-10%] size-64 bg-sky-500/5 blur-[80px] rounded-full" />
                    </div>
                </div>
            </section>

            {/* --- TRUST & IMPACT --- */}
            <section className="max-w-7xl mx-auto px-6 py-20 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">12k+</div>
                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase   mt-2">Reports Analyzed</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">99.9%</div>
                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase   mt-2">Uptime Reliability</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">24/7</div>
                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase   mt-2">Clinical Monitoring</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">Privacy</div>
                        <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase   mt-2">Zero-Data Leakage</div>
                    </div>
                </div>
            </section>

            {/* --- FINAL ACTION --- */}
            <section className="max-w-5xl mx-auto px-6 py-24">
                <div className="bg-gradient-to-br from-sky-50 dark:from-sky-900/40 to-white dark:to-slate-900 border border-sky-100 dark:border-sky-500/20 p-12 rounded-[3rem] text-center space-y-6 shadow-2xl dark:shadow-none">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white italic">The Future of Health is Predictive.</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">Join the nexus of clinical experts and proactive patients using ClinAware to stay ahead of the curve.</p>
                    <Link to="/dashboard" className="inline-block px-10 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase font-poppins hover:bg-sky-600 dark:hover:bg-sky-400 transition-all shadow-xl">
                        Deploy Your Dashboard
                    </Link>
                </div>
            </section>
        </main>
    );
}