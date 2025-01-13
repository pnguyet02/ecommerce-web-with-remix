// loader.ts
import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { LoaderData } from "~/types"; // Import LoaderData từ types.ts

export const loader: LoaderFunction = async ({ params }) => {
  const { editId } = params;

  if (!editId) {
    throw new Error("Product ID is required");
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(editId) },
    include: {
      category: true, // Bao gồm thông tin category nếu có
    },
  });

  // Trả về danh sách sản phẩm, không phải chỉ một sản phẩm
  const products = product ? [product] : [];

  return json<LoaderData>({
    products, // Trả về mảng sản phẩm, dù chỉ có một sản phẩm
    user: null, // Thêm thông tin user nếu cần
  });
};
