export default function Home() {
    return (
        <section className="max-w-5xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-sky-600 dark:text-cyan-400">
                AI Powered Medical Insurance Intelligence
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-stone-300">
                ClinAware predicts medical insurance costs using Machine Learning.
                It categorizes risk levels and provides data-driven health insights.
            </p>

            <div className="mt-12 grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow">
                    <h3 className="font-semibold text-emerald-600">Cost Prediction</h3>
                    <p className="mt-2 text-sm">Accurate regression-based modeling.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow">
                    <h3 className="font-semibold text-indigo-600">Risk Analysis</h3>
                    <p className="mt-2 text-sm">Classifies into Low / Medium / High risk.</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow">
                    <h3 className="font-semibold text-cyan-600">Health News Bot</h3>
                    <p className="mt-2 text-sm">Daily curated health updates.</p>
                </div>
            </div>
        </section>
    );
}