import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Sản phẩm 1",
        description: "Mô tả sản phẩm 1",
        price: 100,
        stock: 10,
        image: "image1",
      },
      {
        name: "Sản phẩm 2",
        description: "Mô tả sản phẩm 2",
        price: 200,
        stock: 5,
        image: "image2",
      },
      {
        name: "Sản phẩm 3",
        description: "Mô tả sản phẩm 3",
        price: 150,
        stock: 8,
        image: "image3",
      },
    ],
  });
}

main()
  .then(() => console.log("Dữ liệu đã được seed!"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
