import { prisma } from "~/db/prisma.server";
import { ActionFunction, redirect } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const name = formData.get("name")!;
  const description = formData.get("description")!;
  const price = parseFloat(formData.get("price")!);
  const stock = parseInt(formData.get("stock")!);
  const image = formData.get("image")!;
  const categoryId = parseInt(formData.get("categoryId")!);

  // Tạo mới sản phẩm
  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      image,
      categoryId: categoryId > 0 ? categoryId : undefined, // Nếu có chọn danh mục
    },
  });

  return redirect("/admin/products");
};
