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
  const limit = 9; // Items per page
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

  // Log categoryId and filter params for debugging
  console.log("Category ID:", categoryId);
  console.log("Search Query:", searchQuery);
  console.log("Page:", page);
  console.log("Sort:", sort);

  // Fetch products based on category, search query, and sorting
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchQuery, // Filter by search query
      },
      categoryId: categoryId > 0 ? categoryId : undefined, // Filter by categoryId if valid
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy,
  });

  // Count total products for pagination
  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: searchQuery,
      },
      categoryId: categoryId > 0 ? categoryId : undefined,
    },
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalProducts / limit);

  // Fetch categories for the sidebar
  const categories = await prisma.category.findMany();

  // Log fetched products and pagination data
  console.log("Fetched Products:", products);
  console.log("Total Products:", totalProducts);
  console.log("Total Pages:", totalPages);

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
