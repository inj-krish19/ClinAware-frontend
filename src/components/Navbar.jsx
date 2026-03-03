import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-sky-600 dark:bg-slate-800 shadow-md transition-colors">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">
                    ClinAware
                </Link>

                <div className="flex gap-6 items-center">
                    <Link to="/predict" className="text-white hover:text-emerald-300">
                        Predict
                    </Link>
                    <Link to="/signin" className="text-white hover:text-emerald-300">
                        Sign In
                    </Link>
                    <Link to="/signup" className="text-white hover:text-emerald-300">
                        Sign Up
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}