import { CATEGORIES } from "../config/categories";

export default function SummaryCards({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const topCategory =
    Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      <div className="bg-indigo-50 p-4 rounded-xl">
        <p className="text-gray-500 text-sm">Total Spent</p>
        <h3 className="text-2xl font-bold text-indigo-600">₹{total}</h3>
      </div>

      <div className="bg-emerald-50 p-4 rounded-xl">
        <p className="text-gray-500 text-sm">Entries</p>
        <h3 className="text-2xl font-bold text-emerald-600">
          {expenses.length}
        </h3>
      </div>

      <div className="bg-rose-50 p-4 rounded-xl">
        <p className="text-gray-500 text-sm">Top Category</p>
        <div className="flex items-center gap-2">
          <i
            className={`fa-solid ${CATEGORIES[topCategory]?.icon || "fa-box"}`}
            style={{ color: CATEGORIES[topCategory]?.color }}
          />
          <h3 className="text-lg font-semibold">{topCategory}</h3>
        </div>
      </div>

      <div className="bg-sky-50 p-4 rounded-xl">
        <p className="text-gray-500 text-sm">Average / Entry</p>
        <h3 className="text-2xl font-bold text-sky-600">
          ₹{expenses.length ? Math.round(total / expenses.length) : 0}
        </h3>
      </div>
    </div>
  );
}
