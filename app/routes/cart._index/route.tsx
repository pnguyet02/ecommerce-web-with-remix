import { useState } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { CartItem } from "~/types";
import { loader } from "./loader"; // Import loader đã tách

export { loader }; // Xuất loader ra ngoài để Remix sử dụng

export default function Cart() {
  const { cartItems } = useLoaderData<{ cartItems: CartItem[] }>();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>(cartItems);

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((item) => item !== id));
  };

  const totalAmount = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce(
      (total, item) => total + (item.product?.price || 0) * item.quantity,
      0
    );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <p className="text-xl font-semibold">🛒 Giỏ hàng của bạn đang trống.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          ⬅ Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🛍 Giỏ hàng của bạn
      </h1>
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          ⬅ Quay lại
        </button>

        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelectItem(item.id)}
                className="mr-4 h-5 w-5 accent-green-500"
              />

              <div className="flex items-center space-x-4 flex-grow">
                <img
                  src={item.product?.image || "/placeholder.jpg"}
                  alt={item.product?.name || "Sản phẩm"}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="text-lg font-semibold">
                    {item.product?.name || "Sản phẩm không tồn tại"}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-yellow-400 font-bold">
                      ${item.product?.price || 0}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-l-lg text-white font-bold"
                >
                  −
                </button>
                <span className="px-4 py-1 bg-gray-800 text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-r-lg text-white font-bold"
                >
                  +
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <p className="text-xl font-semibold text-yellow-400">
                  ${(item.product?.price || 0) * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-2xl font-bold text-yellow-400">
            Tổng tiền: ${totalAmount}
          </p>
          <button
            disabled={selectedItems.length === 0}
            className={`py-2 px-6 rounded-lg shadow-md font-bold ${
              selectedItems.length === 0
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
