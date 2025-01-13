import { LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  try {
    const categories = await prisma.category.findMany();
    console.log("Fetched categories from database:", categories);
    return json({ categories: categories || [] });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return json({ categories: [] });
  }
};
