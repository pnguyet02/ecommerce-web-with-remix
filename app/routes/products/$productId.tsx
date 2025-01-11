import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/types";

// Loader cho trang chi tiết sản phẩm
export let loader: LoaderFunction = async ({ params }) => {
  const { productId } = params;
  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return json(product);
};

export default function ProductDetail() {
  const product: Product = useLoaderData();

  return (
    <div className="p-8 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded mt-4"
      />
      <p className="mt-4">{product.description}</p>
      <p className="mt-4 text-xl font-bold">${product.price}</p>
      <p className="mt-2 text-sm text-gray-400">Stock: {product.stock}</p>
    </div>
  );
}
