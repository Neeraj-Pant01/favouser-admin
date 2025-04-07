import { useState, useMemo } from "react";

export const sampleProducts = [
    {
      id: 1,
      name: "Graphic T-Shirt",
      category: "T-Shirts",
      price: 25,
      stock: 34,
      status: "Active",
    },
    {
      id: 2,
      name: "Custom Cap",
      category: "Caps",
      price: 15,
      stock: 10,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Phone Grip",
      category: "Accessories",
      price: 8,
      stock: 70,
      status: "Active",
    },
    // Add more products as needed...
  ];
  

export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    let result = [...sampleProducts];

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (statusFilter !== "All") {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (sortKey) {
      result.sort((a, b) => {
        const aValue = a[sortKey as keyof typeof a];
        const bValue = b[sortKey as keyof typeof b];
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [search, categoryFilter, statusFilter, sortKey, sortOrder]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="border px-3 py-1 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-1 rounded-lg"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Caps">Caps</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select
          className="border px-3 py-1 rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => toggleSort("name")}>
                Name {sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="p-3">Category</th>
              <th className="p-3 cursor-pointer" onClick={() => toggleSort("price")}>
                Price {sortKey === "price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => toggleSort("stock")}>
                Stock {sortKey === "stock" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
