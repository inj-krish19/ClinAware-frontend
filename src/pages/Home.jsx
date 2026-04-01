import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    LuActivity, LuShieldPlus, LuNewspaper, LuArrowRight, LuUserPlus,
    LuLayoutDashboard, LuBrain, LuZap, LuCircleCheck, LuTrendingUp
} from 'react-icons/lu';

export default function Home() {
    const [activeTab, setActiveTab] = useState('insurance');

    const services = {
        insurance: {
            title: "Personalized Cost Predictor",
            subtitle: "Regression-Based Machine Learning",
            description: "Calculates annual health insurance premiums using demographic biometrics (BMI, age, smoking status, region) using Random Forest Regressors.",
            benefits: ["Prevents medical billing shock", "Financial planning tool", "Correlative trend analysis"],
            icon: LuActivity,
            color: "emerald",
            stat: "$0.02s Inference"
        },
        news: {
            title: "Clinical News Bot",
            subtitle: "Web Automation & NLP Summarization",
            description: "Automated cron-job pipeline scraping the latest global healthcare breakthroughs and summarizing them using NLP for quick consumption.",
            benefits: ["Stay updated without effort", "Unbiased clinical sourcing", "Automated daily curations"],
            icon: LuNewspaper,
            color: "purple",
            stat: "Daily 8AM Updates"
        },
        // skin: {
        //     title: "OncoVision (Skin Cancer AI)",
        //     subtitle: "Computer Vision & Deep Learning",
        //     description: "An advanced Neural Network built on MobileNetV2 architecture. Classifies skin lesions into 7 diagnostic categories using the HAM10000 dataset.",
        //     benefits: ["Early detection of Melanoma", "Accessible triage tool", "94%+ validation accuracy"],
        //     icon: LuShieldPlus,
        //     color: "sky",
        //     stat: "7 Classes Detection"
        // },
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-[#030712] transition-colors duration-500 font-sans selection:bg-sky-500 selection:text-white">

            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-sky-500/10 dark:bg-sky-500/10 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full" />

            <section className="relative max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16 flex flex-col items-center">

                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-8 shadow-lg shadow-sky-500/5 hover:scale-105 transition-transform cursor-pointer">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    <span>Intelligent Healthcare Intelligence </span>
                </div>

                <h1 className="max-w-4xl text-center text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
                    Predictive Insights for a<br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                        Healthier Tomorrow
                    </span>
                </h1>

                <p className="max-w-2xl text-center text-base md:text-lg text-slate-600 dark:text-slate-400 font-normal mb-10 leading-relaxed">
                    ClinAware bridges the gap between healthcare data silos and actionable wellness metrics through state-of-the-art
                    Machine Learning and Computer Vision and Web Automation.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <Link to="/predict" className="group w-full sm:w-auto px-8 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2">
                        Launch Dashboard <LuLayoutDashboard size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a href="#explore-services" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center">
                        Explore Services
                    </a>
                </div>
            </section>

            <section className="relative max-w-5xl mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
                    <div className="flex flex-col items-center md:items-start p-4">
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">94.2%</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Classification Accuracy</span>
                    </div>
                    <div className="flex flex-col items-center md:items-start p-4 border-y md:border-y-0 md:border-x border-slate-200 dark:border-slate-800">
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">95% +</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Insurance Prediction Efficiency</span>
                    </div>
                    <div className="flex flex-col items-center md:items-start p-4">
                        <span className="text-3xl font-extrabold text-slate-900 dark:text-white">End-to-End</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Health Ecosystem</span>
                    </div>
                </div>
            </section>

            <section id="explore-services" className="relative max-w-7xl mx-auto px-6 py-16 mb-24">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                        The Core Intelligence Engine
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
                        ClinAware utilizes isolated, fine-tuned services to solve distinct medical and billing challenges. Select a module to see how it works.
                    </p>
                </div>

                <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {Object.keys(services).map((key) => {
                        const module = services[key];
                        const Icon = module.icon;
                        const isActive = activeTab === key;

                        return (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${isActive
                                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 hover:cursor-pointer'
                                    }`}
                            >
                                <Icon size={18} />
                                {key === 'skin' ? 'Skin AI' : key === 'insurance' ? 'Cost Model' : 'News Automator'}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl items-center min-h-[400px]">

                    <div className="lg:col-span-7 space-y-6">
                        <div className="space-y-2">
                            <span className="text-xs font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
                                {services[activeTab].subtitle}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                {services[activeTab].title}
                            </h3>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                            {services[activeTab].description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {services[activeTab].benefits.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                                    <LuCircleCheck size={18} className="text-emerald-500 flex-shrink-0" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                            <Link to={`/${activeTab}`} className="flex items-center gap-2 text-sm font-bold text-sky-600 dark:text-sky-400 hover:underline">
                                Launch Module <LuArrowRight />
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex justify-center items-center">
                        <div className="w-full max-w-sm h-72 rounded-2xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center p-8 relative overflow-hidden border border-slate-200 dark:border-slate-700 group cursor-pointer">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-2xl rounded-full group-hover:bg-sky-500/20 transition-all duration-700" />

                            {activeTab === 'skin' && (
                                <div className="text-center flex flex-col items-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 text-3xl animate-bounce">
                                        <LuShieldPlus />
                                    </div>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">Upload Lesion Image</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Supported: JPG, PNG, DICOM</span>
                                </div>
                            )}

                            {activeTab === 'insurance' && (
                                <div className="w-full space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Predicted Premium</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">$13,245 / yr</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">BMI Factor Impact</span>
                                        <span className="font-bold text-red-500">+12.5%</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'news' && (
                                <div className="w-full space-y-3">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 animate-pulse"></div>
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-md w-full animate-pulse delay-75"></div>
                                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-md w-5/6 animate-pulse delay-150"></div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <span className="px-2 py-1 text-[10px] bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 rounded-md font-bold">Medicine</span>
                                        <span className="px-2 py-1 text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-md font-bold">Healthcare</span>
                                    </div>
                                </div>
                            )}

                            <div className="absolute bottom-4 text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                                live: {services[activeTab].stat}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative max-w-6xl mx-auto px-6 pb-24">
                <div className="mt-32 w-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 italic">Join the ClinAware Network</h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg font-medium max-w-md">Securely track your diagnostic history and get personalized health trend analysis.</p>
                    </div>
                    <Link to="/signup" className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95">
                        <LuUserPlus size={24} /> Get Started Free
                    </Link>
                </div>
            </section>

        </main>
    );
}
