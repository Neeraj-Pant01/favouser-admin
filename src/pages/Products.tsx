import { useState, useMemo, useEffect } from "react";
import { deleteProduct, getProducts } from "../utils/products";
import { useSelector } from "react-redux";
import Loader from "../componenets/Loader";
import EditProductModal from "../componenets/EditProductModel";


export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [products, setProducts] = useState<any[]>([]);
  const [confirmDeleteProductId, setConfirmDeleteProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null);




  const token = useSelector((state: any) => state.user.loggedUser.token)

  useEffect(() => {
    setLoading(true)
    const allProducts = async () => {
      try {
        const response = await getProducts(token) as {
          status: number;
          data: any[];
        };
        // console.log(response.data)
        setProducts(response.data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err)
      }
    }
    allProducts();
  }, [])

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((p) => p.categories.includes(categoryFilter));
    }

    return result;
  }, [search, categoryFilter, products]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const confirmdelete = async () => {
    setDeleteLoading(true)
    try {
      const response: any = await deleteProduct(token, confirmDeleteProductId);
      if (response.status === 200) {
        setMessage("Product deleted successfully")
        setProducts(products.filter((p) => p._id !== confirmDeleteProductId))
        setTimeout(() => {
          setConfirmDeleteProductId(null)
          setMessage("")
        }, 2000);
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setDeleteLoading(false)
    }
  }

  return (
    <>
      {
        loading ?
          <Loader />
          :
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
                <option value="men">Men</option>
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
                    <th className="p-3 cursor-pointer" >
                      Icon
                    </th>
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
                      <td className="p-3"><img src={p?.coverImage} className="w-[30px] h-[30px] rounded-lg" alt="" /></td>
                      <td className="p-3">{p?.productName}</td>
                      <td className="p-3">{p?.categories.map((c: any, i: number) => <span key={i}>{c},</span>)}</td>
                      <td className="p-3">₹{p?.price}</td>
                      <td className="p-3">{p?.inStocks}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs rounded ${p?.inStocks > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                            }`}
                        >
                          {p?.inStocks > 0 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        <button className="text-blue-600 hover:underline"
                          onClick={() => setEditingProduct(p)}>Edit</button>
                        <button onClick={() => setConfirmDeleteProductId(p?._id)} className="text-red-600 hover:underline">Delete</button>
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

            {editingProduct && (
              <EditProductModal
                token={token}
                product={editingProduct}
                onClose={() => setEditingProduct(null)}
                onUpdated={(updated) => {
                  setProducts((prev) =>
                    prev.map((p) => (p._id === updated._id ? updated : p))
                  );
                }}
              />
            )}



            {confirmDeleteProductId && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] md:w-[400px]">
                  <h2 className="text-xl font-semibold mb-3 text-center">🗑️ Delete Product?</h2>
                  <p className="text-sm text-gray-600 text-center mb-5">
                    Are you sure you want to delete this product? This action cannot be undone.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setConfirmDeleteProductId(null)}
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium"
                    >
                      Cancel
                    </button>
                    {
                      deleteLoading ?
                        <button
                          disabled={true}
                          className="px-4 py-2 cursor-not-allowed rounded bg-red-300  text-white text-sm font-medium"
                        >
                          deleting..
                        </button>
                        :
                        <button
                          onClick={confirmdelete}
                          className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
                        >
                          Yes, Delete
                        </button>
                    }
                  </div>
                  <p className="text-center mt-2 text-blue-500 font-semibold">{message}</p>
                </div>
              </div>
            )}

          </div>
      }
    </>
  );
}
