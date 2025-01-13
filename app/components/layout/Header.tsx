import { useState, useEffect } from "react";
import { Link, useNavigate, useLoaderData } from "@remix-run/react";
import { getUserFromSession } from "~/sessions";

// Cập nhật kiểu dữ liệu cho loader
type LoaderData = {
  user: { id: string; name: string; role: string } | null;
};

export const loader = async ({ request }: { request: Request }) => {
  const user = await getUserFromSession(request);
  return {
    user: user ? { id: user.userId, name: user.name, role: user.role } : null,
  };
};

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { user } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  // Khi người dùng đăng nhập, cập nhật lại giao diện
  useEffect(() => {
    if (user) {
      console.log("User logged in:", user); // Kiểm tra thông tin người dùng
    } else {
      console.log("User is not logged in");
    }
  }, [user]);

  const toggleDropdown = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const handleLogout = async () => {
    await fetch("/logout", { method: "POST" });
    navigate("/login");
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
