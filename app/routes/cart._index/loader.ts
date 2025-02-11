import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { getSession } from "~/sessions";
import { CartItem } from "~/types";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = Number(session.get("userId"));

  if (!userId) {
    return json({ cartItems: [] });
  }

  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    return json({ cartItems });
  } catch (error) {
    console.error("Lỗi khi tải giỏ hàng:", error);
    return json({ cartItems: [] });
  }
};
