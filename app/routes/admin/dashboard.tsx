import { json, redirect } from "@remix-run/node";
import { getUserFromSession } from "~/utils/session";

export const loader = async ({ request }: { request: Request }) => {
  const user = await getUserFromSession(request);
  if (!user || user.role !== "admin") {
    // Nếu không phải admin, chuyển hướng đến trang chủ
    return redirect("/");
  }

  return json({ user });
};

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Nội dung dành riêng cho admin */}
    </div>
  );
}
