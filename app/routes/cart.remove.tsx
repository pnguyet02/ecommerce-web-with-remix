// routes/cart/api/remove.ts

import { json, redirect } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";

export let action = async ({ request }: { request: Request }) => {
  const formData = new URLSearchParams(await request.text());
  const itemId = formData.get("itemId");

  if (!itemId) {
    return json({ error: "Item ID is required" }, { status: 400 });
  }

  try {
    // Delete the cart item from the database
    await prisma.cart.delete({
      where: { id: parseInt(itemId) },
    });

    // Redirect back to the cart page after removing the item
    return redirect("/cart");
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return json({ error: "Failed to remove item from cart" }, { status: 500 });
  }
};
