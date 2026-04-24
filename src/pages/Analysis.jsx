import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiViewGrid, HiViewList, HiDownload } from 'react-icons/hi';
import { LuActivity, LuShieldAlert, LuZap, LuGlobe, LuChartBar } from "react-icons/lu";
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { BACKEND_URL } from '../context/constants';

export default function Analysis() {
    const [viewMode, setViewMode] = useState('grid');
    const [timeframe, setTimeframe] = useState('monthly');
    const [chartsData, setChartsData] = useState({
        ageAvg: [], chronicAge: [], nonChronicAge: [],
        regionAvg: [], chronicRegion: [], nonChronicRegion: []
    });
    const [loading, setLoading] = useState(true);

    const fetchAllData = async () => {
        setLoading(true);
        const endpoints = [
            'age-avg-premium', 'chronic-age-avg-premium', 'nonchronic-age-avg-premium',
            'region-avg-premium', 'chronic-region-avg-premium', 'nonchronic-region-avg-premium'
        ];

        try {
            const results = await Promise.all(
                endpoints.map(ep => fetch(`${BACKEND_URL}/analysis/${ep}`).then(res => res.json()))
            );

            setChartsData({
                ageAvg: results[0]?.data || [],
                chronicAge: results[1]?.data || [],
                nonChronicAge: results[2]?.data || [],
                regionAvg: results[3]?.data || [],
                chronicRegion: results[4]?.data || [],
                nonChronicRegion: results[5]?.data || [],
            });
        } catch (err) {
            console.error("Clinical Analysis Fetch Error:", err);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };

    useEffect(() => { fetchAllData(); }, []);

    const ChartCard = ({ title, subtitle, data, children, color, icon: Icon }) => (
        <motion.div
            layout
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm transition-all duration-300 hover:border-${color}-500/30
            ${viewMode === 'list' ? 'col-span-full' : 'col-span-1'}`}
        >
            <div className="flex justify-between items-start mb-8">
                <div className="flex gap-4 items-center">
                    <div className={`p-2.5 rounded-xl bg-${color}-500/10 text-${color}-500`}>
                        {Icon && <Icon size={20} />}
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase   leading-none mb-1.5">{title}</h3>
                        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{subtitle}</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-sky-500">
                    <HiDownload size={18} />
                </button>
            </div>
            <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {children}
                </ResponsiveContainer>
            </div>
        </motion.div>
    );

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-[3px] border-sky-500 border-t-transparent rounded-full mb-6"
            />
            <p className="text-[10px] font-black uppercase   text-slate-500">Processing Demographic Intelligence</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-32 pb-20 px-6 font-inter">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                    <div>
                        <h1 className="text-5xl font-black   text-slate-900 dark:text-white uppercase font-jakarta">
                            Clinical <span className="text-sky-500">Analysis.</span>
                        </h1>
                        <p className="text-slate-500 text-[10px] font-black uppercase   mt-4 flex gap-2 items-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Market Data: {timeframe} metrics
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                            {['yearly', 'monthly'].map((t) => (
                                <button key={t} onClick={() => setTimeframe(t)}
                                    className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase   transition-all
                                    ${timeframe === t ? 'bg-white dark:bg-slate-700 shadow-sm text-sky-500' : 'text-slate-500'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="hidden md:flex gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>
                                <HiViewGrid size={20} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100'}`}>
                                <HiViewList size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* 1. Overall Age Curve */}
                    <ChartCard title="Mean Cost Curve" subtitle="Standard Age Progression" data={chartsData.ageAvg} color="sky" icon={LuActivity}>
                        <AreaChart data={chartsData.ageAvg}>
                            <defs>
                                <linearGradient id="colorSky" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                            <XAxis dataKey="age" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey={timeframe} stroke="#0ea5e9" fill="url(#colorSky)" strokeWidth={3} />
                        </AreaChart>
                    </ChartCard>

                    {/* 2. Overall Regional Bar */}
                    <ChartCard title="Regional Distribution" subtitle="Geographic Allocation" data={chartsData.regionAvg} color="indigo" icon={LuGlobe}>
                        <BarChart data={chartsData.regionAvg} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="region" type="category" fontSize={10} width={80} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#6366f1" radius={[0, 10, 10, 0]} barSize={20} />
                        </BarChart>
                    </ChartCard>

                    {/* 3. Chronic Age Impact */}
                    <ChartCard title="Chronic Risk: Age" subtitle="High-Risk Cohort Correlation" data={chartsData.chronicAge} color="rose" icon={LuShieldAlert}>
                        <BarChart data={chartsData.chronicAge}>
                            <XAxis dataKey="age" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#f43f5e" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    {/* 4. Optimized Status Age Impact */}
                    <ChartCard title="Optimized Status: Age" subtitle="Non-Chronic Cohort Trends" data={chartsData.nonChronicAge} color="emerald" icon={LuZap}>
                        <BarChart data={chartsData.nonChronicAge}>
                            <XAxis dataKey="age" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    {/* 5. Chronic Regional Impact */}
                    <ChartCard title="Chronic Risk: Regional" subtitle="Risk Density by Geography" data={chartsData.chronicRegion} color="rose" icon={LuChartBar}>
                        <BarChart data={chartsData.chronicRegion}>
                            <XAxis dataKey="region" fontSize={9} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#f43f5e" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    {/* 6. Optimized Status Regional Impact */}
                    <ChartCard title="Optimized Status: Regional" subtitle="Efficiency by Geography" data={chartsData.nonChronicRegion} color="emerald" icon={LuActivity}>
                        <BarChart data={chartsData.nonChronicRegion}>
                            <XAxis dataKey="region" fontSize={9} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
}