import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
