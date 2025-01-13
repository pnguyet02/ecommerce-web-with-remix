// src/routes/blogs.tsx
import { useLoaderData } from "@remix-run/react";
import { Blog } from "~/types";

// Import loader từ file loader.ts
import { loader } from "./loader";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
export default function BlogList() {
  // Lấy dữ liệu blogs từ loader
  const { blogs } = useLoaderData<{ blogs: Blog[] }>();

  // Kiểm tra xem có dữ liệu blog hay không
  if (!blogs || blogs.length === 0) {
    return <div>Không có bài viết nào.</div>;
  }

  return (
    <div className="p-1 bg-gray-100">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Danh sách Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{blog.category.name}</p>
            <p className="text-gray-600 mt-2 line-clamp-3">{blog.summary}</p>
            <a
              href={`/blogs/${blog.id}`}
              className="text-blue-500 hover:underline mt-4 block"
            >
              Đọc thêm
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

// Export loader để Remix sử dụng
export { loader };
