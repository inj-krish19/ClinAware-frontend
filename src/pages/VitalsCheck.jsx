import React, { useState, useEffect } from 'react';
import {
    LuActivity, LuHeart, LuDroplets, LuInfo,
    LuHistory, LuCircleCheck, LuCircleAlert
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

    // Fetch history on mount
    useEffect(() => {
        fetchHistory();
    }, []);

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

        // Simple mock classification logic (usually handled by backend ML)
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
                setMessage({ type: 'success', text: result.message });
                fetchHistory(); // Refresh list
            } else {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Connection to clinical server failed." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] p-6 font-sans">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold font-jakarta text-slate-900 dark:text-white">
                        Vitals Intelligence
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Binary classification for hypertension and diabetic risk markers.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Input Form Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <form onSubmit={handleAnalyze} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
                            <div className="space-y-8">

                                {/* BP Section */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <LuHeart className="text-red-500" /> Blood Pressure (mmHg)
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            required
                                            type="number"
                                            placeholder="Systolic"
                                            className="bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-center font-mono focus:ring-2 focus:ring-sky-500 transition-all text-slate-900 dark:text-white"
                                            value={formData.systolic}
                                            onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                                        />
                                        <input
                                            required
                                            type="number"
                                            placeholder="Diastolic"
                                            className="bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-center font-mono focus:ring-2 focus:ring-sky-500 transition-all text-slate-900 dark:text-white"
                                            value={formData.diastolic}
                                            onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Glucose Section */}
                                <div className="space-y-4">
                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                        <LuDroplets className="text-sky-500" /> Blood Glucose (mg/dL)
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            required
                                            type="number"
                                            placeholder="Enter glucose level"
                                            className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-mono focus:ring-2 focus:ring-sky-500 transition-all text-slate-900 dark:text-white"
                                            value={formData.glucose}
                                            onChange={(e) => setFormData({ ...formData, glucose: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, is_fasting: !formData.is_fasting })}
                                            className={`px-6 py-4 rounded-2xl text-xs font-black transition-all ${formData.is_fasting ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                                        >
                                            {formData.is_fasting ? 'Fasting Active' : 'Set Fasting'}
                                        </button>
                                    </div>
                                </div>

                                {message && (
                                    <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                                        {message.type === 'success' ? <LuCircleCheck /> : <LuCircleAlert />}
                                        {message.text}
                                    </div>
                                )}

                                <button
                                    disabled={loading}
                                    className="w-full bg-slate-900 dark:bg-sky-600 text-white font-black py-4 rounded-2xl hover:bg-sky-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? "Analyzing..." : "Sync Vitals Data"} <LuActivity size={18} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Stats/Information Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-sky-600 text-white rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl">
                            <div className="relative z-10 space-y-4">
                                <h3 className="text-xl font-jakarta font-bold">Clinical Analysis</h3>
                                <p className="text-sky-100 text-sm leading-relaxed">
                                    Our ML model uses standard medical thresholds:
                                </p>
                                <ul className="space-y-3 text-xs font-medium">
                                    <li className="flex justify-between py-2 border-b border-sky-400/30">
                                        <span>Hypertension Range</span>
                                        <span className="font-mono">{'>'} 130/80</span>
                                    </li>
                                    <li className="flex justify-between py-2 border-b border-sky-400/30">
                                        <span>Diabetic Range</span>
                                        <span className="font-mono">{'>'} 126 mg/dL</span>
                                    </li>
                                </ul>
                            </div>
                            <LuHeart className="absolute -bottom-10 -right-10 text-sky-500/20 w-48 h-48" />
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-slate-800 dark:text-slate-200">
                        <LuHistory size={24} className="text-sky-500" />
                        <h2 className="text-xl font-bold font-jakarta">Recent Activity</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {history.length > 0 ? history.map((log, index) => (
                            <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                                        {new Date(log.timestamp).toLocaleDateString()}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.blood_pressure.status === 'Normal' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {log.blood_pressure.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-xs text-slate-500">Pressure</span>
                                        <span className="text-lg font-mono font-bold dark:text-white">
                                            {log.blood_pressure.systolic}/{log.blood_pressure.diastolic}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-500">Glucose</span>
                                        <span className="text-lg font-mono font-bold dark:text-white">
                                            {log.diabetes.glucose} <span className="text-[10px]">mg/dL</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                                <p className="text-slate-500 text-sm">No clinical logs found. Start your first analysis above.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VitalsCheck;