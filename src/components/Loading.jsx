import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white dark:bg-slate-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                    className="absolute w-24 h-24 rounded-full bg-sky-500/20 dark:bg-sky-400/10"
                />

                <div className="relative w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-sky-500/20">
                    <img src="/icon.svg" alt="ClinAware" className="w-10 h-10 brightness-0 invert" />
                </div>
            </motion.div>

            <div className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-xl font-black tracking-tighter bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                    ClinAware
                </h2>

                <div className="w-48 h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mt-2">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                    />
                </div>

                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 dark:text-slate-600 mt-2 animate-pulse">
                    Synchronizing Data
                </p>
            </div>
        </div>
    );
}
