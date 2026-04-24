import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuUser, LuMail, LuLock, LuShieldCheck, LuGlobe, LuCalendar, LuArrowRight } from "react-icons/lu";
import Notify from '../components/Notify';
import { BACKEND_URL } from '../context/constants';

export default function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(null);

    const submitForm = async (e) => {

        e.preventDefault();

        let res = await fetch(`${BACKEND_URL}/auth/user`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            }),
            credentials: "include"
        });

        let response = await res.json();
        setNotification({
            status: res.status,
            message: response?.message
        })

        if (res.status === 200) {
            setTimeout(() => {
                window.location.href = '/success'
            }, 3000);
        }

    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-50 dark:bg-[#020617] transition-colors duration-500">


            <Notify details={notification} onClose={() => { setNotification(null); }} />

            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-white dark:bg-slate-900/60 backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white   mb-3">
                        Join ClinAware
                    </h2>
                    <p className="text-slate-500 dark:text-slate-300 font-medium">
                        Start your journey toward <span className="text-emerald-500 font-bold">intelligent</span> health management.
                    </p>
                </div>


                <form className="space-y-5" onSubmit={(e) => submitForm(e)}>
                    <div className="grid grid-cols-1  gap-5">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase  ">Full Name</label>
                            <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/50 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                                <LuUser size={18} className="mr-3 text-slate-400" />
                                <input type="text" placeholder="John" className="bg-transparent w-full outline-none text-slate-900 dark:text-white text-sm font-medium" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase  ">Email Address</label>
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/50 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                            <LuMail size={18} className="mr-3 text-slate-400" />
                            <input type="email" placeholder="john@gmail.com" className="bg-transparent w-full outline-none text-slate-900 dark:text-white text-sm font-medium" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase  ">Password</label>
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/50 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                            <LuLock size={18} className="mr-3 text-slate-400" />
                            <input type="password" placeholder="••••••••" className="bg-transparent w-full outline-none text-slate-900 dark:text-white text-sm font-medium" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <button className="w-full flex justify-center items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98] mt-6">
                        <LuShieldCheck size={20} />
                        Submit
                    </button>
                </form>

                <p className="flex justify-center mt-10 text-sm font-bold text-slate-500 dark:text-slate-400 transition-all">
                    Already a member?
                    <button
                        className="flex flex-row justify-center gap-2 items-center  text-emerald-500 dark:text-emerald-400 ml-2 hover:scale-105 transition-all"
                        onClick={() => { window.location.href = '/signin' }}
                    >
                        Sign In <LuArrowRight />
                    </button>
                </p>

                <p className="text-center mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    By signing up, you agree to our
                    <button className="text-slate-900 dark:text-white no-underline ml-1 hover:text-emerald-500 transition-colors">Data Privacy Policy</button>
                </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-lg w-full">
                <div className="flex items-center gap-3 text-slate-400">
                    <LuShieldCheck className="text-emerald-500" />
                    <span className="text-xs font-bold uppercase  ">Secure Data</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                    <LuGlobe className="text-sky-500" />
                    <span className="text-xs font-bold uppercase  ">Encrypted Cloud</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                    <LuUser className="text-purple-500" />
                    <span className="text-xs font-bold uppercase  ">User Controlled</span>
                </div>
            </div>

        </div >
    );
}
