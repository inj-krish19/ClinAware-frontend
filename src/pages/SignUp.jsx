import React from 'react';
import { LuUser, LuMail, LuLock, LuShieldCheck } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
    return (
        <div className="min-h-[80vh] flex justify-center items-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl shadow-emerald-200/20 dark:shadow-none rounded-3xl p-8 border border-slate-100 dark:border-slate-800">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Create Account
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                        Join the ClinAware health ecosystem
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Full Name Input */}
                    <div className="group space-y-1">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase">Full Name</label>
                        <div className="flex items-center border-2 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 transition-all">
                            <LuUser size={20} className="mr-3 text-slate-400 group-focus-within:text-emerald-500" />
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="bg-transparent w-full outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="group space-y-1">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase">Email Address</label>
                        <div className="flex items-center border-2 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 transition-all">
                            <LuMail size={20} className="mr-3 text-slate-400 group-focus-within:text-emerald-500" />
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="bg-transparent w-full outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="group space-y-1">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase">Password</label>
                        <div className="flex items-center border-2 rounded-2xl px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 transition-all">
                            <LuLock size={20} className="mr-3 text-slate-400 group-focus-within:text-emerald-500" />
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                className="bg-transparent w-full outline-none text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <button className="w-full flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-200/40 dark:shadow-none active:scale-[0.98] mt-4">
                        <LuShieldCheck size={20} />
                        Register Now
                    </button>

                    <div className="flex items-center gap-4 my-4">
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Or</span>
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold py-3.5 rounded-2xl transition-all active:scale-[0.98]">
                        <FcGoogle size={22} />
                        Join with Google
                    </button>
                </div>

                <p className="text-center mt-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                    Already a member?
                    <button className="text-emerald-600 dark:text-emerald-400 font-bold ml-1 hover:cursor-pointer hover:scale-105 transition transition-ease-in" onClick={() => { window.location.href = '/signin' }}>Sign In</button>
                </p>
            </div>
        </div>
    );
}