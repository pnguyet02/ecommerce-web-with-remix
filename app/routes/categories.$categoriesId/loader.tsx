import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { Product } from "~/types";

export interface LoaderData {
  products: Product[];
  totalPages: number;
  currentPage: number;
  categoryName: string;
  totalProducts: number;
}

export let loader: LoaderFunction = async ({ params, request }) => {
  const categoryId = parseInt(params.categoryId || "", 10);

  // Nếu categoryId không hợp lệ, trả về lỗi 404
  if (isNaN(categoryId)) {
    throw new Response("Danh mục không hợp lệ", { status: 404 });
  }

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 9;

  // Truy vấn sản phẩm theo danh mục với phân trang
  const products = await prisma.product.findMany({
    where: { categoryId },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      category: true, // Bao gồm thông tin danh mục cho mỗi sản phẩm
    },
  });

  // Đếm tổng số sản phẩm trong danh mục
  const totalProducts = await prisma.product.count({
    where: { categoryId },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  // Truy vấn thông tin danh mục
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Response("Danh mục không tồn tại", { status: 404 });
  }

  return json<LoaderData>({
    products, // Sản phẩm đã bao gồm thông tin category
    categoryName: category.name,
    totalPages,
    currentPage: page,
    totalProducts,
  });
};
