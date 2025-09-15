"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#e9d5ff] text-black py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">Planora</h3>
          <p className="text-black">
            Connecting event planners and explorers. Plan, join, and enjoy events seamlessly.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="#"><Facebook className="w-5 h-5 " /></Link>
            <Link href="#"><Twitter className="w-5 h-5 " /></Link>
            <Link href="#"><Instagram className="w-5 h-5 " /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" >Home</Link></li>
            <li><Link href="/events" >Events</Link></li>
            <li><Link href="/dashboard" >Dashboard</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> support@planora.com</p>
          <p className="flex items-center gap-2 mt-2"><Phone className="w-4 h-4"/> +1 234 567 890</p>
          <p className="mt-4 text-gray-300 text-sm">© 2025 Planora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
