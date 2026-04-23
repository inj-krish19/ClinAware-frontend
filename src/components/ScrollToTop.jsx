import React, { useState, useEffect } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 400);
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="fixed bottom-10 right-10 z-[90]">
            <button
                onClick={scrollToTop}
                className={`
                    group relative flex items-center justify-center size-14
                    rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                    text-slate-900 dark:text-white shadow-2xl transition-all duration-500
                    ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-75 pointer-events-none"}
                    hover:border-sky-500 hover:-translate-y-2
                `}
            >
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 rounded-2xl bg-sky-500/0 group-hover:bg-sky-500/5 transition-colors" />

                <LuArrowUp
                    size={22}
                    className="relative transition-transform group-hover:scale-110 group-hover:text-sky-500"
                />
            </button>
        </div>
    );
}