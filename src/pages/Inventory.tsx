import  { useState } from "react";

const products = [
  {
    id: "PROD001",
    name: "Graphic T-Shirt",
    stock: 45,
    sales: 120,
    category: "T-Shirts",
    color: "Black",
  },
  {
    id: "PROD002",
    name: "Printed Cap",
    stock: 5,
    sales: 60,
    category: "Accessories",
    color: "Red",
  },
  {
    id: "PROD003",
    name: "Hoodie",
    stock: 0,
    sales: 33,
    category: "Hoodies",
    color: "Gray",
  },
];

export default function InventoryPage() {
  const [filter, setFilter] = useState("");

  const filtered = products.filter((p) => {
    if (filter === "low") return p.stock > 0 && p.stock <= 10;
    if (filter === "out") return p.stock === 0;
    return true;
  });

  const stockStatus = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 10) return "Low Stock";
    return "In Stock";
  };

  const stockColor = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-700";
    if (stock <= 10) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">📦 Inventory Management</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Products</option>
          <option value="low">Low Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Color</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Sales</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3 capitalize">{item.color}</td>
                <td className="p-3">{item.stock}</td>
                <td className="p-3">{item.sales}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${stockColor(
                      item.stock
                    )}`}
                  >
                    {stockStatus(item.stock)}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button className="text-blue-600 hover:underline text-sm mr-2">
                    Restock
                  </button>
                  <button className="text-gray-600 hover:underline text-sm">
                    Mark Out
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-400">
                  No matching products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
