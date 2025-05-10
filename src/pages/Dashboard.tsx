import { useEffect, useState } from "react";
import { getProducts } from "../utils/products";
import { useSelector } from "react-redux";
import { getOrders } from "../utils/Orders";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productsPerMonth, setProductsPerMonth] = useState<any[]>([]);

  const token = useSelector((state: any) => state.user.loggedUser.token);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response: any = await getProducts(token);
        const products = response.data;

        setProductCount(products.length);

        // Group by month (using Date object to handle month-year format)
        const monthMap: Record<string, number> = {};

        products.forEach((p: any) => {
          const createdAt = new Date(p.createdAt);
          const monthYear = `${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`; // Format as MM-YYYY

          monthMap[monthYear] = (monthMap[monthYear] || 0) + 1;
        });

        // Convert map to an array and sort by date
        const sorted = Object.entries(monthMap)
          .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
          .map(([monthYear, count]) => ({ monthYear, count }));

        setProductsPerMonth(sorted);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchOrderCounts = async () => {
      try {
        const response: any = await getOrders(token);
        setOrderCount(response.data.length);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCounts();
    fetchOrderCounts();
  }, [token]);

  const barData = {
    labels: ["Products", "Orders"],
    datasets: [
      {
        label: "Count",
        data: [productCount, orderCount],
        backgroundColor: ["#3b82f6", "#10b981"],
      },
    ],
  };

  const pieData = {
    labels: ["Products", "Orders"],
    datasets: [
      {
        label: "Distribution",
        data: [productCount, orderCount],
        backgroundColor: ["#6366f1", "#f59e0b"],
      },
    ],
  };

  const lineData = {
    labels: productsPerMonth.map((item) => item.monthYear), // Use monthYear format (MM-YYYY)
    datasets: [
      {
        label: "Products Added",
        data: productsPerMonth.map((item) => item.count),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-xl">📦 Total Products: {productCount}</div>
        <div className="p-4 bg-white shadow rounded-xl">🛒 Total Orders: {orderCount}</div>
        <div className="p-4 bg-white shadow rounded-xl">💰 Total Revenue</div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Products Added Over Time</h3>
        <Line data={lineData} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Products vs Orders</h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2">Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
