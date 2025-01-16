import { json } from "@remix-run/node";
import { prisma } from "~/db/prisma.server"; // Thư viện kết nối Prisma
import { LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/sessions"; // Import hàm lấy thông tin user từ session

// Định nghĩa kiểu dữ liệu trả về từ loader
interface LoaderData {
  blogs: Array<{
    id: number;
    title: string;
    content: string;
    category: { id: number; name: string };
  }>;
  user: { id: number; name: string; role: string } | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Lấy thông tin user từ session
    const rawUser = await getUserFromSession(request);

    // Xử lý dữ liệu user để phù hợp với kiểu LoaderData
    const user =
      rawUser && rawUser.userId && rawUser.name && rawUser.role
        ? {
            id: Number(rawUser.userId),
            name: String(rawUser.name),
            role: String(rawUser.role),
          }
        : null;

    // Truy vấn các bài blog và bao gồm cả danh mục
    const blogs = await prisma.blog.findMany({
      include: {
        category: true, // Bao gồm thông tin danh mục cho mỗi blog
      },
    });

    // Trả về dữ liệu các bài blog và thông tin user dưới dạng JSON
    return json<LoaderData>({
      blogs,
      user,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Unable to load blogs");
  }
};
