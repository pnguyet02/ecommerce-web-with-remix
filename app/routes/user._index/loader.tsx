// loaders/user.loader.ts
import { getUserFromSession } from "~/sessions"; // Giả sử bạn đã có hàm lấy thông tin người dùng từ session
import { redirect } from "@remix-run/node";
import { User } from "~/types"; // Import kiểu User từ file types.ts

export let loader = async ({ request }: { request: Request }) => {
  const userFromSession = await getUserFromSession(request); // Lấy thông tin người dùng từ session

  if (!userFromSession) {
    // Nếu không có thông tin người dùng trong session, chuyển hướng về trang đăng nhập
    return redirect("/login");
  }

  // Cập nhật dữ liệu trả về để khớp với kiểu User
  const user: User = {
    id: userFromSession.userId, // Cập nhật lại thuộc tính để khớp
    name: userFromSession.name,
    email: userFromSession.email,
    role: userFromSession.role,
  };

  return { user }; // Trả về đối tượng user đã được chỉnh sửa
};
