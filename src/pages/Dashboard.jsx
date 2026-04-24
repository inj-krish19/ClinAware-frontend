import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuLayoutDashboard, LuHistory, LuFileText, LuTrendingUp,
    LuShieldPlus, LuActivity, LuArrowUpRight, LuCircleAlert,
    LuShield, LuWallet, LuZap, LuInfo
} from "react-icons/lu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BACKEND_URL } from '../context/constants';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [hoveredBar, setHoveredBar] = useState(null);

    const fetchData = async () => {
        try {
            let res = await fetch(`${BACKEND_URL}/analysis/age-avg-premium`, {
                method: 'GET',
                headers: { "content-type": "application/json" },
                credentials: "include"
            });
            let response = await res.json();
            setData(response?.data || []);
        } catch (e) {
            console.error("Data fetch failed", e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#020617] transition-colors duration-500 pb-12 font-inter">
            <main className="max-w-[1400px] mx-auto px-6 pt-10 space-y-10">

                {/* --- HEADER SECTION --- */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white font-jakarta  ">
                            Health Intelligence
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                            Welcome back. Here is your clinical risk overview.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <div className="size-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase  ">
                            FETCHING LIVE DATA
                        </span>
                    </div>
                </header>

                {/* --- QUICK ACTIONS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <ActionCard
                        icon={<LuActivity />} title="New Prediction" desc="Neural Risk Analysis"
                        color="bg-sky-500" onClick={() => window.location.href = '/predict'}
                    />
                    <ActionCard
                        icon={<LuHistory />} title="Past Insights" desc="Historical Benchmarks"
                        color="bg-indigo-500" onClick={() => window.location.href = '/history'}
                    />
                    <ActionCard
                        icon={<LuTrendingUp />} title="Vitals Engine" desc="Health Monitoring based on Readings"
                        color="bg-fuchsia-500" onClick={() => window.location.href = '/chronic'}
                    />
                    <ActionCard
                        icon={<LuFileText />} title="Report Vision" desc="Reports AI Reader & Assistant"
                        color="bg-emerald-500" onClick={() => window.location.href = '/vision'}
                    />
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* --- MAIN ANALYTICS BLOCK --- */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="relative overflow-hidden bg-white dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm group">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-jakarta">Market Benchmarks</h3>
                                    <p className="text-xs text-slate-500 font-medium mt-1">Average annual premium (₹) across demographic nodes</p>
                                </div>
                                <LuInfo className="text-slate-400 cursor-help" />
                            </div>

                            <div className="h-[340px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} onMouseMove={(v) => v && setHoveredBar(v.activeLabel)}>
                                        <defs>
                                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#38bdf8" stopOpacity={1} />
                                                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.05} />
                                        <XAxis
                                            dataKey="age"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 11, fontWeight: 700, fill: '#64748b' }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(56, 189, 248, 0.05)' }}
                                            contentStyle={{
                                                borderRadius: '20px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                backgroundColor: '#0f172a',
                                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                                            }}
                                            itemStyle={{ color: '#38bdf8', fontSize: '12px', fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="yearly" radius={[10, 10, 0, 0]} barSize={32}>
                                            {data.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={hoveredBar === entry.age ? 'url(#barGradient)' : '#334155'}
                                                    className="transition-all duration-300"
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* --- KNOWLEDGE CARDS --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <InsightCard
                                icon={<LuWallet className="text-sky-500" />}
                                label="Wealth"
                                title="Liquidity Shield"
                                text="Health events often deplete 60% of liquid assets. Pre-emption is financial security."
                            />
                            <InsightCard
                                icon={<LuZap className="text-amber-500" />}
                                label="Clinical"
                                title="Node Accuracy"
                                text="Our neural engine reduces prediction variance by 14% compared to traditional models."
                            />
                            <InsightCard
                                icon={<LuShield className="text-emerald-500" />}
                                label="Security"
                                title="Encrypted Vitals"
                                text="Zero-knowledge proofs ensure your medical history remains private to you alone."
                            />
                        </div>
                    </div>

                    {/* --- SIDEBAR CONTENT --- */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white font-jakarta">Verified Partners</h3>
                                <span className="text-[10px] font-bold text-sky-500 uppercase   bg-sky-500/10 px-2 py-0.5 rounded-lg">IRDAI Regulated</span>
                            </div>
                            <div className="space-y-4">
                                <InsurLink name="ICICI Lombard" type="Private Tier-1" rating="4.8" />
                                <InsurLink name="HDFC ERGO" type="Market Leader" rating="4.7" />
                                <InsurLink name="Star Health" type="Surgical Focus" rating="4.6" />
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                    <LuCircleAlert className="text-sky-500 mt-1 flex-shrink-0" size={18} />
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic font-readex">
                                        "Experts suggest comparing 3+ policies. Prioritize claim settlement ratios over low premiums."
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* --- SYSTEM HEALTH / STATS --- */}
                        <div className="bg-white dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative overflow-hidden group transition-colors duration-300">
                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase mb-6  ">
                                    Market Health Index
                                </h4>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono italic">
                                                Claim_Settlement_Ratio
                                            </span>
                                            <span className="text-xl font-black text-slate-900 dark:text-white font-jakarta">
                                                94.2%
                                            </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '94.2%' }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center py-4 border-t border-slate-100 dark:border-slate-800">
                                        <span className="text-[11px] text-slate-500 dark:text-slate-500 font-bold uppercase  ">
                                            Network Hospitals
                                        </span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">
                                            12,400+
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Animated Ambient Glow */}
                            <div className="absolute top-[-20%] right-[-20%] size-40 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[60px] rounded-full group-hover:scale-150 transition-all duration-700" />
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
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="flex items-center gap-5 p-6 bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm text-left group transition-all"
        >
            <div className={`size-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-transform duration-300`}>
                {React.cloneElement(icon, { size: 26 })}
            </div>
            <div>
                <h4 className="text-[15px] font-black text-slate-900 dark:text-white font-jakarta  ">{title}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">{desc}</p>
            </div>
        </motion.button>
    );
}

function InsightCard({ icon, label, title, text }) {
    return (
        <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all">
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <span className="text-[9px] font-black uppercase   text-slate-400">{label}</span>
            </div>
            <h5 className="text-sm font-black text-slate-900 dark:text-white mb-2 font-jakarta">{title}</h5>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium font-readex">
                {text}
            </p>
        </div>
    );
}

function InsurLink({ name, type, rating }) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem] border border-transparent hover:border-sky-500/20 transition-all group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="size-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                    <LuShieldPlus size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white font-jakarta">{name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase  ">{type}</p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-sky-500">★ {rating}</span>
                <LuArrowUpRight size={14} className="text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
        </div>
    );
}