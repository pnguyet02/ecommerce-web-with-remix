// import { createCookieSessionStorage } from "@remix-run/node";

// const { getSession, commitSession, destroySession } =
//   createCookieSessionStorage({
//     cookie: {
//       name: "__session", // Tên của cookie
//       secure: process.env.NODE_ENV === "production",
//       secrets: ["your-secret-key"], // Đảm bảo dùng một secret key mạnh
//       sameSite: "lax",
//       httpOnly: true,
//     },
//   });

// export const getUserFromSession = async (request: Request) => {
//   const session = await getSession(request.headers.get("Cookie"));

//   // Trả về thông tin người dùng nếu có
//   return {
//     userId: session.get("userId"),
//     name: session.get("name"),
//     email: session.get("email"),
//     role: session.get("role"), // Lấy role từ session
//   };
// };

// // Lưu thông tin người dùng vào session
// export const setSession = async (user: any) => {
//   const session = await getSession();
//   session.set("userId", user.id); // Lưu userId vào session
//   session.set("role", user.role); // Lưu role vào session
//   console.log("User session set:", user); // Log thông tin để kiểm tra
//   return commitSession(session);
// };

// // Xóa session khi người dùng đăng xuất
// export const destroyUserSession = async (request: Request) => {
//   const session = await getSession(request.headers.get("Cookie"));
//   return destroySession(session);
// };
// utils/session.ts
import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secure: process.env.NODE_ENV === "production",
      secrets: ["your-secret-key"],
      sameSite: "lax",
      httpOnly: true,
    },
  });

// Xuất commitSession để sử dụng ở các tệp khác
export { getSession, commitSession, destroySession };

// Các hàm để lấy, tạo và hủy session
export const getUserFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    userId: session.get("userId"),
    name: session.get("name"),
    email: session.get("email"),
    role: session.get("role"),
  };
};

export const setUserSession = async (user: any, request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", user.id);
  session.set("name", user.name);
  session.set("email", user.email);
  session.set("role", user.role);
  return commitSession(session); // Trả về chuỗi cookie
};

export const destroyUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return destroySession(session);
};
