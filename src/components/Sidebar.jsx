"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, Calendar, Shield } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-purple-700 text-white p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <nav className="space-y-4">
        <Link href="/dashboard">
          <Button variant="secondary" className="w-full justify-start">
            <LayoutDashboard className="w-4 h-4 mr-2" /> Home
          </Button>
        </Link>

        <Link href="/dashboard/explorer">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-purple-600">
            <User className="w-4 h-4 mr-2" /> Explorer
          </Button>
        </Link>

        <Link href="/dashboard/eventplanner">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-purple-600">
            <Calendar className="w-4 h-4 mr-2" /> Event Planner
          </Button>
        </Link>

        <Link href="/dashboard/admin">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-purple-600">
            <Shield className="w-4 h-4 mr-2" /> Admin
          </Button>
        </Link>
      </nav>
    </aside>
  );
}
