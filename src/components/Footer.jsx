export default function Footer() {
    return (
        <footer className="bg-slate-800 text-stone-300 py-6 mt-16">
            <div className="text-center">
                © {new Date().getFullYear()} ClinAware. AI-driven medical insights.
            </div>
        </footer>
    );
}