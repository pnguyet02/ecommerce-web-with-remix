import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { getUserFromSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log(">>>> check params: ", params);
  const { productId } = params;

  // Lấy thông tin user từ session
  const rawUser = await getUserFromSession(request);

  // Kiểm tra user hợp lệ
  const user =
    rawUser && rawUser.userId && rawUser.name && rawUser.role
      ? {
          id: Number(rawUser.userId),
          name: String(rawUser.name),
          role: String(rawUser.role),
        }
      : null;

  // Validate productId
  const id = Number(productId);
  if (isNaN(id)) {
    throw new Response("Invalid Product ID", { status: 400 });
  }

  // Lấy chi tiết sản phẩm
  const product = await prisma.product.findUnique({
    where: { id },
  });

  // Kiểm tra sản phẩm có tồn tại không
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  // Lấy danh sách sản phẩm tương tự
  const similarProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
  });

  return json({ product, similarProducts, user });
};
