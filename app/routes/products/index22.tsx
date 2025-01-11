import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { useLoaderData } from "@remix-run/react";
import ProductList from "~/components/products/ProductList";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import { Product, CategoryData } from "~/types"; // Sử dụng import type cho CategoryData

interface LoaderData {
  products: Product[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  sort: string;
  categories: CategoryData[];
  categoryId: number;
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
      categoryId: categoryId > 0 ? categoryId : undefined,
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
      categoryId: categoryId > 0 ? categoryId : undefined,
    },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  return json<LoaderData>({
    products,
    totalPages,
    currentPage: page,
    searchQuery,
    sort,
    categories: await prisma.category.findMany(),
    categoryId,
  });
};

export default function Products() {
  const {
    products,
    totalPages,
    currentPage,
    searchQuery,
    sort,
    categories,
    categoryId,
  } = useLoaderData<LoaderData>();

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
                  href={`/categories/${category.id}`}
                  className={`text-blue-400 hover:underline ${
                    category.id === categoryId ? "font-bold" : ""
                  }`}
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
            {/* Phân trang */}
            {currentPage > 1 && (
              <a
                href={`/products?page=${
                  currentPage - 1
                }&search=${searchQuery}&sort=${sort}&categoryId=${categoryId}`}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Trang trước
              </a>
            )}
            <span className="text-white">
              Trang {currentPage} / {totalPages}
            </span>
            {currentPage < totalPages && (
              <a
                href={`/products?page=${
                  currentPage + 1
                }&search=${searchQuery}&sort=${sort}&categoryId=${categoryId}`}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Trang sau
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
