import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrders } from "../utils/Orders";
import { Link } from "react-router-dom";


export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState("date");
  const [orders, setOrders] = useState<any>([])
  const [cancelled, setCancelled] = useState<any>()

  const token = useSelector((state:any)=>state.user.loggedUser.token)

    useEffect(()=>{
      const listOrders = async () =>{
        try{
          const response = await getOrders(token) as {
            status: number;
            data: any[];
          };
          // console.log(response.data)
          setOrders(response.data);
        }catch(err){
          console.log(err)
        }
      }
      listOrders();
    },[])

  const filteredOrders = orders
    .filter((order:any) => (selectedStatus ? order.status === selectedStatus : true) && (cancelled ? order.isCancelled === true : order.isCancelled === false))
    .sort((a:any, b:any) => {
      if (sortBy === "total") return b.amount - a.amount;
      if (sortBy === "date") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
          <option value="pending">pending</option>
          <option value="delivered">delivered</option>
          <option value="shipped">shipped</option>
        </select>

        <select
          className="border p-2 rounded w-full md:w-1/3"
          value={cancelled ? "true" : "false"}
          onChange={(e) => setCancelled(e.target.value === "true")}
        >
          <option value="false">Active</option>
          <option value="true">Cancelled</option>
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
              <th className="p-3 text-left">Buyer ID</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Order Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order:any) => (
              <tr key={order.id} className="border-t text-sm">
                <td className="p-3">{order?._id}</td>
                <td className="p-3">{order?.userId}</td>
                <td className="p-3">₹{order?.amount?.toFixed(2)}</td>
                
                 <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                    {order.status}
                  </span>
                </td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${order.isCancelled  ? "bg-red-100 text-red-500" : "bg-green-100 text-green-800"}`}>
                    {order.isCancelled ? 'Cancelled' : 'Active'}
                  </span>
                </td>

                <td className="p-3">{new Date(order?.createdAt).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() =>{setSelectedOrder(order)
                      // console.log(order)
                    }}
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
              <p><strong>Name:</strong> {selectedOrder?.buyer?.name || "NA"}</p>
              <p><strong>Email:</strong> {selectedOrder?.buyer?.email || "NA"}</p>
              <p><strong>Phone:</strong> {selectedOrder?.mobileNumber || 'NA'}</p>
              <p><strong>Address:</strong> {selectedOrder?.address || "NA"}</p>
              <p><strong>LandMark:</strong> {selectedOrder?.landmark || "NA"}</p>
              <p><strong>Area:</strong> {selectedOrder?.area || "NA"}</p>
              <p><strong>state:</strong> {selectedOrder?.state || "NA"}</p>

              <p><strong>PinCode:</strong> {selectedOrder?.pincode || "NA"}</p>
              <p><strong>Quantity:</strong> {selectedOrder?.quantity || "NA"}</p>

            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">Item</h4>
                  <li className="text-sm flex items-center gap-3">
                    {
                      selectedOrder?.productId
                    }
                    <Link className="text-blue-500 underline" to={`/${selectedOrder?.productId}`}>Visit</Link>
                  </li>
            </div>

            <div className="mt-4 font-medium text-right text-gray-700">
              Total: ₹{selectedOrder?.amount?.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
