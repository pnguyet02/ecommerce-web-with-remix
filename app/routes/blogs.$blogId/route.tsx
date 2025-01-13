// src/routes/blogs/$blogId.tsx
import { useLoaderData } from "@remix-run/react";
import { Blog } from "~/types";

export default function BlogDetail() {
  const { blog } = useLoaderData<{ blog: Blog | null }>();

  if (!blog) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Không tìm thấy bài viết.</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-md mb-6"
      />
      <p className="text-gray-600 mb-6">{blog.content}</p>
      <p className="text-sm text-gray-500">Danh mục: {blog.category.name}</p>
    </div>
  );
}
