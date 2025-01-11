import bcrypt from "bcryptjs";

async function hashPassword() {
  const password = "user123"; // Mật khẩu cần mã hóa

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10); // 10 là số vòng salt (bcrypt yêu cầu)
  console.log("Hashed password:", hashedPassword);
}

hashPassword();
