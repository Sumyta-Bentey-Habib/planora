"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Menu, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session, status } = useSession();
  const role = session?.user?.role;

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">You must be logged in to view the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-purple-700 text-white transition-all ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          {!collapsed && <h1 className="font-bold">Dashboard</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white"
          >
            <Menu />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 px-2">
          <Link
            href="/"
            className="flex items-center gap-2 p-2 hover:bg-purple-600 rounded"
          >
            <Home size={18} /> {!collapsed && "Home"}
          </Link>

          {/* Explorer role */}
          {role === "explorer" && (
            <>
              <Link
                href="/dashboard/explorer"
                className="p-2 hover:bg-purple-600 rounded"
              >
                {!collapsed && "Explore Events"}
              </Link>
              <Link
                href="/dashboard/explorer/wishlist"
                className="p-2 hover:bg-purple-600 rounded"
              >
                {!collapsed && "My Wishlist"}
              </Link>
            </>
          )}

          {/* Event Planner role */}
          {role === "eventplanner" && (
            <>
              <Link
                href="/dashboard/eventplanner/add"
                className="p-2 hover:bg-purple-600 rounded"
              >
                {!collapsed && "Add Event"}
              </Link>
              <Link
                href="/dashboard/eventplanner/events"
                className="p-2 hover:bg-purple-600 rounded"
              >
                {!collapsed && "My Events"}
              </Link>
            </>
          )}

          {/* Admin role */}
          {role === "admin" && (
            <>
              <Link
                href="/dashboard/admin/events"
                className="p-2 hover:bg-purple-600 rounded"
              >
                {!collapsed && "All Events"}
              </Link>
              <Link
                href="/dashboard/admin/users"
                className="p-2 hover:bg-purple-600 rounded"
              >
                {!collapsed && "Manage Users"}
              </Link>
              <Link
                href="/dashboard/admin/bar-chart"
                className="p-2 hover:bg-purple-600 rounded"
              >
                {!collapsed && "Statistics"}
              </Link>
            </>
          )}

          {/* Logout */}
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-4 bg-red-500 hover:bg-red-600 flex items-center gap-2"
          >
            <LogOut size={18} /> {!collapsed && "Logout"}
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
