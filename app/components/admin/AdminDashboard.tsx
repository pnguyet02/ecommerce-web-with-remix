// src/components/AdminDashboard.tsx
import { Link, Outlet } from "@remix-run/react";
import { FaUsers, FaBox, FaClipboardList, FaCogs } from "react-icons/fa"; // Icons from react-icons

// Update the component to accept `children` as a prop
const AdminDashboard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Admin Dashboard
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/users"
              className="flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded transition"
            >
              <FaUsers className="w-5 h-5" />
              <span>Manage Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded transition"
            >
              <FaBox className="w-5 h-5" />
              <span>Manage Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className="flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded transition"
            >
              <FaCogs className="w-5 h-5" />
              <span>Product Categories</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/posts"
              className="flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded transition"
            >
              <FaClipboardList className="w-5 h-5" />
              <span>Manage Posts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/post-categories"
              className="flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded transition"
            >
              <FaClipboardList className="w-5 h-5" />
              <span>Post Categories</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded transition"
            >
              <FaClipboardList className="w-5 h-5" />
              <span>Manage Orders</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Render children passed from the route */}
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AdminDashboard;
