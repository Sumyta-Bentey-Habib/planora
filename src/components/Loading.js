"use client";

import Lottie from "lottie-react";
import loadingAnim from "@/../public/lottie/loading.json";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200">
      <Lottie animationData={loadingAnim} loop={true} className="w-40 h-40" />
    </div>
  );
}
