"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
var client_1 = require("@prisma/client");
// Khởi tạo Prisma Client
var prisma;
// Kiểm tra môi trường hiện tại
if (process.env.NODE_ENV === "production") {
    // Trong môi trường production, tạo Prisma Client mới
    exports.prisma = prisma = new client_1.PrismaClient();
}
else {
    // Trong môi trường phát triển, sử dụng global để giữ một instance duy nhất
    if (!global.__db) {
        global.__db = new client_1.PrismaClient();
    }
    exports.prisma = prisma = global.__db;
}
