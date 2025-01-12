// src/routes/index.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/types";
import ProductList from "~/components/products/ProductList";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import Carousel from "~/components/layout/Carousel";

// Loader cho trang index, lấy danh sách sản phẩm
// export let loader: LoaderFunction = async () => {
//   const products = await prisma.product.findMany();
//   return json(products);
// };
export const loader: LoaderFunction = async () => {
  try {
    const products = await prisma.product.findMany(); // Truy vấn tất cả sản phẩm
    return { products }; // Trả về dữ liệu cho frontend
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu từ Prisma:", error);
    throw new Error("Không thể tải dữ liệu sản phẩm");
  }
};
export default function Index() {
  const { products } = useLoaderData<{ products: Product[] }>();

  if (!products || products.length === 0) {
    return <div>No products found</div>; // Hiển thị thông báo nếu không có sản phẩm
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <Carousel />
      <main className="p-8 mt-8 flex-grow">
        <ProductList products={products} />
      </main>
      <Footer />
    </div>
  );
}
