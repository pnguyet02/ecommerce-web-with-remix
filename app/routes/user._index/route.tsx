// UserPage.tsx
import { useLoaderData } from "@remix-run/react"; // Import useLoaderData để lấy dữ liệu từ loader
import { LoaderData } from "~/types"; // Đảm bảo import đúng kiểu LoaderData từ nơi khai báo kiểu

export { loader } from "./loader";

export default function UserPage() {
  const { user } = useLoaderData<LoaderData>(); // Khai báo kiểu LoaderData cho useLoaderData

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Welcome, {user.name}!
        </h1>
        <div className="text-center mb-4">
          <p className="text-xl text-gray-600">
            You are logged in as a normal user. This is your dashboard.
          </p>
        </div>
        <div className="mt-6">
          <p className="text-lg text-gray-700">Your details:</p>
          <ul className="text-sm text-gray-600">
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Role: {user.role}</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <a
            href="/logout"
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
}
