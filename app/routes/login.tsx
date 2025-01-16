import { json, redirect, ActionFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { setUserSession } from "~/sessions";
import bcrypt from "bcryptjs";

// Xử lý hành động login
export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return json({ error: "Email và mật khẩu là bắt buộc" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return json({ error: "Email không tồn tại" }, { status: 400 });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password.trim(),
    user.password.trim()
  );

  if (!isPasswordCorrect) {
    return json({ error: "Mật khẩu không đúng" }, { status: 400 });
  }

  // Lấy giá trị cookie từ hàm setUserSession
  const sessionCookie = await setUserSession(user, request);

  // Điều hướng đến trang phù hợp
  const redirectTo = user.role === "admin" ? "/admin/dashboard" : "/";
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": sessionCookie, // Đặt cookie ở đây
    },
  });
};

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
