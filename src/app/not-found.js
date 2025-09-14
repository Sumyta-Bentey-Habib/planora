"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import notFoundAnim from "@/../public/lottie/404.json";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4 text-center">
      <Lottie animationData={notFoundAnim} loop={true} className="w-72 h-72" />
      <h1 className="text-3xl font-bold text-purple-700 mt-6">Oops! Page Not Found</h1>
      <p className="text-gray-600 mt-2">The page you are looking for doesn’t exist.</p>
      <Link
        href="/"
        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg shadow-md transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
