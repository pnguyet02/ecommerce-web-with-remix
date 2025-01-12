import { redirect } from "@remix-run/node";
import { destroyUserSession } from "~/sessions"; // Hàm xóa session

// Action - Được gọi khi gửi POST request (logout)
export let action = async ({ request }: any) => {
  const cookie = await destroyUserSession(request); // Xóa session khi logout

  // Chuyển hướng về trang chủ và xóa cookie
  return redirect("/", {
    headers: {
      "Set-Cookie": cookie, // Đảm bảo cookie được cập nhật sau khi đăng xuất
    },
  });
};

// Loader - Chuyển hướng nếu có GET request đến trang logout (thường không cần thiết vì logout dùng POST)
export let loader = async () => {
  return redirect("/"); // Chuyển hướng về trang chủ nếu có GET request
};
