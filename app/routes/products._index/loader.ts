import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { Product, CategoryData } from "~/types";
import { getUserFromSession } from "~/sessions";

export interface LoaderData {
  products: Product[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  sort: string;
  categories: CategoryData[];
  user: { id: number; name: string; role: string } | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const rawUser = await getUserFromSession(request);

  // Xử lý user để phù hợp với kiểu dữ liệu trong LoaderData
  const user =
    rawUser && rawUser.userId && rawUser.name && rawUser.role
      ? {
          id: Number(rawUser.userId),
          name: String(rawUser.name),
          role: String(rawUser.role),
        }
      : null;

  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || "";
  const categoryId = parseInt(url.searchParams.get("categoryId") || "0");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 9;
  const sort = url.searchParams.get("sort") || "price-asc";

  let orderBy = {};
  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  } else if (sort === "name-asc") {
    orderBy = { name: "asc" };
  } else if (sort === "name-desc") {
    orderBy = { name: "desc" };
  }

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchQuery,
      },
      categoryId: categoryId > 0 ? categoryId : undefined,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy,
    include: {
      category: true,
    },
  });

  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: searchQuery,
      },
      categoryId: categoryId > 0 ? categoryId : undefined,
    },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  const categories = await prisma.category.findMany();

  return json<LoaderData>({
    products,
    totalPages,
    currentPage: page,
    searchQuery,
    sort,
    categories,
    user, // Trả thông tin user sau khi xử lý
  });
};
