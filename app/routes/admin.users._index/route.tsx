import { useLoaderData, Form } from "@remix-run/react";
import { loader } from "./loader";
import type { LoaderData } from "./loader";

export { loader };

export default function AdminUsers() {
  const { users } = useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 p-4 text-center text-lg font-semibold shadow-md">
        Quản lý Người dùng
      </header>

      {/* Nội dung chính */}
      <main className="p-8 mt-8 flex-grow max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Danh sách người dùng
        </h1>

        {/* Nút quay về Dashboard */}
        <div className="mb-6 flex justify-between">
          <a
            href="/admin/dashboard"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded shadow-md transition duration-300"
          >
            ⬅ Home
          </a>
          <a
            href="/admin/users/add"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded shadow-md transition duration-300"
          >
            ➕ Thêm người dùng
          </a>
        </div>

        {/* Bảng danh sách người dùng */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-700 text-sm text-gray-200 uppercase">
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Tên</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Vai trò</th>
                <th className="px-6 py-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition duration-200"
                >
                  <td className="px-6 py-3">{user.id}</td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className="px-3 py-1 text-sm rounded bg-gray-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex space-x-4">
                    {/* Nút sửa */}
                    <a
                      href={`/admin/users/${user.id}/edit`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400 transition duration-200"
                    >
                      ✏ Sửa
                    </a>

                    {/* Nút xóa */}
                    <Form
                      method="post"
                      action={`/admin/users/${user.id}/delete`}
                      onSubmit={(e) => {
                        if (
                          !confirm(
                            "Bạn có chắc chắn muốn xóa người dùng này không?"
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <button
                        type="submit"
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 transition duration-200"
                      >
                        🗑 Xóa
                      </button>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
