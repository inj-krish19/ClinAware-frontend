import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuActivity, LuHeart, LuDroplets, LuInfo,
    LuHistory, LuCircleCheck, LuCircleAlert, LuChevronRight, LuStethoscope
} from 'react-icons/lu';
import { BACKEND_URL } from '../context/constants';

const VitalsCheck = () => {
    const [formData, setFormData] = useState({
        systolic: '',
        diastolic: '',
        glucose: '',
        is_fasting: false
    });
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => { fetchHistory(); }, []);

    const fetchHistory = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/vitals/history`, { credentials: "include" });
            const result = await res.json();
            if (result.code === 200) setHistory(result.data);
        } catch (err) {
            console.error("Failed to fetch history:", err);
        }
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const bpStatus = parseInt(formData.systolic) > 130 ? "Hypertension Risk" : "Normal";
        const diabetesStatus = parseInt(formData.glucose) > 100 ? "Elevated Glucose" : "Normal";

        const payload = {
            ...formData,
            bp_status: bpStatus,
            diabetes_status: diabetesStatus
        };

        try {
            const response = await fetch(`${BACKEND_URL}/vitals/analyze`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: "include"
            });

            const result = await response.json();
            if (result.code === 201) {
                setMessage({ type: 'success', text: "Vitals Synchronized with Clinical Core" });
                fetchHistory();
                setFormData({ systolic: '', diastolic: '', glucose: '', is_fasting: false });
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Clinical Server Connection Timeout" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white p-6 lg:p-12 font-sans selection:bg-sky-500/30 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-sky-500/10 rounded-xl border border-sky-500/20">
                                <LuStethoscope className="text-sky-500" size={24} />
                            </div>
                            <h1 className="text-4xl font-black uppercase">
                                Vitals <span className="text-sky-500">Intelligence</span>
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase ml-14">
                            Neural classification • Real-time diagnostics
                        </p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Input Form Section */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleAnalyze} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-10 backdrop-blur-md relative overflow-hidden shadow-xl dark:shadow-none">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-5 pointer-events-none">
                                <LuActivity size={120} className="text-sky-500" />
                            </div>

                            <div className="relative z-10 space-y-10">
                                <div className="space-y-6">
                                    <label className="flex items-center gap-3 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase">
                                        <LuHeart className="text-rose-500" size={18} /> Arterial Pressure (mmHg)
                                    </label>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <input
                                                required type="number" placeholder="SYSTOLIC"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center font-mono focus:border-sky-500 dark:focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none"
                                                value={formData.systolic}
                                                onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                                            />
                                            <p className="text-[9px] text-center font-bold text-slate-400 dark:text-slate-600 uppercase">Peak Pulse</p>
                                        </div>
                                        <div className="space-y-2">
                                            <input
                                                required type="number" placeholder="DIASTOLIC"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center font-mono focus:border-sky-500 dark:focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none"
                                                value={formData.diastolic}
                                                onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                                            />
                                            <p className="text-[9px] text-center font-bold text-slate-400 dark:text-slate-600 uppercase">Resting Pulse</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="flex items-center gap-3 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase">
                                        <LuDroplets className="text-sky-500" size={18} /> Serum Glucose (mg/dL)
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            required type="number" placeholder="CONCENTRATION LEVEL"
                                            className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 font-mono focus:border-sky-500 dark:focus:border-sky-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 outline-none"
                                            value={formData.glucose}
                                            onChange={(e) => setFormData({ ...formData, glucose: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, is_fasting: !formData.is_fasting })}
                                            className={`px-8 py-5 rounded-2xl text-[10px] font-black uppercase transition-all ${formData.is_fasting ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                                        >
                                            {formData.is_fasting ? 'Fasting Active' : 'Set Fasting State'}
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {message && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className={`p-5 rounded-2xl flex items-center gap-3 text-[11px] font-black uppercase ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border border-rose-500/20'}`}>
                                            {message.type === 'success' ? <LuCircleCheck size={18} /> : <LuCircleAlert size={18} />}
                                            {message.text}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    disabled={loading}
                                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black py-6 rounded-[1.5rem] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all flex items-center justify-center gap-3 uppercase text-xs shadow-2xl shadow-sky-900/10 dark:shadow-white/5"
                                >
                                    {loading ? "Processing Clinical Data..." : "Compute Health Analysis"}
                                    <LuChevronRight size={18} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
                            <div className="relative z-10 space-y-8">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black uppercase italic">Diagnostic Standards</h3>
                                    <p className="text-sky-100/60 text-[10px] font-bold uppercase">WHO Clinical Protocols</p>
                                </div>
                                <div className="space-y-4">
                                    <MetricRow label="Hypertension" value="> 130/80" />
                                    <MetricRow label="Normal Glucose" value="70 - 99" />
                                    <MetricRow label="Diabetic Risk" value="> 126" />
                                </div>
                            </div>
                            <LuActivity className="absolute -bottom-10 -right-10 text-white/10 w-64 h-64 rotate-12" />
                        </div>

                        <div className="flex-1 bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/50 rounded-[3rem] p-10 border-dashed flex flex-col items-center justify-center text-center space-y-4">
                            <LuInfo className="text-slate-400 dark:text-slate-700" size={32} />
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase leading-relaxed">
                                Results are generated via <br /> <span className="text-slate-900 dark:text-slate-300">Ensemble Gradient Boosting</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="space-y-10">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
                        <div className="flex items-center gap-4">
                            <LuHistory size={20} className="text-sky-500" />
                            <h2 className="text-2xl font-black uppercase">Clinical Logbook</h2>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase">{history.length} RECORDS SYNCED</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.length > 0 ? history.map((log, index) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                key={index}
                                className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:border-sky-500/50 dark:hover:border-slate-700 transition-all group shadow-sm dark:shadow-none"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">Log Timestamp</span>
                                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase italic">
                                            {new Date(log.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${log.blood_pressure.status === 'Normal' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-rose-500/10 text-rose-600 dark:text-rose-500'}`}>
                                        {log.blood_pressure.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/50 group-hover:border-sky-500/30 transition-colors">
                                        <span className="block text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase mb-2">Pressure</span>
                                        <span className="text-xl font-mono font-black">
                                            {log.blood_pressure.systolic}<span className="text-slate-300 dark:text-slate-600">/</span>{log.blood_pressure.diastolic}
                                        </span>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/50 group-hover:border-sky-500/30 transition-colors">
                                        <span className="block text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase mb-2">Glucose</span>
                                        <span className="text-xl font-mono font-black">
                                            {log.diabetes.glucose}<span className="text-sky-500 text-[10px] ml-1">MG</span>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
                                <p className="text-slate-400 dark:text-slate-600 text-xs font-black uppercase italic">Database Empty • Awaiting Synchronization</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
        <span className="text-[10px] font-black uppercase opacity-70">{label}</span>
        <span className="font-mono text-sm font-bold bg-white/10 px-3 py-1 rounded-lg">{value}</span>
    </div>
);

export default VitalsCheck;