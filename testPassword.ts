import * as bcrypt from "bcryptjs";

async function checkPassword() {
  const plainPassword = "testpassword";
  const hashedPassword = await bcrypt.hash(plainPassword, 10); // Mã hóa mật khẩu mới

  console.log("Mật khẩu đã mã hóa:", hashedPassword);

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log("Kết quả so sánh mật khẩu:", isMatch); // Nên là true
}

checkPassword();
