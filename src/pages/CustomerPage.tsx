import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getusers } from "../utils/users";


export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<any>([])


  const token = useSelector((state:any)=>state.user.loggedUser.token)

  useEffect(()=>{
    const listOrders = async () =>{
      try{
        const response = await getusers(token) as {
          status: number;
          data: any[];
        };
        // console.log(response.data)
        setUsers(response.data);
      }catch(err){
        console.log(err)
      }
    }
    listOrders();
  },[])

  const filtered = users.filter((cust:any) => {
    return (
      (statusFilter ? cust.status === statusFilter : true) &&
      (cust?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust?.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <th className="p-3 text-left">Mobile</th>
              {/* <th className="p-3 text-left">Total Spent</th> */}
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Joined</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((cust:any) => (
              <tr key={cust.id} className="border-t text-sm">
                <td className="p-3 font-medium">{cust?.username}</td>
                <td className="p-3">{cust.email}</td>
                <td className="p-3">{cust?.mobile}</td>
                {/* <td className="p-3">${cust.totalSpent.toFixed(2)}</td> */}
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
                <td className="p-3">{new Date(cust.createdAt).toLocaleDateString()}</td>
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
              <p><strong>Name:</strong> {selectedCustomer.username}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Phone:</strong> {selectedCustomer.mobile}</p>
              <p><strong>Pincode:</strong> {selectedCustomer.pincode}</p>
              {/* <p><strong>Status:</strong> {selectedCustomer.status}</p> */}
              {/* <p><strong>Orders:</strong> {selectedCustomer.orders}</p> */}
              {/* <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent.toFixed(2)}</p> */}
              <p><strong>Joined:</strong> {new Date(selectedCustomer?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
