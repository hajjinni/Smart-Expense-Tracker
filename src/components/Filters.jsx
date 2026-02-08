import { CATEGORIES } from "../config/categories";


export default function Filters({ filters, setFilters }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-4">Filters & Sort</h2>

      <select
        className="w-full border p-2 rounded mb-2"
        value={filters.category}
        onChange={e => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="All">All Categories</option>
        {Object.keys(CATEGORIES).map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, from: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, to: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="number"
          placeholder="Min Amount"
          className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, min: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Amount"
          className="border p-2 rounded"
          onChange={e => setFilters({ ...filters, max: e.target.value })}
        />
      </div>

      <select
        className="w-full border p-2 rounded"
        value={filters.sort}
        onChange={e => setFilters({ ...filters, sort: e.target.value })}
      >
        <option value="latest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="high">Highest Amount</option>
        <option value="low">Lowest Amount</option>
      </select>
    </div>
  );
}
