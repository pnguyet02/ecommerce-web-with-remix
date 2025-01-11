import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { useLoaderData, useNavigate } from "@remix-run/react";
import ProductList from "~/components/products/ProductList";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import { Product } from "~/types";

interface LoaderData {
  products: Product[];
  totalPages: number;
  currentPage: number;
  categoryName: string;
  totalProducts: number;
}

export let loader: LoaderFunction = async ({ params, request }) => {
  const categoryId = parseInt(params.categoryId || "", 10);

  // Nếu categoryId không hợp lệ, trả về lỗi 404
  if (isNaN(categoryId)) {
    throw new Response("Danh mục không hợp lệ", { status: 404 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 9;

  // Lấy sản phẩm theo danh mục với phân trang
  const products = await prisma.product.findMany({
    where: { categoryId },
    skip: (page - 1) * limit,
    take: limit,
  });

  // Đếm tổng số sản phẩm trong danh mục
  const totalProducts = await prisma.product.count({
    where: { categoryId },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  // Lấy tên danh mục
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Response("Danh mục không tồn tại", { status: 404 });
  }

  return json<LoaderData>({
    products,
    categoryName: category.name,
    totalPages,
    currentPage: page,
    totalProducts,
  });
};

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

        {/* Hiển thị danh sách sản phẩm */}
        {products.length === 0 ? (
          <p className="mt-4 text-center">
            Không có sản phẩm nào trong danh mục này.
          </p>
        ) : (
          <ProductList products={products} />
        )}

        {/* Phân trang */}
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
