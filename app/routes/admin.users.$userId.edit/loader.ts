// app/routes/admin/users.$userId.edit (loader)
import { prisma } from "~/db/prisma.server";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const userId = params.userId;

  // Kiểm tra nếu userId không tồn tại hoặc không phải là chuỗi hợp lệ
  if (!userId || isNaN(Number(userId))) {
    throw new Response("User ID is invalid", { status: 400 });
  }

  // Chuyển userId thành số
  const userIdNum = parseInt(userId, 10);

  // Lấy dữ liệu người dùng từ database
  const user = await prisma.user.findUnique({
    where: { id: userIdNum }, // Truy vấn theo ID người dùng
  });

  // Nếu không tìm thấy người dùng, trả về lỗi 404
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  return { user };
};
