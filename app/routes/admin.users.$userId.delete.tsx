import { redirect } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";

export const action = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  if (!userId || isNaN(Number(userId))) {
    throw new Response("Invalid user ID", { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: parseInt(userId, 10) },
    });
    return redirect("/admin/users");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Response("Error deleting user", { status: 500 });
  }
};
