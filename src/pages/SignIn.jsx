import React from 'react';
import { LuMail, LuLock, LuArrowRight } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom'; // Assuming you use react-router

export default function SignIn() {
    return (
        <div className="min-h-[80vh] flex justify-center items-center px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl shadow-sky-200/20 dark:shadow-none rounded-3xl p-8 border border-slate-100 dark:border-slate-800">

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Log in to access your health insights
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Email Input */}
                    <div className="group space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                        <div className="flex items-center border-2 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 focus-within:border-sky-500 dark:focus-within:border-sky-400 transition-all">
                            <LuMail size={20} className="mr-3 text-slate-400 group-focus-within:text-sky-500" />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="bg-transparent w-full outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="group space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
                            <a href="#" className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline">Forgot?</a>
                        </div>
                        <div className="flex items-center border-2 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 focus-within:border-sky-500 dark:focus-within:border-sky-400 transition-all">
                            <LuLock size={20} className="mr-3 text-slate-400 group-focus-within:text-sky-500" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="bg-transparent w-full outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <button className="w-full flex justify-center items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-sky-200 dark:shadow-none active:scale-[0.98]">
                        Sign In <LuArrowRight size={18} />
                    </button>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98]">
                        <FcGoogle size={22} />
                        Google
                    </button>
                </div>

                <p className="text-center mt-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Don't have an account?
                    <button className="text-sky-600 dark:text-sky-400 font-bold ml-1 hover:underline">Create one</button>
                </p>
            </div>
        </div>
    );
}