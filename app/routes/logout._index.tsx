// // app/routes/logout.tsx
// import { redirect } from "@remix-run/node";
// import { json, LoaderFunction } from "@remix-run/node";
// import { destroyUserSession } from "~/sessions";

// // export let loader: LoaderFunction = async ({ request }) => {
// //   return json({});
// // };

// export let action: LoaderFunction = async ({ request }) => {
//   await destroyUserSession(request); // Xóa session khi người dùng logout
//   return redirect("/");
// };
// // Đảm bảo route này không trả về một giao diện rỗngg
// export default function Logout() {
//   return null;
// }
// app/routes/logout.tsx//
// import { redirect } from "@remix-run/node";
// import { destroyUserSession } from "~/sessions";

// export const action = async ({ request }: { request: Request }) => {
//   await destroyUserSession(request); // Xóa session
//   return redirect("/contact"); //
// };
/////////
// import { redirect } from "@remix-run/node";
// import { destroyUserSession, getUserFromSession } from "~/sessions"; // Đảm bảo đường dẫn đúng tới file sessions

// export const action = async ({ request }: { request: Request }) => {
//   // Truyền trực tiếp đối tượng request vào getUserFromSession
//   const session = await getUserFromSession(request);

//   // Hủy session
//   await destroyUserSession(request);

//   // Kiểm tra session sau khi hủy
//   console.log("User session after logout:", session); // Kiểm tra nếu đã xóa thành công

//   // Điều hướng người dùng về trang chủ
//   return redirect("/"); // Điều hướng về trang chủ
// };
// src/routes/logout.tsx
// import { redirect } from "@remix-run/node";
// import { destroyUserSession } from "~/sessions";

// export const action = async ({ request }: { request: Request }) => {
//   // Hủy session
//   await destroyUserSession(request);
//   console.log("User session after logout:", await destroyUserSession(request));
//   // Redirect về trang đăng nhập hoặc trang chủ
//   return redirect("/login"); // Điều hướng về trang login sau khi logout
// };
// src/routes/logout.tsx
// src/routes/logout.tsx
import { redirect } from "@remix-run/node";
import { destroyUserSession } from "~/sessions"; // Đảm bảo đường dẫn đúng

export let action = async ({ request }: { request: Request }) => {
  // Xóa session của người dùng khi logout
  await destroyUserSession(request);

  // Chuyển hướng về trang chủ sau khi logout
  return redirect("/login");
};
