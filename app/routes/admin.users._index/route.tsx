import { useLoaderData } from "@remix-run/react";
import { LoaderData } from "~/types"; // Nhập loại dữ liệu từ tệp types của bạn

const ManageUsers = () => {
  const data = useLoaderData<LoaderData>(); // Lấy dữ liệu từ loader

  if (!data?.user) {
    return <div>Không tìm thấy người dùng</div>; // Xử lý trường hợp không có người dùng
  }

  const { user } = data; // Destructure user nếu có dữ liệu

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quản lý người dùng</h2>
      <div className="p-4 border border-gray-200 rounded-md">
        <h3 className="font-semibold">{user.name}</h3>
        <p>Email: {user.email}</p>
        <p>Vai trò: {user.role}</p>
      </div>
    </div>
  );
};

export default ManageUsers;
