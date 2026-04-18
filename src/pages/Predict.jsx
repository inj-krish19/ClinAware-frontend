import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCalculator, LuUser, LuBaby, LuActivity, LuInfo, LuLoader, LuShield, LuFingerprint, LuWallet, LuTriangleAlert, LuCircleCheck } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { BACKEND_URL } from '../context/constants';
import InsuranceMarket from "../components/InsuranceMarket";

export default function Predict() {
    const [form, setForm] = useState({
        name: "", age: "", bmi: "", income: "", children: "0",
        sex: "male", chronic_condition: "no", region: "southwest"
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submittedName, setSubmittedName] = useState("");
    const [showBmiCalc, setShowBmiCalc] = useState(false);
    const [isBmiHighlighted, setIsBmiHighlighted] = useState(false);

    // BMI Modal Local State
    const [bmiInput, setBmiInput] = useState({ height: "", weight: "" });
    const [tempBmi, setTempBmi] = useState(null);
    const [bmiApplying, setBmiApplying] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Validation Logic
    const validate = () => {
        if (!form.name.trim()) return "Patient Name is required.";
        if (Number(form.age) <= 0 || Number(form.age) > 110) return "Provide a valid age (1-110).";
        if (Number(form.bmi) <= 5 || Number(form.bmi) > 70) return "BMI must be within clinical range.";
        if (Number(form.income) < 0) return "Monthly income cannot be negative.";
        if (Number(form.children) < 0) return "Dependents cannot be negative.";
        return null;
    };

    const handleApplyBmi = () => {
        const h = parseFloat(bmiInput.height) / 100;
        const w = parseFloat(bmiInput.weight);
        if (h > 0 && w > 0) {
            const calculated = (w / (h * h)).toFixed(1);
            setTempBmi(calculated);
            setBmiApplying(true);

            // Show result for 1.2s then close and highlight
            setTimeout(() => {
                setForm(prev => ({ ...prev, bmi: calculated }));
                setShowBmiCalc(false);
                setBmiApplying(false);
                setTempBmi(null);
                setIsBmiHighlighted(true);
                setTimeout(() => setIsBmiHighlighted(false), 2000);
            }, 1200);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${BACKEND_URL}/predict`, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    smoker: form.chronic_condition,
                    age: Number(form.age),
                    bmi: Number(form.bmi),
                    children: Number(form.children)
                }),
                credentials: "include"
            });
            let response = await res.json();
            setResult(response);
            setSubmittedName(form.name);
        } catch (err) {
            setError("Communication failure with prediction engine.");
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] py-24 px-4 font-sans transition-colors">
            <div className="max-w-6xl mx-auto">

                <header className="flex flex-col items-center text-center mb-12">
                    <div className="p-3 bg-sky-500/10 text-sky-500 rounded-2xl mb-4 border border-sky-500/20">
                        <LuCalculator size={28} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white capitalize tracking-tighter">
                        Medical <span className="text-sky-500">Cost Insurance</span> Prediction
                    </h1>
                </header>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">

                        <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Patient Identity</label>
                            <div className="relative">
                                <LuFingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full pl-11 pr-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold transition-all" placeholder="Enter Full Name" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Age</label>
                            <input type="number" name="age" value={form.age} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Monthly Income (₹)</label>
                            <input type="number" name="income" value={form.income} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold" />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">BMI</label>
                                <button type="button" onClick={() => setShowBmiCalc(true)} className="text-[9px] font-black text-sky-500 uppercase hover:text-sky-600 underline underline-offset-2">Calculate BMI</button>
                            </div>
                            <motion.input
                                animate={isBmiHighlighted ? { scale: [1, 1.02, 1], borderColor: ["#f1f5f9", "#10b981", "#f1f5f9"] } : {}}
                                type="number" step="0.1" name="bmi" value={form.bmi} onChange={handleChange}
                                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 outline-none dark:text-white font-bold transition-colors ${isBmiHighlighted ? 'border-emerald-500' : 'border-transparent focus:border-sky-500'}`}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Dependents</label>
                            <input type="number" name="children" value={form.children} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Sex</label>
                            <select name="sex" value={form.sex} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold cursor-pointer">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Region</label>
                            <select name="region" value={form.region} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold cursor-pointer">
                                <option value="southwest">Southwest</option>
                                <option value="southeast">Southeast</option>
                                <option value="northwest">Northwest</option>
                                <option value="northeast">Northeast</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-2">
                            <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1">Critical Risk History</label>
                            <select name="chronic_condition" value={form.chronic_condition} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-transparent focus:border-rose-500 outline-none dark:text-white font-bold cursor-pointer">
                                <option value="no">No Severe Conditions</option>
                                <option value="yes">Chronic History (Cancer/Diabetes/Lung)</option>
                            </select>
                        </div>

                        {error && <p className="md:col-span-2 text-rose-500 text-[10px] font-black uppercase text-center tracking-widest">{error}</p>}

                        <button disabled={loading} className="md:col-span-2 mt-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs shadow-lg shadow-sky-500/20 active:scale-95">
                            {loading ? <LuLoader className="animate-spin" size={20} /> : "Run Neural Prediction"}
                        </button>
                    </form>

                    {/* Output Panel */}
                    <div className="lg:col-span-5 h-full">
                        <AnimatePresence mode="wait">
                            {result && !loading ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-8 md:p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
                                >
                                    {/* Header info */}
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Insurance Recommedations for</p>
                                            <h4 className="text-3xl font-black uppercase tracking-tighter">{submittedName}</h4>
                                        </div>
                                        <LuShield size={32} className="opacity-40" />
                                    </div>

                                    {/* Primary Prediction (Random Forest / Trusted) */}
                                    <div className="bg-emerald-400/50 backdrop-blur-md rounded-[2rem] p-7 border border-white/20 mb-6 shadow-inner">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Trusted Prediction (Regressor)</p>
                                            <span className="bg-emerald-400/20 text-[8px] font-black px-2 py-0.5 rounded-full border border-emerald-400/30">PRIMARY</span>
                                        </div>
                                        <p className="text-5xl font-black ">
                                            ₹{result.cost.regressor.toLocaleString('en-IN')}
                                            <span className="text-lg opacity-60 font-medium ml-1">/ month</span>
                                        </p>
                                    </div>

                                    {/* Comparative Models (Alpha & Beta) */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-sky-400/50 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                                            <p className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Alpha Model (LR)</p>
                                            <p className="text-xl font-bold">₹{result.cost.model.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="bg-purple-400/50 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                                            <p className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-1">Beta Model (NN)</p>
                                            <p className="text-xl font-bold">{result.cost.nn ? "₹" + result.cost.nn.toLocaleString('en-IN') : "Under Maintenance"}</p>
                                        </div>
                                    </div>

                                    {/* Conditional High Risk Alert */}
                                    {form.chronic_condition === "yes" && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-4 bg-rose-500/20 border border-rose-500/30 rounded-2xl flex gap-3 items-center"
                                        >
                                            <LuTriangleAlert className="text-rose-200 shrink-0" size={18} />
                                            <p className="text-[10px] font-medium leading-tight">
                                                <span className="font-black uppercase block mb-0.5">Underwriting Warning</span>
                                                High Risk profile detected. Insurance providers may mandate manual clinical review or reject coverage.
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Subtle Decorative Background Element */}
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[450px] border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center text-slate-300">
                                    <div className="relative mb-6">
                                        <LuInfo size={48} className="opacity-10" />
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-dashed border-sky-500/20 rounded-full scale-150"
                                        />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Inference Pending</p>
                                    <p className="text-[9px] mt-2 opacity-40 max-w-[180px]">Fill in patient metrics to begin multi-model cross-validation.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* BMI Modal */}
            <AnimatePresence>
                {showBmiCalc && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !bmiApplying && setShowBmiCalc(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800">

                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">BMI <span className="text-sky-500">Analysis</span></h3>
                                {!bmiApplying && <button onClick={() => setShowBmiCalc(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"><RxCross2 size={18} /></button>}
                            </div>

                            <div className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase">Age</label>
                                        <input type="number" name="age" value={form.age} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none dark:text-white font-bold border border-transparent focus:border-sky-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-400 uppercase">Sex</label>
                                        <select name="sex" value={form.sex} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none dark:text-white font-bold">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-500 uppercase">Height (cm)</label>
                                        <input type="number" value={bmiInput.height} onChange={(e) => setBmiInput({ ...bmiInput, height: e.target.value })} className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold" placeholder="175" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black text-slate-500 uppercase">Weight (kg)</label>
                                        <input type="number" value={bmiInput.weight} onChange={(e) => setBmiInput({ ...bmiInput, weight: e.target.value })} className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-sky-500 outline-none dark:text-white font-bold" placeholder="70" />
                                    </div>
                                </div>

                                <button onClick={handleApplyBmi} disabled={bmiApplying} className="w-full bg-slate-900 dark:bg-sky-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] transition-all overflow-hidden relative">
                                    {bmiApplying ? (
                                        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-2">
                                            <LuCircleCheck /> Calculated: {tempBmi}
                                        </motion.div>
                                    ) : "Apply to Profile"}
                                </button>

                                <footer className="pt-4 flex gap-2 text-slate-400 border-t border-slate-100 dark:border-slate-800">
                                    <LuInfo size={12} className="shrink-0 mt-0.5" />
                                    <p className="text-[8px] font-medium leading-relaxed italic uppercase tracking-wider">
                                        Privacy Alert: Physical dimension data (H/W) is processed locally and **not persisted** in our core database.
                                    </p>
                                </footer>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {result && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {/* Pass the regressor cost to the market component */}
                        <InsuranceMarket aiPredictedMonthly={result.cost.regressor} />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
