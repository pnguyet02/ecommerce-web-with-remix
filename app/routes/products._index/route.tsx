import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { useLoaderData } from "@remix-run/react";
import ProductList from "~/components/products/ProductList";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import CategoryFilter from "~/components/products/CategoryFilter";
import { Product, CategoryData } from "~/types"; // Import Category kiểu dữ liệu

interface LoaderData {
  products: Product[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  sort: string;
  categories: CategoryData[]; // Danh sách danh mục
}

export let loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || "";
  const categoryId = parseInt(url.searchParams.get("categoryId") || "0");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 9;
  const sort = url.searchParams.get("sort") || "price-asc";

  let orderBy = {};
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  } else if (sort === "name-asc") {
    orderBy = { name: "asc" };
  } else if (sort === "name-desc") {
    orderBy = { name: "desc" };
  }

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchQuery,
      },
      categoryId: categoryId > 0 ? categoryId : undefined, // Lọc theo categoryId nếu có
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy,
  });

  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: searchQuery,
      },
      categoryId: categoryId > 0 ? categoryId : undefined, // Lọc theo categoryId nếu có
    },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  return json<LoaderData>({
    products,
    totalPages,
    currentPage: page,
    searchQuery,
    sort,
    categories: await prisma.category.findMany(), // Lấy danh sách các danh mục
  });
};

export default function Products() {
  const { products, totalPages, currentPage, searchQuery, sort, categories } =
    useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="p-8 mt-8 flex-grow flex flex-col md:flex-row">
        {/* Cột danh mục */}
        <div className="w-full md:w-1/4 bg-gray-800 p-4 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Danh mục</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`/products?categoryId=${category.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột sản phẩm */}
        <div className="flex-grow md:ml-6">
          <h1 className="text-2xl font-semibold">Sản phẩm của chúng tôi</h1>

          {/* Tìm kiếm */}
          <div className="flex justify-between items-center mt-6 mb-6">
            <form
              action="/products"
              method="get"
              className="flex items-center space-x-4"
            >
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Tìm kiếm sản phẩm"
                className="px-4 py-2 bg-gray-700 text-white rounded w-80"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded"
              >
                Tìm kiếm
              </button>
            </form>

            {/* Dropdown sắp xếp */}
            <form
              action="/products"
              method="get"
              className="flex items-center space-x-4"
            >
              <select
                name="sort"
                defaultValue={sort}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
              </select>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded"
              >
                Sắp xếp
              </button>
            </form>
          </div>

          {/* Hiển thị sản phẩm */}
          <ProductList products={products} />

          {/* Phân trang */}
          <div className="mt-8 flex justify-center items-center space-x-4">
            {/* Nút phân trang */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={currentPage === 1}
              onClick={() =>
                (window.location.search = `?page=1&search=${searchQuery}&sort=${sort}`)
              }
            >
              &laquo; Trang đầu
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={currentPage === 1}
              onClick={() =>
                (window.location.search = `?page=${
                  currentPage - 1
                }&search=${searchQuery}&sort=${sort}`)
              }
            >
              Trang trước
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={currentPage === totalPages}
              onClick={() =>
                (window.location.search = `?page=${
                  currentPage + 1
                }&search=${searchQuery}&sort=${sort}`)
              }
            >
              Trang sau
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={currentPage === totalPages}
              onClick={() =>
                (window.location.search = `?page=${totalPages}&search=${searchQuery}&sort=${sort}`)
              }
            >
              Trang cuối &raquo;
            </button>

            {/* Thông tin phân trang */}
            <div>
              <span className="text-lg">
                Trang {currentPage} của {totalPages}
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
