// EditProduct.tsx
import { useLoaderData, Form, useNavigate } from "@remix-run/react";
import { LoaderData, Product } from "~/types"; // Import LoaderData từ types.ts

export default function EditProduct() {
  const { products } = useLoaderData<LoaderData>(); // Lấy mảng sản phẩm từ LoaderData

  if (products.length === 0) {
    return <div>Product not found</div>; // Hiển thị thông báo nếu không tìm thấy sản phẩm
  }

  const product = products[0];

  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-800 text-white rounded">
      <h1 className="text-2xl font-semibold mb-4">Sửa sản phẩm</h1>
      <Form method="post" className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={product.name}
          className="px-4 py-2 bg-gray-700 text-white rounded w-full"
        />
        <input
          type="text"
          name="description"
          defaultValue={product.description}
          className="px-4 py-2 bg-gray-700 text-white rounded w-full"
        />
        <input
          type="number"
          name="price"
          defaultValue={product.price}
          className="px-4 py-2 bg-gray-700 text-white rounded w-full"
        />
        <input
          type="number"
          name="stock"
          defaultValue={product.stock}
          className="px-4 py-2 bg-gray-700 text-white rounded w-full"
        />
        <input
          type="text"
          name="image"
          defaultValue={product.image}
          className="px-4 py-2 bg-gray-700 text-white rounded w-full"
        />
        <select
          name="categoryId"
          defaultValue={product.categoryId || 0}
          className="px-4 py-2 bg-gray-700 text-white rounded w-full"
        >
          <option value={0}>Chọn danh mục</option>
          {/* Add category options dynamically */}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Cập nhật sản phẩm
        </button>
      </Form>
    </div>
  );
}
