// app/routes/products/route.tsx
import { useLoaderData } from "@remix-run/react";
import { loader } from "./loader";
import type { LoaderData } from "./loader";
import ProductList from "~/components/products/ProductList";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import Pagination from "~/components/Pagination";
import CategoryFilter from "~/components/products/CategoryFilter";
import SearchSortForm from "~/components/products/SearchSortForm";

export { loader };

export default function Products() {
  const { products, totalPages, currentPage, searchQuery, sort, categories } =
    useLoaderData<LoaderData>();

  const baseUrl = "/products";

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="p-8 mt-8 flex-grow flex flex-col md:flex-row">
        {/* Cột danh mục */}
        <CategoryFilter categories={categories} baseUrl={baseUrl} />

        {/* Cột sản phẩm */}
        <div className="flex-grow md:ml-6">
          <h1 className="text-2xl font-semibold">Sản phẩm của chúng tôi</h1>

          {/* Tìm kiếm và sắp xếp */}
          <SearchSortForm
            searchQuery={searchQuery}
            sort={sort}
            baseUrl={baseUrl}
          />

          {/* Hiển thị sản phẩm */}
          <ProductList products={products} />

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
      <Footer />
    </div>
  );
}
