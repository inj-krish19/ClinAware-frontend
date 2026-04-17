import React, { useState, useEffect, useCallback } from 'react';
import {
    LuUser, LuActivity, LuSave, LuDna, LuLoader,
    LuCircleCheck, LuTriangleAlert, LuCircleX, LuInfo
} from 'react-icons/lu';
import { BACKEND_URL } from '../context/constants';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [profile, setProfile] = useState({
        name: '', email: '', age: 0, weight: 0, height: 0, chronic_condition: '', blood_group: 'O+'
    });

    // Custom Notification State
    const [notification, setNotification] = useState(null);

    // Auto-hide notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const showToast = useCallback((message, type = 'info') => {
        const icons = {
            success: <LuCircleCheck className="text-emerald-500" />,
            error: <LuCircleX className="text-red-500" />,
            warning: <LuTriangleAlert className="text-amber-500" />,
            info: <LuInfo className="text-sky-500" />
        };
        setNotification({ message, type, icon: icons[type] });
    }, []);

    useEffect(() => {
        fetchProfile();
    }, []);

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
            showToast("Failed to retrieve medical records", "error");
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

            if (res.code === 200) {
                showToast("Clinical Data Synchronized", "success");
            } else {
                showToast(res.message || "Encryption error", "warning");
            }
        } catch (err) {
            showToast("Sync Failed: Check network connectivity", "error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center gap-4">
                <LuLoader className="size-10 text-sky-500 animate-spin" />
                <p className="font-bold text-sky-500 animate-pulse uppercase tracking-[0.3em] text-[10px]">ClinAware Secure Boot</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-poppins p-4 md:p-8 relative overflow-hidden">

            {/* Custom Theme-Aware Toast Notification */}
            {notification && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-3xl shadow-2xl shadow-sky-500/10 min-w-[320px]">
                        <div className="text-xl">{notification.icon}</div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">System Notification</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{notification.message}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Clinical Profile</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-tight">Health Identity Management</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleUpdate}
                            disabled={updating}
                            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-3.5 rounded-2xl font-black text-xs transition-all shadow-lg shadow-sky-200 dark:shadow-none disabled:opacity-50 active:scale-95 uppercase tracking-widest"
                        >
                            {updating ? <LuLoader className="animate-spin" /> : <LuSave size={16} />}
                            {updating ? "Syncing..." : "Save Data"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Identity Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6 shadow-sm">
                            <div className="flex items-center gap-3 text-sky-600 dark:text-sky-400">
                                <LuUser size={20} />
                                <h2 className="font-black text-[10px] uppercase tracking-[0.2em]">Identity Core</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-2 tracking-tighter">Legal Name</label>
                                    <input
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl p-4 text-sm font-bold outline-none ring-1 ring-slate-100 dark:ring-slate-700 focus:ring-2 focus:ring-sky-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-2 tracking-tighter">Encrypted Email</label>
                                    <input value={profile.email} disabled className="w-full bg-slate-100 dark:bg-slate-800/30 text-slate-400 dark:text-slate-600 rounded-2xl p-4 text-sm font-bold cursor-not-allowed border-none" />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6 shadow-sm">
                            <div className="flex items-center gap-3 text-emerald-500">
                                <LuActivity size={20} />
                                <h2 className="font-black text-[10px] uppercase tracking-[0.2em]">Biometric Analytics</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {['age', 'height', 'weight'].map((key) => (
                                    <div key={key} className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase ml-2 tracking-tighter">{key}</label>
                                        <input
                                            type="number"
                                            value={profile[key]}
                                            onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 dark:text-white rounded-2xl p-4 text-sm font-bold outline-none ring-1 ring-slate-100 dark:ring-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <section className="bg-slate-900 dark:bg-sky-950 text-white p-8 rounded-[3rem] shadow-2xl space-y-8 border border-white/5">
                            <div className="flex items-center gap-3 text-sky-400">
                                <LuDna size={22} className="animate-pulse" />
                                <h2 className="font-black text-[10px] uppercase tracking-[0.2em]">Clinical Context</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-tighter">Blood Group</label>
                                    <select
                                        value={profile.blood_group}
                                        onChange={(e) => setProfile({ ...profile, blood_group: e.target.value })}
                                        className="w-full bg-slate-800 dark:bg-slate-900/80 border-none rounded-2xl p-4 text-sm font-bold outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-500 transition-all appearance-none cursor-pointer"
                                    >
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-tighter">Chronic History</label>
                                    <textarea
                                        value={profile.chronic_condition}
                                        onChange={(e) => setProfile({ ...profile, chronic_condition: e.target.value })}
                                        className="w-full bg-slate-800 dark:bg-slate-900/80 rounded-[1.5rem] p-4 text-xs font-medium h-48 outline-none resize-none ring-1 ring-white/10 focus:ring-2 focus:ring-sky-500 transition-all"
                                        placeholder="Add conditions..."
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;