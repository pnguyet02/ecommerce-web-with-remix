import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { loader } from "./loader";
import type { LoaderData } from "./loader";
import AdminProductList from "~/components/admin/AdminProductList";
import Pagination from "~/components/Pagination";
import CategoryFilter from "~/components/products/CategoryFilter";
import SearchSortForm from "~/components/products/SearchSortForm";
import React, { useEffect } from "react";
///lỗi
export { loader };

export default function ManageProducts() {
  const { products, totalPages, currentPage, searchQuery, sort, categories } =
    useLoaderData<LoaderData>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const baseUrl = "/admin/products";

  // Handle page change by updating the search params
  const handlePageChange = (page: number) => {
    setSearchParams({ ...searchParams, page: page.toString() }); // Update the page parameter
  };

  // Handle "Add Product" button click
  const handleAddProduct = () => navigate("/admin/products/add");

  // This effect is used to update the loader when searchParams change
  useEffect(() => {
    // Set any additional params if needed
    setSearchParams(searchParams);
  }, [searchParams]); // Dependency on searchParams change

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="p-8 mt-8 flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-8 md:mb-0">
          <CategoryFilter categories={categories} baseUrl={baseUrl} />
        </div>
        <div className="flex-grow md:ml-6">
          <h1 className="text-2xl font-semibold mb-4">Quản lý Sản phẩm</h1>
          <div className="flex justify-between mb-4 items-center space-x-4">
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-sm flex-shrink-0"
            >
              Thêm sản phẩm
            </button>
            <div className="flex space-x-4">
              <SearchSortForm
                searchQuery={searchQuery}
                sort={sort}
                baseUrl={baseUrl}
              />
            </div>
          </div>
          <AdminProductList
            products={products}
            onEdit={(id: number) => {
              // Handle edit logic
            }}
            onDelete={(id: number) => {
              // Handle delete logic
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
            sort={sort}
            baseUrl={baseUrl}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}
