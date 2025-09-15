"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">About Planora</h1>

      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Planora is your ultimate event management platform. Whether you're an explorer looking
        for exciting events or an event planner organizing unforgettable experiences, Planora
        connects people and events seamlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-600" />
            <CardTitle>Community Driven</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Connect with a growing community of explorers and event planners around you.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-purple-600" />
            <CardTitle>Organize Events</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Plan, schedule, and manage events easily with our intuitive platform.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-purple-600" />
            <CardTitle>Explore Nearby</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Discover exciting local events happening around you in real-time.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      
      <div className="text-center mt-8">
        <Link href="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
