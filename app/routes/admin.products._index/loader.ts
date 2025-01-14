import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { Product, CategoryData } from "~/types";

export interface LoaderData {
  products: Product[];
  totalPages: number;
  currentPage: number;
  searchQuery: string;
  sort: string;
  categories: CategoryData[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") || "";

  // Get categoryId and ensure it's a valid number
  const categoryId = parseInt(url.searchParams.get("categoryId") || "0", 10);

  // Get page and sort values
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 6; // Items per page
  const sort = url.searchParams.get("sort") || "price-asc";

  // Set the order for sorting
  let orderBy = {};
  switch (sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "name-asc":
      orderBy = { name: "asc" };
      break;
    case "name-desc":
      orderBy = { name: "desc" };
      break;
    default:
      orderBy = { price: "asc" };
      break;
  }

  // Fetch products based on category, search query, and sorting
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchQuery,
      },
      categoryId: categoryId > 0 ? categoryId : undefined,
    },
    skip: (page - 1) * limit, // Lấy trang đúng
    take: limit,
    orderBy,
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });

  console.log("Fetched Products:", products);
  // Count total products for pagination
  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: searchQuery,
      },
      categoryId: categoryId > 0 ? categoryId : undefined, // Nếu categoryId là null hoặc 0, bỏ qua bộ lọc
    },
  });
  console.log("categoryId:", categoryId);
  // console.log("Fetched Products:", products);

  // Calculate total pages correctly
  const totalPages = Math.ceil(totalProducts / limit);
  console.log("Total Products:", totalProducts);
  console.log("Total Pages:", totalPages);
  // Fetch categories for the sidebar
  const categories = await prisma.category.findMany();

  // Return data to the frontend
  return json<LoaderData>({
    products,
    totalPages,
    currentPage: page,
    searchQuery,
    sort,
    categories,
  });
};
