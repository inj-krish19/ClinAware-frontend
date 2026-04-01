import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDatabase, HiChevronDown, HiExternalLink, HiOutlineShieldCheck } from 'react-icons/hi';
import { BACKEND_URL } from '../context/constants';
import Loading from '../components/Loading';

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState(null);

    const fetchHistory = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/insurance/history`, {
                method: 'GET',
                headers: { "content-type": "application/json" },
                credentials: "include"
            });
            const response = await res.json();
            setHistory(response?.data || []);
        } catch (err) {
            console.error("History Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchHistory(); }, []);

    if (loading) return <Loading />;

    // Column spans for the 12-column grid
    const colStyles = "grid grid-cols-1 md:grid-cols-12 items-center p-6 md:p-8 gap-4";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-sky-500/10 rounded-lg">
                            <HiOutlineDatabase className="text-sky-500 text-xl" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">INSURANCE</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Prediction <span className="text-sky-500">History</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-2">Historical log of all generated insurance premium audits.</p>
                </header>

                {history.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No Records Found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="hidden md:grid grid-cols-12 px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span className="col-span-3">Subject</span>
                            <span className="col-span-2">Metrics</span>
                            <span className="col-span-2">Demographics</span>
                            <span className="col-span-2">Insurance Cost</span>
                            <span className="col-span-2">Alpha Model</span>
                            <span className="col-span-1 text-right">Action</span>
                        </div>

                        {history.map((item, idx) => (
                            <div key={idx} className="group">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl transition-all hover:shadow-lg hover:shadow-sky-500/5 
                                    ${expandedRow === idx ? 'ring-2 ring-sky-500/20' : ''}`}
                                >
                                    <div className={colStyles}>
                                        <div className="md:col-span-3 flex items-center gap-3">
                                            <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-sky-500 ">
                                                {item.name ? item.name[0] : '?'}
                                            </div>
                                            <div className="truncate">
                                                <h4 className="font-bold text-slate-900 dark:text-white truncate">{item.name}</h4>
                                                <span className="text-[10px] uppercase font-bold text-slate-400">{item.sex}</span>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 flex flex-col gap-1">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">BMI: <span className="text-sky-500">{item.bmi}</span></span>
                                            <span className="text-xs font-medium text-slate-400">Children: {item.children}</span>
                                        </div>

                                        <div className="md:col-span-2 flex flex-col gap-1">
                                            <div className={`text-[9px] w-fit px-2 py-0.5 rounded-full font-black uppercase ${item.smoker === 'yes' ? 'bg-rose-100 text-rose-500' : 'bg-emerald-100 text-emerald-500'}`}>
                                                {item.smoker === 'yes' ? 'Smoker' : 'Non-Smoker'}
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate">{item.region}</span>
                                        </div>

                                        <div className="hidden md:block md:col-span-2 font-mono text-xs font-bold text-sky-500">
                                            ₹{parseFloat(item.predictions.regressor).toLocaleString()}
                                        </div>

                                        <div className="hidden md:block md:col-span-2 font-mono text-xs font-bold text-emerald-500">
                                            ₹{parseFloat(item.predictions.nn).toLocaleString()}
                                        </div>

                                        <div className="md:hidden flex justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                                            <div className="text-center">
                                                <p className="text-[8px] uppercase font-bold text-slate-400 mb-1">Alpha Model</p>
                                                <p className="text-sm font-black text-emerald-500">₹{parseFloat(item.predictions.nn).toFixed(0)}</p>
                                            </div>
                                            <div className="text-center border-l border-slate-200 dark:border-slate-700 pl-4">
                                                <p className="text-[8px] uppercase font-bold text-slate-400 mb-1">Insurance Cost</p>
                                                <p className="text-sm font-black text-sky-500">₹{parseFloat(item.predictions.regressor).toFixed(0)}</p>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1 flex justify-end">
                                            <button
                                                onClick={() => setExpandedRow(expandedRow === idx ? null : idx)}
                                                className={`p-2 rounded-xl transition-all ${expandedRow === idx ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-sky-500'}`}
                                            >
                                                <HiChevronDown className={`transition-transform duration-300 ${expandedRow === idx ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedRow === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
                                            >
                                                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                                        <h5 className="text-[10px] font-black text-slate-400 uppercase mb-2">Insurance Cost Prediction</h5>
                                                        <p className="text-2xl font-black text-slate-900 dark:text-white">₹{parseFloat(item.predictions.regressor).toLocaleString()}</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                                        <h5 className="text-[10px] font-black text-slate-400 uppercase mb-2">Alpha Model Prediction</h5>
                                                        <p className="text-2xl font-black text-slate-900 dark:text-white">₹{parseFloat(item.predictions.nn).toLocaleString()}</p>
                                                    </div>
                                                    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                                        <h5 className="text-[10px] font-black text-slate-400 uppercase mb-2">Beta Model Prediction</h5>
                                                        <p className="text-2xl font-black text-slate-900 dark:text-white">₹{parseFloat(item.predictions.model).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
