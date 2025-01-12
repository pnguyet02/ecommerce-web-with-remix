import * as bcrypt from "bcryptjs";
import * as mysql from "mysql2/promise";

async function addUser() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rtk", // Đảm bảo kết nối đúng cơ sở dữ liệu
  });

  // Mã hóa mật khẩu
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  // Tạo người dùng
  const users = [
    ["Admin", "admin@example.com", adminPassword, "admin"],
    ["User1", "user1@example.com", userPassword, "user"],
    ["User2", "user2@example.com", userPassword, "user"],
    ["User3", "user3@example.com", userPassword, "user"],
  ];

  const [result] = await connection.execute(
    "INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)",
    users.flat()
  );

  console.log("Users added:", result);
}

addUser().catch((err) => console.error("Error adding users:", err));
