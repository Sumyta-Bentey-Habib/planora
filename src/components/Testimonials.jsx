"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Event Explorer",
    feedback: "Planora made it so easy to find events I love. Highly recommended!",
  },
  {
    name: "Mark Thompson",
    role: "Event Planner",
    feedback: "Managing events has never been easier. The platform is intuitive and reliable.",
  },
  {
    name: "Sophia Lee",
    role: "Explorer",
    feedback: "I discovered amazing local events thanks to Hobby Hood!",
  },
];

export default function Testimonials() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white px-6">
      <h2
        className="text-3xl font-bold text-center mb-12 text-purple-800"
        data-aos="fade-up"
      >
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <Card
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            data-aos="zoom-in"
            data-aos-delay={index * 200}
          >
            <CardContent>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-purple-700">{t.name}</CardTitle>
                <CardDescription className="text-gray-500">{t.role}</CardDescription>
              </CardHeader>
              <p className="mt-2 text-gray-700">{t.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
