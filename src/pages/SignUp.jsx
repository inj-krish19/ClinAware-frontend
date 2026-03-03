export default function SignUp() {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-3 py-2 border rounded-md dark:bg-slate-700"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 border rounded-md dark:bg-slate-700"
                />

                <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md">
                    Sign Up
                </button>
            </div>
        </div>
    );
}