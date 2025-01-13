import { useState } from "react";

// Define the prop types
interface AccountManagementProps {
  name: string;
  email: string;
  onUpdate: (newName: string, newEmail: string) => void; // Function to handle updates
}

export default function AccountManagement({
  name,
  email,
  onUpdate,
}: AccountManagementProps) {
  const [user, setUser] = useState({
    name,
    email,
  });

  // Handle the name update
  const handleUpdateAccount = (newName: string) => {
    setUser((prevUser) => ({ ...prevUser, name: newName }));
    onUpdate(newName, user.email); // Call onUpdate to send updated values
  };

  // Handle the email update
  const handleUpdateEmail = (newEmail: string) => {
    setUser((prevUser) => ({ ...prevUser, email: newEmail }));
    onUpdate(user.name, newEmail); // Call onUpdate to send updated values
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl">Account Management</h2>
      <div className="mt-4">
        <label className="block">Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => handleUpdateAccount(e.target.value)}
          className="border p-2 mt-2"
        />
      </div>
      <div className="mt-4">
        <label className="block">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => handleUpdateEmail(e.target.value)}
          className="border p-2 mt-2"
        />
      </div>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
        Save Changes
      </button>
    </div>
  );
}
