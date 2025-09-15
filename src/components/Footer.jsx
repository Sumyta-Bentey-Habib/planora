"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 text-black py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-purple-800">Planora</h3>
          <p className="text-gray-700 leading-relaxed">
            Connecting event planners and explorers. Plan, join, and enjoy events seamlessly.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="p-2 rounded-full bg-white shadow hover:bg-purple-100 transition">
              <Facebook className="w-5 h-5 text-purple-700" />
            </Link>
            <Link href="#" className="p-2 rounded-full bg-white shadow hover:bg-purple-100 transition">
              <Twitter className="w-5 h-5 text-purple-700" />
            </Link>
            <Link href="#" className="p-2 rounded-full bg-white shadow hover:bg-purple-100 transition">
              <Instagram className="w-5 h-5 text-purple-700" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-800">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-purple-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-purple-700 transition">
                Events
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-purple-700 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-700 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-purple-800">Contact Us</h4>
          <p className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4 text-purple-700" /> support@planora.com
          </p>
          <p className="flex items-center gap-2 mt-3 text-gray-700">
            <Phone className="w-4 h-4 text-purple-700" /> +1 234 567 890
          </p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="border-t border-purple-300 mt-10 pt-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} <span className="font-semibold text-purple-800">Planora</span>. All rights reserved.
      </div>
    </footer>
  );
}
