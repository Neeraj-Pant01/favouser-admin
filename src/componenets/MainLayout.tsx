import  { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
