import { PrismaClient } from "@prisma/client";

// Khởi tạo Prisma Client
let prisma: PrismaClient;

// Kiểm tra môi trường hiện tại
if (process.env.NODE_ENV === "production") {
  // Trong môi trường production, tạo Prisma Client mới
  prisma = new PrismaClient();
} else {
  // Trong môi trường phát triển, sử dụng global để giữ một instance duy nhất
  if (!(global as any).__db) {
    (global as any).__db = new PrismaClient();
  }
  prisma = (global as any).__db;
}

// Xuất Prisma Client
export { prisma };
