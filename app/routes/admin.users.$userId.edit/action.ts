// app/routes/admin/users.$userId.edit/action.ts
import { prisma } from "~/db/prisma.server";
import { redirect } from "@remix-run/node"; // Sử dụng redirect từ Remix thay vì react-router-dom

export const action = async ({
  request,
  params,
}: {
  request: Request;
  params: { userId: string };
}) => {
  const formData = new URLSearchParams(await request.text());

  // Lấy thông tin người dùng từ form
  const name = formData.get("name") || "";
  const email = formData.get("email") || "";
  const role = formData.get("role") || "user"; // Mặc định là "user"

  // Cập nhật thông tin người dùng trong cơ sở dữ liệu
  await prisma.user.update({
    where: { id: parseInt(params.userId) }, // Sử dụng userId từ params
    data: { name, email, role }, // Cập nhật name, email, role
  });

  // Redirect đến trang danh sách người dùng sau khi cập nhật
  return redirect("/admin/users");
};
