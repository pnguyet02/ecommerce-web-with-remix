// src/routes/admin/index.tsx
import { Outlet } from "@remix-run/react";
import AdminDashboard from "~/components/admin/AdminDashboard"; // Import AdminDashboard

export default function AdminIndex() {
  return (
    <AdminDashboard>
      <Outlet />
    </AdminDashboard>
  );
}
