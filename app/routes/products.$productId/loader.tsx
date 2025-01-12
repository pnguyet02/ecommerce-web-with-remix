import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {
  console.log(">>>> check params: ", params);
  const { productId } = params;

  // Validate productId
  const id = Number(productId);
  if (isNaN(id)) {
    throw new Response("Invalid Product ID", { status: 400 });
  }

  // Fetch product details
  const product = await prisma.product.findUnique({
    where: { id },
  });

  // Handle product not found
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  // Fetch similar products
  const similarProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
  });

  return json({ product, similarProducts });
};
