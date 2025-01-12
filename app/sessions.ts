import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session", // Tên của cookie
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
    name: session.get("name"),
    role: session.get("role"), // Lấy role từ session
  };
};

// Lưu thông tin người dùng vào session
export const setSession = async (user: any) => {
  const session = await getSession();
  session.set("userId", user.id); // Lưu userId vào session
  session.set("role", user.role); // Lưu role vào session
  console.log("User session set:", user); // Log thông tin để kiểm tra
  return commitSession(session);
};

// Xóa session khi người dùng đăng xuất
export const destroyUserSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return destroySession(session);
};
// sessions.ts (hoặc session.js)
// sessions.ts
// import { createCookieSessionStorage } from "@remix-run/node";

// let sessionSecret = process.env.SESSION_SECRET || "my-secret-key"; // Bí mật cho session
// let storage = createCookieSessionStorage({
//   cookie: {
//     name: "__session", // Tên của cookie
//     secure: process.env.NODE_ENV === "production", // Đảm bảo cookie an toàn trong môi trường production
//     secrets: [sessionSecret], // Bí mật để mã hóa cookie
//     sameSite: "lax",
//     path: "/",
//   },
// });

// // Hàm lấy session từ request
// export let getSession = (request: Request) =>
//   storage.getSession(request.headers.get("Cookie"));

// // Hàm lưu session
// export let commitSession = (session: any) => storage.commitSession(session);

// // Hàm thiết lập session với thông tin người dùng
// export let setUserSession = async (user: any, request: Request) => {
//   let session = await getSession(request); // Lấy session từ request
//   session.set("user", user); // Lưu thông tin người dùng vào session
//   return commitSession(session); // Trả về cookie đã được cập nhật
// };

// // Hàm lấy thông tin người dùng từ session
// export let getUserFromSession = async (request: Request) => {
//   let session = await getSession(request);
//   return session.get("user"); // Trả về thông tin người dùng từ session
// };
