"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mail, Lock, User, Home, UserPlus, Chrome } from "lucide-react";
import Lottie from "lottie-react";
import registerAnim from "@/../public/lottie/register.json";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("explorer");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push("/dashboard"); 
      } else {
        alert("Registration succeeded, but login failed. Please login manually.");
        router.push("/login");
      }
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  const handleGoogleRegister = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200">
      <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-xl">
        <CardHeader className="space-y-4 text-center">
          <Lottie animationData={registerAnim} className="h-40 mx-auto" />
          <CardTitle className="text-3xl font-extrabold text-purple-700">Create Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Google Register/Login */}
          <Button
            onClick={handleGoogleRegister}
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

          {/* Email/Password Registration */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Full Name"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-gray-300 rounded-lg p-2"
            >
              <option value="explorer">Explorer</option>
              <option value="eventplanner">Event Planner</option>
            </select>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Register
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 items-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-purple-700 flex items-center gap-1">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
