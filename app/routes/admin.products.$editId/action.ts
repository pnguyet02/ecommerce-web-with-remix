import { ActionFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server"; // Giả sử bạn đang sử dụng Prisma

type ActionParams = {
  editId: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  // Dùng type assertion để nói với TypeScript rằng params có kiểu ActionParams
  const { editId } = params as ActionParams;

  // Logic xử lý
  const product = await prisma.product.update({
    where: { id: parseInt(editId) }, // Chuyển đổi editId thành số
    data: {
      // Dữ liệu cần cập nhật
    },
  });

  return { product };
};
