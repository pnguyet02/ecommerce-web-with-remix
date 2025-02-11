import {
  json,
  redirect,
  type LoaderFunction,
  type ActionFunction,
} from "@remix-run/node";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { prisma } from "~/db/prisma.server";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@remix-run/react";

// Định nghĩa kiểu dữ liệu cho blog
type Blog = {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  blogCategoryId: number;
  category: { name: string };
  createdAt: string;
};

// Loader để lấy danh sách bài viết
export const loader: LoaderFunction = async () => {
  const blogs = await prisma.blog.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" }, // Sắp xếp theo tên
  });

  return json({ blogs, categories }); // Trả về cả blogs và categories
};

// Định nghĩa kiểu dữ liệu cho action
type ActionData = {
  error?: string;
};

// Xử lý hành động (thêm, sửa, xóa)
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType === "create") {
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const blogCategoryId = Number(formData.get("blogCategoryId"));

    if (!title || !summary || !content || !blogCategoryId) {
      return json<ActionData>(
        { error: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    await prisma.blog.create({
      data: { title, summary, content, imageUrl, blogCategoryId },
    });

    return redirect("/admin/posts");
  }

  if (actionType === "update") {
    const id = Number(formData.get("id"));
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const content = formData.get("content") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const blogCategoryId = Number(formData.get("blogCategoryId"));

    await prisma.blog.update({
      where: { id },
      data: { title, summary, content, imageUrl, blogCategoryId },
    });

    return redirect("/admin/posts");
  }

  if (actionType === "delete") {
    const blogId = Number(formData.get("blogId"));
    await prisma.blog.delete({ where: { id: blogId } });
    return redirect("/admin/posts");
  }

  return json<ActionData>({ error: "Hành động không hợp lệ" }, { status: 400 });
};

export default function ManagePosts() {
  const { blogs, categories } = useLoaderData<{
    blogs: Blog[];
    categories: { id: number; name: string }[];
  }>();

  const actionData = useActionData<ActionData>();
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false); // Hiển thị form thêm bài viết
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "idle") {
      // Chỉ ẩn form khi request hoàn tất
      setShowForm(false);
      setIsEditing(false);
      setEditPost(null);
    }
  }, [navigation.state]);

  return (
    <div className="p-6">
      {/* Nút quay lại */}
      <button
        onClick={() => window.history.back()}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-6"
      >
        ← Home
      </button>

      {/* Tiêu đề quản lý bài viết */}
      <h2 className="text-3xl font-semibold mb-6">Quản lý Bài Viết</h2>

      {/* Hiển thị lỗi nếu có */}
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}

      {/* Nút thêm bài viết */}
      {!showForm && !isEditing && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Thêm bài viết
        </button>
      )}

      {/* Form thêm / sửa bài viết */}
      {(showForm || isEditing) && (
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEditing ? "Chỉnh Sửa Bài Viết" : "Tạo Bài Viết Mới"}
          </h3>
          <Form method="post" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="hidden"
              name="actionType"
              value={isEditing ? "update" : "create"}
            />
            {isEditing && (
              <input type="hidden" name="id" value={editPost?.id} />
            )}
            <input
              type="text"
              name="title"
              placeholder="Tiêu đề"
              className="border p-2 w-full"
              required
              defaultValue={editPost?.title}
            />
            <input
              type="text"
              name="summary"
              placeholder="Tóm tắt"
              className="border p-2 w-full"
              required
              defaultValue={editPost?.summary}
            />
            <textarea
              name="content"
              placeholder="Nội dung"
              className="border p-2 w-full md:col-span-2"
              required
              defaultValue={editPost?.content}
            ></textarea>
            <input
              type="text"
              name="imageUrl"
              placeholder="URL hình ảnh"
              className="border p-2 w-full"
              defaultValue={editPost?.imageUrl}
            />
            {/* Chọn danh mục bài viết */}
            <select
              name="blogCategoryId"
              className="border p-2 w-full"
              required
              defaultValue={editPost?.blogCategoryId}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto"
            >
              {isEditing ? "Cập Nhật" : "Thêm Mới"}
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-auto"
              onClick={() => {
                setIsEditing(false);
                setEditPost(null);
                setShowForm(false); // Ẩn form khi hủy
              }}
            >
              Hủy
            </button>
          </Form>
        </div>
      )}

      {/* Bảng danh sách bài viết */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Hình ảnh</th>
            <th className="py-2 px-4 border">Tiêu đề</th>
            <th className="py-2 px-4 border">Danh mục</th>
            <th className="py-2 px-4 border">Ngày tạo</th>
            <th className="py-2 px-4 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id} className="border-t">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border text-center">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4 border">{blog.title}</td>
              <td className="py-2 px-4 border">{blog.category.name}</td>
              <td className="py-2 px-4 border">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border flex gap-2">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditPost(blog);
                    setShowForm(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <Form method="post">
                  <input type="hidden" name="actionType" value="delete" />
                  <input type="hidden" name="blogId" value={blog.id} />
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={(e) =>
                      !confirm("Bạn có chắc chắn muốn xóa?") &&
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
  );
}
