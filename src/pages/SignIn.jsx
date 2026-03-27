import React from 'react';
import { motion } from 'framer-motion';
import { LuMail, LuLock, LuArrowRight, LuActivity } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">

            {/* Consistent Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-5%] left-[-5%] w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white dark:bg-slate-900/60 backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-8 md:p-10 border border-slate-200 dark:border-slate-800"
            >
                {/* Logo or Brand Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500">
                        <LuActivity size={28} />
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Access your <span className="text-sky-500">ClinAware</span> dashboard
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Google Login (Fast path) */}
                    <button className="group w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98] shadow-sm">
                        <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4 py-2">
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">or email</span>
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">Email Address</label>
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/50 focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
                            <LuMail size={18} className="mr-3 text-slate-400" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="bg-transparent w-full outline-none text-slate-900 dark:text-white text-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-end mb-1">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">Password</label>
                            <button className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline">Forgot password?</button>
                        </div>
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/50 focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500 transition-all">
                            <LuLock size={18} className="mr-3 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="bg-transparent w-full outline-none text-slate-900 dark:text-white text-sm font-medium"
                            />
                        </div>
                    </div>

                    <button className="w-full flex justify-center items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-sky-500/20 active:scale-[0.98] mt-4">
                        Sign In <LuArrowRight size={18} />
                    </button>
                </div>

                <p className="flex justify-center text-center mt-10 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Don't have a profile yet?
                    <button
                        className="flex flex-row justify-center gap-2 items-center text-sky-600 dark:text-sky-400 font-bold ml-2 hover:underline underline-offset-4 transition-all"
                        onClick={() => { window.location.href = '/signup' }}
                    >
                        Create one <LuArrowRight />
                    </button>
                </p>
            </motion.div>

            {/* Serious Context Hint */}
            <div className="mt-8 text-center max-w-xs">
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    By logging in, you are accessing a secure medical environment. Please ensure you are on a private connection.
                </p>
            </div>
        </div>
    );
}
