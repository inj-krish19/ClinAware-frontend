import React from 'react';
import { LuNewspaper, LuCalculator, LuScanFace, LuArrowRight } from 'react-icons/lu';

const ModuleCard = ({ title, description, Icon, colorClass }) => (
    <div className="group p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300">
        <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-2xl ${colorClass}`}>
            <Icon />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{description}</p>
        <button className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold group-hover:gap-3 transition-all">
            Launch Module <LuArrowRight />
        </button>
    </div>
);

export default function Header() {
    return (
        <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-16 pb-24">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-emerald-100/50 dark:bg-emerald-900/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-sky-100/50 dark:bg-sky-900/10 blur-[100px] rounded-full" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                        Intelligent Insights for <span className="text-sky-500">Modern Healthcare</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        ClinAware combines Deep Learning and Web Automation to bridge the gap between raw data and clinical action.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ModuleCard
                        title="Health News Bot"
                        description="Real-time global medical news aggregation using NLP and automated scraping."
                        Icon={LuNewspaper}
                        colorClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                    />
                    <ModuleCard
                        title="Insurance Predictor"
                        description="Predict annual medical costs using multi-variate regression modeling."
                        Icon={LuCalculator}
                        colorClass="bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400"
                    />
                    <ModuleCard
                        title="Skin Classifier"
                        description="Analyze dermatological images for early detection using CNN architectures."
                        Icon={LuScanFace}
                        colorClass="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    />
                </div>
            </div>
        </section>
    );
};