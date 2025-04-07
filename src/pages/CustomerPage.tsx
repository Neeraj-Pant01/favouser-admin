import React, { useState } from "react";

const customers = [
  {
    id: "CUST001",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 555 987 654",
    address: "123 Maple St, New York",
    status: "Active",
    orders: 12,
    joined: "2024-11-15",
    totalSpent: 1200,
  },
  {
    id: "CUST002",
    name: "Mark Lewis",
    email: "mark@example.com",
    phone: "+1 444 321 000",
    address: "45 Oak St, Texas",
    status: "Inactive",
    orders: 3,
    joined: "2023-09-10",
    totalSpent: 150,
  },
];

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = customers.filter((cust) => {
    return (
      (statusFilter ? cust.status === statusFilter : true) &&
      (cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">👥 Customers</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="border p-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Orders</th>
              <th className="p-3 text-left">Total Spent</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cust) => (
              <tr key={cust.id} className="border-t text-sm">
                <td className="p-3 font-medium">{cust.name}</td>
                <td className="p-3">{cust.email}</td>
                <td className="p-3">{cust.orders}</td>
                <td className="p-3">${cust.totalSpent.toFixed(2)}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      cust.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cust.status}
                  </span>
                </td>
                <td className="p-3">{cust.joined}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedCustomer(cust)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-400">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Customer Details */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Customer Profile</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-xl"
              >
                &times;
              </button>
            </div>

            <div className="text-sm">
              <p><strong>Name:</strong> {selectedCustomer.name}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Address:</strong> {selectedCustomer.address}</p>
              <p><strong>Status:</strong> {selectedCustomer.status}</p>
              <p><strong>Orders:</strong> {selectedCustomer.orders}</p>
              <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent.toFixed(2)}</p>
              <p><strong>Joined:</strong> {selectedCustomer.joined}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
