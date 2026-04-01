import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuCalculator, LuUser, LuBaby, LuActivity, LuInfo, LuLoader, LuShield, LuFingerprint } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { BACKEND_URL } from '../context/constants';

export default function Predict() {

    const [form, setForm] = useState({
        name: "",
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        if (!form.name.trim()) return "Please enter the patient's name.";
        if (Number(form.age) <= 0 || Number(form.age) > 120) return "Please enter a valid age (1-120).";
        if (Number(form.bmi) < 10 || Number(form.bmi) > 60) return "Please enter a realistic BMI (10-60).";
        if (Number(form.children) < 0) return "Children count cannot be negative.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError("");

        const formattedData = {
            ...form,
            age: Number(form.age),
            bmi: Number(form.bmi),
            children: Number(form.children),
        };

        try {
            console.log(formattedData)
            const res = await fetch(`${BACKEND_URL}/predict`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formattedData),
                credentials: "include"
            });
            let response = await res.json()
            setResult(response);
        } catch (err) {
            console.log(err);
            setError(`Please wait a moment till insights are generated`);
        } finally {
            setTimeout(() => setLoading(false), 1500);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] py-16 px-4 transition-colors duration-500">
            <div className="max-w-5xl mx-auto">

                <div className="flex flex-col items-center text-center mb-10">
                    <div className="w-16 h-16 bg-sky-500/10 text-sky-500 rounded-2xl flex items-center justify-center mb-4 border border-sky-500/20">
                        <LuCalculator size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
                        Insurance <span className="text-sky-500">Cost Intelligence</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">Precision financial forecasting using Machine Learning</p>
                </div>

                <div className="min-h-[50px] mb-4">
                    {error && (
                        <div className="flex justify-center items-center gap-3 px-4 py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 max-w-2xl mx-auto">
                            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                            <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
                            <button onClick={() => setError("")} className="ml-auto hover:opacity-60 transition-opacity">
                                <RxCross2 className="size-4" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800"
                    >
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="flex items-center gap-2 text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase">
                                <LuFingerprint size={14} /> Full Name / Patient ID
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="e.g., Kavan"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase">
                                <LuUser size={14} /> Age
                            </label>
                            <input type="number" name="age" required placeholder="25" value={form.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white transition-all" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase">
                                <LuActivity size={14} /> BMI
                            </label>
                            <input type="number" step="0.1" name="bmi" required placeholder="22.5" value={form.bmi} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white transition-all" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase">
                                <LuBaby size={14} /> Children
                            </label>
                            <input type="number" name="children" value={form.children} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white transition-all" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase">Sex</label>
                            <select name="sex" value={form.sex} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white transition-all">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase">Smoker Status</label>
                            <select name="smoker" value={form.smoker} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent outline-none dark:text-white transition-all ${form.smoker === 'yes' ? 'focus:border-rose-500' : 'focus:border-emerald-500'}`}>
                                <option value="no">Non-Smoker</option>
                                <option value="yes">Smoker</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase">Region</label>
                            <select name="region" value={form.region} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white transition-all">
                                <option value="southwest">Southwest</option>
                                <option value="southeast">Southeast</option>
                                <option value="northwest">Northwest</option>
                                <option value="northeast">Northeast</option>
                            </select>
                        </div>

                        <button
                            disabled={loading}
                            className="md:col-span-2 mt-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            {loading ? <LuLoader className="animate-spin" /> : "Run Analysis"}
                        </button>
                    </form>

                    <div className="lg:col-span-2 space-y-6 sticky top-8">
                        {loading && (
                            /* Keeping your specific animation logic intact */
                            <div className="flex flex-col h-full items-center justify-center py-12 animate-in fade-in zoom-in duration-500 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />
                                    <div className="relative w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.4s]" />
                                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.2s]" />
                                                <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce " />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Neural Inference...</p>
                                </div>
                            </div>
                        )}

                        {!result && !loading && (
                            <div className="h-[450px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center text-slate-400">
                                <LuInfo size={40} className="mb-4 opacity-20" />
                                <p className="font-bold text-xs uppercase tracking-widest">Awaiting Patient Data</p>
                                <p className="text-[10px] mt-2 max-w-[150px]">Fill in the details to generate a cost estimation.</p>
                            </div>
                        )}

                        {result && !loading && (
                            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-8 rounded-[2rem] animate-in slide-in-from-right-4 duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-emerald-800 dark:text-emerald-400 font-black text-[10px] uppercase tracking-widest">Medical Report for</h3>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white capitalize">{form.name}</p>
                                    </div>
                                    <LuShield className="text-emerald-500" size={24} />
                                </div>

                                <div className="space-y-6">
                                    {result.cost.regressor && (
                                        <div className="p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-emerald-200/50">
                                            <p className="text-slate-500 dark:text-emerald-300/70 text-[10px] font-black uppercase">Standard Premium</p>
                                            <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">
                                                ₹{result.cost.regressor.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                <span className="text-xs font-bold text-slate-400"> /mo</span>
                                            </p>
                                        </div>
                                    )}

                                    {(result.cost.model || result.cost.nn) && (
                                        <div className="grid grid-cols-2 gap-3">
                                            {result.cost.model && (
                                                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase">Beta Model (LR)</p>
                                                    <p className="text-sm font-bold dark:text-white">₹{result.cost.model.toFixed(0)}</p>
                                                </div>
                                            )}
                                            {result.cost.nn && (
                                                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase">Alpha Model (NN)</p>
                                                    <p className="text-sm font-bold dark:text-white">₹{result.cost.nn.toFixed(0)}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-emerald-100 dark:border-emerald-900/50">
                                        <div className="flex items-start gap-3">
                                            <LuInfo className="text-emerald-600 shrink-0 mt-0.5" size={14} />
                                            <p className="text-[10px] text-emerald-900/70 dark:text-emerald-400/70 leading-relaxed font-medium">
                                                This is an estimation based on Kaggle healthcare datasets. Actual premiums may vary based on clinical underwriting.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
