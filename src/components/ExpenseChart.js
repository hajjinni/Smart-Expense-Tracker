import { useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CATEGORIES } from "../config/categories";

export default function ExpenseChart({ expenses }) {
  const [type, setType] = useState("pie");

  const data = Object.values(
    expenses.reduce((acc, e) => {
      acc[e.category] ||= {
        name: e.category,
        value: 0,
        color: CATEGORIES[e.category].color,
        icon: CATEGORIES[e.category].icon,
      };
      acc[e.category].value += Number(e.amount);
      return acc;
    }, {})
  );

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow h-[420px] flex flex-col">
      <div className="flex justify-between mb-2">
        <h2 className="font-semibold">Expense Distribution</h2>
        <div className="flex gap-3">
          <button onClick={() => setType("pie")}>
            <i className="fa-solid fa-chart-pie"></i>
          </button>
          <button onClick={() => setType("bar")}>
            <i className="fa-solid fa-chart-column"></i>
          </button>
        </div>
      </div>


      <ResponsiveContainer width="100%" height={220}>
        {type === "pie" ? (
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={85}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value">
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>

      <div className="mt-3 space-y-2 overflow-y-auto pr-2" style={{ maxHeight: "120px" }}>
        {data.map(d => (
          <div key={d.name} className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <i className={`fa-solid ${d.icon}`} style={{ color: d.color }} />
              {d.name}
            </div>
            <span>
              ₹{d.value} ({total ? ((d.value / total) * 100).toFixed(1) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
