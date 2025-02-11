import { json, type LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";

export const loader: LoaderFunction = async () => {
  const productCategories = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });
  const blogCategories = await prisma.blogCategory.findMany({
    orderBy: { id: "desc" },
  });

  return json({ productCategories, blogCategories });
};

export type LoaderData = {
  productCategories: { id: number; name: string }[];
  blogCategories: { id: number; name: string }[];
};
