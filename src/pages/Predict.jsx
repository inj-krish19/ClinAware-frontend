import React, { useState } from "react";
import axios from "axios";
// Switched to LuShield to ensure better compatibility across versions
import { LuCalculator, LuUser, LuBaby, LuActivity, LuInfo, LuLoader, LuShield } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

export default function Predict() {
    const [form, setForm] = useState({
        age: "",
        bmi: "",
        children: "0",
        sex: "male",
        smoker: "no",
        region: "southwest"
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Properly format the data
        const formattedData = {
            ...form,
            age: Number(form.age),
            bmi: Number(form.bmi),
            children: Number(form.children),
        };

        try {
            // 2. FIXED: Sending formattedData instead of the raw form state
            const res = await axios.post(`${BACKEND_URL}/predict`, formattedData, {
                headers: { "Content-Type": "application/json" },
            });
            setResult(res.data);
        } catch (err) {
            console.error("Prediction failed:", err);
            setError(`Unable to fetch predictions. Issue at our side.\n${err}`,);
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
            // alert("Submission failed. Ensure your Flask server is running at " + BACKEND_URL);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 transition-colors duration-500">
            <div className="max-w-4xl mx-auto">

                <div className="flex flex-col items-center text-center mb-12">
                    <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mb-4">
                        <LuCalculator size={32} />
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                        Insurance <span className="text-sky-500">Cost Intelligence</span>
                    </h2>
                </div>

                <div className="flex flex-col min-h-[60px] justify-center mb-3">
                    {error && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex justify-center items-center gap-3 px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400">

                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                            <p className="text-sm font-bold tracking-tight">{error}</p>
                            <button onClick={() => setError("")} className="ml-auto hover:opacity-60 transition-opacity" >
                                <RxCross2 className="text-xs uppercase font-black size-4" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800"
                    >
                        {/* Age */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                <LuUser size={16} /> Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                required
                                value={form.age}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white"
                            />
                        </div>

                        {/* BMI */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                <LuActivity size={16} /> BMI
                            </label>
                            <input type="number" step="0.1" name="bmi" required value={form.bmi} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white" />
                        </div>

                        {/* Children */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                                <LuBaby size={16} /> Children
                            </label>
                            <input
                                type="number"
                                name="children"
                                value={form.children}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white"
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Sex</label>
                            <select name="sex" value={form.sex} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Smoker Status</label>
                            <select name="smoker" value={form.smoker} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white">
                                <option value="no">Non-Smoker</option>
                                <option value="yes">Smoker</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Region</label>
                            <select name="region" value={form.region} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white">
                                <option value="southwest">Southwest</option>
                                <option value="southeast">Southeast</option>
                                <option value="northwest">Northwest</option>
                                <option value="northeast">Northeast</option>
                            </select>
                        </div>

                        <button
                            disabled={loading}
                            className="md:col-span-2 mt-4 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-400 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-sky-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            {loading ? <LuLoader className="animate-spin" /> : "Generate Prediction"}
                        </button>
                    </form>

                    {/* Result Sidebar */}
                    <div className="lg:col-span-2 space-y-6">

                        {loading && (
                            <div className="flex flex-col h-full items-center justify-center py-10 animate-in fade-in zoom-in duration-500">
                                <div className="relative">

                                    <div className="absolute inset-0 rounded-full bg-sky-400/20 dark:bg-sky-500/10 animate-ping" />
                                    <div className="absolute inset-0 rounded-full bg-emerald-400/10 dark:bg-emerald-500/5 animate-pulse delay-75" />

                                    <div className="relative w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-center overflow-hidden">

                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />

                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.4s]" />
                                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.2s]" />
                                                <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce " />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-2">
                                                Analyzing
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Text */}
                                <div className="mt-6 text-center space-y-1">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                        Running Neural Inference...
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 animate-pulse">
                                        Consulting ClinAware Models
                                    </p>
                                </div>
                            </div>
                        )}

                        {!result && !loading &&
                            < div className="h-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                                <LuInfo size={40} className="mb-4 opacity-20" />
                                <p className="font-medium italic">Pending Input...</p>
                            </div>
                        }

                        {result && !loading &&
                            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 p-8 rounded-3xl">
                                <h3 className="text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4">Results </h3>
                                <div className="space-y-6">
                                    {result.cost.regressor && <div>
                                        <p className="text-slate-600 dark:text-emerald-300/70 text-sm">Regressor Prediction (Trusted)</p>
                                        <p className="text-4xl font-black text-emerald-700 dark:text-emerald-400">
                                            {result.cost.regressor.toFixed(2)}
                                            <span className="text-lg"> INR/month</span>
                                        </p>
                                    </div>}
                                    {result.cost.model && <div>
                                        <p className="text-slate-600 dark:text-emerald-300/70 text-sm">Model Prediction (Beta)</p>
                                        <p className="text-4xl font-black text-emerald-700 dark:text-emerald-400">
                                            {result.cost.model.toFixed(2)}
                                            <span className="text-lg"> INR/month</span>
                                        </p>
                                    </div>}
                                    {result.cost.nn && <div>
                                        <p className="text-slate-600 dark:text-emerald-300/70 text-sm">Neural Network Prediction (Alpha)</p>
                                        <p className="text-4xl font-black text-emerald-700 dark:text-emerald-400">
                                            {result.cost.nn.toFixed(2)}
                                            <span className="text-lg"> INR/month</span>
                                        </p>
                                    </div>}
                                    <div className="bg-white/50 dark:bg-emerald-900/20 p-4 rounded-2xl flex items-center gap-3 mt-3">
                                        <LuShield className="text-emerald-600 shrink-0 " />
                                        <p className="text-xs text-emerald-900/70 dark:text-emerald-400/70">
                                            Estimation based on Kaggle and Open source available dataset.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div >
    );
}
