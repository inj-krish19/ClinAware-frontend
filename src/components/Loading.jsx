import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white dark:bg-[#020617]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex items-center justify-center"
            >
                <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute w-32 h-32 rounded-full bg-emerald-500/20 blur-xl"
                />

                <div className="relative w-20 h-20 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-sky-500/30">
                    <img src="/icon.svg" alt="ClinAware" className="w-10 h-10 brightness-0 invert" />
                </div>
            </motion.div>

            <div className="mt-10 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    ClinAware
                </h2>
                <div className="w-40 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-4">
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-full h-full bg-emerald-500"
                    />
                </div>
                <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Initializing Intelligence
                </p>
            </div>
        </div>
    );
}