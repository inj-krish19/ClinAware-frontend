import { Mail, Lock, Chrome } from "lucide-react";

export default function SignIn() {
    return (
        <div className="flex justify-center items-center py-20 px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 transition-colors">
                <h2 className="text-3xl font-bold text-center text-sky-600 dark:text-cyan-400 mb-8">
                    Welcome Back
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center border rounded-lg px-3 py-2 dark:border-slate-600 dark:bg-slate-700">
                        <Mail size={18} className="mr-2 text-slate-500" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-transparent w-full outline-none"
                        />
                    </div>

                    <div className="flex items-center border rounded-lg px-3 py-2 dark:border-slate-600 dark:bg-slate-700">
                        <Lock size={18} className="mr-2 text-slate-500" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-transparent w-full outline-none"
                        />
                    </div>

                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition">
                        Sign In
                    </button>

                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                        <span className="text-sm text-slate-500">OR</span>
                        <div className="flex-1 h-px bg-slate-300 dark:bg-slate-600"></div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-2 rounded-lg transition">
                        <Chrome size={18} />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
}