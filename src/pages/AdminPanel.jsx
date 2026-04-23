import React, { useState, useEffect } from 'react';
import { LuUsers, LuShield, LuActivity, LuFileSearch, LuTrash2, LuChevronRight, LuLayoutDashboard, LuLoader, LuClipboardList, LuMicroscope } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import { BACKEND_URL } from '../context/constants';

const AdminPanel = () => {
    const [stats, setStats] = useState({ users: [], total_users: 0, total_clinical_vitals: 0, total_ai_reports: 0 });
    const [selectedUser, setSelectedUser] = useState(null);
    const [userHistory, setUserHistory] = useState(null);
    const [loading, setLoading] = useState(false);

    const ADMIN_SECRET = "CLINAWARE_ADMIN";

    useEffect(() => {
        loadStats();
    }, []);

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
        if (selectedUser === uid) return; // Prevent re-fetching same user
        setSelectedUser(uid);
        setLoading(true);
        setUserHistory(null); // Reset previous view

        try {
            const res = await fetch(`${BACKEND_URL}/admin/user-deep-dive/${uid}`, {
                method: 'GET',
                headers: {
                    'X-Admin-Secret': ADMIN_SECRET
                }
            });
            const data = await res.json();
            if (data.code === 200) {
                setUserHistory(data.data || {});
                console.log(data.data);
            }
        } catch (err) {
            console.error("Deep dive failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-300 p-6 md:p-10 font-poppins">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            ClinAware <span className="text-sky-500 underline decoration-2 underline-offset-8">Nexus</span>
                        </h1>
                        <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] mt-3 uppercase">Administrative Central Command</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <StatCard icon={<LuUsers />} label="Users" val={stats.total_users} color="text-blue-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* User Directory (Left Sidebar) */}
                    <div className="lg:col-span-4 bg-slate-900/30 border border-slate-800/50 rounded-[2.5rem] p-6 h-[700px] flex flex-col">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <LuUsers className="text-sky-500" /> Active Subjects
                            </h3>
                            <span className="text-[10px] bg-sky-500/10 text-sky-500 px-2 py-1 rounded-md border border-sky-500/20">LIVE</span>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                            {stats.users.length > 0 ? (
                                stats.users.map(u => (
                                    <button
                                        key={u.id}
                                        onClick={() => {
                                            diveIntoUser(u.id)
                                        }}
                                        className={`w-full text-left p-5 rounded-[1.5rem] transition-all duration-300 border group ${selectedUser === u.id
                                            ? 'bg-sky-500/10 border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.1)]'
                                            : 'bg-slate-900/50 border-slate-800/50 hover:border-slate-600'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                                                {u.name || "Anonymous Node"}
                                            </div>
                                            <LuChevronRight className={`transition-transform ${selectedUser === u.id ? 'translate-x-1 text-sky-500' : 'text-slate-600'}`} />
                                        </div>
                                        <div className="text-[10px] text-slate-500 mt-1 font-medium">{u.email}</div>
                                    </button>
                                ))
                            ) : (
                                <p className="text-center text-xs text-slate-600 mt-10 italic">No user data synchronized.</p>
                            )}
                        </div>
                    </div>

                    {/* Data Display (Right Main Content) */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="h-[500px] flex flex-col items-center justify-center text-sky-500 space-y-4"
                                >
                                    <LuLoader size={40} className="animate-spin" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">Decrypting Records...</p>
                                </motion.div>
                            ) : userHistory ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Insurance Summary Card */}
                                    <div className="bg-slate-900/40 rounded-[2.5rem] p-8 border border-slate-800/50">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
                                            <LuShield className="text-rose-500" /> Medical Cost Insurance
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {userHistory.insurance.length > 0 ? (
                                                userHistory.insurance.map((i, idx) => (
                                                    <div key={idx} className="bg-black/30 border border-white/5 p-5 rounded-2xl flex justify-between items-center">
                                                        <div>
                                                            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Premium Estimate</div>
                                                            <div className="text-xl font-black text-white">₹{i.predictions.regressor || "0"}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-[10px] text-slate-400 font-medium italic">
                                                                {new Date(i.timestamp).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-600 italic">No insurance logs found.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Vitals Grid Card */}
                                    <div className="bg-slate-900/40 rounded-[2.5rem] p-8 border border-slate-800/50">
                                        <h4 className="text-[10px] font-black text-slate-500 uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
                                            <LuActivity className="text-emerald-500" /> Vitals Intelligence
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {userHistory.vitals.length > 0 ? (
                                                userHistory.vitals.map((v, idx) => (
                                                    <div key={idx} className="bg-black/30 border border-white/5 p-5 rounded-2xl space-y-3">
                                                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Record Node {idx + 1}</span>
                                                            <span className="text-[10px] text-slate-600">{new Date(v.timestamp).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-[9px] text-slate-500 font-bold uppercase">Blood Pressure</p>
                                                                <p className="text-lg font-black text-white">{v.blood_pressure?.systolic || '0'}/{v.blood_pressure?.diastolic || '0'}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[9px] text-slate-500 font-bold uppercase">Glucose</p>
                                                                <p className="text-lg font-black text-sky-400">{v.diabetes?.glucose || '0'} mg/dL</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-xs text-slate-600 italic">No biometric history recorded.</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Report AI (Module 4) Deep Dive */}
                                    <div className="bg-slate-900/40 rounded-[2.5rem] p-8 border border-slate-800/50">
                                        <div className="flex justify-between items-center mb-6">
                                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <LuMicroscope className="text-sky-500" /> Neural Report Interpretations (Module 4)
                                            </h4>
                                            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                                                {userHistory.reports?.length || 0} Records Found
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            {userHistory.reports && userHistory.reports.length > 0 ? (
                                                userHistory.reports.map((report, idx) => (
                                                    <details key={idx} className="group bg-black/30 border border-white/5 rounded-2xl overflow-hidden transition-all hover:border-sky-500/30">
                                                        <summary className="flex justify-between items-center p-5 cursor-pointer list-none">
                                                            <div className="flex items-center gap-4">
                                                                <div className="p-2 bg-sky-500/10 rounded-lg">
                                                                    <LuClipboardList className="text-sky-500" size={18} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-slate-200">{report.filename || "Medical_Report.pdf"}</p>
                                                                    <p className="text-[10px] text-slate-500">{new Date(report.timestamp).toLocaleString()}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${report.analysis?.risk_index === 'High'
                                                                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                                                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                                                    }`}>
                                                                    Risk: {report.analysis?.risk_index || 'N/A'}
                                                                </span>
                                                                <LuChevronRight className="text-slate-600 group-open:rotate-90 transition-transform" />
                                                            </div>
                                                        </summary>

                                                        <div className="px-6 pb-6 pt-2 space-y-6 border-t border-white/5 bg-slate-900/20">
                                                            {/* Summary Section */}
                                                            <div className="space-y-2">
                                                                <h5 className="text-[9px] font-black text-sky-500 uppercase tracking-widest">AI Synthesized Summary</h5>
                                                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                                                    {report.analysis?.summary || "No summary available for this node."}
                                                                </p>
                                                            </div>

                                                            {/* Biomarker Grid */}
                                                            <div className="space-y-3">
                                                                <h5 className="text-[9px] font-black text-sky-500 uppercase tracking-widest">Extracted Biomarkers</h5>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                    {report.analysis?.markers?.map((marker, mIdx) => (
                                                                        <div key={mIdx} className="bg-white/5 p-3 rounded-xl border border-white/5 flex flex-col justify-between min-h-[60px]">
                                                                            <span className="text-[9px] text-slate-500 font-bold uppercase">{marker.name}</span>
                                                                            <div className="flex justify-between items-end">
                                                                                <span className="text-sm font-black text-white">{marker.value}</span>
                                                                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${marker.status === 'High' ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'
                                                                                    }`}>
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
                                                <div className="text-center py-10 bg-black/20 rounded-2xl border border-dashed border-slate-800">
                                                    <p className="text-xs text-slate-600 italic uppercase tracking-widest">No AI Interpretations Found for this Node</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </motion.div>
                            ) : (
                                <div className="h-[500px] border-2 border-dashed border-slate-800/50 rounded-[3rem] flex flex-col items-center justify-center text-slate-600">
                                    <LuLayoutDashboard size={48} className="mb-4 opacity-20" />
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-40">Awaiting Node Selection</p>
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
    <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-[1.5rem] flex items-center gap-5 min-w-[140px] shadow-lg">
        <div className={`${color} text-2xl opacity-90`}>{icon}</div>
        <div>
            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
            <div className="text-2xl font-black text-white tracking-tighter">{val || 0}</div>
        </div>
    </div>
);

export default AdminPanel;