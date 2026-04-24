import React from 'react';
import { LuNewspaper, LuCalculator, LuScanFace, LuArrowRight, LuActivity, LuZap } from 'react-icons/lu';
import { motion } from 'framer-motion';

const ModuleCard = ({ title, description, Icon, colorClass, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        viewport={{ once: true }}
        className="group relative p-8 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 overflow-hidden"
    >
        <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3 ${colorClass}`}>
            <Icon />
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3   font-jakarta">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-[13px] font-medium font-inter">{description}</p>
        <button className="flex items-center gap-2 text-xs font-black text-sky-500 uppercase   group-hover:gap-4 transition-all">
            Launch Module <LuArrowRight />
        </button>
        {/* Subtle accent glow on hover */}
        <div className="absolute -bottom-2 -right-2 size-24 bg-sky-500/5 blur-3xl rounded-full group-hover:bg-sky-500/10 transition-colors" />
    </motion.div>
);

export default function Header() {
    return (
        <section className="relative overflow-hidden bg-[#fafafa] dark:bg-[#020617] pt-32 pb-40 font-inter">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/5 blur-[140px] rounded-full -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full translate-y-1/2" />

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="max-w-4xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-8"
                    >
                        <LuZap className="text-amber-500 size-3" />
                        <span className="text-[10px] font-black uppercase   text-slate-500">Next-Gen Clinical AI</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white   leading-[0.95] font-jakarta">
                        Intelligent Insights for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-400">
                            Modern Healthcare.
                        </span>
                    </h1>
                    <p className="mt-8 text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-medium font-readex">
                        ClinAware bridges the gap between raw clinical data and actionable insights using state-of-the-art Deep Learning nodes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ModuleCard
                        title="Insurance AI"
                        description="Accurate cost projections using multivariate regression modeling."
                        Icon={LuCalculator}
                        colorClass="bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                        delay={0.1}
                    />
                    <ModuleCard
                        title="Vitals Engine"
                        description="BP and Diabetes risk assessment via multi-input neural paths."
                        Icon={LuActivity}
                        colorClass="bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
                        delay={0.2}
                    />
                    <ModuleCard
                        title="Report Vision"
                        description="Extract and structure data from complex medical PDFs and scans."
                        Icon={LuScanFace}
                        colorClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                        delay={0.3}
                    />
                    <ModuleCard
                        title="Clinical News"
                        description="Daily clinical breakthroughs summarized into actionable news."
                        Icon={LuNewspaper}
                        colorClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
}