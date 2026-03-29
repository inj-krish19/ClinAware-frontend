import React, { useState, useEffect } from "react";
import { LuChevronUp } from "react-icons/lu";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-8 right-8 z-[999]">
            <button
                onClick={scrollToTop}
                className={`
                    group flex items-center justify-center w-14 h-14 
                    rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 
                    text-white shadow-lg shadow-sky-200 dark:shadow-none 
                    transition-all duration-500 transform
                    ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50 pointer-events-none"}
                    hover:scale-110 active:scale-90 hover:rotate-3
                `}
                aria-label="Scroll to top"
            >
                <span className="absolute inset-0 rounded-2xl bg-sky-400 animate-ping opacity-20 group-hover:hidden"></span>

                <LuChevronUp
                    size={28}
                    className="relative transition-transform group-hover:-translate-y-1"
                />
            </button>
        </div>
    );
}
