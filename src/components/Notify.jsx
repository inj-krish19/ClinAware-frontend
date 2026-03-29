import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiCheckCircle,
    HiExclamationCircle,
    HiInformationCircle,
    HiX
} from 'react-icons/hi';

export default function Notify({ details, onClose }) {
    const [progress, setProgress] = useState(100);

    const status = details?.status;
    const message = details?.message;

    const getStatusConfig = (code) => {
        if (code >= 200 && code < 300) return {
            color: 'bg-emerald-500',
            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
            border: 'border-emerald-200 dark:border-emerald-800/50',
            text: 'text-emerald-800 dark:text-emerald-400',
            icon: <HiCheckCircle className="size-5" />,
            label: 'Success'
        };
        if (code >= 400 && code < 500) return {
            color: 'bg-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-950/30',
            border: 'border-amber-200 dark:border-amber-800/50',
            text: 'text-amber-800 dark:text-amber-400',
            icon: <HiExclamationCircle className="size-5" />,
            label: 'Request Issue'
        };
        return {
            color: 'bg-rose-500',
            bg: 'bg-rose-50 dark:bg-rose-950/30',
            border: 'border-rose-200 dark:border-rose-800/50',
            text: 'text-rose-800 dark:text-rose-400',
            icon: <HiExclamationCircle className="size-5" />,
            label: 'System Error'
        };
    };

    const config = getStatusConfig(status);

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        const interval = setInterval(() => {
            setProgress((prev) => prev - (100 / 30));
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [onClose]);

    if (!status || !message) return;


    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`fixed bottom-6 right-6 z-[100] flex items-center gap-4 p-4 pr-12 min-w-[320px] max-w-md rounded-2xl border shadow-2xl backdrop-blur-xl ${config.bg} ${config.border} transition-colors duration-500`}
        >
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white ${config.color} shadow-lg shadow-${config.color}/20`}>
                {config.icon}
            </div>

            <div className="flex-1 overflow-hidden">
                <p className={`text-[10px] font-black uppercase tracking-[0.15em] opacity-60 ${config.text}`}>
                    {config.label} • {status}
                </p>
                <p className={`text-sm font-bold truncate ${config.text}`}>
                    {message}
                </p>
            </div>

            <button
                onClick={onClose}
                className={`absolute top-3 right-3 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${config.text}`}
            >
                <HiX size={16} />
            </button>

            <div className="absolute bottom-0 left-0 h-1 bg-black/5 dark:bg-white/5 w-full rounded-b-2xl overflow-hidden">
                <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 3, ease: "linear" }}
                    className={`h-full ${config.color}`}
                />
            </div>
        </motion.div>
    );
}
