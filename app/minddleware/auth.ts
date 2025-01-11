// middleware/auth.ts
// middleware/auth.ts
import { LoaderFunction, redirect } from "@remix-run/node";
import { getUserFromSession } from "../sessions"; // Import hàm lấy session
import { prisma } from "~/db/prisma.server"; // Đảm bảo sử dụng đúng đối tượng Prisma

// Middleware kiểm tra quyền admin
export const requireAdmin: LoaderFunction = async ({ request }) => {
  // Lấy thông tin người dùng từ session
  const { userId, role } = await getUserFromSession(request); // Lấy userId và role từ session

  if (!userId || role !== "admin") {
    // Nếu không có người dùng hoặc không phải admin, chuyển hướng đến trang đăng nhập
    throw redirect("/login?error=Unauthorized");
  }

  // Kiểm tra người dùng trong cơ sở dữ liệu (nếu cần thiết)
  const dbUser = await prisma.user.findUnique({
    where: { id: userId }, // Tìm người dùng theo userId
  });

  if (!dbUser || dbUser.role !== "admin") {
    // Nếu người dùng không phải là admin, chuyển hướng đến trang đăng nhập
    throw redirect("/login?error=Unauthorized");
  }

  return null; // Nếu là admin, tiếp tục thực thi loader
};

// Middleware yêu cầu người dùng đã đăng nhập
export const requireUser: LoaderFunction = async ({ request }) => {
  // Lấy thông tin người dùng từ session
  const { userId } = await getUserFromSession(request); // Lấy userId từ session

  if (!userId) {
    // Nếu không có người dùng trong session, chuyển hướng đến trang đăng nhập
    throw redirect("/login");
  }

  return null; // Nếu người dùng đã đăng nhập, tiếp tục thực thi loader
};
