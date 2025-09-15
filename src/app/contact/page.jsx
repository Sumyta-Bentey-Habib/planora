"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
  };

  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Planora</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-600" /> Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>support@planora.com</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-purple-600" /> Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>+1 234 567 890</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-purple-600" /> Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>123 Planora Street, Cityville, Country</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Textarea placeholder="Your Message" required />
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Send Message
        </Button>
      </form>

     
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
