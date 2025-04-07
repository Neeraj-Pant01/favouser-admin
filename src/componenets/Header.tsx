import { FiBell, FiMenu } from "react-icons/fi";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:py-4 md:px-6">
      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={onMenuClick}>
          <FiMenu className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Logo (Optional: hidden on mobile if you want) */}
      <div className="hidden md:block text-lg font-semibold text-gray-800">
        🛍️ FavoUser Admin
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Search Bar (visible on md and above) */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 text-sm"
          />
        </div>

        {/* Notification Icon */}
        <button className="relative">
          <FiBell className="text-xl text-gray-700" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-ping" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden md:block text-sm font-medium text-gray-700">
            Admin
          </div>
        </div>
      </div>
    </header>
  );
}
