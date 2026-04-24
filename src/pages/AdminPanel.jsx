import React, { useState, useEffect } from 'react';
import { LuUsers, LuShield, LuActivity, LuTrash2, LuChevronRight, LuLayoutDashboard, LuLoader, LuClipboardList, LuMicroscope, LuSun, LuMoon } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { BACKEND_URL } from '../context/constants';

const AdminPanel = () => {
    const [stats, setStats] = useState({ users: [], total_users: 0, total_clinical_vitals: 0, total_ai_reports: 0 });
    const [selectedUser, setSelectedUser] = useState(null);
    const [userHistory, setUserHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDark, setIsDark] = useState(true);

    const ADMIN_SECRET = "CLINAWARE_ADMIN";

    useEffect(() => {
        loadStats();
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') setIsDark(false);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const loadStats = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/admin/stats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Secret': ADMIN_SECRET
                }
            });
            const data = await res.json();
            if (data.code === 200) setStats(data);
        } catch (err) {
            console.error("Nexus Access Denied");
        }
    };

    const diveIntoUser = async (uid) => {
        if (selectedUser === uid) return;
        setSelectedUser(uid);
        setLoading(true);
        setUserHistory(null);

        try {
            const res = await fetch(`${BACKEND_URL}/admin/user-deep-dive/${uid}`, {
                method: 'GET',
                headers: { 'X-Admin-Secret': ADMIN_SECRET }
            });
            const data = await res.json();
            if (data.code === 200) {
                setUserHistory(data.data || {});
            }
        } catch (err) {
            console.error("Deep dive failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-600 dark:text-slate-300 p-6 md:p-10 font-poppins transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-10">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase italic">
                            ClinAware <span className="text-violet-600 dark:text-sky-500 underline decoration-2 underline-offset-8">Admin</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold mt-3 uppercase">Administrative Central Command</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-violet-600 dark:text-sky-500 shadow-sm"
                        >
                            {isDark ? <LuSun size={20} /> : <LuMoon size={20} />}
                        </button>
                        <StatCard icon={<LuUsers />} label="Users" val={stats.total_users} color="text-violet-500 dark:text-blue-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/50 rounded-[2.5rem] p-6 h-[700px] flex flex-col shadow-sm">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                                <LuUsers className="text-violet-500 dark:text-sky-500" /> Active Subjects
                            </h3>
                            <span className="text-[10px] bg-violet-500/10 text-violet-600 dark:bg-sky-500/10 dark:text-sky-500 px-2 py-1 rounded-md border border-violet-200 dark:border-sky-500/20 font-bold">LIVE</span>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                            {stats.users.length > 0 ? (
                                stats.users.map(u => (
                                    <button
                                        key={u.id}
                                        onClick={() => diveIntoUser(u.id)}
                                        className={`w-full text-left p-5 rounded-[1.5rem] transition-all duration-300 border group ${selectedUser === u.id
                                            ? 'bg-violet-500/5 dark:bg-sky-500/10 border-violet-500/40 dark:border-sky-500/40 shadow-sm'
                                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/50 hover:border-violet-300 dark:hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className={`font-bold text-sm transition-colors ${selectedUser === u.id ? 'text-violet-700 dark:text-white' : 'text-slate-600 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                                                {u.name || "Anonymous Node"}
                                            </div>
                                            <LuChevronRight className={`transition-transform ${selectedUser === u.id ? 'translate-x-1 text-violet-600 dark:text-sky-500' : 'text-slate-400 dark:text-slate-600'}`} />
                                        </div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-medium">{u.email}</div>
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-xs text-slate-400 mt-10 italic">No user data synchronized.</p>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="h-[500px] flex flex-col items-center justify-center text-violet-600 dark:text-sky-500 space-y-4"
                                >
                                    <LuLoader size={40} className="animate-spin" />
                                    <p className="text-[10px] font-black uppercase">Decrypting Records...</p>
                                </motion.div>
                            ) : userHistory ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800/50 shadow-sm">
                                        <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-6 flex items-center gap-2">
                                            <LuShield className="text-fuchsia-500" /> Medical Cost Insurance
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {userHistory.insurance.length > 0 ? (
                                                userHistory.insurance.map((i, idx) => (
                                                    <div key={idx} className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 p-5 rounded-2xl flex justify-between items-center">
                                                        <div>
                                                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mb-1">Premium Estimate</div>
                                                            <div className="text-xl font-black text-slate-900 dark:text-white">₹{i.predictions.regressor || "0"}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium italic">{i.name}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-400 italic">No insurance logs found.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800/50 shadow-sm">
                                        <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-6 flex items-center gap-2">
                                            <LuActivity className="text-emerald-500" /> Vitals Intelligence
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {userHistory.vitals.length > 0 ? (
                                                userHistory.vitals.map((v, idx) => (
                                                    <div key={idx} className="bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 p-5 rounded-2xl space-y-3">
                                                        <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-2">
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Record {idx + 1}</span>
                                                            <span className="text-[10px] text-slate-500 dark:text-slate-600">{new Date(v.timestamp).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">Blood Pressure</p>
                                                                <p className="text-lg font-black text-slate-900 dark:text-white">{v.blood_pressure?.systolic || '0'}/{v.blood_pressure?.diastolic || '0'}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">Glucose</p>
                                                                <p className="text-lg font-black text-violet-600 dark:text-sky-400">{v.diabetes?.glucose || '0'} mg/dL</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-400 italic">No biometric history recorded.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-slate-900/40 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800/50 shadow-sm">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase flex items-center gap-2">
                                                <LuMicroscope className="text-violet-600 dark:text-sky-500" /> Neural Interpretations
                                            </h4>
                                            <span className="text-[9px] text-slate-400 dark:text-slate-600 font-bold uppercase">
                                                {userHistory.reports?.length || 0} Records Found
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            {userHistory.reports && userHistory.reports.length > 0 ? (
                                                userHistory.reports.map((report, idx) => (
                                                    <details key={idx} className="group bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden transition-all hover:border-violet-400 dark:hover:border-sky-500/30">
                                                        <summary className="flex justify-between items-center p-5 cursor-pointer list-none">
                                                            <div className="flex items-center gap-4">
                                                                <div className="p-2 bg-violet-500/10 dark:bg-sky-500/10 rounded-lg">
                                                                    <LuClipboardList className="text-violet-600 dark:text-sky-500" size={18} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{report.filename || "Medical_Report.pdf"}</p>
                                                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{new Date(report.timestamp).toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${report.analysis?.risk_index === 'High'
                                                                    ? 'bg-rose-500/10 text-rose-600 border-rose-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30'
                                                                    : 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                                                                    }`}>
                                                                    Risk: {report.analysis?.risk_index || 'N/A'}
                                                                </span>
                                                                <LuChevronRight className="text-slate-400 group-open:rotate-90 transition-transform" />
                                                            </div>
                                                        </summary>
                                                        <div className="px-6 pb-6 pt-2 space-y-6 border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-slate-900/20">
                                                            <div className="space-y-2">
                                                                <h5 className="text-[9px] font-black text-violet-600 dark:text-sky-500 uppercase">AI Synthesized Summary</h5>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                                                                    {report.analysis?.summary || "No summary available."}
                                                                </p>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <h5 className="text-[9px] font-black text-violet-600 dark:text-sky-500 uppercase">Biomarkers</h5>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                    {report.analysis?.markers?.map((marker, mIdx) => (
                                                                        <div key={mIdx} className="bg-white dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col justify-between min-h-[60px]">
                                                                            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">{marker.name}</span>
                                                                            <div className="flex justify-between items-end">
                                                                                <span className="text-sm font-black text-slate-800 dark:text-white">{marker.value}</span>
                                                                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${marker.status === 'High' ? 'text-rose-600 bg-rose-50 dark:text-red-400 dark:bg-red-400/10' : 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-400/10'}`}>
                                                                                    {marker.status}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </details>
                                                ))
                                            ) : (
                                                <div className="text-center py-10 bg-slate-50 dark:bg-black/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                                    <p className="text-xs text-slate-400 italic uppercase">No AI Interpretations Found</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-[500px] border-2 border-dashed border-slate-200 dark:border-slate-800/50 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
                                    <LuLayoutDashboard size={48} className="mb-4 opacity-20" />
                                    <p className="text-xs font-bold uppercase opacity-40">Awaiting Node Selection</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, val, color }) => (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 rounded-[1.5rem] flex items-center gap-5 min-w-[140px] shadow-sm dark:shadow-lg">
        <div className={`${color} text-2xl opacity-90`}>{icon}</div>
        <div>
            <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase mb-0.5">{label}</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{val || 0}</div>
        </div>
    </div>
);

export default AdminPanel;