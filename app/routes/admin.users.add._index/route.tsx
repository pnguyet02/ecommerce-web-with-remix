import { ActionFunction, json, redirect } from "@remix-run/node";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { addUser } from "./action";

export let action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  if (!name || !email || !password || !role) {
    return json(
      { error: "Tất cả các trường đều phải được điền đầy đủ." },
      { status: 400 }
    );
  }

  await addUser(name, email, password, role);

  return redirect("/admin/users");
};

export default function AddUser() {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Thêm người dùng mới
        </h1>
        <form method="post" className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tên"
            className="p-3 bg-gray-700 border border-gray-600 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 bg-gray-700 border border-gray-600 rounded w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="p-3 bg-gray-700 border border-gray-600 rounded w-full"
          />
          <select
            name="role"
            className="p-3 bg-gray-700 border border-gray-600 rounded w-full"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 py-2 px-4 rounded text-white w-full"
            >
              Thêm người dùng
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="bg-gray-500 py-2 px-4 rounded text-white w-full"
            >
              Thoát
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
