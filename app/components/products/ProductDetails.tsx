import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { useLoaderData } from "@remix-run/react";
import { Product } from "~/types";
import { useState } from "react";

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
  const [quantity, setQuantity] = useState(1); // State để lưu số lượng sản phẩm

  // Hàm thêm vào giỏ hàng
  const addToCart = async () => {
    try {
      const response = await fetch("/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          productId: product.id.toString(),
          quantity: quantity.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể thêm sản phẩm vào giỏ hàng");
      }

      alert(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
  };

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

      {/* Form để thêm vào giỏ hàng */}
      <div className="mt-6">
        <label htmlFor="quantity" className="block text-lg">
          Số lượng:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 mt-2 border rounded bg-gray-700 text-white"
        />
        <button
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={addToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </div>

      {/* Sản phẩm tương tự */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Sản phẩm tương tự</h3>
      </div>
    </div>
  );
}
