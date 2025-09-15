"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-cubic" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you soon.");
  };

  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <h1
        className="text-4xl font-bold text-center mb-12 text-purple-800"
        data-aos="fade-up"
      >
        Contact Planora
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card
          className="shadow-lg hover:shadow-xl transition-shadow rounded-xl"
          data-aos="fade-right"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-600" /> Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>support@planora.com</p>
          </CardContent>
        </Card>

        <Card
          className="shadow-lg hover:shadow-xl transition-shadow rounded-xl"
          data-aos="fade-left"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-purple-600" /> Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>+1 234 567 890</p>
          </CardContent>
        </Card>

        <Card
          className="shadow-lg hover:shadow-xl transition-shadow rounded-xl md:col-span-2"
          data-aos="fade-up"
        >
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

      <form onSubmit={handleSubmit} className="space-y-4 mb-8" data-aos="fade-up">
        <Input
          type="text"
          placeholder="Your Name"
          required
          className="rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-200"
        />
        <Input
          type="email"
          placeholder="Your Email"
          required
          className="rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-200"
        />
        <Textarea
          placeholder="Your Message"
          required
          className="rounded-lg border-purple-300 focus:border-purple-500 focus:ring-purple-200"
        />
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
        >
          Send Message
        </Button>
      </form>

      <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="200">
        <Link href="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
