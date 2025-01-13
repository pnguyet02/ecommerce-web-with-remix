// src/routes/blogs/loader.ts
import { json } from "@remix-run/node";
import { prisma } from "~/db/prisma.server"; // Thư viện kết nối Prisma
import { LoaderFunction } from "@remix-run/node";

// Loader function để truy vấn dữ liệu
export const loader: LoaderFunction = async () => {
  try {
    // Truy vấn các bài blog và bao gồm cả danh mục
    const blogs = await prisma.blog.findMany({
      include: {
        category: true, // Bao gồm thông tin danh mục cho mỗi blog
      },
    });
    // Trả về dữ liệu các bài blog dưới dạng JSON
    return json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Unable to load blogs");
  }
};
