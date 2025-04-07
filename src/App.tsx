import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./componenets/MainLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/Addproduct";
import OrdersPage from "./pages/OrderPage";
import CustomersPage from "./pages/CustomerPage";
import InventoryPage from "./pages/Inventory";
import ReportsPage from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes inside MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
