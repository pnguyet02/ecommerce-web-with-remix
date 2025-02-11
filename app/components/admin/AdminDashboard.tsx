import { Link, Outlet, useLocation } from "@remix-run/react";
import {
  FaUsers,
  FaBox,
  FaClipboardList,
  FaCogs,
  FaChartBar,
} from "react-icons/fa"; // Thêm icon Dashboard
import { MdDashboard } from "react-icons/md";

// Cấu trúc điều hướng cho breadcrumb
const breadcrumbs: { [key: string]: string } = {
  "/admin": "Dashboard",
  "/admin/users": "Manage Users",
  "/admin/products": "Manage Products",
  "/admin/categories": "Product Categories",
  "/admin/posts": "Manage Posts",
  "/admin/post-categories": "Post Categories",
  "/admin/orders": "Manage Orders",
};

const AdminDashboard = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const pageTitle = breadcrumbs[location.pathname] || "Admin Dashboard";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          <MdDashboard className="inline-block w-6 h-6 mr-2" /> Admin Panel
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
          {/* <li>
            <Link
              to="/admin/post-categories"
              className="flex items-center space-x-3 text-white hover:bg-blue-700 p-2 rounded transition"
            >
              <FaClipboardList className="w-5 h-5" />
              <span>Post Categories</span>
            </Link>
          </li> */}
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
      <div className="flex-1 bg-gray-100 p-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-gray-600 text-sm">
          <Link to="/admin" className="hover:underline">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">{pageTitle}</span>
        </div>

        {/* Overview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <FaChartBar className="text-blue-500" /> {pageTitle}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome to the admin dashboard!
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div className="p-4 bg-blue-100 rounded-lg shadow-md flex items-center space-x-4">
              <FaUsers className="text-blue-600 w-10 h-10" />
              <div>
                <p className="text-gray-800 font-semibold text-lg">1,200</p>
                <p className="text-gray-600 text-sm">Total Users</p>
              </div>
            </div>

            <div className="p-4 bg-green-100 rounded-lg shadow-md flex items-center space-x-4">
              <FaBox className="text-green-600 w-10 h-10" />
              <div>
                <p className="text-gray-800 font-semibold text-lg">250</p>
                <p className="text-gray-600 text-sm">Products Listed</p>
              </div>
            </div>

            <div className="p-4 bg-yellow-100 rounded-lg shadow-md flex items-center space-x-4">
              <FaClipboardList className="text-yellow-600 w-10 h-10" />
              <div>
                <p className="text-gray-800 font-semibold text-lg">85</p>
                <p className="text-gray-600 text-sm">Pending Orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Render children passed from the route */}
        <div className="mt-6">{children || <Outlet />}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
