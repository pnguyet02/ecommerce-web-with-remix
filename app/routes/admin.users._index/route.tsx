import { useLoaderData, Form } from "@remix-run/react";
import { loader } from "./loader";
import type { LoaderData } from "./loader";

export { loader };

export default function AdminUsers() {
  const { users } = useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 p-4 text-center text-lg font-semibold">
        Quản lý Người dùng
      </header>
      <main className="p-8 mt-8 flex-grow">
        <h1 className="text-3xl font-semibold mb-6">Danh sách người dùng</h1>

        <div className="mb-6 flex justify-end">
          <a
            href="/admin/users/add"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded shadow-md transition duration-300"
          >
            Thêm người dùng
          </a>
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-700 text-xs text-gray-200">
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
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="px-6 py-3 text-sm">{user.id}</td>
                <td className="px-6 py-3 text-sm">{user.name}</td>
                <td className="px-6 py-3 text-sm">{user.email}</td>
                <td className="px-6 py-3 text-sm">{user.role}</td>
                <td className="px-6 py-3 text-sm flex space-x-4">
                  <a
                    href={`/admin/users/${user.id}/edit`}
                    className="text-blue-500 hover:text-blue-300 transition duration-200"
                  >
                    Sửa
                  </a>
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
                      className="text-red-500 hover:text-red-300 transition duration-200"
                    >
                      Xóa
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
