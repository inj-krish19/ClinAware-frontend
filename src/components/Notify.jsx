import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiExclamationCircle, HiX } from 'react-icons/hi';

export default function Notify({ details, onClose }) {
    const status = details?.status;
    const message = details?.message;

    const getStatusConfig = (code) => {
        if (code >= 200 && code < 300) return {
            color: 'bg-emerald-500',
            bg: 'bg-white/80 dark:bg-slate-950/80',
            border: 'border-emerald-500/20',
            text: 'text-emerald-600 dark:text-emerald-400',
            icon: <HiCheckCircle className="size-5" />,
            label: 'Success Protocol'
        };
        if (code >= 400 && code < 500) return {
            color: 'bg-amber-500',
            bg: 'bg-white/80 dark:bg-slate-950/80',
            border: 'border-amber-500/20',
            text: 'text-amber-600 dark:text-amber-400',
            icon: <HiExclamationCircle className="size-5" />,
            label: 'Validation Alert'
        };
        return {
            color: 'bg-rose-500',
            bg: 'bg-white/80 dark:bg-slate-950/80',
            border: 'border-rose-500/20',
            text: 'text-rose-600 dark:text-rose-400',
            icon: <HiExclamationCircle className="size-5" />,
            label: 'System Exception'
        };
    };

    const config = getStatusConfig(status);

    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3500);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!status || !message) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={`fixed bottom-8 right-8 z-[100] flex items-center gap-4 p-5 pr-14 min-w-[340px] max-w-md rounded-[1.5rem] border backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${config.bg} ${config.border} font-inter`}
        >
            <div className={`flex-shrink-0 size-11 rounded-2xl flex items-center justify-center text-white ${config.color} shadow-lg shadow-${config.color}/20`}>
                {config.icon}
            </div>

            <div className="flex-1">
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 ${config.text} opacity-70`}>
                    {config.label} • {status}
                </p>
                <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                    {message}
                </p>
            </div>

            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400">
                <HiX size={16} />
            </button>

            {/* Premium Slim Progress Bar */}
            <div className="absolute bottom-2 left-5 right-5 h-[3px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 3.5, ease: "linear" }}
                    className={`h-full ${config.color}`}
                />
            </div>
        </motion.div>
    );
}