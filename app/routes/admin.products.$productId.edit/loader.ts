// app/routes/admin/products.$productId.edit  (loader)
import { prisma } from "~/db/prisma.server";
import { Product } from "~/types";
import { LoaderFunction } from "@remix-run/node"; // Import LoaderFunction mà không cần Params

export const loader: LoaderFunction = async ({ params }) => {
  const productId = params.productId;

  // Kiểm tra nếu productId không tồn tại hoặc không phải là chuỗi hợp lệ
  if (!productId || isNaN(Number(productId))) {
    throw new Response("Product ID is invalid", { status: 400 });
  }

  // Chuyển productId thành số
  const productIdNum = parseInt(productId, 10);

  // Lấy dữ liệu sản phẩm từ database
  const product = await prisma.product.findUnique({
    where: { id: productIdNum },
    include: { category: true }, // Bao gồm dữ liệu danh mục
  });

  // Nếu không tìm thấy sản phẩm, trả về lỗi 404
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return { product };
};
