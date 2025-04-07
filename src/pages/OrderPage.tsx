import { useState } from "react";

const sampleOrders = [
  {
    id: "ORD001",
    buyer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      address: "123 Main St, Springfield",
    },
    status: "Delivered",
    total: 89.99,
    date: "2025-04-01",
    items: [
      { name: "Printed T-Shirt", qty: 2, price: 25 },
      { name: "Cap", qty: 1, price: 15 },
    ],
  },
  {
    id: "ORD002",
    buyer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 111 222 333",
      address: "789 Ocean Dr, Miami",
    },
    status: "Pending",
    total: 49.99,
    date: "2025-04-05",
    items: [
      { name: "Custom Hoodie", qty: 1, price: 49.99 },
    ],
  },
  // Add more dummy orders...
];

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState("date");

  const filteredOrders = sampleOrders
    .filter(order => (selectedStatus ? order.status === selectedStatus : true))
    .sort((a, b) => {
      if (sortBy === "total") return b.total - a.total;
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">📦 Orders</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="border p-2 rounded w-full md:w-1/3"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>

        <select
          className="border p-2 rounded w-full md:w-1/3"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="total">Sort by Amount</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Buyer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="border-t text-sm">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.buyer.name}</td>
                <td className="p-3">${order.total.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    More Info
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order: {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-xl">&times;</button>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600">Buyer Info</h4>
              <p><strong>Name:</strong> {selectedOrder.buyer.name}</p>
              <p><strong>Email:</strong> {selectedOrder.buyer.email}</p>
              <p><strong>Phone:</strong> {selectedOrder.buyer.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.buyer.address}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Items</h4>
              <ul className="space-y-2">
                {selectedOrder.items.map((item: any, i: number) => (
                  <li key={i} className="text-sm">
                    🛍️ {item.name} — Qty: {item.qty} — ${item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 font-medium text-right text-gray-700">
              Total: ${selectedOrder.total.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
