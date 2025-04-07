import React from "react";

export default function ReportsPage() {
  const summaryData = [
    { label: "Total Sales", value: "$124,500", color: "bg-green-100 text-green-700" },
    { label: "Total Orders", value: "1,240", color: "bg-blue-100 text-blue-700" },
    { label: "Total Customers", value: "860", color: "bg-yellow-100 text-yellow-800" },
    { label: "Refunds", value: "$1,200", color: "bg-red-100 text-red-700" },
  ];

  const topProducts = [
    { name: "Printed T-Shirt", sales: 320, revenue: "$9,600" },
    { name: "Cap", sales: 210, revenue: "$3,150" },
    { name: "Hoodie", sales: 185, revenue: "$7,400" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">📊 Reports Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {summaryData.map((item, idx) => (
          <div key={idx} className={`p-4 rounded shadow ${item.color}`}>
            <h3 className="text-sm">{item.label}</h3>
            <p className="text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart (Placeholder) */}
      <div className="bg-white p-6 shadow rounded">
        <h3 className="text-lg font-medium mb-4">📈 Monthly Revenue</h3>
        <div className="h-48 flex items-center justify-center text-gray-400 italic">
          {/* You can add Chart.js or Recharts here */}
          Chart placeholder (coming soon)
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white p-6 shadow rounded">
        <h3 className="text-lg font-medium mb-4">🔥 Top Selling Products</h3>
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">Units Sold</th>
              <th className="py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.sales}</td>
                <td className="py-2">{product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders and Customers */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-medium mb-4">📦 Order Stats</h3>
          <ul className="text-sm space-y-2">
            <li>🟢 Delivered Orders: <strong>1,050</strong></li>
            <li>🕒 Pending Orders: <strong>130</strong></li>
            <li>❌ Cancelled Orders: <strong>60</strong></li>
          </ul>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <h3 className="text-lg font-medium mb-4">👥 Customer Overview</h3>
          <ul className="text-sm space-y-2">
            <li>🆕 New Customers (This Month): <strong>120</strong></li>
            <li>🔁 Returning Customers: <strong>300</strong></li>
            <li>🛒 Avg Order Value: <strong>$72.00</strong></li>
          </ul>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-right">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ⬇️ Download Full Report
        </button>
      </div>
    </div>
  );
}
