import { useState } from "react";
import { useLoaderData, Form } from "@remix-run/react";
import { loader, type LoaderData } from "./loader";
import { action } from "./action";

export { loader, action };

export default function ManageCategories() {
  const { productCategories, blogCategories } = useLoaderData<LoaderData>();
  const [activeTab, setActiveTab] = useState<"product" | "blog">("product");
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const categories =
    activeTab === "product" ? productCategories : blogCategories;

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.id.toString().includes(search)
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Quản lý Danh Mục
      </h2>

      {/* 🔹 Tabs chuyển đổi giữa danh mục sản phẩm và blog */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-lg transition ${
            activeTab === "product"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("product")}
        >
          Danh mục sản phẩm
        </button>
        <button
          className={`px-6 py-2 rounded-lg transition ${
            activeTab === "blog"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("blog")}
        >
          Danh mục bài viết
        </button>
      </div>

      {/* 🔹 Form thêm danh mục */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-3">Thêm danh mục</h3>
        <Form method="post" className="flex space-x-3">
          <input type="hidden" name="actionType" value="create" />
          <input type="hidden" name="categoryType" value={activeTab} />
          <input
            type="text"
            name="name"
            placeholder={`Nhập tên danh mục ${
              activeTab === "product" ? "sản phẩm" : "bài viết"
            }`}
            className="border p-3 rounded-lg flex-grow shadow-sm focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-500 transition"
          >
            Thêm
          </button>
        </Form>
      </div>

      {/* 🔹 Danh sách danh mục */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-6 border">ID</th>
              <th className="py-3 px-6 border">Tên danh mục</th>
              <th className="py-3 px-6 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr
                key={category.id}
                className="border-t hover:bg-gray-100 transition"
              >
                <td className="py-3 px-6 border text-center">{category.id}</td>
                <td className="py-3 px-6 border">{category.name}</td>
                <td className="py-3 px-6 border flex space-x-2">
                  {/* Nút sửa danh mục */}
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition"
                  >
                    Sửa
                  </button>

                  {/* Xóa danh mục */}
                  <Form method="post">
                    <input type="hidden" name="actionType" value="delete" />
                    <input
                      type="hidden"
                      name="categoryType"
                      value={activeTab}
                    />
                    <input type="hidden" name="id" value={category.id} />
                    <button
                      type="submit"
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-400 transition"
                      onClick={(e) =>
                        !confirm("Bạn có chắc chắn muốn xóa danh mục này?") &&
                        e.preventDefault()
                      }
                    >
                      Xóa
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Form sửa danh mục */}
      {editingCategory && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm mt-6">
          <h3 className="text-xl font-semibold mb-3">Sửa danh mục</h3>
          <Form method="post" className="flex space-x-3">
            <input type="hidden" name="actionType" value="update" />
            <input type="hidden" name="categoryType" value={activeTab} />
            <input type="hidden" name="id" value={editingCategory.id} />
            <input
              type="text"
              name="name"
              defaultValue={editingCategory.name}
              className="border p-3 rounded-lg flex-grow shadow-sm focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition"
            >
              Hủy
            </button>
          </Form>
        </div>
      )}

      {/* 🔙 Nút quay lại */}
      <div className="mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition"
        >
          ⬅ Quay lại
        </button>
      </div>
    </div>
  );
}
