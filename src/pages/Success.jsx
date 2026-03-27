import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuCircleCheck, LuArrowRight, LuLayoutDashboard, LuActivity } from 'react-icons/lu';
import { FcGoogle } from 'react-icons/fc';

function Success() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Redirect timer (5 seconds)
        const redirectTimer = setTimeout(() => {
            navigate('/dashboard');
        }, 10000);

        // Visual progress bar timer (updates every 50ms for smoothness)
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + 1; // 100 steps over 10000ms
            });
        }, 100);

        return () => {
            clearTimeout(redirectTimer);
            clearInterval(progressTimer);
        };
    }, [navigate]);

    return (
        <main className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 overflow-hidden transition-colors duration-500">

            {/* Ambient Success Glows */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-200/20 dark:bg-emerald-900/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] bg-sky-100/30 dark:bg-sky-900/10 blur-[80px] rounded-full" />

            <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-emerald-200/20 dark:shadow-none text-center animate-in fade-in zoom-in duration-700">

                {/* Animated Success Icon */}
                <div className="relative mx-auto w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-full animate-ping opacity-20" />
                    <div className="relative w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500">
                        <LuCircleCheck size={48} strokeWidth={2.5} className="animate-in slide-in-from-bottom-2 duration-1000" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 mb-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FcGoogle size={20} />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Identity Verified</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Welcome to <span className="text-emerald-500">ClinAware</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                        Google authentication successful. Your profile is synced and our clinical utility services are now fully unlocked.
                    </p>
                </div>

                {/* Utility Service Navigation */}
                <div className="grid grid-cols-1 gap-4">
                    <Link
                        to="/predict"
                        className="group flex items-center justify-between p-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all active:scale-95 shadow-lg shadow-sky-200 dark:shadow-none"
                    >
                        <div className="flex items-center gap-3">
                            <LuActivity size={20} />
                            <span>Insurance Predictor</span>
                        </div>
                        <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        to="/dashboard"
                        className="group flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
                    >
                        <div className="flex items-center gap-3">
                            <LuLayoutDashboard size={20} />
                            <span>Go to Dashboard</span>
                        </div>
                        <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Auto-Redirect Progress Indicator */}
                <div className="mt-10 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span>Redirecting to Dashboard</span>
                        <span>{Math.ceil((10000 - (progress * 100)) / 1000)}s</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Success;
