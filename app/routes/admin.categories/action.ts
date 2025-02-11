import { json, redirect } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const categoryType = formData.get("categoryType");
  const name = formData.get("name") as string;
  const id = formData.get("id") ? Number(formData.get("id")) : null;

  if (!categoryType || !name) {
    return json({ error: "Vui lòng nhập đầy đủ thông tin" }, { status: 400 });
  }

  if (actionType === "create") {
    if (categoryType === "product") {
      await prisma.category.create({ data: { name } });
    } else {
      await prisma.blogCategory.create({ data: { name } });
    }
  } else if (actionType === "update" && id) {
    if (categoryType === "product") {
      await prisma.category.update({ where: { id }, data: { name } });
    } else {
      await prisma.blogCategory.update({ where: { id }, data: { name } });
    }
  } else if (actionType === "delete" && id) {
    if (categoryType === "product") {
      await prisma.category.delete({ where: { id } });
    } else {
      await prisma.blogCategory.delete({ where: { id } });
    }
  }

  return redirect("/admin/categories");
};
