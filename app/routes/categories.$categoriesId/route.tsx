import { useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderData } from "./loader"; // Import the type from loader.tsx
import ProductList from "~/components/products/ProductList";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";

export default function Category() {
  const { products, categoryName, totalPages, currentPage, totalProducts } =
    useLoaderData<LoaderData>();
  const navigate = useNavigate();

  const goToPage = (page: number) => {
    navigate(`?page=${page}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="p-8 mt-8 flex-grow">
        <h1 className="text-2xl font-semibold mb-4">{categoryName}</h1>
        <p className="text-sm text-gray-400">
          Hiển thị {products.length} sản phẩm trên tổng số {totalProducts} sản
          phẩm
        </p>

        {/* Display product list */}
        {products.length === 0 ? (
          <p className="mt-4 text-center">
            Không có sản phẩm nào trong danh mục này.
          </p>
        ) : (
          <ProductList products={products} />
        )}

        {/* Pagination */}
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === 1}
            onClick={() => goToPage(1)}
          >
            &laquo; Trang đầu
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Trang trước
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => goToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Trang sau
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(totalPages)}
          >
            Trang cuối &raquo;
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
