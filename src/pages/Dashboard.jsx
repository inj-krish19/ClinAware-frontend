import React from 'react';
import { motion } from 'framer-motion';
import {
    LuLayoutDashboard, LuHistory, LuFileText, LuTrendingUp,
    LuShieldPlus, LuExternalLink, LuCircleUser, LuChevronRight,
    LuActivity, LuArrowUpRight, LuCircleAlert
} from "react-icons/lu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample Data for "Population Intelligence" Charts
const ageData = [
    { range: '18-25', premium: 8500, users: 400 },
    { range: '26-35', premium: 12000, users: 850 },
    { range: '36-45', premium: 18500, users: 600 },
    { range: '46-60', premium: 32000, users: 300 },
    { range: '60+', premium: 55000, users: 150 },
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pb-12">

            {/* Top Navigation Bar (Dashboard Specific) */}
            <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LuLayoutDashboard className="text-sky-500" size={20} />
                        <span className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Clinical Hub</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-black text-slate-900 dark:text-white">Krish Patel</p>
                            <p className="text-[10px] text-emerald-500 font-bold uppercase">Patient ID: #8821</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-slate-700">
                            <LuCircleUser size={24} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">

                {/* 1. Quick Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <ActionCard
                        icon={<LuActivity />}
                        title="New Prediction"
                        desc="Calculate insurance costs"
                        color="bg-sky-500"
                        onClick={() => window.location.href = '/predict'}
                    />
                    <ActionCard
                        icon={<LuHistory />}
                        title="Medical History"
                        desc="View previous assessments"
                        color="bg-purple-500"
                    />
                    <ActionCard
                        icon={<LuFileText />}
                        title="Health Reports"
                        desc="Download PDF summaries"
                        color="bg-emerald-500"
                    />
                    <ActionCard
                        icon={<LuTrendingUp />}
                        title="Risk Trends"
                        desc="Personal health tracking"
                        color="bg-amber-500"
                    />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* 2. Charts Section (Population Intelligence) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Insurance Benchmarks</h3>
                                    <p className="text-xs text-slate-500">Average premiums by age group in India (₹/Year)</p>
                                </div>
                                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Live Market Data
                                </div>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ageData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.1} />
                                        <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', color: '#fff' }}
                                            itemStyle={{ color: '#38bdf8' }}
                                        />
                                        <Bar dataKey="premium" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Alerts / Recommendations */}
                        <div className="bg-sky-600 rounded-[2rem] p-6 text-white relative overflow-hidden">
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <LuCircleAlert size={18} />
                                        <span className="font-black uppercase text-xs tracking-widest">Recommendation</span>
                                    </div>
                                    <p className="text-xl font-bold">Your BMI suggests a 15% lower premium if maintained.</p>
                                </div>
                                <button className="bg-white text-sky-600 px-4 py-2 rounded-xl font-black text-xs hover:bg-sky-50 transition-colors">
                                    VIEW TIPS
                                </button>
                            </div>
                            <div className="absolute top-[-20%] right-[-5%] w-40 h-40 bg-white/10 blur-3xl rounded-full" />
                        </div>
                    </div>

                    {/* 3. Expert Referral Links (Indian Insurance) */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Trusted Insurers</h3>
                            <div className="space-y-3">
                                <InsurLink name="ICICI Lombard" type="Private Sector" rating="4.8" url="https://www.icicilombard.com" />
                                <InsurLink name="National Insurance" type="Govt. of India" rating="4.5" url="https://nationalinsurance.nic.co.in" />
                                <InsurLink name="Star Health" type="Specialized Medical" rating="4.7" url="https://www.starhealth.in" />
                                <InsurLink name="HDFC ERGO" type="Private Sector" rating="4.6" url="https://www.hdfcergo.com" />
                            </div>

                            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                                    "Experts recommend comparing 3+ policies. Look for 'No Claim Bonus' and 'OPD Cover' specifically in Indian plans."
                                </p>
                                <p className="text-[10px] font-black text-sky-500 mt-2">— ClinAware Advisor</p>
                            </div>
                        </div>

                        {/* Quick Stats Sidebar */}
                        <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-[2rem]">
                            <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Market Statistics</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-slate-500">Average Claim Ratio</span>
                                    <span className="text-lg font-black text-slate-900 dark:text-white">94.2%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="w-[94%] h-full bg-emerald-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Sub-components for Cleanliness
function ActionCard({ icon, title, desc, color, onClick }) {
    return (
        <motion.button
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-left group transition-all"
        >
            <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{title}</h4>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{desc}</p>
            </div>
        </motion.button>
    );
}

function InsurLink({ name, type, rating, url }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-transparent hover:border-sky-500/30 transition-all group"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                    <LuShieldPlus size={18} className="text-sky-500" />
                </div>
                <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">{name}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{type}</p>
                </div>
            </div>
            <LuArrowUpRight size={16} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
        </a>
    );
}
