import { useState } from "react";
import axios from "axios";

export default function Predict() {
    const [form, setForm] = useState({});
    const [result, setResult] = useState(null);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (["age", "bmi", "children"].includes(name)) {
            setForm({ ...form, [name]: Number(value) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...form,
            age: Number(form.age),
            bmi: Number(form.bmi),
            children: Number(form.children),
        };

        const res = await axios.post(
            "http://localhost:12000/predict", form,
            {
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );

        setResult(res.data);
    };

    return (
        <div className="max-w-3xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold text-sky-600 mb-8">
                Predict Insurance Cost
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-4 bg-white dark:bg-slate-800 p-8 rounded-xl shadow"
            >

                <input type="number" name="age" placeholder="Age" onChange={handleChange} className="input" />
                <input type="number" step="0.1" name="bmi" placeholder="BMI" onChange={handleChange} className="input" />
                <input type="number" name="children" placeholder="Children" onChange={handleChange} className="input" />

                <select name="sex" onChange={handleChange} className="input">
                    <option value="">Sex</option>
                    <option>male</option>
                    <option>female</option>
                </select>

                <select name="smoker" onChange={handleChange} className="input">
                    <option value="">Smoker</option>
                    <option>yes</option>
                    <option>no</option>
                </select>

                <select name="region" onChange={handleChange} className="input">
                    <option>southwest</option>
                    <option>southeast</option>
                    <option>northwest</option>
                    <option>northeast</option>
                </select>

                <button className="col-span-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md">
                    Predict
                </button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-emerald-100 dark:bg-slate-700 rounded-xl">
                    <h3 className="text-xl font-semibold">
                        Predicted Cost: ${Math.floor(result.cost.model, 2)}
                    </h3>
                    <p>Recommended Cost: ${Math.floor(result.cost.regressor, 2)}</p>
                </div>
            )}
        </div>
    );
}