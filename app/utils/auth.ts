import bcrypt from "bcryptjs";

export const bcryptCompare = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};
