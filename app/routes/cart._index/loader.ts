// app/routes/cart/_index/loader.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { getSession } from "~/sessions";

export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  console.log("userId from session:", userId);
  if (!userId) {
    return json({ cartItems: [] }); // Giỏ hàng trống nếu không có userId
  }

  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true }, // Bao gồm thông tin sản phẩm trong kết quả
    });

    console.log("Loaded cartItems:", cartItems); // Log dữ liệu giỏ hàng

    return json({ cartItems }); // Trả về dữ liệu giỏ hàng
  } catch (error) {
    console.error("Lỗi khi tải giỏ hàng:", error);
    return json({ cartItems: [] });
  }
};
