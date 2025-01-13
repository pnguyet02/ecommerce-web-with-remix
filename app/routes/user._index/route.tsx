import { useLoaderData } from "@remix-run/react";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import Cart from "~/components/user/Cart";
import AccountManagement from "~/components/user/AccountManagement";
import { User } from "~/types"; // Import your User type
import { getUserFromSession } from "~/sessions";
export let loader = async ({ request }: { request: Request }) => {
  const user = await getUserFromSession(request); // Get user from session or DB
  return { user }; // Return user data
};

export default function Home() {
  const { user } = useLoaderData<{ user: User }>(); // Access the loaded user data

  // Update user function (can be handled via a form action)
  const handleUserUpdate = (newName: string, newEmail: string) => {
    // Handle update logic, e.g., make a POST request or update state
    console.log(newName, newEmail);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to My E-commerce!</h1>

        {/* Cart and Account Management Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cart Section */}
          <Cart />

          {/* Account Management Section */}
          <AccountManagement
            name={user.name}
            email={user.email}
            onUpdate={handleUserUpdate}
          />
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
