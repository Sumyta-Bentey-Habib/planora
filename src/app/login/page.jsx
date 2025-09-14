"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mail, Lock, Home, LogIn, Chrome } from "lucide-react";
import Lottie from "lottie-react";
import loginAnim from "@/../public/lottie/login.json";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 px-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-xl">
        <CardHeader className="text-center space-y-4">
          <Lottie animationData={loginAnim} className="h-40 mx-auto" />
          <CardTitle className="text-3xl font-extrabold text-purple-700">Welcome Back</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Login */}
          <Button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium flex items-center justify-center gap-2"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Email/Password Login */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 items-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-purple-700 flex items-center gap-1">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href="/register" className="text-purple-600 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
