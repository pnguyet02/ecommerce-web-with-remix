import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/sessions"; // Giả sử bạn đã có hàm này để lấy thông tin người dùng
import { useLoaderData } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

// Định nghĩa kiểu cho dữ liệu trả về từ loader
interface LoaderData {
  user: { id: number; name: string; role: string } | null; // Thêm kiểu dữ liệu cho user
}

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUserFromSession(request); // Lấy thông tin người dùng từ session
  return json({ user });
};

const Contact: React.FC = () => {
  const { user } = useLoaderData<LoaderData>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Dùng để chuyển hướng trang

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Lỗi không xác định!");
      }

      setMessage(result.message);
      setError(null);

      // Chờ 2 giây rồi reload trang
      setTimeout(() => {
        window.location.reload(); // Reload trang
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Có lỗi xảy ra";
      setError(errorMessage);
      setMessage(null);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header user={user} />
      <main className="container mx-auto py-8 px-4">
        <section className="mb-12 flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="/images/contact.jpg"
              alt="Liên hệ với chúng tôi"
              className="rounded shadow-lg mx-auto hover:scale-105 transition-transform duration-300 max-w-xs md:max-w-sm object-contain"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-lg leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi nào hoặc muốn biết thêm thông tin về các
              sản phẩm của chúng tôi, hãy liên hệ ngay!
            </p>

            {message && (
              <p className="mt-4 p-3 bg-green-100 border border-green-500 text-green-700 rounded">
                {message}
              </p>
            )}
            {error && (
              <p className="mt-4 p-3 bg-red-100 border border-red-500 text-red-700 rounded">
                {error}
              </p>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
                  Họ và tên:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full p-3 mt-2 border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full p-3 mt-2 border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-700"
                >
                  Tin nhắn:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full p-3 mt-2 border rounded-md"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
