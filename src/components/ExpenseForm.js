import { useState } from "react";
import { CATEGORIES } from "../config/categories";

export default function ExpenseForm({ setExpenses }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    category: "Food",
    note: "",
  });

  const submit = () => {
    if (!form.amount || !form.date) return;

    setExpenses(prev => [
      ...prev,
      {
        id: Date.now(),
        amount: Number(form.amount),
        category: form.category,
        date: form.date,
        note: form.note,
      },
    ]);

    setForm({ amount: "", date: "", category: "Food", note: "" });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-4">Add New Expense</h2>

      <input
        type="number"
        placeholder="Amount"
        className="w-full border p-2 rounded mb-3"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
      />

      <input
        type="date"
        className="w-full border p-2 rounded mb-3"
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })}
      />

      <div className="grid grid-cols-4 gap-3 mb-3">
        {Object.keys(CATEGORIES).map(cat => (
          <button
            key={cat}
            onClick={() => setForm({ ...form, category: cat })}
            className={`border rounded-lg p-3 ${
              form.category === cat ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <i
              className={`fa-solid ${CATEGORIES[cat].icon}`}
              style={{ color: CATEGORIES[cat].color }}
            />
            <div className="text-xs">{cat}</div>
          </button>
        ))}
      </div>

      <textarea
        placeholder="Note"
        className="w-full border p-2 rounded mb-3"
        value={form.note}
        onChange={e => setForm({ ...form, note: e.target.value })}
      />

      <button
        onClick={submit}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg"
      >
        Add Expense
      </button>
    </div>
  );
}
