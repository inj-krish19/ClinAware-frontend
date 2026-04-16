import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuHistory, LuSearch, LuShieldCheck, LuActivity, LuLayers, LuUser, LuWallet } from 'react-icons/lu';
import { BACKEND_URL } from '../context/constants';
import InsuranceMarket from '../components/InsuranceMarket'

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchHistory = async () => {
        setLoading(true);
        try {
            // Updated to your specific route
            const res = await fetch(`${BACKEND_URL}/insurance/history`, { credentials: "include" });
            const data = await res.json();
            // Accessing data from the 'data' array as per your requirement
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
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617]">
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing Medical Archives...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-28 pb-12 px-6">
            <div className="max-w-6xl mx-auto">

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <LuHistory className="text-sky-500" size={26} />
                            <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                                Prediction <span className="text-sky-500">History</span>
                            </h1>
                        </div>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Secured Patient Audit Log</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <LuSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="SEARCH BY PATIENT IDENTITY..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 ring-sky-500/20 focus:border-sky-500 dark:text-white text-[11px] font-black tracking-widest transition-all shadow-sm"
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={item.id || index}
                                    className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center hover:border-sky-500/30 transition-all"
                                >
                                    {/* Patient Core Profile */}
                                    <div className="flex gap-6 items-center min-w-[280px]">
                                        <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-sky-500 ">
                                            {item.name ? item.name[0] : '?'}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-2">{item.name}</h3>
                                            <div className="flex gap-3 items-center">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.age}y</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest capitalize">{item.sex}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                                <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest">{item.region}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Clinical Metrics */}
                                    <div className="grid grid-cols-3 gap-8 flex-1">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><LuActivity size={12} /> BMI</p>
                                            <p className="text-md font-bold dark:text-white">{item.bmi.toFixed(1)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><LuWallet size={12} /> Income</p>
                                            <p className="text-md font-bold dark:text-white">₹{item.income.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Risk Factor</p>
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-tighter ${item.chronic_condition === 'yes' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                                {item.chronic_condition === 'yes' ? 'Chronic' : 'Standard'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Prediction Map Processing */}
                                    <div className="w-full lg:w-auto flex flex-col md:flex-row gap-6 items-center bg-slate-50 dark:bg-slate-800/40 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
                                        <div className="px-4 text-center md:text-left">
                                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Recommended Premium</p>
                                            <p className="text-3xl font-black text-slate-900 dark:text-emerald-400 tracking-tighter">
                                                ₹{item.predictions?.regressor?.toLocaleString('en-IN') || '0'}
                                            </p>
                                        </div>

                                        <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-700" />

                                        <div className="flex gap-6">
                                            <div className="text-center">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Alpha (LR)</p>
                                                <p className="text-sm font-bold dark:text-slate-200">₹{item.predictions?.model?.toLocaleString('en-IN') || '0'}</p>
                                            </div>
                                            {/* <div className="text-center">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Beta (NN)</p>
                                                <p className="text-sm font-bold dark:text-slate-200">₹{item.predictions?.nn?.toLocaleString('en-IN') || '0'}</p>
                                            </div> */}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="h-[400px] border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center text-slate-300">
                                <LuShieldCheck size={56} className="mb-4 opacity-5" />
                                <p className="text-[11px] font-black uppercase tracking-[0.5em] opacity-40">No Clinical Records Found</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

        </div>
    );
}
