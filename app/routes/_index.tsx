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
export let loader: LoaderFunction = async () => {
  const products = await prisma.product.findMany();
  return json(products);
};

export default function Index() {
  const products = useLoaderData<Product[]>();

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
