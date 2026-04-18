import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuHistory, LuSearch, LuShieldCheck, LuActivity,
    LuLayers, LuUser, LuWallet, LuStethoscope, LuChevronRight
} from 'react-icons/lu';
import { BACKEND_URL } from '../context/constants';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}/insurance/history`, { credentials: "include" });
            const data = await res.json();
            setHistory(data.data || []);
        } catch (err) {
            console.error("Clinical History Error:", err);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };

    useEffect(() => { fetchHistory(); }, []);

    const filteredHistory = history.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#020617]">
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-6" />
            <p className="text-[10px] font-black uppercase text-slate-400">Accessing Secure Archives</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] pt-32 pb-20 px-6 font-sans selection:bg-sky-500/30">
            <div className="max-w-6xl mx-auto">

                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-sky-500/10 rounded-lg">
                                <LuHistory className="text-sky-500" size={24} />
                            </div>
                            <h1 className="text-4xl font-black   text-slate-900 dark:text-white uppercase">
                                Analysis <span className="text-sky-500">History</span>
                            </h1>
                        </div>
                        <p className="text-slate-400 text-[10px] font-black uppercase  ml-12">ClinAware Audit Log • Secured</p>
                    </div>

                    <div className="relative w-full lg:w-[450px]">
                        <LuSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500" size={18} />
                        <input
                            type="text"
                            placeholder="SEARCH PATIENT ARCHIVES..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-4 ring-sky-500/5 focus:border-sky-500/50 dark:text-white text-[11px] font-black   transition-all shadow-sm uppercase placeholder:text-slate-300 dark:placeholder:text-slate-700"
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={item.id || index}
                                    className="group bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 flex flex-col xl:flex-row gap-10 items-start xl:items-center hover:border-sky-500/20 hover:shadow-2xl hover:shadow-sky-500/5 transition-all duration-500"
                                >
                                    {/* Patient Info Section */}
                                    <div className="flex gap-6 items-center min-w-[320px]">
                                        <div className="w-16 h-16 shrink-0 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex items-center justify-center font-black text-2xl text-sky-500">
                                            {item.name ? item.name[0] : '?'}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white   uppercase truncate max-w-[200px]">{item.name}</h3>
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <span className="text-[10px] font-black text-slate-400 uppercase  ">{item.age} Years</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase   capitalize">{item.sex}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                                                <span className="text-[10px] font-black text-sky-500 uppercase  ">{item.region}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Clinical Stats Grid */}
                                    <div className="grid grid-cols-3 gap-6 flex-1 w-full border-y xl:border-y-0 xl:border-x border-slate-50 dark:border-slate-800 py-6 xl:py-0 xl:px-10">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase   flex items-center gap-2">BMI</p>
                                            <p className="text-lg font-black dark:text-white  ">{item.bmi.toFixed(1)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase   flex items-center gap-2">Income</p>
                                            <p className="text-lg font-black dark:text-white  ">₹{item.income.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase  ">Risk Group</p>
                                            <span className={`inline-block mt-1 text-[9px] font-black px-3 py-1 rounded-full uppercase   ${item.chronic_condition === 'yes' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                                {item.chronic_condition === 'yes' ? 'Chronic' : 'Standard'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Prediction Results */}
                                    <div className="w-full xl:w-auto flex flex-col sm:flex-row gap-8 items-center bg-slate-50/50 dark:bg-slate-800/20 p-6 rounded-[2.5rem] border border-slate-100/50 dark:border-slate-800/50">
                                        <div className="text-center sm:text-left min-w-[140px]">
                                            <p className="text-[8px] font-black text-emerald-500 dark:text-emerald-400 uppercase   mb-1">Final Premium</p>
                                            <p className="text-3xl font-black text-slate-900 dark:text-white  ">
                                                ₹{item.predictions?.regressor?.toLocaleString('en-IN') || '0'}
                                            </p>
                                        </div>

                                        <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-slate-700/50" />

                                        <div className="flex gap-8">
                                            <div className="text-center">
                                                <p className="text-[8px] font-black text-slate-400 uppercase   mb-1">Alpha LR</p>
                                                <p className="text-sm font-black dark:text-slate-300">₹{item.predictions?.model?.toLocaleString('en-IN') || '0'}</p>
                                            </div>
                                            <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                                                <LuChevronRight className="text-slate-300 group-hover:text-sky-500 transition-colors" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="h-[450px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[4rem] flex flex-col items-center justify-center p-12 text-center">
                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-full mb-6">
                                    <LuShieldCheck size={48} className="text-slate-200 dark:text-slate-800" />
                                </div>
                                <p className="text-[11px] font-black uppercase text-slate-400 mb-2">Registry Empty</p>
                                <p className="text-xs text-slate-400 max-w-xs font-medium">No clinical prediction logs found in the secure database. Run a new analysis to populate history.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}