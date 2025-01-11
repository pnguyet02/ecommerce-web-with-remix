import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { User } from "~/types";

type LoaderData = {
  user: User | null; // user có thể là null nếu chưa đăng nhập
};

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const { user } = useLoaderData<LoaderData>(); // Nếu user là null thì người dùng chưa đăng nhập
  const navigate = useNavigate();

  const toggleDropdown = (menu: string) => {
    setIsDropdownOpen((prev) => (prev === menu ? null : menu));
  };

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây (ví dụ: xóa session, cookie)
    // Sau khi đăng xuất, điều hướng về trang chủ hoặc trang login
    navigate("/login");
  };

  return (
    <nav>
      {/* Thanh điều hướng chính */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
        </div>
      </nav>

      {/* Thanh menu */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="w-full md:block md:w-auto">
            <ul className="flex flex-col md:flex-row space-x-8 rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className="text-lg text-gray-900 dark:text-white font-bold"
                >
                  Trang chủ
                </Link>
              </li>
              {/* Dropdown Sản phẩm */}
              <li className="relative">
                <Link
                  to="/products"
                  className="text-lg text-gray-900 dark:text-white font-bold"
                  onClick={() => setIsDropdownOpen(null)}
                >
                  Sản phẩm
                </Link>
                <button
                  className="ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown("products");
                  }}
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen === "products" && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          to={`?categoryId=1`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Phụ kiện handmade
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`?categoryId=2`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Đồ trang trí handmade
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              {/* Dropdown Xu hướng */}
              <li className="relative">
                <Link
                  to="/trends"
                  className="text-lg text-gray-900 dark:text-white font-bold"
                  onClick={() => setIsDropdownOpen(null)}
                >
                  Xu hướng
                </Link>
                <button
                  className="ml-2"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown("trends");
                  }}
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isDropdownOpen === "trends" && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          to="/trends/news"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Tin tức tổng hợp
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/trends/designs"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Sản phẩm thiết kế
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-lg text-gray-900 dark:text-white font-bold"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-lg text-gray-900 dark:text-white font-bold"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            {/* Nếu đã đăng nhập, hiển thị các chức năng tương ứng */}
            {user ? (
              <>
                {/* Hiển thị giỏ hàng và đơn hàng cho user và admin */}
                <Link to="/cart" className="font-bold">
                  Giỏ hàng
                </Link>
                <Link to="/orders" className="font-bold">
                  Đơn hàng
                </Link>
                {user.role === "admin" && (
                  <>
                    {/* Nếu là admin, hiển thị các trang quản lý */}
                    <Link to="/admin/dashboard" className="font-bold">
                      Dashboard
                    </Link>
                    <Link to="/admin/products" className="font-bold">
                      Quản lý Sản phẩm
                    </Link>
                    <Link to="/admin/users" className="font-bold">
                      Quản lý Người dùng
                    </Link>
                  </>
                )}
                <span>{user.name}</span>
                <button
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </nav>
  );
}
