import { useLoaderData } from "@remix-run/react";
import { Blog } from "~/types";

import { loader } from "./loader";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";

// Định nghĩa kiểu dữ liệu trả về từ loader
interface LoaderData {
  blogs: Blog[];
  user: { id: number; name: string; role: string } | null;
}

export default function BlogList() {
  const { blogs, user } = useLoaderData<LoaderData>();

  // Kiểm tra xem có dữ liệu blog hay không
  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header user={user} />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-center text-gray-600">
            <h2 className="text-2xl font-semibold mb-4">
              Không có bài viết nào.
            </h2>
            <p>Chúng tôi sẽ cập nhật bài viết sớm thôi!</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Truyền user vào Header */}
      <Header user={user} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Danh sách Blog
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  {blog.category.name}
                </p>
                <p className="text-gray-600 mb-4">{blog.summary}</p>
                <a
                  href={`/blogs/${blog.id}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Đọc thêm
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { loader };
