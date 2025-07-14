import { Link, useLocation } from 'react-router-dom';

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Products", path: "/products" },
  { name: "Add Product", path: "/add-product" },
  { name: "Orders", path: "/orders" },
  { name: "Customers", path: "/customers" },
  { name: "Feedbacks", path: "/feedback" },
//   { name: "Coupons", path: "/coupons" },
  { name: "Inventory", path: "/inventory" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  return (
    <div
      className={`
        fixed md:sticky top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:block
      `}
    >
      {/* Mobile Close Button */}
      <div className="md:hidden flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">🛍️ Admin</h1>
        <button onClick={onClose} className="text-2xl">&times;</button>
      </div>

      {/* Desktop Logo */}
      <div className="hidden md:flex items-center justify-center py-6 border-b">
        <h1 className="text-2xl font-bold">🛍️ Admin</h1>
      </div>

      <nav className="p-4 space-y-1">
        {links.map(link => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={`
                block px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"}
              `}
            >
              {link.name}
            </Link>
          );
        })}
        <button
        onClick={()=>{
          localStorage.clear();
          window.location.href = '/'
        }}
              className={`
                block px-4 py-2 rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              `}
            >
              LogOut
            </button>
      </nav>
    </div>
  );
}
