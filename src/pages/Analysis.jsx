import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiViewGrid, HiViewList, HiDownload, HiRefresh } from 'react-icons/hi';
import {
    ResponsiveContainer, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { BACKEND_URL } from '../context/constants';

export default function Analysis() {
    const [viewMode, setViewMode] = useState('grid');
    const [timeframe, setTimeframe] = useState('yearly'); // 'yearly' or 'monthly'
    const [chartsData, setChartsData] = useState({
        ageAvg: [], smokerAge: [], nonSmokerAge: [],
        regionAvg: [], smokerRegion: [], nonSmokerRegion: []
    });
    const [loading, setLoading] = useState(true);

    // 1. Unified Data Fetcher
    const fetchAllData = async () => {
        setLoading(true);
        const endpoints = [
            'age-avg-premium', 'smoker-age-avg-premium', 'nonsmoker-age-avg-premium',
            'region-avg-premium', 'smoker-region-avg-premium', 'nonsmoker-region-avg-premium'
        ];

        try {
            const results = await Promise.all(
                endpoints.map(ep => fetch(`${BACKEND_URL}/analysis/${ep}`).then(res => res.json()))
            );

            setChartsData({
                ageAvg: results[0]?.data || [],
                smokerAge: results[1]?.data || [],
                nonSmokerAge: results[2]?.data || [],
                regionAvg: results[3]?.data || [],
                smokerRegion: results[4]?.data || [],
                nonSmokerRegion: results[5]?.data || [],
            });
        } catch (err) {
            console.error("Analysis Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAllData(); }, []);

    // 2. CSV Download Handler
    const downloadCSV = (data, title) => {
        if (!data || data.length === 0) return;
        const headers = Object.keys(data[0]).join(",");
        const rows = data.map(row => Object.values(row).join(",")).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${title}_${timeframe}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const ChartCard = ({ title, data, children, fullWidth }) => (
        <motion.div
            layout
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm 
            ${viewMode === 'list' || fullWidth ? 'col-span-full' : 'col-span-1'}`}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h3>
                <button
                    onClick={() => downloadCSV(data, title)}
                    className="p-2 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-xl transition-all text-sky-500 hover:scale-110 hover:bg-indigo-500"
                    title="Download CSV"
                >
                    <HiDownload size={18} />
                </button>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {children}
                </ResponsiveContainer>
            </div>
        </motion.div>
    );

    if (loading) return <div className="h-screen flex items-center justify-center dark:text-white font-bold">Analysing Demographics...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-28 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                            Medical <span className="text-sky-500 underline decoration-sky-500/20">Analysis</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">Premium trends across {timeframe} metrics.</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                            {['yearly', 'monthly'].map((t) => (
                                <button key={t} onClick={() => setTimeframe(t)}
                                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all
                                    ${timeframe === t ? 'bg-white dark:bg-slate-700 shadow-sm text-sky-500' : 'text-slate-500'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        <div className="hidden md:flex gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                <HiViewGrid size={18} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                <HiViewList size={18} />
                            </button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ChartCard title="Overall Age vs Premium" data={chartsData.ageAvg}>
                        <AreaChart data={chartsData.ageAvg}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                            <XAxis dataKey="age" fontSize={10} />
                            <YAxis fontSize={10} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: "purple" }} />
                            <Area type="monotone" dataKey={timeframe} stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={3} />
                        </AreaChart>
                    </ChartCard>

                    <ChartCard title="Smokers: Age & Premium" data={chartsData.smokerAge}>
                        <BarChart data={chartsData.smokerAge}>
                            <XAxis dataKey="age" fontSize={10} />
                            <YAxis fontSize={10} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: "purple" }} />
                            <Bar dataKey={timeframe} fill="#f43f5e" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="Non-Smokers: Age & Premium" data={chartsData.nonSmokerAge}>
                        <BarChart data={chartsData.nonSmokerAge}>
                            <XAxis dataKey="age" fontSize={10} />
                            <YAxis fontSize={10} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: "purple" }} />
                            <Bar dataKey={timeframe} fill="#10b981" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="Regional Average" data={chartsData.regionAvg}>
                        <BarChart data={chartsData.regionAvg} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="region" type="category" fontSize={10} width={80} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: "purple" }} />
                            <Bar dataKey={timeframe} fill="#6366f1" radius={[0, 5, 5, 0]} />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="Smokers by Region" data={chartsData.smokerRegion}>
                        <BarChart data={chartsData.smokerRegion}>
                            <XAxis dataKey="region" fontSize={9} />
                            <YAxis fontSize={10} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: "purple" }} />
                            <Bar dataKey={timeframe} fill="#f43f5e" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ChartCard>

                    <ChartCard title="Non-Smokers by Region" data={chartsData.nonSmokerRegion}>
                        <BarChart data={chartsData.nonSmokerRegion}>
                            <XAxis dataKey="region" fontSize={9} />
                            <YAxis fontSize={10} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', color: "purple" }} />
                            <Bar dataKey={timeframe} fill="#10b981" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
}
