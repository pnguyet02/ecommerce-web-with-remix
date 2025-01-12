// // logout.ts (action của trang logout)
// import { redirect } from "@remix-run/node";
// import { getSession, commitSession } from "~/sessions";

// export let action = async ({ request }: any) => {
//   let session = await getSession(request);
//   session.unset("user"); // Xóa thông tin người dùng khỏi session
//   return redirect("/", {
//     headers: {
//       "Set-Cookie": await commitSession(session), // Cập nhật cookie
//     },
//   });
// };
