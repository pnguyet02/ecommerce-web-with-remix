import { useLoaderData } from "@remix-run/react"; // Importing the hook
import { LoaderData } from "~/types"; // Your custom types
import { json, redirect } from "@remix-run/node";
import { getUserFromSession } from "~/sessions";

// Define the loader function for this route
export const loader = async ({ request }: { request: Request }) => {
  const user = await getUserFromSession(request);

  if (!user) {
    return redirect("/login"); // Redirect to login if no user is found
  }

  return json({ user }); // Return the user data as JSON
};

// Component that uses the loader data
const AdminDashboard = () => {
  const { user } = useLoaderData<LoaderData>(); // Access the loader data

  // Check if user is null and handle the case accordingly
  if (!user) {
    return <div>Loading...</div>; // Or redirect to login or handle it as needed
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      {/* Render user details */}
    </div>
  );
};

export default AdminDashboard;
