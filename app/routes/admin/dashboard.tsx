import { redirect } from "@remix-run/node";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/sessions";

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUserFromSession(request);
  if (!user || user.role !== "admin") {
    return redirect("/dashboard"); // Nếu không phải admin, chuyển hướng tới trang dashboard
  }
  return json({ user });
};

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Nội dung dành riêng cho admin */}
    </div>
  );
}
