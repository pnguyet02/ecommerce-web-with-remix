import { useLoaderData } from "@remix-run/react";
import { getUserFromSession } from "~/sessions"; // Lấy thông tin người dùng từ session
import { Product } from "~/types";
import ProductList from "~/components/products/ProductList";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import Carousel from "~/components/layout/Carousel";
import { prisma } from "~/db/prisma.server";
import { LoaderFunction } from "@remix-run/node"; // Remix's Request type

export const loader: LoaderFunction = async ({ request }) => {
  // const products = await prisma.product.findMany();
  const products = await prisma.product.findMany({
    take: 6, // Giới hạn lấy 6 sản phẩm
    orderBy: { createdAt: "desc" }, // Sắp xếp sản phẩm mới nhất trước
  });
  // const blogs = await prisma.blog.findMany({
  //   take: 3,
  //   orderBy: { createdAt: "desc" }, // Sắp xếp sản phẩm mới nhất trước
  // });
  const user = await getUserFromSession(request); // Kiểm tra nếu người dùng đã đăng nhập
  return { products, user }; // Trả về cả products và user
};

export default function Index() {
  const { products, user } = useLoaderData<{
    products: Product[];
    user: { id: number; name: string; role: string } | null;
  }>();

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header user={user} />
      <Carousel />
      <main className="p-8 mt-8 flex-grow">
        <h2 className="text-2xl font-bold mb-4">DANH SÁCH SẢN PHẨM</h2>
        <ProductList products={products} />
        {/* <h2 className="text-2xl font-bold mb-4">BÀI VIẾT MỚI NHẤT</h2> */}
      </main>
      <Footer />
    </div>
  );
}
