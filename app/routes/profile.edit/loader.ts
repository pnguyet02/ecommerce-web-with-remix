// src/routes/profile/edit/loader.ts
import { prisma } from "~/db/prisma.server";
import { json, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/sessions";
export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return { redirect: "/login" };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { redirect: "/login" };
  }

  return json({ user });
};
