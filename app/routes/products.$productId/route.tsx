import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import type { Product } from "~/types";
import { loader } from "./loader";
import { action } from "./action";
import { useState } from "react";

export { loader, action };

export default function ProductDetail() {
  const { product, similarProducts, user } = useLoaderData<{
    product: Product;
    similarProducts: Product[];
    user: { id: number; name: string; role: string } | null;
  }>();

  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm chọn

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
    <div className="bg-gray-100">
      {/* Include Header with user info */}
      <Header user={user} />

      <div className="container mx-auto py-8 px-4">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={product.image || "/placeholder-image.jpg"}
              alt={product.name}
              className="w-full h-64 object-cover rounded shadow-md"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl font-bold text-blue-700 mb-2">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Còn lại: {product.stock} sản phẩm
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
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
                className="w-20 p-2 border rounded text-center"
              />
            </div>
            <button
              className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
              onClick={addToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.length > 0 ? (
              similarProducts.map((similarProduct) => (
                <div
                  key={similarProduct.id}
                  className="bg-white p-4 rounded shadow-md"
                >
                  <img
                    src={similarProduct.image || "/placeholder-image.jpg"}
                    alt={similarProduct.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-lg font-semibold">
                    {similarProduct.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {similarProduct.description.slice(0, 50)}...
                  </p>
                  <p className="text-blue-700 font-bold mt-2">
                    ${similarProduct.price}
                  </p>
                  <Link
                    to={`/products/${similarProduct.id}`}
                    className="text-blue-500 hover:underline mt-2 block text-sm"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Không có sản phẩm tương tự.</p>
            )}
          </div>
        </div>
      </div>

      {/* Include Footer */}
      <Footer />
    </div>
  );
}
