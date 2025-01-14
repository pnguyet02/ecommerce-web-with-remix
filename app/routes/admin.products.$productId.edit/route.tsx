import { useLoaderData, Form, useNavigate } from "react-router-dom";
import { loader } from "./loader";
import { action } from "./action";
import { Product } from "~/types";

export { loader, action };

export default function EditProduct() {
  const { product } = useLoaderData() as { product: Product };
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Chỉnh sửa sản phẩm
        </h1>
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="name" className="block">
              Tên sản phẩm
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={product.name}
              className="p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block">
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={product.description}
              className="p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block">
              Giá
            </label>
            <input
              id="price"
              name="price"
              type="number"
              defaultValue={product.price}
              className="p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block">
              Số lượng
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              defaultValue={product.stock}
              className="p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block">
              Ảnh
            </label>
            <input
              id="image"
              name="image"
              type="text"
              defaultValue={product.image}
              className="p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="block">
              Danh mục
            </label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product.categoryId || ""}
              className="p-2 w-full border rounded"
              required
            >
              <option value="">Chọn danh mục</option>
              <option value="1">Phụ kiện đồ handmade</option>
              <option value="2">Đồ trang trí handmade</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Cập nhật sản phẩm
          </button>
        </Form>
      </div>
    </div>
  );
}
