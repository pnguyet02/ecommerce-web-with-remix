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
import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session", // Tên cookie lưu trữ session
      secure: process.env.NODE_ENV === "production", // Chỉ bật secure khi ở môi trường production
      secrets: ["your-secret-key"], // Đảm bảo sử dụng một secret key mạnh
      sameSite: "lax", // Chế độ SameSite cookie
      httpOnly: true, // Đảm bảo cookie chỉ có thể truy cập qua HTTP, không qua JavaScript
    },
  });

// Lấy thông tin người dùng từ session
export const getUserFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));

  return {
    userId: session.get("userId"),
    name: session.get("name"),
    email: session.get("email"),
    role: session.get("role"), // Lấy thông tin role từ session
  };
};

// Lưu thông tin người dùng vào session
export const setSession = async (user: any) => {
  const session = await getSession();
  session.set("userId", user.id); // Lưu userId vào session
  session.set("name", user.name); // Lưu tên người dùng vào session
  session.set("email", user.email); // Lưu email vào session
  session.set("role", user.role); // Lưu role vào session

  console.log("User session set:", user); // Log thông tin để kiểm tra
  return commitSession(session); // Cập nhật session và trả về cookie
};

// Xóa session khi người dùng đăng xuất
export const destroyUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return destroySession(session); // Xóa session và trả về cookie đã xóa
};
