import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuHistory, LuSearch, LuShieldCheck, LuActivity,
    LuUser, LuWallet, LuChevronRight, LuTrash2, LuCalendar,
    LuCpu
} from 'react-icons/lu';
import { BACKEND_URL } from '../context/constants';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedId, setExpandedId] = useState(null);

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

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    /* const deleteEntry = async (id) => {
        if (!window.confirm("Permanent removal from secure archives?")) return;
        try {
            await fetch(`${BACKEND_URL}/insurance/history/${id}`, {
                method: 'DELETE',
                credentials: "include"
            });
            setHistory(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error("Deletion failed:", err);
        }
    }; */

    useEffect(() => { fetchHistory(); }, []);

    const filteredHistory = history.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalAnalyses = history.length;
    const avgPremium = history.reduce((acc, curr) => acc + (curr.predictions?.regressor || 0), 0) / (totalAnalyses || 1);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mb-6"
            />
            <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-[0.3em]">Accessing Secure Archives</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6 selection:bg-emerald-500/30 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-16 gap-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                <LuHistory className="text-emerald-500" size={28} />
                            </div>
                            <div>
                                <h1 className="text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                    Inference <span className="text-emerald-500">Registry</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Encrypted Audit Log • ClinAware Protocol</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                        <div className="relative group flex-1 sm:w-80">
                            <LuSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="IDENTIFY PATIENT..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:border-emerald-500/50 text-slate-900 dark:text-white text-[11px] font-bold transition-all uppercase placeholder:text-slate-400 dark:placeholder:text-slate-700 shadow-sm dark:shadow-none"
                            />
                        </div>
                    </div>
                </header>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    {[
                        { label: "Total Sessions", val: totalAnalyses, icon: LuActivity },
                        { label: "Mean Premium", val: `₹${Math.round(avgPremium).toLocaleString()}`, icon: LuWallet },
                        { label: "Registry Status", val: "ACTIVE", icon: LuShieldCheck },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex items-center gap-5 shadow-sm dark:shadow-none">
                            <stat.icon className="text-emerald-500" size={24} />
                            <div>
                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Registry List */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((item, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={item.id || index}
                                    className="group bg-white dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 transition-all duration-300 shadow-sm dark:shadow-none"
                                >
                                    <div className="p-4 lg:p-8 flex flex-col xl:flex-row gap-8 items-center">
                                        {/* Patient Core */}
                                        <div className="flex gap-5 items-center min-w-[280px]">
                                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-xl text-emerald-500">
                                                {item.name ? item.name[0] : '?'}
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">{item.name}</h3>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase">
                                                    <span>{item.age}Y</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                    <span className="text-emerald-600 dark:text-emerald-500/80">{item.region}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Metrics Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1 w-full py-4 lg:py-0 border-y lg:border-y-0 border-slate-100 dark:border-slate-800/50 lg:px-8">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">BMI Index</p>
                                                <p className="text-md font-bold text-slate-700 dark:text-slate-300">{item.bmi?.toFixed(1) || '--'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">Risk Profile</p>
                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${item.chronic_condition === 'yes' ? 'border-rose-500/30 text-rose-500 bg-rose-500/5' : 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'}`}>
                                                    {item.chronic_condition === 'yes' ? 'CHRONIC' : 'HEALTHY'}
                                                </span>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-1">Income</p>
                                                <p className="text-md font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                                    <LuWallet size={12} /> {item.income}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Financial Outcome */}
                                        <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-10">
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em] mb-1">Recommended Premium</p>
                                                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                                                    ₹{item.predictions?.regressor?.toLocaleString('en-IN') || '0'}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {/* <button
                                                    onClick={() => deleteEntry(item.id)}
                                                    className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                                                >
                                                    <LuTrash2 size={18} />
                                                </button> */}
                                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all cursor-pointer" onClick={() => toggleExpand(item._id || index)}>
                                                    <LuChevronRight size={20} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedId === (item._id || index) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800"
                                            >
                                                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <ModelMetric
                                                        label="Beta Model"
                                                        value={item.predictions?.nn}
                                                        sub="Neural Network Prediction"
                                                    />
                                                    <ModelMetric
                                                        label="Trusted Model"
                                                        value={item.predictions?.regressor}
                                                        sub="Random Forest Regressor"
                                                    />
                                                    <ModelMetric
                                                        label="Alpha Model"
                                                        value={item.predictions?.model}
                                                        sub="Linear Regression"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))
                        ) : (
                            <div className="h-96 border border-slate-300 dark:border-slate-800 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900/20">
                                <LuShieldCheck size={48} className="text-slate-300 dark:text-slate-800 mb-4" />
                                <p className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-600 tracking-[0.3em]">Registry Empty</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

function ModelMetric({ label, value, sub }) {
    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50 space-y-2 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 mb-2">
                <LuCpu className="text-emerald-500/50" size={14} />
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">₹{value?.toLocaleString() || '0'}</p>
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-700 uppercase">{sub}</p>
        </div>
    );
}