"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, Calendar, Shield } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: <LayoutDashboard className="w-5 h-5 mr-2" /> },
    { href: "/dashboard/explorer", label: "Explorer", icon: <User className="w-5 h-5 mr-2" /> },
    { href: "/dashboard/eventplanner", label: "Event Planner", icon: <Calendar className="w-5 h-5 mr-2" /> },
    { href: "/dashboard/admin", label: "Admin", icon: <Shield className="w-5 h-5 mr-2" /> },
  ];

  return (
    <aside className="w-64 bg-purple-700 text-white p-6 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive ? "bg-purple-900 hover:bg-purple-800" : "text-white hover:bg-purple-600"
                } transition-colors duration-300 rounded-lg`}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
