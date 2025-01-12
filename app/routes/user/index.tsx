import { redirect, LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/sessions"; // Giả sử getSession dùng để lấy session

export let loader: LoaderFunction = async ({ request }) => {
  // Lấy thông tin người dùng từ session
  const user = await getUserFromSession(request);

  // Kiểm tra nếu người dùng không phải là user hoặc không có session
  if (!user || user.role !== "user") {
    return redirect("/"); //
  }

  return null; // Nếu là user, tiếp tục render trang dashboard cho người dùng
};
export default function UserIndex() {
  return (
    <div>
      <h1>User Dashboard</h1>
      {/* Nội dung dành riêng cho người dùng bình thường */}
    </div>
  );
}
