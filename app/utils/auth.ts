// import bcrypt from "bcryptjs"; // Nhập bcryptjs để mã hóa và so sánh mật khẩu

// export const bcryptCompare = async (
//   plainTextPassword: string, // Mật khẩu plain text từ người dùng
//   hashedPassword: string // Mật khẩu đã mã hóa từ database
// ) => {
//   try {
//     // So sánh mật khẩu plain text với mật khẩu đã mã hóa
//     const match = await bcrypt.compare(plainTextPassword, hashedPassword);
//     return match; // Trả về true nếu mật khẩu đúng, false nếu sai
//   } catch (error) {
//     console.error("Lỗi khi so sánh mật khẩu:", error); // In lỗi nếu có sự cố
//     throw new Error("Lỗi khi so sánh mật khẩu"); // Ném lỗi nếu so sánh thất bại
//   }
// };
// utils/auth.ts
import { prisma } from "~/db/prisma.server";
import { setUserSession } from "~/sessions";

// Hàm xác thực người dùng
export const authenticateUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && user.password === password) {
    // Kiểm tra mật khẩu
    return user;
  }

  return null; // Nếu không tìm thấy user hoặc mật khẩu không đúng
};

// Hàm xử lý đăng nhập
export const login = async (
  email: string,
  password: string,
  request: Request
) => {
  const user = await authenticateUser(email, password);

  if (user) {
    // Lưu thông tin người dùng vào session
    await setUserSession(user, request);
    return user;
  } else {
    return null; // Nếu đăng nhập không thành công
  }
};
