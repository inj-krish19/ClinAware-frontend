import React from 'react';
import { Link } from 'react-router-dom';
import { LuActivity, LuShieldPlus, LuNewspaper, LuArrowRight, LuUserPlus, LuLogIn } from 'react-icons/lu';

const FeatureCard = ({ title, description, Icon, accentColor }) => (
    <div className="group p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-200/20 dark:hover:shadow-none">
        <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-2xl transition-transform group-hover:scale-110 group-hover:rotate-3 ${accentColor}`}>
            <Icon />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
            {description}
        </p>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Learn More <LuArrowRight />
        </div>
    </div>
);

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">

            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-200/30 dark:bg-sky-900/20 blur-[80px] md:blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-emerald-100/40 dark:bg-emerald-900/10 blur-[70px] md:blur-[100px] rounded-full" />

            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-32 flex flex-col items-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-slate-800 text-sky-700 dark:text-sky-300 text-xs md:text-sm font-semibold mb-8">
                    <LuShieldPlus className="animate-pulse text-sky-500" />
                    <span>Intelligent Healthcare Intelligence</span>
                </div>

                {/* Hero Title - Responsive scaling */}
                <h1 className="max-w-4xl text-center text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] px-2">
                    Predictive Insights for a <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-sky-600 to-emerald-500 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
                        Healthier Tomorrow
                    </span>
                </h1>

                {/* Subtext */}
                <p className="mt-6 md:mt-8 max-w-2xl text-center text-base md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium px-4">
                    ClinAware bridges the gap between raw medical data and clinical action using
                    state-of-the-art Machine Learning and Computer Vision.
                </p>

                {/* Primary Actions & Auth Flow Navigation */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-6">
                    <Link to="/predict" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold shadow-lg shadow-sky-200 dark:shadow-none transition-all active:scale-95 text-center flex items-center justify-center gap-2">
                        Get Started <LuArrowRight size={18} />
                    </Link>

                </div>

                {/* Responsive Features Grid */}
                <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
                    <FeatureCard
                        title="Cost Prediction"
                        description="Leveraging advanced regression models to forecast annual medical premiums with high precision."
                        Icon={LuActivity}
                        accentColor="bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400"
                    />
                    <FeatureCard
                        title="Risk Analysis"
                        description="Categorizing health profiles into risk tiers to provide personalized wellness roadmaps."
                        Icon={LuShieldPlus}
                        accentColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                    />
                    <FeatureCard
                        title="Health News Bot"
                        description="Automated cron-driven news curation that aggregates the latest global medical trends daily."
                        Icon={LuNewspaper}
                        accentColor="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    />
                </div>

                {/* Signup Call to Action Section */}
                <div className="mt-24 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Ready to secure your future?</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Create a free account to save your reports and track health trends.</p>
                    </div>
                    <Link to="/signup" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all active:scale-95 whitespace-nowrap">
                        <LuUserPlus size={20} /> Join ClinAware
                    </Link>
                </div>

            </section>
        </main>
    );
}