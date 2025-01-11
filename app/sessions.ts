// import { createCookieSessionStorage } from "@remix-run/node";

// // Đảm bảo sử dụng một giá trị bí mật trong production
// const sessionSecret = process.env.SESSION_SECRET || "some_secret_key"; // Thay thế với một secret key an toàn cho production

// const storage = createCookieSessionStorage({
//   cookie: {
//     name: "user_session",
//     secure: process.env.NODE_ENV === "production", // Chỉ cần secure cookie trong môi trường sản xuất
//     secrets: [sessionSecret],
//     sameSite: "lax",
//     httpOnly: true,
//   },
// });

// // Kiểu dữ liệu cho user trong session
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }

// // Lấy session từ cookie
// export let getSession = async (cookie: string | null) => {
//   if (!cookie) return storage.getSession(); // Nếu cookie null thì trả về một session mới
//   return storage.getSession(cookie);
// };

// // Lưu thông tin user vào session
// export let setSession = async (user: User) => {
//   let session = await storage.getSession();
//   session.set("user", user); // Lưu thông tin người dùng vào session
//   return storage.commitSession(session); // Trả về cookie commit với thông tin user
// };

// // Xóa session khi người dùng đăng xuất
// export let destroySession = async (cookie: string | null) => {
//   let session = await storage.getSession(cookie); // Lấy session hiện tại
//   return storage.destroySession(session); // Xóa session và trả về cookie
// };
// sessions.ts
import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secure: process.env.NODE_ENV === "production",
      secrets: ["your-secret-key"], // Đảm bảo dùng một secret key mạnh
      sameSite: "lax",
      httpOnly: true,
    },
  });

// Lấy thông tin người dùng từ session
export const getUserFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    userId: session.get("userId"), // Lấy userId từ session
    role: session.get("role"), // Lấy role từ session
  };
};

// Lưu thông tin người dùng vào session
export const setSession = async (user: any) => {
  const session = await getSession();
  session.set("userId", user.id); // Lưu userId vào session
  session.set("role", user.role); // Lưu role vào session
  return commitSession(session);
};

// Xóa session khi người dùng đăng xuất
export const destroyUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return destroySession(session);
};
