// src/routes/profile/edit/route.tsx
import { useLoaderData, Form, Link } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { loader } from "./loader";
import { action } from "./action";
import { User } from "~/types";
export { loader, action };
export default function EditProfile() {
  const { user } = useLoaderData<{ user: User }>();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-4xl w-full sm:w-96 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Edit Profile
        </h1>
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Save Changes
            </button>
          </div>
        </Form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
