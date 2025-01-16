import { Form, Link, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";

// Đảm bảo rằng `user` có thể là null và có giá trị mặc định nếu không được truyền vào
type HeaderProps = {
  user?: { id: number; name: string; role: string } | null; // Đặt user là optional
  onUserUpdate?: (
    user: { id: number; name: string; role: string } | null
  ) => void; // Callback để cập nhật trạng thái người dùng
};

export default function Header({ user = null, onUserUpdate }: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  // Cập nhật trạng thái khi user thay đổi
  useEffect(() => {
    if (user) {
      onUserUpdate?.(user);
    } else {
      onUserUpdate?.(null);
    }
  }, [user, onUserUpdate]);

  const toggleDropdown = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <nav>
      {/* Thanh điều hướng chính */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/images/logo.jpg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
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
                <div className="flex items-center">
                  <Link
                    to="/products"
                    className="text-lg text-gray-900 dark:text-white font-bold"
                    onClick={() => setActiveMenu(null)}
                  >
                    Sản phẩm
                  </Link>
                  <button
                    className="ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
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
                </div>
                {activeMenu === "products" && (
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
                <div className="flex items-center">
                  <Link
                    to="/blogs"
                    className="text-lg text-gray-900 dark:text-white font-bold"
                    onClick={() => setActiveMenu(null)}
                  >
                    Xu hướng
                  </Link>
                  <button
                    className="ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDropdown("blogs");
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
                </div>
                {activeMenu === "blogs" && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          to={`?blogId=1`}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Tin tức tổng hợp
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`?blogId=2`}
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
            {user ? (
              <>
                <span>{user.name}</span>
                {user.role === "user" && (
                  <>
                    {/* Chức năng giỏ hàng */}
                    <Link
                      to="/cart"
                      className="text-sm text-white bg-green-600 px-3 py-1 rounded"
                    >
                      Giỏ hàng
                    </Link>
                    {/* Chức năng chỉnh sửa tài khoản */}
                    <Link
                      to="/profile/edit"
                      className="text-sm text-white bg-blue-600 px-3 py-1 rounded"
                    >
                      Edit Profile
                    </Link>
                  </>
                )}
                {user.role === "admin" && (
                  <button
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => navigate("/admin/dashboard")} // Điều hướng admin tới trang dashboard
                  >
                    Admin Dashboard
                  </button>
                )}
                {/* Form logout */}
                <Form method="post" action="/logout">
                  <button
                    type="submit"
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </Form>
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
