import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiViewGrid, HiViewList, HiDownload } from 'react-icons/hi';
import { LuActivity, LuCircleAlert } from "react-icons/lu";
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { BACKEND_URL } from '../context/constants';

export default function Analysis() {
    const [viewMode, setViewMode] = useState('grid');
    const [timeframe, setTimeframe] = useState('monthly'); // Defaulting to monthly as per previous change
    const [chartsData, setChartsData] = useState({
        ageAvg: [], chronicAge: [], nonChronicAge: [],
        regionAvg: [], chronicRegion: [], nonChronicRegion: []
    });
    const [loading, setLoading] = useState(true);

    // 1. Unified Data Fetcher - Updated to Risk-Based Endpoints
    const fetchAllData = async () => {
        setLoading(true);
        const endpoints = [
            'age-avg-premium',
            'chronic-age-avg-premium',
            'nonchronic-age-avg-premium',
            'region-avg-premium',
            'chronic-region-avg-premium',
            'nonchronic-region-avg-premium'
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

    const downloadCSV = (data, title) => {
        if (!data || data.length === 0) return;
        const headers = Object.keys(data[0]).join(",");
        const rows = data.map(row => Object.values(row).join(",")).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${title}_analysis.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const ChartCard = ({ title, data, children, color, icon: Icon }) => (
        <motion.div
            layout
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm 
            ${viewMode === 'list' ? 'col-span-full' : 'col-span-1'}`}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3 items-center">
                    <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-500`}>
                        {Icon && <Icon size={18} />}
                    </div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h3>
                </div>
                <button
                    onClick={() => downloadCSV(data, title)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-sky-500"
                    title="Export Dataset"
                >
                    <HiDownload size={18} />
                </button>
            </div>
            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {children}
                </ResponsiveContainer>
            </div>
        </motion.div>
    );

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617]">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Processing Demographic Intelligence...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-28 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                            Clinical <span className="text-sky-500 underline decoration-sky-500/20">Analysis</span>
                        </h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2 flex gap-2 items-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Live Market Trends: {timeframe} metrics
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                            {['yearly', 'monthly'].map((t) => (
                                <button key={t} onClick={() => setTimeframe(t)}
                                    className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all
                                    ${timeframe === t ? 'bg-white dark:bg-slate-700 shadow-sm text-sky-500' : 'text-slate-500'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="hidden md:flex gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                <HiViewGrid size={20} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                <HiViewList size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Overall Trends */}
                    <ChartCard title="Standard Age-Cost Curve" data={chartsData.ageAvg} color="sky" icon={LuActivity}>
                        <AreaChart data={chartsData.ageAvg}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                            <XAxis dataKey="age" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                            <Area type="monotone" dataKey={timeframe} stroke="#0ea5e9" fill="url(#colorSky)" strokeWidth={3} />
                            <defs>
                                <linearGradient id="colorSky" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </AreaChart>
                    </ChartCard>

                    <ChartCard title="Regional Distribution" data={chartsData.regionAvg} color="indigo" icon={HiViewGrid}>
                        <BarChart data={chartsData.regionAvg} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="region" type="category" fontSize={10} width={80} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#6366f1" radius={[0, 10, 10, 0]} barSize={20} />
                        </BarChart>
                    </ChartCard>

                    {/* Chronic Risk Segmentation */}
                    <ChartCard title="Chronic Risk: Age Impact" data={chartsData.chronicAge} color="rose" icon={LuCircleAlert}>
                        <BarChart data={chartsData.chronicAge}>
                            <XAxis dataKey="age" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#f43f5e" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="Non-Chronic: Age Impact" data={chartsData.nonChronicAge} color="emerald" icon={LuActivity}>
                        <BarChart data={chartsData.nonChronicAge}>
                            <XAxis dataKey="age" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="Chronic Risk by Region" data={chartsData.chronicRegion} color="rose" icon={LuCircleAlert}>
                        <BarChart data={chartsData.chronicRegion}>
                            <XAxis dataKey="region" fontSize={9} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                            <Bar dataKey={timeframe} fill="#f43f5e" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="Non-Chronic by Region" data={chartsData.nonChronicRegion} color="emerald" icon={LuActivity}>
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
