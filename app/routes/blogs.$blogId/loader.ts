// src/routes/blogs/$blogId/loader.ts
import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";

export let loader: LoaderFunction = async ({ params }) => {
  const { blogId } = params;

  console.log("Loading blog with ID:", blogId); // Log blogId

  const blog = await prisma.blog.findUnique({
    where: { id: Number(blogId) },
    include: { category: true },
  });

  console.log("Fetched blog:", blog); // Log blog data

  if (!blog) {
    return json({ blog: null });
  }

  return json({ blog });
};
