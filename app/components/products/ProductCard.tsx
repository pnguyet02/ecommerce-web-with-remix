import { Product } from "~/types"; // Import kiểu Product
import { useNavigate } from "@remix-run/react";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="bg-gray-800 p-4 rounded">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
      <p className="text-sm text-gray-400">{product.description}</p>
      <p className="text-lg font-bold text-blue-400">${product.price}</p>
      <p className="text-sm text-gray-400">Stock: {product.stock}</p>
      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        View Details
      </button>
    </div>
  );
}
