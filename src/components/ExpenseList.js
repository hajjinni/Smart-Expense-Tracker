import { CATEGORIES } from "../config/categories";


export default function ExpenseList({ expenses, setExpenses }) {
  const deleteExpense = id => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow h-[420px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Recent Expenses</h2>
        <span className="text-sm text-gray-500">
          {expenses.length} expenses
        </span>
      </div>

      {expenses.length === 0 && (
        <p className="text-gray-400 text-center mt-10">
          No expenses found
        </p>
      )}

      {expenses.map(exp => {
        const meta = CATEGORIES[exp.category];

        return (
          <div
            key={exp.id}
            className="flex justify-between items-center border-b py-3 last:border-none"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: meta.color + "20" }}
              >
                <i
                  className={`fa-solid ${meta.icon}`}
                  style={{ color: meta.color }}
                ></i>
              </div>

              <div>
                <p className="font-medium">{exp.category}</p>
                <p className="text-xs text-gray-500">
                  {exp.note || "No note"} •{" "}
                  {new Date(exp.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">₹{exp.amount}</p>
              <button onClick={() => deleteExpense(exp.id)}>
                <i className="fa-solid fa-trash text-gray-400 hover:text-red-500"></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
