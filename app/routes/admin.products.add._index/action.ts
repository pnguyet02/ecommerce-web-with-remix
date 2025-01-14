// Import the redirect function
import { redirect } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
// Then use it in your action
export const action = async ({ request }: { request: Request }) => {
  const formData = new URLSearchParams(await request.text());

  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price") || "0");
  const stock = parseInt(formData.get("stock") || "0", 10);
  const image = formData.get("image");
  const categoryId = parseInt(formData.get("categoryId") || "0", 10);

  if (
    !name ||
    !description ||
    isNaN(price) ||
    isNaN(stock) ||
    !image ||
    isNaN(categoryId)
  ) {
    return { error: "Vui lòng điền đầy đủ thông tin." };
  }

  // Thêm sản phẩm mới vào cơ sở dữ liệu (giả sử bạn đang dùng Prisma)
  await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
      image,
      categoryId,
    },
  });

  // Sau khi thêm sản phẩm thành công, điều hướng đến danh sách sản phẩm
  return redirect("/admin/products");
};
