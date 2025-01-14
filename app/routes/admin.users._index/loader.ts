// app/routes/admin/users/loader.ts
import { prisma } from "~/db/prisma.server"; // Giả sử bạn đã thiết lập prisma
import { LoaderFunction } from "@remix-run/node";
import { User } from "~/types"; // Đảm bảo rằng bạn đã định nghĩa kiểu User

export type LoaderData = {
  users: User[]; // Danh sách người dùng
};

export const loader: LoaderFunction = async () => {
  const users = await prisma.user.findMany(); // Lấy tất cả người dùng từ cơ sở dữ liệu

  return { users };
};
