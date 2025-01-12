// // components/AccountManagement.tsx
// import { useState } from "react";

// export default function AccountManagement() {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john@example.com",
//   });

//   const handleUpdateAccount = (newName) => {
//     setUser({ ...user, name: newName });
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl">Account Management</h2>
//       <div className="mt-4">
//         <label className="block">Name</label>
//         <input
//           type="text"
//           value={user.name}
//           onChange={(e) => handleUpdateAccount(e.target.value)}
//           className="border p-2 mt-2"
//         />
//       </div>
//       <div className="mt-4">
//         <label className="block">Email</label>
//         <input
//           type="email"
//           value={user.email}
//           onChange={(e) => setUser({ ...user, email: e.target.value })}
//           className="border p-2 mt-2"
//         />
//       </div>
//       <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
//         Save Changes
//       </button>
//     </div>
//   );
// }
