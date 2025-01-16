import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "@remix-run/react";
import { Product } from "~/types";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const navigate = useNavigate();
  const addToCart = async (product: Product) => {
    try {
      const response = await fetch("/cart/add", {
        method: "POST",
        body: new URLSearchParams({
          productId: product.id.toString(),
          quantity: "1", // Mặc định là 1 sản phẩm
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-800 p-4 rounded">
          {/* Link tới trang chi tiết sản phẩm */}
          <a href={`/products/${product.id}`} className="block">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-sm text-gray-400">{product.description}</p>
            <p className="text-lg font-bold text-blue-400">${product.price}</p>
            <p className="text-sm text-gray-400">Còn lại: {product.stock}</p>
          </a>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" />
            Thêm vào giỏ hàng
          </button>
        </div>
      ))}
    </div>
  );
}
