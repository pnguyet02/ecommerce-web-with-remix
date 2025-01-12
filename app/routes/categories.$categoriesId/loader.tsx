import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { Product } from "~/types";

export interface LoaderData {
  // Export the type here
  products: Product[];
  totalPages: number;
  currentPage: number;
  categoryName: string;
  totalProducts: number;
}

export let loader: LoaderFunction = async ({ params, request }) => {
  const categoryId = parseInt(params.categoryId || "", 10);

  // If categoryId is invalid, return 404 error
  if (isNaN(categoryId)) {
    throw new Response("Danh mục không hợp lệ", { status: 404 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 9;

  // Fetch products by category with pagination
  const products = await prisma.product.findMany({
    where: { categoryId },
    skip: (page - 1) * limit,
    take: limit,
  });

  // Count total products in the category
  const totalProducts = await prisma.product.count({
    where: { categoryId },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  // Fetch category name
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Response("Danh mục không tồn tại", { status: 404 });
  }

  return json<LoaderData>({
    products,
    categoryName: category.name,
    totalPages,
    currentPage: page,
    totalProducts,
  });
};
