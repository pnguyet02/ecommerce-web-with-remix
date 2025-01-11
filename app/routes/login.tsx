import { json, redirect, ActionFunction } from "@remix-run/node";
import { prisma } from "~/db/prisma.server";
import { setSession } from "~/sessions";
import { bcryptCompare } from "../utils/auth";

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

  console.log("User từ database:", user);

  if (!user) {
    console.log("Email không tồn tại.");
    return json({ error: "Email không tồn tại" }, { status: 400 });
  }

  const isPasswordCorrect = await bcryptCompare(password, user.password);
  console.log("Mật khẩu hợp lệ:", isPasswordCorrect);

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

  return redirect("/user/index", {
    headers: {
      "Set-Cookie": await setSession(user),
    },
  });
};

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
