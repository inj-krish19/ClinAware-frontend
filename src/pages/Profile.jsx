import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuUser, LuActivity, LuSave, LuDna, LuLoader,
    LuCircleCheck, LuTriangleAlert, LuCircleX, LuInfo, LuCalendar
} from 'react-icons/lu';
import { BACKEND_URL } from '../context/constants';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [profile, setProfile] = useState({
        name: '', email: '', dob: '', weight: 0, height: 0, chronic_condition: '', blood_group: 'O+'
    });

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showToast = useCallback((message, type = 'info') => {
        const icons = {
            success: <LuCircleCheck className="text-emerald-500" />,
            error: <LuCircleX className="text-rose-500" />,
            warning: <LuTriangleAlert className="text-amber-500" />,
            info: <LuInfo className="text-sky-500" />
        };
        setNotification({ message, type, icon: icons[type] });
    }, []);

    useEffect(() => { fetchProfile(); }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/user/profile`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const res = await response.json();
            if (res.code === 200) setProfile(res.data);
        } catch (err) {
            showToast("Vault Retrieval Failed", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setUpdating(true);
        try {
            const response = await fetch(`${BACKEND_URL}/user/update`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(profile)
            });
            const res = await response.json();
            if (res.code === 200) showToast("Identity Sync Complete", "success");
            else showToast(res.message || "Encryption error", "warning");
        } catch (err) {
            showToast("Cloud Synchronization Failed", "error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-[#020617] transition-colors duration-500">
            <div className="flex flex-col items-center gap-6">
                <div className="relative size-20 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-sky-500/10 dark:border-sky-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-sky-500 rounded-full animate-spin" />
                    <LuDna className="text-sky-500 animate-pulse" size={32} />
                </div>
                <p className="font-black text-sky-500 uppercase text-[10px] tracking-widest">ClinAware Secure Boot</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-6 lg:p-12 font-sans selection:bg-sky-500/30 relative overflow-hidden transition-colors duration-500">

            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-10 left-1/2 z-[100] w-full max-w-md px-4"
                    >
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-5 rounded-[2rem] shadow-2xl flex items-center gap-4">
                            <div className="text-2xl">{notification.icon}</div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500">Clinical Protocol</span>
                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{notification.message}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-[3rem] backdrop-blur-md gap-6 shadow-sm dark:shadow-none"
                >
                    <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
                        <div className="size-16 rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-sky-500/20">
                            <LuUser className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">{profile.name || 'User Identity'}</h1>
                            <p className="text-slate-500 text-sm font-black uppercase tracking-tighter">Health Management Profile</p>
                        </div>
                    </div>
                    <button
                        onClick={handleUpdate}
                        disabled={updating}
                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-8 py-4 rounded-2xl font-black text-[11px] uppercase transition-all hover:bg-sky-500 dark:hover:bg-sky-400 disabled:opacity-50 active:scale-95 shadow-xl shadow-sky-500/10"
                    >
                        {updating ? <LuLoader className="animate-spin" /> : <LuSave size={18} />}
                        {updating ? "Syncing..." : "Save Data"}
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Identity & Biometrics */}
                    <div className="lg:col-span-8 space-y-10">
                        <section className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 p-10 rounded-[3rem] space-y-8 relative overflow-hidden shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-3 text-sky-600 dark:text-sky-500">
                                <LuActivity size={20} />
                                <h2 className="font-black text-[11px] uppercase tracking-widest">Bio-Identity Core</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1">Full Legal Name</label>
                                    <input
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm font-bold outline-none focus:border-sky-500 transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase ml-1">Secure Email (Locked)</label>
                                    <input value={profile.email} disabled className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/30 text-slate-400 dark:text-slate-700 rounded-2xl p-5 text-sm font-bold cursor-not-allowed italic" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1">
                                        <LuCalendar size={14} className="text-emerald-500" /> Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={profile.dob}
                                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm font-bold outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white color-scheme-light dark:color-scheme-dark"
                                    />
                                </div>
                                {['height', 'weight'].map((key) => (
                                    <div key={key} className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1">
                                            {key} <span className="text-slate-300 dark:text-slate-700 font-mono italic">({key === 'weight' ? 'KG' : 'CM'})</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={profile[key]}
                                            onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm font-bold outline-none focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Context */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-[#0f172a] p-10 rounded-[3.5rem] shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/5 space-y-10 relative overflow-hidden group">
                            <LuDna className="absolute -top-10 -right-10 text-sky-500/5 size-40 group-hover:rotate-12 transition-transform duration-700" />

                            <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400 relative z-10">
                                <LuDna size={22} className="animate-pulse" />
                                <h2 className="font-black text-[11px] uppercase tracking-widest">Clinical Context</h2>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1">Blood Type</label>
                                    <div className="relative group">
                                        <select
                                            value={profile.blood_group}
                                            onChange={(e) => setProfile({ ...profile, blood_group: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm font-black text-slate-900 dark:text-white outline-none focus:border-sky-500 transition-all appearance-none cursor-pointer"
                                        >
                                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-600 group-hover:text-sky-500 transition-colors italic text-[10px] font-black">SELECT</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-1">Chronic Pathologies</label>
                                    <textarea
                                        value={profile.chronic_condition}
                                        onChange={(e) => setProfile({ ...profile, chronic_condition: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 text-xs font-medium h-56 outline-none resize-none focus:border-rose-500/50 transition-all text-slate-700 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-800 font-poppins"
                                        placeholder="Enter clinical conditions, allergies, or genetic history..."
                                    />
                                </div>
                            </div>

                            <div className="pt-4 text-center">
                                <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase italic leading-relaxed">
                                    End-to-End Encrypted <br /> Secure Clinical Database
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;