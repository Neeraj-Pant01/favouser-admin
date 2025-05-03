import { useState, useMemo, useEffect } from "react";
import { getProducts } from "../utils/products";
import { useSelector } from "react-redux";
  

export default function Products() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [products, setProducts] = useState<any[]>([]);
  
  
  const token = useSelector((state:any)=>state.user.loggedUser.token)

  useEffect(()=>{
    const allProducts = async () =>{
      try{
        const response = await getProducts(token) as {
          status: number;
          data: any[];
        };
        // console.log(response.data)
        setProducts(response.data);
      }catch(err){
        console.log(err)
      }
    }
    allProducts();
  },[])

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
  }, [search, categoryFilter,products]);

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
                <td className="p-3">{p?.categories.map((c : any,i:number)=><span key={i}>{c},</span>)}</td>
                <td className="p-3">₹{p?.price}</td>
                <td className="p-3">{p?.inStocks}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      p?.inStocks > 0
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p?.inStocks > 0 ? "Active" : "Inactive"}
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
