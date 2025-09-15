"use client"

import Link from "next/link"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"
import Swal from "sweetalert2"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut()
        Swal.fire("Logged out!", "You have been logged out.", "success")
      }
    })
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b shadow-sm bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
        {/* Left - Brand */}
        <Link
          href="/"
          className="text-2xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent"
        >
          Planora
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="rounded-md px-4 py-2 text-sm font-medium hover:bg-purple-100 transition">
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="rounded-md px-4 py-2 text-sm font-medium hover:bg-purple-100 transition">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className="rounded-md px-4 py-2 text-sm font-medium hover:bg-purple-100 transition">
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Dashboard only when logged in */}
              {session && (
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink className="rounded-md px-4 py-2 text-sm font-medium hover:bg-purple-100 transition">
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {session ? (
            <>
              <span className="text-sm font-medium">Hi, {session.user?.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-purple-700 hover:bg-purple-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-purple-50 border-t border-purple-200">
          <ul className="flex flex-col p-4 space-y-3">
            <li>
              <Link href="/" className="block px-2 py-1 hover:text-purple-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block px-2 py-1 hover:text-purple-600">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="block px-2 py-1 hover:text-purple-600">
                About
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/dashboard" className="block px-2 py-1 hover:text-purple-600">
                  Dashboard
                </Link>
              </li>
            )}
            <li className="pt-3 border-t">
              {session ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="block text-center px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block text-center px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600"
                  >
                    Register
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
