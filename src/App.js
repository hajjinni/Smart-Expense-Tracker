import { useEffect, useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseChart from "./components/ExpenseChart";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [filters, setFilters] = useState({
    category: "All",
    from: "",
    to: "",
    min: "",
    max: "",
    sort: "latest",
  });


  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);


  useEffect(() => {
    if (loaded) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses, loaded]);


  const filteredExpenses = expenses
    .filter(e => {
      if (filters.category !== "All" && e.category !== filters.category) {
        return false;
      }
      if (filters.from && new Date(e.date) < new Date(filters.from)) {
        return false;
      }
      if (filters.to && new Date(e.date) > new Date(filters.to)) {
        return false;
      }
      if (filters.min && e.amount < Number(filters.min)) {
        return false;
      }
      if (filters.max && e.amount > Number(filters.max)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "latest") return new Date(b.date) - new Date(a.date);
      if (filters.sort === "oldest") return new Date(a.date) - new Date(b.date);
      if (filters.sort === "high") return b.amount - a.amount;
      if (filters.sort === "low") return a.amount - b.amount;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-pink-300 to-purple-700 p-6"> 
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 shadow-2xl">
        <Header />

        <SummaryCards expenses={filteredExpenses} />

        <div className="grid md:grid-cols-2 gap-6">
          <ExpenseForm setExpenses={setExpenses} />
          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <ExpenseList
            expenses={filteredExpenses}
            setExpenses={setExpenses}
          />
          <ExpenseChart expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
}
