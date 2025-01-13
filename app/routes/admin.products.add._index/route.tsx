import React from "react";
import { Form, useNavigate, useLoaderData } from "@remix-run/react";

interface Category {
  id: number;
  name: string;
}

interface LoaderData {
  categories: Category[];
}

export default function CreateProduct() {
  const loaderData = useLoaderData<LoaderData>();
  const categories = loaderData?.categories || []; // Fallback to an empty array
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/admin/products"); // Redirect back to product list
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-xl p-8 bg-gray-800 text-white rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Thêm sản phẩm
        </h1>
        <Form method="post" className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Tên sản phẩm"
            className="px-4 py-2 bg-gray-700 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Mô tả sản phẩm"
            className="px-4 py-2 bg-gray-700 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Giá sản phẩm"
            className="px-4 py-2 bg-gray-700 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Số lượng sản phẩm"
            className="px-4 py-2 bg-gray-700 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Đường dẫn hình ảnh"
            className="px-4 py-2 bg-gray-700 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Category Selector */}
          <div className="mb-4">
            {categories.length > 0 ? (
              <select
                name="categoryId"
                className="px-4 py-2 bg-gray-700 text-white rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled selected>
                  Chọn danh mục
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-gray-400">Chưa có danh mục nào</div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Thêm sản phẩm
          </button>
        </Form>
        <button
          onClick={handleCancel}
          className="mt-4 bg-gray-600 text-white px-6 py-2 rounded w-full"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
}
