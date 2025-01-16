// import { useLoaderData } from "@remix-run/react";
// import { CartItem } from "~/types";

// export default function Cart() {
//   const { cartItems } = useLoaderData<{ cartItems: CartItem[] }>();

//   const removeFromCart = async (cartItemId: number) => {
//     // Gửi yêu cầu đến API để xóa sản phẩm khỏi giỏ hàng
//     const response = await fetch(`/cart/api/cart/${cartItemId}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       // Cập nhật lại giao diện sau khi xóa
//       alert("Sản phẩm đã được xóa khỏi giỏ hàng");
//       window.location.reload(); // Tải lại trang để lấy giỏ hàng mới
//     } else {
//       alert("Có lỗi xảy ra khi xóa sản phẩm");
//     }
//   };

//   return (
//     <div>
//       <h1>Giỏ hàng</h1>
//       {cartItems.length === 0 ? (
//         <p>Giỏ hàng của bạn đang trống.</p>
//       ) : (
//         <div>
//           {cartItems.map((item) => (
//             <div key={item.id} className="flex justify-between">
//               <div>
//                 <img
//                   src={item.product.image}
//                   alt={item.product.name}
//                   className="w-20 h-20 object-cover"
//                 />
//                 <h3>{item.product.name}</h3>
//                 <p>Số lượng: {item.quantity}</p>
//                 <p>{item.product.price} USD</p>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="bg-red-500 text-white py-1 px-4 rounded"
//               >
//                 Xóa
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
