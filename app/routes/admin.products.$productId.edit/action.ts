// app/routes/admin/products.$productId.edit/action.ts
import { prisma } from "~/db/prisma.server";
import { redirect } from "react-router-dom";

export const action = async ({
  request,
  params,
}: {
  request: Request;
  params: { productId: string };
}) => {
  const formData = new URLSearchParams(await request.text());

  const name = formData.get("name") || "";
  const description = formData.get("description") || "";
  const price = parseFloat(formData.get("price") || "0");
  const stock = parseInt(formData.get("stock") || "0");
  const image = formData.get("image") || "";
  const categoryId = parseInt(formData.get("categoryId") || "0");

  // Cập nhật sản phẩm trong cơ sở dữ liệu
  await prisma.product.update({
    where: { id: parseInt(params.productId) },
    data: { name, description, price, stock, image, categoryId },
  });

  // Redirect sau khi cập nhật
  return redirect(`/admin/products`);
};
