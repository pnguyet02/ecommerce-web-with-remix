// src/routes/blogs/$blogId/loader.ts
import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";

export let loader: LoaderFunction = async ({ params }) => {
  const { blogId } = params;

  console.log("Loading blog with ID:", blogId);

  const blog = await prisma.blog.findUnique({
    where: { id: Number(blogId) },
    include: { category: true },
  });

  console.log("Fetched blog:", blog);

  return json({ blog: blog || null }); // Explicitly returning null if no blog found
};
