import { useState } from "react";

// Define the CartItem type
interface CartItem {
  name: string;
  price: number;
}

export default function Cart() {
  // Use the CartItem type for the state
  const [items, setItems] = useState<CartItem[]>([]);

  // Example: Add a product to the cart
  const addItemToCart = (item: CartItem) => {
    setItems([...items, item]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl">Your Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="border-b py-2">
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
        Checkout
      </button>
    </div>
  );
}
