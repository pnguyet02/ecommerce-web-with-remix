import bcrypt from "bcryptjs";
import { prisma } from "~/db/prisma.server";

// Thêm người dùng
export const addUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return newUser;
};
