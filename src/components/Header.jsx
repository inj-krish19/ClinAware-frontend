import React from 'react';
import { LuNewspaper, LuCalculator, LuScanFace, LuArrowRight } from 'react-icons/lu';

const ModuleCard = ({ title, description, Icon, colorClass }) => (
    <div className="group p-10 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500">
        <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center text-2xl shadow-inner ${colorClass}`}>
            <Icon />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 text-sm">{description}</p>
        <button className="flex items-center gap-2 text-sm font-bold text-sky-500 group-hover:gap-3 transition-all">
            Launch Module <LuArrowRight />
        </button>
    </div>
);

export default function Header() {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-[#020617] pt-24 pb-32">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="max-w-4xl mb-20">
                    <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[1.05]">
                        Intelligent Insights for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">Modern Healthcare</span>
                    </h1>
                    <p className="mt-8 text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                        ClinAware bridges the gap between raw clinical data and actionable insights using state-of-the-art Deep Learning.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ModuleCard
                        title="Health News Bot"
                        description="Automated medical news aggregation powered by NLP and web intelligence."
                        Icon={LuNewspaper}
                        colorClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    />
                    <ModuleCard
                        title="Insurance Predictor"
                        description="Accurate annual cost projections using multivariate regression modeling."
                        Icon={LuCalculator}
                        colorClass="bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ModuleCard
                            title="News Bot"
                            description="Daily clinical breakthroughs summarized by AI."
                            Icon={LuNewspaper}
                            colorClass="bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400"
                        />
                        <ModuleCard
                            title="Vitals Check"
                            description="BP and Diabetes risk assessment via multi-input."
                            Icon={LuActivity}
                            colorClass="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        />
                        <ModuleCard
                            title="Report Vision"
                            description="Extract and structure data from medical PDFs/Images."
                            Icon={LuScanFace}
                            colorClass="bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}