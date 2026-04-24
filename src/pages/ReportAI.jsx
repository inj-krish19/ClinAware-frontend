import React, { useState, useEffect } from 'react';
import { LuFileUp, LuBrain, LuShieldCheck, LuTriangleAlert, LuHistory, LuActivity, LuInfo, LuCircleCheck } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { BACKEND_URL } from '../context/constants';

const ReportAI = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    // Fetch history on mount
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/report-ai/history`, { credentials: "include" });
            const res = await response.json();
            if (res.code === 200) setHistory(res.data);
        } catch (err) {
            console.error("History fetch failed");
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setAnalyzing(true);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${BACKEND_URL}/report-ai/upload`, {
                method: 'POST',
                body: formData,
                credentials: "include"
            });
            const res = await response.json();
            if (res.code === 201) {
                setResult(res.data);
                fetchHistory(); // Refresh history after new upload
            }
        } catch (err) {
            console.error("Analysis failed");
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-4 md:p-8 font-poppins">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COL: Control & Upload (5 Cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sky-500 font-bold text-sm   uppercase">
                            <LuBrain className="animate-pulse" /> Neural Diagnostic Engine
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase  ">
                            Report <span className="text-sky-500">AI</span>
                        </h1>
                    </div>

                    {/* Report Compatibility Guide */}
                    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-5 rounded-[2rem] space-y-4">
                        <h3 className="text-sm font-bold flex items-center gap-2 dark:text-slate-200">
                            <LuInfo size={16} className="text-sky-500" /> System Compatibility
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {['Blood Work', 'Diabetes', 'Lipid Profile', 'Full Vital Check'].map((type) => (
                                <div key={type} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">
                                    <LuCircleCheck className="text-sky-500" /> {type}
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed italic">
                            *Optimized for PDF and high-res scan interpretation. Avoid handwritten prescriptions.
                        </p>
                    </div>

                    {/* Upload Box */}
                    <div className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] p-10 flex flex-col items-center justify-center space-y-4 hover:border-sky-500/50 transition-all group">
                            <div className="bg-sky-50 dark:bg-sky-500/10 p-4 rounded-full group-hover:scale-110 transition-transform">
                                <LuFileUp size={32} className="text-sky-500" />
                            </div>
                            <input type="file" className="hidden" id="report-upload" onChange={(e) => setFile(e.target.files[0])} />
                            <label htmlFor="report-upload" className="cursor-pointer text-slate-600 dark:text-slate-300 text-sm font-bold hover:text-sky-500">
                                {file ? file.name : "Drop Medical Report Here"}
                            </label>
                            <button
                                onClick={handleUpload}
                                disabled={!file || analyzing}
                                className="w-full bg-slate-900 dark:bg-sky-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-sky-500 transition-all disabled:opacity-30"
                            >
                                {analyzing ? "Synthesizing Data..." : "Generate Insights"}
                            </button>
                        </div>
                    </div>

                    {/* History Toggle */}
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-sm font-bold dark:text-white"
                    >
                        <span className="flex items-center gap-2"><LuHistory /> Analysis History</span>
                        <span className="bg-sky-500 text-white px-2 py-0.5 rounded-lg text-[10px]">{history.length}</span>
                    </button>
                </div>

                {/* RIGHT COL: Output & History (7 Cols) */}
                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        {showHistory ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                <h2 className="text-xl font-bold dark:text-white flex items-center gap-2"><LuHistory /> Past Interpretations</h2>
                                {history.map((item, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-sm dark:text-white">{item.filename}</p>
                                            <p className="text-[10px] text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</p>
                                        </div>
                                        <button onClick={() => { setResult(item.analysis); setShowHistory(false); }} className="text-sky-500 text-xs font-bold">View Result</button>
                                    </div>
                                ))}
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-sky-500/20 relative overflow-hidden transition-colors duration-300"
                            >
                                {/* Background Icon - Adjusted opacity for light mode */}
                                <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-10 pointer-events-none">
                                    <LuBrain size={120} className="text-sky-500" />
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <div className="flex flex-wrap justify-between items-start gap-4">
                                        <div className="bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 px-4 py-1 rounded-full text-[10px] font-black uppercase border border-sky-500/20 dark:border-sky-500/30">
                                            Clinical Grade Summary
                                        </div>
                                        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${result.risk_index === 'High'
                                            ? 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/20 dark:border-red-500/30'
                                            : 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30'
                                            }`}>
                                            Risk: {result.risk_index}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-black leading-tight uppercase">Patient Report Synthesis</h2>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                                            {result.summary}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {result.markers?.map((m, i) => (
                                            <div key={i} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-2xl flex flex-col justify-between transition-colors">
                                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase  r">{m.name}</span>
                                                <div className="flex justify-between items-end mt-2">
                                                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{m.value}</span>
                                                    <span className={`text-[10px] font-black uppercase ${m.status === 'High' ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'
                                                        }`}>
                                                        ● {m.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 space-y-4">
                                <LuActivity size={48} className="opacity-20" />
                                <p className="text-sm font-medium">Await Neural Analysis Output</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ReportAI;