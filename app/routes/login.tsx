import { json, redirect, ActionFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { setSession } from "~/sessions";
import bcrypt from "bcryptjs";
import { authenticateUser } from "~/utils/auth";
// Hàm cập nhật mật khẩu mới trong DB (nếu cần)
// const updatePassword = async (email: string, newPassword: string) => {
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   await prisma.user.update({
//     where: { email: email },
//     data: { password: hashedPassword },
//   });
//   console.log("Mật khẩu đã được cập nhật thành công!");
// };

export let action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Email:", email);
  console.log("Password:", password);

  if (!email || !password) {
    console.log("Thiếu email hoặc mật khẩu.");
    return json({ error: "Email và mật khẩu là bắt buộc" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    console.log("Email không tồn tại.");
    return json({ error: "Email không tồn tại" }, { status: 400 });
  }

  // In ra thông tin chi tiết mật khẩu trong DB và mật khẩu người dùng nhập vào
  console.log("Mật khẩu đã mã hóa trong DB:", user.password);
  console.log("Mật khẩu người dùng nhập vào:", password);

  // Loại bỏ khoảng trắng ở đầu và cuối mật khẩu
  const passwordTrimmed = password.trim();
  const userPasswordTrimmed = user.password.trim();
  console.log("Mật khẩu người dùng nhập vào sau khi trim:", passwordTrimmed);
  console.log("Mật khẩu trong DB sau khi trim:", userPasswordTrimmed);

  // So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập vào
  const isPasswordCorrect = await bcrypt.compare(
    passwordTrimmed,
    userPasswordTrimmed
  );
  console.log("Kết quả so sánh mật khẩu:", isPasswordCorrect);

  if (!isPasswordCorrect) {
    console.log("Mật khẩu không đúng.");
    return json({ error: "Mật khẩu không đúng" }, { status: 400 });
  }

  console.log("Vai trò người dùng:", user.role);

  if (user.role === "admin") {
    return redirect("/admin/dashboard", {
      headers: {
        "Set-Cookie": await setSession(user),
      },
    });
  }

  return redirect("/user", {
    headers: {
      "Set-Cookie": await setSession(user),
    },
  });
};
// login.ts (action của trang login)

// routes/login.tsx

// export let action = async ({ request }: any) => {
//   // Lấy dữ liệu từ form gửi lên (POST request)
//   let formData = new URLSearchParams(await request.text());
//   let email = formData.get("email"); // Lấy giá trị email từ form
//   let password = formData.get("password");

//   // Kiểm tra nếu email và password có tồn tại và hợp lệ
//   if (!email || !password) {
//     return { error: "Email and password are required" };
//   }

//   // Xác thực người dùng qua email và mật khẩu
//   let user = await authenticateUser(email, password);

//   if (user) {
//     // Nếu đăng nhập thành công, lưu user vào session và điều hướng đến trang dashboard
//     return redirect("/dashboard", {
//       headers: {
//         "Set-Cookie": await setUserSession(user, request), // Truyền đúng 2 đối số
//       },
//     });
//   } else {
//     // Nếu thông tin đăng nhập không hợp lệ
//     return { error: "Invalid credentials" };
//   }
// };

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h1>
        <form method="post" action="/login">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
