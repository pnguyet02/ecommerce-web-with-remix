// middleware/auth.ts
import { LoaderFunction, redirect } from "@remix-run/node";
import { getUserFromSession } from "../sessions"; // Import hàm lấy session

// Middleware kiểm tra quyền admin
export const requireAdmin: LoaderFunction = async ({ request }) => {
  // Lấy thông tin người dùng từ session
  const user = await getUserFromSession(request);

  // Kiểm tra nếu user là null hoặc không phải admin
  if (!user || !user.userId || user.role !== "admin") {
    // Nếu không có user hoặc không phải admin, chuyển hướng đến trang đăng nhập
    throw redirect("/login?error=Unauthorized");
  }

  // Nếu là admin, tiếp tục thực thi loader
  return null;
};

// Middleware yêu cầu người dùng đã đăng nhập
export const requireUser: LoaderFunction = async ({ request }) => {
  // Lấy thông tin người dùng từ session
  const user = await getUserFromSession(request);

  // Kiểm tra nếu user là null hoặc không có userId
  if (!user || !user.userId) {
    // Nếu không có người dùng hoặc không có userId, chuyển hướng đến trang đăng nhập
    throw redirect("/login?error=Unauthorized");
  }

  // Nếu người dùng đã đăng nhập, tiếp tục thực thi loader
  return null;
};
