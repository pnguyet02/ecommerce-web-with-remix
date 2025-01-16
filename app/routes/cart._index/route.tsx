// app/routes/cart/_index/route.tsx
import { useLoaderData } from "@remix-run/react";
import { CartItem } from "~/types";

export default function Cart() {
  const { cartItems } = useLoaderData<{ cartItems: CartItem[] }>() || {
    cartItems: [],
  };

  console.log("Cart Items Loaded:", cartItems); // Log cartItems để kiểm tra

  if (cartItems.length === 0) {
    return <p>Giỏ hàng của bạn đang trống.</p>;
  }

  return (
    <div>
      <h1>Giỏ hàng của bạn</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>
              {item.product.name} - {item.quantity} x ${item.product.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
