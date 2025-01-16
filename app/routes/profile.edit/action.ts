// src/routes/profile/edit/action.ts
import { prisma } from "~/db/prisma.server";
import { redirect, json, ActionFunction } from "@remix-run/node";
import { getSession } from "~/sessions"; // Adjust based on your session logic

export let action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return redirect("/login");
  }

  const formData = new URLSearchParams(await request.text());
  const name = formData.get("name");
  const email = formData.get("email");

  if (name && email) {
    await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    return redirect("/"); // Redirect to profile page after successful update
  }

  return json({ error: "Please fill out all fields" });
};
