import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    LuLayoutDashboard, LuHistory, LuFileText, LuTrendingUp,
    LuShieldPlus, LuActivity, LuArrowUpRight, LuCircleAlert,
    LuShield,
    LuWallet
} from "react-icons/lu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BACKEND_URL } from '../context/constants';

export default function Dashboard() {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        let res = await fetch(`${BACKEND_URL}/analysis/age-avg-premium`, {
            method: 'GET',
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        });

        let response = await res.json();
        setData(response?.data);

    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pb-12">

            <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">

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
                        title="Insurance History"
                        desc="View previous assessments"
                        color="bg-purple-500"
                        onClick={() => window.location.href = '/history'}
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
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.1} />
                                        <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', color: '#fff' }}
                                            itemStyle={{ color: '#38bdf8' }}
                                        />
                                        <Bar dataKey="yearly" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Financial Security Insight */}
                            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-3 text-sky-500">
                                    <LuWallet size={16} />
                                    <h5 className="text-[10px] font-black uppercase tracking-widest">Wealth Protection</h5>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                                    Insurance isn't just an expense; it's a **one-time investment** for crisis management. Without it, a single critical hospitalization can deplete up to 60% of middle-class household savings.
                                </p>
                            </div>

                            {/* Risk Assessment Insight */}
                            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-3 text-emerald-500">
                                    <LuActivity size={16} />
                                    <h5 className="text-[10px] font-black uppercase tracking-widest">Clinical Risk</h5>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                                    Our neural engine flags your profile's specific risk factors. Securing a policy while your **BMI and age** are in the "Green Zone" locks in lower premiums and bypasses strict medical waiting periods.
                                </p>
                            </div>

                            {/* The "Hidden" Aspect Insight */}
                            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-3 text-amber-500">
                                    <LuShield size={16} />
                                    <h5 className="text-[10px] font-black uppercase tracking-widest">Restoration Factor</h5>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                                    Users often overlook **Unlimited Restoration**. In a multi-claim year, this feature ensures your cover amount resets to zero cost—effectively doubling your protection without increasing the premium.
                                </p>
                            </div>
                        </div>
                    </div>

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

function ActionCard({ icon, title, desc, color, onClick }) {
    return (
        <motion.button
            whileHover={{ y: -5 }}
            onClick={onClick}
            className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-left group transition-all hover:cursor-pointer"
        >
            <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 `}>
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
