export default function Dashboard() {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-xl">📦 Total Products</div>
          <div className="p-4 bg-white shadow rounded-xl">🛒 Total Orders</div>
          <div className="p-4 bg-white shadow rounded-xl">💰 Total Revenue</div>
        </div>
      </div>
    );
  }
  