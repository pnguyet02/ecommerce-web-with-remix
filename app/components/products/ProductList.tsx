// src/components/ProductList.tsx
import { Link } from "@remix-run/react";
import { Product } from "~/types";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-800 p-4 rounded">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-sm text-gray-400">{product.description}</p>
            <p className="text-lg font-bold text-blue-400">${product.price}</p>
            <p className="text-sm text-gray-400">Còn lại: {product.stock}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
