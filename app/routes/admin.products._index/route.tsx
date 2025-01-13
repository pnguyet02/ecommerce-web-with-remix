import { useLoaderData, useNavigate } from "@remix-run/react";
import { loader } from "./loader";
import type { LoaderData } from "./loader";
import AdminProductList from "~/components/admin/AdminProductList";
import Pagination from "~/components/Pagination";
import CategoryFilter from "~/components/products/CategoryFilter";
import SearchSortForm from "~/components/products/SearchSortForm";

export { loader };

export default function ManageProducts() {
  const { products, totalPages, currentPage, searchQuery, sort, categories } =
    useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const baseUrl = "/admin/products";

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString()); // Set the page query param

    // Correctly navigate by preserving the base path and appending the query params
    navigate(url.pathname + url.search); // Avoid concatenating the base path with the query string
  };

  // Hàm điều hướng đến trang thêm sản phẩm
  const handleAddProduct = () => {
    navigate("/admin/products/add"); // Điều hướng tới trang thêm sản phẩm
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="p-8 mt-8 flex-grow flex flex-col md:flex-row">
        {/* Sidebar danh mục */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <CategoryFilter categories={categories} baseUrl={baseUrl} />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="flex-grow md:ml-6">
          <h1 className="text-2xl font-semibold mb-4">Quản lý Sản phẩm</h1>

          {/* Nút Thêm sản phẩm và Tìm kiếm & Sắp xếp */}
          <div className="flex justify-between mb-4 items-center space-x-4">
            {/* Nút Thêm sản phẩm */}
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-sm flex-shrink-0"
            >
              Thêm sản phẩm
            </button>

            {/* Tìm kiếm và sắp xếp */}
            <div className="flex space-x-4">
              <SearchSortForm
                searchQuery={searchQuery}
                sort={sort}
                baseUrl={baseUrl}
              />
            </div>
          </div>

          {/* Hiển thị sản phẩm */}
          <AdminProductList
            products={products}
            onEdit={(id: number) => {
              // Handle product edit logic here
            }}
            onDelete={(id: number) => {
              // Handle product delete logic here
            }}
          />

          {/* Phân trang */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
            sort={sort}
            baseUrl={baseUrl}
            onPageChange={handlePageChange} // Truyền hàm xử lý chuyển trang vào
          />
        </div>
      </main>
    </div>
  );
}
