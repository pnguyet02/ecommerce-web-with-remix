import { useLoaderData, Form, useNavigate } from "react-router-dom";
import { loader } from "./loader"; // Giả sử loader đã lấy thông tin người dùng
import { action } from "./action"; // Giả sử action đã được định nghĩa cho việc cập nhật người dùng
import { User } from "~/types";

export { loader, action };

export default function EditUser() {
  const { user } = useLoaderData() as { user: User };
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Chỉnh sửa người dùng
        </h1>
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="name" className="block">
              Tên người dùng
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              className="p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              className="p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block">
              Vai trò
            </label>
            <select
              id="role"
              name="role"
              defaultValue={user.role}
              className="p-2 w-full border rounded"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Cập nhật người dùng
            </button>
            <button
              type="button" // Loại button để tránh submit form
              onClick={() => navigate("/admin/users")} // Điều hướng về trang danh sách người dùng
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full"
            >
              Thoát
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
