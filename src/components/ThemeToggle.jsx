import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { dark, setDark } = useContext(ThemeContext);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md"
        >
            {dark ? "Light" : "Dark"}
        </button>
    );
}