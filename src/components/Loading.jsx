import React from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white dark:bg-[#020617] font-inter">
            <div className="relative flex items-center justify-center">
                {/* Orbital Rings */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                            rotate: 360,
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4 + i,
                            ease: "linear"
                        }}
                        className="absolute rounded-full border border-sky-500/20"
                        style={{ width: `${(i + 1) * 100}px`, height: `${(i + 1) * 100}px` }}
                    />
                ))}

                {/* Core Logo Container */}
                <motion.div
                    animate={{
                        boxShadow: ["0 0 20px rgba(14, 165, 233, 0.2)", "0 0 40px rgba(16, 185, 129, 0.4)", "0 0 20px rgba(14, 165, 233, 0.2)"]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="relative w-24 h-24 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl z-10"
                >
                    <img src="/icon.svg" alt="ClinAware" className="w-12 h-12 brightness-0 invert" />
                </motion.div>
            </div>

            <div className="mt-16 flex flex-col items-center space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter font-jakarta">
                        ClinAware
                    </h2>
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mt-1">
                        Precision Health Node
                    </p>
                </div>

                {/* Progress Track */}
                <div className="relative w-48 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "circInOut" }}
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                    />
                </div>

                <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono"
                >
                    System_Initialization_In_Progress...
                </motion.p>
            </div>
        </div>
    );
}