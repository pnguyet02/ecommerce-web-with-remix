import { json, ActionFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { getSession } from "~/sessions";

export let action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const productId = formData.get("productId");
  const quantity = Number(formData.get("quantity") || 1);

  if (!productId) {
    return json({ error: "Missing productId" }, { status: 400 });
  }

  try {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: Number(productId),
        },
      },
    });

    if (existingCartItem) {
      // Nếu đã tồn tại, cập nhật số lượng
      await prisma.cart.update({
        where: {
          userId_productId: { userId, productId: Number(productId) },
        },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // Nếu chưa có, tạo mới
      await prisma.cart.create({
        data: {
          userId,
          productId: Number(productId),
          quantity,
        },
      });
    }

    return json({ message: "Thêm sản phẩm vào giỏ hàng thành công" });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    return json(
      { error: "Không thể thêm sản phẩm vào giỏ hàng" },
      { status: 500 }
    );
  }
};
