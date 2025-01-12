import { createCookieSessionStorage } from "@remix-run/node";
import { prisma } from "~/db/prisma.server"; // Giả sử bạn có db setup trong file này

const sessionSecret = process.env.SESSION_SECRET || "my-secret"; // Đảm bảo bạn có session secret của mình

// Tạo cookie session storage
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "user_session", // Tên cookie lưu trữ session
      httpOnly: true, // Không thể truy cập từ JavaScript
      secure: process.env.NODE_ENV === "production", // Chỉ sử dụng HTTPS trong môi trường production
      maxAge: 60 * 60 * 24 * 7, // Session có hiệu lực trong 1 tuần
      sameSite: "lax", // Cài đặt bảo mật cookie
      secrets: [sessionSecret], // Dùng session secret của bạn
    },
  });

// Lưu thông tin người dùng vào session
export async function setUserSession(user: any, request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  // Lưu các thông tin người dùng vào session (bao gồm cả vai trò)
  session.set("userId", user.id);
  session.set("userRole", user.role); // Lưu vai trò của người dùng (admin hoặc user)

  const sessionId = await commitSession(session);
  return sessionId;
}

// Lấy thông tin người dùng từ session
export async function getUserFromSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const userRole = session.get("userRole");

  if (!userId || !userRole) {
    return null; // Nếu không có thông tin, trả về null
  }

  // Bạn có thể lấy thêm thông tin từ cơ sở dữ liệu nếu cần
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return { ...user, role: userRole }; // Trả về thông tin người dùng với vai trò
}
