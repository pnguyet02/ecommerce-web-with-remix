// src/routes/admin/products.tsx
import { prisma } from "~/db/prisma.server"; // Giả sử bạn đang sử dụng Prisma để truy vấn
import { json, LoaderFunction } from "@remix-run/node";
import { LoaderData } from "~/types"; // Nhập kiểu LoaderData từ types

export const loader: LoaderFunction = async () => {
  // Lấy danh sách sản phẩm từ cơ sở dữ liệu
  const products = await prisma.product.findMany();

  return json<LoaderData>({
    user: null, // Thêm thông tin người dùng nếu cần, hoặc bỏ qua nếu không cần
    products, // Trả về danh sách sản phẩm
  });
};
